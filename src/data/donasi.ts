/** Data contoh CPT `program_donasi` + rekening resmi LAZIS (PRD §9.4). */

export const rekeningMentah: unknown[] = [
  {
    jenis: "zakat",
    bank: "Bank Syariah Indonesia",
    nomor: "7001 2345 678",
    atas_nama: "LAZIS Wadi Mubarak — Zakat",
  },
  {
    jenis: "infak",
    bank: "Bank Syariah Indonesia",
    nomor: "7001 2345 679",
    atas_nama: "LAZIS Wadi Mubarak — Infak",
  },
  {
    jenis: "sedekah",
    bank: "Bank Muamalat",
    nomor: "3210 0098 765",
    atas_nama: "LAZIS Wadi Mubarak — Sedekah",
  },
  {
    jenis: "wakaf",
    bank: "Bank Syariah Indonesia",
    nomor: "7001 2345 680",
    atas_nama: "LAZIS Wadi Mubarak — Wakaf",
  },
];

type DonasiInput = {
  slug: string;
  judul: string;
  ringkasan: string;
  jenis: string;
  gambar: number;
  target: number;
  terkumpul: number;
  penerima_manfaat: string;
  batas_waktu: string | null;
  mendesak: boolean;
  konten: string[];
};

const daftar: DonasiInput[] = [
  {
    slug: "beasiswa-santri-yatim",
    judul: "Beasiswa Santri Yatim dan Dhuafa",
    ringkasan:
      "Menanggung biaya pendidikan, asrama, dan kebutuhan harian 180 santri yatim serta dhuafa selama satu tahun ajaran.",
    jenis: "zakat",
    gambar: 1,
    target: 1_800_000_000,
    terkumpul: 1_142_500_000,
    penerima_manfaat: "180 santri di seluruh unit",
    batas_waktu: "2026-09-30",
    mendesak: true,
    konten: [
      "Setiap tahun yayasan menerima lebih banyak permohonan beasiswa daripada yang mampu kami tanggung. Program ini menutup biaya pendidikan penuh bagi santri yatim dan dhuafa yang telah lolos seleksi akademik namun terkendala biaya.",
      "Satu paket beasiswa senilai Rp 10 juta per santri per tahun mencakup biaya pendidikan, asrama, makan tiga kali sehari, seragam, dan perlengkapan belajar.",
      "Penerima ditetapkan melalui verifikasi berkas dan kunjungan rumah oleh tim amil. Perkembangan akademik penerima dilaporkan kepada donatur setiap semester.",
    ],
  },
  {
    slug: "wakaf-pembangunan-asrama-putri",
    judul: "Wakaf Pembangunan Asrama Putri Tahap Dua",
    ringkasan:
      "Menambah 60 tempat tidur, memperbaiki sanitasi, dan membangun ruang tahfizh baru di kompleks asrama putri.",
    jenis: "wakaf",
    gambar: 2,
    target: 3_500_000_000,
    terkumpul: 2_070_000_000,
    penerima_manfaat: "240 santriwati",
    batas_waktu: "2026-12-31",
    mendesak: false,
    konten: [
      "Asrama putri saat ini menampung 240 santriwati dengan kapasitas terpasang 200 tempat tidur. Tahap dua pembangunan menambah 60 tempat tidur agar setiap santriwati memiliki ruang yang layak.",
      "Pekerjaan mencakup perbaikan sanitasi, penambahan kamar mandi, dan pembangunan ruang tahfizh yang selama ini menumpang di ruang makan.",
      "Wakaf pembangunan bersifat jariyah: manfaatnya mengalir selama bangunan digunakan. Laporan perkembangan fisik diterbitkan setiap bulan.",
    ],
  },
  {
    slug: "operasional-kelas-tahsin-masyarakat",
    judul: "Operasional Kelas Tahsin untuk Masyarakat",
    ringkasan:
      "Membiayai honor pengampu, mushaf, dan modul kelas tahsin gratis bagi 120 peserta umum setiap angkatan.",
    jenis: "infak",
    gambar: 3,
    target: 240_000_000,
    terkumpul: 188_400_000,
    penerima_manfaat: "120 peserta per angkatan",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "Kelas tahsin PKM Wadi Mubarak terbuka gratis untuk umum, dari usia remaja hingga lansia. Biayanya ditanggung penuh oleh dana infak.",
      "Satu angkatan berjalan selama enam bulan dengan 120 peserta yang dibagi ke dalam kelompok kecil sesuai kemampuan baca.",
      "Infak yang terkumpul digunakan untuk honor pengampu, pengadaan mushaf dan modul, serta biaya operasional kelas daring bagi peserta luar kota.",
    ],
  },
  {
    slug: "dapur-santri",
    judul: "Dapur Santri: Gizi Harian Penghafal Al-Qur'an",
    ringkasan:
      "Menjaga mutu tiga kali makan harian bagi 1.400 santri asrama dengan menu yang dipantau ahli gizi.",
    jenis: "sedekah",
    gambar: 4,
    target: 900_000_000,
    terkumpul: 402_750_000,
    penerima_manfaat: "1.400 santri asrama",
    batas_waktu: "2026-12-31",
    mendesak: false,
    konten: [
      "Santri penghafal Al-Qur'an membutuhkan asupan yang cukup untuk menopang jadwal belajar yang padat sejak sebelum subuh hingga malam.",
      "Program ini menjaga agar kenaikan harga bahan pangan tidak menurunkan mutu menu harian santri, terutama bagi santri penerima beasiswa.",
      "Menu disusun dan dievaluasi bersama ahli gizi setiap bulan, dan rincian belanja dapur dapat diminta donatur kepada tim amil.",
    ],
  },
  {
    slug: "wakaf-mushaf-dan-kitab",
    judul: "Wakaf Mushaf dan Kitab Perpustakaan",
    ringkasan:
      "Melengkapi mushaf santri baru dan menambah koleksi kitab berbahasa Arab di perpustakaan induk.",
    jenis: "wakaf",
    gambar: 5,
    target: 150_000_000,
    terkumpul: 150_000_000,
    penerima_manfaat: "Seluruh santri dan mahasiswa",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "Setiap santri baru menerima satu mushaf standar yang digunakan selama menempuh pendidikan, agar tanda dan catatan hafalan tetap konsisten.",
      "Program ini juga menambah koleksi kitab rujukan berbahasa Arab di perpustakaan induk untuk kebutuhan santri jenjang atas dan mahasiswa STIU.",
      "Target program ini telah terpenuhi. Kelebihan dana dialihkan ke gelombang pengadaan berikutnya dengan persetujuan donatur.",
    ],
  },
];

export const programDonasiMentah: unknown[] = daftar.map((d) => ({
  slug: d.slug,
  judul: d.judul,
  ringkasan: d.ringkasan,
  jenis: d.jenis,
  gambar: {
    src: `/img/donasi-${d.gambar}.svg`,
    alt: d.judul,
    width: 1200,
    height: 800,
  },
  target: d.target,
  terkumpul: d.terkumpul,
  penerima_manfaat: d.penerima_manfaat,
  batas_waktu: d.batas_waktu,
  konten: d.konten.map((p) => `<p>${p}</p>`).join("\n"),
  mendesak: d.mendesak,
}));
