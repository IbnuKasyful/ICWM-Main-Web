import { getPostsInduk } from "@/lib/content";
import { site } from "@/lib/site";

/** PRD §8 — /feed.xml dibangkitkan dari tulisan yang tayang di induk. */
export const revalidate = 900;

function escapeXml(teks: string): string {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getPostsInduk()).slice(0, 30);
  const terbaru = posts[0];

  const butir = posts
    .map((p) =>
      [
        "    <item>",
        `      <title>${escapeXml(p.judul)}</title>`,
        `      <link>${site.url}/informasi/${p.slug}</link>`,
        `      <guid isPermaLink="true">${site.url}/informasi/${p.slug}</guid>`,
        `      <description>${escapeXml(p.ringkasan)}</description>`,
        `      <pubDate>${new Date(p.tanggal).toUTCString()}</pubDate>`,
        `      <author>${escapeXml(p.penulis)}</author>`,
        "    </item>",
      ].join("\n"),
    )
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(site.nama)}</title>`,
    `    <link>${site.url}</link>`,
    `    <description>${escapeXml(site.deskripsi)}</description>`,
    "    <language>id-ID</language>",
    `    <lastBuildDate>${new Date(terbaru?.tanggal ?? Date.now()).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    butir,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
