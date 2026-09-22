/** Data contoh profil yayasan: capaian, mitra. */

export const capaianMentah: unknown[] = [
  { label: "Alumni", nilai: 12000, satuan: "+", keterangan: "Sejak yayasan berdiri pada 2008" },
  { label: "Sekolah jaringan Sahabat Al-Qur'an", nilai: 197, satuan: "", keterangan: "162 TAUD dan 35 MIT/SD di 27 provinsi" },
  { label: "Provinsi terjangkau", nilai: 27, satuan: "", keterangan: "Dari Aceh sampai Maluku Utara" },
  { label: "Negara memakai kurikulum yang sama", nilai: 14, satuan: "", keterangan: "Kurikulum At-Tibyan susunan ulama Madinah" },
  { label: "Alumni di Timur Tengah", nilai: 30, satuan: "+", keterangan: "Menempuh S1 sampai S3 di delapan universitas" },
  { label: "Unit pendidikan", nilai: 11, satuan: "", keterangan: "Dari TAUD hingga perguruan tinggi" },
];


export const mitraMentah: unknown[] = [
  {
    slug: "jaringan-sekolah-islam-terpadu",
    nama: "Jaringan Sekolah Islam Terpadu",
    jenis: "pendidikan",
    logo: null,
    keterangan: "Pengembangan kurikulum terpadu dan pelatihan guru.",
    sejak: 2012,
  },
  {
    slug: "maqarie-al-quraniyah-madinah",
    nama: "Maqarie Al-Qur'aniyah, Madinah",
    jenis: "pendidikan",
    logo: null,
    keterangan: "Badan internasional penghafal Al-Qur'an yang menaungi program tahfizh bersanad MTs dan MA Wadi Mubarak.",
    sejak: 2019,
  },
  {
    slug: "jamiah-khairukum-jeddah",
    nama: "Jami'ah Khairukum, Jeddah",
    jenis: "pendidikan",
    logo: null,
    keterangan: "Kerja sama strategis pengembangan mutu pendidikan Islam bagi santriwati Mahabbah Boarding School.",
    sejak: 2024,
  },
  {
    slug: "universitas-islam-madinah",
    nama: "Universitas Islam Madinah",
    jenis: "pendidikan",
    logo: null,
    keterangan: "Asal kurikulum At-Tibyan sekaligus tujuan studi lanjut puluhan alumni Wadi Mubarak pada jenjang S1 sampai S3.",
    sejak: 2014,
  },
  {
    slug: "yayasan-peduli-yatim-indonesia",
    nama: "Yayasan Peduli Yatim Indonesia",
    jenis: "lembaga-sosial",
    logo: null,
    keterangan: "Program beasiswa bersama untuk santri yatim dan dhuafa.",
    sejak: 2019,
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
    slug: "pesantren-lansia-masa-senja-oktober-2026",
    judul: "Pesantren Lansia & Orang Tua: Mengisi Masa Senja",
    mulai: "2026-10-27T00:00:00+07:00",
    selesai: "2026-10-31T23:59:00+07:00",
    tempat: "Puncak Bogor",
    lokasi: "bogor",
    unit: ["wisata-quran"],
    ringkasan:
      "Pesantren kilat 5 hari 4 malam untuk Ayah & Bunda: ilmu waris, sholat khusyuk, fiqih ibadah, halaqah tahsin, dan muhasabah diri. Kuota terbatas 50 orang.",
    terbuka_umum: true,
    penyelenggara: "Wisata Qur'an",
    poster: {
      src: "/img/agenda-pesantren-lansia-2026.jpg",
      alt: "Poster Pesantren Lansia & Orang Tua, Saatnya Mengisi Masa Senja, 27 sampai 31 Oktober 2026 di Puncak Bogor",
      width: 1054,
      height: 1492,
    },
    kontak: { nama: "Rian Fahmi", wa: "6281111882022" },
    deskripsi: [
      "Ayah dan Bunda, masa senja bukan waktunya untuk berhenti belajar. Justru inilah saat yang tepat untuk lebih mendekat kepada Allah, memperbaiki ibadah, dan mengisi hari-hari dengan kegiatan yang penuh keberkahan.",
      "Pesantren Lansia & Orang Tua hadir dengan suasana nyaman di Puncak Bogor, dengan rangkaian kegiatan yang dirancang khusus untuk Ayah dan Bunda. Program ini didukung oleh Wisata Qur'an Yasaqu Wadi Mubarak.",
      "Yuk, ajak Ayah, Bunda, orang tua, atau keluarga tercinta untuk bersama-sama mengisi masa senja dengan ilmu, ibadah, silaturahmi, dan ketenangan hati. Hidup lebih berkah, hati lebih tenang.",
    ],
    rincian: [
      {
        judul: "Materi spesial",
        butir: [
          "Ilmu waris (faroidh)",
          "Sholat khusyuk",
          "Fiqih ibadah",
          "Halaqah tahsin Al-Qur'an",
          "Muhasabah diri",
        ],
      },
      {
        judul: "Fasilitas",
        butir: [
          "Penginapan nyaman berfasilitas bintang empat",
          "Suasana sejuk dan menenangkan",
          "Pembinaan bersama ustadz dan ustadzah",
          "Silaturahmi dan kebersamaan",
          "Bonus grup admin dan hadiah",
        ],
      },
      {
        judul: "Ketentuan",
        butir: [
          "Program 5 hari 4 malam",
          "Kuota terbatas, hanya 50 orang",
          "Diselenggarakan setiap bulan, cek jadwal terdekat melalui admin",
        ],
      },
    ],
  },
];

export const faqMentah: unknown[] = [
  {
    slug: "kapan-ppdb-dibuka",
    pertanyaan: "Kapan pendaftaran santri baru dibuka?",
    jawaban:
      "Jadwal berbeda per unit. MTs dan MA putra membuka PPDB batch 3 untuk tahun pelajaran 2027/2028, sedangkan Mahabbah Boarding School membuka batch 6 pada 1 Agustus 2026 sampai 30 Juni 2027. MIT membuka gelombangnya pada November, sedangkan TAUD SAQU membuka pendaftaran tahun ajaran 2026/2027 pada Oktober 2026 sampai Mei 2027, dan PKM sekali setahun pada April. Program kaderisasi guru — PG TAUD SAQU, I'dad Mu'allimat, dan Imtiaz Putri — memiliki jadwal angkatannya sendiri. Periode terkini setiap unit tercantum pada halaman program.",
    kelompok: "pendaftaran",
    urutan: 1,
  },
  {
    slug: "apakah-harus-hafal-dulu",
    pertanyaan: "Apakah anak harus sudah punya hafalan sebelum mendaftar?",
    jawaban:
      "Untuk TAUD dan MIT tidak ada syarat hafalan awal. TAUD menilai kesiapan lain: usia minimal 3 tahun 7 bulan, lulus toilet training, mampu mengikuti instruksi, dan jelas melafalkan huruf. MIT mensyaratkan lulus calistung dan mengenal huruf hijaiyah — mampu membaca iqro' 3 lebih diutamakan. MTs dan MA mengadakan tes kemampuan dan tes tahfizh saat seleksi. PKM, sebagai program kaderisasi muhaffizh, mensyaratkan minimal 15 juz, sedangkan I'dad Mu'allimat mensyaratkan minimal juz 30 atau kesediaan menuntaskannya selama program.",
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
      "Rincian biaya tidak kami cantumkan di situs ini. Komponennya berbeda antar unit dan antar cabang, dan dapat berubah setiap tahun ajaran — angka yang tayang di sini berisiko tidak lagi berlaku saat Anda membacanya. Yang resmi adalah rincian yang disampaikan panitia PPDB unit terkait; hubungi panitia lewat WhatsApp yang tercantum pada halaman profil unit.",
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
      "Ada dua jalur dengan panjang yang berbeda. PG TAUD SAQU berdurasi tiga bulan di asrama dan cocok bagi yang ingin segera merintis TAUD di daerahnya; angkatan ke-24 sudah diwisuda pada Juli 2025. I'dad Mu'allimat berdurasi dua tahun penuh, membiayai pendidikan dan asrama peserta, serta memberi kepastian penempatan mengajar di jaringan sekolah yayasan setelah lulus.",
    kelompok: "pendaftaran",
    urutan: 10,
  },
  {
    slug: "bagaimana-cara-berdonasi",
    pertanyaan: "Bagaimana cara berdonasi?",
    jawaban:
      "Donasi disalurkan melalui transfer ke rekening atas nama lembaga — BSI a.n. LAZIS SaQu Wadi Mubarak atau Mandiri a.n. Islamic Center Wadi Mubarak. Tulis jenis dana (zakat, infak, sedekah, atau wakaf) pada berita transfer. Nomor rekening dan alur konfirmasi tersedia pada halaman donasi.",
    kelompok: "donasi",
    urutan: 11,
  },
  {
    slug: "apakah-donasi-dilaporkan",
    pertanyaan: "Apakah donasi saya dicatat?",
    jawaban:
      "Ya. Setiap donasi yang dikonfirmasi dicatat atas nama Anda dalam pembukuan LAZIS Wadi Mubarak dan disalurkan sesuai peruntukannya. Konfirmasi penyaluran dapat kami kirimkan kepada donatur yang memintanya lewat halaman kontak.",
    kelompok: "donasi",
    urutan: 12,
  },
  {
    slug: "apakah-menerima-kunjungan",
    pertanyaan: "Apakah yayasan menerima kunjungan lembaga?",
    jawaban:
      "Menerima. Penjajakan kemitraan pendirian TAUD atau MIT Sahabat Al-Qur'an dapat disampaikan lewat halaman kemitraan. Untuk kunjungan studi banding atau kerja sama lain, silakan hubungi sekretariat lewat halaman kontak, sebaiknya dua pekan sebelum tanggal yang direncanakan.",
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
 *
 * `kategori` menjadi penyaring di halaman /galeri. Kelompoknya sengaja sedikit
 * dan berdasarkan jenis acara, bukan unit: pengunjung mencari "wisuda" atau
 * "kegiatan anak", bukan nama lembaga penyelenggaranya.
 */
export const galeriMentah: unknown[] = [
  {
    src: "/img/galeri-wisudawati-mahabbah.jpg",
    alt: "Wisudawati Mahabbah Boarding School mengenakan selempang kelulusan",
    width: 775,
    height: 1200,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-taud-mewarnai.jpg",
    alt: "Santri TAUD mewarnai bersama di meja kelas",
    width: 1600,
    height: 2133,
    kategori: "anak",
  },
  {
    src: "/img/galeri-dauroh-fikih.jpg",
    alt: "Peserta dauroh fikih menyimak kajian di masjid kampus",
    width: 1200,
    height: 675,
    kategori: "dauroh",
  },
  {
    src: "/img/galeri-rihlah-peserta-pg-taud.jpg",
    alt: "Peserta PG TAUD SAQU berfoto bersama saat rihlah di lapangan berlatar pegunungan",
    width: 1200,
    height: 1600,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-wisuda-pg-taud-angkatan-24.jpg",
    alt: "Foto bersama wisuda PG TAUD SAQU angkatan ke-24 di Megamendung, 10 Juli 2025",
    width: 1600,
    height: 1200,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-haflah-akhirussanah.jpg",
    alt: "Santri TAUD dan MIT SaQu memegang piagam pada haflah akhirussanah",
    width: 1600,
    height: 1066,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-buka-puasa-bersama.jpg",
    alt: "Santri mengikuti buka puasa bersama di aula kampus",
    width: 1200,
    height: 675,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-wisuda-huffazh.jpg",
    alt: "Foto bersama pada Wisuda Akbar Huffazhul Qur'an ke-5",
    width: 1280,
    height: 720,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-taud-panggung.jpg",
    alt: "Santri TAUD menunggu giliran tampil di panggung acara",
    width: 1200,
    height: 675,
    kategori: "anak",
  },
  {
    src: "/img/galeri-cendera-mata-masyayikh.jpg",
    alt: "Penyerahan cendera mata kepada masyayikh tamu di kampus",
    width: 1200,
    height: 675,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-halaqah-peserta-pg-taud.jpg",
    alt: "Peserta PG TAUD SAQU melingkar dalam halaqah tahsin bersama pengampunya",
    width: 1600,
    height: 1200,
    kategori: "halaqah",
  },
  {
    src: "/img/galeri-wisudawati-pg-taud-piagam.jpg",
    alt: "Wisudawati PG TAUD SAQU angkatan ke-24 memegang piagam kelulusan",
    width: 1600,
    height: 1200,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-wisuda-haafizhaat.jpg",
    alt: "Wisuda ke-2 haafizhaatul Qur'an Mahabbah Boarding School",
    width: 1600,
    height: 1067,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-dauroh-tadabur.jpg",
    alt: "Dauroh tadabur Al-Qur'an bersama syaikh tamu di kampus STIU",
    width: 1280,
    height: 720,
    kategori: "dauroh",
  },
  {
    src: "/img/galeri-santriwati-halaqah.jpg",
    alt: "Foto bersama santriwati seusai halaqah di aula asrama",
    width: 1600,
    height: 901,
    kategori: "halaqah",
  },
  {
    src: "/img/galeri-praktik-mengajar-pg-taud.jpg",
    alt: "Peserta PG TAUD SAQU praktik mengajar di kelas TAUD yang sedang berjalan",
    width: 1600,
    height: 1200,
    kategori: "anak",
  },
  {
    src: "/img/galeri-wisudawati-pg-taud-cendera-mata.jpg",
    alt: "Wisudawati PG TAUD SAQU menerima cendera mata di panggung wisuda",
    width: 1600,
    height: 1200,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-wisuda-taud-mit.jpg",
    alt: "Foto bersama wisuda TAUD dan MIT SaQu",
    width: 1200,
    height: 675,
    kategori: "wisuda",
  },
  {
    src: "/img/galeri-mtsma-kelas-papan-tulis.jpg",
    alt: "Ustadz menerangkan materi di papan tulis di hadapan santri MTs dan MA Tahfizh Putra",
    width: 2000,
    height: 1125,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-mtsma-halaqah-tahsin.jpg",
    alt: "Halaqah tahsin MTs Tahfizh Putra: satu pengampu menyimak delapan santri duduk melingkar",
    width: 1280,
    height: 720,
    kategori: "halaqah",
  },
  {
    src: "/img/galeri-mtsma-kelas-malam-penjelasan.jpg",
    alt: "Ustadz menjelaskan pelajaran kepada santri MTs dan MA Tahfizh Putra pada jam belajar malam",
    width: 2000,
    height: 1500,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-mtsma-menulis-di-kelas.jpg",
    alt: "Santri MTs dan MA Tahfizh Putra berseragam cokelat menulis di bukunya saat pelajaran berlangsung",
    width: 2000,
    height: 1125,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-mtsma-soal-tertulis-ruang-kelas.jpg",
    alt: "Santri MTs dan MA Tahfizh Putra serempak mengerjakan soal tertulis di bangku masing-masing",
    width: 1280,
    height: 720,
    kategori: "kampus",
  },
  {
    src: "/img/galeri-mtsma-kelas-malam.jpg",
    alt: "Santri MTs dan MA Tahfizh Putra menyimak pelajaran di ruang kelas pada jam belajar malam",
    width: 2000,
    height: 1500,
    kategori: "kampus",
  },
];
