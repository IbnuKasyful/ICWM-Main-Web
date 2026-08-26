import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    /* `next-env.d.ts` dibangkitkan Next.js dan tidak boleh disunting.
       `.open-next/` dan `.wrangler/` berisi bundel hasil build untuk Cloudflare.
       Keduanya WAJIB diabaikan: `next build` menjalankan ESLint di dalam worker
       thread ber-stack kecil, dan mengurai bundel sebesar itu menjatuhkan worker
       (Windows: exit code 3221226505) sehingga build gagal tanpa pesan berguna. */
    ignores: [
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
