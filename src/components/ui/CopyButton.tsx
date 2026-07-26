"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * PRD §9.4 — tautan salin untuk nomor rekening.
 *
 * Ini salah satu dari sedikit tempat yang benar-benar membutuhkan
 * interaktivitas klien (PRD §18).
 */
export function CopyButton({
  teks,
  label,
  className,
}: {
  teks: string;
  label: string;
  className?: string;
}) {
  const [tersalin, setTersalin] = useState(false);
  const [gagal, setGagal] = useState(false);

  useEffect(() => {
    if (!tersalin && !gagal) return;
    const t = window.setTimeout(() => {
      setTersalin(false);
      setGagal(false);
    }, 2500);
    return () => window.clearTimeout(t);
  }, [tersalin, gagal]);

  async function salin() {
    try {
      await navigator.clipboard.writeText(teks);
      setTersalin(true);
    } catch {
      // Clipboard API bisa ditolak (izin/konteks tidak aman). Beri tahu
      // pengunjung agar mereka menyalin manual, jangan diam saja.
      setGagal(true);
    }
  }

  return (
    <button
      type="button"
      onClick={salin}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50",
        className,
      )}
    >
      <Icon nama={tersalin ? "centang" : "salin"} className="size-3.5" />
      <span>{tersalin ? "Tersalin" : gagal ? "Salin manual" : label}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {tersalin ? `${teks} tersalin ke papan klip` : gagal ? "Gagal menyalin otomatis" : ""}
      </span>
    </button>
  );
}
