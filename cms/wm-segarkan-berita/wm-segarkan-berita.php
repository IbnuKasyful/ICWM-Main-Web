<?php
/**
 * Plugin Name:       Wadi Mubarak, Segarkan Berita
 * Description:       Memberi tahu situs Next.js setiap kali tulisan terbit, berubah, atau ditarik, supaya beranda dan /informasi langsung ikut.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-segarkan-berita
 *
 * Pasangan berkas ini di sisi situs: src/app/api/revalidate/route.ts. Tanpa
 * panggilan ini tulisan baru menunggu cache berita 1 jam habis.
 *
 * Alamat dan rahasianya memakai dua konstanta wp-config.php yang sama dengan
 * plugin wm-donasi: WM_NEXT_REVALIDATE_URL dan WM_NEXT_REVALIDATE_SECRET.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Sengaja wp_after_insert_post, bukan save_post: di editor blok, Rubrik baru
 * tersimpan sesudah save_post berjalan, padahal tulisan tanpa Rubrik tidak
 * didaftar situs.
 */
add_action('wp_after_insert_post', 'wm_berita_setelah_simpan', 20, 4);
function wm_berita_setelah_simpan(int $post_id, WP_Post $post, bool $update, ?WP_Post $sebelum): void
{
    if ($post->post_type !== 'post') {
        return;
    }

    // Termasuk tulisan yang baru ditarik dari situs. Draf yang tidak pernah
    // tayang dan simpanan otomatis tidak mengubah apa pun yang tampil.
    $tayang = $post->post_status === 'publish' || ($sebelum && $sebelum->post_status === 'publish');
    if (!$tayang) {
        return;
    }

    // Slug sebelumnya didahulukan: tulisan di Tong Sampah berakhiran __trashed,
    // dan URL lama itulah yang harus berhenti tampil.
    wm_berita_kirim_penyegaran($sebelum && $sebelum->post_name ? $sebelum->post_name : $post->post_name);
}

/**
 * Kegagalan dicatat ke log lalu diabaikan: penulis tidak boleh terganggu hanya
 * karena situs sedang tidak menjawab, cache 1 jam tetap menyusul sendiri.
 */
function wm_berita_kirim_penyegaran(string $slug): bool
{
    if (!defined('WM_NEXT_REVALIDATE_URL') || !defined('WM_NEXT_REVALIDATE_SECRET')) {
        return false;
    }

    $balasan = wp_remote_post(WM_NEXT_REVALIDATE_URL, [
        'timeout' => 8,
        'headers' => [
            'content-type'        => 'application/json',
            'x-revalidate-secret' => WM_NEXT_REVALIDATE_SECRET,
        ],
        'body'    => wp_json_encode(['jenis' => 'berita', 'slug' => $slug]),
    ]);

    if (is_wp_error($balasan)) {
        error_log('[wm-segarkan-berita] gagal: ' . $balasan->get_error_message());
        return false;
    }

    $kode = (int) wp_remote_retrieve_response_code($balasan);
    if ($kode !== 200) {
        error_log('[wm-segarkan-berita] ditolak situs, HTTP ' . $kode);
        return false;
    }

    return true;
}
