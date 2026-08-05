import Image from "next/image";

import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { getGaleri } from "@/lib/content";
import type { ImageData } from "@/lib/schemas";

/**
 * Dinding foto kegiatan yang berjalan mendatar di bawah hero.
 *
 * Bedanya dengan `BentoBerjalan` di blok "Sekilas yayasan": yang ini melintang
 * penuh selebar layar dan menjadi bidang gambar utama beranda, jadi susunannya
 * diselingi kartu angka dan kartu keterangan — persis pola bento, bukan deretan
 * foto seragam. Kolom sengaja berbeda-beda lebar dan isinya; kalau semua kolom
 * sama, geraknya terbaca sebagai carousel dan mata langsung berhenti membaca.
 *
 * Seluruh putaran dirender dua kali lalu digeser tepat sepanjang satu salinan,
 * sehingga sambungannya tak terlihat dan tak perlu JavaScript sama sekali —
 * komponen ini tetap komponen server. Gerak berhenti saat
 * pengunjung meminta pengurangan gerak (aturan global di
 * globals.css).
 */

type Keping =
  /** `porsi` menyetel tinggi keping terhadap kolomnya; keping terakhir selalu
      mengisi sisa ruang, jadi cukup keping di atasnya yang diberi porsi. */
  | { jenis: "foto"; porsi?: string; foto: ImageData }
  | { jenis: "fotoAngka"; porsi?: string; foto: ImageData; nilai: string; label: string }
  | { jenis: "angka"; porsi?: string; nilai: string; label: string; ikon: NamaIkon }
  | { jenis: "kartu"; porsi?: string; penanda: string; judul: string; teks: string };

type Kolom = { lebar: string; isi: Keping[] };

/** Lebar kolom. Empat ukuran saja supaya iramanya tetap terbaca sebagai pola. */
const lebar = {
  sempit: "w-[10.5rem] sm:w-[13rem]",
  sedang: "w-[15rem] sm:w-[18rem]",
  lebar: "w-[19rem] sm:w-[24rem]",
  tinggi: "w-[12rem] sm:w-[14rem]",
} as const;

/**
 * Satu putaran penuh: delapan kolom, sembilan foto. Foto diambil berurutan dari
 * galeri yayasan dan berputar bila daftarnya lebih pendek, jadi menambah atau
 * mengurangi foto di `src/data/yayasan.ts` tidak pernah merusak susunan ini.
 */
function bangunKolom(
  galeri: readonly ImageData[],
  jumlahUnit: number,
  jumlahSantri: string,
): Kolom[] {
  let n = 0;
  const foto = (): ImageData => {
    const g = galeri[n++ % galeri.length];
    // Tidak akan terjadi: pemanggilnya sudah memastikan galeri tidak kosong.
    if (!g) throw new Error("BentoHeroBerjalan: galeri kosong");
    return g;
  };

  return [
    {
      lebar: lebar.sempit,
      isi: [
        {
          jenis: "angka",
          porsi: "flex-[0_0_42%]",
          nilai: jumlahSantri,
          label: "Santri aktif",
          ikon: "orang",
        },
        { jenis: "foto", foto: foto() },
      ],
    },
    { lebar: lebar.lebar, isi: [{ jenis: "foto", foto: foto() }] },
    {
      lebar: lebar.sedang,
      isi: [
        { jenis: "foto", porsi: "flex-[0_0_54%]", foto: foto() },
        {
          jenis: "kartu",
          penanda: "Berjenjang",
          judul: "Satu anak, satu naungan",
          teks: "Dari tahfizh anak usia dini sampai perguruan tinggi.",
        },
      ],
    },
    {
      lebar: lebar.tinggi,
      isi: [
        {
          jenis: "fotoAngka",
          foto: foto(),
          nilai: `${jumlahUnit}`,
          label: "Unit pendidikan",
        },
      ],
    },
    {
      lebar: lebar.sedang,
      isi: [
        { jenis: "foto", porsi: "flex-[0_0_48%]", foto: foto() },
        { jenis: "foto", foto: foto() },
      ],
    },
    { lebar: lebar.lebar, isi: [{ jenis: "foto", foto: foto() }] },
    {
      lebar: lebar.sedang,
      isi: [
        {
          jenis: "kartu",
          porsi: "flex-[0_0_44%]",
          penanda: "Tahfizh",
          judul: "Halaqah kecil",
          teks: "Kelompok dibatasi supaya tiap santri disimak namanya.",
        },
        { jenis: "foto", foto: foto() },
      ],
    },
    { lebar: lebar.tinggi, isi: [{ jenis: "foto", foto: foto() }] },
  ];
}

export function BentoHeroBerjalan({
  jumlahUnit,
  jumlahSantri,
  className,
}: {
  jumlahUnit: number;
  jumlahSantri: string;
  className?: string;
}) {
  const galeri = getGaleri();
  if (galeri.length === 0) return null;

  const kolom = bangunKolom(galeri, jumlahUnit, jumlahSantri);

  return (
    <div
      className={cn(
        "group/dinding relative overflow-hidden",
        // Foto muncul dan lenyap berangsur di tepi kiri-kanan, bukan terpotong
        // garis lurus — itu yang membuatnya terbaca sebagai aliran.
        "[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-bento-jalan gap-4">
        {[0, 1].map((salinan) => (
          <div
            key={salinan}
            /* Salinan kedua hanya pengisi putaran: jangan diumumkan dua kali. */
            aria-hidden={salinan === 1 || undefined}
            className="flex h-[18rem] shrink-0 gap-4 sm:h-[22rem] lg:h-[25rem]"
          >
            {kolom.map((k, i) => (
              <div key={i} className={cn("flex shrink-0 flex-col gap-4", k.lebar)}>
                {k.isi.map((keping, j) => (
                  <KepingBento
                    key={j}
                    keping={keping}
                    /* Kolom pertama salinan pertama sudah terlihat saat halaman
                       dibuka, jadi hanya fotonya yang layak didahulukan. */
                    prioritas={salinan === 0 && i <= 1}
                    bisu={salinan === 1}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const dasarKeping = "overflow-hidden rounded-[1.5rem] ring-1 ring-ink/5";

function KepingBento({
  keping,
  prioritas,
  bisu,
}: {
  keping: Keping;
  prioritas: boolean;
  bisu: boolean;
}) {
  const porsi = keping.porsi ?? "flex-1";

  if (keping.jenis === "angka") {
    return (
      <div
        className={cn(
          dasarKeping,
          porsi,
          "relative flex flex-col justify-end bg-ink p-4 sm:p-5",
        )}
      >
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full bg-white text-ink sm:size-9"
        >
          <Icon nama={keping.ikon} className="size-4" />
        </span>
        <p className="font-display text-display-sm text-white sm:text-display-md">
          {keping.nilai}
        </p>
        <p className="mt-1 text-xs leading-snug text-white/70">{keping.label}</p>
      </div>
    );
  }

  if (keping.jenis === "kartu") {
    return (
      <div
        className={cn(
          dasarKeping,
          porsi,
          "flex flex-col justify-center bg-white p-4 sm:p-5",
        )}
      >
        <span className="inline-flex w-fit rounded-full bg-accent-50 px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.1em] text-accent-700 uppercase">
          {keping.penanda}
        </span>
        <p className="mt-3 font-display text-base font-bold text-balance text-ink sm:text-lg">
          {keping.judul}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-pretty text-ink-muted">
          {keping.teks}
        </p>
      </div>
    );
  }

  const { foto } = keping;

  return (
    <figure className={cn(dasarKeping, porsi, "relative bg-mist-100")}>
      <Image
        src={foto.src}
        alt={bisu ? "" : foto.alt}
        width={foto.width}
        height={foto.height}
        priority={prioritas}
        sizes="(min-width: 640px) 24rem, 60vw"
        className="size-full object-cover"
      />
      {keping.jenis === "fotoAngka" ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pt-10 pb-4">
          <p className="font-display text-display-sm text-white">{keping.nilai}</p>
          <p className="text-xs leading-snug text-white/75">{keping.label}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}
