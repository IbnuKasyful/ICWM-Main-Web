import { PanelFaq, kelompokFaqBawaan } from "@/components/faq/PanelFaq";
import { PageHeader } from "@/components/site/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { getFaq } from "@/lib/content";
import { buatMetadata, jsonldFaq } from "@/lib/seo";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Pertanyaan yang sering diajukan",
  deskripsi:
    "Jawaban atas pertanyaan tentang pendaftaran, biaya, beasiswa, kehidupan santri, dan donasi di Islamic Center Wadi Mubarak.",
  path: "/faq",
});

export default function HalamanFaq() {
  const faq = getFaq();

  return (
    <>
      {/* PRD §13 — JSON-LD FAQPage. Halaman pangkal mewakili seluruh daftar;
          halaman kelompok hanya mendaftarkan pertanyaannya sendiri. */}
      {faq.length > 0 ? <JsonLd data={jsonldFaq(faq)} /> : null}

      <PageHeader
        jejak={[{ label: "Pertanyaan umum", href: "/faq" }]}
        atas="Bantuan"
        judul="Pertanyaan yang sering diajukan"
        keterangan="Dikumpulkan dari pertanyaan yang paling sering masuk ke panitia PPDB dan sekretariat yayasan. Bila jawaban yang Anda cari belum ada, hubungi kami langsung."
      />

      <PanelFaq aktif={kelompokFaqBawaan} />
    </>
  );
}
