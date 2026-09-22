"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { ImageData } from "@/lib/schemas";

/**
 * Tampilan besar foto dokumentasi beserta keterangannya, dipakai kisi foto di
 * halaman profil unit maupun di /galeri.
 *
 * Dibangun di atas `<dialog>` bawaan peramban, bukan `<div>` berposisi tetap:
 * lapisan atas, jebakan fokus, pengembalian fokus ke pemicunya, dan tombol Esc
 * sudah menjadi perilaku bawaan elemennya, tiga hal terakhir itulah yang
 * biasanya terlupa saat lightbox ditulis dari nol.
 *
 * Keadaannya dipegang pemanggil (`aktif`), karena pemicunya, kartu di kisi,
 * tinggal di sana.
 */
export function LightboxFoto({
  galeri,
  aktif,
  setAktif,
}: {
  galeri: readonly ImageData[];
  aktif: number | null;
  setAktif: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const jumlah = galeri.length;
  const foto = aktif === null ? null : galeri[aktif];

  /* `showModal()` tidak bisa dipanggil saat render, jadi keadaan React-lah yang
     memimpin dan elemennya menyusul di efek. Arahnya sengaja satu ini saja:
     kalau dialog dibuka dan ditutup dari dua tempat, keduanya akan berebut. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (aktif !== null && !dialog.open) dialog.showModal();
    else if (aktif === null && dialog.open) dialog.close();
  }, [aktif]);

  /* Lapisan atas menghalangi klik, tapi tidak menghentikan gulir halaman di
     belakangnya, tanpa ini foto besar ikut melayang saat pembaca menggulir. */
  useEffect(() => {
    if (aktif === null) return;
    const semula = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = semula;
    };
  }, [aktif]);

  const geser = useCallback(
    (langkah: number) => {
      setAktif((s) => (s === null ? s : (s + langkah + jumlah) % jumlah));
    },
    [jumlah, setAktif],
  );

  const padaTombol = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        geser(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        geser(1);
      }
    },
    [geser],
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setAktif(null)}
      onKeyDown={padaTombol}
      /* Latar gelapnya adalah tombol tutup terbesar di layar. Klik hanya
         dianggap mengenai latar bila sasarannya benar-benar elemen dialog
         itu sendiri, bukan salah satu isinya. */
      onClick={(e) => {
        if (e.target === dialogRef.current) setAktif(null);
      }}
      aria-label="Foto dokumentasi diperbesar"
      className={cn(
        "m-0 max-h-none max-w-none bg-transparent p-4 text-white md:p-8",
        "h-full w-full place-items-center overscroll-contain backdrop:bg-brand-950/96",
        "open:grid",
      )}
    >
      {foto ? (
        <figure className="pointer-events-none flex max-h-full w-full max-w-4xl flex-col items-center gap-4">
          <Image
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            width={foto.width}
            height={foto.height}
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="max-h-[62vh] w-auto rounded-2xl object-contain shadow-lift"
          />

          <figcaption className="pointer-events-auto flex w-full flex-col items-center gap-3 text-center">
            {/* Tinggi dasar dua baris: keterangan foto panjangnya berbeda-beda,
                dan tanpa ini tombol maju-mundur ikut naik-turun setiap kali
                foto berganti, persis di bawah jari yang sedang menekannya. */}
            <p className="flex min-h-10 max-w-2xl items-center text-sm leading-relaxed text-pretty text-white/80">
              {foto.alt}
            </p>

            <div className="flex items-center gap-2">
              <TombolLightbox
                label="Foto sebelumnya"
                putar
                onClick={() => geser(-1)}
                nonaktif={jumlah < 2}
              />
              <span className="min-w-16 text-xs font-semibold tracking-[0.1em] text-white/60 uppercase">
                {(aktif ?? 0) + 1} / {jumlah}
              </span>
              <TombolLightbox
                label="Foto berikutnya"
                onClick={() => geser(1)}
                nonaktif={jumlah < 2}
              />
            </div>
          </figcaption>
        </figure>
      ) : null}

      <button
        type="button"
        onClick={() => setAktif(null)}
        aria-label="Tutup foto"
        className={cn(
          "absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full md:top-6 md:right-6",
          "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
          "transition-colors duration-150 hover:bg-white/20",
          "outline-offset-2 focus-visible:outline-2 focus-visible:outline-white",
        )}
      >
        <Icon nama="tutup" className="size-5" />
      </button>
    </dialog>
  );
}

function TombolLightbox({
  label,
  putar = false,
  onClick,
  nonaktif,
}: {
  label: string;
  putar?: boolean;
  onClick: () => void;
  nonaktif: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={nonaktif}
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full",
        "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
        "transition-colors duration-150 hover:bg-white/20",
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-white",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <Icon nama="panah" className={cn("size-5", putar && "rotate-180")} />
    </button>
  );
}
