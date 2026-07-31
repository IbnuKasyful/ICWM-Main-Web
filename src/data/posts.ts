/**
 * Data contoh `post` (PRD §7.4).
 *
 * Perhatikan `tampilkan_di_induk`: beberapa tulisan sengaja bernilai `false`
 * — termasuk tulisan cabang Sleman — untuk membuktikan bahwa penyaringan
 * kurasi benar-benar bekerja di situs induk (PRD §9.1 & §9.6).
 */

function paragraf(...isi: string[]): string {
  return isi.map((p) => `<p>${p}</p>`).join("\n");
}

const isiUmum = paragraf(
  "Kegiatan ini merupakan bagian dari program pembinaan santri yang berjalan sepanjang tahun ajaran. Panitia menyiapkan rangkaian acara sejak dua bulan sebelumnya bersama perwakilan wali santri.",
  "Pengurus yayasan menyampaikan bahwa kegiatan seperti ini dirancang bukan sekadar seremoni, melainkan sebagai sarana santri mempraktikkan apa yang mereka pelajari di halaqah dan kelas.",
  "Dokumentasi lengkap kegiatan dapat dilihat pada halaman galeri. Wali santri yang membutuhkan keterangan tambahan dapat menghubungi bagian humas unit masing-masing.",
);

type PostInput = {
  slug: string;
  judul: string;
  ringkasan: string;
  tanggal: string;
  category: string;
  unit_utama: string;
  unit?: string[];
  lokasi: string;
  topik: string[];
  gambar: number;
  penulis: string;
  tampilkan_di_induk: boolean;
  konten?: string;
};

const daftar: PostInput[] = [
  {
    slug: "wisuda-tahfizh-angkatan-ke-12",
    judul: "Wisuda Tahfizh Angkatan ke-12: 47 Santri Menuntaskan 30 Juz",
    ringkasan:
      "Sebanyak 47 santri SMA Tahfizh Putra dan Putri menuntaskan hafalan 30 juz dan menjalani tasmi' terbuka di hadapan wali santri.",
    tanggal: "2026-07-12",
    category: "prestasi",
    unit_utama: "sma-tahfizh-putra",
    unit: ["sma-tahfizh-putra", "sma-tahfizh-putri"],
    lokasi: "bogor",
    topik: ["tahfizh", "wisuda"],
    gambar: 1,
    penulis: "Humas Wadi Mubarak",
    tampilkan_di_induk: true,
    konten: paragraf(
      "Islamic Center Wadi Mubarak menggelar wisuda tahfizh angkatan ke-12 di Masjid Utama kampus Bogor. Sebanyak 47 santri dinyatakan menuntaskan hafalan 30 juz setelah melalui rangkaian ujian tasmi' bertahap sejak awal tahun ajaran.",
      "Prosesi diawali dengan tasmi' terbuka: setiap wisudawan membacakan juz yang diundi secara acak di hadapan penguji dan wali santri. Metode ini dipilih agar kelulusan tidak bergantung pada satu bagian hafalan yang telah disiapkan.",
      "Ketua Yayasan dalam sambutannya mengingatkan bahwa hafalan adalah amanah yang perlu dijaga seumur hidup. Yayasan menyediakan program muraja'ah alumni agar hafalan tetap terpelihara setelah santri meninggalkan pesantren.",
      "Dari 47 wisudawan, 12 santri melanjutkan ke STIU Wadi Mubarak dengan beasiswa penuh, sementara sisanya melanjutkan ke berbagai perguruan tinggi dalam dan luar negeri.",
    ),
  },
  {
    slug: "ppdb-2026-2027-gelombang-pertama-dibuka",
    judul: "PPDB 2026/2027 Gelombang Pertama Resmi Dibuka",
    ringkasan:
      "Pendaftaran santri baru untuk SDIT, SMP, dan SMA Tahfizh dibuka mulai 1 Oktober dengan kuota terbatas per rombongan belajar.",
    tanggal: "2026-07-08",
    category: "pengumuman",
    unit_utama: "sdit-wadi-mubarak",
    unit: ["sdit-wadi-mubarak", "smp-tahfizh-putra", "sma-tahfizh-putra"],
    lokasi: "bogor",
    topik: ["ppdb"],
    gambar: 2,
    penulis: "Panitia PPDB",
    tampilkan_di_induk: true,
    konten: paragraf(
      "Panitia Penerimaan Peserta Didik Baru Islamic Center Wadi Mubarak mengumumkan pembukaan gelombang pertama tahun ajaran 2026/2027. Pendaftaran dibuka untuk jenjang SD, SMP, dan SMA di kampus Bogor.",
      "Setiap unit menetapkan kuota per rombongan belajar yang tidak dinaikkan meski permintaan tinggi. Kebijakan ini dipertahankan agar rasio pengampu dan santri tetap terjaga.",
      "Calon wali santri disarankan menghubungi narahubung unit yang dituju lebih dulu untuk memastikan jenjang, jalur, dan persyaratan yang berlaku. Rincian setiap unit tersedia pada halaman program.",
    ),
  },
  {
    slug: "lazis-salurkan-beasiswa-yatim-semester-ganjil",
    judul: "LAZIS Wadi Mubarak Salurkan Beasiswa untuk 180 Santri Yatim",
    ringkasan:
      "Penyaluran semester ganjil menjangkau 180 santri yatim dan dhuafa di seluruh unit, dengan laporan rinci yang dapat diunduh publik.",
    tanggal: "2026-07-02",
    category: "laporan",
    unit_utama: "pkm-wadi-mubarak",
    lokasi: "bogor",
    topik: ["lazis", "beasiswa"],
    gambar: 3,
    penulis: "LAZIS Wadi Mubarak",
    tampilkan_di_induk: true,
    konten: paragraf(
      "LAZIS Wadi Mubarak menyelesaikan penyaluran beasiswa semester ganjil kepada 180 santri yatim dan dhuafa yang tersebar di seluruh unit pendidikan yayasan.",
      "Beasiswa mencakup biaya pendidikan, asrama, dan kebutuhan harian santri. Penerima ditetapkan lewat verifikasi berkas dan kunjungan rumah oleh tim amil.",
      "Laporan penyaluran lengkap beserta rincian sumber dana dan alokasinya tersedia untuk diunduh pada halaman transparansi.",
    ),
  },
  {
    slug: "kerja-sama-beasiswa-dengan-universitas-islam-madinah",
    judul: "Penandatanganan Kerja Sama Jalur Beasiswa dengan Lembaga Mitra",
    ringkasan:
      "Yayasan menandatangani nota kesepahaman jalur rekomendasi beasiswa bagi lulusan SMA Tahfizh dan MBS Wadi Mubarak.",
    tanggal: "2026-06-24",
    category: "kerja-sama",
    unit_utama: "sma-tahfizh-putra",
    unit: ["sma-tahfizh-putra", "mbs-wadi-mubarak"],
    lokasi: "bogor",
    topik: ["kerja-sama", "beasiswa"],
    gambar: 4,
    penulis: "Sekretariat Yayasan",
    tampilkan_di_induk: true,
  },
  {
    slug: "menakar-ulang-target-hafalan-anak",
    judul: "Menakar Ulang Target Hafalan Anak: Cepat Belum Tentu Kuat",
    ringkasan:
      "Catatan pengampu halaqah tentang mengapa target hafalan yang terlalu agresif justru memperbesar risiko santri kehilangan hafalannya.",
    tanggal: "2026-06-18",
    category: "artikel",
    unit_utama: "sdit-wadi-mubarak",
    lokasi: "bogor",
    topik: ["tahfizh", "parenting"],
    gambar: 5,
    penulis: "Ust. Abdurrahman Hakim",
    tampilkan_di_induk: true,
    konten: paragraf(
      "Pertanyaan yang paling sering diajukan wali santri pada masa pendaftaran adalah: berapa juz yang akan dihafal anak saya dalam setahun? Pertanyaan ini wajar, tetapi jawabannya jarang sesederhana angka.",
      "Dalam pengalaman kami mendampingi halaqah selama lebih dari satu dekade, santri yang menambah hafalan terlalu cepat tanpa muraja'ah yang seimbang justru kehilangan sebagian besar hafalannya dalam dua tahun.",
      "Karena itu kurikulum tahfizh di seluruh unit Wadi Mubarak menempatkan muraja'ah pada porsi yang setara dengan setoran baru. Target dirancang agar dapat dijaga, bukan sekadar dicapai.",
      "Bagi wali santri, ukuran keberhasilan yang lebih berguna bukan jumlah juz pada rapor, melainkan apakah anak masih membaca mushaf dengan senang hati saat liburan.",
    ),
  },
  {
    slug: "pekan-proyek-santri-sdit-tema-air",
    judul: "Pekan Proyek SDIT: Santri Meneliti Sumber Air Kampus",
    ringkasan:
      "Santri kelas empat hingga enam memetakan penggunaan air kampus dan mengusulkan penghematan kepada pengurus yayasan.",
    tanggal: "2026-06-10",
    category: "kegiatan",
    unit_utama: "sdit-wadi-mubarak",
    lokasi: "bogor",
    topik: ["pembelajaran"],
    gambar: 6,
    penulis: "Humas SDIT",
    tampilkan_di_induk: true,
  },
  {
    slug: "juara-umum-musabaqah-hifzhil-quran-tingkat-provinsi",
    judul: "Santri Wadi Mubarak Juara Umum MHQ Tingkat Provinsi",
    ringkasan:
      "Delegasi yayasan meraih empat medali emas pada Musabaqah Hifzhil Qur'an tingkat Provinsi Jawa Barat.",
    tanggal: "2026-05-28",
    category: "prestasi",
    unit_utama: "smp-tahfizh-putra",
    unit: ["smp-tahfizh-putra", "sma-tahfizh-putra"],
    lokasi: "bogor",
    topik: ["prestasi", "tahfizh"],
    gambar: 7,
    penulis: "Humas Wadi Mubarak",
    tampilkan_di_induk: true,
  },
  {
    slug: "renovasi-asrama-putri-tahap-dua",
    judul: "Renovasi Asrama Putri Tahap Dua Dimulai",
    ringkasan:
      "Pengerjaan tahap dua mencakup penambahan 60 tempat tidur, perbaikan sanitasi, dan ruang tahfizh baru.",
    tanggal: "2026-05-14",
    category: "berita",
    unit_utama: "smp-tahfizh-putri",
    unit: ["smp-tahfizh-putri", "sma-tahfizh-putri"],
    lokasi: "bogor",
    topik: ["pembangunan"],
    gambar: 8,
    penulis: "Bagian Sarana Prasarana",
    tampilkan_di_induk: true,
  },
  {
    slug: "kelas-tahsin-dewasa-angkatan-baru-dibuka",
    judul: "Kelas Tahsin Dewasa Angkatan Baru Dibuka, Gratis untuk Umum",
    ringkasan:
      "PKM Wadi Mubarak membuka kelas tahsin luring dan daring untuk umum tanpa biaya pendaftaran, kuota 120 peserta.",
    tanggal: "2026-05-06",
    category: "pengumuman",
    unit_utama: "pkm-wadi-mubarak",
    lokasi: "bogor",
    topik: ["tahsin", "masyarakat"],
    gambar: 9,
    penulis: "Pengurus PKM",
    tampilkan_di_induk: true,
  },
  {
    slug: "kunjungan-belajar-taud-sleman-ke-museum",
    judul: "Kunjungan Belajar TAUD SAQU Sleman ke Museum Anak",
    ringkasan:
      "Santri TAUD SAQU Sleman mengikuti kunjungan belajar tematik bersama wali santri sebagai penutup semester.",
    tanggal: "2026-04-29",
    category: "kegiatan",
    unit_utama: "taud-saqu",
    lokasi: "sleman",
    topik: ["pembelajaran"],
    gambar: 10,
    penulis: "Humas TAUD Sleman",
    // Konten cabang: tayang penuh di situs unit nanti, tidak dikurasi ke induk.
    tampilkan_di_induk: false,
  },
  {
    slug: "jadwal-ujian-tasmi-semester-genap",
    judul: "Jadwal Ujian Tasmi' Semester Genap",
    ringkasan:
      "Pengumuman internal jadwal ujian tasmi' per halaqah beserta daftar penguji untuk semester genap.",
    tanggal: "2026-04-20",
    category: "pengumuman",
    unit_utama: "smp-tahfizh-putra",
    lokasi: "bogor",
    topik: ["tahfizh"],
    gambar: 11,
    penulis: "Bagian Tahfizh",
    // Pengumuman internal unit — tidak relevan bagi pengunjung situs induk.
    tampilkan_di_induk: false,
  },
  {
    slug: "buka-puasa-bersama-warga-sekitar-kampus",
    judul: "Buka Puasa Bersama 600 Warga Sekitar Kampus",
    ringkasan:
      "Yayasan bersama LAZIS menggelar buka puasa dan pembagian paket sembako untuk warga di sekitar kampus Bogor.",
    tanggal: "2026-03-22",
    category: "kegiatan",
    unit_utama: "pkm-wadi-mubarak",
    lokasi: "bogor",
    topik: ["masyarakat", "lazis"],
    gambar: 12,
    penulis: "LAZIS Wadi Mubarak",
    tampilkan_di_induk: true,
  },
];

export const postsMentah: unknown[] = daftar.map((p) => ({
  slug: p.slug,
  judul: p.judul,
  ringkasan: p.ringkasan,
  tanggal: p.tanggal,
  category: p.category,
  unit_utama: p.unit_utama,
  unit: p.unit ?? [p.unit_utama],
  lokasi: p.lokasi,
  topik: p.topik,
  gambar: {
    src: `/img/post-${p.gambar}.svg`,
    alt: p.judul,
    width: 1200,
    height: 800,
  },
  penulis: p.penulis,
  tampilkan_di_induk: p.tampilkan_di_induk,
  konten: p.konten ?? isiUmum,
}));
