import { CopyButton } from "@/components/ui/CopyButton";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Rekening } from "@/lib/schemas";

/** PRD §9.4 — rekening resmi LAZIS, dengan tautan salin. */
export function DaftarRekening({ rekening }: { rekening: readonly Rekening[] }) {
  if (rekening.length === 0) {
    return (
      <EmptyState
        judul="Nomor rekening sedang diperbarui"
        keterangan="Untuk sementara, silakan hubungi bagian LAZIS agar kami mengirimkan nomor rekening resmi langsung kepada Anda."
        aksi={{ label: "Hubungi LAZIS", href: "/kontak" }}
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {rekening.map((r) => (
        <li key={`${r.bank}-${r.nomor}`} className="rounded-2xl border border-line bg-white p-6">
          <h3 className="font-display text-base font-semibold text-ink">{r.bank}</h3>
          <p className="mt-1 text-xs leading-relaxed text-ink-subtle">{r.keterangan}</p>

          <div className="mt-5 rounded-xl bg-mist-50 p-4">
            {/* Ikon salin menempel pada nomornya, bukan terlempar ke tepi kartu:
                keduanya satu urusan, dan mata tidak perlu menyeberangi kartu
                untuk menemukan aksinya. */}
            <div className="flex items-center gap-1">
              <p className="font-display text-xl font-bold tracking-tight tabular-nums text-ink">
                {r.nomor}
              </p>
              <CopyButton
                teks={r.nomor.replace(/\D/g, "")}
                label={`Salin nomor rekening ${r.bank}`}
              />
            </div>
            <p className="mt-1 text-xs text-ink-muted">a.n. {r.atas_nama}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
