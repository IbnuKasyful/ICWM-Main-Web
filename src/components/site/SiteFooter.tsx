import Link from "next/link";

import { Wordmark } from "@/components/site/Logo";
import { Icon } from "@/components/ui/Icon";
import type { Unit } from "@/lib/schemas";
import type { NavItem } from "@/lib/site";

export type SiteFooterProps = {
  nama: string;
  namaPendek: string;
  deskripsi: string;
  alamat: { jalan: string; kota: string; provinsi: string; kodePos: string };
  kontak: { telepon: string; email: string; jamLayanan: string };
  lazis: { nama: string };
  sosial: readonly { label: string; href: string }[];
  grup: readonly { judul: string; tautan: readonly NavItem[] }[];
  kepatuhan: readonly NavItem[];
  units: readonly Unit[];
  /** Teks besar transparan di dasar footer. */
  watermark: string;
};

/**
 * PRD §10, seluruh isi datang dari props tanpa nilai yang dipatok mati,
 * supaya komponen ini dipakai apa adanya oleh setiap subdomain pada Fase 2.
 */
export function SiteFooter({
  nama,
  namaPendek,
  deskripsi,
  alamat,
  kontak,
  lazis,
  sosial,
  grup,
  kepatuhan,
  units,
  watermark,
}: SiteFooterProps) {
  const tahun = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white">
      <div className="container-page relative z-10 pt-16 pb-8 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <Wordmark nama={namaPendek} keterangan="Islamic Center" terang />
            <p className="mt-5 text-sm leading-relaxed text-pretty text-white/60">{deskripsi}</p>

            <address className="mt-6 flex flex-col gap-3 text-sm text-white/70 not-italic">
              <span className="flex gap-2.5">
                <Icon nama="pin" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                <span>
                  {alamat.jalan}, {alamat.kota}, {alamat.provinsi} {alamat.kodePos}
                </span>
              </span>
              <a href={`tel:${kontak.telepon.replace(/\s/g, "")}`} className="flex gap-2.5 hover:text-white">
                <Icon nama="telepon" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                {kontak.telepon}
              </a>
              <a href={`mailto:${kontak.email}`} className="flex gap-2.5 hover:text-white">
                <Icon nama="surel" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                {kontak.email}
              </a>
              <span className="flex gap-2.5 text-white/50">
                <Icon nama="jam" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                {kontak.jamLayanan}
              </span>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {grup.map((g) => (
              <nav key={g.judul} aria-label={g.judul}>
                <h2 className="text-xs font-semibold tracking-[0.12em] text-accent-300 uppercase">
                  {g.judul}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {g.tautan.map((t) => (
                    <li key={t.href + t.label}>
                      <Link
                        href={t.href}
                        className="text-sm text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Jalur balik lintas unit, PRD §5.4 */}
        {units.length > 0 ? (
          <nav aria-label="Unit pendidikan" className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xs font-semibold tracking-[0.12em] text-accent-300 uppercase">
              Unit pendidikan
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
              {units.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/program/${u.slug}`}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: u.warna_aksen }}
                    />
                    {u.nama_pendek}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {sosial.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {kepatuhan.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="text-xs text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {tahun} {nama}. Seluruh hak cipta dilindungi.
          </p>
          <p>{lazis.nama}</p>
        </div>
      </div>

      {/* Watermark besar, mengikuti bahasa desain referensi. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 left-1/2 w-full -translate-x-1/2 text-center font-display text-[16vw] leading-none font-bold tracking-tight text-white/[0.035] select-none md:-bottom-8"
      >
        {watermark}
      </span>
    </footer>
  );
}
