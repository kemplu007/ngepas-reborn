# Ngepas Reborn — KEM-49 Scale Trigger Review v1

**Status:** Review-ready · no-build decision
**Issue:** [KEM-49 — PR-H Scale Trigger Review](https://linear.app/kemplu/issue/KEM-49/pr-h-scale-trigger-review)
**Branch:** `docs/kem-49-scale-trigger-review-v1`
**Baseline:** `origin/main@2723a1f`
**Tanggal review:** 18 Agustus 2026

## 1. Tujuan keputusan

PR-H menilai apakah Ngepas sudah membutuhkan pagination, index SQLite tambahan, cache, atau pemisahan data public/admin. Review ini tidak merupakan mandat untuk membangun salah satu solusi tersebut. Keputusan hanya boleh dibuka oleh bukti katalog dan kebutuhan pengguna yang nyata, bukan karena solusi teknis tersebut terlihat “siap untuk nanti”.

> **Keputusan KEM-49:** **no-build.** Pertahankan kontrak `GET /api/products` yang ada, benchmark mingguan KEM-19, serta boundary public/admin KEM-33. Tidak ada pagination, query parameter, index, cache, worker, atau pemisahan state baru yang dibenarkan pada review ini.

## 2. Evidence yang diperiksa

| Evidence | Hasil | Batas interpretasi |
| --- | --- | --- |
| Benchmark KEM-19 sebelumnya | Run manual berhasil pada 18 Agustus 2026 pukul 04:45 UTC: 7 sampel, 4 produk, payload 3.836 byte per respons, median total 0,157 dtk. [1] | Satu observasi sukses, bukan SLA atau tren kapasitas. |
| Benchmark KEM-19 terbaru | Run manual pada `main@2723a1f` berhasil pada 18 Agustus 2026 pukul 22:34 UTC: 7 sampel, 4 produk, payload 3.836 byte per respons, median total 0,146 dtk; rentang 0,119–0,153 dtk. [2] | Endpoint dapat dibaca dan payload tetap kecil; latency tidak menjadi CI gate. |
| Riwayat baseline | Saat review dilakukan, hanya dua run manual yang tersedia; belum terbentuk tren mingguan berulang dari default branch. [1] [2] | Tidak cukup untuk menggeneralisasi kapasitas atau menetapkan angka ambang baru. |
| Kebutuhan pengalaman pengguna | Audit issue Ngepas Reborn tidak menemukan laporan terstruktur tentang kesulitan menemukan, menyaring, mengurutkan, atau memuat katalog. | Tidak ada bukti user-job yang membuka desain query baru. |
| Kontrak dan boundary aktif | KEM-19 menyatakan pagination/search server-side hanya dibuka setelah bukti produk dan bukti pengalaman pengguna tersedia; KEM-33 sudah membatasi katalog publik ke produk Published. [3] [4] | Mengubah list sekarang akan mencampur hardening selesai dengan optimasi spekulatif. |

## 3. Penilaian decision gate

| Gate yang wajib terpenuhi | Evidence saat ini | Keputusan |
| --- | --- | --- |
| Bukti produk: katalog/payload bertumbuh konsisten atau trafik meningkat | **Belum terpenuhi.** Katalog tetap 4 produk dan payload tetap 3.836 byte per respons pada kedua run yang tersedia. | Jangan mendesain page size, index, cache, atau kontrak query. |
| Bukti pengalaman: pengguna kesulitan menemukan, menyaring, mengurutkan, atau memuat katalog | **Belum terpenuhi.** Tidak ada reproduksi langkah, route/surface, state UX, atau dampak tugas pengguna yang tercatat. | Jangan membangun search/filter/pagination atas asumsi. |
| Tren baseline berulang | **Belum terpenuhi.** Dua run manual sukses belum merupakan baseline mingguan. | Pertahankan workflow KEM-19 sebagai observability ringan, bukan quality gate latency. |
| Backward compatibility | **Belum perlu diputuskan.** Tidak ada proposal API baru yang memenuhi gate. | `GET /api/products` dan consumer Service → Context → Component tidak diubah. |

## 4. Trigger eskalasi berikutnya

Review ulang hanya dimulai apabila terdapat **setidaknya satu bukti produk/trafik** dan **satu bukti pengalaman pengguna** berikut secara bersamaan.

| Kelompok bukti | Minimum evidence yang harus dicatat | Tindak lanjut aman |
| --- | --- | --- |
| Produk atau trafik | Catatan berulang dari benchmark KEM-19 mengenai jumlah produk dan payload, atau data trafik yang menunjukkan list katalog menjadi permukaan beban nyata. | Buka ADR/contract khusus untuk budget payload dan compatibility; belum menulis kode. |
| Pengalaman pengguna | Reproduksi langkah yang dapat diuji, route/surface terdampak, state loading/empty/error, dan dampak pada tugas menemukan atau memilih produk. | Tentukan apakah masalah benar-benar membutuhkan query server-side atau dapat selesai di UI/data kurasi. |
| Kedua bukti tersedia | Bukti tren dan user-job dapat ditautkan ke satu ticket review. | Buat slice kontrak terpisah untuk parameter tervalidasi, metadata respons, fallback consumer lama, dan uji backward compatibility sebelum route/controller/model disentuh. |

Tidak ada threshold numerik baru pada KEM-49. Angka seperti “jumlah produk tertentu” atau “latency tertentu” akan menjadi pseudo-presisi tanpa data representatif, sementara kontrak KEM-19 secara eksplisit melarang praktik tersebut.[3]

## 5. Yang sengaja tidak dibangun

KEM-49 tidak mengubah API, route, JWT/auth, `ProductContext`, service layer, schema atau data SQLite, index, cache, worker/background process, media/storage, billing, dependency, deployment, maupun CI gate. Tidak ada request tulis terhadap Railway, Vercel, atau database produksi.

## 6. Validasi review

| Pemeriksaan | Hasil |
| --- | --- |
| Dispatch benchmark `Catalog Performance Baseline (KEM-19)` pada `main@2723a1f` | **Passed** — workflow selesai sukses dalam 14 detik. [2] |
| HTTP dan parse payload benchmark | **Passed** — seluruh 7 sampel tercatat 2xx dan payload `.data[]` dapat diparse. [2] |
| Scope branch | **Docs-only** — tidak ada source runtime atau konfigurasi deployment yang diubah. |

## 7. Keputusan dan review request

KEM-49 merekomendasikan **mempertahankan sistem sekarang** sambil mengumpulkan baseline mingguan KEM-19 serta feedback penggunaan katalog yang nyata. Apabila founder menyetujui dokumentasi ini, slice dapat dipromosikan sebagai PR docs-only; bila di kemudian hari trigger terbuka, pekerjaan berikutnya harus dimulai dari ADR/contract baru, bukan langsung menambah pagination atau index.

## Referensi

[1] [GitHub Actions — KEM-19 baseline manual 04:45 UTC](https://github.com/kemplu007/ngepas-reborn/actions/runs/32100298854)
[2] [GitHub Actions — KEM-19 baseline main `2723a1f` 22:34 UTC](https://github.com/kemplu007/ngepas-reborn/actions/runs/32193334972)
[3] [KEM-19 Catalog Performance Baseline Contract v1](./kem19-catalog-performance-baseline-contract-v1.md)
[4] [KEM-33 Public Catalog Contract v1](./kem33-public-catalog-contract-v1.md)
