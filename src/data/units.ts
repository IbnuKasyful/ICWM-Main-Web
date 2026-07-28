/**
 * Data contoh taksonomi `unit` + CPT `unit_profil`.
 *
 * PRD §17 mengizinkan — bahkan meminta — pembangunan dengan data contoh sejak
 * awal. Seluruh isi berkas ini akan digantikan oleh WPGraphQL pada Tahap 0.
 * Bentuknya sengaja dibuat persis seperti hasil kueri GraphQL nanti.
 */

import type { UnitProfil } from "@/lib/schemas";

export const unitsMentah: unknown[] = [
  {
    slug: "taud-saqu-bogor",
    nama_lengkap: "TAUD Sahabat Al-Qur'an Bogor",
    nama_pendek: "TAUD SAQU Bogor",
    deskripsi_singkat:
      "Taman asuh usia dini berbasis Al-Qur'an untuk anak 4–6 tahun, menumbuhkan adab dan hafalan pertama dengan cara yang menyenangkan.",
    url_subdomain: "https://taud.wadimubarak.com",
    logo: null,
    warna_aksen: "#00a2e9",
    jenjang: "paud",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "Januari – Maret 2026",
    kisaran_biaya: "Rp 3,5 – 5 juta / tahun",
    kontak_wa: "6281234567801",
    urutan_tampil: 1,
    aktif: true,
  },
  {
    slug: "taud-saqu-sleman",
    nama_lengkap: "TAUD Sahabat Al-Qur'an Sleman",
    nama_pendek: "TAUD SAQU Sleman",
    deskripsi_singkat:
      "Cabang Yogyakarta dengan kurikulum yang sama, kelas kecil, dan pendampingan wali santri sepekan sekali.",
    url_subdomain: "",
    logo: null,
    warna_aksen: "#0891b2",
    jenjang: "paud",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "sleman",
    status_ppdb: "buka",
    periode_ppdb: "Januari – Maret 2026",
    kisaran_biaya: "Rp 3 – 4,5 juta / tahun",
    kontak_wa: "6281234567802",
    urutan_tampil: 2,
    aktif: true,
  },
  {
    slug: "sdit-wadi-mubarak",
    nama_lengkap: "SDIT Wadi Mubarak",
    nama_pendek: "SDIT Wadi Mubarak",
    deskripsi_singkat:
      "Sekolah dasar Islam terpadu dengan target hafalan 5 juz dan penguatan literasi serta numerasi dasar.",
    url_subdomain: "https://sd.wadimubarak.com",
    logo: null,
    warna_aksen: "#3054a6",
    jenjang: "sd",
    gender: "campur",
    model_belajar: "non-boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "November 2025 – Februari 2026",
    kisaran_biaya: "Rp 6 – 9 juta / tahun",
    kontak_wa: "6281234567803",
    urutan_tampil: 3,
    aktif: true,
  },
  {
    slug: "smp-tahfizh-putra",
    nama_lengkap: "SMP Tahfizh Wadi Mubarak Putra",
    nama_pendek: "SMP Tahfizh Putra",
    deskripsi_singkat:
      "Pesantren menengah pertama putra dengan target 15 juz, kurikulum nasional, dan pembinaan asrama 24 jam.",
    url_subdomain: "https://smp.wadimubarak.com",
    logo: null,
    warna_aksen: "#243c70",
    jenjang: "smp",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2025 – Januari 2026",
    kisaran_biaya: "Rp 18 – 24 juta / tahun",
    kontak_wa: "6281234567804",
    urutan_tampil: 4,
    aktif: true,
  },
  {
    slug: "smp-tahfizh-putri",
    nama_lengkap: "SMP Tahfizh Wadi Mubarak Putri",
    nama_pendek: "SMP Tahfizh Putri",
    deskripsi_singkat:
      "Asrama putri terpisah dengan musyrifah pendamping, target 15 juz, dan program kemandirian santriwati.",
    url_subdomain: "",
    logo: null,
    warna_aksen: "#0e7490",
    jenjang: "smp",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "segera",
    periode_ppdb: "Dibuka Desember 2025",
    kisaran_biaya: "Rp 18 – 24 juta / tahun",
    kontak_wa: "6281234567805",
    urutan_tampil: 5,
    aktif: true,
  },
  {
    slug: "sma-tahfizh-putra",
    nama_lengkap: "SMA Tahfizh Wadi Mubarak Putra",
    nama_pendek: "SMA Tahfizh Putra",
    deskripsi_singkat:
      "Jenjang menengah atas putra: 30 juz, penguatan bahasa Arab, dan persiapan studi lanjut dalam dan luar negeri.",
    url_subdomain: "https://sma.wadimubarak.com",
    logo: null,
    warna_aksen: "#101d39",
    jenjang: "sma",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "Oktober 2025 – Januari 2026",
    kisaran_biaya: "Rp 21 – 28 juta / tahun",
    kontak_wa: "6281234567806",
    urutan_tampil: 6,
    aktif: true,
  },
  {
    slug: "sma-tahfizh-putri",
    nama_lengkap: "SMA Tahfizh Wadi Mubarak Putri",
    nama_pendek: "SMA Tahfizh Putri",
    deskripsi_singkat:
      "Program 30 juz untuk santriwati dengan kelas keputrian, keterampilan hidup, dan bimbingan karier.",
    url_subdomain: "",
    logo: null,
    warna_aksen: "#4a6bb8",
    jenjang: "sma",
    gender: "putri",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "tutup",
    periode_ppdb: "Gelombang 2026/2027 belum dibuka",
    kisaran_biaya: "Rp 21 – 28 juta / tahun",
    kontak_wa: "6281234567807",
    urutan_tampil: 7,
    aktif: true,
  },
  {
    slug: "mbs-wadi-mubarak",
    nama_lengkap: "Ma'had Bahasa dan Studi Islam Wadi Mubarak",
    nama_pendek: "MBS Wadi Mubarak",
    deskripsi_singkat:
      "Program satu tahun bahasa Arab intensif dan dasar-dasar ilmu syar'i untuk lulusan SMA sederajat.",
    url_subdomain: "https://mbs.wadimubarak.com",
    logo: null,
    warna_aksen: "#0369a1",
    jenjang: "non-formal",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "April – Juni 2026",
    kisaran_biaya: "Rp 9 – 12 juta / tahun",
    kontak_wa: "6281234567808",
    urutan_tampil: 8,
    aktif: true,
  },
  {
    slug: "stiu-wadi-mubarak",
    nama_lengkap: "Sekolah Tinggi Ilmu Ushuluddin Wadi Mubarak",
    nama_pendek: "STIU Wadi Mubarak",
    deskripsi_singkat:
      "Perguruan tinggi ilmu ushuluddin terakreditasi dengan beasiswa penuh bagi hafizh 30 juz.",
    url_subdomain: "https://stiuwm.ac.id",
    logo: null,
    warna_aksen: "#1b2c52",
    jenjang: "tinggi",
    gender: "putra",
    model_belajar: "boarding",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "Februari – Juli 2026",
    kisaran_biaya: "Beasiswa penuh (kuota terbatas)",
    kontak_wa: "6281234567809",
    urutan_tampil: 9,
    aktif: true,
  },
  {
    slug: "pkm-wadi-mubarak",
    nama_lengkap: "Pusat Kajian Masyarakat Wadi Mubarak",
    nama_pendek: "PKM Wadi Mubarak",
    deskripsi_singkat:
      "Kelas tahsin, tahfizh, dan kajian rutin terbuka untuk umum — dewasa maupun lansia, tanpa biaya pendaftaran.",
    url_subdomain: "",
    logo: null,
    warna_aksen: "#38bdf8",
    jenjang: "non-formal",
    gender: "campur",
    model_belajar: "hybrid",
    lokasi_kampus: "bogor",
    status_ppdb: "buka",
    periode_ppdb: "Pendaftaran sepanjang tahun",
    kisaran_biaya: "Gratis / infak sukarela",
    kontak_wa: "6281234567810",
    urutan_tampil: 10,
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
    slug: "taud-saqu-bogor",
    unit: "taud-saqu-bogor",
    namaTampil: "TAUD SAQU Bogor",
    untuk_siapa: [
      "Anak usia 4–6 tahun yang belum pernah masuk lembaga formal",
      "Orang tua yang ingin anaknya mengenal Al-Qur'an sebelum masuk SD",
      "Keluarga di sekitar Bogor yang mencari sekolah harian, bukan asrama",
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
        judul: "Jalur mulus ke SDIT",
        isi: "Lulusan TAUD memiliki jalur prioritas ke SDIT Wadi Mubarak dengan kurikulum yang bersambung.",
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
      "Antar-jemput area Bogor kota",
    ],
    alur_ppdb: [
      "Isi formulir pendaftaran lewat WhatsApp panitia",
      "Observasi anak bersama orang tua (± 45 menit)",
      "Wawancara wali santri dan penyampaian program",
      "Pengumuman dan daftar ulang",
    ],
  },
  {
    slug: "taud-saqu-sleman",
    unit: "taud-saqu-sleman",
    namaTampil: "TAUD SAQU Sleman",
    untuk_siapa: [
      "Anak usia 4–6 tahun di wilayah Sleman dan Yogyakarta",
      "Keluarga yang menginginkan kurikulum Wadi Mubarak tanpa pindah ke Bogor",
      "Orang tua yang ingin terlibat aktif lewat kelas parenting pekanan",
    ],
    keunggulan: [
      {
        judul: "Kurikulum identik dengan pusat",
        isi: "Materi, target hafalan, dan penilaian sama persis dengan kampus Bogor.",
      },
      {
        judul: "Kelas parenting sepekan sekali",
        isi: "Wali santri mendapat pendampingan agar pembiasaan di rumah sejalan dengan sekolah.",
      },
      {
        judul: "Rombongan belajar maksimal 16 anak",
        isi: "Satu kelas dibatasi agar guru sempat menyimak hafalan setiap anak setiap hari.",
      },
    ],
    kurikulum: [
      { judul: "Al-Qur'an", isi: "Juz 30 dengan metode talqin dan muraja'ah harian." },
      { judul: "Adab dan ibadah", isi: "Praktik wudu dan salat berjamaah setiap hari." },
      { judul: "Kesiapan sekolah", isi: "Pengenalan huruf, angka, dan kemandirian dasar." },
    ],
    fasilitas: [
      "Dua ruang kelas dan aula serbaguna",
      "Area bermain luar ruang",
      "Perpustakaan anak",
      "Ruang laktasi dan tunggu wali santri",
    ],
    alur_ppdb: [
      "Hubungi panitia cabang Sleman lewat WhatsApp",
      "Kunjungan dan observasi anak di kampus Sleman",
      "Wawancara wali santri",
      "Daftar ulang",
    ],
  },
  {
    slug: "sdit-wadi-mubarak",
    unit: "sdit-wadi-mubarak",
    namaTampil: "SDIT Wadi Mubarak",
    untuk_siapa: [
      "Anak usia 6–12 tahun yang tinggal bersama keluarga di Bogor",
      "Orang tua yang menginginkan hafalan kuat tanpa mengorbankan akademik",
      "Lulusan TAUD SAQU maupun TK lain",
    ],
    keunggulan: [
      {
        judul: "Target 5 juz saat lulus",
        isi: "Hafalan dicicil dua halaman sepekan dengan muraja'ah terjadwal, bukan dikejar di kelas enam.",
      },
      {
        judul: "Kurikulum nasional penuh",
        isi: "Ijazah negeri, nilai rapor resmi, dan kesiapan mengikuti asesmen nasional.",
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
      { judul: "Akademik", isi: "Kurikulum nasional lengkap dengan penekanan literasi dan numerasi." },
      { judul: "Pengembangan diri", isi: "Pramuka SIT, panahan, renang, dan klub sains." },
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
    slug: "smp-tahfizh-putra",
    unit: "smp-tahfizh-putra",
    namaTampil: "SMP Tahfizh Putra",
    untuk_siapa: [
      "Lulusan SD/MI putra yang siap tinggal di asrama",
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
        judul: "Ijazah negeri terakreditasi A",
        isi: "Santri tetap mengikuti kurikulum nasional dan dapat melanjutkan ke SMA mana pun.",
      },
      {
        judul: "Program bahasa Arab dan Inggris harian",
        isi: "Dua pekan bergilir dengan lingkungan bahasa yang diawasi.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "15 juz: 5 juz per tahun dengan ujian kenaikan setiap semester." },
      { judul: "Diniyah", isi: "Nahwu, sharaf, fikih, hadis arba'in, dan tafsir juz 'amma." },
      { judul: "Akademik", isi: "Kurikulum nasional SMP penuh, delapan mata pelajaran." },
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
    slug: "smp-tahfizh-putri",
    unit: "smp-tahfizh-putri",
    namaTampil: "SMP Tahfizh Putri",
    untuk_siapa: [
      "Lulusan SD/MI putri yang siap mondok",
      "Keluarga yang menginginkan asrama putri terpisah penuh",
      "Santriwati dengan hafalan awal minimal 1 juz",
    ],
    keunggulan: [
      {
        judul: "Kompleks putri terpisah",
        isi: "Asrama, kelas, dan area olahraga berada di zona tersendiri dengan akses terbatas.",
      },
      {
        judul: "Seluruh pengampu perempuan",
        isi: "Musyrifah dan guru tahfizh perempuan, tinggal di asrama bersama santriwati.",
      },
      {
        judul: "Program kemandirian",
        isi: "Keterampilan hidup, manajemen waktu, dan literasi keuangan sejak kelas tujuh.",
      },
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "15 juz dengan setoran pagi dan muraja'ah ba'da magrib." },
      { judul: "Diniyah", isi: "Fikih wanita, akidah, bahasa Arab, dan sirah nabawiyah." },
      { judul: "Akademik", isi: "Kurikulum nasional SMP dengan ijazah negeri." },
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
    slug: "sma-tahfizh-putra",
    unit: "sma-tahfizh-putra",
    namaTampil: "SMA Tahfizh Putra",
    untuk_siapa: [
      "Lulusan SMP/MTs putra dengan hafalan minimal 5 juz",
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
      { judul: "Akademik", isi: "Kurikulum nasional SMA, peminatan IPA dan IPS." },
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
    slug: "sma-tahfizh-putri",
    unit: "sma-tahfizh-putri",
    namaTampil: "SMA Tahfizh Putri",
    untuk_siapa: [
      "Lulusan SMP/MTs putri dengan hafalan minimal 5 juz",
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
    ],
    kurikulum: [
      { judul: "Tahfizh", isi: "30 juz dengan ujian tasmi' bertahap." },
      { judul: "Diniyah", isi: "Fikih, tafsir, hadis, dan bahasa Arab lanjutan." },
      { judul: "Akademik", isi: "Kurikulum nasional SMA dengan peminatan IPA dan IPS." },
    ],
    fasilitas: [
      "Asrama putri berkapasitas 200 santriwati",
      "Ruang tahfizh dan musala keputrian",
      "Laboratorium IPA",
      "Ruang keterampilan",
      "Klinik dengan tenaga kesehatan perempuan",
    ],
    alur_ppdb: [
      "Menunggu pengumuman pembukaan gelombang",
      "Pendaftaran daring dan unggah rapor",
      "Tes tahfizh, akademik, dan wawancara",
      "Tes kesehatan",
      "Pengumuman dan daftar ulang",
    ],
  },
  {
    slug: "mbs-wadi-mubarak",
    unit: "mbs-wadi-mubarak",
    namaTampil: "MBS Wadi Mubarak",
    untuk_siapa: [
      "Lulusan SMA sederajat yang ingin mendalami bahasa Arab sebelum kuliah",
      "Calon mahasiswa universitas Timur Tengah",
      "Pekerja muda yang mengambil jeda satu tahun untuk belajar",
    ],
    keunggulan: [
      {
        judul: "Program satu tahun penuh",
        isi: "Empat level bahasa Arab intensif, 30 jam pelajaran per pekan.",
      },
      {
        judul: "Lingkungan berbahasa Arab",
        isi: "Percakapan harian di asrama diawasi dan dievaluasi mingguan.",
      },
      {
        judul: "Pengantar ilmu syar'i",
        isi: "Dasar nahwu, sharaf, fikih, dan ushul untuk bekal membaca kitab.",
      },
      {
        judul: "Sertifikat dan rekomendasi",
        isi: "Lulusan menerima sertifikat kemampuan bahasa dan surat rekomendasi pendaftaran.",
      },
    ],
    kurikulum: [
      { judul: "Bahasa Arab", isi: "Empat level: mubtadi', mutawassith, mutaqaddim, dan takhassus." },
      { judul: "Ilmu alat", isi: "Nahwu dan sharaf terapan langsung pada teks." },
      { judul: "Syar'i dasar", isi: "Fikih ibadah, akidah, dan hadis pilihan." },
    ],
    fasilitas: [
      "Asrama mahasiswa berkapasitas 120 orang",
      "Ruang kelas bahasa dan laboratorium bahasa",
      "Perpustakaan kitab",
      "Masjid kampus",
    ],
    alur_ppdb: [
      "Pendaftaran daring",
      "Tes penempatan bahasa Arab",
      "Wawancara motivasi",
      "Pengumuman dan daftar ulang",
    ],
  },
  {
    slug: "stiu-wadi-mubarak",
    unit: "stiu-wadi-mubarak",
    namaTampil: "STIU Wadi Mubarak",
    untuk_siapa: [
      "Lulusan SMA/MA/pesantren yang ingin mendalami ilmu ushuluddin",
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
      "Orang dewasa yang ingin memperbaiki bacaan Al-Qur'an dari nol",
      "Lansia yang mencari kelas dengan ritme perlahan",
      "Jamaah sekitar kampus maupun peserta daring dari luar kota",
    ],
    keunggulan: [
      {
        judul: "Tanpa biaya pendaftaran",
        isi: "Kelas dibiayai dana infak; peserta cukup berinfak sesuai kemampuan.",
      },
      {
        judul: "Kelas luring dan daring",
        isi: "Peserta luar kota mengikuti halaqah daring dengan pengampu yang sama.",
      },
      {
        judul: "Kelompok berdasarkan kemampuan",
        isi: "Peserta ditempatkan setelah tes baca singkat, bukan berdasarkan usia.",
      },
    ],
    kurikulum: [
      { judul: "Tahsin", isi: "Tiga level: pengenalan huruf, tajwid dasar, dan tajwid terapan." },
      { judul: "Tahfizh dewasa", isi: "Juz 30 dan juz 29 dengan target fleksibel." },
      { judul: "Kajian rutin", isi: "Kajian tematik pekanan terbuka untuk umum." },
    ],
    fasilitas: [
      "Masjid kampus sebagai ruang halaqah",
      "Kelas daring terjadwal",
      "Mushaf dan modul gratis untuk peserta",
    ],
    alur_ppdb: [
      "Hubungi pengurus PKM lewat WhatsApp",
      "Tes baca singkat (10 menit)",
      "Penempatan kelompok dan jadwal",
    ],
  },
];

export const unitProfilMentah: unknown[] = profilInput.map(({ namaTampil, ...p }, i) => ({
  ...p,
  hero: gambar(`unit-${p.slug}`, 1600, 1000, `Suasana kampus ${namaTampil}`),
  galeri: galeriUnit(i, namaTampil),
}));
