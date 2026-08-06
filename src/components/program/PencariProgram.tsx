"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { UnitCard } from "@/components/ui/UnitCard";
import { labelGender, labelJenjang, labelModel } from "@/lib/format";
import type { Gender, ImageData, Jenjang, ModelBelajar, Unit } from "@/lib/schemas";
import { cn } from "@/lib/cn";

/**
 * PRD §9.2 — penyaring SISI KLIEN atas seluruh unit.
 *
 * Seluruh data unit sudah diambil saat build dan diteruskan lewat props, jadi
 * penyaringan tidak pernah memicu permintaan jaringan tambahan. Kombinasi
 * penyaring tercermin di URL supaya dapat dibagikan.
 */

type KunciFilter = "jenjang" | "gender" | "model";

const jenjangOpsi: Jenjang[] = ["paud", "sd", "smp", "sma", "tinggi", "non-formal"];
const genderOpsi: Gender[] = ["putra", "putri", "campur"];
const modelOpsi: ModelBelajar[] = ["boarding", "non-boarding", "hybrid"];

const grupFilter: {
  kunci: KunciFilter;
  judul: string;
  opsi: readonly string[];
  label: (v: string) => string;
}[] = [
    { kunci: "jenjang", judul: "Jenjang", opsi: jenjangOpsi, label: (v) => labelJenjang[v as Jenjang] },
    { kunci: "gender", judul: "Peserta didik", opsi: genderOpsi, label: (v) => labelGender[v as Gender] },
    {
      kunci: "model",
      judul: "Model belajar",
      opsi: modelOpsi,
      label: (v) => labelModel[v as ModelBelajar],
    },
  ];

function bacaNilai(params: URLSearchParams, kunci: KunciFilter): string[] {
  const mentah = params.get(kunci);
  if (!mentah) return [];
  return mentah.split(",").filter(Boolean);
}

export function PencariProgram({
  units,
  hero,
}: {
  units: readonly Unit[];
  /** Gambar kartu per slug unit; kunci yang absen berarti kartu tanpa foto. */
  hero: Record<string, ImageData>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const terpilih = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      jenjang: bacaNilai(params, "jenjang"),
      gender: bacaNilai(params, "gender"),
      model: bacaNilai(params, "model"),
    } satisfies Record<KunciFilter, string[]>;
  }, [searchParams]);

  const jumlahAktif = terpilih.jenjang.length + terpilih.gender.length + terpilih.model.length;

  const perbarui = useCallback(
    (kunci: KunciFilter, nilai: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const sekarang = bacaNilai(params, kunci);
      const berikutnya = sekarang.includes(nilai)
        ? sekarang.filter((v) => v !== nilai)
        : [...sekarang, nilai];

      if (berikutnya.length === 0) params.delete(kunci);
      else params.set(kunci, berikutnya.join(","));

      const kueri = params.toString();
      router.replace(kueri ? `/program?${kueri}` : "/program", { scroll: false });
    },
    [router, searchParams],
  );

  const bersihkan = useCallback(() => {
    router.replace("/program", { scroll: false });
  }, [router]);

  const hasil = useMemo(
    () =>
      units.filter((u) => {
        if (terpilih.jenjang.length > 0 && !terpilih.jenjang.includes(u.jenjang)) return false;
        if (terpilih.gender.length > 0 && !terpilih.gender.includes(u.gender)) return false;
        if (terpilih.model.length > 0 && !terpilih.model.includes(u.model_belajar)) return false;
        return true;
      }),
    [units, terpilih],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
      {/* Panel penyaring */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <Icon nama="filter" className="size-4 text-brand-600" />
            Penyaring
          </h2>
          {jumlahAktif > 0 ? (
            <Button varian="hantu" ukuran="sm" onClick={bersihkan} className="h-8 px-3 text-xs">
              Bersihkan ({jumlahAktif})
            </Button>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {grupFilter.map((grup) => (
            <fieldset key={grup.kunci} className="border-0 p-0">
              <legend className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
                {grup.judul}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {grup.opsi.map((opsi) => {
                  const aktif = terpilih[grup.kunci].includes(opsi);
                  return (
                    <label
                      key={opsi}
                      className={cn(
                        "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600",
                        aktif
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-line bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={aktif}
                        onChange={() => perbarui(grup.kunci, opsi)}
                      />
                      {grup.label(opsi)}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Hasil */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
          <p aria-live="polite" className="text-sm text-ink-muted">
            Menampilkan <span className="font-semibold text-ink">{hasil.length}</span> dari{" "}
            {units.length} unit
          </p>
          {jumlahAktif > 0 ? (
            <p className="text-xs text-ink-subtle">
              Tautan halaman ini sudah menyimpan penyaring Anda — silakan dibagikan.
            </p>
          ) : null}
        </div>

        {hasil.length === 0 ? (
          <EmptyState
            className="mt-8"
            ikon="cari"
            judul="Belum ada unit dengan kombinasi ini"
            keterangan="Kombinasi penyaring yang Anda pilih belum tersedia. Coba longgarkan salah satu penyaring — misalnya jenjang atau model belajar — atau hubungi kami untuk rekomendasi yang sesuai."
            aksi={{ label: "Konsultasi lewat kontak", href: "/kontak" }}
          >
            <Button varian="garis" ukuran="sm" onClick={bersihkan}>
              Bersihkan semua penyaring
            </Button>
          </EmptyState>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {hasil.map((unit, i) => (
              <UnitCard
                key={unit.slug}
                unit={unit}
                gambar={hero[unit.slug] ?? null}
                prioritas={i < 2}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
