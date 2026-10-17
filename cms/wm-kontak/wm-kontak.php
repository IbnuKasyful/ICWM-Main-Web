<?php
/**
 * Plugin Name:       Wadi Mubarak, Formulir Kontak
 * Description:       Menerima pesan formulir kontak dari situs Next.js, menyimpannya di menu Pesan Kontak, lalu meneruskannya ke surel lewat wp_mail() (dikirim oleh WP Mail SMTP).
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-kontak
 *
 * Pasangan berkas ini di sisi situs: src/app/api/kontak/route.ts.
 *
 * Pesan selalu disimpan lebih dulu, baru dikirim. Bila surel gagal (SMTP belum
 * diatur, App Password Gmail dicabut, kuota habis), pesannya tetap terbaca di
 * wp-admin dan kolom "Terkirim" menunjukkan mana yang perlu ditindaklanjuti.
 *
 * Dua konstanta berikut wajib ada di wp-config.php:
 *
 *   define('WM_KONTAK_SECRET', 'rahasia-sama-dengan-KONTAK_SECRET');
 *   define('WM_KONTAK_TUJUAN', 'psbwadimubarak@gmail.com');
 *
 * Tujuan sengaja ditetapkan di sini, bukan dikirim situs: andai rahasianya
 * bocor, endpoint ini tetap tidak bisa dipakai mengirim surel ke sembarang
 * alamat.
 */

if (!defined('ABSPATH')) {
    exit;
}

const WM_KONTAK_CPT = 'wm_pesan_kontak';

/** Sama dengan kebijakan privasi situs: data formulir disimpan maksimal 24 bulan. */
const WM_KONTAK_UMUR_BULAN = 24;

/** Kuncinya harus sama dengan enum `keperluan` di src/app/api/kontak/route.ts. */
function wm_kontak_keperluan(): array
{
    return [
        'ppdb'       => 'Pendaftaran santri baru',
        'donasi'     => 'Donasi & LAZIS',
        'kerja-sama' => 'Kerja sama lembaga',
        'media'      => 'Media & pers',
        'alumni'     => 'Alumni',
        'lainnya'    => 'Lainnya',
    ];
}

/* -------------------------------------------------------------------------- */
/* CPT                                                                         */
/* -------------------------------------------------------------------------- */

add_action('init', 'wm_kontak_daftar_cpt');
function wm_kontak_daftar_cpt(): void
{
    register_post_type(WM_KONTAK_CPT, [
        'labels' => [
            'name'          => 'Pesan Kontak',
            'singular_name' => 'Pesan Kontak',
            'edit_item'     => 'Pesan Kontak',
            'search_items'  => 'Cari pesan',
            'not_found'     => 'Belum ada pesan.',
        ],
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_position'      => 22,
        'menu_icon'          => 'dashicons-email-alt',
        'publicly_queryable' => false,
        'has_archive'        => false,
        'rewrite'            => false,
        'supports'           => ['title', 'editor'],
        // Berisi data pribadi pengunjung: tidak boleh keluar lewat REST bawaan
        // maupun WPGraphQL.
        'show_in_rest'       => false,
        'show_in_graphql'    => false,
        'map_meta_cap'       => true,
        // Pesan hanya datang dari situs; admin cukup membaca dan menghapus.
        'capabilities'       => ['create_posts' => 'do_not_allow'],
    ]);
}

/* -------------------------------------------------------------------------- */
/* Endpoint penerima                                                           */
/* -------------------------------------------------------------------------- */

add_action('rest_api_init', 'wm_kontak_daftar_rute');
function wm_kontak_daftar_rute(): void
{
    register_rest_route('wm/v1', '/kontak', [
        'methods'             => 'POST',
        'callback'            => 'wm_kontak_terima',
        'permission_callback' => 'wm_kontak_izin',
    ]);
}

function wm_kontak_izin(WP_REST_Request $request): bool
{
    if (!defined('WM_KONTAK_SECRET') || WM_KONTAK_SECRET === '') {
        return false;
    }
    $kiriman = (string) $request->get_header('x-kontak-secret');
    return $kiriman !== '' && hash_equals(WM_KONTAK_SECRET, $kiriman);
}

function wm_kontak_terima(WP_REST_Request $request): WP_REST_Response
{
    // Situs sudah memvalidasi dengan Zod; di sini cukup dibersihkan dan dibatasi
    // ulang, karena endpoint ini tetap tidak boleh mempercayai pemanggilnya.
    $daftar    = wm_kontak_keperluan();
    $nama      = mb_substr(sanitize_text_field((string) $request->get_param('nama')), 0, 120);
    $email     = sanitize_email((string) $request->get_param('email'));
    $telepon   = mb_substr(sanitize_text_field((string) $request->get_param('telepon')), 0, 30);
    $keperluan = (string) $request->get_param('keperluan');
    $pesan     = mb_substr(sanitize_textarea_field((string) $request->get_param('pesan')), 0, 4000);

    if ($nama === '' || !is_email($email) || !isset($daftar[$keperluan]) || $pesan === '') {
        return new WP_REST_Response(['ok' => false], 400);
    }

    $label = $daftar[$keperluan];
    $isi   = implode("\n", [
        'Keperluan: ' . $label,
        'Nama: ' . $nama,
        'Surel: ' . $email,
        'Telepon: ' . ($telepon !== '' ? $telepon : '-'),
        '',
        $pesan,
    ]);

    $id = wp_insert_post([
        'post_type'    => WM_KONTAK_CPT,
        'post_status'  => 'private',
        'post_title'   => sprintf('[%s] %s', $label, $nama),
        'post_content' => $isi,
        'meta_input'   => [
            '_wm_email'     => $email,
            '_wm_keperluan' => $keperluan,
            '_wm_terkirim'  => 0,
        ],
    ], true);

    if (is_wp_error($id)) {
        error_log('[wm-kontak] gagal menyimpan pesan: ' . $id->get_error_message());
        return new WP_REST_Response(['ok' => false], 500);
    }

    $tujuan    = defined('WM_KONTAK_TUJUAN') ? WM_KONTAK_TUJUAN : get_option('admin_email');
    $terkirim  = wp_mail(
        $tujuan,
        sprintf('[%s] Pesan dari %s', $label, $nama),
        $isi,
        // Tombol Balas di Gmail langsung ke pengunjung.
        [sprintf('Reply-To: %s <%s>', str_replace(['<', '>', '"'], '', $nama), $email)]
    );

    update_post_meta($id, '_wm_terkirim', $terkirim ? 1 : 0);
    if (!$terkirim) {
        error_log('[wm-kontak] pesan #' . $id . ' tersimpan tetapi surel gagal dikirim');
    }

    return new WP_REST_Response(['ok' => true, 'terkirim' => $terkirim], 200);
}

/* -------------------------------------------------------------------------- */
/* Daftar pesan di wp-admin                                                    */
/* -------------------------------------------------------------------------- */

add_filter('manage_' . WM_KONTAK_CPT . '_posts_columns', 'wm_kontak_kolom');
function wm_kontak_kolom(array $kolom): array
{
    return [
        'cb'           => $kolom['cb'] ?? '',
        'title'        => 'Pesan',
        'wm_email'     => 'Surel',
        'wm_terkirim'  => 'Terkirim',
        'date'         => 'Diterima',
    ];
}

add_action('manage_' . WM_KONTAK_CPT . '_posts_custom_column', 'wm_kontak_isi_kolom', 10, 2);
function wm_kontak_isi_kolom(string $kolom, int $post_id): void
{
    if ($kolom === 'wm_email') {
        $email = (string) get_post_meta($post_id, '_wm_email', true);
        printf('<a href="mailto:%1$s">%1$s</a>', esc_attr($email));
    }
    if ($kolom === 'wm_terkirim') {
        echo get_post_meta($post_id, '_wm_terkirim', true)
            ? 'Ya'
            : '<strong style="color:#b32d2e">Belum, balas manual</strong>';
    }
}

/* -------------------------------------------------------------------------- */
/* Retensi                                                                     */
/* -------------------------------------------------------------------------- */

register_activation_hook(__FILE__, 'wm_kontak_jadwalkan');
register_deactivation_hook(__FILE__, 'wm_kontak_hapus_jadwal');

function wm_kontak_jadwalkan(): void
{
    if (!wp_next_scheduled('wm_kontak_bersihkan')) {
        wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', 'wm_kontak_bersihkan');
    }
}

function wm_kontak_hapus_jadwal(): void
{
    wp_clear_scheduled_hook('wm_kontak_bersihkan');
}

add_action('wm_kontak_bersihkan', 'wm_kontak_bersihkan');
function wm_kontak_bersihkan(): void
{
    $lama = get_posts([
        'post_type'      => WM_KONTAK_CPT,
        'post_status'    => 'any',
        'date_query'     => [['before' => WM_KONTAK_UMUR_BULAN . ' months ago']],
        'fields'         => 'ids',
        'posts_per_page' => 200,
    ]);
    foreach ($lama as $id) {
        wp_delete_post($id, true);
    }
}
