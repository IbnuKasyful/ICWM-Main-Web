import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { labelJenisDonasi, tanggal } from "@/lib/format";
import type { ProgramDonasi } from "@/lib/schemas";

/** PRD §9.4 — setiap program menampilkan target, terkumpul, dan progres. */
export function ProgramDonasiCard({ program }: { program: ProgramDonasi }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card focus-within:shadow-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-sand-100">
        <Image
          src={program.gambar.src}
          alt={program.gambar.alt}
          width={program.gambar.width}
          height={program.gambar.height}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 flex gap-2">
          <Badge nada="emas" className="bg-white/95 backdrop-blur-sm">
            {labelJenisDonasi[program.jenis]}
          </Badge>
          {program.mendesak ? (
            <Badge nada="peringatan" className="bg-accent-500 text-white">
              Mendesak
            </Badge>
          ) : null}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg leading-snug font-semibold text-balance text-ink">
          <Link href={`/donasi/${program.slug}`} className="after:absolute after:inset-0 hover:text-brand-700">
            {program.judul}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-ink-muted">
          {program.ringkasan}
        </p>

        <Progress terkumpul={program.terkumpul} target={program.target} className="mt-5" ringkas />

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-xs">
          <div>
            <dt className="text-ink-subtle">Penerima manfaat</dt>
            <dd className="mt-0.5 font-semibold text-ink">{program.penerima_manfaat}</dd>
          </div>
          {program.batas_waktu ? (
            <div>
              <dt className="text-ink-subtle">Batas waktu</dt>
              <dd className="mt-0.5 font-semibold text-ink">{tanggal(program.batas_waktu)}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </li>
  );
}
