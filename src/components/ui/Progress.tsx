import { persen, rupiahRingkas } from "@/lib/format";
import { cn } from "@/lib/cn";

/** PRD §9.4 — setiap program donasi menampilkan target, terkumpul, dan progres. */
export function Progress({
  terkumpul,
  target,
  className,
  ringkas = false,
}: {
  terkumpul: number;
  target: number;
  className?: string;
  ringkas?: boolean;
}) {
  const capaian = persen(terkumpul, target);
  const tuntas = target > 0 && terkumpul >= target;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink">
          {rupiahRingkas(terkumpul)}
          <span className="font-normal text-ink-subtle"> terkumpul</span>
        </span>
        {target > 0 ? (
          <span className="text-sm text-ink-muted">
            dari <span className="font-semibold text-ink">{rupiahRingkas(target)}</span>
          </span>
        ) : (
          <span className="text-sm text-ink-subtle">program berkelanjutan</span>
        )}
      </div>

      {target > 0 ? (
        <>
          <div
            role="progressbar"
            aria-valuenow={capaian}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progres penghimpunan ${capaian} persen`}
            className="h-2 w-full overflow-hidden rounded-full bg-sand-200"
          >
            <div
              className={cn("h-full rounded-full", tuntas ? "bg-brand-600" : "bg-accent-400")}
              style={{ width: `${Math.max(capaian, 2)}%` }}
            />
          </div>
          {!ringkas ? (
            <p className="text-xs text-ink-subtle">
              {tuntas
                ? "Target terpenuhi — donasi berikutnya dialihkan ke gelombang selanjutnya."
                : `Tercapai ${capaian}% dari target.`}
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
