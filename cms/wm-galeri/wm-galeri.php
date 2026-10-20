<?php
/**
 * Plugin Name:       Wadi Mubarak, Galeri
 * Description:       Centang "Tampilkan di galeri" pada foto di Media supaya foto itu tampil di halaman /galeri situs, lengkap dengan kelompok penyaringnya.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Requires Plugins:  wp-graphql
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-galeri
 *
 * Pasangan berkas ini di sisi situs: `galeriKategoriSchema` di
 * src/lib/schemas.ts (slug kelompok harus sama persis) dan `KUERI_GALERI` di
 * src/lib/wp.ts.
 *
 * Penandanya per foto, bukan per tulisan: isi tulisan sering bercampur flyer
 * dan poster, dan halaman /galeri berjanji tidak menampilkan wajah santri
 * secara menonjol tanpa izin wali, jadi setiap foto harus dipilih sendiri.
 */

if (!defined('ABSPATH')) {
    exit;
}

const WM_GALERI_META_TAMPIL   = 'wm_galeri_tampil';
const WM_GALERI_META_KELOMPOK = 'wm_galeri_kelompok';

/** Batas jumlah foto yang dikirim ke situs, supaya halaman /galeri tidak terus memberat. */
const WM_GALERI_BATAS = 100;

function wm_galeri_kelompok(): array
{
    return [
        'kampus'  => 'Kehidupan kampus',
        'wisuda'  => 'Wisuda',
        'dauroh'  => 'Dauroh & kajian',
        'halaqah' => 'Halaqah',
        'anak'    => 'Anak usia dini',
    ];
}

/* -------------------------------------------------------------------------- */
/* Isian di Media                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Tampil di jendela Media saat menulis tulisan, di Pustaka Media, dan di layar
 * sunting lampiran. Hanya untuk gambar.
 */
add_filter('attachment_fields_to_edit', function (array $isian, WP_Post $lampiran): array {
    if (!wp_attachment_is_image($lampiran)) {
        return $isian;
    }

    $id       = $lampiran->ID;
    $tampil   = get_post_meta($id, WM_GALERI_META_TAMPIL, true) === '1';
    $kelompok = get_post_meta($id, WM_GALERI_META_KELOMPOK, true);
    $nama     = "attachments[$id]";

    // Penanda bahwa isian ini memang ikut terkirim. Tanpa penanda, kotak centang
    // yang kosong tidak terkirim sama sekali, sama persis dengan formulir lain
    // yang tidak memuat isian ini, dan centang bisa terhapus tanpa sengaja.
    $html = sprintf('<input type="hidden" name="%s[wm_galeri_ada]" value="1">', esc_attr($nama));
    $html .= sprintf(
        '<label><input type="checkbox" name="%s[wm_galeri_tampil]" value="1"%s> Tampilkan di galeri</label>',
        esc_attr($nama),
        checked($tampil, true, false)
    );

    $isian['wm_galeri_tampil'] = [
        'label' => 'Galeri situs',
        'input' => 'html',
        'html'  => $html,
        'helps' => 'Hanya foto kegiatan, bukan flyer atau poster. Jangan centang foto yang menampilkan wajah santri secara menonjol tanpa izin tertulis wali. Teks alternatif menjadi keterangan foto.',
    ];

    $pilihan = '';
    foreach (wm_galeri_kelompok() as $slug => $label) {
        $pilihan .= sprintf('<option value="%s"%s>%s</option>', esc_attr($slug), selected($kelompok, $slug, false), esc_html($label));
    }
    $isian['wm_galeri_kelompok'] = [
        'label' => 'Kelompok galeri',
        'input' => 'html',
        'html'  => sprintf('<select name="%s[wm_galeri_kelompok]">%s</select>', esc_attr($nama), $pilihan),
        'helps' => 'Penyaring di halaman /galeri.',
    ];

    return $isian;
}, 10, 2);

add_filter('attachment_fields_to_save', function (array $data, array $isian): array {
    if (empty($isian['wm_galeri_ada']) || empty($data['ID'])) {
        return $data;
    }
    $id = (int) $data['ID'];

    if (($isian['wm_galeri_tampil'] ?? '') === '1') {
        update_post_meta($id, WM_GALERI_META_TAMPIL, '1');
    } else {
        delete_post_meta($id, WM_GALERI_META_TAMPIL);
    }

    $kelompok = sanitize_key($isian['wm_galeri_kelompok'] ?? '');
    if (isset(wm_galeri_kelompok()[$kelompok])) {
        update_post_meta($id, WM_GALERI_META_KELOMPOK, $kelompok);
    }

    return $data;
}, 10, 2);

/* -------------------------------------------------------------------------- */
/* Kolom "Galeri" di Pustaka Media (tampilan daftar)                           */
/* -------------------------------------------------------------------------- */

add_filter('manage_media_columns', function (array $kolom): array {
    $kolom['wm_galeri'] = 'Galeri';
    return $kolom;
});

add_action('manage_media_custom_column', function (string $kolom, int $id): void {
    if ($kolom !== 'wm_galeri' || get_post_meta($id, WM_GALERI_META_TAMPIL, true) !== '1') {
        return;
    }
    $kelompok = get_post_meta($id, WM_GALERI_META_KELOMPOK, true);
    echo esc_html(wm_galeri_kelompok()[$kelompok] ?? wm_galeri_kelompok()['kampus']);
}, 10, 2);

/* -------------------------------------------------------------------------- */
/* WPGraphQL                                                                   */
/* -------------------------------------------------------------------------- */

/** Tulisan induk foto, hanya bila tulisan itu terbit dan bisa dibuka di situs. */
function wm_galeri_tulisan(WP_Post $lampiran): ?WP_Post
{
    if (!$lampiran->post_parent) {
        return null;
    }
    $induk = get_post($lampiran->post_parent);
    return $induk && $induk->post_type === 'post' && $induk->post_status === 'publish' ? $induk : null;
}

function wm_galeri_teks(string $teks): string
{
    return trim(html_entity_decode(wp_strip_all_tags($teks), ENT_QUOTES, 'UTF-8'));
}

add_action('graphql_register_types', function () {
    register_graphql_object_type('FotoGaleri', [
        'description' => 'Foto yang dicentang "Tampilkan di galeri" di Media.',
        'fields'      => [
            'src'          => ['type' => ['non_null' => 'String']],
            'keterangan'   => ['type' => ['non_null' => 'String'], 'description' => 'Teks alternatif, lalu keterangan, lalu judul tulisan induknya.'],
            'lebar'        => ['type' => ['non_null' => 'Int']],
            'tinggi'       => ['type' => ['non_null' => 'Int']],
            'kelompok'     => ['type' => ['non_null' => 'String']],
            'tulisanSlug'  => ['type' => 'String', 'description' => 'Slug tulisan terbit tempat foto ini diunggah.'],
            'tulisanJudul' => ['type' => 'String'],
        ],
    ]);

    register_graphql_field('RootQuery', 'fotoGaleri', [
        'type'        => ['list_of' => ['non_null' => 'FotoGaleri']],
        'description' => 'Foto galeri terbaru lebih dulu.',
        'args'        => [
            'first' => ['type' => 'Int', 'description' => 'Paling banyak ' . WM_GALERI_BATAS . '.'],
        ],
        'resolve'     => function ($sumber, array $args) {
            $batas = max(1, min(WM_GALERI_BATAS, (int) ($args['first'] ?? 60)));
            $ids = get_posts([
                'post_type'        => 'attachment',
                'post_status'      => 'inherit',
                'post_mime_type'   => 'image',
                'numberposts'      => $batas,
                'orderby'          => 'date',
                'order'            => 'DESC',
                'fields'           => 'ids',
                'meta_key'         => WM_GALERI_META_TAMPIL,
                'meta_value'       => '1',
                'suppress_filters' => true,
            ]);

            $hasil = [];
            foreach ($ids as $id) {
                $lampiran = get_post($id);
                $gambar   = wp_get_attachment_image_src($id, 'full');
                if (!$lampiran || !$gambar || !$gambar[1] || !$gambar[2]) {
                    continue;
                }
                $tulisan  = wm_galeri_tulisan($lampiran);
                $judul    = $tulisan ? wm_galeri_teks(get_the_title($tulisan)) : null;
                $kelompok = get_post_meta($id, WM_GALERI_META_KELOMPOK, true);

                $keterangan = wm_galeri_teks((string) get_post_meta($id, '_wp_attachment_image_alt', true));
                if ($keterangan === '') {
                    $keterangan = wm_galeri_teks($lampiran->post_excerpt);
                }
                if ($keterangan === '') {
                    $keterangan = $judul ?? wm_galeri_teks($lampiran->post_title);
                }

                $hasil[] = [
                    'src'          => $gambar[0],
                    'keterangan'   => $keterangan,
                    'lebar'        => (int) $gambar[1],
                    'tinggi'       => (int) $gambar[2],
                    'kelompok'     => isset(wm_galeri_kelompok()[$kelompok]) ? $kelompok : 'kampus',
                    // Didekode seperti field `slug` bawaan WPGraphQL, yang dipakai situs
                    // sebagai alamat /informasi/<slug>.
                    'tulisanSlug'  => $tulisan ? urldecode($tulisan->post_name) : null,
                    'tulisanJudul' => $judul,
                ];
            }
            return $hasil;
        },
    ]);
});
