/** Data contoh profil yayasan: capaian, mitra, laporan. */

export const capaianMentah: unknown[] = [
  { label: "Santri aktif", nilai: 2140, satuan: "", keterangan: "Seluruh unit, tahun ajaran 2025/2026" },
  { label: "Alumni", nilai: 6800, satuan: "", keterangan: "Sejak 2008" },
  { label: "Hafizh 30 juz", nilai: 512, satuan: "", keterangan: "Lulusan program tahfizh" },
  { label: "Pengajar & pengasuh", nilai: 286, satuan: "", keterangan: "Guru, musyrif, dan tenaga kependidikan" },
  { label: "Unit pendidikan", nilai: 11, satuan: "", keterangan: "Dari TAUD hingga perguruan tinggi" },
  { label: "Kampus", nilai: 2, satuan: "", keterangan: "Bogor dan Sleman" },
];


export const laporanMentah: unknown[] = [
  {
    slug: "laporan-keuangan-2025",
    judul: "Laporan Keuangan Yayasan Tahun 2025",
    tahun: 2025,
    jenis: "keuangan",
    ukuran: "2,4 MB",
    format: "PDF",
    url: "/dokumen/laporan-keuangan-2025.pdf",
    ringkasan: "Laporan posisi keuangan, aktivitas, dan arus kas yang telah ditelaah akuntan publik.",
  },
  {
    slug: "laporan-penyaluran-lazis-2025",
    judul: "Laporan Penyaluran ZIS dan Wakaf 2025",
    tahun: 2025,
    jenis: "program",
    ukuran: "1,8 MB",
    format: "PDF",
    url: "/dokumen/laporan-penyaluran-lazis-2025.pdf",
    ringkasan: "Rincian penghimpunan dan penyaluran per program beserta jumlah penerima manfaat.",
  },
  {
    slug: "laporan-dampak-pendidikan-2025",
    judul: "Laporan Dampak Program Pendidikan 2025",
    tahun: 2025,
    jenis: "dampak",
    ukuran: "3,1 MB",
    format: "PDF",
    url: "/dokumen/laporan-dampak-pendidikan-2025.pdf",
    ringkasan: "Capaian hafalan, kelulusan, dan sebaran studi lanjut alumni seluruh unit.",
  },
  {
    slug: "laporan-keuangan-2024",
    judul: "Laporan Keuangan Yayasan Tahun 2024",
    tahun: 2024,
    jenis: "keuangan",
    ukuran: "2,2 MB",
    format: "PDF",
    url: "/dokumen/laporan-keuangan-2024.pdf",
    ringkasan: "Laporan keuangan tahunan beserta catatan atas laporan keuangan.",
  },
  {
    slug: "laporan-penyaluran-lazis-2024",
    judul: "Laporan Penyaluran ZIS dan Wakaf 2024",
    tahun: 2024,
    jenis: "program",
    ukuran: "1,6 MB",
    format: "PDF",
    url: "/dokumen/laporan-penyaluran-lazis-2024.pdf",
    ringkasan: "Rekapitulasi penyaluran delapan asnaf dan program wakaf produktif.",
  },
  {
    slug: "laporan-keuangan-2023",
    judul: "Laporan Keuangan Yayasan Tahun 2023",
    tahun: 2023,
    jenis: "keuangan",
    ukuran: "2,0 MB",
    format: "PDF",
    url: "/dokumen/laporan-keuangan-2023.pdf",
    ringkasan: "Laporan keuangan tahunan yayasan periode 1 Januari – 31 Desember 2023.",
  },
];

export const mitraMentah: unknown[] = [
  {
    slug: "kementerian-agama-ri",
    nama: "Kementerian Agama Republik Indonesia",
    jenis: "pemerintah",
    logo: null,
    keterangan: "Pembinaan dan pengawasan lembaga amil zakat serta pendidikan keagamaan.",
    sejak: 2021,
  },
  {
    slug: "dinas-pendidikan-kabupaten-bogor",
    nama: "Dinas Pendidikan Kabupaten Bogor",
    jenis: "pemerintah",
    logo: null,
    keterangan: "Perizinan operasional dan pembinaan satuan pendidikan formal.",
    sejak: 2016,
  },
  {
    slug: "jaringan-sekolah-islam-terpadu",
    nama: "Jaringan Sekolah Islam Terpadu",
    jenis: "pendidikan",
    logo: null,
    keterangan: "Pengembangan kurikulum terpadu dan pelatihan guru.",
    sejak: 2012,
  },
  {
    slug: "lembaga-wakaf-nusantara",
    nama: "Lembaga Wakaf Nusantara",
    jenis: "lembaga-sosial",
    logo: null,
    keterangan: "Pendampingan pengelolaan wakaf produktif dan literasi wakaf.",
    sejak: 2020,
  },
  {
    slug: "yayasan-peduli-yatim-indonesia",
    nama: "Yayasan Peduli Yatim Indonesia",
    jenis: "lembaga-sosial",
    logo: null,
    keterangan: "Program beasiswa bersama untuk santri yatim dan dhuafa.",
    sejak: 2019,
  },
  {
    slug: "bank-syariah-mitra",
    nama: "Bank Syariah Mitra",
    jenis: "korporasi",
    logo: null,
    keterangan: "Layanan perbankan syariah dan program CSR pendidikan.",
    sejak: 2018,
  },
];

export const testimoniMentah: unknown[] = [
  {
    slug: "testimoni-wali-santri-mts",
    nama: "Bapak Hendra Wijaya",
    peran: "Wali santri MTs Tahfizh Putra",
    unit: "mts-tahfizh-putra",
    kutipan:
      "Yang membuat kami tenang bukan janji jumlah juz, tapi karena musyrif tahu betul karakter anak kami dan mengabari kalau ada yang perlu dibicarakan.",
    foto: { src: "/img/orang-3.svg", alt: "", width: 800, height: 800 },
  },
  {
    slug: "testimoni-alumni-ma",
    nama: "Fatimah Az-Zahra",
    peran: "Alumni MA Mahabbah Boarding School, angkatan 2022",
    unit: "ma-mbs-putri",
    kutipan:
      "Kebiasaan muraja'ah sebelum subuh yang dibentuk di asrama masih saya jalankan sampai sekarang di bangku kuliah.",
    foto: { src: "/img/orang-6.svg", alt: "", width: 800, height: 800 },
  },
  {
    slug: "testimoni-peserta-pkm",
    nama: "Ustaz Ridwan Maulana",
    peran: "Peserta Program Kaderisasi Muhaffizh, angkatan 2024",
    unit: "pkm-wadi-mubarak",
    kutipan:
      "Saya masuk dengan hafalan 20 juz dan mengira tinggal menambah. Ternyata setahun pertama justru dipakai membetulkan bacaan sebelum saya diizinkan menyimak santri.",
    foto: { src: "/img/orang-9.svg", alt: "", width: 800, height: 800 },
  },
];

export const agendaMentah: unknown[] = [
  {
    slug: "tasmi-akbar-santri-ma",
    judul: "Tasmi' Akbar Santri MA Tahfizh",
    mulai: "2026-08-09T07:00:00+07:00",
    selesai: "2026-08-09T15:00:00+07:00",
    tempat: "Masjid Utama, Kampus Bogor",
    lokasi: "bogor",
    unit: ["ma-tahfizh-putra", "ma-mbs-putri"],
    ringkasan: "Ujian tasmi' terbuka 30 juz yang dapat disaksikan wali santri dan masyarakat umum.",
    terbuka_umum: true,
  },
  {
    slug: "open-house-ppdb-2026",
    judul: "Open House PPDB 2026/2027",
    mulai: "2026-08-16T08:00:00+07:00",
    selesai: "2026-08-16T12:00:00+07:00",
    tempat: "Aula Yayasan, Kampus Bogor",
    lokasi: "bogor",
    unit: ["mit-saqu", "mts-tahfizh-putra", "ma-tahfizh-putra"],
    ringkasan: "Sesi tanya jawab bersama kepala unit, tur kampus, dan penjelasan alur pendaftaran.",
    terbuka_umum: true,
  },
  {
    slug: "kajian-pekanan-agustus",
    judul: "Kajian Pekanan: Adab Menuntut Ilmu",
    mulai: "2026-08-22T16:00:00+07:00",
    selesai: "2026-08-22T17:30:00+07:00",
    tempat: "Masjid Utama, Kampus Bogor",
    lokasi: "bogor",
    unit: ["stiu-wadi-mubarak"],
    ringkasan: "Kajian rutin terbuka untuk umum, disiarkan juga melalui kanal daring yayasan.",
    terbuka_umum: true,
  },
  {
    slug: "pelatihan-guru-tahfizh",
    judul: "Pelatihan Metode Tahfizh untuk Pengampu",
    mulai: "2026-09-05T08:00:00+07:00",
    selesai: "2026-09-06T16:00:00+07:00",
    tempat: "Gedung STIU, Kampus Bogor",
    lokasi: "bogor",
    unit: ["stiu-wadi-mubarak"],
    ringkasan: "Pelatihan dua hari bagi pengampu halaqah internal dan lembaga mitra.",
    terbuka_umum: false,
  },
  {
    slug: "wisuda-taud-sleman",
    judul: "Wisuda dan Pentas Akhir Tahun TAUD SAQU Sleman",
    mulai: "2026-09-13T08:00:00+07:00",
    selesai: null,
    tempat: "Kampus Sleman",
    lokasi: "sleman",
    unit: ["taud-saqu"],
    ringkasan: "Penutupan tahun ajaran bersama wali santri cabang Sleman.",
    terbuka_umum: false,
  },
];

export const faqMentah: unknown[] = [
  {
    slug: "kapan-ppdb-dibuka",
    pertanyaan: "Kapan pendaftaran santri baru dibuka?",
    jawaban:
      "Jadwal berbeda per unit. MTs dan MA umumnya membuka gelombang pertama pada Oktober, MIT pada November, TAUD pada Januari, sedangkan PKM membuka pendaftaran sekali setahun pada April. Program kaderisasi guru — PG TAUD SAQU, I'dad Mu'allimat, dan Imtiaz Putri — memiliki jadwal angkatannya sendiri. Periode terkini setiap unit tercantum pada halaman program.",
    kelompok: "pendaftaran",
    urutan: 1,
  },
  {
    slug: "apakah-harus-hafal-dulu",
    pertanyaan: "Apakah anak harus sudah punya hafalan sebelum mendaftar?",
    jawaban:
      "Untuk TAUD dan MIT tidak ada syarat hafalan awal. MTs mensyaratkan minimal 1 juz dan MA minimal 5 juz, karena target hafalan jenjang tersebut disusun bertingkat. PKM, sebagai program kaderisasi muhaffizh, mensyaratkan minimal 15 juz, sedangkan I'dad Mu'allimat mensyaratkan minimal juz 30 atau kesediaan menuntaskannya selama program.",
    kelompok: "pendaftaran",
    urutan: 2,
  },
  {
    slug: "bisa-daftar-dari-luar-kota",
    pertanyaan: "Kami tinggal di luar Jawa. Apakah bisa mendaftar?",
    jawaban:
      "Bisa. Seluruh unit boarding menerima santri dari seluruh Indonesia. Tes seleksi dapat dilakukan secara daring, kecuali tes kesehatan yang dijadwalkan saat kedatangan.",
    kelompok: "pendaftaran",
    urutan: 3,
  },
  {
    slug: "berapa-biaya-pendidikan",
    pertanyaan: "Berapa biaya pendidikan di Wadi Mubarak?",
    jawaban:
      "Kisaran biaya berbeda per unit dan tercantum pada setiap halaman profil unit. Rincian resmi disampaikan panitia PPDB unit terkait, karena komponen biaya dapat berubah setiap tahun ajaran.",
    kelompok: "biaya",
    urutan: 4,
  },
  {
    slug: "ada-beasiswa",
    pertanyaan: "Apakah tersedia beasiswa?",
    jawaban:
      "Ada. LAZIS Wadi Mubarak menyediakan beasiswa untuk santri yatim dan dhuafa di seluruh unit, serta beasiswa penuh bagi hafizh 30 juz yang melanjutkan ke STIU. Pengajuan dilakukan bersamaan dengan pendaftaran.",
    kelompok: "biaya",
    urutan: 5,
  },
  {
    slug: "bagaimana-santri-dibina-di-asrama",
    pertanyaan: "Bagaimana pembinaan santri di asrama?",
    jawaban:
      "Setiap 12 santri didampingi satu musyrif atau musyrifah yang tinggal di gedung yang sama. Pendamping mencatat perkembangan hafalan, adab, dan kesehatan santri, serta menghubungi wali santri secara berkala.",
    kelompok: "kehidupan-santri",
    urutan: 6,
  },
  {
    slug: "kapan-santri-boleh-dijenguk",
    pertanyaan: "Kapan santri boleh dijenguk atau pulang?",
    jawaban:
      "Kunjungan wali santri dijadwalkan sebulan sekali pada akhir pekan. Santri pulang saat libur semester dan libur Idulfitri. Jadwal rinci dibagikan pada awal tahun ajaran.",
    kelompok: "kehidupan-santri",
    urutan: 7,
  },
  {
    slug: "bagaimana-jika-santri-sakit",
    pertanyaan: "Bagaimana jika santri sakit?",
    jawaban:
      "Klinik kampus beroperasi 24 jam dengan perawat menetap. Untuk kasus yang memerlukan penanganan lanjutan, santri dirujuk ke rumah sakit mitra dan wali santri segera dihubungi.",
    kelompok: "kehidupan-santri",
    urutan: 8,
  },
  {
    slug: "bisa-belajar-quran-tanpa-mondok",
    pertanyaan: "Saya bukan santri. Bisakah saya belajar Al-Qur'an di Wadi Mubarak?",
    jawaban:
      "Bisa. Ada dua program yang terbuka untuk umum. Graha Qur'an berjalan daring lewat Google Meet selama tiga bulan per angkatan dengan empat tingkat, dari Pra Tahsin sampai Matan Jazariyah. Wisata Qur'an berupa short camp beberapa hari di kampus Megamendung untuk rombongan sekolah, instansi, atau komunitas. Keduanya dijelaskan pada halaman program Al-Qur'an untuk umum.",
    kelompok: "umum",
    urutan: 9,
  },
  {
    slug: "ingin-jadi-guru-taud",
    pertanyaan: "Saya ingin menjadi guru tahfizh anak usia dini. Lewat jalur mana?",
    jawaban:
      "Ada dua jalur dengan panjang yang berbeda. PG TAUD SAQU berdurasi tiga bulan di asrama dan cocok bagi yang ingin segera merintis TAUD di daerahnya. I'dad Mu'allimat berdurasi dua tahun penuh, membiayai pendidikan dan asrama peserta, serta memberi kepastian penempatan mengajar di jaringan sekolah yayasan setelah lulus.",
    kelompok: "pendaftaran",
    urutan: 10,
  },
  {
    slug: "bagaimana-cara-berdonasi",
    pertanyaan: "Bagaimana cara berdonasi?",
    jawaban:
      "Donasi disalurkan melalui transfer ke rekening resmi LAZIS Wadi Mubarak sesuai jenis dana (zakat, infak, sedekah, atau wakaf). Nomor rekening dan alur konfirmasi tersedia pada halaman donasi.",
    kelompok: "donasi",
    urutan: 11,
  },
  {
    slug: "apakah-donasi-dilaporkan",
    pertanyaan: "Apakah donasi saya dilaporkan?",
    jawaban:
      "Ya. Laporan penyaluran diterbitkan setiap semester dan laporan keuangan tahunan ditelaah akuntan publik. Seluruh dokumen dapat diunduh bebas pada halaman transparansi.",
    kelompok: "donasi",
    urutan: 12,
  },
  {
    slug: "apakah-menerima-kunjungan",
    pertanyaan: "Apakah yayasan menerima kunjungan lembaga?",
    jawaban:
      "Menerima. Pengajuan kunjungan studi banding atau penjajakan kerja sama dapat disampaikan lewat halaman kerja sama, sebaiknya dua pekan sebelum tanggal yang direncanakan.",
    kelompok: "umum",
    urutan: 13,
  },
  {
    slug: "bagaimana-menghubungi-alumni",
    pertanyaan: "Bagaimana alumni dapat terhubung kembali?",
    jawaban:
      "Ikatan Alumni Wadi Mubarak mengelola pendataan dan kegiatan alumni. Hubungi sekretariat yayasan lewat halaman kontak untuk didaftarkan ke kanal alumni angkatan Anda.",
    kelompok: "umum",
    urutan: 14,
  },
];

/**
 * Foto dokumentasi yayasan. Urutannya menentukan pembagian kolom pada dinding
 * foto beranda (`BentoBerjalan` mengambil indeks genap untuk kolom kiri dan
 * ganjil untuk kolom kanan), jadi potret dan lanskap sengaja diselang-seling.
 */
export const galeriMentah: unknown[] = [
  {
    src: "/img/galeri-wisudawati-mahabbah.jpg",
    alt: "Wisudawati Mahabbah Boarding School mengenakan selempang kelulusan",
    width: 775,
    height: 1200,
  },
  {
    src: "/img/galeri-taud-mewarnai.jpg",
    alt: "Santri TAUD mewarnai bersama di meja kelas",
    width: 1600,
    height: 2133,
  },
  {
    src: "/img/galeri-dauroh-fikih.jpg",
    alt: "Peserta dauroh fikih menyimak kajian di masjid kampus",
    width: 1200,
    height: 675,
  },
  {
    src: "/img/galeri-haflah-akhirussanah.jpg",
    alt: "Santri TAUD dan MIT SaQu memegang piagam pada haflah akhirussanah",
    width: 1600,
    height: 1066,
  },
  {
    src: "/img/galeri-buka-puasa-bersama.jpg",
    alt: "Santri mengikuti buka puasa bersama di aula kampus",
    width: 1200,
    height: 675,
  },
  {
    src: "/img/galeri-wisuda-huffazh.jpg",
    alt: "Foto bersama pada Wisuda Akbar Huffazhul Qur'an ke-5",
    width: 1280,
    height: 720,
  },
  {
    src: "/img/galeri-taud-panggung.jpg",
    alt: "Santri TAUD menunggu giliran tampil di panggung acara",
    width: 1200,
    height: 675,
  },
  {
    src: "/img/galeri-cendera-mata-masyayikh.jpg",
    alt: "Penyerahan cendera mata kepada masyayikh tamu di kampus",
    width: 1200,
    height: 675,
  },
  {
    src: "/img/galeri-wisuda-haafizhaat.jpg",
    alt: "Wisuda ke-2 haafizhaatul Qur'an Mahabbah Boarding School",
    width: 1600,
    height: 1067,
  },
  {
    src: "/img/galeri-dauroh-tadabur.jpg",
    alt: "Dauroh tadabur Al-Qur'an bersama syaikh tamu di kampus STIU",
    width: 1280,
    height: 720,
  },
  {
    src: "/img/galeri-santriwati-halaqah.jpg",
    alt: "Foto bersama santriwati seusai halaqah di aula asrama",
    width: 1600,
    height: 901,
  },
  {
    src: "/img/galeri-wisuda-taud-mit.jpg",
    alt: "Foto bersama wisuda TAUD dan MIT SaQu",
    width: 1200,
    height: 675,
  },
];
