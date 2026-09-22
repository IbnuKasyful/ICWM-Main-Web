"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { labelJenjang } from "@/lib/format";
import type { Jenjang } from "@/lib/schemas";

const pintasan: { jenjang: Jenjang; href: string }[] = [
  { jenjang: "paud", href: "/program?jenjang=paud" },
  { jenjang: "sd", href: "/program?jenjang=sd" },
  { jenjang: "smp", href: "/program?jenjang=smp" },
  { jenjang: "sma", href: "/program?jenjang=sma" },
  { jenjang: "tinggi", href: "/program?jenjang=tinggi" },
  { jenjang: "non-formal", href: "/program?jenjang=non-formal" },
];

/**
 * Pintasan jenjang pada hero.
 *
 * Tepat satu keping selalu tampil tebal: keping pertama saat halaman dibuka,
 * lalu berpindah ke keping yang terakhir disentuh kursor, dan menetap di sana
 * meski kursor sudah pergi, sebagai jejak ke mana perhatian tadi diarahkan.
 *
 * Karena itu blok ini butuh state klien: CSS `:hover` tidak menyimpan ingatan
 * apa pun begitu kursor menjauh. Sorotan ikut berpindah saat keping menerima
 * fokus papan tik supaya perilakunya sama bagi yang tidak memakai tetikus.
 */
export function PintasanJenjang({ className }: { className?: string }) {
  const [aktif, setAktif] = useState(0);

  return (
    <ul className={cn("mt-3 flex flex-wrap gap-2", className)}>
      {pintasan.map((p, i) => (
        <li key={p.jenjang}>
          <Link
            href={p.href}
            onMouseEnter={() => setAktif(i)}
            onFocus={() => setAktif(i)}
            className={cn(
              "inline-flex rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-150",
              i === aktif
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-ink/10 bg-mist-50 text-ink",
            )}
          >
            {labelJenjang[p.jenjang]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
