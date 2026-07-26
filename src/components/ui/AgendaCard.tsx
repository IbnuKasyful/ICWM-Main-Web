import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { hari, labelLokasi, rentangWaktu } from "@/lib/format";
import type { Agenda } from "@/lib/schemas";
import { cn } from "@/lib/cn";

const bulanPendek = new Intl.DateTimeFormat("id-ID", { month: "short", timeZone: "Asia/Jakarta" });
const tanggalAngka = new Intl.DateTimeFormat("id-ID", { day: "2-digit", timeZone: "Asia/Jakarta" });

export function AgendaCard({
  agenda,
  namaUnit,
  className,
}: {
  agenda: Agenda;
  namaUnit?: string | undefined;
  className?: string;
}) {
  const mulai = new Date(agenda.mulai);

  return (
    <li
      className={cn(
        "flex gap-5 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand-200",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-800"
      >
        <span className="font-display text-xl leading-none font-bold">
          {tanggalAngka.format(mulai)}
        </span>
        <span className="mt-1 text-[0.65rem] font-semibold tracking-wide uppercase">
          {bulanPendek.format(mulai).replace(".", "")}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {agenda.terbuka_umum ? (
            <Badge nada="sukses">Terbuka untuk umum</Badge>
          ) : (
            <Badge nada="netral">Internal / undangan</Badge>
          )}
          {namaUnit ? <Badge nada="netral">{namaUnit}</Badge> : null}
        </div>

        <h3 className="mt-2 font-display text-base leading-snug font-semibold text-balance text-ink">
          {agenda.judul}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {agenda.ringkasan}
        </p>

        <dl className="mt-3 flex flex-col gap-1.5 text-xs text-ink-subtle">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Waktu</dt>
            <Icon nama="jam" className="size-3.5 text-brand-500" />
            <dd>
              <time dateTime={agenda.mulai}>
                {hari(agenda.mulai)}, {rentangWaktu(agenda.mulai, agenda.selesai)}
              </time>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Tempat</dt>
            <Icon nama="pin" className="size-3.5 text-brand-500" />
            <dd>
              {agenda.tempat} · {labelLokasi[agenda.lokasi]}
            </dd>
          </div>
        </dl>
      </div>
    </li>
  );
}
