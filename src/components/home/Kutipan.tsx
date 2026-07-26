/**
 * Pita kutipan di bawah hero — mengikuti bahasa desain referensi (kalimat
 * besar bergaya editorial di antara dua garis tipis).
 */
export function Kutipan({ teks, sumber }: { teks: string; sumber: string }) {
  return (
    <section aria-label="Kutipan" className="border-y border-line bg-white">
      <div className="container-page py-12 md:py-16">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-xl leading-snug text-balance text-ink italic md:text-display-sm">
            &ldquo;{teks}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm text-ink-subtle">{sumber}</figcaption>
        </figure>
      </div>
    </section>
  );
}
