import Image from "next/image";

import { PageHeader } from "@/components/site/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { getGaleri } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Galeri kegiatan",
  deskripsi:
    "Dokumentasi kegiatan santri, wisuda tahfizh, kelas masyarakat, dan suasana kampus Islamic Center Wadi Mubarak di Bogor dan Sleman.",
  path: "/galeri",
});

export default function HalamanGaleri() {
  const galeri = getGaleri();

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
          {galeri.length === 0 ? (
            <EmptyState
              ikon="gambar"
              judul="Belum ada dokumentasi yang tayang"
              keterangan="Dokumentasi kegiatan sedang dikurasi ulang untuk memastikan seluruhnya sesuai kebijakan perlindungan anak. Halaman ini akan diisi kembali secara bertahap."
              aksi={{ label: "Lihat agenda kegiatan", href: "/agenda" }}
            />
          ) : (
            /* Tata letak masonry lewat CSS columns: tanpa JavaScript dan tanpa
               pergeseran tata letak, karena setiap gambar punya rasio tetap. */
            <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
              {galeri.map((g, i) => (
                <figure
                  key={g.src}
                  className="break-inside-avoid overflow-hidden rounded-2xl bg-mist-100"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    priority={i < 4}
                    sizes="(min-width: 1024px) 290px, (min-width: 768px) 30vw, 45vw"
                    className="w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
