import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { labelCategory, labelLokasi, tanggal, tanggalPendek } from "@/lib/format";
import type { Post } from "@/lib/schemas";
import { cn } from "@/lib/cn";

/**
 * Kartu tulisan. `prioritas` hanya untuk kartu yang tampil di atas lipatan,
 * agar LCP tetap di bawah anggaran (PRD §12).
 */
export function PostCard({
  post,
  namaUnit,
  prioritas = false,
  className,
}: {
  post: Post;
  namaUnit?: string | undefined;
  prioritas?: boolean;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition duration-200",
        "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
        "focus-within:-translate-y-0.5 focus-within:shadow-card",
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-mist-100">
        <Image
          src={post.gambar.src}
          alt={post.gambar.alt}
          width={post.gambar.width}
          height={post.gambar.height}
          priority={prioritas}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3">
          <Badge nada="brand" className="bg-white/95 backdrop-blur-sm">
            {labelCategory[post.category]}
          </Badge>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-subtle">
          <time dateTime={post.tanggal}>{tanggalPendek(post.tanggal)}</time>
          <span aria-hidden="true">·</span>
          <span>{labelLokasi[post.lokasi]}</span>
          {namaUnit ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{namaUnit}</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-2 font-display text-lg leading-snug font-semibold text-balance text-ink">
          <Link
            href={`/informasi/${post.slug}`}
            className="after:absolute after:inset-0 hover:text-brand-700"
          >
            {post.judul}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-pretty text-ink-muted">
          {post.ringkasan}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Baca selengkapnya
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </li>
  );
}

/** Inisial penulis — dipakai sebagai avatar, sebab `post` tidak memuat foto penulis. */
function inisial(nama: string): string {
  return nama
    .split(/\s+/)
    .filter((k) => /\p{L}/u.test(k[0] ?? ""))
    .slice(0, 2)
    .map((k) => k[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Kartu kabar untuk kisi dua kolom di beranda.
 *
 * Bentuknya melebar: gambar persegi di kiri dengan penanda topik di pojoknya,
 * lalu judul, ringkasan, dan baris penulis + tanggal di kanan. Di bawah 640px
 * kartu menumpuk (gambar di atas) karena lebarnya tidak cukup untuk dua kolom
 * teks. Keenam kartu memakai bentuk yang sama supaya kisinya rata.
 *
 * Seluruh kartu adalah satu tautan (`after:absolute` pada judul), jadi tombol
 * bundar di kaki kartu hanya penanda arah dan disembunyikan dari pembaca layar.
 */
export function PostCardKabar({
  post,
  prioritas = false,
  className,
}: {
  post: Post;
  prioritas?: boolean;
  className?: string;
}) {
  const tanda = post.topik[0] ?? labelCategory[post.category];

  return (
    <li
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border border-line bg-white p-3 shadow-soft transition duration-200",
        "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
        "focus-within:-translate-y-0.5 focus-within:shadow-card",
        "sm:flex-row sm:items-stretch sm:gap-5",
        className,
      )}
    >
      {/* max-w menahan gambar tetap proporsional saat kartu dipakai satu kolom
          penuh (arsip informasi); di kisi beranda batas ini tidak pernah kena. */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-mist-100 sm:aspect-square sm:w-[38%] sm:max-w-56">
        <Image
          src={post.gambar.src}
          alt={post.gambar.alt}
          width={post.gambar.width}
          height={post.gambar.height}
          priority={prioritas}
          sizes="(min-width: 1024px) 230px, (min-width: 640px) 38vw, 100vw"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full border border-white/25 bg-ink/45 px-3 py-1 text-xs font-semibold tracking-tight text-white backdrop-blur-sm">
          #{tanda.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 sm:px-0 sm:py-2 sm:pr-3">
        <h3 className="font-display text-lg leading-snug font-semibold text-balance text-ink lg:text-xl">
          <Link
            href={`/informasi/${post.slug}`}
            className="after:absolute after:inset-0 hover:text-brand-700"
          >
            {post.judul}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-pretty text-ink-muted">
          {post.ringkasan}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-brand-100"
            >
              {inisial(post.penulis)}
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold text-ink">Oleh {post.penulis}</span>
              <time dateTime={post.tanggal} className="mt-0.5 text-xs text-ink-subtle">
                {tanggal(post.tanggal)}
              </time>
            </span>
          </div>

          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-0.5"
          >
            <Icon nama="panahKanan" className="size-4" tebal={2.2} />
          </span>
        </div>
      </div>
    </li>
  );
}

/** Baris ringkas tanpa gambar — untuk daftar terkait di halaman dalam. */
export function PostBaris({ post }: { post: Post }) {
  return (
    <li className="group relative border-b border-line py-4 last:border-b-0">
      <div className="flex items-center gap-2 text-xs text-ink-subtle">
        <Badge nada="netral">{labelCategory[post.category]}</Badge>
        <time dateTime={post.tanggal}>{tanggalPendek(post.tanggal)}</time>
      </div>
      <h3 className="mt-2 font-display text-base leading-snug font-semibold text-ink">
        <Link
          href={`/informasi/${post.slug}`}
          className="after:absolute after:inset-0 hover:text-brand-700"
        >
          {post.judul}
        </Link>
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{post.ringkasan}</p>
    </li>
  );
}
