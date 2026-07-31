import Image from "next/image";
import Link from "next/link";

import { Icon, type NamaIkon } from "@/components/ui/Icon";
import { JudulSeksi, Section } from "@/components/ui/Section";
import { routerNiat } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * PRD §9.1 blok 2 & §5.3 — lima pintu berdasarkan NIAT pengunjung.
 *
 * Susunannya: satu panel pengantar bernada hangat lalu lima kartu bergambar,
 * masing-masing berlabel kaca di tepi bawah. Kartu berbalik (flip 3D) saat
 * disentuh kursor untuk memunculkan penjelasan dan ajakan aksinya.
 *
 * Kriteria penerimaan: kelima kartu dapat diakses keyboard dan memiliki label
 * yang jelas. Setiap kartu adalah satu tautan tunggal, bukan div yang diberi
 * penangan klik — sisi belakang ikut terbuka saat tautannya menerima fokus
 * (`group-focus-visible`), jadi pengguna papan tuntas melihat isi yang sama.
 * Kedua sisi selalu ada di DOM sehingga pembaca layar tidak bergantung pada
 * hover; sisi depan disembunyikan dari pembacaan agar labelnya tidak ganda.
 */
export function RouterNiat() {
  return (
    <Section nada="sejuk">
      <div className="container-page">
        <JudulSeksi
          atas="Mulai dari sini"
          judul="Apa yang sedang"
          sorot="Anda cari"
          penutup="hari ini?"
          keterangan="Pilih satu pintu di bawah ini. Kami mengarahkan Anda langsung ke halaman yang tepat — tanpa perlu memahami struktur organisasi yayasan lebih dulu."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li className="sm:col-span-2 lg:col-span-1">
            <PanelPengantar />
          </li>

          {routerNiat.map((pintu) => (
            <li key={pintu.href} className="[perspective:1400px]">
              <Link
                href={pintu.href}
                className="group block h-full rounded-3xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                {/* Pembalik: satu-satunya elemen yang berputar, agar kedua sisi
                    tetap sebidang dan sudutnya tidak bergeser saat animasi. */}
                <div
                  className={cn(
                    "relative h-full min-h-[19rem] transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none",
                    "group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
                  )}
                >
                  <SisiDepan pintu={pintu} />
                  <SisiBelakang pintu={pintu} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

type Pintu = (typeof routerNiat)[number];

/** Sisi depan: foto penuh dengan label kaca yang mengapung di tepi bawah. */
function SisiDepan({ pintu }: { pintu: Pintu }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-3xl bg-brand-950 ring-1 ring-ink/10 [backface-visibility:hidden]"
    >
      <Image
        src={pintu.gambar}
        alt=""
        width={1200}
        height={900}
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
        className="size-full object-cover"
      />
      {/* Gelap berangsur di bawah supaya label tetap terbaca di foto mana pun. */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-950/70 to-transparent" />

      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-center backdrop-blur-md">
        <p className="font-display text-base font-semibold text-white">{pintu.label}</p>
        <p className="mt-0.5 text-xs leading-snug text-white/85">{pintu.ringkas}</p>
      </div>
    </div>
  );
}

/** Sisi belakang: penjelasan pintu dan ajakan aksinya. */
function SisiBelakang({ pintu }: { pintu: Pintu }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col rounded-3xl bg-brand-950 p-6 text-white ring-1 ring-ink/10",
        "[backface-visibility:hidden] [transform:rotateY(180deg)]",
      )}
    >
      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
        <Icon nama={pintu.ikon as NamaIkon} className="size-5 text-accent-200" tebal={1.8} />
      </span>

      <h3 className="mt-5 font-display text-lg font-semibold">{pintu.label}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-white/75">
        {pintu.deskripsi}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-200">
        {pintu.aksi}
        <Icon nama="panahKanan" className="size-3.5" tebal={2.2} />
      </span>
    </div>
  );
}

/** Panel pengantar yang menempati sel pertama kisi — pendamping kelima kartu. */
function PanelPengantar() {
  return (
    <div className="relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-3xl border border-accent-100 bg-accent-50 p-7">
      <h3 className="font-display text-xl leading-snug font-semibold text-balance text-brand-800">
        Lima pintu, satu yayasan
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-pretty text-ink-muted">
        Sepuluh unit pendidikan, kelas Al-Qur&apos;an untuk umum, dan lembaga amil zakat berizin —
        semuanya dapat Anda telusuri dari satu tempat.
      </p>

      {/* Ornamen sudut: simbol lembaga, sengaja samar dan dekoratif. */}
      <Image
        src="/img/logo-wm-simbol.png"
        alt=""
        aria-hidden="true"
        width={220}
        height={220}
        className="pointer-events-none absolute -right-6 -bottom-6 size-40 opacity-15 select-none"
      />
    </div>
  );
}
