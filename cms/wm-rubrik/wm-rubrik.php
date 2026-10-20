<?php
/**
 * Plugin Name:       Wadi Mubarak, Rubrik Situs
 * Description:       Kotak "Rubrik" di editor tulisan, sama dengan filter kategori di halaman /informasi situs. Hanya tulisan yang diberi rubrik yang tampil di situs.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Requires Plugins:  wp-graphql
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-rubrik
 *
 * Pasangan berkas ini di sisi situs: `categorySchema` di src/lib/schemas.ts
 * (slug rubrik harus sama persis) dan `KUERI_BERITA` di src/lib/wp-berita.ts.
 *
 * Kategori WordPress yayasan tumbuh apa adanya (37 kategori, `pemasaran`
 * mencampur kabar, pengumuman, dan promosi), jadi tidak bisa dipakai menyaring.
 * Rubrik dibuat terpisah dan daftarnya dikunci: redaksi hanya mencentang,
 * sementara menambah atau mengubah rubrik hanya bisa oleh admin, karena setiap
 * rubrik baru juga perlu ditambahkan di situs.
 */

if (!defined('ABSPATH')) {
    exit;
}

const WM_RUBRIK_TAKSONOMI = 'wm_rubrik';

function wm_rubrik_daftar(): array
{
    return [
        'berita'     => 'Berita',
        'pengumuman' => 'Pengumuman',
        'artikel'    => 'Artikel',
        'kegiatan'   => 'Kegiatan',
        'prestasi'   => 'Prestasi',
        'kerja-sama' => 'Kerja sama',
        'laporan'    => 'Laporan',
        'publikasi'  => 'Publikasi',
    ];
}

function wm_rubrik_daftarkan(): void
{
    register_taxonomy(WM_RUBRIK_TAKSONOMI, 'post', [
        'labels' => [
            'name'          => 'Rubrik',
            'singular_name' => 'Rubrik',
            'menu_name'     => 'Rubrik',
            'all_items'     => 'Semua rubrik',
            'edit_item'     => 'Sunting rubrik',
            'search_items'  => 'Cari rubrik',
            'not_found'     => 'Rubrik tidak ditemukan',
        ],
        'description'       => 'Menentukan di filter mana tulisan tampil pada halaman /informasi situs. Tanpa rubrik, tulisan tidak tampil di situs.',
        // Hierarkis supaya tampil sebagai kotak centang dan ikut Sunting Massal.
        'hierarchical'      => true,
        'public'            => false,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'show_in_quick_edit' => true,
        'rewrite'           => false,
        'capabilities'      => [
            'manage_terms' => 'manage_options',
            'edit_terms'   => 'manage_options',
            'delete_terms' => 'manage_options',
            'assign_terms' => 'edit_posts',
        ],
        'show_in_graphql'     => true,
        'graphql_single_name' => 'rubrik',
        'graphql_plural_name' => 'daftarRubrik',
    ]);
}
add_action('init', 'wm_rubrik_daftarkan');

/** Rubrik dibuat saat plugin diaktifkan; aman diulang. */
register_activation_hook(__FILE__, function () {
    wm_rubrik_daftarkan();
    foreach (wm_rubrik_daftar() as $slug => $nama) {
        if (!term_exists($slug, WM_RUBRIK_TAKSONOMI)) {
            wp_insert_term($nama, WM_RUBRIK_TAKSONOMI, ['slug' => $slug]);
        }
    }
});
