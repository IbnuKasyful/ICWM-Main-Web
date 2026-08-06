/**
 * Konfigurasi situs induk.
 *
 * Navigasi disusun berdasarkan NIAT PENGUNJUNG, bukan bagan organisasi
 * (PRD §1 poin 1). Tidak ada singkatan internal di label menu.
 */

/**
 * Mode pratinjau.
 *
 * Selama seluruh isi situs masih berupa data contoh — termasuk nomor rekening —
 * penayangan publik diberi dua pengaman:
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
    "Islamic Center Wadi Mubarak menaungi sebelas unit pendidikan dari tahfizh anak usia dini hingga perguruan tinggi, kaderisasi guru Al-Qur'an, serta lembaga amil zakat, infak, sedekah, dan wakaf.",
  url: process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://wadimubarak.com",
  bahasa: "id",
  tahunBerdiri: 2008,
  alamat: {
    jalan: "Jl. Raya Puncak Kp. Goleah RT 01 RW 01, Desa Kuta, Kec. Megamendung",
    kota: "Kabupaten Bogor",
    provinsi: "Jawa Barat",
    kodePos: "16750",
    negara: "Indonesia",
  },
  kontak: {
    telepon: "+62 858 8357 6234",
    whatsapp: "6285883576234",
    email: "psbwadimubarak@gmail.com",
    emailMedia: "media@wadimubarak.com",
    emailKerjaSama: "kerjasama@wadimubarak.com",
    jamLayanan: "Setiap hari, 24 jam",
  },
  lazis: {
    nama: "LAZIS Wadi Mubarak",
    nomorIzin: "SK Menteri Agama RI No. 118 Tahun 2021",
    tahunIzin: 2021,
  },
  sosial: [
    { label: "Instagram", href: "https://instagram.com/ic_wadimubarak" },
    { label: "YouTube", href: "https://youtube.com/@ic_wadimubarak" },
    { label: "Facebook", href: "https://facebook.com/ic.wadimubarak" },
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
        label: "Kaderisasi guru Al-Qur'an",
        href: "/program?jenjang=non-formal",
        deskripsi: "PKM, PG TAUD, I'dad Mu'allimat, dan Imtiaz Putri",
      },
      {
        label: "Program Al-Qur'an untuk umum",
        href: "/program-quran",
        deskripsi: "Graha Qur'an daring dan short camp Wisata Qur'an",
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
      { label: "Rekening resmi LAZIS", href: "/donasi#rekening", deskripsi: "Nomor rekening BSI dan Mandiri atas nama lembaga" },
    ],
  },
  {
    label: "Tentang",
    href: "/tentang",
    anak: [
      { label: "Profil yayasan", href: "/tentang", deskripsi: "Sejarah, visi, dan arah gerak" },
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
  { label: "Kemitraan", href: "/kerja-sama" },
  { label: "Kontak", href: "/kontak" },
];

/** Navigasi footer, dikelompokkan (PRD §5.4 — dipakai ulang di Fase 2). */
export const navFooter: { judul: string; tautan: NavItem[] }[] = [
  {
    judul: "Pendidikan",
    tautan: [
      { label: "Semua unit", href: "/program" },
      { label: "Program Al-Qur'an untuk umum", href: "/program-quran" },
      { label: "Pertanyaan umum", href: "/faq" },
      { label: "Agenda", href: "/agenda" },
      { label: "Galeri", href: "/galeri" },
    ],
  },
  {
    judul: "Yayasan",
    tautan: [
      { label: "Tentang kami", href: "/tentang" },
      { label: "Dampak", href: "/dampak" },
      { label: "Karier", href: "/karier" },
    ],
  },
  {
    judul: "Donasi & kemitraan",
    tautan: [
      { label: "Cara berdonasi", href: "/donasi" },
      { label: "Rekening resmi LAZIS", href: "/donasi#rekening" },
      { label: "Kemitraan", href: "/kerja-sama" },
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

/**
 * PRD §5.3 — lima pintu router niat di beranda.
 *
 * `gambar` dan `ringkas` dipakai sisi depan kartu (foto + label kaca), sedangkan
 * `deskripsi` dan `aksi` muncul di sisi belakang saat kartu dibalik. Kelima
 * `gambar` wajib berupa foto, bukan logo: sisi depan memangkasnya (`object-cover`).
 */
export const routerNiat = [
  {
    label: "Menyekolahkan anak",
    ringkas: "TAUD, MIT, MTs, MA, MBS, STIU",
    deskripsi: "Bandingkan sebelas unit berdasarkan jenjang, gender, model belajar, dan lokasi.",
    href: "/program",
    aksi: "Cari unit yang cocok",
    ikon: "sekolah",
    gambar: "/img/niat-menyekolahkan-anak.jpg",
  },
  {
    label: "Menjadi pengampu Qur'an",
    ringkas: "PKM, PG TAUD, I'dad Mu'allimat, Imtiaz",
    deskripsi: "Empat jalur kaderisasi: tashih bacaan, metodologi mengajar, lalu penempatan sebagai pengampu tahfizh.",
    href: "/program?jenjang=non-formal",
    aksi: "Lihat program kaderisasi",
    ikon: "quran",
    gambar: "/img/niat-belajar-quran.jpg",
  },
  {
    label: "Berdonasi",
    ringkas: "Zakat, infak, sedekah, wakaf",
    deskripsi: "Zakat, infak, sedekah, dan wakaf lewat LAZIS resmi berizin Kementerian Agama.",
    href: "/donasi",
    aksi: "Lihat program donasi",
    ikon: "donasi",
    gambar: "/img/niat-berdonasi.jpg",
  },
  {
    label: "Menjajaki kemitraan",
    ringkas: "Kemitraan TAUD & MIT SAQU",
    deskripsi: "Kemitraan pendirian dan pembinaan TAUD dan MIT Sahabat Al-Qur'an di daerah Anda.",
    href: "/kerja-sama",
    aksi: "Ajukan kemitraan",
    ikon: "kerjasama",
    gambar: "/img/niat-kerja-sama.jpg",
  },
  {
    label: "Mengenal yayasan",
    ringkas: "Profil, arah gerak, capaian",
    deskripsi: "Sejarah, arah gerak, dan capaian program yang bisa diperiksa.",
    href: "/tentang",
    aksi: "Kenali kami",
    ikon: "yayasan",
    gambar: "/img/niat-mengenal-yayasan.webp",
  },
] as const;
