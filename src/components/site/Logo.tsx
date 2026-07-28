import Image from "next/image";

import { cn } from "@/lib/cn";

/* Rasio simbol lambang, diukur dari kotak batas alfa berkas induk
   (1139 × 1608 piksel). Dipakai agar tinggi/lebar selalu sepadan. */
const RASIO = 512 / 723;

/**
 * Lambang yayasan.
 *
 * Memakai varian *simbol* (tanpa kaligrafi Arab) sesuai panduan identitas:
 * pada ukuran header, kaligrafi pada lambang utama sudah tidak terbaca.
 * Varian `terang` adalah reproduksi negatif putih — wajib di latar gelap,
 * sebab bilah biru tua lambang berwarna praktis lenyap di sana.
 */
export function Lambang({
  className,
  terang = false,
  tinggi = 36,
  prioritas = false,
}: {
  className?: string;
  terang?: boolean;
  tinggi?: number;
  /** Hanya untuk lambang di header; lambang kaki halaman ada di bawah lipatan
      sehingga tidak perlu ikut di-preload. */
  prioritas?: boolean;
}) {
  return (
    <Image
      src={terang ? "/img/logo-wm-simbol-putih.png" : "/img/logo-wm-simbol.png"}
      alt=""
      aria-hidden="true"
      width={Math.round(tinggi * RASIO)}
      height={tinggi}
      priority={prioritas}
      className={cn("w-auto", className)}
    />
  );
}

export function Wordmark({
  nama,
  keterangan,
  terang = false,
  prioritas = false,
  className,
}: {
  nama: string;
  keterangan?: string;
  terang?: boolean;
  prioritas?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Lambang terang={terang} tinggi={36} prioritas={prioritas} className="h-9" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.95rem] font-bold tracking-tight",
            terang ? "text-white" : "text-ink",
          )}
        >
          {nama}
        </span>
        {keterangan ? (
          <span
            className={cn(
              "mt-1 text-[0.68rem] font-medium tracking-[0.12em] uppercase",
              terang ? "text-white/50" : "text-ink-subtle",
            )}
          >
            {keterangan}
          </span>
        ) : null}
      </span>
    </span>
  );
}
