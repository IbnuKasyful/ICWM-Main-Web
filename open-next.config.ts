import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Adaptasi Next.js untuk Cloudflare Workers (OpenNext).
 *
 * Konfigurasi sengaja dibiarkan minimal: seluruh data situs masih berupa berkas
 * statis di `src/data/`, sehingga belum ada yang perlu di-cache antar-permintaan.
 * Lihat catatan pada `wrangler.jsonc` untuk langkah mengaktifkan cache ISR
 * ketika WPGraphQL tersambung pada Tahap 0.
 */
export default defineCloudflareConfig();
