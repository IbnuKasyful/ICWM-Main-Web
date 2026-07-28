import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { labelJenjang, labelLokasi } from "@/lib/format";
import type { Jenjang, Unit } from "@/lib/schemas";
import { cn } from "@/lib/cn";

const urutanJenjang: Jenjang[] = ["paud", "sd", "smp", "sma", "tinggi", "non-formal"];

export type UnitSwitcherProps = {
  /** Seluruh unit yang boleh ditampilkan. Wajib props — tanpa nilai dipatok mati. */
  units: readonly Unit[];
  /** Slug unit yang sedang dibuka, bila ada. */
  unitAktif?: string | undefined;
  /** Label situs saat ini, mis. "Situs induk" atau nama unit di Fase 2. */
  labelSitusIni: string;
  /** Beranda situs saat ini. */
  hrefSitusIni?: string;
  className?: string;
};

/**
 * PRD §5.4 & §10 — jalur balik lintas unit.
 *
 * Dirancang sejak Fase 1 untuk dipakai ulang apa adanya di seluruh subdomain
 * Fase 2: seluruh isinya datang dari props, tidak ada nilai yang dipatok mati.
 * Memakai `<details>` agar berfungsi tanpa JavaScript.
 */
export function UnitSwitcher({
  units,
  unitAktif,
  labelSitusIni,
  hrefSitusIni = "/",
  className,
}: UnitSwitcherProps) {
  const aktif = unitAktif ? units.find((u) => u.slug === unitAktif) : undefined;
  const kelompok = urutanJenjang
    .map((j) => ({ jenjang: j, isi: units.filter((u) => u.jenjang === j) }))
    .filter((k) => k.isi.length > 0);

  return (
    <details className={cn("group relative", className)}>
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition-colors",
          "hover:border-brand-300 hover:bg-brand-50 [&::-webkit-details-marker]:hidden",
        )}
        aria-label="Pindah ke situs unit lain"
      >
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-brand-500"
          style={aktif ? { backgroundColor: aktif.warna_aksen } : undefined}
        />
        <span className="max-w-[10rem] truncate">{aktif ? aktif.nama_pendek : labelSitusIni}</span>
        <Icon
          nama="panahBawah"
          className="size-4 text-ink-subtle transition-transform group-open:rotate-180"
        />
      </summary>

      <div
        className={cn(
          "absolute right-0 z-50 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto",
          "rounded-2xl border border-line bg-white p-2 shadow-lift",
        )}
      >
        <Link
          href={hrefSitusIni}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-mist-50"
        >
          <Icon nama="yayasan" className="size-4 text-brand-600" />
          {labelSitusIni}
        </Link>

        {kelompok.map((k) => (
          <div key={k.jenjang} className="mt-1">
            <p className="px-3 pt-3 pb-1 text-[0.68rem] font-semibold tracking-[0.12em] text-ink-subtle uppercase">
              {labelJenjang[k.jenjang]}
            </p>
            <ul>
              {k.isi.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/program/${u.slug}`}
                    aria-current={u.slug === unitAktif ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-mist-50",
                      u.slug === unitAktif ? "bg-brand-50 font-semibold text-brand-800" : "text-ink-muted",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: u.warna_aksen }}
                    />
                    <span className="min-w-0 flex-1 truncate">{u.nama_pendek}</span>
                    <span className="shrink-0 text-xs text-ink-subtle">
                      {labelLokasi[u.lokasi_kampus]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
