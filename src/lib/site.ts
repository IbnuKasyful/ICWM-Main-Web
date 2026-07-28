/**
 * Konfigurasi situs induk.
 *
 * Navigasi disusun berdasarkan NIAT PENGUNJUNG, bukan bagan organisasi
 * (PRD §1 poin 1). Tidak ada singkatan internal di label menu.
 */

/**
 * Mode pratinjau.
 *
 * Selama seluruh isi situs masih berupa data contoh — termasuk nomor rekening,
 * nomor legalitas, dan nama pengurus — penayangan publik diberi dua pengaman:
 * perayap mesin pencari ditolak (`src/app/robots.ts`, metadata `robots` pada
 * layout) dan sebuah pita penanda ditampilkan di atas kepala halaman.
 *
 * Matikan dengan menghapus `NEXT_PUBLIC_MODE_PRATINJAU` dari environment —
 * lakukan hanya setelah data Tier 1 pada audit diganti dengan data resmi.
 */
export const modePratinjau = process.env["NEXT_PUBLIC_MODE_PRATINJAU"] === "1";

export const site = {
  nama: "Islamic Center Wadi Mubarak",
  namaPendek: "Wadi Mubarak",
  tagline: "Menemani anak Anda tumbuh bersama Al-Qur'an",
  deskripsi:
    "Islamic Center Wadi Mubarak menaungi sepuluh unit pendidikan dari PAUD hingga perguruan tinggi serta lembaga amil zakat, infak, sedekah, dan wakaf di Bogor dan Sleman.",
  url: process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://wadimubarak.com",
  bahasa: "id",
  alamat: {
    jalan: "Jl. Raya Wadi Mubarak No. 1, Megamendung",
    kota: "Kabupaten Bogor",
    provinsi: "Jawa Barat",
    kodePos: "16770",
    negara: "Indonesia",
  },
  kontak: {
    telepon: "+62 251 8250 100",
    whatsapp: "6281234567800",
    email: "info@wadimubarak.com",
    emailMedia: "media@wadimubarak.com",
    emailKerjaSama: "kerjasama@wadimubarak.com",
    jamLayanan: "Senin – Jumat, 08.00 – 16.00 WIB",
  },
  lazis: {
    nama: "LAZIS Wadi Mubarak",
    nomorIzin: "SK Menteri Agama RI No. 118 Tahun 2021",
    tahunIzin: 2021,
  },
  sosial: [
    { label: "Instagram", href: "https://instagram.com/wadimubarak" },
    { label: "YouTube", href: "https://youtube.com/@wadimubarak" },
    { label: "Facebook", href: "https://facebook.com/wadimubarak" },
    { label: "TikTok", href: "https://tiktok.com/@wadimubarak" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  deskripsi?: string;
};

export type NavGrup = {
  label: string;
  href: string;
  anak?: NavItem[];
};

/** Navigasi utama header. */
export const navUtama: NavGrup[] = [
  {
    label: "Pendidikan",
    href: "/program",
    anak: [
      {
        label: "Cari unit yang cocok",
        href: "/program",
        deskripsi: "Saring berdasarkan jenjang, gender, model belajar, dan lokasi",
      },
      {
        label: "Pertanyaan umum",
        href: "/faq",
        deskripsi: "Pendaftaran, biaya, dan kehidupan santri",
      },
    ],
  },
  {
    label: "Donasi",
    href: "/donasi",
    anak: [
      { label: "Program yang bisa didanai", href: "/donasi", deskripsi: "Zakat, infak, sedekah, dan wakaf" },
      { label: "Laporan penyaluran", href: "/transparansi", deskripsi: "Dokumen yang dapat diunduh publik" },
    ],
  },
  {
    label: "Tentang",
    href: "/tentang",
    anak: [
      { label: "Profil yayasan", href: "/tentang", deskripsi: "Sejarah, visi, dan arah gerak" },
      { label: "Legalitas", href: "/tentang/legalitas", deskripsi: "Akta, izin, dan akreditasi" },
      { label: "Pengurus", href: "/tentang/pengurus", deskripsi: "Pembina, pengawas, dan pelaksana" },
      { label: "Transparansi", href: "/transparansi", deskripsi: "Laporan keuangan dan program" },
      { label: "Dampak", href: "/dampak", deskripsi: "Angka capaian dan cerita di baliknya" },
    ],
  },
  {
    label: "Informasi",
    href: "/informasi",
    anak: [
      { label: "Berita & artikel", href: "/informasi", deskripsi: "Arsip lengkap dengan penyaring" },
      { label: "Agenda", href: "/agenda", deskripsi: "Kegiatan yang akan datang" },
      { label: "Galeri", href: "/galeri", deskripsi: "Dokumentasi kegiatan" },
    ],
  },
  { label: "Kerja sama", href: "/kerja-sama" },
  { label: "Kontak", href: "/kontak" },
];

/** Navigasi footer, dikelompokkan (PRD §5.4 — dipakai ulang di Fase 2). */
export const navFooter: { judul: string; tautan: NavItem[] }[] = [
  {
    judul: "Pendidikan",
    tautan: [
      { label: "Semua unit", href: "/program" },
      { label: "Pertanyaan umum", href: "/faq" },
      { label: "Agenda", href: "/agenda" },
      { label: "Galeri", href: "/galeri" },
    ],
  },
  {
    judul: "Yayasan",
    tautan: [
      { label: "Tentang kami", href: "/tentang" },
      { label: "Legalitas", href: "/tentang/legalitas" },
      { label: "Pengurus", href: "/tentang/pengurus" },
      { label: "Dampak", href: "/dampak" },
      { label: "Karier", href: "/karier" },
    ],
  },
  {
    judul: "Donasi & transparansi",
    tautan: [
      { label: "Cara berdonasi", href: "/donasi" },
      { label: "Laporan & dokumen", href: "/transparansi" },
      { label: "Kerja sama", href: "/kerja-sama" },
    ],
  },
  {
    judul: "Bantuan",
    tautan: [
      { label: "Kontak", href: "/kontak" },
      { label: "Cari", href: "/cari" },
      { label: "Berita & artikel", href: "/informasi" },
    ],
  },
];

export const navKepatuhan: NavItem[] = [
  { label: "Kebijakan privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & ketentuan", href: "/syarat-ketentuan" },
  { label: "Perlindungan anak", href: "/perlindungan-anak" },
];

/** PRD §5.3 — lima pintu router niat di beranda. */
export const routerNiat = [
  {
    label: "Menyekolahkan anak",
    deskripsi: "Bandingkan sepuluh unit berdasarkan jenjang, gender, model belajar, dan lokasi.",
    href: "/program",
    aksi: "Cari unit yang cocok",
    ikon: "sekolah",
  },
  {
    label: "Belajar Al-Qur'an",
    deskripsi: "Kelas tahsin dan tahfizh untuk umum — dewasa maupun lansia, luring dan daring.",
    href: "/program/pkm-wadi-mubarak",
    aksi: "Lihat kelas terbuka",
    ikon: "quran",
  },
  {
    label: "Berdonasi",
    deskripsi: "Zakat, infak, sedekah, dan wakaf lewat LAZIS resmi berizin Kementerian Agama.",
    href: "/donasi",
    aksi: "Lihat program donasi",
    ikon: "donasi",
  },
  {
    label: "Menjajaki kerja sama",
    deskripsi: "Kemitraan pendidikan, program sosial, dan kunjungan lembaga.",
    href: "/kerja-sama",
    aksi: "Ajukan kerja sama",
    ikon: "kerjasama",
  },
  {
    label: "Mengenal yayasan",
    deskripsi: "Legalitas, struktur pengurus, laporan keuangan, dan capaian yang bisa diperiksa.",
    href: "/tentang",
    aksi: "Kenali kami",
    ikon: "yayasan",
  },
] as const;
