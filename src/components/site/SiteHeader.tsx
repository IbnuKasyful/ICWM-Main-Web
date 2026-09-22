"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Lockup } from "@/components/site/Logo";
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

  /* Label penukar unit mengikuti halaman yang sedang dibuka: di /program/<slug>
     pilnya menampilkan nama unit itu, di halaman lain kembali ke "Situs induk".
     Slug yang tidak cocok dengan unit mana pun aman, UnitSwitcher sendiri yang
     jatuh kembali ke `labelSitusIni` bila pencariannya tidak menemukan apa pun. */
  const unitAktif = path.startsWith("/program/") ? path.split("/")[2] : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-line">
      {/* Kaca buram dipasang pada lapisan latar tersendiri, bukan pada <header>.
          `backdrop-filter` menjadikan elemennya containing block bagi turunan
          `position: fixed`, sehingga panel menu ponsel di bawah ikut terkurung
          setinggi header dan kolaps menjadi nol. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/85 backdrop-blur-md" />
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 md:h-18">
          <Link href="/" className="shrink-0 rounded-lg" aria-label={`${site.nama}, beranda`}>
            <Lockup prioritas className="h-8 md:h-10" />
          </Link>

          {/* Navigasi desktop */}
          <nav aria-label="Navigasi utama" className="hidden lg:block">
            {/* Rentang 1024–1279px sempit untuk enam butir + pil unit, jadi
                jarak antarbutir dirapatkan di sana. */}
            <ul className="flex items-center xl:gap-1">
              {navUtama.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={aktifDi(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors xl:px-3.5",
                      aktifDi(item.href)
                        ? "bg-brand-50 text-brand-800"
                        : "text-ink-muted hover:bg-mist-50 hover:text-ink",
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
                      <ul className="rounded-lg border border-line bg-white p-2 shadow-lift">
                        {item.anak.map((anak) => (
                          <li key={anak.href + anak.label}>
                            <Link
                              href={anak.href}
                              className="block rounded-md px-3 py-2.5 transition-colors hover:bg-mist-50"
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

          {/* `min-w-0` membiarkan pil unit menyusut (namanya terpotong
              elipsis) alih-alih mendorong header keluar layar. */}
          <div className="flex min-w-0 items-center gap-2">
            {/* Tampil di semua lebar layar, supaya pindah unit di ponsel tidak
                perlu membuka menu dulu. Di bawah `sm` labelnya diringkas agar
                muat berdampingan dengan logo dan tombol menu, kecuali saat
                sebuah unit sedang dibuka: namanya tetap ditampilkan. */}
            <UnitSwitcher
              units={units}
              unitAktif={unitAktif}
              labelSitusIni="Situs induk"
              labelRingkas="Unit"
            />

            {/* Disembunyikan di 1024–1279px: "Donasi" sudah ada di navigasi
                utama, dan tanpanya header di rentang itu meluber. */}
            <ButtonLink
              href="/donasi"
              varian="kedua"
              ukuran="sm"
              className="shrink-0 max-sm:hidden lg:max-xl:hidden"
            >
              Donasi
            </ButtonLink>

            <button
              type="button"
              onClick={() => setTerbuka((v) => !v)}
              aria-expanded={terbuka}
              aria-controls="menu-ponsel"
              aria-label={terbuka ? "Tutup menu" : "Buka menu"}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist-50 lg:hidden"
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
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-white md:top-18 lg:hidden"
      >
        <nav
          aria-label="Navigasi ponsel"
          className="container-page py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <ul className="flex flex-col gap-1">
            {navUtama.map((item) => (
              <li key={item.href} className="border-b border-line py-2 last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={aktifDi(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-3 py-2 font-display text-lg font-semibold",
                    aktifDi(item.href) ? "text-brand-700" : "text-ink",
                  )}
                >
                  {item.label}
                  <Icon nama="panahKanan" className="size-4 text-ink-subtle" />
                </Link>
                {item.anak ? (
                  <ul className="mt-1 mb-2 flex flex-col gap-0.5 pl-1">
                    {item.anak.map((anak) => (
                      <li key={anak.href + anak.label}>
                        <Link
                          href={anak.href}
                          className="flex min-h-11 items-center rounded-lg px-2 py-2 text-sm text-ink-muted hover:bg-mist-50"
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
        </nav>
      </div>
    </header>
  );
}
