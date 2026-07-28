import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * PRD §9.2, §9.5, §18 — keadaan kosong wajib berisi pesan yang membantu,
 * bukan halaman kosong. Komponen ini dipakai setiap daftar tanpa kecuali.
 */
export function EmptyState({
  judul,
  keterangan,
  ikon = "info",
  aksi,
  className,
  children,
}: {
  judul: string;
  keterangan: string;
  ikon?: NamaIkon;
  aksi?: { label: string; href: string };
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line-strong bg-mist-50 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-brand-600 ring-1 ring-line">
        <Icon nama={ikon} className="size-6" />
      </span>
      <h3 className="font-display text-display-sm text-ink">{judul}</h3>
      <p className="max-w-md text-sm leading-relaxed text-pretty text-ink-muted">{keterangan}</p>
      {children}
      {aksi ? (
        <ButtonLink href={aksi.href} varian="garis" ukuran="sm" className="mt-1">
          {aksi.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
