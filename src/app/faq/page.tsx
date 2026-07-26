import { PageHeader } from "@/components/site/PageHeader";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { getFaq } from "@/lib/content";
import { labelKelompokFaq } from "@/lib/format";
import { buatMetadata, jsonldFaq } from "@/lib/seo";
import type { Faq } from "@/lib/schemas";

/** PRD §8 — SSG. */
export const dynamic = "force-static";

export const metadata = buatMetadata({
  judul: "Pertanyaan yang sering diajukan",
  deskripsi:
    "Jawaban atas pertanyaan tentang pendaftaran, biaya, beasiswa, kehidupan santri, dan donasi di Islamic Center Wadi Mubarak.",
  path: "/faq",
});

const urutanKelompok: Faq["kelompok"][] = [
  "pendaftaran",
  "biaya",
  "kehidupan-santri",
  "donasi",
  "umum",
];

export default function HalamanFaq() {
  const faq = getFaq();
  const kelompok = urutanKelompok
    .map((k) => ({ kelompok: k, isi: faq.filter((f) => f.kelompok === k) }))
    .filter((k) => k.isi.length > 0);

  return (
    <>
      {/* PRD §13 — JSON-LD FAQPage. */}
      {faq.length > 0 ? <JsonLd data={jsonldFaq(faq)} /> : null}

      <PageHeader
        jejak={[{ label: "Pertanyaan umum", href: "/faq" }]}
        atas="Bantuan"
        judul="Pertanyaan yang sering diajukan"
        keterangan="Dikumpulkan dari pertanyaan yang paling sering masuk ke panitia PPDB dan sekretariat yayasan. Bila jawaban yang Anda cari belum ada, hubungi kami langsung."
      />

      <Section className="py-12 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          {/* Daftar isi */}
          <nav aria-label="Kelompok pertanyaan" className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
              Kelompok
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
              {kelompok.map((k) => (
                <li key={k.kelompok}>
                  <a
                    href={`#${k.kelompok}`}
                    className="inline-flex rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 lg:w-full lg:rounded-lg"
                  >
                    {labelKelompokFaq[k.kelompok]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {faq.length === 0 ? (
              <EmptyState
                ikon="info"
                judul="Daftar pertanyaan sedang disusun"
                keterangan="Kami sedang merapikan daftar pertanyaan agar jawabannya sesuai kebijakan tahun ajaran berjalan. Sementara itu, silakan hubungi panitia PPDB langsung."
                aksi={{ label: "Hubungi kami", href: "/kontak" }}
              />
            ) : (
              <div className="flex flex-col gap-12">
                {kelompok.map((k) => (
                  <section key={k.kelompok} id={k.kelompok} className="scroll-mt-28">
                    <h2 className="font-display text-display-sm text-ink">
                      {labelKelompokFaq[k.kelompok]}
                    </h2>
                    <Accordion className="mt-5">
                      {k.isi.map((f, i) => (
                        <AccordionItem
                          key={f.slug}
                          pertanyaan={f.pertanyaan}
                          terbukaAwal={k.kelompok === "pendaftaran" && i === 0}
                        >
                          {f.jawaban}
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-sand-50 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Icon nama="info" className="mt-0.5 size-5 shrink-0 text-brand-700" />
                <div>
                  <h2 className="font-display text-base font-semibold text-ink">
                    Pertanyaan Anda belum terjawab?
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Panitia PPDB dan sekretariat melayani pertanyaan pada jam kerja.
                  </p>
                </div>
              </div>
              <ButtonLink href="/kontak" className="shrink-0">
                Hubungi kami
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
