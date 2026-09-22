import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Varian = "utama" | "kedua" | "garis" | "hantu" | "terang";
type Ukuran = "sm" | "md" | "lg";

const varianKelas: Record<Varian, string> = {
  utama:
    "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-soft",
  kedua:
    "bg-ink text-white hover:bg-brand-900 active:bg-brand-950 shadow-soft",
  garis:
    "border border-brand-700/25 bg-white text-brand-800 hover:border-brand-700/50 hover:bg-brand-50",
  hantu: "text-brand-800 hover:bg-brand-50",
  terang:
    "bg-white text-brand-900 hover:bg-mist-100 shadow-soft",
};

/* Tinggi ditulis sebagai `min-h` dan label boleh turun baris: di layar 320px,
   label panjang seperti "Daftar lewat situs STIU Wadi Mubarak" tidak muat satu
   baris, dan `nowrap` membuatnya menjebol lebar halaman. Selama muat, tampilan
   tetap satu baris setinggi semula. */
const ukuranKelas: Record<Ukuran, string> = {
  sm: "min-h-9 px-4 py-1.5 text-sm gap-1.5",
  md: "min-h-11 px-5 py-2 text-sm gap-2",
  lg: "min-h-13 px-6 py-2.5 text-base gap-2.5 sm:px-7",
};

const dasar =
  "inline-flex max-w-full items-center justify-center rounded-full text-center leading-snug font-semibold " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 text-balance";

type Bersama = {
  varian?: Varian;
  ukuran?: Ukuran;
  className?: string;
  children: ReactNode;
};

type TautanProps = Bersama & {
  href: string;
  /** Tautan keluar: dibuka di tab baru dengan rel yang aman. */
  eksternal?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type TombolProps = Bersama &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function ButtonLink({
  href,
  varian = "utama",
  ukuran = "md",
  className,
  children,
  eksternal = false,
  ...rest
}: TautanProps) {
  const kelas = cn(dasar, varianKelas[varian], ukuranKelas[ukuran], className);

  if (eksternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={kelas}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={kelas} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  varian = "utama",
  ukuran = "md",
  className,
  children,
  type = "button",
  ...rest
}: TombolProps) {
  return (
    <button
      type={type}
      className={cn(dasar, varianKelas[varian], ukuranKelas[ukuran], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
