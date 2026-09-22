"use client";

import { useMemo, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { tautanWhatsApp } from "@/lib/format";
import type { Cabang } from "@/lib/schemas";
import { cn } from "@/lib/cn";

/**
 * Direktori cabang sebuah unit.
 *
 * Dulu cabang cukup ditampilkan sebagai grid kartu, karena datanya sepuluh
 * baris. Setelah data resmi yayasan masuk, TAUD SAQU saja berjalan di 162
 * lokasi pada 27 provinsi, grid datar sepanjang itu tidak bisa dibaca dan
 * tidak bisa dicari. Maka: pencarian teks, saringan pulau, lalu daftar yang
 * dikelompokkan per provinsi.
 *
 * Pengelompokan memakai `<details>`, bukan state buka-tutup sendiri, supaya
 * Ctrl+F bawaan peramban tetap dapat menemukan cabang di grup yang tertutup
 * pada peramban yang mendukungnya, dan supaya keyboard bekerja tanpa tambahan
 * apa pun. Provinsi terbuka otomatis begitu pengguna mengetik, tidak ada
 * gunanya menyembunyikan hasil pencarian di balik grup tertutup.
 */

/** Urutan pulau mengikuti berkas sumber, dari barat ke timur. */
const URUTAN_PULAU = [
  "Sumatera",
  "Jawa",
  "Bali",
  "Nusa Tenggara",
  "Kalimantan",
  "Sulawesi",
  "Maluku",
] as const;

/** Di bawah ambang ini daftar tetap terbuka: mencari tidak diperlukan. */
const AMBANG_LIPAT = 12;

function normalkan(s: string): string {
  return s.toLowerCase().replace(/['’-]/g, " ").replace(/\s+/g, " ").trim();
}

export function DirektoriCabang({ cabang, namaUnit }: { cabang: readonly Cabang[]; namaUnit: string }) {
  const [kueri, setKueri] = useState("");
  const [pulauAktif, setPulauAktif] = useState<string | null>(null);

  const daftarPulau = useMemo(() => {
    const ada = new Set(cabang.map((c) => c.pulau));
    return URUTAN_PULAU.filter((p) => ada.has(p));
  }, [cabang]);

  const cocok = useMemo(() => {
    const k = normalkan(kueri);
    return cabang.filter((c) => {
      if (pulauAktif && c.pulau !== pulauAktif) return false;
      if (!k) return true;
      return normalkan([c.nama, c.kota ?? "", c.provinsi, c.alamat ?? ""].join(" ")).includes(k);
    });
  }, [cabang, kueri, pulauAktif]);

  /** Provinsi tetap urut sesuai urutan kemunculan pada data (barat → timur). */
  const grup = useMemo(() => {
    const peta = new Map<string, Cabang[]>();
    for (const c of cocok) {
      const isi = peta.get(c.provinsi);
      if (isi) isi.push(c);
      else peta.set(c.provinsi, [c]);
    }
    return [...peta.entries()];
  }, [cocok]);

  const sedangMenyaring = kueri.trim().length > 0 || pulauAktif !== null;
  const kecil = cabang.length <= AMBANG_LIPAT;

  return (
    <div className="mt-8">
      {!kecil ? (
        <div className="flex flex-col gap-4">
          <label className="relative block max-w-md">
            <span className="sr-only">Cari cabang {namaUnit}</span>
            <Icon
              nama="cari"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-subtle"
              tebal={2.2}
            />
            <input
              type="search"
              value={kueri}
              onChange={(e) => setKueri(e.target.value)}
              placeholder="Cari nama sekolah, kota, atau provinsi"
              className={cn(
                "w-full rounded-full border border-line bg-white py-3 pr-4 pl-11 text-sm text-ink shadow-soft",
                "placeholder:text-ink-subtle focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none",
              )}
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <TombolPulau aktif={pulauAktif === null} onClick={() => setPulauAktif(null)}>
              Semua pulau
            </TombolPulau>
            {daftarPulau.map((p) => (
              <TombolPulau key={p} aktif={pulauAktif === p} onClick={() => setPulauAktif(p)}>
                {p}
              </TombolPulau>
            ))}
          </div>

          <p aria-live="polite" className="text-sm text-ink-muted">
            {cocok.length === 0 ? (
              <>Tidak ada cabang yang cocok. Coba kata kunci lain atau pilih pulau lain.</>
            ) : (
              <>
                Menampilkan <strong className="font-semibold text-ink">{cocok.length}</strong> lokasi
                di {grup.length} provinsi
                {sedangMenyaring ? <> dari total {cabang.length} lokasi</> : null}.
              </>
            )}
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3">
        {grup.map(([provinsi, isi]) => (
          <details
            // `<details>` menyimpan sendiri keadaan buka-tutupnya begitu
            // pengguna mengkliknya, dan React tidak tahu itu terjadi. Dengan
            // menyertakan status penyaringan pada `key`, grup dipasang ulang
            // setiap kali pengguna mulai atau berhenti menyaring, sehingga
            // `open` di bawah selalu dituruti. Saat mengetik nilainya tetap
            // `true`, jadi pengetikan tidak memasang ulang apa pun.
            key={`${provinsi}-${sedangMenyaring}`}
            open={kecil || sedangMenyaring || grup.length === 1}
            className="group overflow-hidden rounded-2xl border border-line bg-white shadow-soft open:border-brand-200"
          >
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4",
                "font-display text-base font-semibold text-ink transition-colors",
                "group-hover:text-brand-800 group-open:text-brand-800",
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="truncate">{provinsi}</span>
                <span className="shrink-0 rounded-full bg-mist-100 px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                  {isi.length}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-full",
                  "bg-mist-100 text-ink-subtle transition-all duration-200",
                  "group-hover:bg-brand-50 group-hover:text-brand-700",
                  "group-open:rotate-180 group-open:bg-brand-600 group-open:text-white",
                )}
              >
                <Icon nama="panahBawah" className="size-4" tebal={2} />
              </span>
            </summary>

            <ul className="divide-y divide-line border-t border-line">
              {isi.map((c) => (
                <li key={c.slug} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug font-semibold text-ink">{c.nama}</p>
                    {c.kota ? (
                      <p className="mt-0.5 text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                        {c.kota}
                      </p>
                    ) : null}
                    {c.alamat ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.alamat}</p>
                    ) : null}
                  </div>
                  {c.kontak_wa ? (
                    <a
                      href={tautanWhatsApp(
                        c.kontak_wa,
                        `Assalamu'alaikum. Saya ingin bertanya mengenai pendaftaran di ${c.nama}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      <Icon nama="whatsapp" className="size-4" />
                      Hubungi
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}

function TombolPulau({
  aktif,
  onClick,
  children,
}: {
  aktif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktif}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
        aktif
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-line bg-white text-ink-muted hover:border-line-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
