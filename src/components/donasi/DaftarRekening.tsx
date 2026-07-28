import { CopyButton } from "@/components/ui/CopyButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { labelJenisDonasi } from "@/lib/format";
import type { Rekening } from "@/lib/schemas";

const penjelasan: Record<Rekening["jenis"], string> = {
  zakat: "Zakat mal dan zakat fitrah. Disalurkan hanya kepada delapan asnaf.",
  infak: "Dana bebas peruntukan untuk operasional program pendidikan dan sosial.",
  sedekah: "Sedekah umum, termasuk sedekah dapur santri dan santunan insidental.",
  wakaf: "Wakaf uang untuk pembangunan sarana dan pengadaan aset produktif.",
};

/** PRD §9.4 — rekening resmi per jenis, dengan tautan salin. */
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
        <li key={`${r.jenis}-${r.nomor}`} className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                {labelJenisDonasi[r.jenis]}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-subtle">{penjelasan[r.jenis]}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-mist-50 p-4">
            <p className="text-xs text-ink-subtle">{r.bank}</p>
            <p className="mt-1 font-display text-xl font-bold tracking-tight tabular-nums text-ink">
              {r.nomor}
            </p>
            <p className="mt-1 text-xs text-ink-muted">a.n. {r.atas_nama}</p>
            <CopyButton
              teks={r.nomor.replace(/\s/g, "")}
              label="Salin nomor"
              className="mt-3"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
