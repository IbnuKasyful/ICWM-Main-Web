/**
 * Data contoh taksonomi `unit` + CPT `unit_profil`.
 *
 * PRD §17 mengizinkan — bahkan meminta — pembangunan dengan data contoh sejak
 * awal. Seluruh isi berkas ini akan digantikan oleh WPGraphQL pada Tahap 0.
 * Bentuknya sengaja dibuat persis seperti hasil kueri GraphQL nanti.
 *
 * Penamaan unit mengikuti nomenklatur madrasah yang lazim dipakai di
 * Indonesia: TAUD (Tahfizh Anak Usia Dini), MIT, MTs, MA, lalu STIU pada
 * jenjang tinggi. Jenjang putri tidak
 * berdiri sendiri-sendiri: MTs dan MA putri berada di bawah satu sekolah
 * berasrama, Mahabbah Boarding School (MBS), sehingga keduanya dicatat sebagai
 * dua unit dengan nama MBS — satu unit hanya boleh punya satu jenjang agar
 * penyaringan di /program tetap bekerja.
 *
 * Empat unit berjenjang `non-formal`, semuanya kaderisasi pengampu Al-Qur'an:
 * PKM (muhaffizh, campur), PG TAUD SAQU (guru TAUD, 3 bulan), I'dad Mu'allimat
 * (guru TAUD, 2 tahun), dan Imtiaz Putri (tahfizh intensif pra-mengajar).
 * Program Al-Qur'an untuk umum — Graha Qur'an dan Wisata Qur'an — bukan unit
 * pendidikan dan tinggal di `src/data/program-quran.ts`, bukan di sini.
 */

import { cabangMitSaqu } from "@/data/cabang-saqu";
import { cabangTaudIcwm } from "@/data/cabang-taud-icwm";
import { persebaranTaud } from "@/data/persebaran-taud";
import type { Cabang, ImageData, UnitProfil } from "@/lib/schemas";

/**
 * Empat pondok cabang penyelenggara PKM (brosur PKM 2026/2027 bagian F).
 * Nomor WhatsApp per pondok belum diumumkan; pendaftaran berjalan lewat jalur
 * PMB STIU di kampus pusat, jadi `kontak_wa` sengaja dikosongkan.
 */
const cabangPkm: Cabang[] = [
  {
    slug: "pkm-al-kautsar-bogor",
    nama: "Pondok Tahfizh Al-Kautsar",
    provinsi: "Jawa Barat",
    pulau: "Jawa",
    kota: "Kota Bogor",
    alamat: "Jl. Danau Bogor Raya, RT.01/RW.13, Katulampa, Kec. Bogor Timur, Kota Bogor, Jawa Barat 16144",
    status_ppdb: "buka",
  },
  {
    slug: "pkm-abdul-hamid-jepara",
    nama: "Pondok Tahfizh Abdul Hamid",
    provinsi: "Jawa Tengah",
    pulau: "Jawa",
    kota: "Kabupaten Jepara",
    alamat: "Jl. Watuagung Pulewijaya, Desa Plajan RT 26 RW 4, Kec. Pakis Aji, Jepara, Jawa Tengah 59452",
    status_ppdb: "buka",
  },
  {
    slug: "pkm-al-quraniyyah-bengkulu",
    nama: "Pondok Al Quraniyyah",
    provinsi: "Bengkulu",
    pulau: "Sumatera",
    kota: "Kabupaten Bengkulu Selatan",
    alamat: "Jl. Affan Bachsin No.13, Ps. Mulia, Kec. Kota Manna, Kab. Bengkulu Selatan, Bengkulu 38518",
    status_ppdb: "buka",
  },
  {
    slug: "pkm-icwm-banjarbaru",
    nama: "Islamic Center Wadi Mubarak Banjarbaru",
    provinsi: "Kalimantan Selatan",
    pulau: "Kalimantan",
    kota: "Kota Banjarbaru",
    alamat: "Jl. Aneka Tambang RT.033 RW.007, Kel. Sungai Besar, Kec. Banjarbaru Selatan, Kota Banjarbaru, Kalimantan Selatan 70714",
    status_ppdb: "buka",
  },
];

export const unitsMentah: unknown[] = [
  {
    slug: "taud-saqu",
    nama_lengkap: "TAUD Sahabat Al-Qur'an",
    nama_pendek: "TAUD SAQU",
    deskripsi_singkat:
      "Tahfizh anak usia dini sejak 3 tahun 7 bulan dengan metode At-Tibyan, kini berjalan di 162 lokasi pada 27 provinsi dengan kurikulum yang sama.",
    url_subdomain: "https://taud.wadimubarak.com",
    logo: { src: "/img/logo-taud-saqu.png", alt: "Logo TAUD Sahabat Al-Qur’an", width: 238, height: 234 },
    warna_aksen: "#00a2e9",
    jenjang: "paud",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "bogor",
    cabang: cabangTaudIcwm,
    persebaran: persebaranTaud,
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2026 – Mei 2027 (tahun ajaran 2026/2027)",
    kontak_wa: "6285714923006",
    urutan_tampil: 1,
    aktif: true,
  },
  {
    slug: "mit-saqu",
    nama_lengkap: "MIT Sahabat Al-Qur'an",
    nama_pendek: "MIT SAQU",
    deskripsi_singkat:
      "Madrasah ibtidaiyah terpadu untuk anak 7–12 tahun dengan kurikulum At-Tibyan, empat pilar pendidikan, dan target hafalan bertingkat sampai 30 juz.",
    url_subdomain: "https://mit.wadimubarak.com",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#3054a6",
    jenjang: "sd",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "bogor",
    cabang: cabangMitSaqu,
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "November 2025 – Februari 2026",
    kontak_wa: "6285718234036",
    urutan_tampil: 2,
    aktif: true,
  },
  {
    slug: "mts-tahfizh-putra",
    nama_lengkap: "MTs Tahfizh Wadi Mubarak Putra",
    nama_pendek: "MTs Tahfizh Putra",
    deskripsi_singkat:
      "Madrasah tsanawiyah putra berasrama: jalur reguler dan takhassush, kurikulum ulama Madinah, bahasa Arab intensif, dan pembinaan musyrif 24 jam.",
    url_subdomain: "https://mtsmawadimubarak.com",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#243c70",
    jenjang: "smp",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Batch 3, tahun pelajaran 2027/2028",
    kontak_wa: "6281111882030",
    urutan_tampil: 3,
    aktif: true,
  },
  {
    slug: "ma-tahfizh-putra",
    nama_lengkap: "MA Tahfizh Wadi Mubarak Putra",
    nama_pendek: "MA Tahfizh Putra",
    deskripsi_singkat:
      "Madrasah aliyah putra: 30 juz bersanad, ulum syar'i, dan program persiapan studi Timur Tengah terpadu sejak kelas sepuluh.",
    url_subdomain: "https://mtsmawadimubarak.com",
    logo: {
      src: "/img/LOGO-MA-WADI-MUBARAK_panjang.png",
      alt: "Logo MA Tahfizh Wadi Mubarak",
      width: 4043,
      height: 1786,
    },
    warna_aksen: "#101d39",
    jenjang: "sma",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Batch 3, tahun pelajaran 2027/2028",
    kontak_wa: "6281111882030",
    urutan_tampil: 4,
    aktif: true,
  },
  {
    slug: "mts-mbs-putri",
    nama_lengkap: "MTs Mahabbah Boarding School Putri",
    nama_pendek: "MTs MBS Putri",
    deskripsi_singkat:
      "Jenjang tsanawiyah Mahabbah Boarding School: asrama putri terpisah, tahfizh berpadu sains, lingkungan bilingual, dan pendampingan berbasis psikologi pendidikan.",
    url_subdomain: "https://mtsmawadimubarak.com",
    logo: {
      src: "/img/logo-mahabbah.png",
      alt: "Logo Mahabbah Boarding School",
      width: 1192,
      height: 1290,
    },
    warna_aksen: "#0e7490",
    jenjang: "smp",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Batch 6 — 1 Agustus 2026 s.d. 30 Juni 2027 (TP 2027/2028)",
    kontak_wa: "62895327002283",
    urutan_tampil: 5,
    aktif: true,
  },
  {
    slug: "ma-mbs-putri",
    nama_lengkap: "MA Mahabbah Boarding School Putri",
    nama_pendek: "MA MBS Putri",
    deskripsi_singkat:
      "Jenjang aliyah Mahabbah Boarding School: target 30 juz bersanad, integrasi Al-Qur'an dan sains, serta bimbingan belajar masuk perguruan tinggi negeri.",
    url_subdomain: "https://mtsmawadimubarak.com",
    logo: {
      src: "/img/logo-mahabbah.png",
      alt: "Logo Mahabbah Boarding School",
      width: 1192,
      height: 1290,
    },
    warna_aksen: "#4a6bb8",
    jenjang: "sma",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Batch 6 — 1 Agustus 2026 s.d. 30 Juni 2027 (TP 2027/2028)",
    kontak_wa: "62895327002283",
    urutan_tampil: 6,
    aktif: true,
  },
  {
    slug: "stiu-wadi-mubarak",
    nama_lengkap: "Sekolah Tinggi Ilmu Ushuluddin Wadi Mubarak",
    nama_pendek: "STIU Wadi Mubarak",
    deskripsi_singkat:
      "Sekolah tinggi prodi Ilmu Al-Qur'an dan Tafsir. Rujukan Pembelajaran Qur’an Bersanad dan Tahfidz 30 Juz Mutqin.",
    url_subdomain: "https://stiuwm.ac.id",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#1b2c52",
    jenjang: "tinggi",
    gender: "campur",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Setahun sekali — PMB tahun akademik 2026/2027",
    kontak_wa: "6285692757850",
    urutan_tampil: 7,
    aktif: true,
  },
  {
    slug: "pkm-wadi-mubarak",
    nama_lengkap: "Program Kaderisasi Muhaffizh Wadi Mubarak",
    nama_pendek: "PKM Wadi Mubarak",
    deskripsi_singkat:
      "Jalur cepat mencetak muhaffizh: dua tahun tahfizh dan tajwid, lalu satu tahun ikatan dinas. Berjalan di empat pondok cabang, tanpa SPP bulanan.",
    url_subdomain: "",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#38bdf8",
    jenjang: "non-formal",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: cabangPkm,
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Tahun ajaran 2026/2027 — KBM mulai sekitar Juli 2026",
    kontak_wa: "6285883576234",
    urutan_tampil: 8,
    aktif: true,
  },
  {
    slug: "pg-taud-saqu",
    nama_lengkap: "Pendidikan Guru Tahfizh Anak Usia Dini Sahabat Al-Qur'an",
    nama_pendek: "PG TAUD SAQU",
    deskripsi_singkat:
      "Kelas asrama tiga bulan bagi muslimah calon guru tahfizh anak usia dini. Angkatan ke-24 diwisuda pada Juli 2025; alumninya mengisi jaringan TAUD di 27 provinsi.",
    url_subdomain: "",
    logo: { src: "/img/logo-taud-saqu.png", alt: "Logo TAUD Sahabat Al-Qur’an", width: 238, height: 234 },
    warna_aksen: "#0284c7",
    jenjang: "non-formal",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Tiga angkatan setiap tahun — angkatan ke-24 diwisuda 10 Juli 2025",
    kontak_wa: "6285883576234",
    urutan_tampil: 9,
    aktif: true,
  },
  {
    slug: "idad-muallimat",
    nama_lengkap: "I'dad Mu'allimatil Qur'an li Roudhoh Wadi Mubarak",
    nama_pendek: "I'dad Mu'allimat",
    deskripsi_singkat:
      "Kaderisasi guru TAUD selama dua tahun penuh: hafalan mutqin, dasar bahasa Arab, ilmu ke-TAUD-an, lalu penempatan mengajar di jaringan sekolah yayasan.",
    url_subdomain: "https://idadmuallimat.wadimubarak.com",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#0f766e",
    jenjang: "non-formal",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "27 Juli – 25 Agustus 2026 (angkatan pertama)",
    kontak_wa: "6285286251819",
    urutan_tampil: 10,
    aktif: true,
  },
  {
    slug: "imtiaz-putri",
    nama_lengkap: "Ma'had Tahfizh Intensif Imtiaz Putri",
    nama_pendek: "Imtiaz Putri",
    deskripsi_singkat:
      "Ma'had tahfizh intensif bagi lulusan SMA sederajat hingga usia 23 tahun yang ingin menuntaskan hafalan dalam waktu singkat dan bersanad.",
    url_subdomain: "https://imtiaz.wadimubarak.com",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#7c3aed",
    jenjang: "non-formal",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    persebaran: [],
    status_ppdb: "buka",
    periode_ppdb: "Tahun ajaran 2025/2026",
    kontak_wa: "6285883576234",
    urutan_tampil: 11,
    aktif: true,
  },
];

/* -------------------------------------------------------------------------- */
/* CPT `unit_profil` (PRD §9.3)                                                */
/* -------------------------------------------------------------------------- */

function gambar(nama: string, w: number, h: number, alt: string) {
  return { src: `/img/${nama}.svg`, alt, width: w, height: h };
}

function galeriUnit(urutan: number, nama: string) {
  return [0, 1, 2, 3, 4, 5].map((i) => {
    const n = ((urutan * 3 + i * 2) % 12) + 1;
    return gambar(
      `galeri-${n}`,
      1200,
      n % 3 === 0 ? 1500 : 900,
      `Dokumentasi kegiatan santri ${nama} (${i + 1})`,
    );
  });
}

type ProfilInput = Omit<UnitProfil, "hero" | "galeri"> & { namaTampil: string };

const profilInput: ProfilInput[] = [
  {
    slug: "taud-saqu",
    unit: "taud-saqu",
    namaTampil: "TAUD SAQU",
    untuk_siapa: [
      "Anak mulai usia 3 tahun 7 bulan yang sudah lulus toilet training dan mampu mengikuti instruksi",
      "Orang tua yang ingin anaknya mengenal Al-Qur'an sebelum masuk MI/SD",
      "Keluarga yang mencari sekolah harian, bukan asrama, di kota terdekat",
      "Keluarga yang siap menuntaskan masa pendidikan tiga tahun di TAUD",
    ],
    keunggulan: [
      {
        judul: "Metode At-Tibyan dari Mesir",
        isi: "Anak belajar membaca sekaligus menerapkan tahsin dan tajwid sejak awal — metode yang sama dipakai di Saudi, Mesir, Jepang, Australia, Malaysia, Brunei, dan Thailand.",
      },
      {
        judul: "Satu kurikulum di semua cabang",
        isi: "Kurikulum, bahan ajar, dan cara pembinaan yang dipakai di kampus induk Megamendung diterapkan sama persis di seluruh jaringan.",
      },
      {
        judul: "Bonus matan Tuhfatul Athfal",
        isi: "Selain hafalan Al-Qur'an, anak turut menghafal matan tajwid Tuhfatul Athfal beserta cara menerapkannya.",
      },
      {
        judul: "Tibyan Ummahat untuk wali santri",
        isi: "Orang tua ikut dibina lewat kelas Tibyan Ummahat, supaya pembiasaan di sekolah berlanjut di rumah.",
      },
      {
        judul: "162 lokasi, satu kurikulum",
        isi: "Materi, target hafalan, dan penilaian sama di setiap lokasi — keluarga yang pindah kota tidak perlu memulai dari awal.",
      },
    ],
    kurikulum: [
      { judul: "Baca Al-Qur'an", isi: "Metode At-Tibyan: membaca sekaligus menerapkan tahsin dan tajwid, plus matan Tuhfatul Athfal." },
      { judul: "Tahfizh Al-Qur'an", isi: "Menu utama program — menekankan jumlah hafalan sekaligus kekuatan muraja'ah." },
      { judul: "Aqidah dan akhlak", isi: "Penanaman tauhid dan karakter Islami lewat hadits, dzikir, dan doa harian." },
      { judul: "Praktik ibadah", isi: "Penguasaan ibadah sehari-hari sesuai tuntunan Al-Qur'an dan Sunnah." },
      { judul: "Adab Qur'ani", isi: "Pengenalan dan pembiasaan adab hidup sehari-hari sesuai tuntunan Al-Qur'an." },
      { judul: "Outing", isi: "Kegiatan edukatif bulanan di luar sekolah: olahraga, museum, kebun binatang, dan lainnya." },
    ],
    fasilitas: [
      "Ruang kelas ber-AC dengan area lesehan",
      "Halaman bermain dan kebun mini",
      "Ruang tahfizh terpisah",
      "Klinik dan perawat harian",
      "Antar-jemput di cabang tertentu",
    ],
    alur_ppdb: [
      "Pilih lokasi terdekat dan hubungi panitianya lewat WhatsApp",
      "Mengisi formulir daring dan luring serta membayar biaya pendaftaran",
      "Melengkapi berkas: akta kelahiran, KTP orang tua, kartu keluarga, dan pas foto 3x4 masing-masing 3 lembar",
      "Observasi anak: kejelasan pelafalan huruf, pemahaman instruksi, dan toilet training",
      "Wawancara wali santri dan penyampaian program",
      "Pengumuman dan daftar ulang",
    ],
  },
  {
    slug: "mit-saqu",
    unit: "mit-saqu",
    namaTampil: "MIT SAQU",
    untuk_siapa: [
      "Anak usia 7–12 tahun yang sudah lulus calistung dan mengenal huruf hijaiyah",
      "Orang tua yang menginginkan hafalan kuat tanpa mengorbankan akademik",
      "Lulusan TAUD SAQU maupun TK/RA lain — pendaftar non-TAUD mengikuti Pra MIT lebih dulu",
    ],
    keunggulan: [
      {
        judul: "Target bertingkat 5 sampai 30 juz",
        isi: "Santri naik bertahap — 5, 10, 15, hingga 30 juz — mengikuti kemampuannya, bukan satu target seragam untuk semua.",
      },
      {
        judul: "Kurikulum At-Tibyan",
        isi: "Disusun dan dievaluasi berkala oleh para ahli ilmu kota suci Madinah; sudah teruji di lima benua dan 14 negara.",
      },
      {
        judul: "Empat pilar pendidikan",
        isi: "Tarbiyah, tahsin, tahfizh, dan akademik berjalan bersamaan — tahfizh tidak menggeser pelajaran sekolah.",
      },
      {
        judul: "Kurikulum madrasah penuh",
        isi: "Kurikulum Tigabelas dan Kurikulum Merdeka, dengan kelulusan ditandai lulus Asesmen Madrasah.",
      },
      {
        judul: "Apresiasi bagi penuntas 30 juz",
        isi: "Santri yang menuntaskan 30 juz mendapat apresiasi yayasan — di antaranya umrah dan kunjungan ke Jepang.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "Program unggulan menghafal Al-Qur'an dengan target bertingkat sampai 30 juz." },
      { judul: "Tahsin", isi: "Bimbingan membaca Al-Qur'an beserta ilmu tajwid, dilengkapi matan Tuhfatul Athfal." },
      { judul: "Tarbiyah", isi: "Pembekalan keimanan dan akhlakul karimah lewat materi hadits, dzikir, dan doa harian." },
      { judul: "Akademik", isi: "Kurikulum Tigabelas dan Kurikulum Merdeka, ditutup dengan Asesmen Madrasah." },
      { judul: "Bahasa Arab dasar", isi: "Bekal bahasa Arab dasar dan khotmut tilawah sebagai target kelulusan." },
      { judul: "Kegiatan penunjang", isi: "Memanah, olahraga, outbond, liqo hiwari, dan kunjungan belajar." },
    ],
    fasilitas: [
      "18 ruang kelas dengan proyektor",
      "Masjid kampus berkapasitas 800 jamaah",
      "Laboratorium sains dan komputer",
      "Lapangan olahraga dan kolam renang",
      "Perpustakaan dengan 6.000 judul",
      "Kantin sehat dan klinik",
    ],
    alur_ppdb: [
      "Mengisi formulir daring dan luring serta membayar biaya pendaftaran",
      "Melengkapi berkas: akta kelahiran, KTP orang tua, kartu keluarga, pas foto 3x4 masing-masing 4 lembar, dan ijazah RA/TK/KB",
      "Tes calistung dan pengenalan huruf hijaiyah — mampu membaca iqro' 3 lebih diutamakan",
      "Wawancara anak dan komitmen kerja sama wali santri",
      "Pengumuman hasil dan daftar ulang",
      "Mengikuti Pra MIT bagi pendaftar yang bukan lulusan TAUD",
    ],
  },
  {
    slug: "mts-tahfizh-putra",
    unit: "mts-tahfizh-putra",
    namaTampil: "MTs Tahfizh Putra",
    untuk_siapa: [
      "Lulusan MI/SD putra yang siap tinggal di asrama",
      "Anak dengan hafalan awal minimal 1 juz",
      "Keluarga dari luar kota yang mencari pembinaan penuh waktu",
    ],
    keunggulan: [
      {
        judul: "Fondasi dulu, hafalan kemudian",
        isi: "Tiga bulan pertama dipakai membenahi adab, fiqh thaharah dan shalat, serta bacaan sesuai standar sanad At-Tibyan — baru setelah itu masuk program takhassush tahfizh.",
      },
      {
        judul: "Musyrif tinggal di asrama",
        isi: "Satu musyrif mendampingi 12 santri, tinggal di gedung yang sama, bukan datang-pergi.",
      },
      {
        judul: "Ijazah formal, bukan sekadar sertifikat pesantren",
        isi: "Santri mengikuti kurikulum madrasah tsanawiyah penuh dan dapat melanjutkan ke MA maupun SMA mana pun.",
      },
      {
        judul: "Halaqah kepengasuhan",
        isi: "Pembinaan psikologi remaja yang terstruktur, disusun bersama akademisi senior Psikologi UGM dan UNY untuk menihilkan perundungan.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "Program takhassush tahfizh menuju 30 juz dengan sanad qiroat, dimulai setelah bacaan lulus standar." },
      { judul: "Ulum syar'i", isi: "Fiqh, hadits, aqidah, tafsir, dan sirah nabawiyah." },
      { judul: "Bahasa Arab intensif", isi: "Muhadatsah, kitab turats, dan pendampingan native speaker." },
      { judul: "Akademik", isi: "Kurikulum madrasah tsanawiyah penuh, ditambah dauroh bahasa Arab." },
      { judul: "Life skills", isi: "Riset, keterampilan digital, copywriting, dan public speaking." },
    ],
    fasilitas: [
      "Gedung pesantren dengan fasilitas penunjang pembelajaran intensif",
      "Masjid dan ruang halaqah terbuka",
      "Ruang makan dan dapur gizi terpantau",
      "Lapangan mini soccer, futsal, basket, dan area panahan",
      "Klinik 24 jam dengan perawat menetap",
      "Laundry dan koperasi santri",
    ],
    alur_ppdb: [
      "Pendaftaran daring",
      "Tes kemampuan dan tes tahfizh",
      "Wawancara orang tua",
      "Pengumuman hasil tes",
    ],
  },
  {
    slug: "ma-tahfizh-putra",
    unit: "ma-tahfizh-putra",
    namaTampil: "MA Tahfizh Putra",
    untuk_siapa: [
      "Lulusan MTs/SMP putra dengan hafalan minimal 5 juz",
      "Santri yang menargetkan 30 juz sebelum kuliah",
      "Calon mahasiswa Timur Tengah maupun perguruan tinggi dalam negeri",
    ],
    keunggulan: [
      {
        judul: "Tahfizh 30 juz bersanad",
        isi: "Program sanad berjalan di bawah naungan Maqarie Al-Qur'aniyah Madinah, badan internasional penghafal Al-Qur'an.",
      },
      {
        judul: "Persiapan studi Timur Tengah sejak kelas sepuluh",
        isi: "Pembinaan akademik terpadu, bukan bimbingan dadakan menjelang kelulusan.",
      },
      {
        judul: "Syaikh bersanad menetap 24 jam",
        isi: "Syaikh Gameel Thohir Al Azzany, ahli ilmu Al-Qur'an asal Yaman dengan sanad bersambung ke Rasulullah, tinggal di kampus dan membersamai kegiatan santri.",
      },
      {
        judul: "Jejaring alumni di Saudi",
        isi: "Lebih dari 30 alumni menempuh S1 sampai S3 di Universitas Islam Madinah, King Abdul Aziz Jeddah, King Khalid Abha, dan kampus lainnya.",
      },
      {
        judul: "Pengajar lulusan kampus terbaik",
        isi: "Tim ulum syar'i merupakan alumni Universitas Islam Madinah, King Abdul Aziz Jeddah, dan LIPIA.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "30 juz dengan sanad qiroat, tadrib sanad, dan ujian tasmi' bertahap." },
      { judul: "Ulum syar'i", isi: "Fiqh, ushul fiqh, hadits, aqidah, tafsir, dan sirah nabawiyah." },
      { judul: "Bahasa Arab", isi: "Muhadatsah, kitab turats, native speaker, serta public speaking berbahasa Arab." },
      { judul: "Akademik", isi: "Kurikulum madrasah aliyah, peminatan IPA dan IPS." },
      { judul: "Middle East study preparation", isi: "Bimbingan dan persiapan studi ke Timur Tengah, terpadu sejak kelas sepuluh." },
    ],
    fasilitas: [
      "Gedung pesantren representatif dengan fasilitas modern",
      "Masjid utama dan ruang tasmi'",
      "Laboratorium IPA dan komputer",
      "Perpustakaan kitab berbahasa Arab",
      "Lapangan mini soccer dan area panahan",
      "Klinik 24 jam",
    ],
    alur_ppdb: [
      "Pendaftaran daring",
      "Tes kemampuan dan tes tahfizh",
      "Wawancara orang tua",
      "Pengumuman hasil tes",
    ],
  },
  {
    slug: "mts-mbs-putri",
    unit: "mts-mbs-putri",
    namaTampil: "MTs MBS Putri",
    untuk_siapa: [
      "Lulusan MI/SD putri yang siap mondok",
      "Keluarga yang menginginkan asrama putri terpisah penuh",
      "Santriwati dengan hafalan awal minimal 1 juz",
    ],
    keunggulan: [
      {
        judul: "Kompleks putri terpisah",
        isi: "Asrama, kelas, dan area olahraga Mahabbah Boarding School berada di zona tersendiri dengan akses terbatas.",
      },
      {
        judul: "Seluruh pengampu perempuan",
        isi: "Musyrifah dan guru tahfizh perempuan, tinggal di asrama bersama santriwati.",
      },
      {
        judul: "Lingkungan bilingual",
        isi: "Bahasa Arab dan Inggris dipakai aktif sehari-hari lewat Arabic & English Camp dan pembiasaan asrama.",
      },
      {
        judul: "Halaqah kepengasuhan",
        isi: "Pembinaan psikologi remaja berbasis riset, disusun bersama akademisi senior Psikologi UGM dan UNY sebagai jaminan lingkungan yang sehat.",
      },
      {
        judul: "Bersambung ke MA di sekolah yang sama",
        isi: "Lulusan MTs melanjutkan ke MA MBS tanpa pindah asrama maupun berganti pengampu.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "Tahfizh menuju 30 juz dengan tahsin dan tilawah bersanad." },
      { judul: "Diniyah", isi: "Fikih wanita, akidah, bahasa Arab, dan sirah nabawiyah." },
      { judul: "Bahasa", isi: "Bahasa Arab dan Inggris aktif untuk membentuk kemampuan komunikasi global." },
      { judul: "Akademik", isi: "Kurikulum madrasah tsanawiyah penuh, dipadukan dengan sains." },
      { judul: "Qur'anic parenting", isi: "Pembentukan akhlak, disiplin, dan kemandirian berbasis Al-Qur'an dan Sunnah." },
    ],
    fasilitas: [
      "Asrama putri di zona terpisah",
      "Musala dan ruang tahfizh khusus",
      "Ruang keterampilan dan tata boga",
      "Klinik dengan perawat perempuan",
      "Area olahraga tertutup dan lapangan panahan",
    ],
    alur_ppdb: [
      "Pendaftaran daring",
      "Tes kemampuan dan tes tahfizh — dijadwalkan setiap akhir pekan sesuai konfirmasi wali santri",
      "Wawancara orang tua",
      "Pengumuman hasil tes, lalu daftar ulang pada Juli 2027",
    ],
  },
  {
    slug: "ma-mbs-putri",
    unit: "ma-mbs-putri",
    namaTampil: "MA MBS Putri",
    untuk_siapa: [
      "Lulusan MTs/SMP putri dengan hafalan minimal 5 juz",
      "Santriwati yang menargetkan 30 juz sebelum kuliah",
      "Keluarga yang mencari lingkungan keputrian penuh",
    ],
    keunggulan: [
      {
        judul: "Target 30 juz",
        isi: "Jadwal setoran dan muraja'ah dirancang agar tuntas sebelum kelas dua belas berakhir.",
      },
      {
        judul: "Kelas keputrian",
        isi: "Fikih wanita, kesehatan reproduksi, dan pengasuhan diajarkan terstruktur.",
      },
      {
        judul: "Bimbingan belajar masuk PTN",
        isi: "Pendampingan intensif menuju perguruan tinggi negeri favorit, berjalan berdampingan dengan target tahfizh.",
      },
      {
        judul: "Syaikhoh bersanad menetap",
        isi: "Syaikhoh Amal Ummu Thohir, ahli ilmu Al-Qur'an asal Yaman dengan sanad bersambung ke Rasulullah, menetap 24 jam membersamai kegiatan santriwati.",
      },
      {
        judul: "Integrasi Al-Qur'an dan sains",
        isi: "Kurikulum tahfizh dan sains dipadukan di bawah pengawasan masyaikh Universitas Ummul Qura Makkah dan Universitas Islam Madinah.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "30 juz dengan tahsin, tilawah bersanad, dan ujian tasmi' bertahap." },
      { judul: "Diniyah", isi: "Fikih, tafsir, hadis, dan bahasa Arab lanjutan." },
      { judul: "Sains dan akademik", isi: "Kurikulum madrasah aliyah dengan peminatan IPA dan IPS." },
      { judul: "Persiapan studi lanjut", isi: "Bimbingan belajar masuk PTN dan kuliah umum bersama para masyaikh." },
    ],
    fasilitas: [
      "Asrama putri di zona terpisah",
      "Ruang tahfizh dan musala keputrian",
      "Laboratorium IPA",
      "Ruang keterampilan dan tata boga",
      "Klinik dengan tenaga kesehatan perempuan",
    ],
    alur_ppdb: [
      "Pendaftaran daring",
      "Tes kemampuan dan tes tahfizh — dijadwalkan setiap akhir pekan sesuai konfirmasi wali santri",
      "Wawancara orang tua",
      "Pengumuman hasil tes, lalu daftar ulang pada Juli 2027",
    ],
  },
  {
    slug: "stiu-wadi-mubarak",
    unit: "stiu-wadi-mubarak",
    namaTampil: "STIU Wadi Mubarak",
    untuk_siapa: [
      "Lulusan MA/SMA/pesantren, putra maupun putri, yang ingin mendalami ilmu Al-Qur'an dan tafsir",
      "Pendaftar dengan bekal dasar bahasa Arab — hafalan awal tidak disyaratkan",
      "Calon pengajar dan dai yang siap menjalani dua tahun pengabdian setelah lulus",
    ],
    keunggulan: [
      {
        judul: "Gelar sarjana untuk penghafal Al-Qur'an",
        isi: "Berdiri pada 2017 sebagai lanjutan dari program tahfizh Ma'had Wadi Mubarak dan eLKID, supaya penghafal Al-Qur'an bisa menuntaskan hafalan sekaligus memegang gelar sarjana.",
      },
      {
        judul: "Hafalan tidak jadi syarat masuk",
        isi: "Yang diminta hanya bekal dasar bahasa Arab. Hafalan 30 juz dituntaskan selama menempuh kuliah, bukan sebelum mendaftar.",
      },
      {
        judul: "Dauroh hadits Shahih Bukhari",
        isi: "Pada tiga tahun terakhir mahasiswa mengikuti dauroh menghafal hadits Shahih Bukhari, di luar materi ulumul Qur'an dan hadits.",
      },
      {
        judul: "Angkatan kecil dan terukur",
        isi: "Sekitar 60 mahasiswa dan mahasiswi diterima setiap tahun, dan pendaftaran hanya dibuka sekali dalam setahun.",
      },
      {
        judul: "Pengabdian sampai daerah 3T",
        isi: "Dua tahun pengabdian setelah lulus, termasuk penempatan di daerah tertinggal, terdepan, dan terluar.",
      },
    ],
    kurikulum: [
      { judul: "Program studi", isi: "Ilmu Al-Qur'an dan Tafsir (IQT), S1, paling cepat empat tahun." },
      { judul: "Tahfizh", isi: "30 juz dituntaskan selama masa kuliah." },
      { judul: "Tajwid", isi: "Matan dan syarah Tuhfatul Athfal serta Jazariyah." },
      { judul: "Ulum Al-Qur'an dan hadits", isi: "Materi ilmu Al-Qur'an dan hadits, ditambah dauroh Shahih Bukhari pada tiga tahun terakhir." },
      { judul: "Pengabdian", isi: "Dua tahun pengabdian setelah masa kuliah selesai." },
    ],
    fasilitas: [
      "Gedung kuliah dan ruang seminar",
      "Asrama mahasiswa",
      "Perpustakaan induk dan e-jurnal STIU",
      "Pusat studi dan unit kegiatan mahasiswa",
      "Masjid kampus",
    ],
    alur_ppdb: [
      "Mendaftar daring lewat portal SPMB STIU Wadi Mubarak",
      "Membayar biaya pendaftaran — nominalnya disampaikan panitia, sudah termasuk makan selama ujian",
      "Mengikuti ujian masuk sesuai jadwal yang diumumkan panitia",
      "Pengumuman kelulusan",
      "Daftar ulang, termasuk penetapan uang pangkal",
    ],
  },
  {
    slug: "pkm-wadi-mubarak",
    unit: "pkm-wadi-mubarak",
    namaTampil: "PKM Wadi Mubarak",
    untuk_siapa: [
      "Ikhwan berusia 17–25 tahun; tahun ini PKM belum menerima pendaftar akhwat",
      "Pendaftar STIU Wadi Mubarak yang nilainya belum memenuhi standar kelulusan STIU",
      "Ikhwan tanpa ijazah formal SMA/MA yang tetap ingin menempuh pendidikan tahfizh",
      "Calon pengampu halaqah di cabang yayasan yang sudah ada maupun yang akan dibuka",
    ],
    keunggulan: [
      {
        judul: "Tanpa SPP bulanan",
        isi: "PKM adalah program beasiswa. Yang ditanggung pendaftar hanya uang pangkal sekali bayar untuk keperluan pribadi santri dan sarana pondok — tidak ada biaya bulanan. Nominalnya disampaikan panitia saat daftar ulang.",
      },
      {
        judul: "Tidak wajib punya ijazah formal",
        isi: "Ikhwan berusia 17–25 tahun tetap dapat mendaftar meski tidak memiliki ijazah SMA/MA. Yang dinilai kemampuan dan kesungguhannya.",
      },
      {
        judul: "Lulus tahsin dulu, baru menghafal",
        isi: "Satu setengah bulan pertama habis untuk tahsin dan matan Tuhfatul Athfal. Ujiannya menjadi syarat: yang belum lulus tidak dilepas menambah hafalan.",
      },
      {
        judul: "Dua tahun, bukan empat",
        isi: "Dirancang lebih singkat daripada STIU supaya muhaffizh lebih cepat siap diterjunkan ke masyarakat, lalu satu tahun ikatan dinas.",
      },
      {
        judul: "Diampu lulusan eLKID dan STIU",
        isi: "Seluruh pengajar merupakan muhaffizh lulusan Lembaga Kaderisasi Imam dan Dai (eLKID) serta STIU Wadi Mubarak.",
      },
    ],
    kurikulum: [
      { judul: "Bulan 1–1,5 — Tahsin dan Tajwid I", isi: "Tahsin plus setoran juz 30, serta matan dan syarah Tuhfatul Athfal yang wajib dihafal." },
      { judul: "Pekan VII–VIII — Ujian", isi: "Ujian tahsin dan tajwid; kelulusannya menjadi syarat melanjutkan hafalan Al-Qur'an." },
      { judul: "Bulan III – Semester III — Tahfizh", isi: "Hafalan 30 juz, ditutup ujian yang menentukan peluang mengambil Tajwid II." },
      { judul: "Semester IV — Tajwid II dan sanad", isi: "Matan dan syarah Jazariyah serta sanad tajwid, bersyarat sesuai capaian belajar santri." },
      { judul: "Semester IV — Manajemen halaqah", isi: "Materi wajib bagi setiap santri, dilanjutkan praktik pengelolaan halaqah (PPL)." },
    ],
    fasilitas: [
      "Asrama di salah satu dari empat pondok cabang penyelenggara",
      "Ruang halaqah dan ruang tashih",
      "Perpustakaan kitab dan mushaf rujukan",
      "Masjid pondok",
      "Idarotul Itqan: muraja'ah Sya'ban–Ramadan di kampus pusat",
    ],
    alur_ppdb: [
      "Mendaftar sebagai calon mahasiswa STIU Wadi Mubarak",
      "Mengikuti tes karantina menghafal",
      "Bagi yang nilainya di bawah standar kelulusan STIU sampai batas tertentu, ditawarkan masuk PKM",
      "Pengumuman kelulusan sekaligus pengumuman jadwal daftar ulang tiap pondok cabang",
      "Daftar ulang: surat pernyataan kesiapan belajar, sebagian uang pangkal, ijazah dan akta kelahiran asli",
      "Penandatanganan surat komitmen belajar bersama wali santri",
    ],
  },
  {
    slug: "pg-taud-saqu",
    unit: "pg-taud-saqu",
    namaTampil: "PG TAUD SAQU",
    untuk_siapa: [
      "Muslimah yang ingin menekuni jalur mengajar Al-Qur'an untuk anak usia dini",
      "Calon perintis TAUD di daerah asalnya sendiri",
      "Guru TK/RA yang ingin menambah kemampuan tahfizh dan metode talqin",
    ],
    keunggulan: [
      {
        judul: "Tiga bulan, satu keterampilan utuh",
        isi: "Program dirancang singkat tapi rampung: peserta keluar dengan bacaan yang sudah ditashih sekaligus metode mengajar yang siap dipakai.",
      },
      {
        judul: "Beasiswa pendidikan",
        isi: "Biaya program ditanggung yayasan bagi peserta yang lolos seleksi, dengan syarat dan ketentuan yang disampaikan panitia.",
      },
      {
        judul: "Sistem yang bisa dijalankan sendiri",
        isi: "Kurikulum, jadwal, dan perangkat penilaian TAUD diberikan lengkap supaya alumni bisa membuka kelas tanpa menunggu pendampingan.",
      },
      {
        judul: "Dua puluh empat angkatan sudah diluluskan",
        isi: "Angkatan ke-24 diwisuda pada 10 Juli 2025 di Megamendung. Alumninya mengajar di jaringan TAUD SAQU yang kini berjalan di 162 lokasi pada 27 provinsi.",
      },
      {
        judul: "Praktik langsung di TAUD yang berjalan",
        isi: "Peserta mengajar di kelas TAUD SAQU yang sedang berjalan, bukan simulasi antar-sesama peserta.",
      },
    ],
    kurikulum: [
      { judul: "Tahsin dan tahfizh", isi: "Perbaikan bacaan, tajwid tathbiqi, dan penambahan hafalan selama masa asrama." },
      { judul: "Metode At-Tibyan", isi: "Metode talqin untuk anak usia dini beserta perangkat penilaian hafalannya." },
      { judul: "Ke-TAUD-an", isi: "Psikologi anak usia dini, pengelolaan kelas, dan penyusunan rencana pembelajaran." },
      { judul: "Praktik mengajar", isi: "Microteaching lalu praktik terbimbing di kelas TAUD SAQU." },
    ],
    fasilitas: [
      "Asrama peserta selama masa program",
      "Ruang halaqah dan ruang tashih",
      "Kelas TAUD SAQU sebagai tempat praktik",
      "Modul dan perangkat ajar untuk dibawa pulang",
      "Masjid kampus",
    ],
    alur_ppdb: [
      "Hubungi panitia lewat WhatsApp untuk berkas dan jadwal angkatan",
      "Tes bacaan dan hafalan",
      "Wawancara motivasi dan komitmen mengajar",
      "Pengumuman, penetapan beasiswa, dan kedatangan ke asrama",
    ],
  },
  {
    slug: "idad-muallimat",
    unit: "idad-muallimat",
    namaTampil: "I'dad Mu'allimat",
    untuk_siapa: [
      "Muslimah lulusan SMA/MA/MAK sederajat berusia 18–21 tahun",
      "Calon peserta dengan hafalan minimal juz 30 dan bacaan yang sudah baik",
      "Yang bersedia tinggal di asrama dua tahun penuh dan belum menikah selama program",
    ],
    keunggulan: [
      {
        judul: "Bebas biaya pendidikan dan asrama",
        isi: "Biaya pendidikan, akomodasi, dan kegiatan ditanggung yayasan; rincian komponen yang ditanggung peserta disampaikan panitia saat pendaftaran.",
      },
      {
        judul: "Kepastian karier sejak tahun ketiga",
        isi: "Lulusan ditempatkan mengajar di salah satu sekolah jaringan Wadi Mubarak melalui kontrak pengabdian.",
      },
      {
        judul: "Target hafalan yang realistis",
        isi: "Lima juz dengan standar mutqin — dituntaskan betul, bukan dikejar jumlahnya.",
      },
      {
        judul: "Jalur gelar S1 PG PAUD",
        isi: "Yayasan menyiapkan kerja sama dengan perguruan tinggi mitra bagi peserta yang ingin melanjutkan ke jenjang sarjana.",
      },
      {
        judul: "Al-Qur'an sebagai porsi terbesar",
        isi: "Sekitar 44 persen jam belajar diberikan untuk Al-Qur'an dan tajwid sebelum materi kependidikan bertambah.",
      },
    ],
    kurikulum: [
      { judul: "Marhalah I — bulan 1–3", isi: "Tahsin, tajwid nazhari, dan dasar bahasa Arab." },
      { judul: "Marhalah II — bulan 4–6", isi: "Fokus penuh pada hafalan Al-Qur'an." },
      { judul: "Semester 2 — bulan 7–12", isi: "Bahasa Arab lanjutan serta pengantar ilmu ke-TAUD-an dan ilmu syar'i." },
      { judul: "Semester 3 — bulan 13–18", isi: "Metode At-Tibyan, pengajaran Al-Qur'an anak usia dini, dan microteaching." },
      { judul: "Semester 4 — bulan 19–24", isi: "Praktik pengalaman lapangan terbimbing, pengelolaan kelas, dan etika profesi." },
    ],
    fasilitas: [
      "Asrama putri di kompleks kampus Megamendung",
      "Pendampingan musyrifah setiap hari",
      "Ruang halaqah dan ruang tashih",
      "Sekolah TAUD jaringan yayasan sebagai tempat praktik",
      "Perpustakaan dan masjid kampus",
    ],
    alur_ppdb: [
      "Mengisi formulir pendaftaran daring (27 Juli – 25 Agustus 2026)",
      "Verifikasi berkas administrasi",
      "Tes bacaan dan hafalan Al-Qur'an serta wawancara kepribadian, dijadwalkan per akhir pekan",
      "Pengumuman satu pekan setelah ujian",
      "Daftar ulang dan orientasi pada September 2026",
    ],
  },
  {
    slug: "imtiaz-putri",
    unit: "imtiaz-putri",
    namaTampil: "Imtiaz Putri",
    untuk_siapa: [
      "Lulusan SMA/MA sederajat hingga usia 23 tahun",
      "Santriwati yang ingin menuntaskan hafalan dalam waktu singkat sebelum kuliah atau mengajar",
      "Yang siap tinggal di asrama dengan jadwal tahfizh padat",
    ],
    keunggulan: [
      {
        judul: "Sertifikasi hafalan bersanad",
        isi: "Ujian hafalan mengikuti standar lembaga sertifikasi huffazh internasional, bukan penilaian internal semata.",
      },
      {
        judul: "Halaqah kecil",
        isi: "Peserta dibagi ke dalam enam halaqah agar setiap santriwati disimak langsung setiap hari.",
      },
      {
        judul: "Diampu alumni Wadi Mubarak",
        isi: "Guru Al-Qur'an merupakan lulusan Islamic Center Wadi Mubarak yang bacaannya sudah ditashih.",
      },
      {
        judul: "Jalur lanjut ke mengajar",
        isi: "Lulusan yang ingin menekuni jalur mengajar dapat melanjutkan ke PG TAUD SAQU atau I'dad Mu'allimat.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh intensif", isi: "Setoran dan muraja'ah harian dengan target yang disusun per peserta." },
      { judul: "Tahsin dan tajwid", isi: "Perbaikan bacaan dan makharijul huruf sebelum penambahan hafalan dipercepat." },
      { judul: "Diniyah", isi: "Fikih wanita, akidah, adab, dan sirah nabawiyah." },
      { judul: "Pembinaan keasramaan", isi: "Adab harian, kemandirian, dan pembinaan ruhiyah bersama musyrifah." },
    ],
    fasilitas: [
      "Asrama putri di kompleks kampus Megamendung",
      "Ruang tahfizh dan musala keputrian",
      "Pendampingan musyrifah menetap",
      "Ruang makan dan klinik kampus",
    ],
    alur_ppdb: [
      "Mengisi formulir pendaftaran daring di laman Imtiaz Putri",
      "Tes bacaan dan hafalan Al-Qur'an",
      "Wawancara calon santriwati dan wali",
      "Pengumuman dan daftar ulang",
    ],
  },
];

/**
 * Unit yang fotonya sudah tersedia memakai dokumentasi sungguhan; sisanya
 * masih memakai gambar contoh dari `galeriUnit`. Begitu satu unit dapat foto,
 * cukup tambahkan slug-nya di sini — tidak ada yang lain yang perlu diubah.
 *
 * MTs dan MA berbagi satu berkas dokumentasi: kedua jenjang tinggal di kampus
 * yang sama dan difoto pada kegiatan yang sama. Yang dibedakan hanya foto hero
 * dan urutan galerinya, supaya halaman kedua unit tidak tampak kembar.
 */
function fotoDok(nama: string, alt: string, width: number, height: number): ImageData {
  return { src: `/img/${nama}.jpg`, alt, width, height };
}

/** Dokumentasi MTs & MA Tahfizh Wadi Mubarak Putra, Megamendung. */
const fotoTahfizhPutra = [
  fotoDok(
    "galeri-mtsma-apel-pagi",
    "Santri MTs dan MA Tahfizh Putra berbaris pada apel pagi di halaman masjid kampus Megamendung",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-kelas-papan-tulis",
    "Ustadz menerangkan materi di papan tulis di hadapan santri MTs dan MA Tahfizh Putra pada pelajaran pagi",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-halaqah-tahsin",
    "Halaqah tahsin MTs Tahfizh Putra: satu pengampu menyimak delapan santri duduk melingkar",
    1280,
    720,
  ),
  fotoDok(
    "galeri-mtsma-kelas-malam-penjelasan",
    "Ustadz menjelaskan pelajaran kepada santri MTs dan MA Tahfizh Putra yang duduk di bangku kelas pada jam belajar malam",
    2000,
    1500,
  ),
  fotoDok(
    "galeri-mtsma-menulis-di-kelas",
    "Santri MTs dan MA Tahfizh Putra berseragam cokelat menulis di bukunya saat pelajaran berlangsung",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-dauroh-bahasa-arab",
    "Foto bersama peserta dauroh bahasa Arab intensif MTs dan MA Wadi Mubarak di masjid kampus",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-soal-tertulis-ruang-kelas",
    "Santri MTs dan MA Tahfizh Putra serempak mengerjakan soal tertulis di bangku masing-masing",
    1280,
    720,
  ),
  fotoDok(
    "galeri-mtsma-kelas-malam",
    "Santri MTs dan MA Tahfizh Putra menyimak pelajaran di ruang kelas pada jam belajar malam",
    2000,
    1500,
  ),
  fotoDok(
    "galeri-mtsma-olahraga-futsal",
    "Santri MTs dan MA Tahfizh Putra berfoto bersama seusai bermain futsal di lapangan kampus",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-menyimak-pelajaran",
    "Dua santri MTs dan MA Tahfizh Putra berseragam cokelat menyimak penjelasan ustadz dari bangku kelas",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-lembar-soal",
    "Santri MTs dan MA Tahfizh Putra mengerjakan lembar soal di ruang kelas",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-penghargaan-tahfizh",
    "Penyerahan penghargaan prestasi tahfizh Al-Qur'an terbaik kepada santri MTs Tahfizh Putra",
    1280,
    720,
  ),
  fotoDok(
    "galeri-mtsma-kelas-pagi",
    "Santri MTs dan MA Tahfizh Putra berseragam putih bersiap memulai pelajaran pagi di ruang kelas",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-mencatat-pelajaran",
    "Santri MTs dan MA Tahfizh Putra mencatat pelajaran di buku tulis pada jam belajar malam",
    2000,
    1500,
  ),
  fotoDok(
    "galeri-mtsma-penghargaan-akademik",
    "Penyerahan penghargaan santri terbaik kategori akademik jenjang MTs di masjid kampus",
    1280,
    720,
  ),
  fotoDok(
    "galeri-mtsma-kelas-seragam-cokelat",
    "Santri MTs dan MA Tahfizh Putra berseragam cokelat mengikuti pelajaran yang dipandu ustadz dari depan kelas",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-soal-tertulis-berjas",
    "Santri Tahfizh Putra berjas dan berpeci hitam mengerjakan soal tertulis di ruang kelas",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-mtsma-kerja-sama-maahid",
    "Penandatanganan nota kesepahaman Islamic Center Wadi Mubarak dengan Ma'ahid, Riyadh",
    1024,
    576,
  ),
  fotoDok(
    "galeri-mtsma-soal-tertulis-seragam-putih",
    "Santri MTs dan MA Tahfizh Putra berkemeja putih mengerjakan soal tertulis di ruang kelas",
    2000,
    1125,
  ),
];

/** Dokumentasi Mahabbah Boarding School (MTs & MA putri). */
const fotoMahabbah = [
  fotoDok(
    "galeri-mbs-rihlah-book-fair",
    "Santriwati Mahabbah Boarding School membentangkan spanduk rihlah ilmiah Road to Islamic Book Fair",
    1280,
    960,
  ),
  fotoDok(
    "galeri-mbs-rihlah-foto-bersama",
    "Foto bersama rombongan rihlah ilmiah Mahabbah Boarding School di halaman berumput kampus",
    1280,
    960,
  ),
  fotoDok(
    "galeri-mbs-kelas-komputer",
    "Santriwati Mahabbah Boarding School mengerjakan tugas di kelas komputer",
    1280,
    960,
  ),
  fotoDok(
    "galeri-mbs-praktik-memasak",
    "Santriwati Mahabbah Boarding School mengamati hasil praktik memasak bersama teman sekelompoknya",
    1280,
    960,
  ),
  fotoDok(
    "galeri-mbs-hasil-praktik-memasak",
    "Lima santriwati Mahabbah Boarding School menunjukkan hasil praktik memasak di dapur asrama",
    1280,
    960,
  ),
  fotoDok(
    "galeri-mbs-piagam-tahfizh",
    "Santriwati Mahabbah Boarding School memegang piagam penghargaan tahfizh dan medali",
    1280,
    960,
  ),
];

/**
 * Dokumentasi TAUD SAQU dan MIT SAQU, diambil dari artikel-artikel di
 * wadimubarak.com — situs utama yayasan yang sama.
 *
 * Keduanya menyekolahkan anak, dan halaman galeri situs ini berjanji tidak
 * menampilkan wajah santri secara menonjol. Maka yang dipilih di sini foto
 * kegiatan, bukan potret: bidikan lebar, punggung dan sisi wajah, anak yang
 * sedang menekuni sesuatu. Yang sengaja ditinggalkan: potret dekat anak yang
 * disebut namanya, dan bidikan layar wisuda yang memuat nama lengkap, sekolah,
 * serta asal daerah seorang anak — dua-duanya melewati batas itu meski sudah
 * tayang di situs utama.
 */
const fotoTaud = [
  fotoDok(
    "galeri-taud-permainan-lingkaran",
    "Anak-anak TAUD SAQU bermain lingkaran gelang di halaman bersama guru dan wali murid",
    1024,
    576,
  ),
  fotoDok(
    "galeri-taud-belajar-alam",
    "Kelas TAUD SAQU digelar beralas tikar di lapangan terbuka",
    1024,
    576,
  ),
  fotoDok(
    "galeri-taud-wahana-panjat",
    "Seorang anak TAUD SAQU menapaki wahana panjat di halaman bermain sekolah",
    1024,
    577,
  ),
  fotoDok(
    "galeri-taud-rombongan-berkumpul",
    "Rombongan anak dan wali murid TAUD SAQU berkumpul di lapangan saat kegiatan luar kelas",
    1024,
    576,
  ),
  fotoDok(
    "galeri-taud-turun-bus",
    "Anak-anak TAUD SAQU turun dari bus bersama wali murid pada kegiatan Little Hafizh Explorer",
    1024,
    576,
  ),
  fotoDok(
    "galeri-taud-kelas-wali-murid",
    "Pertemuan wali murid TAUD SAQU di ruang kelas berhias karya anak",
    1024,
    578,
  ),
];

const fotoMit = [
  fotoDok(
    "galeri-mit-halaqah-saung",
    "Halaqah tahfizh siswa MIT SAQU beralas lantai saung bersama dua pengampu",
    1024,
    576,
  ),
  fotoDok(
    "galeri-mit-setor-hafalan-masjid",
    "Seorang siswa MIT SAQU menyetorkan hafalan di hadapan pengampu di masjid sekolah",
    1024,
    576,
  ),
  fotoDok(
    "galeri-mit-kelas",
    "Siswa MIT SAQU membaca mushaf di meja masing-masing saat jam pelajaran",
    1024,
    576,
  ),
  fotoDok(
    "galeri-mit-wisuda-menunggu",
    "Wisudawan TAUD dan MIT SAQU duduk berbaris menunggu giliran dipanggil ke panggung",
    1024,
    576,
  ),
  /* Dua foto panggung lain dari acara yang sama sengaja tidak dipakai: pada
     keduanya layar di belakang panggung sedang menampilkan data pribadi —
     satu kartu nama wisudawan lengkap dengan sekolah dan asal daerahnya, satu
     lagi sebuah kartu identitas bernomor. Dokumentasi wisuda tidak sepadan
     dengan menerbitkan ulang keduanya. */
  fotoDok(
    "galeri-mit-wisuda-foto-bersama",
    "Foto bersama seluruh wisudawan pada Wisuda TAUD dan MIT SAQU se-Indonesia",
    1200,
    675,
  ),
  fotoDok(
    "galeri-mit-sambutan-podium",
    "Sambutan di podium Wisuda TAUD dan MIT SAQU se-Indonesia dengan latar spanduk acara",
    1024,
    576,
  ),
];

/** Dokumentasi Ma'had Tahfizh Intensif Imtiaz Putri, dipakai bersama I'dad Mu'allimat. */
const fotoImtiaz = [
  fotoDok(
    "galeri-imtiaz-halaqah-beranda",
    "Peserta Imtiaz Putri muroja'ah bersama di beranda asrama beralas karpet",
    2000,
    1125,
  ),
  fotoDok(
    "galeri-imtiaz-murojaah-lesehan",
    "Peserta Imtiaz Putri menyimak dan mencatat sambil duduk lesehan di ruang belajar",
    1600,
    1200,
  ),
  fotoDok(
    "galeri-imtiaz-foto-bersama-asrama",
    "Foto bersama satu angkatan Imtiaz Putri di halaman gedung asrama",
    2000,
    1500,
  ),
  fotoDok(
    "galeri-imtiaz-foto-bersama-joglo",
    "Peserta Imtiaz Putri berfoto bersama di depan bangunan kayu kampus Megamendung",
    2000,
    1500,
  ),
  fotoDok(
    "galeri-imtiaz-rihlah-pegunungan",
    "Peserta Imtiaz Putri berkumpul di teras berlatar pegunungan saat rihlah",
    1125,
    2000,
  ),
  fotoDok(
    "galeri-imtiaz-wisuda-akbar",
    "Wisudawati Imtiaz Putri pada Wisuda Akbar Huffazhul Qur'an Islamic Center Wadi Mubarak",
    2000,
    1184,
  ),
];

/**
 * Dokumentasi STIU Wadi Mubarak, diambil dari kanal artikel-berita kampusnya
 * sendiri (stiuwm.ac.id) — satu yayasan, jadi fotonya memang milik yang sama.
 *
 * Yang dipilih kegiatan yang menandai sebuah perguruan tinggi, bukan sekadar
 * suasana pondok: ujian semester, daurah bersama syaikh tamu, asesmen lapangan
 * akreditasi, pelepasan KKN, dan organisasi mahasiswanya. Jenjang inilah yang
 * membedakan STIU dari unit lain di halaman ini, jadi itu pula yang tampak.
 */
const fotoStiu = [
  fotoDok(
    "galeri-stiu-pelepasan-kkn",
    "Foto bersama mahasiswa STIU Wadi Mubarak pada pelepasan KKN dan Da'i Ramadan di masjid kampus",
    1280,
    960,
  ),
  fotoDok(
    "galeri-stiu-daurah-tadabbur",
    "Syaikh tamu mengisi daurah tadabbur Al-Qur'an dan i'jaz al-'ilmi di hadapan mahasiswa STIU Wadi Mubarak",
    1280,
    960,
  ),
  fotoDok(
    "galeri-stiu-ujian-quran",
    "Ujian Al-Qur'an semester ganjil STIU Wadi Mubarak: mahasiswa duduk melingkar menghadap meja penguji",
    1280,
    960,
  ),
  fotoDok(
    "galeri-stiu-ujian-tulis",
    "Mahasiswa STIU Wadi Mubarak mengerjakan ujian tulis semester ganjil di ruang kelas kampus",
    1280,
    960,
  ),
  fotoDok(
    "galeri-stiu-asesmen-aipt",
    "Foto bersama tim asesor dan pengelola STIU Wadi Mubarak pada asesmen lapangan akreditasi institusi",
    1280,
    720,
  ),
  fotoDok(
    "galeri-stiu-pelantikan-bem",
    "Serah terima jabatan Badan Eksekutif Mahasiswa dan Lembaga Dakwah Kampus STIU Wadi Mubarak",
    734,
    392,
  ),
];

/**
 * Dokumentasi Program Kaderisasi Muhaffizh, dikirim dari pondok-pondok cabang
 * penyelenggara. Karena PKM tidak punya satu kampus sendiri, fotonya sengaja
 * dipilih dari beberapa pondok sekaligus: yang diperlihatkan bentuk kegiatannya
 * — halaqah, tashih berdua, kajian, olah fisik — bukan satu bangunan tertentu.
 */
const fotoPkm = [
  fotoDok(
    "galeri-pkm-halaqah-setoran",
    "Halaqah setoran hafalan Program Kaderisasi Muhaffizh: pengampu menyimak delapan santri yang duduk melingkar di atas karpet masjid pondok",
    1280,
    720,
  ),
  fotoDok(
    "galeri-pkm-tashih-berpasangan",
    "Dua santri Program Kaderisasi Muhaffizh duduk berhadapan saat tashih bacaan satu lawan satu",
    960,
    1280,
  ),
  fotoDok(
    "galeri-pkm-halaqah-rihal",
    "Santri Program Kaderisasi Muhaffizh membaca mushaf di atas rihal dalam halaqah melingkar",
    1280,
    720,
  ),
  fotoDok(
    "galeri-pkm-halaqah-saung",
    "Halaqah Program Kaderisasi Muhaffizh berlangsung di saung terbuka pondok cabang",
    1280,
    960,
  ),
  fotoDok(
    "galeri-pkm-latihan-fisik-lapangan",
    "Santri Program Kaderisasi Muhaffizh berbaris duduk mengikuti apel latihan fisik di lapangan rumput pondok",
    1280,
    960,
  ),
  fotoDok(
    "galeri-pkm-latihan-memanah",
    "Santri Program Kaderisasi Muhaffizh berlatih memanah berjajar di halaman pondok",
    1280,
    960,
  ),
];

const fotoUnit: Record<string, { hero: ImageData; galeri: ImageData[] }> = {
  "taud-saqu": {
    hero: fotoDok(
      "galeri-taud-halaman-psb",
      "Anak-anak TAUD SAQU dan wali murid berkumpul di halaman sekolah pada kegiatan luar kelas",
      1280,
      720,
    ),
    galeri: fotoTaud,
  },
  "mit-saqu": {
    hero: fotoDok(
      "galeri-mit-wisuda-panggung",
      "Wisudawan MIT SAQU berbaris mengenakan busana daerah di panggung Wisuda TAUD dan MIT SAQU se-Indonesia",
      1024,
      576,
    ),
    galeri: fotoMit,
  },
  "mts-tahfizh-putra": {
    hero: fotoDok(
      "galeri-mtsma-apel-pagi",
      "Apel pagi santri MTs Tahfizh Wadi Mubarak Putra di halaman masjid kampus Megamendung",
      2000,
      1125,
    ),
    galeri: fotoTahfizhPutra,
  },
  "ma-tahfizh-putra": {
    hero: fotoDok(
      "galeri-mtsma-dauroh-bahasa-arab",
      "Peserta dauroh bahasa Arab intensif MA Tahfizh Wadi Mubarak Putra di masjid kampus",
      2000,
      1125,
    ),
    galeri: [...fotoTahfizhPutra.slice(2), ...fotoTahfizhPutra.slice(0, 2)],
  },
  "mts-mbs-putri": {
    hero: fotoDok(
      "galeri-mbs-rihlah-foto-bersama",
      "Santriwati Mahabbah Boarding School berfoto bersama seusai rihlah ilmiah",
      1280,
      960,
    ),
    galeri: fotoMahabbah,
  },
  "ma-mbs-putri": {
    hero: fotoDok(
      "galeri-mbs-rihlah-book-fair",
      "Santriwati MA Mahabbah Boarding School membentangkan spanduk rihlah ilmiah Road to Islamic Book Fair",
      1280,
      960,
    ),
    galeri: [...fotoMahabbah.slice(2), ...fotoMahabbah.slice(0, 2)],
  },
  "stiu-wadi-mubarak": {
    hero: fotoDok(
      "galeri-stiu-daurah-renstra",
      "Forum daurah STIU Wadi Mubarak di aula kampus Megamendung dengan latar pegunungan",
      2000,
      1125,
    ),
    galeri: fotoStiu,
  },
  "pkm-wadi-mubarak": {
    hero: fotoDok(
      "galeri-pkm-kajian-masjid",
      "Kajian bersama santri Program Kaderisasi Muhaffizh di masjid pondok cabang",
      2000,
      1125,
    ),
    galeri: fotoPkm,
  },
  "pg-taud-saqu": {
    hero: fotoDok(
      "galeri-pg-taud-wisuda-angkatan-24-panggung",
      "Wisudawati PG TAUD SAQU angkatan ke-24 berbaris di panggung wisuda",
      1280,
      960,
    ),
    galeri: [
      fotoDok(
        "galeri-pg-taud-kelas-teori",
        "Peserta PG TAUD SAQU mengikuti kelas teori ke-TAUD-an di aula kampus",
        1280,
        960,
      ),
      fotoDok(
        "galeri-pg-taud-talqin-hafalan",
        "Peserta PG TAUD SAQU duduk melingkar mengikuti talqin hafalan bersama pengampunya",
        960,
        1280,
      ),
      fotoDok(
        "galeri-pg-taud-praktik-mengajar-taud",
        "Peserta PG TAUD SAQU praktik mengajar di kelas TAUD yang sedang berjalan",
        1280,
        960,
      ),
      fotoDok(
        "galeri-pg-taud-praktik-mengajar-kelas",
        "Peserta PG TAUD SAQU memandu anak-anak TAUD di depan kelas saat praktik mengajar",
        960,
        1280,
      ),
      fotoDok(
        "galeri-pg-taud-halaqah-lapangan",
        "Halaqah PG TAUD SAQU berlangsung di lapangan rumput berlatar pegunungan Megamendung",
        960,
        1280,
      ),
      fotoDok(
        "galeri-pg-taud-kelas-materi",
        "Kelas materi PG TAUD SAQU dengan tayangan proyektor di ruang belajar kampus",
        1280,
        720,
      ),
      fotoDok(
        "galeri-pg-taud-foto-bersama-lapangan",
        "Foto bersama peserta PG TAUD SAQU di lapangan kampus berlatar pegunungan",
        1280,
        720,
      ),
      fotoDok(
        "galeri-pg-taud-wisuda-xxv",
        "Wisuda PG TAUD angkatan XXV dan MIT angkatan V Sahabat Al-Qur'an",
        1280,
        960,
      ),
    ],
  },
  "imtiaz-putri": {
    hero: fotoDok(
      "galeri-imtiaz-foto-bersama-gunung",
      "Peserta Ma'had Tahfizh Intensif Imtiaz Putri berfoto bersama berlatar pegunungan Megamendung",
      2000,
      1304,
    ),
    galeri: fotoImtiaz,
  },
  /* I'dad Mu'allimat memakai dokumentasi Imtiaz Putri: keduanya program putri
     berasrama di kampus Megamendung yang sama, dan I'dad belum punya berkas
     fotonya sendiri. Keterangan fotonya sengaja tetap menyebut Imtiaz — yang
     terlihat memang peserta Imtiaz, dan mengganti namanya akan menjadikan
     keterangan itu keliru. Urutannya diputar supaya kedua halaman tidak
     tampak kembar. */
  "idad-muallimat": {
    hero: fotoDok(
      "galeri-imtiaz-halaqah-beranda",
      "Halaqah putri di beranda asrama kampus Megamendung, tempat I'dad Mu'allimat diselenggarakan",
      2000,
      1125,
    ),
    galeri: [...fotoImtiaz.slice(3), ...fotoImtiaz.slice(0, 3)],
  },
};

export const unitProfilMentah: unknown[] = profilInput.map(({ namaTampil, ...p }, i) => {
  const foto = fotoUnit[p.slug];
  return {
    ...p,
    hero: foto?.hero ?? gambar(`unit-${p.slug}`, 1600, 1000, `Suasana kampus ${namaTampil}`),
    galeri: foto?.galeri ?? galeriUnit(i, namaTampil),
  };
});
