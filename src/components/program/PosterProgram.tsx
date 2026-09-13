"use client";

import Image from "next/image";
import { useState } from "react";

import { LightboxFoto } from "@/components/galeri/LightboxFoto";
import { Icon } from "@/components/ui/Icon";
import type { ImageData } from "@/lib/schemas";

/**
 * Poster program di kartu ringkasan /program-quran.
 *
 * Poster penuh tulisan, dan pada lebar kartu tulisannya terlalu kecil untuk
 * dibaca — jadi mengetuknya membuka poster utuh di lightbox. Karena alasan yang
 * sama, tidak ada teks atau tirai gelap yang ditumpuk di atasnya: keduanya akan
 * menutupi isi poster itu sendiri.
 */
export function PosterProgram({ gambar, nama }: { gambar: ImageData; nama: string }) {
  const [aktif, setAktif] = useState<number | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setAktif(0)}
        aria-label={`Perbesar poster ${nama}`}
        className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-[22px] bg-mist-100 outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        <Image
          src={gambar.src}
          alt={gambar.alt}
          width={gambar.width}
          height={gambar.height}
          sizes="(min-width: 768px) 36rem, 100vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full bg-ink/55 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors group-hover:bg-ink/75"
        >
          <Icon nama="cari" className="size-4" tebal={2} />
        </span>
      </button>

      <LightboxFoto galeri={[gambar]} aktif={aktif} setAktif={setAktif} />
    </>
  );
}
