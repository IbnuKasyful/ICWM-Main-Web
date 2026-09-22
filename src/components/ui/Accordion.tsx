import type { CSSProperties, ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Akordeon berbasis `<details>`.
 *
 * Disengaja tanpa JavaScript: dapat dibuka dengan keyboard, dirayapi mesin
 * pencari, dan tidak menambah bundel klien (PRD §12 & §14).
 *
 * Tiap pertanyaan berdiri sebagai kartunya sendiri, bukan baris dalam satu
 * kotak. Pada daftar panjang, jarak antar-kartu memberi mata tempat istirahat
 * dan membuat kartu yang terbuka terbaca sebagai yang sedang dibaca.
 */
export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

/** Jeda masuk antar-kartu. Dibatasi agar daftar panjang tidak berakhir menunggu. */
const JEDA_MAKS = 8;
const JEDA_MS = 45;

export function AccordionItem({
  pertanyaan,
  children,
  terbukaAwal = false,
  indeks = 0,
}: {
  pertanyaan: string;
  children: ReactNode;
  terbukaAwal?: boolean;
  /** Urutan kartu dalam daftar, menentukan jeda animasi masuknya. */
  indeks?: number;
}) {
  const gaya: CSSProperties = {
    animationDelay: `${Math.min(indeks, JEDA_MAKS) * JEDA_MS}ms`,
  };

  return (
    <details
      className={cn(
        "group animate-kartu-masuk relative overflow-hidden rounded-md border border-line bg-white",
        "shadow-soft transition-[box-shadow,border-color] duration-200",
        "hover:border-line-strong hover:shadow-card",
        "open:border-brand-200 open:shadow-card",
      )}
      style={gaya}
      open={terbukaAwal}
    >
      {/* Ornamen khatam yang muncul perlahan saat jawaban terbuka: penanda
          kartu aktif yang tidak menambah garis atau bidang warna baru. Wadah
          luarnya membawa gradasi peluruh supaya tesela tidak terpotong tegas
          di tepi kiri, dua topeng, jadi tidak saling menimpa. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-52 overflow-hidden opacity-0 transition-opacity duration-500 group-open:opacity-100 [mask-image:linear-gradient(to_left,black,transparent)]"
      >
        <span className="ornamen-islami absolute inset-0 text-brand-600/[0.07]" />
      </span>

      <summary
        className={cn(
          "relative flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 md:px-6",
          "font-display text-base leading-snug font-semibold text-ink transition-colors",
          "group-hover:text-brand-800 group-open:text-brand-800",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        <span className="text-pretty">{pertanyaan}</span>
        <span
          aria-hidden="true"
          className={cn(
            "mt-px inline-flex size-7 shrink-0 items-center justify-center rounded-full",
            "bg-mist-100 text-ink-subtle transition-all duration-200",
            "group-hover:bg-brand-50 group-hover:text-brand-700",
            "group-open:rotate-180 group-open:bg-brand-600 group-open:text-white",
          )}
        >
          <Icon nama="panahBawah" className="size-4" tebal={2} />
        </span>
      </summary>

      <div className="relative px-5 pb-5 md:px-6">
        <div className="animate-akordeon-buka border-t border-line pt-4 text-sm leading-relaxed text-pretty text-ink-muted">
          {children}
        </div>
      </div>
    </details>
  );
}
