import Image from "next/image";
import { notFound } from "next/navigation";

import { DaftarRekening } from "@/components/donasi/DaftarRekening";
import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Progress } from "@/components/ui/Progress";
import { ProseHtml } from "@/components/ui/Prose";
import { getProgramDonasi, getProgramDonasiSlug, getRekening } from "@/lib/content";
import { labelJenisDonasi, rupiah, tanggal } from "@/lib/format";
import { buatMetadata, jsonldDonateAction } from "@/lib/seo";
import { site } from "@/lib/site";

/** PRD §8 — ISR 15 menit. */
export const revalidate = 900;

export async function generateStaticParams() {
  return (await getProgramDonasi()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgramDonasiSlug(slug);
  if (!program) {
    return buatMetadata({ judul: "Program tidak ditemukan", deskripsi: "", path: "/donasi", noIndex: true });
  }
  return buatMetadata({
    judul: program.judul,
    deskripsi: program.ringkasan,
    path: `/donasi/${program.slug}`,
    gambar: program.gambar.src,
  });
}

export default async function HalamanProgramDonasi({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramDonasiSlug(slug);
  if (!program) notFound();

  const rekening = getRekening().filter((r) => r.jenis === program.jenis);
  const lain = (await getProgramDonasi())
    .filter((p) => p.slug !== program.slug)
    .slice(0, 3);

  const pesanWa = `Assalamu'alaikum. Saya ingin berdonasi untuk program "${program.judul}".`;

  return (
    <>
      <JsonLd data={jsonldDonateAction(program)} />

      <PageHeader
        jejak={[
          { label: "Donasi", href: "/donasi" },
          { label: program.judul, href: `/donasi/${program.slug}` },
        ]}
        atas={labelJenisDonasi[program.jenis]}
        judul={program.judul}
        keterangan={program.ringkasan}
      >
        {program.mendesak ? (
          <div className="mt-5">
            <Badge nada="peringatan">Program mendesak</Badge>
          </div>
        ) : null}
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-3xl bg-mist-100">
              <Image
                src={program.gambar.src}
                alt={program.gambar.alt}
                width={program.gambar.width}
                height={program.gambar.height}
                priority
                sizes="(min-width: 1024px) 720px, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <ProseHtml html={program.konten} className="mt-8" />

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              <div className="bg-white p-5">
                <dt className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                  Penerima manfaat
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-ink">{program.penerima_manfaat}</dd>
              </div>
              <div className="bg-white p-5">
                <dt className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                  Batas waktu
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-ink">
                  {program.batas_waktu ? tanggal(program.batas_waktu) : "Program berkelanjutan"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Panel donasi */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <Progress terkumpul={program.terkumpul} target={program.target} />

              {program.target > 0 ? (
                <p className="mt-4 rounded-xl bg-mist-50 p-4 text-xs leading-relaxed text-ink-muted">
                  Kekurangan saat ini{" "}
                  <span className="font-semibold text-ink">
                    {rupiah(Math.max(0, program.target - program.terkumpul))}
                  </span>
                  . Angka diperbarui setiap kali rekapitulasi harian ditutup.
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink
                  href={`https://wa.me/${site.kontak.whatsapp}?text=${encodeURIComponent(pesanWa)}`}
                  eksternal
                  ukuran="lg"
                >
                  <Icon nama="whatsapp" className="size-4" />
                  Donasi untuk program ini
                </ButtonLink>
                <ButtonLink href="/donasi#rekening" varian="garis">
                  Lihat rekening resmi
                </ButtonLink>
              </div>

              <p className="mt-5 border-t border-line pt-5 text-xs leading-relaxed text-ink-subtle">
                Fase ini belum melayani pembayaran daring. Donasi dilakukan lewat transfer ke
                rekening resmi, lalu dikonfirmasi melalui WhatsApp.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-display text-base font-semibold text-ink">
                Rekening {labelJenisDonasi[program.jenis]}
              </h2>
              <div className="mt-3">
                <DaftarRekening rekening={rekening} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {lain.length > 0 ? (
        <section className="bg-mist-50 py-14 md:py-20">
          <div className="container-page">
            <h2 className="font-display text-display-md text-ink">
              Program <span className="text-brand-600">lainnya</span>
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {lain.map((p) => (
                <li
                  key={p.slug}
                  className="group relative rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand-200"
                >
                  <Badge nada="aksen">{labelJenisDonasi[p.jenis]}</Badge>
                  <h3 className="mt-3 font-display text-base leading-snug font-semibold text-ink">
                    <a href={`/donasi/${p.slug}`} className="after:absolute after:inset-0">
                      {p.judul}
                    </a>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{p.ringkasan}</p>
                  <Progress
                    terkumpul={p.terkumpul}
                    target={p.target}
                    className="mt-4"
                    ringkas
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
