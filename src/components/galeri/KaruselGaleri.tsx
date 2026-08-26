"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { labelGaleriKategori } from "@/lib/format";
import type { GaleriItem, GaleriKategori } from "@/lib/schemas";

/**
 * Korsel foto galeri bergaya *coverflow*: satu foto tegak di tengah, sisanya
 * memutar ke belakang di kiri dan kanan.
 *
 * Alasan memilih ini alih-alih kisi masonry seperti sebelumnya: dokumentasi
 * yayasan jumlahnya sedikit dan tiap fotonya punya cerita. Kisi memperlakukan
 * semuanya setara dan mata melewatinya sekali usap; korsel memaksa satu foto
 * jadi pusat perhatian, dan keterangannya sempat terbaca.
 *
 * Kedalamannya nyata, bukan sekadar penyusutan: panggungnya diberi `perspective`
 * dan tiap keping digeser pada sumbu Z, jadi foto yang jauh mengecil dengan
 * distorsi perspektif yang benar dan tepinya yang luar menjauh dari penonton —
 * seperti deretan bingkai yang melengkung mengelilingi pembaca.
 *
 * Tanpa pustaka korsel: seluruh keadaan hanyalah satu indeks, dan seluruh gerak
 * adalah satu transisi `transform`. Menarik pustaka untuk ini berarti menambah
 * puluhan kilobita demi sesuatu yang muat dalam satu berkas.
 */

/** Urutan penyaring; hanya kelompok yang benar-benar punya foto yang muncul. */
const urutanKategori: readonly GaleriKategori[] = [
  "wisuda",
  "dauroh",
  "halaqah",
  "anak",
  "kampus",
];

/** Di luar jarak ini keping tidak digambar sama sekali. */
const jangkauan = 2;

/**
 * Jarak terpendek dari keping ke keping aktif, memutar lewat ujung daftar.
 * Dengan begini foto terakhir bersebelahan dengan foto pertama, sehingga korsel
 * tidak pernah punya "ujung" yang membuat gerakannya berhenti mendadak.
 */
function jarak(indeks: number, aktif: number, jumlah: number): number {
  const selisih = indeks - aktif;
  const setengah = jumlah / 2;
  if (selisih > setengah) return selisih - jumlah;
  if (selisih < -setengah) return selisih + jumlah;
  return selisih;
}

export function KaruselGaleri({ galeri }: { galeri: readonly GaleriItem[] }) {
  const [kategori, setKategori] = useState<GaleriKategori | null>(null);
  const [aktif, setAktif] = useState(0);

  const kategoriTersedia = useMemo(
    () => urutanKategori.filter((k) => galeri.some((g) => g.kategori === k)),
    [galeri],
  );

  const daftar = useMemo(
    () => (kategori === null ? galeri : galeri.filter((g) => g.kategori === kategori)),
    [galeri, kategori],
  );

  const jumlah = daftar.length;
  // Menyaring dapat memendekkan daftar; indeks selalu dikembalikan ke nol
  // bersamaan dengan penyaringnya, tapi jepitan ini menjaga render pertama
  // setelah perubahan tetap sehat.
  const kini = Math.min(aktif, Math.max(jumlah - 1, 0));
  const fotoAktif = daftar[kini];

  const geser = useCallback(
    (langkah: number) => {
      if (jumlah === 0) return;
      setAktif((s) => (Math.min(s, jumlah - 1) + langkah + jumlah) % jumlah);
    },
    [jumlah],
  );

  const pilihKategori = useCallback((nilai: GaleriKategori | null) => {
    setKategori(nilai);
    setAktif(0);
  }, []);

  const padaTombol = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        geser(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        geser(1);
      }
    },
    [geser],
  );

  /* Usapan jari / seretan tetikus. Titik awal disimpan di ref supaya seretan
     tidak memicu render ulang di tiap piksel — hanya hasil akhirnya yang penting. */
  const awalUsap = useRef<number | null>(null);

  const mulaiUsap = useCallback((e: React.PointerEvent) => {
    awalUsap.current = e.clientX;
  }, []);

  const akhiriUsap = useCallback(
    (e: React.PointerEvent) => {
      const awal = awalUsap.current;
      awalUsap.current = null;
      if (awal === null) return;
      const jarakUsap = e.clientX - awal;
      // Ambang 45px: cukup jauh untuk membedakan usapan dari ketukan biasa.
      if (Math.abs(jarakUsap) < 45) return;
      geser(jarakUsap < 0 ? 1 : -1);
    },
    [geser],
  );

  return (
    <div
      role="group"
      aria-roledescription="korsel"
      aria-label="Foto dokumentasi kegiatan"
      onKeyDown={padaTombol}
    >
      {/* Baris penyaring — satu baris utuh, tidak pernah membungkus. Di layar
          sempit barisnya digeser mendatar; membungkus jadi dua-tiga baris
          mengubah baris penyaring menjadi blok tersendiri dan mendorong foto
          turun dari pandangan pertama. */}
      <div className="pt-12 md:pt-16">
        <div
          className={cn(
            "flex items-center gap-2 overflow-x-auto px-5 md:px-8",
            // Baris dipusatkan bila muat, dan mulai dari kiri bila harus digeser
            // (`justify-center` pada wadah yang tergulir memotong ujung kirinya).
            "justify-start lg:justify-center",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          <PilKategori aktif={kategori === null} onClick={() => pilihKategori(null)}>
            Semua
          </PilKategori>
          {kategoriTersedia.map((k) => (
            <PilKategori
              key={k}
              aktif={kategori === k}
              onClick={() => pilihKategori(k)}
            >
              {labelGaleriKategori[k]}
            </PilKategori>
          ))}

          <Link
            href="/agenda"
            className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink/45 hover:bg-mist-100"
          >
            Agenda kegiatan
            <Icon
              nama="panah"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Panggung. Bidang gelapnya hanya sepotong pita mendatar di belakang
          foto, bukan seluruh seksi: pita yang lebih pendek dari kartu membuat
          kartu tengah menyembul di atas dan di bawahnya, dan justru itu yang
          mengangkatnya keluar dari deretan — tanpa perlu bingkai atau garis. */}
      <div className="relative mt-9 md:mt-12">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[5%] bottom-[8%] bg-brand-950"
        />

        <div
          tabIndex={0}
          aria-label="Panggung foto — gunakan panah kiri dan kanan untuk berpindah"
          onPointerDown={mulaiUsap}
          onPointerUp={akhiriUsap}
          onPointerCancel={() => (awalUsap.current = null)}
          className={cn(
            "relative h-[clamp(15rem,58vw,25rem)] touch-pan-y overflow-hidden select-none",
            "[perspective:1500px] [perspective-origin:50%_45%]",
          )}
        >
          {daftar.map((foto, i) => {
            const d = jarak(i, kini, jumlah);
            const jauh = Math.abs(d);
            const tampak = jauh <= jangkauan;

            return (
              <div
                key={foto.src}
                aria-hidden={d === 0 ? undefined : true}
                style={{
                  /* Geser mendatar diperbesar seiring jarak: perspektif menarik
                     keping jauh ke titik hilang di tengah, jadi jarak yang tetap
                     justru terlihat menyempit.
                     `translateZ` dan `scale` dipakai bersama dengan sengaja —
                     Z sendirian memberi distorsi perspektif yang benar tapi
                     penyusutannya terlalu halus untuk membedakan keping utama
                     dari tetangganya, sedangkan `scale` sendirian menyusut rata
                     tanpa kesan kedalaman sama sekali. */
                  transform: [
                    "translateX(-50%)",
                    `translateX(${d * (58 + jauh * 6)}%)`,
                    `translateZ(${-jauh * 5}rem)`,
                    `rotateY(${d * 30}deg)`,
                    `scale(${1 - jauh * 0.13})`,
                  ].join(" "),
                  zIndex: 20 - jauh,
                  opacity: tampak ? 1 : 0,
                }}
                className={cn(
                  "absolute top-0 left-1/2 w-[clamp(12rem,46vw,20rem)]",
                  "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  !tampak && "pointer-events-none",
                )}
              >
                <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-900 shadow-lift ring-1 ring-white/10">
                  <Image
                    src={foto.src}
                    alt={d === 0 ? foto.alt : ""}
                    width={foto.width}
                    height={foto.height}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 20rem, 46vw"
                    className="size-full object-cover"
                    draggable={false}
                  />
                  {/* Keping samping diredupkan bertingkat menurut jaraknya,
                      bukan dikaburkan: kabur menutupi isinya sehingga pengunjung
                      tak tahu apa yang menunggu di sebelah. */}
                  <span
                    aria-hidden="true"
                    style={{ opacity: jauh * 0.28 }}
                    className="absolute inset-0 bg-brand-950 transition-opacity duration-500"
                  />
                </figure>

                {d === 0 ? null : (
                  /* Pintasan bagi pengguna tetikus. Sengaja di luar urutan fokus:
                     tindakan yang sama sudah tersedia lewat tombol panah yang
                     berlabel di bawah, dan dua belas tombol tanpa nama hanya
                     akan memenuhi jalur tab. */
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setAktif(i)}
                    className="absolute inset-0 cursor-pointer rounded-[1.5rem]"
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Kemudi */}
      <div className="mt-9 flex items-center justify-center gap-2 pb-12 md:mt-12 md:pb-16">
        <TombolArah arah="mundur" onClick={() => geser(-1)} nonaktif={jumlah < 2} />
        <TombolArah arah="maju" onClick={() => geser(1)} nonaktif={jumlah < 2} />
      </div>

      {/* Susunannya tidak memberi tempat bagi keterangan yang terlihat, jadi
          posisi dan isi foto aktif diumumkan lewat jalur yang tak memakan
          ruang. Tanpa ini pembaca layar hanya mendengar "tombol foto
          berikutnya" berulang kali tanpa pernah tahu apa yang berganti. */}
      <p aria-live="polite" className="sr-only">
        {fotoAktif ? `Foto ${kini + 1} dari ${jumlah}: ${fotoAktif.alt}` : ""}
      </p>
    </div>
  );
}

function PilKategori({
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
        // `shrink-0` + `whitespace-nowrap`: di dalam baris yang tergulir, pil
        // tanpa keduanya akan diperas sampai labelnya patah dua baris.
        "h-9 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-150",
        aktif
          ? "bg-brand-950 text-white"
          : "border border-line bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800",
      )}
    >
      {children}
    </button>
  );
}

function TombolArah({
  arah,
  onClick,
  nonaktif,
}: {
  arah: "mundur" | "maju";
  onClick: () => void;
  nonaktif: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={nonaktif}
      aria-label={arah === "maju" ? "Foto berikutnya" : "Foto sebelumnya"}
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-ink",
        "transition-colors duration-150 hover:border-ink/45 hover:bg-mist-100",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <Icon nama="panah" className={cn("size-5", arah === "mundur" && "rotate-180")} />
    </button>
  );
}
