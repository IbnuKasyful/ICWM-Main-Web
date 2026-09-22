import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Kartu dasar. Varian `interaktif` menambahkan efek angkat, dipakai bila
 * seluruh kartu dibungkus tautan.
 */
export function Card({
  children,
  className,
  interaktif = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interaktif?: boolean;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-white shadow-soft",
        interaktif &&
          "transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
