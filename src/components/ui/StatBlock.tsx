import { angka } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Capaian } from "@/lib/schemas";

/** PRD §9.1 blok 3 — 4–6 angka capaian. */
export function StatBlock({
  data,
  terang = false,
  className,
}: {
  data: readonly Capaian[];
  terang?: boolean;
  className?: string;
}) {
  if (data.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-3 lg:grid-cols-6",
        terang ? "border-white/15 bg-white/15" : "border-line bg-line",
        className,
      )}
    >
      {data.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col gap-1 p-5 md:p-6",
            terang ? "bg-brand-950" : "bg-white",
          )}
        >
          <dd
            className={cn(
              "font-display text-display-sm tabular-nums md:text-display-md",
              terang ? "text-accent-300" : "text-brand-700",
            )}
          >
            {angka(item.nilai)}
            {item.satuan ? <span className="text-[0.6em]">{item.satuan}</span> : null}
            {item.nilai >= 100 ? <span className="text-accent-400">+</span> : null}
          </dd>
          <dt
            className={cn(
              "text-sm font-semibold",
              terang ? "text-white" : "text-ink",
            )}
          >
            {item.label}
          </dt>
          {item.keterangan ? (
            <p className={cn("text-xs leading-relaxed", terang ? "text-white/55" : "text-ink-subtle")}>
              {item.keterangan}
            </p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
