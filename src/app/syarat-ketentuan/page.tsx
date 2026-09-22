import { HalamanKebijakan, type BagianKebijakan } from "@/components/site/HalamanKebijakan";
import { buatMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8, SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Syarat & ketentuan",
  deskripsi:
    "Ketentuan penggunaan situs wadimubarak.com, termasuk hak kekayaan intelektual, keakuratan informasi, dan batasan tanggung jawab.",
  path: "/syarat-ketentuan",
});

const bagian: BagianKebijakan[] = [
  {
    judul: "Penerimaan ketentuan",
    isi: [
      `Dengan mengakses dan menggunakan situs ${site.url}, Anda dianggap membaca, memahami, dan menyetujui ketentuan pada halaman ini.`,
      "Bila Anda tidak menyetujui salah satu ketentuan, mohon hentikan penggunaan situs ini.",
    ],
  },
  {
    judul: "Keakuratan informasi",
    isi: [
      "Kami berupaya menjaga agar seluruh informasi di situs ini mutakhir dan akurat, khususnya yang menyangkut jadwal pendaftaran, biaya pendidikan, dan status program donasi.",
      "Informasi mengenai biaya dan jadwal pada halaman profil unit bersifat indikatif. Ketentuan yang mengikat adalah yang disampaikan secara resmi oleh panitia penerimaan santri baru unit terkait.",
      "Bila Anda menemukan informasi yang keliru atau kedaluwarsa, kami menghargai laporan Anda melalui halaman kontak.",
    ],
  },
  {
    judul: "Hak kekayaan intelektual",
    isi: [
      `Seluruh teks, logo, lambang, foto, dan tata letak pada situs ini adalah milik ${site.nama}, kecuali disebutkan lain.`,
      "Penggunaan ulang untuk keperluan pendidikan dan pemberitaan diperbolehkan dengan mencantumkan sumber. Penggunaan untuk kepentingan komersial memerlukan izin tertulis lebih dulu.",
      "Foto santri tidak boleh digunakan ulang oleh pihak mana pun tanpa izin tertulis dari yayasan dan wali santri yang bersangkutan.",
    ],
  },
  {
    judul: "Donasi",
    isi: [
      "Situs ini tidak memproses pembayaran daring. Seluruh donasi dilakukan melalui transfer ke rekening atas nama lembaga yang tercantum pada halaman donasi.",
      "Kami tidak pernah meminta transfer ke rekening atas nama perorangan. Bila Anda menerima permintaan semacam itu mengatasnamakan kami, mohon segera laporkan.",
      "Donasi yang telah disalurkan sesuai peruntukannya tidak dapat ditarik kembali. Bila terjadi kelebihan dana pada suatu program, dana dialihkan ke program sejenis dengan pemberitahuan kepada donatur.",
    ],
  },
  {
    judul: "Tautan ke situs lain",
    isi: [
      "Situs ini memuat tautan ke subdomain unit dan situs lembaga mitra. Kami tidak bertanggung jawab atas isi maupun kebijakan privasi situs pihak ketiga.",
      "Adanya tautan tidak berarti kami mendukung seluruh isi situs yang ditautkan.",
    ],
  },
  {
    judul: "Batasan tanggung jawab",
    isi: [
      "Situs ini disediakan apa adanya. Kami tidak menjamin situs bebas dari gangguan teknis atau selalu dapat diakses tanpa henti.",
      "Kami tidak bertanggung jawab atas kerugian yang timbul dari keputusan yang diambil semata-mata berdasarkan informasi di situs ini tanpa konfirmasi kepada narahubung resmi.",
    ],
  },
  {
    judul: "Hukum yang berlaku",
    isi: [
      "Ketentuan ini tunduk pada hukum Republik Indonesia.",
      "Perselisihan yang timbul akan diselesaikan secara musyawarah lebih dulu sebelum ditempuh jalur hukum.",
    ],
  },
];

export default function HalamanSyaratKetentuan() {
  return (
    <HalamanKebijakan
      judul="Syarat & ketentuan"
      slug="syarat-ketentuan"
      keterangan="Ketentuan penggunaan situs ini, termasuk hal-hal yang mengikat dan yang bersifat indikatif."
      diperbarui="2026-07-01"
      bagian={bagian}
    />
  );
}
