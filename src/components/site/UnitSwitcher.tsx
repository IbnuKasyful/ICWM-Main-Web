"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { Icon } from "@/components/ui/Icon";
import { labelJenjang, labelLokasi } from "@/lib/format";
import type { Jenjang, Unit } from "@/lib/schemas";
import { cn } from "@/lib/cn";

const urutanJenjang: Jenjang[] = ["paud", "sd", "smp", "sma", "tinggi", "non-formal"];

export type UnitSwitcherProps = {
  /** Seluruh unit yang boleh ditampilkan. Wajib props, tanpa nilai dipatok mati. */
  units: readonly Unit[];
  /** Slug unit yang sedang dibuka, bila ada. */
  unitAktif?: string | undefined;
  /** Label situs saat ini, mis. "Situs induk" atau nama unit di Fase 2. */
  labelSitusIni: string;
  /** Beranda situs saat ini. */
  hrefSitusIni?: string;
  /** Label pil di bawah `sm` saat tidak ada unit yang dibuka, bila ruang header ponsel sempit. */
  labelRingkas?: string;
  className?: string;
};

/**
 * PRD §5.4 & §10, jalur balik lintas unit.
 *
 * Dirancang sejak Fase 1 untuk dipakai ulang apa adanya di seluruh subdomain
 * Fase 2: seluruh isinya datang dari props, tidak ada nilai yang dipatok mati.
 *
 * Tetap memakai `<details>` sebagai dasar, jadi tanpa JavaScript panelnya masih
 * bisa dibuka-tutup. JavaScript hanya menambah tiga penutup yang tidak dipunyai
 * `<details>` sendiri: memilih tautan, mengklik di luar panel, dan menekan Esc.
 */
export function UnitSwitcher({
  units,
  unitAktif,
  labelSitusIni,
  hrefSitusIni = "/",
  labelRingkas,
  className,
}: UnitSwitcherProps) {
  const rujukan = useRef<HTMLDetailsElement>(null);
  const path = usePathname();

  /* Pindah halaman selalu menutup panel. Ini menangani pemilihan tautan yang
     memang mengubah alamat; tautan ke halaman yang sedang dibuka ditangani
     `onClick` di panelnya, karena path-nya tidak berubah dan efek ini diam. */
  useEffect(() => {
    const el = rujukan.current;
    if (el) el.open = false;
  }, [path]);

  useEffect(() => {
    function diLuar(e: PointerEvent) {
      const el = rujukan.current;
      if (el?.open && !el.contains(e.target as Node)) el.open = false;
    }
    function padaEsc(e: KeyboardEvent) {
      const el = rujukan.current;
      if (e.key === "Escape" && el?.open) {
        el.open = false;
        // Fokus dikembalikan ke pilnya, kalau tidak fokus hilang ke <body>.
        el.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", diLuar);
    document.addEventListener("keydown", padaEsc);
    return () => {
      document.removeEventListener("pointerdown", diLuar);
      document.removeEventListener("keydown", padaEsc);
    };
  }, []);

  const aktif = unitAktif ? units.find((u) => u.slug === unitAktif) : undefined;
  const kelompok = urutanJenjang
    .map((j) => ({ jenjang: j, isi: units.filter((u) => u.jenjang === j) }))
    .filter((k) => k.isi.length > 0);

  return (
    <details ref={rujukan} className={cn("group relative min-w-0", className)}>
      <summary
        className={cn(
          // Di ponsel pil diperkecil (12px, tebal normal, tinggi 32px) supaya
          // nama unit lebih jarang terpotong di samping logo dan tombol menu.
          "flex min-h-8 min-w-0 cursor-pointer list-none items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1.5 text-xs font-normal text-ink transition-colors",
          "sm:min-h-10 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm sm:font-semibold",
          "hover:border-brand-300 hover:bg-brand-50 [&::-webkit-details-marker]:hidden",
        )}
        aria-label="Pindah ke situs unit lain"
      >
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-brand-500"
          style={aktif ? { backgroundColor: aktif.warna_aksen } : undefined}
        />
        {/* Nama unit yang sedang dibuka selalu tampil, di ponsel pun, dan
            terpotong elipsis bila ruangnya kurang. Label ringkas hanya
            menggantikan label situs saat tidak ada unit yang dibuka. */}
        {aktif ? (
          <span className="max-w-[10rem] min-w-0 truncate">{aktif.nama_pendek}</span>
        ) : (
          <>
            <span className={cn("max-w-[10rem] min-w-0 truncate", labelRingkas && "max-sm:hidden")}>
              {labelSitusIni}
            </span>
            {labelRingkas ? <span className="sm:hidden">{labelRingkas}</span> : null}
          </>
        )}
        <Icon
          nama="panahBawah"
          className="size-3.5 shrink-0 text-ink-subtle transition-transform group-open:rotate-180 sm:size-4"
        />
      </summary>

      {/* Menutup panel begitu sebuah tautan dipilih. Disandarkan pada `closest`
          alih-alih dipasang di tiap <Link> supaya satu penangan cukup untuk
          seluruh daftar, dan klik pada judul jenjang tidak ikut menutup. */}
      <div
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("a")) return;
          const el = rujukan.current;
          if (el) el.open = false;
        }}
        className={cn(
          "absolute right-0 z-50 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto",
          // Di ponsel pilnya tidak menempel ke tepi kanan layar, jadi panel
          // yang dijangkar ke pil akan terpotong di kiri; direntang selebar
          // layar di bawah header sebagai gantinya.
          "max-sm:fixed max-sm:inset-x-4 max-sm:top-[4.5rem] max-sm:mt-0 max-sm:w-auto",
          "rounded-2xl border border-line bg-white p-2 shadow-lift",
        )}
      >
        <Link
          href={hrefSitusIni}
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-mist-50"
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
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-mist-50",
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
