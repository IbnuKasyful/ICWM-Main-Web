/**
 * Program Al-Qur'an untuk umum: Graha Qur'an dan Wisata Qur'an.
 *
 * Keduanya dulu berada di bawah YASAQU. Setelah lembaga itu tidak lagi
 * dipakai, programnya berjalan langsung di bawah yayasan — namun tetap bukan
 * unit pendidikan: tidak ada jenjang, tidak ada PPDB, dan pesertanya masyarakat
 * umum, bukan santri. Karena itu datanya dipisah dari `src/data/units.ts` agar
 * tidak ikut tersaring di /program.
 *
 * Seperti berkas data lain, isinya akan digantikan WPGraphQL pada Tahap 0.
 */

export const programQuranMentah: unknown[] = [
  {
    slug: "graha-quran",
    nama: "Graha Qur'an",
    nama_pendek: "Graha Qur'an",
    ringkasan:
      "Bimbingan belajar Al-Qur'an secara daring bagi siapa pun yang tidak bisa mondok tetapi ingin bacaannya diperbaiki langsung oleh pengampu, bukan lewat rekaman.",
    penyelenggaraan: "daring",
    durasi: "Tiga bulan per angkatan",
    peserta: "Umum, segala usia; kelas putra dan putri terpisah",
    biaya: "Rincian biaya disampaikan panitia saat pendaftaran",
    warna_aksen: "#0e7490",
    gambar: {
      src: "/img/galeri-dauroh-tadabur.jpg",
      alt: "Peserta menyimak kajian tadabur Al-Qur'an di kampus Wadi Mubarak",
      width: 1280,
      height: 720,
    },
    untuk_siapa: [
      "Anda yang ingin belajar tahsin tetapi tidak memungkinkan tinggal di asrama",
      "Pekerja dan ibu rumah tangga dengan waktu belajar yang tidak tetap",
      "Yang merasa terlambat memulai — kelas ini tidak mensyaratkan hafalan awal",
      "Yang sudah bisa membaca namun ingin bacaannya diperiksa ulang",
    ],
    sorotan: [
      {
        judul: "Empat tingkat, bukan satu kelas untuk semua",
        isi: "Pra Tahsin, Tahsin, Matan Tuhfatul Athfal, dan Matan Jazariyah. Peserta ditempatkan sesuai hasil tes bacaan awal, bukan sesuai keinginan.",
        ikon: "filter",
      },
      {
        judul: "Metode At-Tibyan, 40 persen teori dan 60 persen praktik",
        isi: "Sebagian besar waktu pertemuan dipakai untuk membaca dan disimak, bukan mendengarkan penjelasan.",
        ikon: "quran",
      },
      {
        judul: "Diampu alumni Wadi Mubarak",
        isi: "Pengampu merupakan lulusan Islamic Center Wadi Mubarak, sebagian di antaranya memegang sanad bacaan.",
        ikon: "orang",
      },
      {
        judul: "Jadwal dipilih peserta",
        isi: "Pertemuan berlangsung lewat Google Meet dan slot waktunya dipilih sendiri saat pendaftaran.",
        ikon: "kalender",
      },
      {
        judul: "Modul, sertifikat, dan komunitas",
        isi: "Modul belajar diberikan cuma-cuma, kelulusan disertai sertifikat, dan peserta bergabung ke komunitas alumni program.",
        ikon: "dokumen",
      },
    ],
    materi: [
      {
        judul: "Pra Tahsin",
        isi: "Untuk yang belum bisa membaca Al-Qur'an atau perlu membenahi bacaan dari dasar.",
        ikon: "bintang",
      },
      {
        judul: "Tahsin",
        isi: "Perbaikan bacaan bertajwid: makharijul huruf, sifat huruf, dan hukum bacaan.",
        ikon: "quran",
      },
      {
        judul: "Matan Tuhfatul Athfal",
        isi: "Kaidah dasar tajwid dipelajari langsung dari matannya.",
        ikon: "dokumen",
      },
      {
        judul: "Matan Jazariyah",
        isi: "Tajwid lanjutan dengan pembahasan makhraj dan sifat huruf yang lebih dalam.",
        ikon: "perisai",
      },
    ],
    alur_daftar: [
      "Hubungi panitia lewat WhatsApp untuk jadwal angkatan terdekat",
      "Isi formulir pendaftaran sesuai kelas putra atau putri",
      "Tes bacaan awal untuk menentukan tingkat",
      "Pembayaran biaya program dan penempatan kelas",
      "Mulai belajar sesuai slot waktu yang dipilih",
    ],
    kontak_wa: "6285883576234",
    instagram: "https://instagram.com/grahaquran_wm",
  },
  {
    slug: "wisata-quran",
    nama: "Wisata Qur'an",
    nama_pendek: "Wisata Qur'an",
    ringkasan:
      "Short camp Al-Qur'an di kampus Megamendung untuk rombongan sekolah, instansi, dan komunitas — belajar tahsin dan tahfizh tanpa meninggalkan suasana liburan.",
    penyelenggaraan: "luring",
    durasi: "Beberapa hari, disesuaikan dengan kebutuhan rombongan",
    peserta: "Pelajar SD kelas 4–6, SMP, SMA, serta karyawan instansi pemerintah dan swasta",
    biaya: "Paket disusun sesuai jumlah peserta dan lama kegiatan",
    warna_aksen: "#b45309",
    gambar: {
      src: "/img/galeri-dauroh-fikih.jpg",
      alt: "Peserta dauroh menyimak kajian di masjid kampus Wadi Mubarak",
      width: 1200,
      height: 675,
    },
    untuk_siapa: [
      "Sekolah yang mencari kegiatan liburan berisi, bukan sekadar rekreasi",
      "Instansi dan perusahaan yang ingin mengadakan pembinaan Al-Qur'an bagi karyawannya",
      "Komunitas dan keluarga besar yang ingin berkegiatan bersama di kampus",
    ],
    sorotan: [
      {
        judul: "Komposisi 50–30–20",
        isi: "Setengah waktu untuk tahfizh, tiga persepuluh untuk ilmu keislaman, sisanya outbound dan penyegaran. Susunan ini yang menjaga peserta tetap betah sampai hari terakhir.",
        ikon: "filter",
      },
      {
        judul: "Disusun per rombongan",
        isi: "Lama kegiatan, target hafalan, dan jenis materi disepakati dengan pihak sekolah atau instansi sebelum keberangkatan.",
        ikon: "kerjasama",
      },
      {
        judul: "Di kampus yang sedang berjalan",
        isi: "Peserta menginap di kompleks kampus Megamendung dan melihat langsung keseharian santri tahfizh.",
        ikon: "sekolah",
      },
      {
        judul: "Pembinaan karakter berbasis Al-Qur'an",
        isi: "Materi adab dan kepemimpinan diambil dari ayat yang dihafal peserta selama kegiatan, bukan dari modul terpisah.",
        ikon: "perisai",
      },
    ],
    materi: [
      {
        judul: "Tahsin dan tajwid",
        isi: "Perbaikan bacaan sebagai pembuka, agar hafalan yang ditambahkan tidak menyimpan kesalahan.",
        ikon: "quran",
      },
      {
        judul: "Tahfizh",
        isi: "Target hafalan disepakati bersama pendamping rombongan sebelum kegiatan dimulai.",
        ikon: "bintang",
      },
      {
        judul: "Ilmu keislaman",
        isi: "Adab, akidah dasar, dan sirah disampaikan dalam sesi singkat dan interaktif.",
        ikon: "dokumen",
      },
      {
        judul: "Team building dan outbound",
        isi: "Kegiatan luar ruang di area kampus Megamendung sebagai jeda antar-sesi hafalan.",
        ikon: "kerjasama",
      },
    ],
    alur_daftar: [
      "Hubungi panitia dengan menyebut jumlah peserta dan rentang tanggal yang diinginkan",
      "Panitia mengirimkan susunan acara dan rincian paket",
      "Penyepakatan jadwal, materi, dan target hafalan",
      "Konfirmasi kepesertaan dan pembayaran",
      "Kedatangan rombongan di kampus Megamendung",
    ],
    kontak_wa: "6285883576234",
    instagram: null,
  },
];
