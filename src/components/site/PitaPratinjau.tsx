import { Icon } from "@/components/ui/Icon";

/**
 * Pita penanda pratinjau.
 *
 * Ditampilkan di atas kepala halaman selama `NEXT_PUBLIC_MODE_PRATINJAU=1`.
 * Tujuannya agar pengunjung yang menerima tautan demo tidak salah mengira
 * nomor rekening dan nomor legalitas di situs ini sudah resmi.
 */
export function PitaPratinjau() {
  return (
    <div
      role="status"
      className="bg-accent-700 px-4 py-2 text-center text-xs leading-relaxed font-semibold text-white"
    >
      <span className="container-page inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Icon nama="perisai" className="size-3.5" />
        <span className="tracking-[0.1em] uppercase">Pratinjau</span>
        <span aria-hidden="true" className="opacity-50">
          &middot;
        </span>
        <span className="font-normal">
          Seluruh isi halaman ini masih data contoh. Nomor rekening, nomor legalitas, dan nama
          pengurus <strong className="font-semibold">belum resmi</strong> dan tidak boleh dipakai.
        </span>
      </span>
    </div>
  );
}
