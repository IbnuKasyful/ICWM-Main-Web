import { HalamanKebijakan, type BagianKebijakan } from "@/components/site/HalamanKebijakan";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Kebijakan privasi",
  deskripsi:
    "Bagaimana Islamic Center Wadi Mubarak mengumpulkan, menggunakan, dan melindungi data pribadi pengunjung situs.",
  path: "/kebijakan-privasi",
});

const bagian: BagianKebijakan[] = [
  {
    judul: "Data yang kami kumpulkan",
    isi: [
      `Kami mengumpulkan data yang Anda kirimkan sendiri melalui formulir kontak: nama, alamat surel, nomor telepon bila diisi, jenis keperluan, dan isi pesan.`,
      "Selain itu, kami mengumpulkan data penggunaan situs yang bersifat agregat melalui layanan analitik: halaman yang dikunjungi, sumber rujukan, jenis perangkat, dan perkiraan lokasi tingkat kota. Data ini tidak kami gunakan untuk mengidentifikasi individu.",
      "Kami tidak mengumpulkan data kategori khusus seperti keyakinan, kondisi kesehatan, atau data keuangan melalui situs ini.",
    ],
  },
  {
    judul: "Tujuan penggunaan data",
    isi: [
      "Data formulir digunakan semata-mata untuk menanggapi pertanyaan Anda dan meneruskannya ke bagian yang berwenang di lingkungan yayasan.",
      "Data agregat digunakan untuk memperbaiki susunan halaman dan memastikan informasi yang paling dicari mudah ditemukan.",
      "Kami tidak menjual, menyewakan, atau menukarkan data pribadi Anda kepada pihak mana pun.",
    ],
  },
  {
    judul: "Dasar dan jangka waktu penyimpanan",
    isi: [
      "Data formulir kontak disimpan selama maksimal 24 bulan sejak pesan terakhir, kecuali korespondensi tersebut berkembang menjadi hubungan resmi seperti pendaftaran santri atau kerja sama kelembagaan.",
      "Data analitik agregat disimpan sesuai kebijakan penyimpanan bawaan penyedia layanan analitik, paling lama 14 bulan.",
    ],
  },
  {
    judul: "Pembagian data kepada pihak ketiga",
    isi: [
      "Kami menggunakan penyedia layanan pengiriman surel dan analitik untuk menjalankan situs ini. Penyedia tersebut hanya memproses data sesuai instruksi kami.",
      "Kami dapat mengungkapkan data bila diwajibkan oleh peraturan perundang-undangan atau permintaan resmi aparat penegak hukum.",
    ],
  },
  {
    judul: "Kuki dan pelacakan",
    isi: [
      "Situs ini tidak memasang kuki pemasaran maupun kuki pelacakan lintas situs untuk keperluan iklan.",
      "Kuki analitik hanya diaktifkan untuk mengukur penggunaan halaman secara agregat, dan dapat Anda tolak melalui pengaturan peramban.",
    ],
  },
  {
    judul: "Hak Anda atas data",
    isi: [
      "Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi yang kami simpan tentang Anda.",
      `Permintaan dapat disampaikan ke ${site.kontak.email}. Kami menanggapi paling lambat 14 hari kerja sejak permintaan diterima dan diverifikasi.`,
    ],
  },
  {
    judul: "Perubahan kebijakan",
    isi: [
      "Kebijakan ini dapat kami perbarui bila terjadi perubahan layanan atau ketentuan hukum. Tanggal pembaruan terakhir selalu tercantum di bagian atas halaman ini.",
      "Perubahan yang berdampak besar akan kami umumkan melalui halaman informasi.",
    ],
  },
];

export default function HalamanKebijakanPrivasi() {
  return (
    <HalamanKebijakan
      judul="Kebijakan privasi"
      slug="kebijakan-privasi"
      keterangan="Kami mengumpulkan data seminimal mungkin, hanya untuk menanggapi pesan Anda dan memperbaiki situs ini."
      diperbarui="2026-07-01"
      bagian={bagian}
    />
  );
}
