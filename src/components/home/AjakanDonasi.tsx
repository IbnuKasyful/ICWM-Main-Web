import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Progress } from "@/components/ui/Progress";
import type { ProgramDonasi } from "@/lib/schemas";
import { site } from "@/lib/site";

/** PRD §9.1 blok 6, satu blok ajakan donasi menuju /donasi. */
export function AjakanDonasi({ sorot }: { sorot: ProgramDonasi | undefined }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-brand-950 text-white">
          <Image
            src="/img/hero-donasi.svg"
            alt=""
            width={1600}
            height={900}
            sizes="100vw"
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/40"
          />

          <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-8 md:p-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:p-16">
            <div>
              <h2 className="max-w-xl font-display text-display-md text-balance text-white md:text-display-lg">
                Titipkan zakat Anda pada tim amil yang{" "}
                <span className="text-accent-300">Anda kenal jejaknya</span>
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-white/70">
                {site.lazis.nama} menyalurkan zakat, infak, sedekah, dan wakaf untuk beasiswa santri
                yatim, pembangunan asrama, dan kelas Al-Qur&apos;an gratis untuk masyarakat. Setiap
                program menyebut peruntukan, satuan biaya, dan penerima manfaatnya.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/donasi" varian="terang" ukuran="lg">
                  Lihat program donasi
                  <Icon nama="panah" className="size-4" />
                </ButtonLink>
              </div>
            </div>

            {sorot ? (
              <div className="rounded-2xl bg-white p-6 shadow-lift">
                <p className="text-xs font-semibold tracking-[0.12em] text-accent-700 uppercase">
                  Sedang berjalan
                </p>
                <h3 className="mt-3 font-display text-lg leading-snug font-semibold text-ink">
                  {sorot.judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{sorot.ringkasan}</p>
                <Progress terkumpul={sorot.terkumpul} target={sorot.target} className="mt-5" />
                <ButtonLink
                  href={`/donasi/${sorot.slug}`}
                  varian="garis"
                  ukuran="sm"
                  className="mt-5 w-full"
                >
                  Rincian program
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
