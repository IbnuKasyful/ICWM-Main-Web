"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * PRD §9.4, tautan salin untuk nomor rekening.
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

  // Ikon telanjang, bukan tombol berbingkai: nomor rekening yang harus dibaca
  // dulu, aksi salinnya cukup menemani. Tetap elemen <button> agar bisa
  // dijangkau papan ketik, indikator fokusnya datang dari globals.css.
  return (
    <button
      type="button"
      onClick={salin}
      aria-label={tersalin ? "Nomor tersalin" : gagal ? "Salin manual" : label}
      title={gagal ? "Gagal menyalin, salin manual" : label}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-white hover:text-brand-700",
        tersalin && "text-brand-600",
        className,
      )}
    >
      <Icon nama={tersalin ? "centang" : "salin"} className="size-4" />
      <span role="status" aria-live="polite" className="sr-only">
        {tersalin ? `${teks} tersalin ke papan klip` : gagal ? "Gagal menyalin otomatis" : ""}
      </span>
    </button>
  );
}
