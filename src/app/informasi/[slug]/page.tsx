import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/site/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { PostCard } from "@/components/ui/PostCard";
import { ProseHtml } from "@/components/ui/Prose";
import { getPetaNamaUnit, getPost, getPostsInduk, getSlugPostInduk, getUnit } from "@/lib/content";
import { labelCategory, labelLokasi, tanggal } from "@/lib/format";
import { buatMetadata, jsonldArticle } from "@/lib/seo";

/** PRD §8 — revalidasi on-demand lewat webhook; nilai ini menjadi jaring pengaman. */
export const revalidate = 3600;

export function generateStaticParams() {
  return getSlugPostInduk().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return buatMetadata({ judul: "Tulisan tidak ditemukan", deskripsi: "", path: "/informasi", noIndex: true });
  }
  return buatMetadata({
    judul: post.judul,
    deskripsi: post.ringkasan,
    // PRD §13 — kanonik mengikuti unit_utama, yang menentukan kepemilikan tulisan.
    path: `/informasi/${post.slug}`,
    gambar: post.gambar.src,
    jenis: "article",
    terbit: post.tanggal,
    penulis: post.penulis,
  });
}

export default async function HalamanTulisan({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const namaUnit = getPetaNamaUnit();
  const unitUtama = getUnit(post.unit_utama);

  const terkait = getPostsInduk()
    .filter((p) => p.slug !== post.slug && p.unit.some((u) => post.unit.includes(u)))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={jsonldArticle(post)} />

      <PageHeader
        jejak={[
          { label: "Informasi", href: "/informasi" },
          { label: post.judul, href: `/informasi/${post.slug}` },
        ]}
        atas={labelCategory[post.category]}
        judul={post.judul}
        keterangan={post.ringkasan}
      >
        <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Tanggal terbit</dt>
            <Icon nama="kalender" className="size-4 text-brand-500" />
            <dd>
              <time dateTime={post.tanggal}>{tanggal(post.tanggal)}</time>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Penulis</dt>
            <Icon nama="orang" className="size-4 text-brand-500" />
            <dd>{post.penulis}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Lokasi</dt>
            <Icon nama="pin" className="size-4 text-brand-500" />
            <dd>{labelLokasi[post.lokasi]}</dd>
          </div>
        </dl>
      </PageHeader>

      <article className="py-12 md:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl bg-sand-100">
              <Image
                src={post.gambar.src}
                alt={post.gambar.alt}
                width={post.gambar.width}
                height={post.gambar.height}
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <ProseHtml html={post.konten} className="mt-10" />

            {/* Taksonomi tulisan */}
            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                  Unit terkait
                </span>
                {post.unit.map((u) => (
                  <Link key={u} href={`/informasi?unit=${u}`}>
                    <Badge nada="brand">{namaUnit.get(u) ?? u}</Badge>
                  </Link>
                ))}
              </div>

              {post.topik.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    Topik
                  </span>
                  {post.topik.map((t) => (
                    <Badge key={t} nada="netral">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Jalur balik ke unit pemilik tulisan */}
            {unitUtama ? (
              <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-sand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                    Tulisan ini milik
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-ink">
                    {unitUtama.nama_lengkap}
                  </p>
                </div>
                <ButtonLink href={`/program/${unitUtama.slug}`} varian="garis" ukuran="sm">
                  Lihat profil unit
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </article>

      {terkait.length > 0 ? (
        <section className="bg-sand-50 py-14 md:py-20">
          <div className="container-page">
            <h2 className="font-display text-display-md text-ink">
              Tulisan <span className="text-brand-600">terkait</span>
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {terkait.map((p) => (
                <PostCard key={p.slug} post={p} namaUnit={namaUnit.get(p.unit_utama)} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
