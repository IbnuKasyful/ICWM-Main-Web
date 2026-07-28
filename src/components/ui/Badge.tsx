import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Nada = "netral" | "brand" | "aksen" | "sukses" | "peringatan" | "mati" | "aksen-unit";

const nadaKelas: Record<Nada, string> = {
  netral: "bg-mist-100 text-ink-muted border-line-strong",
  brand: "bg-brand-50 text-brand-800 border-brand-100",
  aksen: "bg-accent-50 text-accent-800 border-accent-100",
  sukses: "bg-brand-50 text-brand-700 border-brand-200",
  peringatan: "bg-accent-50 text-accent-700 border-accent-200",
  mati: "bg-mist-100 text-ink-subtle border-line-strong",
  /** Memakai warna aksen unit yang di-set lewat CSS variable. */
  "aksen-unit": "border-transparent text-white",
};

export function Badge({
  children,
  nada = "netral",
  className,
  ikon,
}: {
  children: ReactNode;
  nada?: Nada;
  className?: string;
  ikon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-tight",
        nadaKelas[nada],
        className,
      )}
      style={nada === "aksen-unit" ? { backgroundColor: "var(--unit-accent)" } : undefined}
    >
      {ikon}
      {children}
    </span>
  );
}

/** Titik status kecil untuk badge PPDB. */
export function TitikStatus({ nada }: { nada: "hidup" | "tunggu" | "mati" }) {
  const warna =
    nada === "hidup"
      ? "bg-brand-500"
      : nada === "tunggu"
        ? "bg-accent-400"
        : "bg-ink-subtle";
  return <span aria-hidden="true" className={cn("size-1.5 rounded-full", warna)} />;
}
