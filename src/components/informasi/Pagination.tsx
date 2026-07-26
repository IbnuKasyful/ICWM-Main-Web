import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * PRD §9.6 — pagination memakai TAUTAN SUNGGUHAN yang dapat dirayapi,
 * bukan tombol berbasis JavaScript.
 */
export function Pagination({
  halaman,
  totalHalaman,
  buatHref,
}: {
  halaman: number;
  totalHalaman: number;
  buatHref: (h: number) => string;
}) {
  if (totalHalaman <= 1) return null;

  const nomor = Array.from({ length: totalHalaman }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalHalaman || Math.abs(n - halaman) <= 1,
  );

  const kelasDasar =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors";

  return (
    <nav aria-label="Navigasi halaman" className="mt-12 flex items-center justify-center gap-2">
      {halaman > 1 ? (
        <Link
          href={buatHref(halaman - 1)}
          rel="prev"
          aria-label="Halaman sebelumnya"
          className={cn(kelasDasar, "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50")}
        >
          <Icon nama="panahKanan" className="size-4 rotate-180" />
        </Link>
      ) : null}

      <ul className="flex items-center gap-2">
        {nomor.map((n, i) => {
          const sebelumnya = nomor[i - 1];
          const adaLoncatan = typeof sebelumnya === "number" && n - sebelumnya > 1;
          return (
            <li key={n} className="flex items-center gap-2">
              {adaLoncatan ? (
                <span aria-hidden="true" className="px-1 text-sm text-ink-subtle">
                  …
                </span>
              ) : null}
              <Link
                href={buatHref(n)}
                aria-current={n === halaman ? "page" : undefined}
                aria-label={`Halaman ${n}`}
                className={cn(
                  kelasDasar,
                  n === halaman
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50",
                )}
              >
                {n}
              </Link>
            </li>
          );
        })}
      </ul>

      {halaman < totalHalaman ? (
        <Link
          href={buatHref(halaman + 1)}
          rel="next"
          aria-label="Halaman berikutnya"
          className={cn(kelasDasar, "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50")}
        >
          <Icon nama="panahKanan" className="size-4" />
        </Link>
      ) : null}
    </nav>
  );
}
