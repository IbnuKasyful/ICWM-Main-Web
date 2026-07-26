import type { ReactNode } from "react";

import { Breadcrumb, type JejakItem } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/cn";

/** Kepala halaman dalam: remah roti, satu `h1`, dan kalimat pengantar. */
export function PageHeader({
  jejak,
  atas,
  judul,
  keterangan,
  nada = "pasir",
  children,
  aksi,
}: {
  jejak: JejakItem[];
  atas?: string;
  judul: string;
  keterangan?: string;
  nada?: "pasir" | "gelap";
  children?: ReactNode;
  aksi?: ReactNode;
}) {
  const gelap = nada === "gelap";

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b",
        gelap ? "border-white/10 bg-brand-950 text-white" : "border-line-warm bg-sand-50",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-24 -right-24 size-72 rounded-full blur-3xl",
          gelap ? "bg-brand-700/30" : "bg-accent-200/30",
        )}
      />
      <div className="container-page relative py-10 md:py-14">
        <Breadcrumb jejak={jejak} terang={gelap} />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {atas ? (
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase",
                  gelap
                    ? "border-white/20 bg-white/10 text-accent-200"
                    : "border-accent-200 bg-white text-accent-700",
                )}
              >
                {atas}
              </span>
            ) : null}
            <h1
              className={cn(
                "mt-4 font-display text-display-md text-balance md:text-display-lg",
                gelap ? "text-white" : "text-ink",
              )}
            >
              {judul}
            </h1>
            {keterangan ? (
              <p
                className={cn(
                  "mt-4 max-w-2xl text-base leading-relaxed text-pretty",
                  gelap ? "text-white/70" : "text-ink-muted",
                )}
              >
                {keterangan}
              </p>
            ) : null}
            {children}
          </div>

          {aksi ? <div className="flex shrink-0 flex-wrap gap-3">{aksi}</div> : null}
        </div>
      </div>
    </div>
  );
}
