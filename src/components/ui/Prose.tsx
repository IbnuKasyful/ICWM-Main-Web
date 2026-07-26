import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Pembungkus konten kaya dari editor WordPress.
 *
 * Gaya ditulis sebagai selector turunan agar HTML dari CMS tetap rapi tanpa
 * plugin typography tambahan (PRD §6 — tanpa dependensi baru).
 */
const gaya = [
  "max-w-none text-[1.0625rem] leading-[1.75] text-ink-muted",
  "[&>*+*]:mt-5",
  "[&_h2]:font-display [&_h2]:text-display-sm [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3",
  "[&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-2",
  "[&_p]:text-pretty",
  "[&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-brand-800",
  "[&_strong]:font-semibold [&_strong]:text-ink",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:mt-2 [&_li]:marker:text-brand-400",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-accent-300 [&_blockquote]:pl-5 [&_blockquote]:font-display [&_blockquote]:text-lg [&_blockquote]:text-ink [&_blockquote]:italic",
  "[&_img]:rounded-xl",
  "[&_hr]:my-10 [&_hr]:border-line",
].join(" ");

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(gaya, className)}>{children}</div>;
}

/** Varian untuk HTML mentah dari CMS. Sumber tepercaya: hanya editor internal. */
export function ProseHtml({ html, className }: { html: string; className?: string }) {
  return <div className={cn(gaya, className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
