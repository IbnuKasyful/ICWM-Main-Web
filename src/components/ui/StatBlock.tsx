import Link from "next/link";

import { angka } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Capaian } from "@/lib/schemas";

/**
 * PRD §9.1 blok 3 — 4–6 angka capaian.
 *
 * Tiap angka berdiri sebagai kartu terpisah dan rata tengah. Saat disentuh
 * kursor, kartu terangkat dan seluruh bidangnya terisi warna primer: angka,
 * label, dan keterangannya berbalik menjadi terang sekaligus. Satu kartu aktif
 * pada satu waktu — itu yang membuat deret angka ini bisa dibaca satu per satu,
 * bukan sebagai dinding angka.
 *
 * Bila `tautan` diberikan, sebuah pil ajakan muncul di kaki kartu. Pil itu
 * selalu ikut menempati ruang meski tak terlihat, supaya tinggi baris kisi
 * tidak melompat saat kursor berpindah kartu.
 */
export function StatBlock({
  data,
  terang = false,
  tautan,
  className,
}: {
  data: readonly Capaian[];
  terang?: boolean;
  /** Tujuan pil ajakan di kaki kartu; tanpa ini pilnya tidak dirender. */
  tautan?: string;
  className?: string;
}) {
  if (data.length === 0) return null;

  return (
    <dl className={cn("grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6", className)}>
      {data.map((item) => (
        <div
          key={item.label}
          className={cn(
            "group relative flex flex-col items-center gap-1.5 rounded-2xl border p-5 text-center md:p-6",
            "transition duration-300 ease-out",
            "hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift",
            terang
              ? "border-white/15 bg-white/[0.06] hover:border-accent-400 hover:bg-accent-500 focus-within:border-accent-400 focus-within:bg-accent-500"
              : "border-line bg-white shadow-soft hover:border-brand-600 hover:bg-brand-600 focus-within:border-brand-600 focus-within:bg-brand-600",
          )}
        >
          <dd
            className={cn(
              "font-display text-display-sm tabular-nums transition-colors duration-300 md:text-display-md",
              terang
                ? "text-accent-300 group-hover:text-brand-950 group-focus-within:text-brand-950"
                : "text-brand-700 group-hover:text-white group-focus-within:text-white",
            )}
          >
            {angka(item.nilai)}
            {item.satuan ? <span className="text-[0.6em]">{item.satuan}</span> : null}
            {item.nilai >= 100 ? (
              /* Sian muda hanya lolos kontras di latar gelap; di latar terang
                 pakai accent-700. Saat kartu terisi warna, keduanya bertukar
                 peran mengikuti latar barunya. */
              <span
                className={
                  terang
                    ? "text-accent-400 group-hover:text-brand-800 group-focus-within:text-brand-800"
                    : "text-accent-700 group-hover:text-accent-200 group-focus-within:text-accent-200"
                }
              >
                +
              </span>
            ) : null}
          </dd>

          <dt
            className={cn(
              "text-sm font-semibold transition-colors duration-300",
              terang
                ? "text-white group-hover:text-brand-950 group-focus-within:text-brand-950"
                : "text-ink group-hover:text-white group-focus-within:text-white",
            )}
          >
            {item.label}
          </dt>

          {item.keterangan ? (
            <p
              className={cn(
                "text-xs leading-relaxed text-pretty transition-colors duration-300",
                terang
                  ? "text-white/55 group-hover:text-brand-900/75 group-focus-within:text-brand-900/75"
                  : "text-ink-subtle group-hover:text-white/75 group-focus-within:text-white/75",
              )}
            >
              {item.keterangan}
            </p>
          ) : null}

          {tautan ? (
            /* Pil ini tautan sungguhan dan menutupi seluruh kartu lewat
               `after`, jadi kartu dapat diklik di mana saja tanpa menambah
               target baca bagi teknologi bantu. */
            <Link
              href={tautan}
              className={cn(
                "mt-auto pt-3.5 opacity-0 transition-opacity duration-300 after:absolute after:inset-0",
                "group-hover:opacity-100 group-focus-within:opacity-100",
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold",
                  terang ? "bg-brand-950 text-white" : "bg-white text-brand-700",
                )}
              >
                Lihat rincian
                <span className="sr-only"> {item.label}</span>
              </span>
            </Link>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
