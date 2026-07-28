import Image from "next/image";

import { cn } from "@/lib/cn";
import { getGaleri } from "@/lib/content";
import type { ImageData } from "@/lib/schemas";

/**
 * Dinding foto bento yang berjalan naik pelan — pendamping visual untuk blok
 * "Sekilas yayasan".
 *
 * Dua kolom dengan laju berbeda supaya susunannya tidak pernah terbaca sebagai
 * tabel: satu kolom selalu tertinggal dari yang lain. Setiap kolom merender
 * daftarnya dua kali, lalu bergeser tepat sepanjang satu salinan, sehingga
 * putarannya menyambung tanpa sela dan tanpa JavaScript sama sekali —
 * komponen ini tetap komponen server.
 *
 * Gerak berhenti saat kursor menyentuh dinding (memberi kesempatan menatap satu
 * foto) dan saat pengunjung meminta pengurangan gerak lewat setelan sistemnya
 * (aturan global di globals.css).
 */
/**
 * Rasio kartu berputar tiga langkah. Tinggi bawaan berkas galeri (4:3 dan 4:5)
 * terlalu seragam untuk susunan bento; dipaksa begini, tiap kolom punya irama
 * tinggi-pendek yang jelas dan lebih banyak kartu tertangkap dalam satu layar.
 */
const rasio = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]"] as const;

export function BentoBerjalan({ className }: { className?: string }) {
  const galeri = getGaleri();
  if (galeri.length === 0) return null;

  // Selang-seling, bukan potong tengah: tinggi foto pada data ini berselang
  // 4:3 dan 4:5, jadi cara ini membuat kedua kolom sama-sama beragam.
  const kolomKiri = galeri.filter((_, i) => i % 2 === 0);
  const kolomKanan = galeri.filter((_, i) => i % 2 === 1);

  return (
    <div
      className={cn(
        // Tinggi pada lg disetel agar sepadan dengan kolom teks di sebelahnya.
        "group/bento relative h-[26rem] overflow-hidden sm:h-[32rem] lg:h-[38rem]",
        // Foto muncul dan lenyap berangsur di tepi atas-bawah, bukan terpotong
        // garis lurus — itu yang membuatnya terbaca sebagai aliran.
        "[mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_86%,transparent)]",
        className,
      )}
    >
      {/* Kolom kiri sengaja lebih sempit: kartunya jadi lebih kecil, dan dinding
          ini terbaca sebagai susunan bento, bukan dua jalur yang kembar. */}
      <div className="grid grid-cols-[5fr_6fr] gap-3 sm:gap-4">
        <Kolom gambar={kolomKiri} gerak="animate-bento-lambat" className="pt-12" />
        <Kolom gambar={kolomKanan} gerak="animate-bento-cepat" />
      </div>
    </div>
  );
}

function Kolom({
  gambar,
  gerak,
  className,
}: {
  gambar: ImageData[];
  gerak: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "flex flex-col gap-3 group-hover/bento:[animation-play-state:paused] sm:gap-4",
          gerak,
        )}
      >
        {[0, 1].map((salinan) =>
          gambar.map((g, i) => (
            <figure
              key={`${salinan}-${g.src}`}
              className={cn(
                "overflow-hidden rounded-2xl bg-mist-100 ring-1 ring-ink/5",
                rasio[i % rasio.length],
              )}
            >
              <Image
                src={g.src}
                /* Salinan kedua hanya pengisi putaran: jangan diumumkan dua kali. */
                alt={salinan === 0 ? g.alt : ""}
                width={g.width}
                height={g.height}
                priority={salinan === 0 && i === 0}
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 22vw, 45vw"
                className="size-full object-cover"
              />
            </figure>
          )),
        )}
      </div>
    </div>
  );
}
