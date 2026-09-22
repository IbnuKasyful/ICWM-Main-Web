import { BentoHeroBerjalan } from "@/components/home/BentoHeroBerjalan";
import { PintasanJenjang } from "@/components/home/PintasanJenjang";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * PRD §9.1 blok 1, satu pesan, satu CTA utama. BUKAN carousel: carousel di
 * situs lama menurunkan performa dan nyaris tak pernah diklik melewati slide
 * pertama.
 *
 * Susunan tunggal dan terpusat: pesan, CTA, lalu pintasan jenjang menumpuk di
 * tengah, dan seluruh bidang gambar dipindah ke bawahnya sebagai dinding bento
 * melintang yang berjalan pelan. Alasannya: kalimat pembuka adalah satu-satunya
 * hal yang harus terbaca lebih dulu, jadi tidak ada gambar yang bersaing di
 * sebelahnya, dan begitu kalimat itu selesai dibaca, mata langsung jatuh ke
 * foto kegiatan yang nyata, bukan ke ilustrasi.
 */
export function Hero({
  jumlahUnit,
  jumlahAlumni,
}: {
  jumlahUnit: number;
  jumlahAlumni: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-brand-100/50 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-32 size-[28rem] rounded-full bg-accent-50/70 blur-3xl"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">


          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.2vw,4.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-balance text-ink">
            Pendidikan Qur&apos;ani{" "}
            <span className="text-brand-600">dari usia dini</span> sampai dewasa
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-ink-muted">
            Sebelas unit pendidikan, dari tahfizh anak usia dini sampai perguruan tinggi,
            beserta lembaga amil zakat, dalam satu naungan. Temukan unit yang
            benar-benar cocok untuk anak Anda sebelum menghubungi siapa pun.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/program" varian="kedua" ukuran="lg">
              Cari unit yang cocok
              <Icon nama="panah" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/tentang" varian="garis" ukuran="lg">
              Kenali yayasan
            </ButtonLink>
          </div>

          <div className="mt-9">
            <p className="text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
              Langsung ke jenjang
            </p>
            <PintasanJenjang className="justify-center" />
          </div>
        </div>
      </div>

      {/* Dinding foto sengaja keluar dari `container-page`: melintang selebar
          layar, ia terbaca sebagai aliran yang berlanjut di luar bingkai. */}
      <BentoHeroBerjalan
        jumlahUnit={jumlahUnit}
        jumlahAlumni={jumlahAlumni}
        className="mt-12 md:mt-16"
      />
    </section>
  );
}
