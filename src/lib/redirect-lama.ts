/**
 * Pengalihan URL WordPress lama di wadimubarak.com, dipakai `next.config.ts`.
 *
 * Saat situs ini mengambil alih domain utama, tautan lama masih tersebar di
 * Google, grup WhatsApp, dan situs lain. Berkas ini menangani semua bentuk URL
 * lama KECUALI tulisan (`/<slug>/`), yang diurus `src/app/[slug]/page.tsx`
 * karena daftarnya dibaca dari CMS, bukan dihafal di sini.
 *
 * Seperti `kategori-wp.ts`, berkas ini tidak boleh punya impor runtime ber-alias
 * `@/`, karena dimuat oleh konfigurasi Next.
 */

import { KATEGORI_INDUK, UNIT_DARI_KATEGORI } from "./kategori-wp";

type Pengalihan = { source: string; destination: string; permanent: boolean };

const CMS = "https://cms.wadimubarak.com";

/**
 * Halaman WordPress lama yang punya padanan di situs ini. Sisanya, kebanyakan
 * halaman demo tema (University, GYM Coach, toko, kursus), dikirim ke beranda
 * lewat `HALAMAN_DEMO`.
 */
const HALAMAN: Record<string, string> = {
  "/about-icwm": "/tentang",
  "/about-icwm/mimbar": "/tentang",
  "/about-icwm/pkm-wm-program-kaderisasi-muhaffizh-wadi-mubarak": "/program/pkm-wadi-mubarak",
  "/about-icwm/yayasan-sahabat-quran-yasaqu": "/tentang",
  "/about-icwm/pg-taud-saqu": "/program/pg-taud-saqu",
  "/about-icwm/lkid-saqu": "/program/pkm-wadi-mubarak",
  "/about-icwm/taud-saqu": "/program/taud-saqu",
  "/about-icwm/mit-saqu": "/program/mit-saqu",
  "/about-icwm/bimbel-saqu-bimbingan-belajar-sahabat-quran": "/tentang",
  "/about-icwm/lazis-saqu": "/donasi",
  "/about-icwm/wq-wisata-quran": "/program-quran#wisata-quran",
  "/about-us": "/tentang",
  "/about-us-2": "/tentang",
  "/profile": "/tentang",
  "/lembaga-wadi-mubarak": "/program",
  "/menu-lembaga": "/program",
  "/stiu-wadi-mubarak": "/program/stiu-wadi-mubarak",
  "/stiu-wadi-mubarak-2": "/program/stiu-wadi-mubarak",
  "/contact-us-2": "/kontak",
  "/contact-us-3": "/kontak",
  "/contact-us-4": "/kontak",
  "/gallery": "/galeri",
  "/gallery-2": "/galeri",
  "/gallery-3": "/galeri",
  "/video-wm": "/galeri",
  "/events": "/agenda",
  "/events-2": "/agenda",
  "/events-3": "/agenda",
  "/faq-3": "/faq",
  "/dunia": "/informasi?category=berita",
};

const HALAMAN_DEMO = [
  "beranda", "home", "home-2", "home-2-2", "home-3", "home-4", "home-5", "home-6", "home-7",
  "home-8", "home-9", "home-10", "home-11", "home-12", "home-13", "home-14", "home-15",
  "become-a-teacher", "course-two", "course-three", "course-four", "course-five",
  "courses", "courses-2", "online-courses", "apply-to-educavo", "undergraduate-programs",
  "graduate-programs", "doctoral-degrees", "international-hubs", "under-construction",
  "teachers-one", "teachers-two", "teachers-three", "instructors", "instructor",
  "shop", "shop-2", "cart", "cart-2", "checkout", "checkout-2", "my-account", "my-account-2",
  "tds-checkout", "tds-my-account", "tds-login-register", "publishing",
  "lp-checkout", "lp-checkout-2", "lp-profile", "lp-become-a-teacher",
  "lp-term-conditions", "lp-term-conditions-2",
  "blog-right-sidebar", "blog-left-sidebar", "blog-2-column", "blog-3-column",
];

/**
 * Arsip kategori lama ke penyaring /informasi. Kategori unit lebih tepat
 * disaring per unit; kategori yang tidak naik ke situs induk jatuh ke arsip
 * umum lewat aturan penampung di bawah. Kategori bertingkat juga punya URL
 * `/category/<induk>/<anak>/`, karena itu `:induk*`.
 */
function kategori(): Pengalihan[] {
  return Object.entries(KATEGORI_INDUK).map(([slug, category]) => {
    const unit = UNIT_DARI_KATEGORI[slug]?.[0];
    return {
      source: `/category/:induk*/${slug}`,
      destination: unit ? `/informasi?unit=${unit}` : `/informasi?category=${category}`,
      permanent: true,
    };
  });
}

export function redirectLama(): Pengalihan[] {
  return [
    // Berkas unggahan dan pintu admin pindah ke CMS, jalurnya tetap sama.
    { source: "/wp-content/uploads/:jalur*", destination: `${CMS}/wp-content/uploads/:jalur*`, permanent: true },
    { source: "/wp-admin/:jalur*", destination: `${CMS}/wp-admin/:jalur*`, permanent: true },
    { source: "/wp-login.php", destination: `${CMS}/wp-login.php`, permanent: true },
    { source: "/wp-json/:jalur*", destination: `${CMS}/wp-json/:jalur*`, permanent: true },

    ...Object.entries(HALAMAN).map(([source, destination]) => ({ source, destination, permanent: true })),
    ...HALAMAN_DEMO.map((slug) => ({ source: `/${slug}`, destination: "/", permanent: true })),

    ...kategori(),
    { source: "/category/:jalur*", destination: "/informasi", permanent: true },
    { source: "/tag/:jalur*", destination: "/informasi", permanent: true },
    { source: "/author/:jalur*", destination: "/informasi", permanent: true },
    { source: "/page/:nomor(\\d+)", destination: "/informasi", permanent: true },

    // Arsip tanggal WordPress: /2024/, /2024/05/, /2024/05/17/.
    { source: "/:tahun(\\d{4})/:sisa*", destination: "/informasi?tahun=:tahun", permanent: true },

    // Feed situs dan feed per tulisan.
    { source: "/feed", destination: "/feed.xml", permanent: true },
    { source: "/comments/feed", destination: "/feed.xml", permanent: true },
    { source: "/:slug/feed", destination: "/feed.xml", permanent: true },
  ];
}
