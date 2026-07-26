"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/site/Logo";
import { UnitSwitcher } from "@/components/site/UnitSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Unit } from "@/lib/schemas";
import { navUtama, site } from "@/lib/site";

/**
 * Header situs.
 *
 * Menu tarik-turun desktop memakai `:hover`/`:focus-within` murni CSS sehingga
 * tidak membutuhkan state; JavaScript hanya dipakai untuk panel menu ponsel.
 */
export function SiteHeader({ units }: { units: readonly Unit[] }) {
  const [terbuka, setTerbuka] = useState(false);
  const path = usePathname();

  // Tutup panel setiap kali pindah halaman.
  useEffect(() => {
    setTerbuka(false);
  }, [path]);

  // Kunci gulir latar saat panel ponsel terbuka.
  useEffect(() => {
    document.body.style.overflow = terbuka ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [terbuka]);

  useEffect(() => {
    if (!terbuka) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setTerbuka(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terbuka]);

  const aktifDi = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 md:h-18">
          <Link href="/" className="shrink-0 rounded-lg" aria-label={`${site.nama} — beranda`}>
            <Wordmark nama={site.namaPendek} keterangan="Islamic Center" />
          </Link>

          {/* Navigasi desktop */}
          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navUtama.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={aktifDi(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                      aktifDi(item.href)
                        ? "bg-brand-50 text-brand-800"
                        : "text-ink-muted hover:bg-sand-50 hover:text-ink",
                    )}
                  >
                    {item.label}
                    {item.anak ? (
                      <Icon
                        nama="panahBawah"
                        className="size-3.5 opacity-60 transition-transform group-hover:rotate-180"
                        tebal={2}
                      />
                    ) : null}
                  </Link>

                  {item.anak ? (
                    <div
                      className={cn(
                        "invisible absolute top-full left-0 w-80 pt-2 opacity-0 transition-[opacity,visibility] duration-150",
                        "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
                      )}
                    >
                      <ul className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                        {item.anak.map((anak) => (
                          <li key={anak.href + anak.label}>
                            <Link
                              href={anak.href}
                              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-sand-50"
                            >
                              <span className="block text-sm font-semibold text-ink">
                                {anak.label}
                              </span>
                              {anak.deskripsi ? (
                                <span className="mt-0.5 block text-xs leading-relaxed text-ink-subtle">
                                  {anak.deskripsi}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cari"
              aria-label="Cari di situs ini"
              className="inline-flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand-50 hover:text-ink"
            >
              <Icon nama="cari" />
            </Link>

            <div className="hidden xl:block">
              <UnitSwitcher units={units} labelSitusIni="Situs induk" />
            </div>

            <ButtonLink href="/donasi" varian="kedua" ukuran="sm" className="hidden sm:inline-flex">
              Donasi
            </ButtonLink>

            <button
              type="button"
              onClick={() => setTerbuka((v) => !v)}
              aria-expanded={terbuka}
              aria-controls="menu-ponsel"
              aria-label={terbuka ? "Tutup menu" : "Buka menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-sand-50 lg:hidden"
            >
              <Icon nama={terbuka ? "tutup" : "menu"} />
            </button>
          </div>
        </div>
      </div>

      {/* Panel menu ponsel */}
      <div
        id="menu-ponsel"
        hidden={!terbuka}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Navigasi ponsel" className="container-page py-6">
          <ul className="flex flex-col gap-1">
            {navUtama.map((item) => (
              <li key={item.href} className="border-b border-line py-2 last:border-b-0">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-2 font-display text-lg font-semibold text-ink"
                >
                  {item.label}
                  <Icon nama="panahKanan" className="size-4 text-ink-subtle" />
                </Link>
                {item.anak ? (
                  <ul className="mt-1 mb-2 flex flex-col gap-1 pl-1">
                    {item.anak.map((anak) => (
                      <li key={anak.href + anak.label}>
                        <Link
                          href={anak.href}
                          className="block rounded-lg px-2 py-1.5 text-sm text-ink-muted hover:bg-sand-50"
                        >
                          {anak.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/donasi" varian="utama" ukuran="lg">
              Berdonasi lewat LAZIS
            </ButtonLink>
            <ButtonLink href="/program" varian="garis" ukuran="lg">
              Cari unit yang cocok
            </ButtonLink>
          </div>

          <div className="mt-6">
            <UnitSwitcher units={units} labelSitusIni="Situs induk" />
          </div>
        </nav>
      </div>
    </header>
  );
}
