import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const pintasan = [
  { label: "Cari unit pendidikan", href: "/program" },
  { label: "Berita & artikel", href: "/informasi" },
  { label: "Donasi lewat LAZIS", href: "/donasi" },
  { label: "Pertanyaan umum", href: "/faq" },
];

export default function TidakDitemukan() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <Icon nama="cari" className="size-6" />
          </span>

          <p className="mt-6 font-display text-display-lg text-brand-600">404</p>
          <h1 className="mt-2 font-display text-display-md text-balance text-ink">
            Halaman yang Anda cari tidak ada
          </h1>
          <p className="mt-4 text-base leading-relaxed text-pretty text-ink-muted">
            Alamatnya mungkin salah ketik, atau halaman ini sudah dipindahkan saat situs kami
            dirapikan. Berikut beberapa tempat yang paling sering dituju:
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {pintasan.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Kembali ke beranda</ButtonLink>
            <ButtonLink href="/kontak" varian="garis">
              Laporkan tautan rusak
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
