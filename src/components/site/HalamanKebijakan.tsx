import { PageHeader } from "@/components/site/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { tanggal } from "@/lib/format";

export type BagianKebijakan = { judul: string; isi: string[] };

/** Kerangka bersama untuk halaman kepatuhan (PRD §8). */
export function HalamanKebijakan({
  judul,
  keterangan,
  slug,
  diperbarui,
  bagian,
}: {
  judul: string;
  keterangan: string;
  slug: string;
  /** ISO 8601. */
  diperbarui: string;
  bagian: BagianKebijakan[];
}) {
  return (
    <>
      <PageHeader
        jejak={[{ label: judul, href: `/${slug}` }]}
        atas="Kepatuhan"
        judul={judul}
        keterangan={keterangan}
      />

      <Section className="py-12 md:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <p className="rounded-xl border border-line bg-sand-50 px-4 py-3 text-sm text-ink-muted">
              Terakhir diperbarui {tanggal(diperbarui)}.
            </p>

            {/* Daftar isi */}
            <nav aria-label="Daftar isi" className="mt-8">
              <h2 className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
                Daftar isi
              </h2>
              <ol className="mt-3 flex flex-col gap-1.5">
                {bagian.map((b, i) => (
                  <li key={b.judul}>
                    <a
                      href={`#bagian-${i + 1}`}
                      className="text-sm text-brand-700 underline-offset-4 hover:underline"
                    >
                      {i + 1}. {b.judul}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 flex flex-col gap-10">
              {bagian.map((b, i) => (
                <section key={b.judul} id={`bagian-${i + 1}`} className="scroll-mt-28">
                  <h2 className="font-display text-display-sm text-ink">
                    {i + 1}. {b.judul}
                  </h2>
                  <Prose className="mt-3">
                    {b.isi.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </Prose>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
