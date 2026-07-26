import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Akordeon berbasis `<details>`.
 *
 * Disengaja tanpa JavaScript: dapat dibuka dengan keyboard, dirayapi mesin
 * pencari, dan tidak menambah bundel klien (PRD §12 & §14).
 */
export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white", className)}>
      {children}
    </div>
  );
}

export function AccordionItem({
  pertanyaan,
  children,
  terbukaAwal = false,
}: {
  pertanyaan: string;
  children: ReactNode;
  terbukaAwal?: boolean;
}) {
  return (
    <details className="group" open={terbukaAwal}>
      <summary
        className={cn(
          "flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 md:px-6",
          "font-display text-base leading-snug font-semibold text-ink transition-colors",
          "hover:bg-sand-50 group-open:bg-sand-50",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        <span className="text-pretty">{pertanyaan}</span>
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-brand-700 transition-transform duration-200 group-open:rotate-180 group-open:border-brand-200 group-open:bg-brand-50"
        >
          <Icon nama="panahBawah" className="size-4" />
        </span>
      </summary>
      <div className="px-5 pt-0 pb-6 text-sm leading-relaxed text-pretty text-ink-muted md:px-6">
        {children}
      </div>
    </details>
  );
}
