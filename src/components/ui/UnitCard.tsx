import Image from "next/image";
import Link from "next/link";

import { Badge, TitikStatus } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { labelGender, labelJenjang, labelLokasi, labelModel, labelStatusPpdb } from "@/lib/format";
import type { Unit } from "@/lib/schemas";
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
 */
export function UnitCard({ unit, className }: { unit: Unit; className?: string }) {
  const nada = nadaStatus(unit.status_ppdb);

  return (
    <li
      className={cn(
        "group relative flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition duration-200",
        "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
        "focus-within:-translate-y-0.5 focus-within:shadow-card",
        className,
      )}
      style={{ ["--unit-accent" as string]: unit.warna_aksen }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-0.5 rounded-full opacity-70"
        style={{ backgroundColor: "var(--unit-accent)" }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge nada="brand">{labelJenjang[unit.jenjang]}</Badge>
        <Badge nada="netral">{labelGender[unit.gender]}</Badge>
      </div>

      <h3 className="mt-4 font-display text-xl leading-snug font-semibold text-ink">
        {/* Seluruh kartu dapat diklik, tetapi hanya judul yang menjadi tautan
            sungguhan agar teknologi bantu membacakan satu target yang jelas. */}
        <Link href={`/program/${unit.slug}`} className="after:absolute after:inset-0">
          {unit.nama_lengkap}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-pretty text-ink-muted">
        {unit.deskripsi_singkat}
      </p>

      <dl className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm">
        <div className="flex items-center gap-2 text-ink-muted">
          <Icon nama="pin" className="size-4 text-brand-500" />
          <dt className="sr-only">Lokasi kampus</dt>
          <dd>
            {labelLokasi[unit.lokasi_kampus]} · {labelModel[unit.model_belajar]}
          </dd>
        </div>
        <div className="flex items-center gap-2 text-ink-muted">
          <Icon nama="jam" className="size-4 text-brand-500" />
          <dt className="sr-only">Periode PPDB</dt>
          <dd className="line-clamp-1">{unit.periode_ppdb}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Badge nada={nada.badge} ikon={<TitikStatus nada={nada.titik} />}>
          {labelStatusPpdb[unit.status_ppdb]}
        </Badge>
        <span
          aria-hidden="true"
          className="inline-flex size-8 items-center justify-center rounded-full border border-line text-brand-700 transition-colors group-hover:border-brand-300 group-hover:bg-brand-50"
        >
          <Icon nama="panahKanan" className="size-4" />
        </span>
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
