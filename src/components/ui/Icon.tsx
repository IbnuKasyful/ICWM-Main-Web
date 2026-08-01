import { cn } from "@/lib/cn";

/**
 * Set ikon garis, ditulis inline agar tidak menambah dependensi (PRD §6) dan
 * tidak ada permintaan jaringan tambahan (PRD §12).
 *
 * Ikon selalu dekoratif: beri label pada elemen pembungkusnya, bukan di sini.
 */
export const jalurIkon = {
  sekolah: "M3 10.5 12 4l9 6.5M5.5 9.6V19h13V9.6M9.5 19v-5h5v5",
  quran: "M5 5.5A1.5 1.5 0 0 1 6.5 4H19v13H6.5A1.5 1.5 0 0 0 5 18.5v-13ZM5 18.5A1.5 1.5 0 0 0 6.5 20H19M9 8h6M9 11h4",
  donasi:
    "M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z",
  kerjasama: "M8 12.5 10.5 15l5.5-5.5M4 8.5 8 4.5l3 2 2-2 4 4M4 8.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5",
  yayasan: "M4 10.5 12 5l8 5.5M6 10.5V19h12v-8.5M4 19h16M9.5 19v-4.5h5V19",
  panah: "M5 12h13m-5.5-5.5L18.5 12l-6 5.5",
  panahKanan: "m9 6 6 6-6 6",
  panahBawah: "m6 9 6 6 6-6",
  cari: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5.5-1.5L21 21",
  menu: "M4 7h16M4 12h16M4 17h16",
  tutup: "m6 6 12 12M18 6 6 18",
  unduh: "M12 4v10m0 0 4-4m-4 4-4-4M5 19h14",
  whatsapp:
    "M4.5 19.5 5.7 15.6A7.6 7.6 0 1 1 8.6 18.4l-4.1 1.1Zm5-9.6c-.2 1.6 2.2 4.6 4.4 4.9.7.1 1.4-.4 1.6-1l-1.7-1-.8.7c-.9-.4-1.7-1.2-2.1-2.1l.7-.8-1-1.7c-.6.1-1 .5-1.1 1Z",
  surel: "M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Zm.5.5 7.5 5.5L19.5 8",
  telepon:
    "M5 5.5c0-.8.7-1.5 1.5-1.5h2L10 8l-2 1.5c.9 2.2 2.4 3.7 4.5 4.5L14 12l4 1.5v2c0 .8-.7 1.5-1.5 1.5C10.6 17 5 11.4 5 5.5Z",
  pin: "M12 21s6.5-5.6 6.5-10a6.5 6.5 0 1 0-13 0c0 4.4 6.5 10 6.5 10Zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  kalender: "M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9ZM8 4v5M16 4v5M4 11.5h16",
  centang: "m5 12.5 4.5 4.5L19 7",
  salin: "M9 9V6.5A1.5 1.5 0 0 1 10.5 5h7A1.5 1.5 0 0 1 19 6.5v7a1.5 1.5 0 0 1-1.5 1.5H15M5 10.5A1.5 1.5 0 0 1 6.5 9h7a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 17.5v-7Z",
  keluar: "M14 5h5v5M19 5l-8 8M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10",
  dokumen: "M6 4.5A1.5 1.5 0 0 1 7.5 3h6L18 7.5v12A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5v-15ZM13 3v5h5M9 13h6M9 16.5h4",
  perisai: "M12 3.5 5 6v6c0 4 3 7.2 7 8.5 4-1.3 7-4.5 7-8.5V6l-7-2.5Zm-2.5 8.7 2 2 3.5-4",
  bintang: "m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8L12 4Z",
  orang: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6.5 8c.6-3.2 3.3-5 6.5-5s5.9 1.8 6.5 5",
  jam: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12v4.2l3 1.8",
  uang:
    "M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v7a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-7Zm9 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM6.5 10.5v3M17.5 10.5v3",
  info: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-8.5V16m0-7.5v.6",
  filter: "M4 6h16M7 12h10M10 18h4",
  gambar: "M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Zm0 7 4-4 4.5 4.5M14 13l2-2 4 4M15 10h.01",
} as const;

export type NamaIkon = keyof typeof jalurIkon;

export function Icon({
  nama,
  className,
  tebal = 1.7,
}: {
  nama: NamaIkon;
  className?: string;
  tebal?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={tebal}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
    >
      <path d={jalurIkon[nama]} />
    </svg>
  );
}

/** Ikon dalam kotak lembut — pola kartu pada referensi desain. */
export function IconChip({
  nama,
  className,
  nada = "brand",
}: {
  nama: NamaIkon;
  className?: string;
  nada?: "brand" | "aksen" | "terang";
}) {
  const nadaKelas =
    nada === "aksen"
      ? "bg-accent-50 text-accent-700 ring-accent-100"
      : nada === "terang"
        ? "bg-white/10 text-white ring-white/15"
        : "bg-brand-50 text-brand-700 ring-brand-100";
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-xl ring-1 ring-inset",
        nadaKelas,
        className,
      )}
    >
      <Icon nama={nama} />
    </span>
  );
}
