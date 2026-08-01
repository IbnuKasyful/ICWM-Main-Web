import { Icon } from "@/components/ui/Icon";
import { persen, rupiahRingkas } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * PRD §9.4 — setiap program donasi menampilkan target, terkumpul, dan progres.
 *
 * Susunannya: nominal terkumpul sebagai angka besar, lencana capaian di
 * seberangnya, bilah bertonggak 25/50/75%, lalu targetnya. Angka persen
 * dipisahkan ke lencana karena itu yang dicari mata lebih dulu; nominal
 * targetnya tetap tampil di bawah agar syarat PRD terpenuhi.
 *
 * Geraknya murni CSS — komponen ini tidak mengirim JavaScript sama sekali:
 * bilah terisi dari nol saat dirender, dan kilau melintas saat kartu induknya
 * (`group`) disentuh kursor. Blok `prefers-reduced-motion` di globals.css
 * mematikan keduanya bagi pengguna yang tidak menghendaki gerak.
 */
export function Progress({
  terkumpul,
  target,
  className,
  ringkas = false,
}: {
  terkumpul: number;
  target: number;
  className?: string;
  /** Varian padat untuk kisi kartu: menyembunyikan kalimat penutup. */
  ringkas?: boolean;
}) {
  const capaian = persen(terkumpul, target);
  const tuntas = target > 0 && terkumpul >= target;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-xl leading-none font-bold tabular-nums text-ink">
          {rupiahRingkas(terkumpul)}
          <span className="ml-1.5 font-sans text-xs font-normal text-ink-subtle">terkumpul</span>
        </span>

        {target > 0 ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5",
              "font-display text-xs font-bold tabular-nums ring-1 ring-inset",
              tuntas
                ? "bg-brand-50 text-brand-700 ring-brand-200"
                : "bg-accent-50 text-accent-800 ring-accent-100",
            )}
          >
            {/* `size-3!` — `Icon` sudah memasang `size-5` bawaan dan `cn()`
                hanya menggabung tanpa meredam kelas kembar, jadi ukuran yang
                lebih kecil harus dipaksa agar tidak kalah urutan CSS. */}
            {tuntas ? <Icon nama="centang" className="size-3!" tebal={2.6} /> : null}
            {capaian}%
          </span>
        ) : (
          <span className="shrink-0 text-xs text-ink-subtle">program berkelanjutan</span>
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
            className="relative h-2.5 w-full overflow-hidden rounded-full bg-mist-200 ring-1 ring-line/70 ring-inset"
          >
            {/* Lebar minimum 2% supaya bilah tetap terbaca sebagai bilah saat
                penghimpunan baru dibuka dan capaiannya masih nol. */}
            <div
              className={cn(
                "animate-progres-isi relative h-full overflow-hidden rounded-full",
                tuntas
                  ? "bg-gradient-to-r from-brand-500 to-brand-700"
                  : "bg-gradient-to-r from-accent-300 to-accent-500",
              )}
              style={{ width: `${Math.max(capaian, 2)}%` }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-progres-kilau group-hover:opacity-100"
              />
            </div>

            {/* Tonggak seperempat: memberi skala pada bilah supaya panjangnya
                bisa ditaksir tanpa membaca angkanya. */}
            {[25, 50, 75].map((tonggak) => (
              <span
                key={tonggak}
                aria-hidden="true"
                className="absolute top-0 h-full w-px bg-white/55"
                style={{ left: `${tonggak}%` }}
              />
            ))}
          </div>

          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="text-ink-subtle">
              dari target{" "}
              <span className="font-semibold tabular-nums text-ink-muted">
                {rupiahRingkas(target)}
              </span>
            </span>
            {tuntas && !ringkas ? (
              <span className="text-right font-semibold text-brand-700">Target terpenuhi</span>
            ) : null}
          </div>

          {tuntas && !ringkas ? (
            <p className="text-xs leading-relaxed text-ink-subtle">
              Donasi berikutnya dialihkan ke gelombang selanjutnya.
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
