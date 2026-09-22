"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Testimoni } from "@/lib/schemas";

/**
 * Testimoni sebagai carousel geser. Geseran memakai scroll-snap bawaan
 * peramban, jadi swipe di layar sentuh dan gulir trackpad langsung jalan;
 * tombol dan titik hanya menggulir wadah yang sama.
 *
 * Auto-play maju tiap `JEDA_MS`. Begitu pengunjung menyentuh, menggeser,
 * menggulir, atau menekan kontrol, putaran berhenti untuk seterusnya, supaya
 * kutipan yang sedang dibaca tidak ditarik pergi. Kursor atau fokus keyboard
 * di dalam carousel hanya menjeda sementara. Tombol jeda/putar memenuhi
 * WCAG 2.2.2, dan putaran tidak jalan bila pengunjung meminta gerak dikurangi
 * atau carousel sedang di luar layar.
 */
const JEDA_MS = 6000;

export function CarouselTestimoni({ testimoni }: { testimoni: readonly Testimoni[] }) {
  const wadah = useRef<HTMLUListElement>(null);
  const [aktif, setAktif] = useState(0);
  const [bisaMundur, setBisaMundur] = useState(false);
  const [bisaMaju, setBisaMaju] = useState(false);
  /** Dihentikan pengunjung, bertahan sampai tombol putar ditekan lagi. */
  const [berhenti, setBerhenti] = useState(false);
  /** Jeda sementara selama kursor mouse atau fokus berada di dalam carousel. */
  const [dilayangi, setDilayangi] = useState(false);
  const [difokus, setDifokus] = useState(false);
  const [terlihat, setTerlihat] = useState(false);
  const [kurangiGerak, setKurangiGerak] = useState(false);

  const perbarui = useCallback(() => {
    const el = wadah.current;
    if (!el) return;
    const kartu = Array.from(el.children) as HTMLElement[];
    const lebarLangkah = kartu[1] ? kartu[1].offsetLeft - kartu[0]!.offsetLeft : el.clientWidth;
    setAktif(Math.min(kartu.length - 1, Math.round(el.scrollLeft / Math.max(1, lebarLangkah))));
    setBisaMundur(el.scrollLeft > 4);
    setBisaMaju(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;
    perbarui();
    el.addEventListener("scroll", perbarui, { passive: true });
    const amati = new ResizeObserver(perbarui);
    amati.observe(el);
    return () => {
      el.removeEventListener("scroll", perbarui);
      amati.disconnect();
    };
  }, [perbarui]);

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;
    const amati = new IntersectionObserver(([e]) => setTerlihat(e?.isIntersecting ?? false), {
      threshold: 0.5,
    });
    amati.observe(el);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ubahGerak = () => setKurangiGerak(media.matches);
    ubahGerak();
    media.addEventListener("change", ubahGerak);
    return () => {
      amati.disconnect();
      media.removeEventListener("change", ubahGerak);
    };
  }, []);

  const keKartu = useCallback((i: number) => {
    const el = wadah.current;
    const kartu = el?.children[i] as HTMLElement | undefined;
    if (!el || !kartu) return;
    // Diukur dari kartu pertama, jadi padding tepi wadah tidak ikut terhitung.
    const pertama = el.children[0] as HTMLElement;
    el.scrollTo({ left: kartu.offsetLeft - pertama.offsetLeft, behavior: "smooth" });
  }, []);

  // Semua kartu muat sekaligus (layar lebar), kontrol tidak ada gunanya.
  const adaGeser = bisaMundur || bisaMaju;
  const berputar = adaGeser && !berhenti && !dilayangi && !difokus && terlihat && !kurangiGerak;

  useEffect(() => {
    if (!berputar) return;
    // Timer dipasang ulang tiap kartu aktif berganti, jadi setiap kartu
    // mendapat waktu baca penuh, juga setelah digeser manual.
    const t = window.setTimeout(() => keKartu(bisaMaju ? aktif + 1 : 0), JEDA_MS);
    return () => window.clearTimeout(t);
  }, [berputar, aktif, bisaMaju, keKartu]);

  const hentikan = () => setBerhenti(true);

  return (
    <div
      className="mt-12"
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimoni"
      // Hanya mouse sungguhan: ketukan jari memicu "enter" tanpa "leave".
      onPointerEnter={(e) => e.pointerType === "mouse" && setDilayangi(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setDilayangi(false)}
      // Tombol jeda/putar dikecualikan, kalau tidak menekan "putar" justru
      // langsung menjeda lagi.
      onFocus={(e) => setDifokus(!(e.target as HTMLElement).hasAttribute("data-tombol-putar"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setDifokus(false);
      }}
    >
      <ul
        ref={wadah}
        // Sentuhan, seret, atau gulir roda/trackpad berarti pengunjung
        // mengambil alih; geseran asli tetap jalan seperti biasa.
        onPointerDown={hentikan}
        onWheel={hentikan}
        onTouchStart={hentikan}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto scroll-smooth px-4 pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "motion-reduce:scroll-auto sm:mx-0 sm:scroll-px-0 sm:px-0",
        )}
      >
        {testimoni.map((t, i) => (
          <li
            key={t.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${testimoni.length}`}
            className={cn(
              "flex shrink-0 basis-[85%] snap-start flex-col rounded-2xl border border-line bg-white p-6",
              "sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]",
            )}
          >
            <Icon nama="quran" className="size-6 text-accent-700" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-pretty text-ink italic">
              &ldquo;{t.kutipan}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              {t.foto ? (
                <Image
                  src={t.foto.src}
                  alt=""
                  width={t.foto.width}
                  height={t.foto.height}
                  sizes="40px"
                  className="size-10 rounded-full object-cover"
                />
              ) : null}
              <div>
                <p className="text-sm font-semibold text-ink">{t.nama}</p>
                <p className="text-xs text-ink-subtle">{t.peran}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {adaGeser ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {testimoni.map((t, i) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => {
                  hentikan();
                  keKartu(i);
                }}
                aria-label={`Tampilkan testimoni ${i + 1}`}
                aria-current={i === aktif ? "true" : undefined}
                className="group inline-flex size-6 items-center justify-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-200 motion-reduce:transition-none",
                    i === aktif ? "w-5 bg-brand-600" : "w-2 bg-brand-200 group-hover:bg-brand-300",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {kurangiGerak ? null : (
              <button
                type="button"
                onClick={() => setBerhenti((b) => !b)}
                data-tombol-putar=""
                aria-label={berhenti ? "Putar otomatis" : "Jeda putar otomatis"}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-full text-ink-muted",
                  "transition-colors duration-150 hover:text-brand-700",
                  "outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-600",
                )}
              >
                <Icon nama={berhenti ? "putar" : "jeda"} className="size-4" />
              </button>
            )}
            <TombolGeser
              label="Testimoni sebelumnya"
              putar
              nonaktif={!bisaMundur}
              onClick={() => {
                hentikan();
                keKartu(Math.max(0, aktif - 1));
              }}
            />
            <TombolGeser
              label="Testimoni berikutnya"
              nonaktif={!bisaMaju}
              onClick={() => {
                hentikan();
                keKartu(Math.min(testimoni.length - 1, aktif + 1));
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TombolGeser({
  label,
  putar = false,
  onClick,
  nonaktif,
}: {
  label: string;
  putar?: boolean;
  onClick: () => void;
  nonaktif: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={nonaktif}
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full",
        "border border-line bg-white text-ink transition-colors duration-150 hover:border-brand-300 hover:text-brand-700",
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-600",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <Icon nama="panah" className={cn("size-5", putar && "rotate-180")} />
    </button>
  );
}
