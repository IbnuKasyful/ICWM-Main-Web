import { notFound } from "next/navigation";

import { PanelFaq, daftarKelompokFaq, tautanKelompokFaq } from "@/components/faq/PanelFaq";
import { PageHeader } from "@/components/site/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { labelKelompokFaq } from "@/lib/format";
import { buatMetadata, jsonldFaq } from "@/lib/seo";

/** PRD §8 — SSG. Hanya kelompok yang terdaftar di bawah yang punya halaman. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return daftarKelompokFaq().map((k) => ({ kelompok: k.kelompok }));
}

function cariKelompok(kelompok: string) {
  return daftarKelompokFaq().find((k) => k.kelompok === kelompok);
}

export async function generateMetadata({ params }: { params: Promise<{ kelompok: string }> }) {
  const { kelompok } = await params;
  const isi = cariKelompok(kelompok);
  if (!isi) {
    return buatMetadata({
      judul: "Kelompok pertanyaan tidak ditemukan",
      deskripsi: "",
      path: "/faq",
      noIndex: true,
    });
  }

  const label = labelKelompokFaq[isi.kelompok];
  return buatMetadata({
    judul: `Pertanyaan seputar ${label.toLowerCase()}`,
    deskripsi: `${isi.isi.length} jawaban seputar ${label.toLowerCase()} di Islamic Center Wadi Mubarak.`,
    // Kelompok bawaan disajikan di `/faq`; halaman ini menunjuk ke sana supaya
    // isi yang sama tidak diindeks dua kali.
    path: tautanKelompokFaq(isi.kelompok),
  });
}

export default async function HalamanKelompokFaq({
  params,
}: {
  params: Promise<{ kelompok: string }>;
}) {
  const { kelompok } = await params;
  const isi = cariKelompok(kelompok);
  if (!isi) notFound();

  const label = labelKelompokFaq[isi.kelompok];

  return (
    <>
      <JsonLd data={jsonldFaq(isi.isi)} />

      <PageHeader
        jejak={[
          { label: "Pertanyaan umum", href: "/faq" },
          { label, href: tautanKelompokFaq(isi.kelompok) },
        ]}
        atas="Bantuan"
        judul={`Pertanyaan seputar ${label.toLowerCase()}`}
        keterangan="Dikumpulkan dari pertanyaan yang paling sering masuk ke panitia PPDB dan sekretariat yayasan. Bila jawaban yang Anda cari belum ada, hubungi kami langsung."
      />

      <PanelFaq aktif={isi.kelompok} />
    </>
  );
}
