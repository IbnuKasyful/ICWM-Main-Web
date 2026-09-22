"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { tautanWhatsApp } from "@/lib/format";

/**
 * Tombol kontak cepat yang mengambang di sudut layar.
 *
 * Satu nomor untuk semua keperluan hanya memindahkan kerja ke petugas: pesan
 * donasi masuk ke panitia PPDB, pertanyaan PPDB masuk ke amil. Maka tombolnya
 * tidak langsung membuka WhatsApp, melainkan bertanya lebih dulu keperluannya,
 * baru menuju nomor yang tepat dengan pesan pembuka yang sudah terisi.
 *
 * Yang tidak dimuat di sini: nomor tiap unit pendidikan. Jumlahnya sebelas dan
 * daftarnya akan lebih panjang dari layar ponsel, jadi pilihan terakhir
 * mengantar ke halaman kontak yang memang memuat semuanya.
 */

type Saluran = {
  label: string;
  keterangan: string;
  ikon: NamaIkon;
} & ({ wa: string; pesan: string } | { href: string; eksternal?: boolean });

export function KontakCepat({
  whatsappPsb,
  whatsappLazis,
  saluranWhatsapp,
}: {
  whatsappPsb: string;
  whatsappLazis: string;
  saluranWhatsapp: string;
}) {
  const [terbuka, setTerbuka] = useState(false);
  const bungkus = useRef<HTMLDivElement>(null);

  /* Tutup saat Esc ditekan atau saat pengunjung menyentuh bagian lain halaman,
     panel mengambang yang tidak bisa ditutup menghalangi isi di belakangnya. */
  useEffect(() => {
    if (!terbuka) return;

    function padaTombol(e: KeyboardEvent) {
      if (e.key === "Escape") setTerbuka(false);
    }
    function padaKlik(e: MouseEvent) {
      if (!bungkus.current?.contains(e.target as Node)) setTerbuka(false);
    }

    document.addEventListener("keydown", padaTombol);
    document.addEventListener("mousedown", padaKlik);
    return () => {
      document.removeEventListener("keydown", padaTombol);
      document.removeEventListener("mousedown", padaKlik);
    };
  }, [terbuka]);

  const saluran: Saluran[] = [
    {
      label: "Pendaftaran santri baru",
      keterangan: "Panitia PSB pusat",
      ikon: "sekolah",
      wa: whatsappPsb,
      pesan: "Assalamu'alaikum. Saya ingin bertanya mengenai pendaftaran santri baru di Wadi Mubarak.",
    },
    {
      label: "Donasi & LAZIS",
      keterangan: "Tim amil LAZIS SaQu",
      ikon: "donasi",
      wa: whatsappLazis,
      pesan: "Assalamu'alaikum. Saya ingin bertanya mengenai donasi lewat LAZIS SaQu Wadi Mubarak.",
    },
    {
      label: "Saluran pengumuman",
      keterangan: "Kabar resmi yayasan di WhatsApp",
      ikon: "info",
      href: saluranWhatsapp,
      eksternal: true,
    },
    {
      label: "Narahubung unit lain",
      keterangan: "Nomor tiap unit pendidikan",
      ikon: "orang",
      href: "/kontak",
    },
  ];

  return (
    <div
      ref={bungkus}
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6 print:hidden"
    >
      {terbuka ? (
        <div
          id="kontak-cepat-panel"
          className={cn(
            "w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white shadow-card",
            "animate-kartu-masuk",
          )}
        >
          <div className="border-b border-line px-5 py-4">
            <p className="font-display text-sm font-semibold text-ink">Hubungi kami</p>
            <p className="mt-0.5 text-xs text-ink-subtle">
              Pilih keperluan Anda agar langsung sampai ke petugasnya.
            </p>
          </div>

          <ul className="flex flex-col p-2">
            {saluran.map((s) => {
              const isi = (
                <>
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon nama={s.ikon} className="size-4" tebal={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{s.label}</span>
                    <span className="mt-0.5 block text-xs text-ink-subtle">{s.keterangan}</span>
                  </span>
                </>
              );
              const kelas =
                "flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-mist-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-reduce:transition-none";

              return (
                <li key={s.label}>
                  {"wa" in s ? (
                    <a
                      href={tautanWhatsApp(s.wa, s.pesan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={kelas}
                      onClick={() => setTerbuka(false)}
                    >
                      {isi}
                    </a>
                  ) : s.eksternal ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={kelas}
                      onClick={() => setTerbuka(false)}
                    >
                      {isi}
                    </a>
                  ) : (
                    <Link href={s.href} className={kelas} onClick={() => setTerbuka(false)}>
                      {isi}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setTerbuka((t) => !t)}
        aria-expanded={terbuka}
        aria-controls="kontak-cepat-panel"
        aria-label={terbuka ? "Tutup pilihan kontak" : "Hubungi kami lewat WhatsApp"}
        className={cn(
          "inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-3 shadow-card",
          "bg-brand-700 text-sm font-semibold text-white transition-colors hover:bg-brand-800",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          "motion-reduce:transition-none",
        )}
      >
        <Icon nama={terbuka ? "tutup" : "whatsapp"} className="size-5" tebal={2} />
        <span className={cn(terbuka && "sr-only")}>Hubungi kami</span>
      </button>
    </div>
  );
}
