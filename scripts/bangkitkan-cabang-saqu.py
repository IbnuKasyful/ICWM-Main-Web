# -*- coding: utf-8 -*-
"""Membangkitkan src/data/cabang-saqu.ts dari dua berkas resmi yayasan.

Sumber, taruh di folder `info/` di akar proyek:
    info/DATA TAUD SELINDO NEW.xlsx
    info/DATA MIT SELINDO NEW.xlsx

Sengaja memakai pustaka bawaan Python saja, xlsx hanyalah zip berisi XML,
supaya tidak menambah dependensi hanya untuk berkas yang jarang berubah.

Jalankan: python scripts/bangkitkan-cabang-saqu.py
"""
import zipfile, re, unicodedata, os
from xml.etree import ElementTree as ET

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "src", "data", "cabang-saqu.ts")
NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"


def colnum(ref):
    s = "".join(c for c in ref if c.isalpha())
    n = 0
    for c in s:
        n = n * 26 + ord(c) - 64
    return n - 1


def rows(f):
    z = zipfile.ZipFile(os.path.join(BASE, "info", f))
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")):
            shared.append("".join(t.text or "" for t in si.iter(NS + "t")))
    r = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
    out = []
    for row in r.iter(NS + "row"):
        cells = {}
        for c in row.iter(NS + "c"):
            t = c.get("t")
            v = c.find(NS + "v")
            isel = c.find(NS + "is")
            if isel is not None:
                val = "".join(x.text or "" for x in isel.iter(NS + "t"))
            elif v is None:
                continue
            elif t == "s":
                val = shared[int(v.text)]
            else:
                val = v.text
            cells[colnum(c.get("r"))] = (val or "").strip()
        if cells:
            out.append([cells.get(i, "") for i in range(max(cells) + 1)])
    return out


KEEP = {
    "TAUD": "TAUD", "SAQU": "SAQU", "MIT": "MIT", "MIS": "MIS", "SD": "SD",
    "SDT": "SDT", "SDIT": "SDIT", "MI": "MI", "RA": "RA", "TK": "TK", "KB": "KB",
    "PG": "PG", "WM": "WM", "RBK": "RBK", "RT": "RT", "RW": "RW", "RT/RW": "RT/RW",
    "KM": "KM", "II": "II", "III": "III", "IV": "IV", "V": "V", "VI": "VI",
    "IX": "IX", "XIII": "XIII", "A": "A", "I": "I", "HST": "HST",
    "KALSEL": "Kalsel", "SUMSEL": "Sumsel", "SULSEL": "Sulsel", "SULBAR": "Sulbar",
    "JABAR": "Jabar", "JAKTIM": "Jaktim", "NTB": "NTB", "NTT": "NTT", "DKI": "DKI",
    "DIY": "DIY", "PU": "PU", "BCA": "BCA", "UMK": "UMK", "OKU": "OKU",
    "GG": "Gg", "JL": "Jl", "JLN": "Jln", "NO": "No", "KH": "KH", "HJ": "Hj",
}


def cap_word(w):
    # Kapitalkan hanya huruf pertama tiap kata; apostrof di tengah kata tidak
    # memulai kata baru, supaya "QUR'AN" jadi "Qur'an" dan bukan "Qur'An".
    return re.sub(r"[A-Za-z][A-Za-z']*", lambda m: m.group(0).capitalize(), w)


def titlecase(s):
    out = []
    for w in " ".join(s.split()).split(" "):
        # Cocokkan ke KEEP tanpa tanda baca pengapit, supaya "IV," ikut kena.
        m = re.match(r"^([^\w]*)(.*?)([^\w]*)$", w, flags=re.S)
        depan, inti, belakang = m.group(1), m.group(2), m.group(3)
        if inti.upper() in KEEP:
            out.append(depan + KEEP[inti.upper()] + belakang)
        elif re.search(r"[a-z]", w) and not w.isupper():
            out.append(w)
        else:
            out.append(cap_word(w.lower()))
    return " ".join(out)


def fix_addr(s):
    s = titlecase(s)
    for a, b in (
        (r"\bRt\b", "RT"), (r"\bRw\b", "RW"), (r"\bRt\.", "RT."), (r"\bRw\.", "RW."),
        (r"\bRt/rw\b", "RT/RW"), (r"\bKm\b", "KM"),
        (r"\b(Jl|Jln|Kab|Kec|Kel|Ds|Komp|Perum|Gg)\.(?=[A-Za-z])", r"\1. "),
        (r"\bRt(?=\d)", "RT "), (r"\bRw(?=\d)", "RW "),
    ):
        s = re.sub(a, b, s)
    s = re.sub(r"^di\s+", "", s, flags=re.I)
    s = re.sub(r"\s+([,.])", r"\1", s)
    return re.sub(r"\s{2,}", " ", s).strip().strip(",").strip()


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower())


PROV = {
    "ACEH TIMUR": "Aceh", "ACEH": "Aceh", "SUMATERA UTARA": "Sumatera Utara",
    "SUMATERA BARAT": "Sumatera Barat", "RIAU": "Riau", "BENGKULU": "Bengkulu",
    "SUMATERA SELATAN": "Sumatera Selatan", "LAMPUNG": "Lampung",
    "KEPULAUAN BANGKA BELITUNG": "Kepulauan Bangka Belitung",
    "BANGKA BELITUNG": "Kepulauan Bangka Belitung", "BANTEN": "Banten",
    "JAWA BARAT": "Jawa Barat", "DKI JAKARTA": "DKI Jakarta",
    "JAWA TENGAH": "Jawa Tengah", "DIY YOGYAKARTA": "DI Yogyakarta",
    "DAERAH ISTIMEWA YOGYAKARTA": "DI Yogyakarta", "JAWA TIMUR": "Jawa Timur",
    "BALI": "Bali", "NUSA TENGGARA TIMUR": "Nusa Tenggara Timur",
    "NUSA TENGGARA BARAT": "Nusa Tenggara Barat",
    "KALIMANTAN BARAT": "Kalimantan Barat", "KALIMANTAN SELATAN": "Kalimantan Selatan",
    "KALIMATAN UTARA": "Kalimantan Utara", "KALIMANTAN UTARA": "Kalimantan Utara",
    "KALIMANTAN TIMUR": "Kalimantan Timur", "KALIMANTAN TENGAH": "Kalimantan Tengah",
    "SULAWESI SELATAN": "Sulawesi Selatan", "SULAWESI BARAT": "Sulawesi Barat",
    "SULAWESI TENGGARA": "Sulawesi Tenggara", "SULAWESI UTARA": "Sulawesi Utara",
    "MALUKU UTARA": "Maluku Utara",
}
PULAU = {
    "PULAU SUMATERA": "Sumatera", "PULAU JAWA": "Jawa", "PILAU JAWA": "Jawa",
    "PULAI JAWA": "Jawa", "PULAU BALI": "Bali",
    "KEPULAUAN NUSA TENGGARA": "Nusa Tenggara", "PULAU KALIMANTAN": "Kalimantan",
    "PULAU SULAWESI": "Sulawesi", "PULAU MALUKU": "Maluku",
}
URUT_PULAU = ["Sumatera", "Jawa", "Bali", "Nusa Tenggara", "Kalimantan", "Sulawesi", "Maluku"]

STOP = (
    r"(?=[,.]|\s+(?:PROV|KODE|RT|RW|JL|KEC|KEL|DESA|SUMSEL|KALSEL|SULSEL|SULBAR"
    r"|HST|MADURA|NTB|SUMATERA|JAWA|KALIMANTAN|SULAWESI|RIAU|BANTEN)|\s*$)"
)
# Nama daerah yang terpotong karena kata keduanya kebetulan masuk daftar STOP.
UTUH = {"Banda": "Banda Aceh", "Bandar": "Bandar Lampung", "Peisir Selatan": "Pesisir Selatan",
        "Polman Mandar": "Polewali Mandar", "Polman": "Polewali Mandar",
        "Enrekang Sulsel": "Enrekang", "Lahat Sumatera": "Lahat"}


def rapikan_daerah(nama):
    nama = " ".join(nama.split())
    return UTUH.get(nama, nama)


def kota_dari_alamat(addr):
    a = " " + re.sub(r"\s+", " ", addr.upper()) + " "
    m = re.search(r"\bKAB(?:UPATEN)?\.?\s+([A-Z' ]{3,28}?)" + STOP, a)
    if m:
        return "Kabupaten " + rapikan_daerah(titlecase(m.group(1)))
    m = re.search(r"\bKOTA\s+([A-Z' ]{3,28}?)" + STOP, a)
    if m:
        return "Kota " + rapikan_daerah(titlecase(m.group(1)))
    return ""


def kota_dari_nama(nama):
    """Nama sekolah pada lembar MIT memuat daerahnya setelah koma terakhir."""
    if "," not in nama:
        return ""
    ekor = titlecase(nama.rsplit(",", 1)[1])
    ekor = re.sub(r"\b(Aceh|Madura)\s*$", "", ekor).strip()
    ekor = re.sub(r"^Kab\.?\s+", "Kabupaten ", ekor)
    return rapikan_daerah(ekor)


def wa(raw):
    d = re.sub(r"\D", "", (raw or "").split("/")[0])
    if not d:
        return ""
    d = d.lstrip("0")
    return d if d.startswith("62") else "62" + d


def nama_lembaga(nm):
    nm = re.sub(r"\bSaqu\b", "SAQU", titlecase(nm))
    nm = nm.replace("SAQU - ", "SAQU ").replace("Elemantary", "Elementary")
    return " ".join(nm.split())


# Provinsi pada lembar TAUD yang keliru diisi (alamatnya jelas di provinsi lain).
KOREKSI_PROVINSI = {"taud-saqu-syaikh-abdurrahman-al-ied-wadi-mubarak-yogyakarta": "DI Yogyakarta"}

taud, seen = [], set()
for r in rows("DATA TAUD SELINDO NEW.xlsx")[1:]:
    r += [""] * 8
    pulau, prov, _no, nama, alamat, _kepsek, cp = r[:7]
    if not nama.strip():
        continue
    s = slugify(nama)
    while s in seen:
        s += "-2"
    seen.add(s)
    taud.append(
        dict(
            slug=s,
            nama=nama_lembaga(nama),
            provinsi=KOREKSI_PROVINSI.get(s, PROV.get(" ".join(prov.upper().split()), titlecase(prov))),
            pulau=PULAU.get(" ".join(pulau.upper().split()), titlecase(pulau)),
            kota=kota_dari_alamat(alamat),
            alamat=fix_addr(alamat),
            kontak_wa=wa(cp),
        )
    )

# Lembar MIT: kolom kabupaten/kecamatan tergeser pada sebagian baris, jadi hanya
# kolom pulau, provinsi, dan nama yang dipakai. Daerah diambil dari nama sekolah.
mit, seen = [], set()
for r in rows("DATA MIT SELINDO NEW.xlsx")[1:]:
    r += [""] * 6
    pulau, prov1, prov2, nama = r[:4]
    if not nama.strip():
        continue
    s = slugify(nama.split(",")[0])
    while s in seen:
        s += "-2"
    seen.add(s)
    prov = prov2.strip() or prov1
    mit.append(
        dict(
            slug=s,
            nama=nama_lembaga(nama.split(",")[0]),
            provinsi=PROV.get(" ".join(prov.upper().split()), titlecase(prov)),
            pulau=PULAU.get(" ".join(pulau.upper().split()), titlecase(pulau)),
            kota=kota_dari_nama(nama),
            alamat="",
            kontak_wa="",
        )
    )


def urut(d):
    return (
        URUT_PULAU.index(d["pulau"]) if d["pulau"] in URUT_PULAU else 99,
        d["provinsi"],
        d["nama"],
    )


taud.sort(key=urut)
mit.sort(key=urut)


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def blok(items, pakai_alamat):
    baris = []
    for d in items:
        f = [
            f'slug: "{esc(d["slug"])}"',
            f'nama: "{esc(d["nama"])}"',
            f'provinsi: "{esc(d["provinsi"])}"',
            f'pulau: "{esc(d["pulau"])}"',
        ]
        if d["kota"]:
            f.append(f'kota: "{esc(d["kota"])}"')
        if pakai_alamat and d["alamat"]:
            f.append(f'alamat: "{esc(d["alamat"])}"')
        if d["kontak_wa"]:
            f.append(f'kontak_wa: "{d["kontak_wa"]}"')
        f.append('status_ppdb: "buka"')
        baris.append("  { " + ", ".join(f) + " },")
    return "\n".join(baris)


prov_taud = len({d["provinsi"] for d in taud})
prov_mit = len({d["provinsi"] for d in mit})

isi = f'''/**
 * Direktori cabang jaringan Sahabat Al-Qur'an (SAQU).
 *
 * DIBANGKITKAN dari dua berkas resmi yayasan di `info/`:
 *   - `DATA TAUD SELINDO NEW.xlsx`  → {len(taud)} TAUD di {prov_taud} provinsi
 *   - `DATA MIT SELINDO NEW.xlsx`   → {len(mit)} MIT/SD di {prov_mit} provinsi
 *
 * Jangan disunting tangan: perbarui berkas xlsx-nya lalu bangkitkan ulang.
 *
 * Catatan sumber:
 *   - Lembar MIT memuat kolom kabupaten dan kecamatan yang tergeser pada
 *     sebagian baris, sehingga hanya pulau, provinsi, dan nama yang dipakai;
 *     daerahnya diambil dari nama sekolah yang memang memuatnya.
 *   - Lembar TAUD tidak mencantumkan status PPDB per cabang, jadi seluruh
 *     cabang ditandai `buka` mengikuti status unit induknya.
 */

import type {{ Cabang }} from "@/lib/schemas";

export const cabangTaudSaqu: Cabang[] = [
{blok(taud, True)}
];

export const cabangMitSaqu: Cabang[] = [
{blok(mit, False)}
];
'''

with open(OUT, "w", encoding="utf-8", newline="\n") as f:
    f.write(isi)
print(f"wrote {len(taud)} TAUD ({prov_taud} prov) + {len(mit)} MIT ({prov_mit} prov) -> {OUT}")
