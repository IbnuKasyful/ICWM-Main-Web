import Link from "next/link";

import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { cari } from "@/lib/content";
import { buatMetadata } from "@/lib/seo";

/** PRD §8 — dirender dinamis karena bergantung pada kueri pencarian. */
export const dynamic = "force-dynamic";

export const metadata = buatMetadata({
  judul: "Cari",
  deskripsi: "Cari unit pendidikan, berita, program donasi, agenda, dan pertanyaan umum.",
  path: "/cari",
  // Halaman hasil pencarian tidak perlu diindeks.
  noIndex: true,
});

const saranPopuler = ["PPDB", "tahfizh", "beasiswa", "wakaf", "tahsin", "asrama putri"];

export default async function HalamanCari({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const mentah = sp["q"];
  const kueri = (Array.isArray(mentah) ? mentah[0] : mentah)?.slice(0, 120) ?? "";
  const hasil = kueri ? await cari(kueri) : [];

  return (
    <>
      <PageHeader
        jejak={[{ label: "Cari", href: "/cari" }]}
        atas="Pencarian"
        judul="Cari di situs ini"
        keterangan="Pencarian mencakup unit pendidikan, berita dan artikel, program donasi, agenda, serta daftar pertanyaan umum."
      >
        {/* Formulir GET biasa: bekerja tanpa JavaScript dan hasilnya dapat dibagikan. */}
        <form
          action="/cari"
          method="get"
          role="search"
          className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <label htmlFor="q" className="sr-only">
              Kata kunci pencarian
            </label>
            <Icon
              nama="cari"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-subtle"
            />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={kueri}
              placeholder="Misalnya: PPDB, tahfizh, wakaf…"
              autoComplete="off"
              className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-400"
            />
          </div>
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-brand-700 px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Cari
          </button>
        </form>
      </PageHeader>

      <Section className="py-12 md:py-16">
        <div className="container-page">
          {!kueri ? (
            <div className="rounded-2xl border border-line bg-white p-7">
              <h2 className="font-display text-base font-semibold text-ink">
                Belum ada kata kunci
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Masukkan kata kunci di kolom pencarian, atau mulai dari salah satu kata berikut:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {saranPopuler.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/cari?q=${encodeURIComponent(s)}`}
                      className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : hasil.length === 0 ? (
            <EmptyState
              ikon="cari"
              judul={`Tidak ada hasil untuk “${kueri}”`}
              keterangan="Coba kata kunci yang lebih umum, periksa ejaannya, atau telusuri lewat halaman program dan arsip informasi."
              aksi={{ label: "Lihat semua unit", href: "/program" }}
            />
          ) : (
            <>
              <p className="border-b border-line pb-4 text-sm text-ink-muted">
                <span className="font-semibold text-ink">{hasil.length}</span> hasil untuk{" "}
                <span className="font-semibold text-ink">&ldquo;{kueri}&rdquo;</span>
              </p>
              <ul className="mt-2 divide-y divide-line">
                {hasil.map((h) => (
                  <li key={`${h.jenis}-${h.href}-${h.judul}`} className="group relative py-5">
                    <Badge nada="netral">{h.jenis}</Badge>
                    <h2 className="mt-2 font-display text-lg leading-snug font-semibold text-ink">
                      <Link href={h.href} className="after:absolute after:inset-0 hover:text-brand-700">
                        {h.judul}
                      </Link>
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{h.ringkasan}</p>
                    <p className="mt-1.5 text-xs text-ink-subtle">{h.href}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
