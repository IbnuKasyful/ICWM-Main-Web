import { Suspense } from "react";

import { PageHeader } from "@/components/site/PageHeader";
import { PencariProgram } from "@/components/program/PencariProgram";
import { getUnitsAktif } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — ISR 1 jam. */
export const revalidate = 3600;

export const metadata = buatMetadata({
  judul: "Cari unit pendidikan yang cocok",
  deskripsi:
    "Bandingkan sepuluh unit pendidikan Islamic Center Wadi Mubarak berdasarkan jenjang, gender, model belajar, dan lokasi kampus — lengkap dengan status PPDB dan kisaran biaya.",
  path: "/program",
});

export default function HalamanProgram() {
  // Seluruh data unit diambil saat build; penyaringan berjalan di klien.
  const units = getUnitsAktif();

  return (
    <>
      <PageHeader
        jejak={[{ label: "Pendidikan", href: "/program" }]}
        atas="Sepuluh unit pendidikan"
        judul="Cari unit yang cocok untuk anak Anda"
        keterangan="Saring berdasarkan jenjang, peserta didik, model belajar, dan lokasi kampus. Setiap kartu membawa Anda ke profil unit — bukan langsung ke pendaftaran, karena keputusan sebaiknya diambil setelah Anda punya cukup gambaran."
      />

      <section className="py-12 md:py-16">
        <div className="container-page">
          <Suspense
            fallback={
              <p className="py-20 text-center text-sm text-ink-subtle">Memuat daftar unit…</p>
            }
          >
            <PencariProgram units={units} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
