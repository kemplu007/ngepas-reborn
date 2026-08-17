# Ngepas Reborn — KEM-19 Catalog Performance Baseline Contract v1

**Status:** Assessment-only · belum ada perubahan runtime, API, atau schema  
**Issue:** KEM-19 — *Search/filter/pagination server-side saat katalog membesar*  
**Branch:** `feat/kem-19-catalog-performance-baseline-v1`  
**Baseline code:** `origin/main@4ae8e55`  
**Tanggal:** 17 Agustus 2026

## 1. Tujuan dan prinsip keputusan

KEM-19 adalah guardrail performa, bukan mandat membuat query parameter baru. Server-side search, filter, sorting, dan pagination hanya boleh dibangun setelah ukuran katalog atau bukti performa menunjukkan bahwa pola `GET /api/products` yang ada tidak lagi proporsional.

> **Keputusan awal:** katalog publik saat ini masih kecil. Tidak ada kontrak query baru, endpoint baru, parser baru, perubahan frontend, atau migration yang dibenarkan oleh baseline ini.

## 2. Baseline yang direkam

Pengukuran read-only pada endpoint production `GET /api/products`, 17 Agustus 2026, menghasilkan respons HTTP 200 dengan payload **3.836 byte** dan **4** token ID produk. Tiga sampel total request dari lingkungan pemeriksaan menghasilkan **1,159 dtk**, **1,271 dtk**, dan **1,153 dtk**.

| Metrik | Hasil | Interpretasi yang dibolehkan |
| --- | --- | --- |
| Bentuk endpoint | `GET /api/products` mengembalikan seluruh katalog | Kontrak saat ini memang full-catalog, belum memiliki parameter query. |
| Jumlah produk terdeteksi | 4 | Katalog masih terlalu kecil untuk membenarkan pagination teknis. |
| Payload | 3.836 byte | Belum menunjukkan tekanan transfer data. |
| Latency sampel | 1,153–1,271 dtk (3 request read-only) | Catatan observasi awal, **bukan** benchmark kapasitas atau SLA. Perlu bukti berulang dan pengalaman user bila akan memicu perubahan. |
| Frontend | `productService.getProducts()` memanggil `/products`; `ProductContext` menerima hasil service | Perubahan kelak wajib mempertahankan Service → Context → Component. |
| Backend | route produk memanggil controller/model existing tanpa kontrak pagination | Perubahan kelak harus tetap Routes → Validator → Sanitizer → Parser → Controller → Model → SQLite. |

## 3. Decision gate sebelum implementasi runtime

| Pertanyaan | Bukti minimum | Keputusan bila belum terpenuhi | Keputusan bila terpenuhi |
| --- | --- | --- | --- |
| Apakah katalog bertumbuh hingga full-catalog memberi beban nyata? | Catatan jumlah produk/payload dari production atau staging representatif, tren pertumbuhan, dan contoh permukaan yang terdampak. | Pertahankan `GET /api/products` existing. | Definisikan batas page size dan payload budget. |
| Apakah user mengalami masalah pencarian, filter, sorting, atau loading? | Reproduksi langkah, route/surface, state loading/empty/error, serta dampak pada tugas user. | Jangan mengoptimasi berdasarkan asumsi. | Setujui kebutuhan query berdasarkan user job yang nyata. |
| Apakah client-side filtering benar-benar tidak cukup? | Bukti memory, transfer, waktu respons, atau UX yang relevan pada data representatif. | Pertahankan compatibility current frontend. | Susun kontrak parameter dan response paginated secara tertulis. |
| Apakah backward compatibility sudah dirancang? | Keputusan eksplisit tentang endpoint existing dan konsumen frontend/admin yang masih membutuhkan array penuh. | Tidak ada perubahan API. | Implementasikan adapter/mode yang tidak memutus consumer lama. |

## 4. Kontrak yang wajib ditulis sebelum coding bila gate terbuka

| Concern | Keputusan wajib sebelum implementasi |
| --- | --- |
| Query | Nama dan batas parameter `q`, filter yang didukung, sort key/direction, `page`, serta `pageSize`; semua tervalidasi dan disanitasi. |
| Response | Bentuk `data` dan metadata pagination (`page`, `pageSize`, `total`, `totalPages`) atau alternatif yang disetujui; response helper tetap dipakai. |
| Compatibility | `GET /api/products` existing tidak berubah secara diam-diam; strategi endpoint/mode baru dan consumer lama harus dicatat. |
| Backend | Route → Validator → Sanitizer → Parser → Controller → Model → SQLite; SQL hanya di model, termasuk filter/sort/limit/offset. |
| Frontend | `productService` tetap satu-satunya fetcher; Context menerima data bersih; component tidak memanggil API langsung. |
| States | Loading, empty, error, reset filter, perubahan page, dan fallback untuk response legacy diuji. |
| Validation | `git diff --check`, `node --check` file backend tersentuh, `npx vite build`, test request valid/invalid, serta uji backward compatibility. |

## 5. Scope branch ini

Branch ini hanya menyimpan baseline dan decision gate. Ia tidak menambah parameter query, endpoint search, pagination, table/index baru, state frontend, hardcoded threshold, atau refactor katalog.

## 6. Guardrail

- Auth JWT, schema SQLite, data produksi, media, billing, dan deployment tidak disentuh.
- Tidak ada fetch di Component atau Context.
- Tidak ada SQL di route/controller.
- Tidak ada pseudo-benchmark, klaim SLA, atau threshold performa yang dikarang tanpa data representatif.
- Tidak ada perubahan runtime pada branch assessment ini.
