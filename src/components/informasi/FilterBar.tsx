import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { labelCategory, labelLokasi } from "@/lib/format";
import type { Category, Lokasi, Unit } from "@/lib/schemas";
import { cn } from "@/lib/cn";

export type NilaiFilter = {
  category?: string | undefined;
  unit?: string | undefined;
  lokasi?: string | undefined;
  tahun?: string | undefined;
};

const kategoriOpsi: Category[] = [
  "berita",
  "pengumuman",
  "artikel",
  "prestasi",
  "kegiatan",
  "kerja-sama",
  "laporan",
];

const lokasiOpsi: Lokasi[] = ["bogor", "sleman"];

/**
 * PRD §9.6 — penyaring tercermin di URL dan dapat dibagikan.
 *
 * Sengaja dibangun dari tautan `<a>` sungguhan, bukan tombol JavaScript:
 * penyaring pun ikut dapat dirayapi dan bekerja tanpa JS aktif.
 */
export function FilterBar({
  nilai,
  units,
  tahunTersedia,
  basePath = "/informasi",
}: {
  nilai: NilaiFilter;
  units: readonly Unit[];
  tahunTersedia: number[];
  basePath?: string;
}) {
  /** Membangun URL dengan satu kunci diubah; `halaman` selalu direset. */
  function href(kunci: keyof NilaiFilter, v: string | undefined): string {
    const params = new URLSearchParams();
    const gabungan: NilaiFilter = { ...nilai, [kunci]: v };
    for (const [k, val] of Object.entries(gabungan)) {
      if (val) params.set(k, val);
    }
    const kueri = params.toString();
    return kueri ? `${basePath}?${kueri}` : basePath;
  }

  const jumlahAktif = Object.values(nilai).filter(Boolean).length;

  const grup: {
    kunci: keyof NilaiFilter;
    judul: string;
    opsi: { nilai: string; label: string }[];
  }[] = [
    {
      kunci: "category",
      judul: "Kategori",
      opsi: kategoriOpsi.map((c) => ({ nilai: c, label: labelCategory[c] })),
    },
    {
      kunci: "unit",
      judul: "Unit",
      opsi: units.map((u) => ({ nilai: u.slug, label: u.nama_pendek })),
    },
    {
      kunci: "lokasi",
      judul: "Lokasi",
      opsi: lokasiOpsi.map((l) => ({ nilai: l, label: labelLokasi[l] })),
    },
    {
      kunci: "tahun",
      judul: "Tahun",
      opsi: tahunTersedia.map((t) => ({ nilai: String(t), label: String(t) })),
    },
  ];

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
          <Icon nama="filter" className="size-4 text-brand-600" />
          Saring tulisan
        </h2>
        {jumlahAktif > 0 ? (
          <Link
            href={basePath}
            className="text-xs font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            Bersihkan ({jumlahAktif})
          </Link>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {grup.map((g) => (
          <div key={g.kunci}>
            <p className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
              {g.judul}
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              <li>
                <Link
                  href={href(g.kunci, undefined)}
                  aria-current={!nilai[g.kunci] ? "true" : undefined}
                  className={cn(
                    "inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    !nilai[g.kunci]
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50",
                  )}
                >
                  Semua
                </Link>
              </li>
              {g.opsi.map((o) => {
                const aktif = nilai[g.kunci] === o.nilai;
                return (
                  <li key={o.nilai}>
                    <Link
                      href={href(g.kunci, aktif ? undefined : o.nilai)}
                      aria-current={aktif ? "true" : undefined}
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                        aktif
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-line bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50",
                      )}
                    >
                      {o.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
