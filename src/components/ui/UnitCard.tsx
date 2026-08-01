import Image from "next/image";
import Link from "next/link";

import { Badge, TitikStatus } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { labelGender, labelJenjang, labelLokasi, labelModel, labelStatusPpdb } from "@/lib/format";
import type { ImageData, Unit } from "@/lib/schemas";
import { cn } from "@/lib/cn";

function nadaStatus(status: Unit["status_ppdb"]) {
  if (status === "buka") return { badge: "sukses", titik: "hidup" } as const;
  if (status === "segera") return { badge: "peringatan", titik: "tunggu" } as const;
  return { badge: "mati", titik: "mati" } as const;
}

/**
 * PRD §9.2 — kartu wajib menampilkan nama, deskripsi singkat, jenjang, gender,
 * lokasi, dan status PPDB, serta MENAUT KE `/program/[slug]`, bukan langsung ke
 * subdomain unit: pengunjung belum memutuskan pada tahap ini.
 *
 * Susunannya: panel gambar di atas (status PPDB melayang di atasnya, garis warna
 * aksen unit di kaki panel), lalu nama, deskripsi, baris fakta keputusan —
 * biaya, periode, lokasi — penanda taksonomi, dan satu ajakan selebar kartu.
 * Biaya sengaja ditaruh paling depan pada baris fakta: itu pertanyaan pertama
 * hampir semua wali santri.
 */
export function UnitCard({
  unit,
  gambar,
  prioritas = false,
  className,
}: {
  unit: Unit;
  /** Hero `unit_profil`. Null berarti unit belum punya gambar profil. */
  gambar?: ImageData | null | undefined;
  /** Hanya untuk kartu di atas lipatan, agar LCP tetap terjaga (PRD §12). */
  prioritas?: boolean;
  className?: string;
}) {
  const nada = nadaStatus(unit.status_ppdb);

  return (
    <li
      className={cn(
        "group relative flex flex-col rounded-2xl border border-line bg-white p-2 shadow-soft transition duration-200",
        "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
        "focus-within:-translate-y-0.5 focus-within:shadow-card",
        className,
      )}
      style={{ ["--unit-accent" as string]: unit.warna_aksen }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-mist-100">
        {gambar ? (
          <Image
            src={gambar.src}
            alt={gambar.alt}
            width={gambar.width}
            height={gambar.height}
            priority={prioritas}
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="block size-full"
            style={{ backgroundColor: "var(--unit-accent)" }}
          />
        )}

        <span className="absolute top-3 left-3">
          <Badge
            nada={nada.badge}
            ikon={<TitikStatus nada={nada.titik} />}
            className="border-white/70 bg-white/90 shadow-soft backdrop-blur-sm"
          >
            {labelStatusPpdb[unit.status_ppdb]}
          </Badge>
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-4">
        <h3 className="font-display text-lg leading-snug font-semibold text-balance text-ink">
          {/* Seluruh kartu dapat diklik, tetapi hanya judul yang menjadi tautan
              sungguhan agar teknologi bantu membacakan satu target yang jelas. */}
          <Link
            href={`/program/${unit.slug}`}
            className="after:absolute after:inset-0 hover:text-brand-700"
          >
            {unit.nama_lengkap}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-pretty text-ink-muted">
          {unit.deskripsi_singkat}
        </p>

        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Icon nama="uang" className="size-4 text-brand-600" />
            <dt className="sr-only">Kisaran biaya</dt>
            <dd className="font-semibold text-ink">{unit.kisaran_biaya}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon nama="jam" className="size-4 text-ink-subtle" />
            <dt className="sr-only">Periode PPDB</dt>
            <dd className="text-ink-muted">{unit.periode_ppdb}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon nama="pin" className="size-4 text-ink-subtle" />
            <dt className="sr-only">Lokasi kampus</dt>
            <dd className="text-ink-muted">{labelLokasi[unit.lokasi_kampus]}</dd>
          </div>
        </dl>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <Badge
            nada="netral"
            ikon={
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ backgroundColor: "var(--unit-accent)" }}
              />
            }
          >
            {labelJenjang[unit.jenjang]}
          </Badge>
          <Badge nada="netral">{labelGender[unit.gender]}</Badge>
          <Badge nada="netral">{labelModel[unit.model_belajar]}</Badge>
        </div>

        {/* Tombol semu: tautan sungguhan ada di judul dan sudah menutupi seluruh
            kartu, jadi elemen ini hanya penanda arah bagi mata. */}
        <div className="mt-auto -mx-3.5 border-t border-line px-3.5 pt-3.5 pb-1">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-700/20 bg-white",
              "text-sm font-semibold text-brand-800 transition-colors duration-150",
              "group-hover:border-brand-700 group-hover:bg-brand-700 group-hover:text-white",
              "group-focus-within:border-brand-700 group-focus-within:bg-brand-700 group-focus-within:text-white",
            )}
          >
            Lihat profil unit
            <Icon nama="panahKanan" className="size-4" tebal={2.2} />
          </span>
        </div>
      </div>
    </li>
  );
}

/** Varian ringkas untuk blok "jaringan unit" di beranda. */
export function UnitCardRingkas({ unit }: { unit: Unit }) {
  return (
    <li
      className="group relative flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
      style={{ ["--unit-accent" as string]: unit.warna_aksen }}
    >
      {unit.logo ? (
        <Image
          src={unit.logo.src}
          alt=""
          width={unit.logo.width}
          height={unit.logo.height}
          sizes="36px"
          className="size-9 shrink-0 object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="size-9 shrink-0 rounded-lg opacity-90"
          style={{ backgroundColor: "var(--unit-accent)" }}
        />
      )}
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-ink">
          <Link href={`/program/${unit.slug}`} className="after:absolute after:inset-0">
            {unit.nama_pendek}
          </Link>
        </h3>
        <p className="truncate text-xs text-ink-subtle">
          {labelJenjang[unit.jenjang]} · {labelLokasi[unit.lokasi_kampus]}
        </p>
      </div>
      <Icon
        nama="panahKanan"
        className="ml-auto size-4 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
      />
    </li>
  );
}
