import { HalamanKebijakan, type BagianKebijakan } from "@/components/site/HalamanKebijakan";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8, SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Kebijakan perlindungan anak",
  deskripsi:
    "Komitmen dan prosedur perlindungan anak di lingkungan Islamic Center Wadi Mubarak, termasuk kanal pelaporan yang aman.",
  path: "/perlindungan-anak",
});

const bagian: BagianKebijakan[] = [
  {
    judul: "Komitmen kami",
    isi: [
      "Setiap santri berhak merasa aman selama berada di lingkungan yayasan. Komitmen ini berlaku sama di seluruh unit, baik yang berasrama maupun tidak.",
      "Kami tidak menoleransi kekerasan fisik, kekerasan verbal, perundungan antar-santri, maupun bentuk pelecehan apa pun, termasuk yang dilakukan atas nama pendisiplinan.",
    ],
  },
  {
    judul: "Perekrutan dan pembekalan pegawai",
    isi: [
      "Seluruh calon pengajar, musyrif, dan tenaga kependidikan menjalani pemeriksaan latar belakang sebelum mulai bertugas.",
      "Setiap pegawai menandatangani pakta perlindungan anak dan mengikuti pembekalan tentang batas interaksi yang pantas dengan santri.",
      "Pembekalan diulang setiap tahun ajaran, bukan sekali saat penerimaan.",
    ],
  },
  {
    judul: "Batas interaksi dan pengawasan",
    isi: [
      "Pertemuan empat mata antara pegawai dan santri dilakukan di ruang yang terlihat dari luar, tidak dalam ruangan tertutup.",
      "Komunikasi pribadi antara pegawai dan santri melalui kanal pribadi tidak diperkenankan; komunikasi berlangsung lewat kanal resmi unit.",
      "Asrama putra dan putri berada di zona terpisah dengan pendamping yang berjenis kelamin sama.",
    ],
  },
  {
    judul: "Penggunaan foto dan identitas santri",
    isi: [
      "Kami tidak memublikasikan nama lengkap santri bersamaan dengan foto wajah tanpa izin tertulis wali santri.",
      "Dokumentasi kegiatan yang tayang di situs dan media sosial dipilih untuk menghindari penonjolan wajah santri tanpa izin.",
      "Wali santri dapat meminta penarikan foto anaknya kapan saja tanpa perlu menjelaskan alasan, dan permintaan itu kami tindak lanjuti dalam 3 hari kerja.",
    ],
  },
  {
    judul: "Cara melapor",
    isi: [
      `Laporan dugaan pelanggaran dapat disampaikan langsung ke bagian kesantrian, atau lewat surel ${site.kontak.email} dengan subjek "Perlindungan Anak".`,
      "Laporan dapat disampaikan tanpa mencantumkan identitas pelapor. Identitas pelapor yang mencantumkan namanya kami rahasiakan.",
      "Bila laporan menyangkut pengurus atau pelaksana harian, laporan dapat langsung ditujukan kepada Dewan Pengawas melalui sekretariat yayasan.",
    ],
  },
  {
    judul: "Penanganan laporan",
    isi: [
      "Setiap laporan ditanggapi paling lambat 2 hari kerja dan ditelaah oleh tim yang tidak memiliki benturan kepentingan dengan pihak terlapor.",
      "Selama pemeriksaan berlangsung, pihak terlapor dinonaktifkan sementara dari tugas yang bersentuhan langsung dengan santri.",
      "Bila dugaan mengarah pada tindak pidana, kami meneruskannya kepada aparat berwenang dan mendampingi keluarga santri selama proses berlangsung.",
    ],
  },
];

export default function HalamanPerlindunganAnak() {
  return (
    <HalamanKebijakan
      judul="Kebijakan perlindungan anak"
      slug="perlindungan-anak"
      keterangan="Kebijakan ini kami publikasikan agar wali santri tahu persis apa yang boleh dituntut dari kami, dan ke mana harus melapor bila terjadi sesuatu."
      diperbarui="2026-07-01"
      bagian={bagian}
    />
  );
}
