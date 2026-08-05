/**
 * Data contoh taksonomi `unit` + CPT `unit_profil`.
 *
 * PRD §17 mengizinkan — bahkan meminta — pembangunan dengan data contoh sejak
 * awal. Seluruh isi berkas ini akan digantikan oleh WPGraphQL pada Tahap 0.
 * Bentuknya sengaja dibuat persis seperti hasil kueri GraphQL nanti.
 *
 * Penamaan unit mengikuti nomenklatur madrasah Kementerian Agama, karena
 * seluruh jenjang formal di yayasan ini terdaftar di sana: TAUD (Tahfizh Anak
 * Usia Dini), MIT, MTs, MA, lalu STIU pada jenjang tinggi. Jenjang putri tidak
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

import type { UnitProfil } from "@/lib/schemas";

export const unitsMentah: unknown[] = [
  {
    slug: "taud-saqu",
    nama_lengkap: "TAUD Sahabat Al-Qur'an",
    nama_pendek: "TAUD SAQU",
    deskripsi_singkat:
      "Tahfizh anak usia dini untuk anak 4–6 tahun: pengenalan Al-Qur'an lewat talqin harian, kini hadir di sepuluh cabang dengan kurikulum yang sama.",
    url_subdomain: "https://taud.wadimubarak.com",
    logo: { src: "/img/logo-taud-saqu.png", alt: "Logo TAUD Sahabat Al-Qur’an", width: 238, height: 234 },
    warna_aksen: "#00a2e9",
    jenjang: "paud",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "bogor",
    cabang: [
      {
        slug: "megamendung",
        nama: "TAUD SAQU Megamendung",
        kota: "Kabupaten Bogor",
        alamat: "Kampus Induk Wadi Mubarak, Megamendung, Kabupaten Bogor",
        kontak_wa: "6281234567801",
        status_ppdb: "buka",
      },
      {
        slug: "bogor-kota",
        nama: "TAUD SAQU Bogor Kota",
        kota: "Kota Bogor",
        alamat: "Jl. Pajajaran, Baranangsiang, Kota Bogor",
        kontak_wa: "6281234567811",
        status_ppdb: "buka",
      },
      {
        slug: "depok",
        nama: "TAUD SAQU Depok",
        kota: "Depok",
        alamat: "Jl. Margonda Raya, Beji, Depok",
        kontak_wa: "6281234567812",
        status_ppdb: "buka",
      },
      {
        slug: "bekasi",
        nama: "TAUD SAQU Bekasi",
        kota: "Bekasi",
        alamat: "Jl. Ahmad Yani, Bekasi Selatan, Kota Bekasi",
        kontak_wa: "6281234567813",
        status_ppdb: "buka",
      },
      {
        slug: "tangerang-selatan",
        nama: "TAUD SAQU Tangerang Selatan",
        kota: "Tangerang Selatan",
        alamat: "Jl. Pahlawan Seribu, Serpong, Tangerang Selatan",
        kontak_wa: "6281234567814",
        status_ppdb: "buka",
      },
      {
        slug: "bandung",
        nama: "TAUD SAQU Bandung",
        kota: "Bandung",
        alamat: "Jl. Terusan Buah Batu, Bandung",
        kontak_wa: "6281234567815",
        status_ppdb: "buka",
      },
      {
        slug: "sleman",
        nama: "TAUD SAQU Sleman",
        kota: "Sleman",
        alamat: "Jl. Kaliurang KM 10, Ngaglik, Sleman",
        kontak_wa: "6281234567802",
        status_ppdb: "buka",
      },
      {
        slug: "solo",
        nama: "TAUD SAQU Solo",
        kota: "Surakarta",
        alamat: "Jl. Adi Sucipto, Manahan, Surakarta",
        kontak_wa: "6281234567816",
        status_ppdb: "segera",
      },
      {
        slug: "semarang",
        nama: "TAUD SAQU Semarang",
        kota: "Semarang",
        alamat: "Jl. Setiabudi, Banyumanik, Semarang",
        kontak_wa: "6281234567817",
        status_ppdb: "segera",
      },
      {
        slug: "surabaya",
        nama: "TAUD SAQU Surabaya",
        kota: "Surabaya",
        alamat: "Jl. Rungkut Asri, Rungkut, Surabaya",
        kontak_wa: "6281234567818",
        status_ppdb: "segera",
      },
    ],
    status_ppdb: "buka",
    periode_ppdb: "Januari – Maret 2026",
    kisaran_biaya: "Rp 3 – 5 juta / tahun",
    kontak_wa: "6281234567801",
    urutan_tampil: 1,
    aktif: true,
  },
  {
    slug: "mit-saqu",
    nama_lengkap: "MIT Sahabat Al-Qur'an",
    nama_pendek: "MIT SAQU",
    deskripsi_singkat:
      "Madrasah ibtidaiyah terpadu dengan target hafalan 5 juz, kurikulum madrasah Kementerian Agama, serta penguatan literasi dan numerasi dasar.",
    url_subdomain: "https://mit.wadimubarak.com",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#3054a6",
    jenjang: "sd",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    status_ppdb: "buka",
    periode_ppdb: "November 2025 – Februari 2026",
    kisaran_biaya: "Rp 6 – 9 juta / tahun",
    kontak_wa: "6281234567803",
    urutan_tampil: 2,
    aktif: true,
  },
  {
    slug: "mts-tahfizh-putra",
    nama_lengkap: "MTs Tahfizh Wadi Mubarak Putra",
    nama_pendek: "MTs Tahfizh Putra",
    deskripsi_singkat:
      "Madrasah tsanawiyah putra berasrama dengan target 15 juz, kurikulum madrasah Kementerian Agama, dan pembinaan musyrif 24 jam.",
    url_subdomain: "https://mts.wadimubarak.com",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#243c70",
    jenjang: "smp",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2025 – Januari 2026",
    kisaran_biaya: "Rp 18 – 24 juta / tahun",
    kontak_wa: "6281234567804",
    urutan_tampil: 3,
    aktif: true,
  },
  {
    slug: "ma-tahfizh-putra",
    nama_lengkap: "MA Tahfizh Wadi Mubarak Putra",
    nama_pendek: "MA Tahfizh Putra",
    deskripsi_singkat:
      "Madrasah aliyah putra: 30 juz, penguatan bahasa Arab, dan persiapan studi lanjut dalam maupun luar negeri.",
    url_subdomain: "https://ma.wadimubarak.com",
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
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2025 – Januari 2026",
    kisaran_biaya: "Rp 21 – 28 juta / tahun",
    kontak_wa: "6281234567806",
    urutan_tampil: 4,
    aktif: true,
  },
  {
    slug: "mts-mbs-putri",
    nama_lengkap: "MTs Mahabbah Boarding School Putri",
    nama_pendek: "MTs MBS Putri",
    deskripsi_singkat:
      "Jenjang tsanawiyah Mahabbah Boarding School: asrama putri terpisah dengan musyrifah pendamping, target 15 juz, dan program kemandirian santriwati.",
    url_subdomain: "https://mbs.wadimubarak.com",
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
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2025 – Januari 2026",
    kisaran_biaya: "Rp 18 – 24 juta / tahun",
    kontak_wa: "6281234567805",
    urutan_tampil: 5,
    aktif: true,
  },
  {
    slug: "ma-mbs-putri",
    nama_lengkap: "MA Mahabbah Boarding School Putri",
    nama_pendek: "MA MBS Putri",
    deskripsi_singkat:
      "Jenjang aliyah Mahabbah Boarding School: target 30 juz, kelas keputrian, dan bimbingan karier serta studi lanjut bagi santriwati.",
    url_subdomain: "https://mbs.wadimubarak.com",
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
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2025 – Januari 2026",
    kisaran_biaya: "Rp 21 – 28 juta / tahun",
    kontak_wa: "6281234567807",
    urutan_tampil: 6,
    aktif: true,
  },
  {
    slug: "stiu-wadi-mubarak",
    nama_lengkap: "Sekolah Tinggi Ilmu Ushuluddin Wadi Mubarak",
    nama_pendek: "STIU Wadi Mubarak",
    deskripsi_singkat:
      "Perguruan tinggi ilmu ushuluddin terakreditasi dengan beasiswa penuh bagi hafizh 30 juz.",
    url_subdomain: "https://stiuwm.ac.id",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#1b2c52",
    jenjang: "tinggi",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    status_ppdb: "buka",
    periode_ppdb: "Februari – Juli 2026",
    kisaran_biaya: "Beasiswa penuh (kuota terbatas)",
    kontak_wa: "6281234567809",
    urutan_tampil: 7,
    aktif: true,
  },
  {
    slug: "pkm-wadi-mubarak",
    nama_lengkap: "Program Kaderisasi Muhaffizh Wadi Mubarak",
    nama_pendek: "PKM Wadi Mubarak",
    deskripsi_singkat:
      "Kaderisasi calon muhaffizh: menyiapkan pengampu tahfizh yang bacaannya sudah ditashih untuk unit yayasan dan lembaga mitra. Satu-satunya program non-formal di yayasan.",
    url_subdomain: "",
    logo: { src: "/img/logo-wadi-mubarak.png", alt: "Logo Wadi Mubarak", width: 797, height: 938 },
    warna_aksen: "#38bdf8",
    jenjang: "non-formal",
    gender: "campur",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    status_ppdb: "buka",
    periode_ppdb: "April – Juni 2026",
    kisaran_biaya: "Beasiswa penuh (kuota terbatas)",
    kontak_wa: "6281234567810",
    urutan_tampil: 8,
    aktif: true,
  },
  {
    slug: "pg-taud-saqu",
    nama_lengkap: "Pendidikan Guru Tahfizh Anak Usia Dini Sahabat Al-Qur'an",
    nama_pendek: "PG TAUD SAQU",
    deskripsi_singkat:
      "Kelas asrama tiga bulan bagi muslimah yang ingin menjadi guru tahfizh anak usia dini — dan merintis TAUD di daerahnya sendiri.",
    url_subdomain: "",
    logo: { src: "/img/logo-taud-saqu.png", alt: "Logo TAUD Sahabat Al-Qur’an", width: 238, height: 234 },
    warna_aksen: "#0284c7",
    jenjang: "non-formal",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    cabang: [],
    status_ppdb: "buka",
    periode_ppdb: "Dibuka tiga angkatan setiap tahun",
    kisaran_biaya: "Beasiswa pendidikan (syarat dan ketentuan berlaku)",
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
    status_ppdb: "buka",
    periode_ppdb: "27 Juli – 25 Agustus 2026 (angkatan pertama)",
    kisaran_biaya: "Bebas biaya pendidikan; peserta menanggung uang pangkal dan konsumsi",
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
    status_ppdb: "buka",
    periode_ppdb: "Tahun ajaran 2025/2026",
    kisaran_biaya: "Rincian biaya disampaikan panitia saat pendaftaran",
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
      "Anak usia 4–6 tahun yang belum pernah masuk lembaga formal",
      "Orang tua yang ingin anaknya mengenal Al-Qur'an sebelum masuk MI/SD",
      "Keluarga yang mencari sekolah harian, bukan asrama, di kota terdekat",
    ],
    keunggulan: [
      {
        judul: "Satu guru untuk delapan anak",
        isi: "Rasio kecil membuat setiap anak dikenal namanya, kebiasaannya, dan perkembangan hafalannya.",
      },
      {
        judul: "Metode bermain–bergerak–menghafal",
        isi: "Hafalan diajarkan lewat gerak dan lagu, bukan duduk diam. Anak pulang tanpa merasa dipaksa.",
      },
      {
        judul: "Laporan pekanan untuk orang tua",
        isi: "Setiap Jumat wali santri menerima catatan adab, hafalan, dan hal yang perlu dilanjutkan di rumah.",
      },
      {
        judul: "Jalur mulus ke MIT",
        isi: "Lulusan TAUD memiliki jalur prioritas ke MIT Sahabat Al-Qur'an dengan kurikulum yang bersambung.",
      },
      {
        judul: "Sepuluh cabang, satu kurikulum",
        isi: "Materi, target hafalan, dan penilaian sama di setiap cabang — keluarga yang pindah kota tidak perlu memulai dari awal.",
      },
    ],
    kurikulum: [
      { judul: "Al-Qur'an", isi: "Juz 30 dengan metode talqin, target 15–20 surah pendek dalam dua tahun." },
      { judul: "Adab dan ibadah", isi: "Wudu, salat, doa harian, serta adab makan, tidur, dan berbicara." },
      { judul: "Kesiapan sekolah", isi: "Pra-baca, pra-tulis, dan pra-hitung tanpa beban calistung dini." },
      { judul: "Motorik dan seni", isi: "Olah gerak, prakarya, dan berkebun di kebun kecil sekolah." },
    ],
    fasilitas: [
      "Ruang kelas ber-AC dengan area lesehan",
      "Halaman bermain dan kebun mini",
      "Ruang tahfizh terpisah",
      "Klinik dan perawat harian",
      "Antar-jemput di cabang tertentu",
    ],
    alur_ppdb: [
      "Pilih cabang terdekat dan hubungi panitianya lewat WhatsApp",
      "Observasi anak bersama orang tua (± 45 menit)",
      "Wawancara wali santri dan penyampaian program",
      "Pengumuman dan daftar ulang",
    ],
  },
  {
    slug: "mit-saqu",
    unit: "mit-saqu",
    namaTampil: "MIT SAQU",
    untuk_siapa: [
      "Anak usia 6–12 tahun yang tinggal bersama keluarga di Bogor",
      "Orang tua yang menginginkan hafalan kuat tanpa mengorbankan akademik",
      "Lulusan TAUD SAQU maupun TK/RA lain",
    ],
    keunggulan: [
      {
        judul: "Target 5 juz saat lulus",
        isi: "Hafalan dicicil dua halaman sepekan dengan muraja'ah terjadwal, bukan dikejar di kelas enam.",
      },
      {
        judul: "Kurikulum madrasah penuh",
        isi: "Ijazah madrasah terdaftar Kementerian Agama, nilai rapor resmi, dan kesiapan mengikuti asesmen nasional.",
      },
      {
        judul: "Halaqah 10 santri per pengampu",
        isi: "Setiap santri disimak langsung minimal empat kali sepekan.",
      },
      {
        judul: "Pekan proyek setiap semester",
        isi: "Santri mengerjakan proyek lintas mata pelajaran dan memamerkannya kepada wali santri.",
      },
      {
        judul: "Pendampingan santri lambat baca",
        isi: "Program remedial khusus tanpa memisahkan anak dari kelas reguler.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "Target 5 juz bertahap: 1 juz per tahun mulai kelas dua." },
      { judul: "Diniyah", isi: "Fikih ibadah, akidah, sirah, dan bahasa Arab dasar." },
      { judul: "Akademik", isi: "Kurikulum madrasah Kementerian Agama dengan penekanan literasi dan numerasi." },
      { judul: "Pengembangan diri", isi: "Kepanduan, panahan, renang, dan klub sains." },
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
      "Pendaftaran daring lewat WhatsApp panitia",
      "Tes kesiapan belajar dan wawancara anak",
      "Wawancara wali santri",
      "Pengumuman hasil",
      "Daftar ulang dan pembekalan wali santri",
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
        judul: "Target 15 juz dalam tiga tahun",
        isi: "Setoran pagi dan muraja'ah malam dengan pengampu tetap sepanjang jenjang.",
      },
      {
        judul: "Musyrif tinggal di asrama",
        isi: "Satu musyrif mendampingi 12 santri, tinggal di gedung yang sama, bukan datang-pergi.",
      },
      {
        judul: "Ijazah madrasah terakreditasi A",
        isi: "Santri mengikuti kurikulum madrasah Kementerian Agama dan dapat melanjutkan ke MA maupun SMA mana pun.",
      },
      {
        judul: "Program bahasa Arab dan Inggris harian",
        isi: "Dua pekan bergilir dengan lingkungan bahasa yang diawasi.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "15 juz: 5 juz per tahun dengan ujian kenaikan setiap semester." },
      { judul: "Diniyah", isi: "Nahwu, sharaf, fikih, hadis arba'in, dan tafsir juz 'amma." },
      { judul: "Akademik", isi: "Kurikulum madrasah Kementerian Agama penuh, delapan mata pelajaran." },
      { judul: "Kepemimpinan", isi: "Organisasi santri, kepanduan, dan pelatihan khitabah." },
    ],
    fasilitas: [
      "Asrama berkapasitas 320 santri",
      "Masjid dan ruang halaqah terbuka",
      "Ruang makan dan dapur gizi terpantau",
      "Lapangan futsal, basket, dan area panahan",
      "Klinik 24 jam dengan perawat menetap",
      "Laundry dan koperasi santri",
    ],
    alur_ppdb: [
      "Pendaftaran daring dan pembayaran biaya seleksi",
      "Tes tahfizh, tes akademik, dan wawancara santri",
      "Wawancara dan komitmen wali santri",
      "Tes kesehatan",
      "Pengumuman dan daftar ulang",
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
        judul: "Target 30 juz dan sanad",
        isi: "Santri yang menuntaskan 30 juz dilanjutkan ke program tashih dan sanad bersama masyayikh.",
      },
      {
        judul: "Kelas persiapan studi lanjut",
        isi: "Bimbingan tes masuk universitas Timur Tengah, SNBT, dan beasiswa dalam negeri.",
      },
      {
        judul: "Bahasa Arab sebagai bahasa pengantar diniyah",
        isi: "Kitab dibaca langsung dari sumber berbahasa Arab sejak kelas sebelas.",
      },
      {
        judul: "Rekam jejak alumni",
        isi: "Alumni tersebar di Madinah, Al-Azhar, UGM, IPB, dan UI dengan pendampingan jaringan alumni.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "30 juz dengan ujian tasmi' per 5 juz dan tashih akhir." },
      { judul: "Diniyah", isi: "Ushul fikih, mustholah hadis, tafsir, dan balaghah." },
      { judul: "Akademik", isi: "Kurikulum madrasah Kementerian Agama, peminatan IPA dan IPS." },
      { judul: "Persiapan lanjut", isi: "Bimbingan tes, penulisan esai, dan wawancara beasiswa." },
    ],
    fasilitas: [
      "Asrama berkapasitas 280 santri",
      "Masjid utama dan ruang tasmi'",
      "Laboratorium IPA dan komputer",
      "Perpustakaan kitab berbahasa Arab",
      "Lapangan olahraga dan area panahan",
      "Klinik 24 jam",
    ],
    alur_ppdb: [
      "Pendaftaran daring dan unggah rapor",
      "Tes tahfizh (minimal 5 juz) dan tes akademik",
      "Wawancara santri dan wali santri",
      "Tes kesehatan",
      "Pengumuman dan daftar ulang",
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
        judul: "Program kemandirian",
        isi: "Keterampilan hidup, manajemen waktu, dan literasi keuangan sejak kelas tujuh.",
      },
      {
        judul: "Bersambung ke MA di sekolah yang sama",
        isi: "Lulusan MTs melanjutkan ke MA MBS tanpa pindah asrama maupun berganti pengampu.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "15 juz dengan setoran pagi dan muraja'ah ba'da magrib." },
      { judul: "Diniyah", isi: "Fikih wanita, akidah, bahasa Arab, dan sirah nabawiyah." },
      { judul: "Akademik", isi: "Kurikulum madrasah Kementerian Agama dengan ijazah terdaftar." },
    ],
    fasilitas: [
      "Asrama putri berkapasitas 240 santriwati",
      "Musala dan ruang tahfizh khusus",
      "Ruang keterampilan dan tata boga",
      "Klinik dengan perawat perempuan",
      "Area olahraga tertutup",
    ],
    alur_ppdb: [
      "Pendaftaran daring saat gelombang dibuka",
      "Tes tahfizh dan akademik",
      "Wawancara santriwati dan wali santri",
      "Tes kesehatan",
      "Pengumuman dan daftar ulang",
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
        judul: "Bimbingan karier dan studi lanjut",
        isi: "Pendampingan memilih jurusan, beasiswa, dan jalur profesi bagi santriwati.",
      },
      {
        judul: "Wisuda haafizhaat setiap tahun",
        isi: "Santriwati yang menuntaskan 30 juz diwisuda bersama dalam tasmi' terbuka di hadapan wali santri.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "30 juz dengan ujian tasmi' bertahap." },
      { judul: "Diniyah", isi: "Fikih, tafsir, hadis, dan bahasa Arab lanjutan." },
      { judul: "Akademik", isi: "Kurikulum madrasah Kementerian Agama dengan peminatan IPA dan IPS." },
    ],
    fasilitas: [
      "Asrama putri berkapasitas 200 santriwati",
      "Ruang tahfizh dan musala keputrian",
      "Laboratorium IPA",
      "Ruang keterampilan",
      "Klinik dengan tenaga kesehatan perempuan",
    ],
    alur_ppdb: [
      "Pendaftaran daring dan unggah rapor",
      "Tes tahfizh, akademik, dan wawancara",
      "Tes kesehatan",
      "Pengumuman dan daftar ulang",
    ],
  },
  {
    slug: "stiu-wadi-mubarak",
    unit: "stiu-wadi-mubarak",
    namaTampil: "STIU Wadi Mubarak",
    untuk_siapa: [
      "Lulusan MA/SMA/pesantren yang ingin mendalami ilmu ushuluddin",
      "Hafizh 30 juz yang mencari beasiswa penuh",
      "Calon pengajar dan dai",
    ],
    keunggulan: [
      {
        judul: "Beasiswa penuh untuk hafizh 30 juz",
        isi: "Meliputi biaya kuliah, asrama, dan makan selama masa studi normal.",
      },
      {
        judul: "Terakreditasi BAN-PT",
        isi: "Ijazah S1 diakui negara untuk kelanjutan studi maupun karier.",
      },
      {
        judul: "Pengajar bersanad",
        isi: "Dosen lulusan Madinah, Al-Azhar, dan perguruan tinggi Islam dalam negeri.",
      },
      {
        judul: "Praktik dakwah lapangan",
        isi: "Mahasiswa mengisi kajian binaan yayasan sejak semester lima.",
      },
    ],
    kurikulum: [
      { judul: "Program studi", isi: "Ilmu Al-Qur'an dan Tafsir, S1 delapan semester." },
      { judul: "Kompetensi inti", isi: "Tafsir, ulumul Qur'an, hadis, ushul fikih, dan bahasa Arab." },
      { judul: "Tugas akhir", isi: "Skripsi berbahasa Indonesia atau Arab dengan pembimbing tetap." },
    ],
    fasilitas: [
      "Gedung kuliah dan ruang seminar",
      "Asrama mahasiswa",
      "Perpustakaan induk dan akses jurnal daring",
      "Masjid kampus",
    ],
    alur_ppdb: [
      "Pendaftaran daring di laman STIU",
      "Tes tulis dan tes tahfizh",
      "Wawancara dan verifikasi berkas",
      "Pengumuman kelulusan dan penetapan beasiswa",
      "Registrasi mahasiswa baru",
    ],
  },
  {
    slug: "pkm-wadi-mubarak",
    unit: "pkm-wadi-mubarak",
    namaTampil: "PKM Wadi Mubarak",
    untuk_siapa: [
      "Lulusan MA/SMA sederajat dengan hafalan minimal 15 juz",
      "Alumni pesantren yang ingin menekuni jalur mengajar Al-Qur'an",
      "Calon pengampu halaqah di unit yayasan maupun lembaga mitra",
    ],
    keunggulan: [
      {
        judul: "Tashih bacaan sebelum mengajar",
        isi: "Peserta menuntaskan tashih 30 juz di hadapan pengampu bersanad sebelum dipercaya memegang halaqah.",
      },
      {
        judul: "Praktik mengajar sejak awal",
        isi: "Mulai semester dua peserta mendampingi halaqah di TAUD, MIT, dan MTs sebagai asisten pengampu.",
      },
      {
        judul: "Beasiswa penuh",
        isi: "Biaya program, asrama, dan makan ditanggung yayasan selama masa kaderisasi.",
      },
      {
        judul: "Penempatan setelah lulus",
        isi: "Lulusan diprioritaskan mengisi formasi pengampu tahfizh di unit-unit yayasan.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh dan tashih", isi: "Penyempurnaan 30 juz, tashih bacaan, dan pengantar sanad." },
      { judul: "Tajwid", isi: "Tajwid nazhari dan tathbiqi, makharijul huruf, serta riwayat Hafsh dari 'Ashim." },
      { judul: "Metodologi mengajar", isi: "Metode talqin, pengelolaan halaqah, dan penilaian hafalan santri." },
      { judul: "Ilmu alat", isi: "Nahwu, sharaf, dan ulumul Qur'an sebagai bekal mengajar." },
    ],
    fasilitas: [
      "Asrama peserta kaderisasi",
      "Ruang halaqah dan ruang tashih",
      "Perpustakaan kitab dan mushaf rujukan",
      "Masjid kampus",
    ],
    alur_ppdb: [
      "Pendaftaran daring dan unggah rekaman hafalan",
      "Tes tahfizh dan tashih bacaan",
      "Wawancara motivasi dan komitmen mengajar",
      "Pengumuman dan penetapan beasiswa",
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
        judul: "Alumni sudah tersebar",
        isi: "Lebih dari 250 alumni mengajar di berbagai daerah di Indonesia serta di Malaysia, Kamboja, dan Australia.",
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
        isi: "Biaya pendidikan, akomodasi, dan kegiatan ditanggung yayasan; peserta hanya menanggung uang pangkal dan konsumsi bulanan.",
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
        isi: "Yayasan menyiapkan kerja sama dengan perguruan tinggi terakreditasi bagi peserta yang ingin melanjutkan ke jenjang sarjana.",
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

export const unitProfilMentah: unknown[] = profilInput.map(({ namaTampil, ...p }, i) => ({
  ...p,
  hero: gambar(`unit-${p.slug}`, 1600, 1000, `Suasana kampus ${namaTampil}`),
  galeri: galeriUnit(i, namaTampil),
}));
