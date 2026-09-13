/**
 * Program LAZIS SaQu Wadi Mubarak + rekeningnya (PRD §9.4).
 *
 * Isi berkas ini diambil dari materi kampanye LAZIS SaQu: poster payung Jum'at
 * Berkah (memuat keenam program berkelanjutan), poster Orang Tua Asuh, Beras,
 * Buka Puasa, dan Bantu Korban Gempa NTT, ditambah dokumentasi Hewan Qurban,
 * Pembangunan Sarana Pendidikan, serta Buka Puasa Arafah.
 *
 * Catatan penting soal angka: LAZIS tidak menerbitkan target maupun jumlah dana
 * yang sudah terkumpul per program — yang diumumkan adalah harga satuannya
 * (mis. Rp 13.000 per kilogram beras). Karena itu seluruh program di sini
 * memakai `target: 0` dan `terkumpul: 0` sehingga tampil sebagai program
 * berkelanjutan, dengan `satuan_biaya` menggantikan bilah progres. Jangan
 * mengarang target hanya supaya bilahnya muncul.
 */

export const rekeningMentah: unknown[] = [
  {
    bank: "Bank Syariah Indonesia (BSI)",
    nomor: "999-514-2150",
    atas_nama: "LAZIS SaQu Wadi Mubarak",
    keterangan: "Rekening LAZIS untuk zakat, infak, sedekah, dan wakaf.",
  },
  {
    bank: "Bank Mandiri",
    nomor: "133-003-3333-451",
    atas_nama: "Islamic Center Wadi Mubarak",
    keterangan: "Rekening yayasan untuk donasi umum dan dukungan operasional.",
  },
];

type DonasiInput = {
  slug: string;
  judul: string;
  ringkasan: string;
  jenis: string;
  gambar: { src: string; width: number; height: number };
  /** Harga satuan yang diumumkan LAZIS; menggantikan bilah progres. */
  satuan_biaya: string;
  penerima_manfaat: string;
  batas_waktu: string | null;
  mendesak: boolean;
  konten: string[];
};

/** Poster kampanye LAZIS SaQu — potret 4:5, teksnya di bagian atas. */
function poster(nama: string) {
  return { src: `/img/donasi-${nama}.jpg`, width: 1080, height: 1350 };
}

/** Foto dokumentasi program yang belum punya poster kampanye sendiri. */
function foto(nama: string, width: number, height: number) {
  return { src: `/img/donasi-${nama}.jpg`, width, height };
}

const daftar: DonasiInput[] = [
  {
    slug: "buka-puasa-arafah",
    judul: "Buka Puasa Arafah Bersama Penghafal Al-Qur'an",
    ringkasan:
      "Penghimpunan khusus menjelang 9 Dzulhijjah: menyiapkan hidangan berbuka bagi santri penghafal Al-Qur'an yang menjalankan puasa Arafah.",
    jenis: "sedekah",
    gambar: foto("puasa-arafah", 1280, 720),
    satuan_biaya: "Nominal bebas",
    penerima_manfaat: "Santri penghafal Al-Qur'an yang berpuasa Arafah",
    batas_waktu: null,
    mendesak: true,
    konten: [
      "Puasa Arafah hanya datang sekali dalam setahun. Petang itu ratusan santri penghafal Al-Qur'an di kampus Megamendung berbuka bersama, dan hidangannya disiapkan dari sedekah para donatur.",
      "Penghimpunan ini dibuka khusus menjelang 9 Dzulhijjah untuk menutup biaya hidangan berbuka mereka. Nominalnya bebas, dan seluruhnya disalurkan sebagai menu berbuka pada hari Arafah.",
      "Rasulullah bersabda: &quot;Barang siapa memberi makan orang yang berpuasa maka baginya pahala seperti orang yang berpuasa tersebut tanpa mengurangi pahala orang yang berpuasa sedikit pun.&quot; (HR. Tirmidzi)",
      "Pada 1447 H, buka puasa Arafah bersama para penghafal Al-Qur'an berlangsung di Islamic Center Wadi Mubarak, Bogor, tanggal 27 Mei 2026. Tanggal pelaksanaan tahun berikutnya diumumkan tim amil menjelang Dzulhijjah.",
    ],
  },
  {
    slug: "orang-tua-asuh",
    judul: "Orang Tua Asuh Santri Penghafal Al-Qur'an",
    ringkasan:
      "Menopang kebutuhan harian santri penghafal Al-Qur'an lewat donasi bulanan, mulai dari Rp 20.000.",
    jenis: "sedekah",
    gambar: poster("orang-tua-asuh"),
    satuan_biaya: "Mulai Rp 20.000 / bulan",
    penerima_manfaat: "Santri penghafal Al-Qur'an",
    batas_waktu: null,
    mendesak: true,
    konten: [
      "Dengan Rp 20.000 sebulan, Anda bukan sekadar berdonasi — Anda ikut menyiapkan lahirnya para penghafal Qur'an dan calon ulama masa depan.",
      "Tersedia lima paket donasi bulanan: Rp 20.000, Rp 50.000, Rp 100.000, Rp 500.000, dan Rp 1.000.000. Pilih yang paling ringan dan paling bisa Anda jaga keberlanjutannya.",
      "Katakanlah: &quot;Sesungguhnya Tuhanku melapangkan rezeki bagi siapa yang dikehendaki-Nya di antara hamba-hamba-Nya dan menyempitkan bagi (siapa yang dikehendaki-Nya)&quot;. Dan barang apa saja yang kamu nafkahkan, maka Allah akan menggantinya dan Dialah Pemberi rezeki yang sebaik-baiknya. (QS. Saba' ayat 39)",
    ],
  },
  {
    slug: "beras-santri",
    judul: "Beras untuk Santri Penghafal Al-Qur'an",
    ringkasan:
      "Satu kilogram beras seharga Rp 13.000 ikut menghidupi makan sehari-hari para santri penghafal Al-Qur'an.",
    jenis: "sedekah",
    gambar: poster("beras"),
    satuan_biaya: "Rp 13.000 / kg — kebutuhan 3.300 kg per bulan",
    penerima_manfaat: "Santri penghafal Al-Qur'an",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "Cukup dengan Rp 13.000 — harga satu kilogram beras — Anda sudah menjadi bagian dari Keluarga Al-Qur'an. Karena dari 1 kg beras, lahir doa-doa dari para santri penghafal Al-Qur'an yang mengalir tanpa putus.",
      "Kebutuhan dapur santri mencapai 3.300 kilogram beras setiap bulan. Setiap suapan mereka, setiap ayat yang dihafal, menjadi pahala jariyah yang terus mengalir untuk Anda.",
      "Rp 13.000 = 1 kg beras. Rp 13.000 = doa para penghafal Al-Qur'an. Rp 13.000 = pahala yang terus mengalir.",
    ],
  },
  {
    slug: "gempa-ntt",
    judul: "Bantu Korban Gempa NTT",
    ringkasan:
      "Donasi bencana alam lewat LAZIS SaQu Wadi Mubarak untuk hunian darurat dan layanan kesehatan penyintas gempa di Nusa Tenggara Timur.",
    jenis: "sedekah",
    gambar: poster("gempa-ntt"),
    satuan_biaya: "Nominal bebas",
    penerima_manfaat: "Penyintas gempa di Nusa Tenggara Timur",
    batas_waktu: null,
    mendesak: true,
    konten: [
      "Nabi shallallahu 'alaihi wasallam bersabda: &quot;Barangsiapa yang meringankan (menghilangkan) kesulitan seorang muslim dari kesulitan-kesulitan duniawi, maka Allah akan meringankan (menghilangkan) baginya kesulitan di akhirat kelak…&quot; (HR. Tirmidzi No. 1853)",
      "Dana yang terkumpul diarahkan pada dua kebutuhan yang paling mendesak setelah guncangan: tempat berteduh sementara bagi keluarga yang rumahnya rusak, dan layanan kesehatan bagi korban luka.",
      "Penyaluran dikerjakan tim amil LAZIS SaQu Wadi Mubarak. Perkembangan penyalurannya dapat ditanyakan lewat WhatsApp LAZIS.",
    ],
  },
  {
    slug: "buka-puasa-penghafal-quran",
    judul: "Buka Puasa Penghafal Al-Qur'an",
    ringkasan:
      "Menyediakan hidangan berbuka bagi santri penghafal Al-Qur'an yang menjalankan puasa sunnah dan puasa Ramadan.",
    jenis: "sedekah",
    gambar: poster("buka-puasa"),
    satuan_biaya: "Nominal bebas",
    penerima_manfaat: "Santri penghafal Al-Qur'an yang berpuasa",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "Mari menjadi bagian dari keberkahan buka puasa para penghafal Al-Qur'an.",
      "Rasulullah bersabda: &quot;Barang siapa memberi makan orang yang berpuasa maka baginya pahala seperti orang yang berpuasa tersebut tanpa mengurangi pahala orang yang berpuasa sedikit pun.&quot; (HR. Tirmidzi)",
      "Program ini berjalan sepanjang tahun, mengikuti puasa sunnah harian santri, dan menguat pada bulan Ramadan. Khusus puasa Arafah, penghimpunannya dibuka tersendiri menjelang Dzulhijjah.",
    ],
  },
  {
    slug: "hewan-qurban",
    judul: "Hewan Qurban",
    ringkasan:
      "Penyaluran hewan qurban melalui LAZIS SaQu Wadi Mubarak untuk santri dan masyarakat sekitar kampus.",
    jenis: "sedekah",
    gambar: foto("hewan-qurban", 1200, 675),
    satuan_biaya: "Sesuai harga hewan yang berlaku",
    penerima_manfaat: "Santri dan masyarakat sekitar kampus",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "LAZIS SaQu Wadi Mubarak menerima titipan hewan qurban dan menyalurkannya untuk santri serta masyarakat di sekitar kampus.",
      "Jenis hewan, harga yang berlaku, dan jadwal penyembelihan disampaikan tim amil menjelang Iduladha setiap tahun.",
      "Hubungi tim amil lewat WhatsApp LAZIS untuk memesan dan mengonfirmasi titipan qurban Anda.",
    ],
  },
  {
    slug: "pembangunan",
    judul: "Pembangunan Sarana Pendidikan",
    ringkasan:
      "Wakaf pembangunan dan pelengkapan sarana belajar serta asrama di lingkungan Islamic Center Wadi Mubarak.",
    jenis: "wakaf",
    gambar: foto("pembangunan", 1280, 960),
    satuan_biaya: "Nominal bebas",
    penerima_manfaat: "Santri seluruh unit",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "Wakaf pembangunan bersifat jariyah: manfaatnya mengalir selama bangunannya digunakan untuk belajar dan menghafal Al-Qur'an.",
      "Dana dialokasikan untuk pembangunan serta pelengkapan sarana belajar dan asrama di lingkungan Islamic Center Wadi Mubarak.",
      "Rincian pekerjaan yang sedang berjalan dapat ditanyakan kepada tim amil lewat WhatsApp LAZIS.",
    ],
  },
  {
    slug: "konsultasi-zakat",
    judul: "Konsultasi dan Penyaluran Zakat",
    ringkasan:
      "Pendampingan penghitungan zakat maal, penghasilan, dan fitrah, lalu penyalurannya lewat LAZIS SaQu Wadi Mubarak.",
    jenis: "zakat",
    gambar: { src: "/img/donasi-5.svg", width: 1200, height: 800 },
    satuan_biaya: "Sesuai perhitungan zakat Anda",
    penerima_manfaat: "Delapan asnaf penerima zakat",
    batas_waktu: null,
    mendesak: false,
    konten: [
      "Belum yakin berapa zakat yang wajib Anda tunaikan? Tim amil LAZIS SaQu Wadi Mubarak membantu menghitung zakat maal, zakat penghasilan, dan zakat fitrah.",
      "Setelah nominalnya jelas, penyaluran dilakukan lewat rekening lembaga dan dicatat atas nama Anda.",
      "Konsultasi dilayani lewat WhatsApp LAZIS pada jam kerja tim amil.",
    ],
  },
];

export const programDonasiMentah: unknown[] = daftar.map((d) => ({
  slug: d.slug,
  judul: d.judul,
  ringkasan: d.ringkasan,
  jenis: d.jenis,
  gambar: {
    src: d.gambar.src,
    alt: d.judul,
    width: d.gambar.width,
    height: d.gambar.height,
  },
  target: 0,
  terkumpul: 0,
  satuan_biaya: d.satuan_biaya,
  penerima_manfaat: d.penerima_manfaat,
  batas_waktu: d.batas_waktu,
  konten: d.konten.map((p) => `<p>${p}</p>`).join("\n"),
  mendesak: d.mendesak,
}));
