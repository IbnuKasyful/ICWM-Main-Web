/**
 * Pemetaan kategori WordPress ke taksonomi situs induk.
 *
 * Dipisah dari `wp-berita.ts` karena dipakai juga oleh `next.config.ts` lewat
 * `redirect-lama.ts`, untuk mengarahkan URL `/category/<slug>/` situs lama.
 * Karena itu berkas ini tidak boleh punya impor runtime: konfigurasi Next
 * dimuat sebelum alias `@/` dikenal. Impor `type` aman karena hilang saat
 * dikompilasi.
 */

import type { Category } from "@/lib/schemas";

/**
 * PRD §7.1 mengunci kategori situs induk pada tujuh term, sedangkan WordPress
 * yayasan memakai 37 kategori yang tumbuh apa adanya. Peta ini jembatannya.
 *
 * Kunci adalah slug kategori WordPress. Kategori yang TIDAK ada di sini
 * dianggap bukan isi redaksional situs induk dan tulisannya tidak dinaikkan
 * (lihat `tampilkan_di_induk` di `wp-berita.ts`), itu cara kurasi PRD §9.1
 * bekerja selama WordPress belum punya penanda khusus. Yang sengaja
 * ditinggalkan: `pemasaran`, `publishing`, `bimbel-saqu`, `madrasah-online`,
 * `sahabat-resto`, dan `live-streaming`, semuanya lini usaha atau kanal lain,
 * bukan kabar yayasan. Menambah kategori ke situs induk cukup dengan satu baris
 * di sini.
 *
 * Slug ini aman dari Polylang: kategori sengaja tidak diterjemahkan di CMS
 * (mu-plugin `icwm-polylang.php`), jadi slug-nya sama di semua bahasa.
 */
export const KATEGORI_INDUK: Record<string, Category> = {
  // Berita
  "berita-nasional": "berita",
  "berita-timur-tengah": "berita",
  "dunia-islam": "berita",
  yasaqu: "berita",
  // Pengumuman
  pendaftaran: "pengumuman",
  // Kegiatan unit dan program
  "taud-saqu": "kegiatan",
  "mahabbah-boarding-school": "kegiatan",
  "mts-ma": "kegiatan",
  "stiu-wm": "kegiatan",
  "lkid-saqu": "kegiatan",
  "graha-quran": "kegiatan",
  "wq-wisata-quran": "kegiatan",
  "mimbar-membangun-dan-memakmurkan-masjid": "kegiatan",
  // Artikel keilmuan dan pengasuhan
  artikel: "artikel",
  akhlaq: "artikel",
  fiqh: "artikel",
  "fiqh-artikel": "artikel",
  hadist: "artikel",
  tafsir: "artikel",
  qiraat: "artikel",
  "sirah-nabi": "artikel",
  ulama: "artikel",
  sahabat: "artikel",
  tausiyah: "artikel",
  "quranic-parenting": "artikel",
  ramadhan: "artikel",
  dzulhijjah: "artikel",
  "haji-umrah": "artikel",
};

/**
 * Kategori WordPress yang menandai tulisan milik sebuah unit. Dipakai mengisi
 * `unit` dan `unit_utama`, yang menentukan URL kanonik sekaligus penyaring
 * "unit" di /informasi dan blok berita di halaman profil unit.
 */
export const UNIT_DARI_KATEGORI: Record<string, string[]> = {
  "taud-saqu": ["taud-saqu"],
  "mahabbah-boarding-school": ["mts-mbs-putri", "ma-mbs-putri"],
  "mts-ma": ["mts-tahfizh-putra", "ma-tahfizh-putra"],
  "stiu-wm": ["stiu-wadi-mubarak"],
  "lkid-saqu": ["pkm-wadi-mubarak"],
};
