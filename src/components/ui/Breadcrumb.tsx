import Link from "next/link";

import { JsonLd } from "@/components/ui/JsonLd";
import { jsonldBreadcrumb } from "@/lib/seo";
import { cn } from "@/lib/cn";

export type JejakItem = { label: string; href: string };

/**
 * Remah roti + JSON-LD `BreadcrumbList` sekaligus (PRD §13), agar tidak pernah
 * ada halaman dalam yang punya remah roti tanpa data terstruktur.
 */
export function Breadcrumb({
  jejak,
  terang = false,
  className,
}: {
  jejak: JejakItem[];
  terang?: boolean;
  className?: string;
}) {
  const lengkap: JejakItem[] = [{ label: "Beranda", href: "/" }, ...jejak];
  const terakhir = lengkap.length - 1;

  return (
    <>
      <JsonLd data={jsonldBreadcrumb(lengkap)} />
      <nav aria-label="Remah roti" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {lengkap.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden="true" className={terang ? "text-white/35" : "text-ink-subtle"}>
                  /
                </span>
              ) : null}
              {i === terakhir ? (
                <span
                  aria-current="page"
                  className={cn("font-medium", terang ? "text-white" : "text-ink")}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-4 hover:underline",
                    terang ? "text-white/70 hover:text-white" : "text-ink-muted hover:text-brand-700",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
