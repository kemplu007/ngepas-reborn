# KEM-34 — Canonical Public Detail v1

**Status:** Review-ready  
**Branch:** `feat/kem-34-canonical-public-detail-v1`  
**Baseline:** `main` pada `9e0ad14` setelah KEM-33  
**Scope:** Konsolidasi route dan komposisi detail publik tanpa kontrak data baru.

## Masalah yang ditutup

Sebelum slice ini, produk yang sama dapat dibuka melalui dua pengalaman berbeda. Route `/discover/:slug` merender `DiscoverDetail` di dalam halaman Discover, sedangkan `/product/:slug` merender `ProductDetail` sebagai jalur yang memiliki gallery, Panduan keputusan, state error, related products, dan CTA affiliate nyata. Perbedaan tersebut membuat tujuan link internal dan pengalaman pengunjung tidak konsisten.

## Kontrak route

| URL | Perilaku setelah KEM-34 | Authority |
|---|---|---|
| `/product/:slug` | Merender detail publik canonical. | `ProductDetail` |
| `/discover/:slug` | Redirect client-side dengan `replace` ke `/product/:slug`; deep link lama tidak menjadi 404. | Adapter route tipis |
| `ProductCard` tanpa `href` eksplisit | Mengarahkan ke `/product/:slug`. | `ProductCard` |
| `ProductCard` dengan `href` eksplisit | Mempertahankan tujuan caller. | Caller yang eksplisit |

## Boundary yang dipertahankan

`ProductDetail` tetap mengambil produk per-slug melalui `ProductContext` dan `productService` existing. Tidak ada perubahan pada endpoint `GET /api/products/:slug`, state katalog publik/admin KEM-33, JWT, write flow, schema atau migrasi SQLite, gallery URL, media storage, billing, dependency, maupun data produksi.

CTA affiliate, gallery, Panduan keputusan, loading/error/not-found state, dan related products hanya memiliki satu implementation publik canonical di `ProductDetail`. Redirect legacy tidak memuat ulang data Discover atau membuat CTA alternatif.

## Acceptance criteria

1. Klik detail dari `ProductCard` tanpa override menuju `/product/:slug`.
2. Deep link `/discover/:slug` berakhir di `/product/:slug` dengan `replace`.
3. Tidak ada `DiscoverDetail` inline atau lookup slug dalam `Discover`.
4. Jalur `/product/:slug` mempertahankan CTA affiliate, gallery, Panduan keputusan, error state, dan related products existing.
5. `git diff --check` dan `npm run quality:check` lulus.

## Observasi validasi lokal

Pemeriksaan browser pada `http://localhost:5174/discover/rak-bumbu-dapur` memperlihatkan URL berubah menjadi `/product/rak-bumbu-dapur`, sehingga redirect legacy menuju route canonical terbukti. Preview pertama tanpa `VITE_API_URL` tidak merepresentasikan konfigurasi deployed dan mem-parsing HTML fallback sebagai JSON; preview kemudian dijalankan ulang dengan `VITE_API_URL` produksi dalam mode read-only. Render akhir canonical berhasil menampilkan data produk, gambar utama, ringkasan harga, Panduan keputusan, CTA affiliate, informasi pendukung, serta produk terkait. Halaman Discover pada preview yang sama juga mengekspos semua link `Lihat detail` untuk produk yang terlihat ke `/product/:slug`, termasuk pada section Pilihan Ngepas dan Trending Minggu Ini.

## Guardrail

Slice ini hanya mengonsolidasikan route detail publik. Tidak ada auth JWT, schema, migration, request write, media pipeline, upload native, WebP, object storage, provider berbayar, billing, secret, scheduler, atau data produksi yang diubah.
