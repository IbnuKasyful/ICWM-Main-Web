import { notFound, permanentRedirect } from "next/navigation";

import { getPost } from "@/lib/content";

/**
 * URL tulisan WordPress lama (`wadimubarak.com/<slug>/`) ke `/informasi/<slug>`.
 *
 * Route statis selalu didahulukan Next, jadi ini hanya menangkap segmen
 * tunggal yang tidak dikenal. Slug tulisan sama persis dengan di WordPress
 * lama karena arsipnya diimpor apa adanya, dan `getPost` menyertakan tulisan
 * yang tidak dinaikkan ke situs induk, jadi tautan lama ke tulisan itu juga
 * tetap terbuka. Halaman, kategori, dan arsip lama lainnya diarahkan di
 * `src/lib/redirect-lama.ts`.
 */
export default async function TulisanLama({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  permanentRedirect(`/informasi/${encodeURIComponent(post.slug)}`);
}
