import type { MetadataRoute } from "next";

import { modePratinjau, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  /* Mode pratinjau: seluruh isi situs masih data contoh, jadi tidak satu pun
     halaman boleh dirayapi. Lihat `modePratinjau` di lib/site.ts. */
  if (modePratinjau) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
