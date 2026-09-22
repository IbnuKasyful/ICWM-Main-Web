"""Membangkitkan `src/data/peta-provinsi.ts`, jalur SVG tiap provinsi Indonesia.

Sumber: Natural Earth 1:50m Admin 1 – States, Provinces (domain publik, CC0),
berkas `geojson/ne_50m_admin_1_states_provinces.geojson` dari repositori
nvkelso/natural-earth-vector.

Cara pakai (butuh sambungan internet sekali saja):

    python scripts/bangkitkan-peta-provinsi.py

Yang dilakukan:
  1. Mengunduh berkas Natural Earth bila belum ada di folder sementara.
  2. Menyaring fitur beradmin "Indonesia".
  3. Menyederhanakan garis pantai (Douglas–Peucker) dan membuang pulau yang
     terlalu kecil untuk terlihat, supaya berkasnya tetap ringan.
  4. Memproyeksikan bujur/lintang ke koordinat SVG (equirectangular; di dekat
     khatulistiwa distorsinya kecil dan tidak ada bujur yang melar).

Catatan wilayah: Natural Earth 50m masih memakai pembagian provinsi lama,
sehingga Kalimantan Utara belum terpisah dari Kalimantan Timur. Penggabungan
wilayah seperti itu ditangani di sisi tampilan (`PetaPersebaran`), bukan di
sini, berkas ini hanya memuat bentuk geografisnya.
"""

from __future__ import annotations

import json
import math
import os
import tempfile
import urllib.request

SUMBER = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/"
    "geojson/ne_50m_admin_1_states_provinces.geojson"
)

# Bidang gambar. Lebar 1000 satuan; tingginya mengikuti rentang lintang.
LEBAR = 1000.0
# Kotak batas Indonesia, dilebihkan sedikit agar garis pantai tidak terpotong.
LON_MIN, LON_MAX = 94.8, 141.2
LAT_MIN, LAT_MAX = -11.2, 6.2

# Toleransi penyederhanaan dalam derajat (±5 km) dan luas minimum pulau yang
# masih digambar. Keduanya hasil coba-coba: cukup kasar untuk memangkas berkas,
# masih cukup halus supaya Sulawesi dan Maluku tetap dikenali.
EPSILON = 0.035
LUAS_MIN = 0.02


def unduh() -> dict:
    singgahan = os.path.join(tempfile.gettempdir(), "ne_50m_admin_1_states_provinces.geojson")
    if not os.path.exists(singgahan):
        print("Mengunduh Natural Earth…")
        urllib.request.urlretrieve(SUMBER, singgahan)
    with open(singgahan, encoding="utf-8") as f:
        return json.load(f)


def jarak_ke_garis(t, a, b) -> float:
    (x, y), (x1, y1), (x2, y2) = t, a, b
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(x - x1, y - y1)
    return abs(dy * x - dx * y + x2 * y1 - y2 * x1) / math.hypot(dx, dy)


def sederhanakan(titik: list, eps: float) -> list:
    if len(titik) < 3:
        return titik
    terjauh, indeks = 0.0, 0
    for i in range(1, len(titik) - 1):
        d = jarak_ke_garis(titik[i], titik[0], titik[-1])
        if d > terjauh:
            terjauh, indeks = d, i
    if terjauh <= eps:
        return [titik[0], titik[-1]]
    kiri = sederhanakan(titik[: indeks + 1], eps)
    kanan = sederhanakan(titik[indeks:], eps)
    return kiri[:-1] + kanan


def luas(cincin: list) -> float:
    n = len(cincin)
    jumlah = 0.0
    for i in range(n):
        x1, y1 = cincin[i]
        x2, y2 = cincin[(i + 1) % n]
        jumlah += x1 * y2 - x2 * y1
    return abs(jumlah) / 2


def proyeksi(lon: float, lat: float) -> tuple[float, float]:
    skala = LEBAR / (LON_MAX - LON_MIN)
    return ((lon - LON_MIN) * skala, (LAT_MAX - lat) * skala)


def jalur(cincin: list) -> str:
    potong = []
    for lon, lat in cincin:
        x, y = proyeksi(lon, lat)
        potong.append(f"{x:.1f} {y:.1f}")
    return "M" + "L".join(potong) + "Z"


def poligon(geom: dict) -> list:
    if geom["type"] == "Polygon":
        return [geom["coordinates"]]
    return geom["coordinates"]


def main() -> None:
    data = unduh()
    hasil: dict[str, str] = {}

    for fitur in data["features"]:
        prop = fitur["properties"]
        if prop.get("admin") != "Indonesia":
            continue
        nama = prop["name"]
        potongan = []
        for poli in poligon(fitur["geometry"]):
            luar = poli[0]
            if luas(luar) < LUAS_MIN:
                continue
            ringkas = sederhanakan([tuple(t) for t in luar], EPSILON)
            if len(ringkas) < 4:
                continue
            potongan.append(jalur(ringkas))
        if potongan:
            hasil[nama] = "".join(potongan)

    tinggi = (LAT_MAX - LAT_MIN) * (LEBAR / (LON_MAX - LON_MIN))
    baris = [
        "/**",
        " * Bentuk provinsi Indonesia sebagai jalur SVG.",
        " *",
        " * DIBANGKITKAN oleh `scripts/bangkitkan-peta-provinsi.py` dari Natural Earth",
        " * 1:50m Admin 1 (domain publik / CC0). Jangan disunting tangan.",
        " *",
        " * Garis pantainya sengaja disederhanakan (±5 km) dan pulau-pulau kecil",
        " * dibuang: peta ini dipakai sebagai penanda sebaran, bukan rujukan wilayah.",
        " * Natural Earth 50m masih memakai 33 provinsi, jadi Kalimantan Utara belum",
        " * terpisah dari Kalimantan Timur.",
        " */",
        "",
        f"export const petaViewBox = \"0 0 {LEBAR:.0f} {tinggi:.0f}\";",
        "",
        "export const jalurProvinsi: Record<string, string> = {",
    ]
    for nama, d in sorted(hasil.items()):
        baris.append(f'  "{nama}": "{d}",')
    baris.append("};")
    baris.append("")

    keluaran = os.path.join("src", "data", "peta-provinsi.ts")
    with open(keluaran, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(baris))

    ukuran = os.path.getsize(keluaran) // 1024
    print(f"{len(hasil)} provinsi → {keluaran} ({ukuran} KB)")


if __name__ == "__main__":
    main()
