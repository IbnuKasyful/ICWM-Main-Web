import { cn } from "@/lib/cn";

/** Lambang yayasan: bintang delapan — motif geometri yang dipakai di seluruh situs. */
export function Lambang({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <rect width="40" height="40" rx="11" fill="currentColor" />
      <g stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <rect x="11" y="11" width="18" height="18" />
        <rect x="11" y="11" width="18" height="18" transform="rotate(45 20 20)" />
        <circle cx="20" cy="20" r="3.4" />
      </g>
    </svg>
  );
}

export function Wordmark({
  nama,
  keterangan,
  terang = false,
  className,
}: {
  nama: string;
  keterangan?: string;
  terang?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Lambang className={terang ? "text-brand-600" : "text-brand-700"} />
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
