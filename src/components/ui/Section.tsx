import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  nada = "putih",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  nada?: "putih" | "pasir" | "gelap";
  id?: string;
  as?: "section" | "div";
}) {
  const nadaKelas =
    nada === "pasir" ? "bg-sand-50" : nada === "gelap" ? "bg-brand-950 text-white" : "bg-white";
  return (
    <Tag id={id} className={cn("py-16 md:py-24", nadaKelas, className)}>
      {children}
    </Tag>
  );
}

/**
 * Judul seksi dua nada — pola desain inti situs ini: kalimat gelap dengan satu
 * frasa berwarna merek, disertai kalimat penjelas.
 */
export function JudulSeksi({
  atas,
  judul,
  sorot,
  penutup,
  keterangan,
  rata = "tengah",
  terang = false,
  tingkat = "h2",
  className,
}: {
  /** Label kecil di atas judul. */
  atas?: string;
  judul: string;
  /** Frasa yang diberi warna merek. */
  sorot?: string;
  /** Sisa kalimat setelah frasa yang disorot. */
  penutup?: string;
  keterangan?: string;
  rata?: "tengah" | "kiri";
  terang?: boolean;
  tingkat?: "h1" | "h2";
  className?: string;
}) {
  const Tag = tingkat;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        rata === "tengah" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {atas ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase",
            terang
              ? "border-white/20 bg-white/10 text-accent-200"
              : "border-accent-200 bg-accent-50 text-accent-700",
          )}
        >
          {atas}
        </span>
      ) : null}

      <Tag
        className={cn(
          "font-display text-display-md text-balance md:text-display-lg",
          terang ? "text-white" : "text-ink",
          rata === "tengah" ? "max-w-3xl" : "max-w-2xl",
        )}
      >
        {judul}
        {sorot ? (
          <>
            {" "}
            <span className={terang ? "text-accent-300" : "text-brand-600"}>{sorot}</span>
          </>
        ) : null}
        {penutup ? ` ${penutup}` : null}
      </Tag>

      {keterangan ? (
        <p
          className={cn(
            "text-pretty leading-relaxed",
            terang ? "max-w-2xl text-white/70" : "max-w-2xl text-ink-muted",
            rata === "tengah" ? "mx-auto" : "",
          )}
        >
          {keterangan}
        </p>
      ) : null}
    </div>
  );
}

/** Baris "judul seksi + tautan lihat semua" untuk blok daftar. */
export function KepalaDaftar({
  judul,
  sorot,
  keterangan,
  tautan,
  labelTautan,
}: {
  judul: string;
  sorot?: string;
  keterangan?: string;
  tautan?: string;
  labelTautan?: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <JudulSeksi
        judul={judul}
        {...(sorot ? { sorot } : {})}
        {...(keterangan ? { keterangan } : {})}
        rata="kiri"
      />
      {tautan && labelTautan ? (
        <Link
          href={tautan}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          {labelTautan}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
