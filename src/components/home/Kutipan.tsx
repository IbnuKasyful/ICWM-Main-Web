import { Amiri } from "next/font/google";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-amiri",
});

/**
 * Pita kutipan di bawah hero — mengikuti bahasa desain referensi (kalimat
 * besar bergaya editorial di antara dua garis tipis).
 */
export function Kutipan({ teks, sumber, arab }: { teks: string; sumber: string; arab?: boolean }) {
  return (
    <section aria-label="Kutipan" className="border-y border-line bg-white">
      <div className="container-page py-12 md:py-16">
        <figure className="mx-auto max-w-4xl text-center">
          {arab ? (
            <blockquote
              dir="rtl"
              className={`text-3xl leading-[1.8] text-balance text-ink md:text-5xl pb-4 ${amiri.className}`}
              style={{ fontFamily: '"DecoType Thuluth", "Traditional Arabic", var(--font-amiri), serif' }}
            >
              {teks}
            </blockquote>
          ) : (
            <blockquote className="font-display text-xl leading-snug text-balance text-ink italic md:text-display-sm">
              &ldquo;{teks}&rdquo;
            </blockquote>
          )}
          <figcaption className={`mt-5 text-ink-subtle ${arab ? "text-lg md:text-xl italic" : "text-sm md:text-base"}`}>
            {sumber}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
