import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { labelJenjang } from "@/lib/format";
import type { Jenjang } from "@/lib/schemas";

/**
 * PRD §9.1 blok 1 — satu pesan, satu gambar, satu CTA utama. BUKAN carousel:
 * carousel di situs lama menurunkan performa dan nyaris tak pernah diklik
 * melewati slide pertama.
 */

const pintasanJenjang: { jenjang: Jenjang; href: string }[] = [
  { jenjang: "paud", href: "/program?jenjang=paud" },
  { jenjang: "sd", href: "/program?jenjang=sd" },
  { jenjang: "smp", href: "/program?jenjang=smp" },
  { jenjang: "sma", href: "/program?jenjang=sma" },
  { jenjang: "tinggi", href: "/program?jenjang=tinggi" },
  { jenjang: "non-formal", href: "/program?jenjang=non-formal" },
];

export function Hero({
  jumlahUnit,
  jumlahSantri,
}: {
  jumlahUnit: number;
  jumlahSantri: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-14 md:pb-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="container-page relative">
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-accent-700 uppercase">
            <Icon nama="bintang" className="size-3.5" />
            Sejak 1998 · Bogor & Sleman
          </span>

          <h1 className="max-w-4xl font-display text-display-lg text-balance text-ink md:text-display-xl lg:text-display-2xl">
            Menemani anak Anda tumbuh bersama{" "}
            <span className="relative text-brand-700">
              Al-Qur&apos;an
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-accent-200/70 md:-bottom-2 md:h-3"
              />
            </span>
          </h1>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* Panel hangat berisi pesan utama & CTA */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-sand-100 via-sand-50 to-accent-50 p-7 md:p-10">
            <div>
              <p className="max-w-lg text-base leading-relaxed text-pretty text-ink-muted md:text-lg">
                Sepuluh unit pendidikan — dari taman asuh usia dini sampai perguruan tinggi —
                beserta lembaga amil zakat resmi, dalam satu naungan. Temukan unit yang benar-benar
                cocok untuk anak Anda sebelum menghubungi siapa pun.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/program" ukuran="lg">
                  Cari unit yang cocok
                  <Icon nama="panah" className="size-4" />
                </ButtonLink>
                <ButtonLink href="/tentang" varian="garis" ukuran="lg">
                  Kenali yayasan
                </ButtonLink>
              </div>
            </div>

            <div className="mt-10 border-t border-ink/10 pt-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
                Langsung ke jenjang
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pintasanJenjang.map((p) => (
                  <li key={p.jenjang}>
                    <Link
                      href={p.href}
                      className="inline-flex rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand-300 hover:bg-white"
                    >
                      {labelJenjang[p.jenjang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Satu gambar, bukan carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-900 lg:aspect-auto lg:h-full">
              <Image
                src="/img/hero-utama.svg"
                alt="Suasana halaqah santri di masjid utama Kampus Wadi Mubarak, Bogor"
                width={1600}
                height={1200}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 620px, 100vw"
                className="size-full object-cover"
              />
            </div>

            <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/15 bg-white/95 px-5 py-4 shadow-lift backdrop-blur-sm md:right-6 md:bottom-6 md:left-auto md:max-w-xs md:flex-col md:items-start">
              <div>
                <p className="font-display text-display-sm text-brand-700">{jumlahSantri}</p>
                <p className="text-xs text-ink-muted">santri aktif tahun ini</p>
              </div>
              <div className="md:mt-1 md:border-t md:border-line md:pt-3">
                <p className="font-display text-display-sm text-brand-700">{jumlahUnit}</p>
                <p className="text-xs text-ink-muted">unit pendidikan & lembaga</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
