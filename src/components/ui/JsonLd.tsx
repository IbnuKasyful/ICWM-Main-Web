/**
 * Menyisipkan data terstruktur (PRD §13).
 *
 * `JSON.stringify` cukup aman karena keluarannya meng-escape tanda kutip;
 * `</script>` tetap dinetralkan secara eksplisit.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const isi = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: isi }} />
  );
}
