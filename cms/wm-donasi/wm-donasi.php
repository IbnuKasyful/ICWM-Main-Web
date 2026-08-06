<?php
/**
 * Plugin Name:       Wadi Mubarak — Program Donasi
 * Description:       CPT program_donasi + kolom angka penghimpunan, diekspos ke WPGraphQL, dan pemberitahuan otomatis ke situs Next.js setiap kali angkanya disimpan.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-donasi
 *
 * Pasangan berkas ini di sisi situs: src/lib/wp.ts (pembaca) dan
 * src/app/api/revalidate/route.ts (penyegar cache).
 *
 * Ketergantungan: plugin WPGraphQL. Tanpa itu CPT tetap bisa diisi admin, hanya
 * tidak terbaca situs — jadi kegagalannya jujur, bukan senyap.
 */

if (!defined('ABSPATH')) {
    exit;
}

const WM_DONASI_CPT   = 'program_donasi';
const WM_DONASI_NONCE = 'wm_donasi_nonce';

/**
 * Definisi kolom. Satu sumber untuk metabox, register_post_meta, dan WPGraphQL —
 * menambah field cukup di sini.
 *
 * 'meta'    kunci meta di basis data (berprefiks, agar tidak bentrok plugin lain)
 * 'graphql' nama field di GraphQL, harus sama dengan kueri di src/lib/wp.ts
 */
function wm_donasi_kolom(): array
{
    return [
        [
            'meta'    => '_wm_jenis',
            'graphql' => 'jenisDana',
            'label'   => 'Jenis dana',
            'jenis'   => 'pilihan',
            'pilihan' => ['zakat' => 'Zakat', 'infak' => 'Infak', 'sedekah' => 'Sedekah', 'wakaf' => 'Wakaf'],
            'tipe'    => 'string',
            'bantuan' => 'Menentukan label jenis dana pada halaman program dan anjuran berita transfer. Nomor rekening resmi selalu sama untuk semua jenis.',
        ],
        [
            'meta'    => '_wm_target',
            'graphql' => 'target',
            'label'   => 'Target (Rp)',
            'jenis'   => 'angka',
            'tipe'    => 'integer',
            'bantuan' => 'Tulis angka polos tanpa titik dan tanpa "Rp", contoh: 1800000000. Isi 0 bila program berkelanjutan tanpa target — bar progres otomatis disembunyikan.',
        ],
        [
            'meta'    => '_wm_terkumpul',
            'graphql' => 'terkumpul',
            'label'   => 'Terkumpul (Rp)',
            'jenis'   => 'angka',
            'tipe'    => 'integer',
            'bantuan' => 'Angka polos, hasil rekapitulasi terakhir. Ini kolom yang biasanya Anda perbarui.',
        ],
        [
            'meta'    => '_wm_penerima_manfaat',
            'graphql' => 'penerimaManfaat',
            'label'   => 'Penerima manfaat',
            'jenis'   => 'teks',
            'tipe'    => 'string',
            'bantuan' => 'Ringkas dan terukur, contoh: "180 santri di seluruh unit".',
        ],
        [
            'meta'    => '_wm_batas_waktu',
            'graphql' => 'batasWaktu',
            'label'   => 'Batas waktu',
            'jenis'   => 'tanggal',
            'tipe'    => 'string',
            'bantuan' => 'Kosongkan bila program berkelanjutan.',
        ],
        [
            'meta'    => '_wm_mendesak',
            'graphql' => 'mendesak',
            'label'   => 'Tandai mendesak',
            'jenis'   => 'centang',
            'tipe'    => 'boolean',
            'bantuan' => 'Program mendesak naik ke urutan teratas dan menjadi sorotan donasi di beranda.',
        ],
    ];
}

/* -------------------------------------------------------------------------- */
/* CPT                                                                         */
/* -------------------------------------------------------------------------- */

add_action('init', 'wm_donasi_daftar_cpt');
function wm_donasi_daftar_cpt(): void
{
    register_post_type(WM_DONASI_CPT, [
        'labels' => [
            'name'               => 'Program Donasi',
            'singular_name'      => 'Program Donasi',
            'add_new_item'       => 'Tambah Program Donasi',
            'edit_item'          => 'Ubah Program Donasi',
            'search_items'       => 'Cari program',
            'not_found'          => 'Belum ada program donasi.',
        ],
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_position'       => 21,
        'menu_icon'           => 'dashicons-heart',
        // Situs publiknya Next.js; arsip WordPress tidak boleh bisa diakses agar
        // tidak ada dua versi halaman yang sama di internet.
        'publicly_queryable'  => false,
        'has_archive'         => false,
        'rewrite'             => false,
        'supports'            => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'programDonasi',
        'graphql_plural_name' => 'programDonasis',
    ]);
}

/* -------------------------------------------------------------------------- */
/* Meta: pendaftaran & pembersihan nilai                                       */
/* -------------------------------------------------------------------------- */

add_action('init', 'wm_donasi_daftar_meta');
function wm_donasi_daftar_meta(): void
{
    foreach (wm_donasi_kolom() as $kolom) {
        register_post_meta(WM_DONASI_CPT, $kolom['meta'], [
            'type'              => $kolom['tipe'],
            'single'            => true,
            'show_in_rest'      => true,
            'sanitize_callback' => static fn($nilai) => wm_donasi_bersihkan($kolom, $nilai),
            'auth_callback'     => static fn() => current_user_can('edit_posts'),
        ]);
    }
}

/**
 * Membersihkan satu nilai sesuai jenis kolomnya.
 *
 * Angka dibersihkan longgar dengan sengaja: admin yang terbiasa menyalin dari
 * pembukuan sering menempel "Rp 1.305.000.000". Membuang semua karakter selain
 * digit lebih menolong daripada menolak simpanan dan membuat angkanya hilang.
 */
function wm_donasi_bersihkan(array $kolom, $nilai)
{
    switch ($kolom['jenis']) {
        case 'angka':
            $digit = preg_replace('/\D/', '', (string) $nilai);
            return $digit === '' ? 0 : (int) $digit;

        case 'centang':
            return (bool) $nilai;

        case 'pilihan':
            return isset($kolom['pilihan'][$nilai]) ? (string) $nilai : 'infak';

        case 'tanggal':
            // Format ISO (YYYY-MM-DD) atau kosong. Nilai lain dibuang.
            $tgl = trim((string) $nilai);
            return preg_match('/^\d{4}-\d{2}-\d{2}$/', $tgl) === 1 ? $tgl : '';

        default:
            return sanitize_text_field((string) $nilai);
    }
}

/* -------------------------------------------------------------------------- */
/* Kotak isian di layar edit                                                   */
/* -------------------------------------------------------------------------- */

add_action('add_meta_boxes', 'wm_donasi_metabox');
function wm_donasi_metabox(): void
{
    add_meta_box(
        'wm_donasi_angka',
        'Angka penghimpunan',
        'wm_donasi_render_metabox',
        WM_DONASI_CPT,
        'normal',
        'high'
    );
}

function wm_donasi_render_metabox(WP_Post $post): void
{
    wp_nonce_field(WM_DONASI_NONCE, WM_DONASI_NONCE);

    echo '<style>
        .wm-baris{margin:0 0 18px}
        .wm-baris label{display:block;font-weight:600;margin-bottom:4px}
        .wm-baris input[type=text],.wm-baris input[type=number],.wm-baris select{width:100%;max-width:420px}
        .wm-bantuan{margin:4px 0 0;color:#646970;font-size:12px;max-width:640px}
    </style>';

    foreach (wm_donasi_kolom() as $kolom) {
        $nilai = get_post_meta($post->ID, $kolom['meta'], true);
        $id    = esc_attr($kolom['meta']);

        echo '<div class="wm-baris">';
        echo '<label for="' . $id . '">' . esc_html($kolom['label']) . '</label>';

        switch ($kolom['jenis']) {
            case 'angka':
                printf(
                    '<input type="number" min="0" step="1" id="%s" name="%s" value="%s" />',
                    $id,
                    $id,
                    esc_attr((string) (int) $nilai)
                );
                break;

            case 'centang':
                printf(
                    '<label><input type="checkbox" id="%s" name="%s" value="1" %s /> Ya</label>',
                    $id,
                    $id,
                    checked((bool) $nilai, true, false)
                );
                break;

            case 'pilihan':
                echo '<select id="' . $id . '" name="' . $id . '">';
                foreach ($kolom['pilihan'] as $kunci => $label) {
                    printf(
                        '<option value="%s" %s>%s</option>',
                        esc_attr($kunci),
                        selected($nilai, $kunci, false),
                        esc_html($label)
                    );
                }
                echo '</select>';
                break;

            case 'tanggal':
                printf(
                    '<input type="date" id="%s" name="%s" value="%s" />',
                    $id,
                    $id,
                    esc_attr((string) $nilai)
                );
                break;

            default:
                printf(
                    '<input type="text" id="%s" name="%s" value="%s" maxlength="160" />',
                    $id,
                    $id,
                    esc_attr((string) $nilai)
                );
        }

        echo '<p class="wm-bantuan">' . esc_html($kolom['bantuan']) . '</p>';
        echo '</div>';
    }

    // Pratinjau capaian: admin bisa memeriksa angkanya masuk akal sebelum terbit.
    $target    = (int) get_post_meta($post->ID, '_wm_target', true);
    $terkumpul = (int) get_post_meta($post->ID, '_wm_terkumpul', true);
    if ($target > 0) {
        $persen = min(100, (int) round($terkumpul / $target * 100));
        echo '<p class="wm-bantuan"><strong>Capaian saat ini: ' . esc_html((string) $persen) . '%</strong> — '
            . esc_html(number_format_i18n($terkumpul)) . ' dari ' . esc_html(number_format_i18n($target)) . '</p>';
    }
}

add_action('save_post_' . WM_DONASI_CPT, 'wm_donasi_simpan', 10, 2);
function wm_donasi_simpan(int $post_id, WP_Post $post): void
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!isset($_POST[WM_DONASI_NONCE]) || !wp_verify_nonce(sanitize_key($_POST[WM_DONASI_NONCE]), WM_DONASI_NONCE)) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    foreach (wm_donasi_kolom() as $kolom) {
        $kunci = $kolom['meta'];

        if ($kolom['jenis'] === 'centang') {
            update_post_meta($post_id, $kunci, isset($_POST[$kunci]));
            continue;
        }

        $mentah = isset($_POST[$kunci]) ? wp_unslash($_POST[$kunci]) : '';
        update_post_meta($post_id, $kunci, wm_donasi_bersihkan($kolom, $mentah));
    }
}

/* -------------------------------------------------------------------------- */
/* Kolom daftar: capaian terlihat tanpa membuka programnya                      */
/* -------------------------------------------------------------------------- */

add_filter('manage_' . WM_DONASI_CPT . '_posts_columns', 'wm_donasi_kolom_daftar');
function wm_donasi_kolom_daftar(array $kolom): array
{
    $baru = [];
    foreach ($kolom as $kunci => $label) {
        $baru[$kunci] = $label;
        if ($kunci === 'title') {
            $baru['wm_capaian'] = 'Capaian';
            $baru['wm_jenis']   = 'Jenis';
        }
    }
    return $baru;
}

add_action('manage_' . WM_DONASI_CPT . '_posts_custom_column', 'wm_donasi_isi_kolom_daftar', 10, 2);
function wm_donasi_isi_kolom_daftar(string $kolom, int $post_id): void
{
    if ($kolom === 'wm_jenis') {
        echo esc_html(ucfirst((string) get_post_meta($post_id, '_wm_jenis', true)));
        return;
    }

    if ($kolom !== 'wm_capaian') {
        return;
    }

    $target    = (int) get_post_meta($post_id, '_wm_target', true);
    $terkumpul = (int) get_post_meta($post_id, '_wm_terkumpul', true);

    if ($target <= 0) {
        echo 'Rp ' . esc_html(number_format_i18n($terkumpul)) . ' <em>(berkelanjutan)</em>';
        return;
    }

    $persen = min(100, (int) round($terkumpul / $target * 100));
    echo '<strong>' . esc_html((string) $persen) . '%</strong><br><span style="color:#646970">Rp '
        . esc_html(number_format_i18n($terkumpul)) . ' / ' . esc_html(number_format_i18n($target)) . '</span>';
}

/* -------------------------------------------------------------------------- */
/* WPGraphQL                                                                   */
/* -------------------------------------------------------------------------- */

add_action('graphql_register_types', 'wm_donasi_daftar_graphql');
function wm_donasi_daftar_graphql(): void
{
    foreach (wm_donasi_kolom() as $kolom) {
        $tipe = match ($kolom['tipe']) {
            'integer' => 'Int',
            'boolean' => 'Boolean',
            default   => 'String',
        };

        register_graphql_field('ProgramDonasi', $kolom['graphql'], [
            'type'        => $tipe,
            'description' => $kolom['label'],
            'resolve'     => static function ($post) use ($kolom, $tipe) {
                $nilai = get_post_meta($post->databaseId, $kolom['meta'], true);
                return match ($tipe) {
                    'Int'     => (int) $nilai,
                    'Boolean' => (bool) $nilai,
                    default   => (string) $nilai,
                };
            },
        ]);
    }
}

/* -------------------------------------------------------------------------- */
/* Pemberitahuan ke situs Next.js                                              */
/* -------------------------------------------------------------------------- */

/**
 * Memanggil /api/revalidate agar angka baru langsung tampil.
 *
 * Dua konstanta berikut wajib ada di wp-config.php:
 *
 *   define('WM_NEXT_REVALIDATE_URL',    'https://wadimubarak.com/api/revalidate');
 *   define('WM_NEXT_REVALIDATE_SECRET', 'rahasia-sama-dengan-REVALIDATE_SECRET');
 *
 * Sengaja tidak disimpan di halaman pengaturan: rahasianya tidak perlu bisa
 * dibaca siapa pun yang bisa masuk wp-admin.
 *
 * Kegagalan panggilan ini dicatat ke log lalu diabaikan — admin tidak boleh
 * kehilangan simpanannya hanya karena situs sedang tidak menjawab. ISR 15 menit
 * tetap menyusul dengan sendirinya.
 */
add_action('save_post_' . WM_DONASI_CPT, 'wm_donasi_beri_tahu_situs', 20, 2);
add_action('trashed_post', 'wm_donasi_beri_tahu_situs_hapus');
add_action('untrashed_post', 'wm_donasi_beri_tahu_situs_hapus');

function wm_donasi_beri_tahu_situs(int $post_id, WP_Post $post): void
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    // Revisi dan draf otomatis tidak mengubah apa pun yang tampil di situs.
    if (wp_is_post_revision($post_id) || $post->post_status === 'auto-draft') {
        return;
    }

    wm_donasi_kirim_penyegaran($post->post_name);
}

function wm_donasi_beri_tahu_situs_hapus(int $post_id): void
{
    $post = get_post($post_id);
    if ($post instanceof WP_Post && $post->post_type === WM_DONASI_CPT) {
        wm_donasi_kirim_penyegaran($post->post_name);
    }
}

function wm_donasi_kirim_penyegaran(string $slug): void
{
    if (!defined('WM_NEXT_REVALIDATE_URL') || !defined('WM_NEXT_REVALIDATE_SECRET')) {
        return;
    }

    $balasan = wp_remote_post(WM_NEXT_REVALIDATE_URL, [
        // Non-blocking tidak dipakai: kita ingin tahu bila gagal, dan 8 detik
        // masih di bawah batas kesabaran layar edit WordPress.
        'timeout' => 8,
        'headers' => [
            'content-type'        => 'application/json',
            'x-revalidate-secret' => WM_NEXT_REVALIDATE_SECRET,
        ],
        'body'    => wp_json_encode(['slug' => $slug]),
    ]);

    if (is_wp_error($balasan)) {
        error_log('[wm-donasi] penyegaran gagal: ' . $balasan->get_error_message());
        return;
    }

    $kode = (int) wp_remote_retrieve_response_code($balasan);
    if ($kode !== 200) {
        error_log('[wm-donasi] penyegaran ditolak situs, HTTP ' . $kode);
        return;
    }

    set_transient('wm_donasi_penyegaran_ok', time(), 300);
}

/** Penanda di layar admin bahwa situs benar-benar sudah ikut diperbarui. */
add_action('admin_notices', 'wm_donasi_pemberitahuan_admin');
function wm_donasi_pemberitahuan_admin(): void
{
    $layar = get_current_screen();
    if (!$layar || $layar->post_type !== WM_DONASI_CPT) {
        return;
    }

    if (!defined('WM_NEXT_REVALIDATE_URL')) {
        echo '<div class="notice notice-warning"><p><strong>Situs belum tersambung.</strong> '
            . 'Konstanta <code>WM_NEXT_REVALIDATE_URL</code> belum ada di <code>wp-config.php</code>, '
            . 'jadi perubahan angka baru tampil di situs setelah maksimal 15 menit.</p></div>';
        return;
    }

    if (get_transient('wm_donasi_penyegaran_ok')) {
        delete_transient('wm_donasi_penyegaran_ok');
        echo '<div class="notice notice-success is-dismissible"><p>'
            . 'Angka tersimpan dan halaman donasi di situs sudah diperbarui.</p></div>';
    }
}
