import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Progress } from "@/components/ui/Progress";
import { labelJenisDonasi, tanggalPendek } from "@/lib/format";
import type { ProgramDonasi } from "@/lib/schemas";
import { cn } from "@/lib/cn";

/**
 * PRD §9.4, setiap program menampilkan target, terkumpul, dan progres.
 *
 * Susunannya menyamai `UnitCard` di /program: panel gambar tersemat di dalam
 * bingkai kartu (lencana melayang di atasnya, garis aksen di kaki panel), lalu
 * judul, ringkasan, progres penghimpunan, baris fakta, dan satu ajakan selebar
 * kartu di kaki. Dua halaman ini dibaca berurutan oleh calon donatur, jadi
 * kartunya sebaiknya terasa satu keluarga.
 *
 * Seluruh gerak adalah transisi CSS pada `group`, tidak ada JavaScript yang
 * dikirim untuk kartu ini (PRD §12). Setiap keadaan `hover` dipasangkan dengan
 * `focus-within` supaya pengguna papan tuntas melihat perubahan yang sama saat
 * tautannya menerima fokus.
 */
export function ProgramDonasiCard({ program }: { program: ProgramDonasi }) {
  // Poster kampanye berbentuk potret dan judulnya ada di sepertiga atas;
  // dipangkas dari tengah, yang tersisa justru bagian yang tidak menjelaskan
  // apa pun. Foto lanskap tetap dipangkas dari tengah seperti biasa.
  const potret = program.gambar.height > program.gambar.width;

  return (
    <li
      className={cn(
        "group relative flex flex-col rounded-2xl border border-line bg-white p-2 shadow-soft transition duration-200",
        "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
        "focus-within:-translate-y-0.5 focus-within:shadow-card",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-mist-100">
        <Image
          src={program.gambar.src}
          alt={program.gambar.alt}
          width={program.gambar.width}
          height={program.gambar.height}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            potret ? "object-top" : "object-center",
          )}
        />

        <span className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge nada="aksen" className="border-white/70 bg-white/90 shadow-soft backdrop-blur-sm">
            {labelJenisDonasi[program.jenis]}
          </Badge>
          {/* Putih di atas accent-500 hanya 2,9:1, pakai accent-800. */}
          {program.mendesak ? (
            <Badge nada="peringatan" className="border-accent-800 bg-accent-800 text-white shadow-soft">
              Mendesak
            </Badge>
          ) : null}
        </span>

      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-4">
        <h3 className="font-display text-lg leading-snug font-semibold text-balance text-ink">
          {/* Seluruh kartu dapat diklik, tetapi hanya judul yang menjadi tautan
              sungguhan agar teknologi bantu membacakan satu target yang jelas. */}
          <Link
            href={`/donasi/${program.slug}`}
            className="after:absolute after:inset-0 hover:text-brand-700"
          >
            {program.judul}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-pretty text-ink-muted">
          {program.ringkasan}
        </p>

        <Progress
          terkumpul={program.terkumpul}
          target={program.target}
          satuanBiaya={program.satuan_biaya}
          className="mt-4"
          ringkas
        />

        <dl className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Icon nama="orang" className="size-4 text-brand-600" />
            <dt className="sr-only">Penerima manfaat</dt>
            <dd className="font-semibold text-ink">{program.penerima_manfaat}</dd>
          </div>
          {program.batas_waktu ? (
            <div className="flex items-center gap-1.5">
              <Icon nama="kalender" className="size-4 text-ink-subtle" />
              <dt className="sr-only">Batas waktu</dt>
              <dd className="text-ink-muted">{tanggalPendek(program.batas_waktu)}</dd>
            </div>
          ) : null}
        </dl>

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
            Rincian program
            <Icon nama="panahKanan" className="size-4" tebal={2.2} />
          </span>
        </div>
      </div>
    </li>
  );
}
