<?php
/**
 * Pengisian awal menu Program Donasi dari salinan src/data/donasi.ts.
 *
 * Dijalankan oleh scripts/pasang-donasi-cms.sh lewat `wp eval-file`, dengan dua
 * argumen: berkas JSON program dan folder gambar (public/img rilis aktif).
 *
 * Aman diulang: slug yang sudah ada dilewati, termasuk yang berada di Tong
 * Sampah, jadi hasil suntingan operator tidak pernah tertimpa.
 */

if (!defined('ABSPATH') || !defined('WM_DONASI_CPT')) {
    fwrite(STDERR, "Jalankan lewat wp eval-file setelah plugin wm-donasi aktif.\n");
    exit(1);
}

[$berkas_json, $folder_img] = $args;

$program = json_decode((string) file_get_contents($berkas_json), true);
if (!is_array($program) || $program === []) {
    WP_CLI::error("Data program tidak terbaca: $berkas_json");
}

require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

// Penyegaran situs dikirim sekali oleh skrip pemasangan, bukan per program.
remove_action('save_post_' . WM_DONASI_CPT, 'wm_donasi_beri_tahu_situs', 20);

/** Paragraf statis dijadikan blok paragraf supaya bisa disunting biasa di editor. */
function wm_impor_blok(string $html): string
{
    preg_match_all('#<p>(.*?)</p>#s', $html, $cocok);
    $blok = array_map(
        static fn(string $isi) => "<!-- wp:paragraph -->\n<p>" . html_entity_decode($isi, ENT_QUOTES, 'UTF-8') . "</p>\n<!-- /wp:paragraph -->",
        $cocok[1]
    );
    return implode("\n\n", $blok);
}

/** Salin gambar ke Media. Berkas SVG dilewati: WordPress tidak menerimanya. */
function wm_impor_gambar(string $src, string $alt, int $post_id, string $folder_img): int
{
    $nama = basename($src);
    if (str_ends_with($nama, '.svg')) {
        return 0;
    }

    $asal = rtrim($folder_img, '/') . '/' . $nama;
    if (!is_file($asal)) {
        WP_CLI::warning("Gambar tidak ditemukan: $asal");
        return 0;
    }

    // media_handle_sideload memindahkan berkasnya, jadi yang diberikan salinan.
    $sementara = wp_tempnam($nama);
    copy($asal, $sementara);

    $id = media_handle_sideload(['name' => $nama, 'tmp_name' => $sementara], $post_id, $alt);
    if (is_wp_error($id)) {
        @unlink($sementara);
        WP_CLI::warning("Gagal mengunggah $nama: " . $id->get_error_message());
        return 0;
    }

    update_post_meta($id, '_wp_attachment_image_alt', $alt);
    return (int) $id;
}

$dibuat = 0;
foreach ($program as $p) {
    $ada = get_posts([
        'post_type'      => WM_DONASI_CPT,
        'post_status'    => 'any',
        'name'           => $p['slug'],
        'posts_per_page' => 1,
        'fields'         => 'ids',
    ]);
    // `any` tidak mencakup Tong Sampah, dan slug di sana berakhiran __trashed.
    $ada = $ada ?: get_posts([
        'post_type'      => WM_DONASI_CPT,
        'post_status'    => 'trash',
        'name'           => $p['slug'] . '__trashed',
        'posts_per_page' => 1,
        'fields'         => 'ids',
    ]);
    if ($ada) {
        WP_CLI::log("Lewati {$p['slug']}, sudah ada.");
        continue;
    }

    $id = wp_insert_post([
        'post_type'    => WM_DONASI_CPT,
        'post_status'  => 'publish',
        'post_name'    => $p['slug'],
        'post_title'   => wp_slash($p['judul']),
        'post_excerpt' => wp_slash($p['ringkasan']),
        'post_content' => wp_slash(wm_impor_blok($p['konten'])),
    ], true);

    if (is_wp_error($id)) {
        WP_CLI::error("{$p['slug']}: " . $id->get_error_message());
    }

    update_post_meta($id, '_wm_jenis', $p['jenis']);
    update_post_meta($id, '_wm_target', (int) $p['target']);
    update_post_meta($id, '_wm_terkumpul', (int) $p['terkumpul']);
    update_post_meta($id, '_wm_satuan_biaya', (string) ($p['satuan_biaya'] ?? ''));
    update_post_meta($id, '_wm_penerima_manfaat', $p['penerima_manfaat']);
    update_post_meta($id, '_wm_batas_waktu', (string) ($p['batas_waktu'] ?? ''));
    update_post_meta($id, '_wm_mendesak', (bool) $p['mendesak']);

    $gambar = wm_impor_gambar($p['gambar']['src'], $p['gambar']['alt'], $id, $folder_img);
    if ($gambar) {
        set_post_thumbnail($id, $gambar);
    }

    $dibuat++;
    WP_CLI::log("Dibuat {$p['slug']}" . ($gambar ? '' : ' (tanpa gambar unggulan)'));
}

WP_CLI::success("$dibuat program dibuat dari " . count($program) . ' data.');
