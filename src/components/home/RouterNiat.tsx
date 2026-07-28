import Link from "next/link";

import { Icon, IconChip, type NamaIkon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { routerNiat } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * PRD §9.1 blok 2 & §5.3 — lima pintu berdasarkan NIAT pengunjung.
 *
 * Kriteria penerimaan: kelima kartu dapat diakses keyboard dan memiliki label
 * yang jelas. Setiap kartu adalah satu tautan tunggal, bukan div yang diberi
 * penangan klik.
 */
export function RouterNiat() {
  return (
    <Section nada="sejuk">
      <div className="container-page">
        <JudulSeksi
          atas="Mulai dari sini"
          judul="Apa yang sedang"
          sorot="Anda cari"
          penutup="hari ini?"
          keterangan="Pilih satu pintu di bawah ini. Kami mengarahkan Anda langsung ke halaman yang tepat — tanpa perlu memahami struktur organisasi yayasan lebih dulu."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routerNiat.map((pintu, i) => (
            <li
              key={pintu.href}
              className={cn(
                // Dua kartu terakhir dilebarkan pada layar besar agar baris kedua
                // tetap seimbang dengan lima kartu.
                i === 3 && "lg:col-span-1",
                i === 4 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <Link
                href={pintu.href}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-200",
                  "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
                )}
              >
                <IconChip nama={pintu.ikon as NamaIkon} />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{pintu.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-ink-muted">
                  {pintu.deskripsi}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {pintu.aksi}
                  <Icon
                    nama="panahKanan"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    tebal={2.2}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
