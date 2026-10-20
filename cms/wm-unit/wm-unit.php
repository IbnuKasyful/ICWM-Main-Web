<?php
/**
 * Plugin Name:       Wadi Mubarak, Unit Tulisan
 * Description:       Kotak "Unit" di editor tulisan, sama dengan filter unit di halaman /informasi situs dan blok berita di halaman profil unit. Tulisan tanpa unit dianggap kabar yayasan.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Requires Plugins:  wp-graphql
 * Author:            Yayasan Wadi Mubarak
 * Text Domain:       wm-unit
 *
 * Pasangan berkas ini di sisi situs: `unitsMentah` di src/data/units.ts (slug
 * unit harus sama persis) dan `KUERI_BERITA` di src/lib/wp-berita.ts.
 *
 * Sebelumnya unit dibaca dari kategori WordPress, tetapi hanya lima kategori
 * yang menandai unit, dan empat unit sama sekali tidak punya kategori. Seperti
 * rubrik (plugin wm-rubrik), daftarnya dikunci: redaksi hanya mencentang,
 * menambah unit hanya oleh admin karena unit baru juga perlu ada di situs.
 */

if (!defined('ABSPATH')) {
    exit;
}

const WM_UNIT_TAKSONOMI = 'wm_unit';

function wm_unit_daftar(): array
{
    return [
        'taud-saqu'         => 'TAUD SAQU',
        'mit-saqu'          => 'MIT SAQU',
        'mts-tahfizh-putra' => 'MTs Wadi Mubarak',
        'ma-tahfizh-putra'  => 'MA Wadi Mubarak',
        'mts-mbs-putri'     => 'SMP Mahabbah Putri',
        'ma-mbs-putri'      => 'SMA Mahabbah Putri',
        'stiu-wadi-mubarak' => 'STIU Wadi Mubarak',
        'pkm-wadi-mubarak'  => 'PKM Wadi Mubarak',
        'pg-taud-saqu'      => 'PG TAUD SAQU',
        'idad-muallimat'    => "I'dad Mu'allimat",
        'imtiaz-putri'      => 'Imtiaz Putri',
    ];
}

function wm_unit_daftarkan(): void
{
    register_taxonomy(WM_UNIT_TAKSONOMI, 'post', [
        'labels' => [
            'name'          => 'Unit',
            'singular_name' => 'Unit',
            'menu_name'     => 'Unit',
            'all_items'     => 'Semua unit',
            'edit_item'     => 'Sunting unit',
            'search_items'  => 'Cari unit',
            'not_found'     => 'Unit tidak ditemukan',
        ],
        'description'        => 'Unit pemilik tulisan. Menentukan filter unit di /informasi dan blok berita di halaman profil unit. Kosongkan untuk kabar yayasan.',
        // Hierarkis supaya tampil sebagai kotak centang dan ikut Sunting Massal.
        'hierarchical'       => true,
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'show_admin_column'  => true,
        'show_in_quick_edit' => true,
        'rewrite'            => false,
        'capabilities'       => [
            'manage_terms' => 'manage_options',
            'edit_terms'   => 'manage_options',
            'delete_terms' => 'manage_options',
            'assign_terms' => 'edit_posts',
        ],
        'show_in_graphql'     => true,
        'graphql_single_name' => 'unitTulisan',
        'graphql_plural_name' => 'daftarUnit',
    ]);
}
add_action('init', 'wm_unit_daftarkan');

/** Unit dibuat saat plugin diaktifkan; aman diulang. */
register_activation_hook(__FILE__, function () {
    wm_unit_daftarkan();
    foreach (wm_unit_daftar() as $slug => $nama) {
        if (!term_exists($slug, WM_UNIT_TAKSONOMI)) {
            wp_insert_term($nama, WM_UNIT_TAKSONOMI, ['slug' => $slug]);
        }
    }
});
