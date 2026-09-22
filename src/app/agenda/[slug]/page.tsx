import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { agendaSudahLewat, getAgenda, getPetaNamaUnit, getSemuaAgenda } from "@/lib/content";
import { hari, labelLokasi, rentangWaktu, tautanWhatsApp } from "@/lib/format";
import { buatMetadata, jsonldEvent } from "@/lib/seo";

/** Sama dengan /agenda, supaya status "telah berlangsung" ikut berganti. */
export const revalidate = 900;

export function generateStaticParams() {
  return getSemuaAgenda().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agenda = getAgenda(slug);
  if (!agenda) {
    return buatMetadata({ judul: "Agenda tidak ditemukan", deskripsi: "", path: "/agenda", noIndex: true });
  }
  return buatMetadata({
    judul: agenda.judul,
    deskripsi: agenda.ringkasan,
    path: `/agenda/${agenda.slug}`,
    gambar: agenda.poster?.src,
  });
}

export default async function HalamanDetailAgenda({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agenda = getAgenda(slug);
  if (!agenda) notFound();

  const lewat = agendaSudahLewat(agenda);
  const labelUnit =
    agenda.penyelenggara ?? (agenda.unit[0] ? getPetaNamaUnit().get(agenda.unit[0]) : undefined);

  return (
    <>
      {lewat ? null : <JsonLd data={jsonldEvent(agenda)} />}

      <PageHeader
        jejak={[
          { label: "Agenda", href: "/agenda" },
          { label: agenda.judul, href: `/agenda/${agenda.slug}` },
        ]}
        atas="Agenda"
        judul={agenda.judul}
        keterangan={agenda.ringkasan}
      >
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {lewat ? (
            <Badge nada="netral">Kegiatan telah berlangsung</Badge>
          ) : agenda.terbuka_umum ? (
            <Badge nada="sukses">Terbuka untuk umum</Badge>
          ) : (
            <Badge nada="netral">Internal / undangan</Badge>
          )}
          {labelUnit ? <Badge nada="netral">{labelUnit}</Badge> : null}
        </div>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            {agenda.poster ? (
              <a
                href={agenda.poster.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buka poster ukuran penuh"
                className="block overflow-hidden rounded-3xl bg-mist-100"
              >
                <Image
                  src={agenda.poster.src}
                  alt={agenda.poster.alt}
                  width={agenda.poster.width}
                  height={agenda.poster.height}
                  priority
                  sizes="(min-width: 1024px) 720px, 100vw"
                  // Poster dibiarkan utuh pada rasio aslinya, tulisannya bagian
                  // dari gambar. Foto lanskap diseragamkan ke 3:2.
                  className={
                    agenda.poster.height > agenda.poster.width
                      ? "mx-auto h-auto w-full max-w-md"
                      : "aspect-[3/2] w-full object-cover"
                  }
                />
              </a>
            ) : null}

            {agenda.deskripsi ? (
              <div className="mt-8 flex flex-col gap-4 text-base leading-relaxed text-ink-muted">
                {agenda.deskripsi.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : null}

            {agenda.rincian ? (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {agenda.rincian.map((r) => (
                  <div key={r.judul} className="rounded-2xl border border-line bg-white p-5">
                    <h2 className="font-display text-base font-semibold text-ink">{r.judul}</h2>
                    <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
                      {r.butir.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Icon nama="centang" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Panel ringkas waktu, tempat, dan pendaftaran */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <dl className="flex flex-col gap-4 text-sm">
                <div className="flex gap-3">
                  <Icon nama="kalender" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                      Waktu
                    </dt>
                    <dd className="mt-1 font-semibold text-ink">
                      <time dateTime={agenda.mulai}>
                        {hari(agenda.mulai)}, {rentangWaktu(agenda.mulai, agenda.selesai)}
                      </time>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon nama="pin" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                      Tempat
                    </dt>
                    <dd className="mt-1 font-semibold text-ink">
                      {agenda.tempat} · {labelLokasi[agenda.lokasi]}
                    </dd>
                  </div>
                </div>
                {agenda.kontak ? (
                  <div className="flex gap-3">
                    <Icon nama="orang" className="mt-0.5 size-4 shrink-0 text-brand-500" />
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                        Narahubung
                      </dt>
                      <dd className="mt-1 font-semibold text-ink">{agenda.kontak.nama}</dd>
                    </div>
                  </div>
                ) : null}
              </dl>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                {lewat ? (
                  <>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      Kegiatan ini sudah berlangsung. Dokumentasi sebagian kegiatan tersedia di
                      halaman galeri.
                    </p>
                    <ButtonLink href="/galeri" varian="garis">
                      Lihat galeri
                    </ButtonLink>
                  </>
                ) : agenda.kontak ? (
                  <ButtonLink
                    href={tautanWhatsApp(
                      agenda.kontak.wa,
                      `Assalamu'alaikum, saya ingin mendaftar atau bertanya tentang ${agenda.judul}.`,
                    )}
                    eksternal
                    ukuran="lg"
                  >
                    <Icon nama="whatsapp" className="size-4" />
                    Info &amp; pendaftaran
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/agenda" varian="garis">
                  Semua agenda
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
