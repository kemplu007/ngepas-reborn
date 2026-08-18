# KEM-19 — Catalog Performance Baseline Runbook v1

**Status:** Docs + CI workflow (menunggu approval founder, PR #31)
**Branch:** `feat/kem-19-catalog-performance-baseline-v1`
**Baseline main:** `4ae8e55` (KEM-16 `a2dbc36`, KEM-17 `b51d7c6` telah dipromosikan)

## 1. Tujuan

KEM-19 menetapkan keputusan arsitektur query katalog (filter, sort, pagination server-side) **berdasarkan bukti tren, bukan intuisi**. Runbook ini mengunci alat pengumpulan bukti: workflow GitHub Actions terjadwal yang membaca endpoint publik katalog secara read-only setiap minggu.

## 2. Cara kerja

Workflow `.github/workflows/catalog-baseline.yml` menjalankan skrip `.github/scripts/catalog-baseline.sh` yang melakukan satu warm-up (tidak dicatat) lalu **7 sampel GET** ke `GET /api/products` pada deployment Railway production. Setiap sampel merekam HTTP status, ukuran payload, jumlah produk, waktu koneksi TCP, TTFB, dan total waktu. Hasil ditulis ke `out/benchmark.csv`, `out/benchmark.json`, dan `out/summary.md`, lalu diunggah sebagai artifact GitHub dengan retensi 14 hari dan dirangkum pada job summary.

Skrip hanya gagal bila endpoint mengembalikan status non-2xx, respons tidak dapat di-parse sebagai JSON dengan struktur `.data[]`, atau skrip error. **Latency tidak dijadikan gate CI** pada fase bukti ini.

## 3. Trigger

| Trigger | Jadwal | Keterangan |
|---|---|---|
| `schedule` | Senin 02:17 UTC | Menit tidak bulat untuk menghindari beban tinggi GitHub Actions pada :00 [1] |
| `workflow_dispatch` | Manual kapan saja | Dari tab Actions → Catalog Performance Baseline → Run workflow |

> Catatan penting: trigger `schedule` hanya dieksekusi dari definisi workflow di **default branch (main)**. Definisi di branch fitur tidak dijalankan otomatis sampai di-merge. [2]

## 4. Bukti awal (17–18 Agt 2026, read-only, bukan benchmark formal)

| Metrik | Nilai |
|---|---|
| HTTP status | 200 |
| Ukuran payload | 3.836 byte |
| Jumlah produk | 4 |
| Rentang total 3 sampel pertama | 1,153–1,271 s |
| Median 4 sampel (uji skrip, 18 Agt 04:32 UTC) | 2,173 s (min 2,137 / max 2,682) |

Angka ini adalah **observasi awal**, bukan baseline resmi dan bukan SLA. Baseline resmi mulai terakumulasi dari run mingguan setelah PR #31 di-merge.

## 5. Decision gate (kapan membuka implementasi query server-side)

Implementasi `q`/filter/sort/`page`/`pageSize` hanya dibuka bila setidaknya **satu bukti produk** (katalog/payload bertumbuh konsisten atau trafik meningkat) **dan** **satu bukti pengalaman** (pengguna kesulitan menemukan/menyaring produk), yang didukung tren baseline berulang. Desain endpoint baru tetap diawali kontrak terpisah: bentuk permintaan/respons, metadata (`total`, `pageSize`, `page`), serta backward compatibility, sebelum menyentuh route hingga SQLite.

## 6. Guardrail

Tidak ada perubahan API, frontend runtime, schema SQLite, auth JWT, media/storage, atau billing. Skrip tidak memakai header admin/JWT dan tidak mengirim trafik agresif (7 sampel dengan jeda 1 detik). Zero-Cost Runway dan YAGNI tetap menjadi pagar utama: tidak ada service monitoring eksternal, worker Railway, atau background process aplikasi.

## 7. Referensi

[1] [Community insight — scheduled workflows dapat tertunda saat beban tinggi](https://dev.to/krissv/monitoring-github-actions-scheduled-workflows-a-practical-guide-31h7)
[2] [GitHub Docs — Events that trigger workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows)
[3] [GitHub Docs — Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data)
