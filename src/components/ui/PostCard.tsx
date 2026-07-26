import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { labelCategory, labelLokasi, tanggalPendek } from "@/lib/format";
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
      <div className="relative aspect-[3/2] overflow-hidden bg-sand-100">
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
