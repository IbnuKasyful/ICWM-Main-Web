"use client";

import { useMemo, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { jalurProvinsi, petaViewBox } from "@/data/peta-provinsi";
import type { Persebaran } from "@/lib/schemas";

/**
 * Peta persebaran cabang sebuah unit.
 *
 * Jaringan TAUD terlalu panjang untuk ditayangkan sebagai direktori, dan
 * sebagian besar cabangnya dikelola lembaga mitra, yang nama serta alamatnya
 * bukan milik yayasan untuk diterbitkan. Yang bisa dan perlu dijawab halaman
 * ini cuma satu pertanyaan: "di daerah saya ada berapa?"
 *
 * Maka petanya. Wilayah diwarnai menurut jumlah cabang, dan rinciannya muncul
 * saat disentuh kursor atau menerima fokus papan tik. Rincian itu tidak
 * melayang mengikuti kursor, melainkan mengisi satu panel tetap di sisi peta:
 * panel yang melayang menutupi wilayah tetangga, sulit dijangkau di layar
 * sentuh, dan hilang begitu jari diangkat.
 *
 * Daftar wilayah di bawah peta bukan hiasan. Ia menampung tiga hal sekaligus:
 * jalan masuk untuk papan tik, cara membaca provinsi yang bentuknya terlalu
 * kecil untuk ditunjuk (DKI Jakarta, DI Yogyakarta), dan daftar yang tetap
 * terbaca ketika peta tidak tergambar sama sekali.
 */

/** Urutan pulau dari barat ke timur, sama seperti direktori cabang. */
const URUTAN_PULAU = [
  "Sumatera",
  "Jawa",
  "Bali",
  "Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku",
] as const;

const angka = new Intl.NumberFormat("id-ID");

/** Empat tingkat warna; lebih dari itu tidak terbaca sebagai urutan. */
function tingkat(cabang: number, terbanyak: number): 0 | 1 | 2 | 3 | 4 {
  if (cabang <= 0) return 0;
  const bagian = cabang / terbanyak;
  if (bagian > 0.5) return 4;
  if (bagian > 0.25) return 3;
  if (bagian > 0.1) return 2;
  return 1;
}

const isianWilayah: Record<number, string> = {
  0: "fill-mist-100",
  1: "fill-brand-200",
  2: "fill-brand-300",
  3: "fill-brand-500",
  4: "fill-brand-700",
};

export function PetaPersebaran({
  persebaran,
  namaUnit,
}: {
  persebaran: readonly Persebaran[];
  namaUnit: string;
}) {
  const [aktif, setAktif] = useState<string | null>(null);

  const totalCabang = persebaran.reduce((n, w) => n + w.cabang, 0);
  const terbanyak = Math.max(...persebaran.map((w) => w.cabang));
  const wilayahAktif = persebaran.find((w) => w.nama === aktif) ?? null;

  /** Bentuk peta dasar yang tidak ditempati unit ini, digambar kelabu. */
  const bentukKosong = useMemo(() => {
    const terpakai = new Set(persebaran.flatMap((w) => w.bentuk));
    return Object.entries(jalurProvinsi).filter(([nama]) => !terpakai.has(nama));
  }, [persebaran]);

  const perPulau = useMemo(
    () =>
      URUTAN_PULAU.map((pulau) => ({
        pulau,
        isi: persebaran.filter((w) => w.pulau === pulau),
      })).filter((g) => g.isi.length > 0),
    [persebaran],
  );

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
          <svg
            viewBox={petaViewBox}
            role="img"
            aria-label={`Peta persebaran cabang ${namaUnit} di Indonesia. Rinciannya tersedia pada daftar wilayah di bawah peta.`}
            className="h-auto w-full"
          >
            {bentukKosong.map(([nama, d]) => (
              <path key={nama} d={d} className="fill-mist-100 stroke-white" strokeWidth={1.5} />
            ))}

            {persebaran.map((w) =>
              w.bentuk.map((bentuk) => {
                const d = jalurProvinsi[bentuk];
                if (!d) return null;
                const sorot = aktif === w.nama;
                return (
                  <path
                    key={`${w.nama}-${bentuk}`}
                    d={d}
                    onMouseEnter={() => setAktif(w.nama)}
                    onMouseLeave={() => setAktif((n) => (n === w.nama ? null : n))}
                    /* Layar sentuh tidak punya kursor: ketukan menahan
                       rinciannya tetap terbuka. */
                    onClick={() => setAktif(w.nama)}
                    className={cn(
                      "cursor-pointer transition-colors duration-150 motion-reduce:transition-none",
                      isianWilayah[tingkat(w.cabang, terbanyak)],
                      sorot ? "stroke-ink" : "stroke-white",
                    )}
                    strokeWidth={sorot ? 1.8 : 1.5}
                  />
                );
              }),
            )}
          </svg>

          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-subtle">
            <li className="font-semibold tracking-[0.1em] uppercase">Jumlah cabang</li>
            <li className="flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                <rect width="12" height="12" rx="3" className={isianWilayah[0]} />
              </svg>
              belum ada
            </li>
            {[1, 2, 3, 4].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                  <rect width="12" height="12" rx="3" className={isianWilayah[t]} />
                </svg>
                {t === 1 ? "sedikit" : t === 4 ? "terbanyak" : null}
              </li>
            ))}
          </ul>
        </div>

        {/* Panel rincian. Tingginya dipatok isi terpanjang supaya peta tidak
            bergeser naik-turun setiap kali kursor berpindah wilayah. */}
        <div
          aria-live="polite"
          className="flex min-h-[10rem] flex-col rounded-2xl border border-line bg-mist-50 p-5"
        >
          {wilayahAktif ? (
            <>
              <p className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                {wilayahAktif.pulau}
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-ink">
                {wilayahAktif.nama}
              </h3>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-ink-muted">Cabang</dt>
                  <dd className="font-display text-xl font-bold text-brand-700 tabular-nums">
                    {wilayahAktif.cabang}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-t border-line pt-3">
                  <dt className="text-ink-muted">Murid</dt>
                  <dd className="font-display text-xl font-bold text-ink tabular-nums">
                    {wilayahAktif.murid === null ? "—" : angka.format(wilayahAktif.murid)}
                  </dd>
                </div>
              </dl>
              {wilayahAktif.murid === null ? (
                <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                  Jumlah murid wilayah ini belum diumumkan yayasan.
                </p>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                Seluruh Indonesia
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-ink">
                {totalCabang} cabang di {persebaran.length} wilayah
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Arahkan kursor ke sebuah wilayah, atau pilih namanya di bawah peta, untuk
                melihat jumlah cabang dan muridnya.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Daftar wilayah: jalan masuk papan tik sekaligus rincian yang bisa dibaca
          tanpa menunjuk apa pun. */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {perPulau.map((g) => (
          <section key={g.pulau} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-ink">{g.pulau}</h3>
              <p className="text-xs font-semibold tracking-[0.1em] text-brand-700 uppercase">
                {g.isi.reduce((n, w) => n + w.cabang, 0)} cabang
              </p>
            </div>
            <ul className="mt-3 flex flex-col">
              {g.isi.map((w) => (
                <li key={w.nama}>
                  <button
                    type="button"
                    onMouseEnter={() => setAktif(w.nama)}
                    onMouseLeave={() => setAktif((n) => (n === w.nama ? null : n))}
                    onFocus={() => setAktif(w.nama)}
                    onBlur={() => setAktif((n) => (n === w.nama ? null : n))}
                    onClick={() => setAktif(w.nama)}
                    aria-label={`${w.nama}: ${w.cabang} cabang${
                      w.murid === null ? "" : `, ${angka.format(w.murid)} murid`
                    }`}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm",
                      "transition-colors duration-150 hover:bg-mist-50 motion-reduce:transition-none",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                      aktif === w.nama && "bg-mist-100",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate text-ink-muted">{w.nama}</span>
                    <span className="shrink-0 text-xs text-ink-subtle tabular-nums">
                      {w.murid === null ? "—" : `${angka.format(w.murid)} murid`}
                    </span>
                    <span className="w-6 shrink-0 text-right font-semibold text-ink tabular-nums">
                      {w.cabang}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-ink-subtle">
        <Icon nama="info" className="mt-0.5 size-4 shrink-0" />
        <span>
          Jumlah cabang dari data jaringan {namaUnit} se-Indonesia; jumlah murid dari laporan
          yayasan 2024. Cabang kelolaan lembaga mitra tidak diterbitkan satu per satu, hubungi
          panitia pusat untuk diarahkan ke cabang terdekat.
        </span>
      </p>
    </div>
  );
}
