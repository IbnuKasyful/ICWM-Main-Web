<?php
/**
 * Plugin Name:       Wadi Mubarak, SEO untuk Situs
 * Description:       Mengekspos judul SEO, meta description, dan noindex isian Yoast SEO ke WPGraphQL supaya dipakai situs Next.js, sekaligus menjaga CMS ini sendiri di luar indeks mesin pencari.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Requires Plugins:  wp-graphql, wordpress-seo
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-seo
 *
 * Pasangan berkas ini di sisi situs: `KUERI_BERITA` di src/lib/wp-berita.ts.
 *
 * Field hanya berisi nilai yang diisi manual di kotak Yoast. Bila kosong
 * hasilnya null dan situs memakai judul tulisan serta ringkasannya sendiri,
 * jadi template judul Yoast di CMS hanya berpengaruh pada pratinjau di editor.
 */

if (!defined('ABSPATH')) {
    exit;
}

/** Sama dengan `site.namaPendek` di src/lib/site.ts, akhiran judul di situs. */
const WM_SEO_NAMA_SITUS = 'Wadi Mubarak';

/**
 * Isian Yoast boleh memuat variabel seperti %%title%% dan %%sep%%, jadi
 * diselesaikan di sini. Hasilnya null bila redaksi tidak mengisi apa pun.
 */
function wm_seo_isian(int $id, string $kunci): ?string
{
    $post = get_post($id);
    if (!$post) {
        return null;
    }
    $nilai = trim((string) get_post_meta($id, $kunci, true));
    if ($nilai !== '' && function_exists('wpseo_replace_vars')) {
        $nilai = trim(wpseo_replace_vars($nilai, $post));
    }
    // Yoast mengembalikan pemisah sebagai entitas (&#183;), sedangkan situs
    // memasang teks ini apa adanya ke <title> dan meta.
    $nilai = html_entity_decode($nilai, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    return $nilai === '' ? null : $nilai;
}

/**
 * Yoast menyimpan '1' untuk noindex, '2' untuk index, dan kosong untuk
 * mengikuti setelan jenis tulisan.
 */
function wm_seo_noindex(int $id): bool
{
    $nilai = (string) get_post_meta($id, '_yoast_wpseo_meta-robots-noindex', true);
    if ($nilai === '') {
        return class_exists('WPSEO_Options') && (bool) WPSEO_Options::get('noindex-post');
    }
    return $nilai === '1';
}

add_action('graphql_register_types', function () {
    register_graphql_field('Post', 'seoJudul', [
        'type'        => 'String',
        'description' => 'Judul SEO isian Yoast, sudah lengkap dengan nama situs. Null bila tidak diisi.',
        'resolve'     => fn ($post) => wm_seo_isian((int) $post->databaseId, '_yoast_wpseo_title'),
    ]);
    register_graphql_field('Post', 'seoDeskripsi', [
        'type'        => 'String',
        'description' => 'Meta description isian Yoast. Null bila tidak diisi.',
        'resolve'     => fn ($post) => wm_seo_isian((int) $post->databaseId, '_yoast_wpseo_metadesc'),
    ]);
    register_graphql_field('Post', 'seoNoindex', [
        'type'        => ['non_null' => 'Boolean'],
        'description' => 'True bila tulisan diminta keluar dari indeks mesin pencari lewat Yoast.',
        'resolve'     => fn ($post) => wm_seo_noindex((int) $post->databaseId),
    ]);
});

/* Nama situs CMS ("CMS Wadi Mubarak") bukan nama yang tampil di situs, jadi
   %%sitename%% di isian Yoast diganti dengan nama situs yang sebenarnya. */
add_filter('wpseo_replacements', function (array $pengganti) {
    $pengganti['%%sitename%%'] = WM_SEO_NAMA_SITUS;
    return $pengganti;
});

/* CMS headless tidak boleh terindeks: isinya sama dengan situs, tapi di domain
   cms.wadimubarak.com. Dikunci di sini karena panduan awal Yoast dan layar
   Pengaturan > Membaca bisa mengubahnya diam-diam. */
add_filter('pre_option_blog_public', fn () => '0');
