"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { LightboxFoto } from "@/components/galeri/LightboxFoto";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { labelGaleriKategori } from "@/lib/format";
import type { GaleriItem, GaleriKategori } from "@/lib/schemas";

/**
 * Kisi foto galeri: kartu seragam tiga kolom, kategori di pojok kiri atas dan
 * keterangan di kiri bawah, di atas fotonya sendiri.
 *
 * Menggantikan korsel *coverflow* sebelumnya. Korsel hanya memperlihatkan satu
 * foto dalam satu waktu, sehingga pengunjung harus menekan panah belasan kali
 * untuk tahu isi galeri; kisi memperlihatkan semuanya sekaligus. Kartu sengaja
 * dibuat sama besar, potongan `object-cover` memang memangkas foto tegak,
 * tapi mengetuk kartu membuka foto utuh beserta keterangan lengkapnya.
 */

/** Urutan penyaring; hanya kelompok yang benar-benar punya foto yang muncul. */
const urutanKategori: readonly GaleriKategori[] = [
  "wisuda",
  "dauroh",
  "halaqah",
  "anak",
  "kampus",
];

export function GridGaleri({ galeri }: { galeri: readonly GaleriItem[] }) {
  const [kategori, setKategori] = useState<GaleriKategori | null>(null);
  const [aktif, setAktif] = useState<number | null>(null);

  const kategoriTersedia = useMemo(
    () => urutanKategori.filter((k) => galeri.some((g) => g.kategori === k)),
    [galeri],
  );

  const daftar = useMemo(
    () => (kategori === null ? galeri : galeri.filter((g) => g.kategori === kategori)),
    [galeri, kategori],
  );

  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        {/* Baris penyaring, satu baris utuh, tidak pernah membungkus. Di layar
            sempit barisnya digeser mendatar; membungkus jadi dua-tiga baris
            mengubah baris penyaring menjadi blok tersendiri dan mendorong foto
            turun dari pandangan pertama. */}
        <div
          className={cn(
            "-mx-5 flex items-center gap-2 overflow-x-auto px-5 md:mx-0 md:px-0",
            // Baris dipusatkan bila muat, dan mulai dari kiri bila harus digeser
            // (`justify-center` pada wadah yang tergulir memotong ujung kirinya).
            "justify-start lg:justify-center",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          <PilKategori aktif={kategori === null} onClick={() => setKategori(null)}>
            Semua
          </PilKategori>
          {kategoriTersedia.map((k) => (
            <PilKategori key={k} aktif={kategori === k} onClick={() => setKategori(k)}>
              {labelGaleriKategori[k]}
            </PilKategori>
          ))}

          <Link
            href="/agenda"
            className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink/45 hover:bg-mist-100"
          >
            Agenda kegiatan
            <Icon
              nama="panah"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <p aria-live="polite" className="sr-only">
          {`${daftar.length} foto ditampilkan`}
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 lg:gap-4">
          {daftar.map((foto, i) => (
            <li key={foto.src}>
              <button
                type="button"
                onClick={() => setAktif(i)}
                aria-label={`Perbesar foto: ${foto.alt}`}
                className={cn(
                  "group relative block aspect-[7/5] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-mist-100 text-left",
                  "shadow-soft ring-1 ring-ink/5",
                  "outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-600",
                )}
              >
                <Image
                  src={foto.src}
                  alt=""
                  width={foto.width}
                  height={foto.height}
                  priority={i < 3}
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />

                {/* Dua tirai tipis, atas dan bawah, hanya setinggi yang dibutuhkan
                    label dan keterangan, bagian tengah foto dibiarkan terang. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(11_21_36/0.45),transparent_28%,transparent_52%,rgb(11_21_36/0.82))]"
                />

                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 py-1 pr-2.5 pl-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md"
                >
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-white/25">
                    <Icon nama="centang" className="size-3" tebal={2.5} />
                  </span>
                  {labelGaleriKategori[foto.kategori]}
                </span>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 line-clamp-2 px-4 pb-3.5 text-sm leading-snug font-semibold text-pretty text-white"
                >
                  {foto.alt}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <LightboxFoto galeri={daftar} aktif={aktif} setAktif={setAktif} />
    </section>
  );
}

function PilKategori({
  aktif,
  onClick,
  children,
}: {
  aktif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktif}
      className={cn(
        // `shrink-0` + `whitespace-nowrap`: di dalam baris yang tergulir, pil
        // tanpa keduanya akan diperas sampai labelnya patah dua baris.
        "h-9 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-150",
        aktif
          ? "bg-brand-950 text-white"
          : "border border-line bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800",
      )}
    >
      {children}
    </button>
  );
}
