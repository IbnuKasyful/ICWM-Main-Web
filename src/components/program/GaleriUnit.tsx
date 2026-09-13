"use client";

import Image from "next/image";
import { useState } from "react";

import { LightboxFoto } from "@/components/galeri/LightboxFoto";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { ImageData } from "@/lib/schemas";

/**
 * Kisi foto "Suasana sehari-hari" di halaman profil unit, dengan tampilan
 * besarnya sendiri.
 *
 * Sebelumnya kisi ini hanya berupa gambar mati: foto dipotong persegi, dan
 * satu-satunya keterangan — teks `alt` — tidak pernah sampai ke pembaca yang
 * melihat. Padahal justru di sini pengunjung mencoba menerka seperti apa
 * kesehariannya, dan potongan persegi memangkas hampir separuh isi tiap foto.
 * Mengetuknya kini membuka foto utuh beserta keterangannya.
 */
export function GaleriUnit({ galeri }: { galeri: readonly ImageData[] }) {
  const [aktif, setAktif] = useState<number | null>(null);

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {galeri.map((g, i) => (
          <li key={`${g.src}-${i}`} className="overflow-hidden rounded-xl bg-mist-100">
            <button
              type="button"
              onClick={() => setAktif(i)}
              aria-label={`Perbesar foto: ${g.alt}`}
              className="group relative block size-full cursor-zoom-in outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                sizes="(min-width: 1024px) 190px, 45vw"
                className="aspect-square size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              {/* Tanda kaca pembesar hanya muncul saat disentuh kursor atau
                  menerima fokus. Di layar sentuh ia tidak diperlukan: di sana
                  seluruh kisi memang diketuk, bukan diarahkan. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-brand-950/45 opacity-0",
                  "transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
                  "motion-reduce:transition-none",
                )}
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
                  <Icon nama="cari" className="size-4 text-white" tebal={2} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <LightboxFoto galeri={galeri} aktif={aktif} setAktif={setAktif} />
    </>
  );
}
