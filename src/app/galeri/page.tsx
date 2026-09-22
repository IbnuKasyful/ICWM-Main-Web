import { GridGaleri } from "@/components/galeri/GridGaleri";
import { KolaseGaleri } from "@/components/galeri/KolaseGaleri";
import { PageHeader } from "@/components/site/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { getGaleri } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";

/** PRD §8, ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Galeri kegiatan",
  deskripsi:
    "Dokumentasi kegiatan santri, wisuda tahfizh, kelas masyarakat, dan suasana kampus Islamic Center Wadi Mubarak di Bogor dan Sleman.",
  path: "/galeri",
});

export default function HalamanGaleri() {
  const galeri = getGaleri();

  /* Kepala halaman ini dibangun dari fotonya sendiri, jadi saat galeri kosong
     tidak ada yang bisa disusun, halaman kembali memakai kepala halaman baku. */
  if (galeri.length === 0) {
    return (
      <>
        <PageHeader
          jejak={[{ label: "Galeri", href: "/galeri" }]}
          atas="Galeri"
          judul="Suasana kampus dan kegiatan santri"
          keterangan="Dokumentasi dipilih dengan memperhatikan perlindungan anak: kami tidak menampilkan wajah santri secara menonjol tanpa izin tertulis wali santri."
        />
        <Section className="py-12 md:py-16">
          <div className="container-page">
            <EmptyState
              ikon="gambar"
              judul="Belum ada dokumentasi yang tayang"
              keterangan="Dokumentasi kegiatan sedang dikurasi ulang untuk memastikan seluruhnya sesuai kebijakan perlindungan anak. Halaman ini akan diisi kembali secara bertahap."
              aksi={{ label: "Lihat agenda kegiatan", href: "/agenda" }}
            />
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <KolaseGaleri galeri={galeri} />
      <GridGaleri galeri={galeri} />
    </>
  );
}
