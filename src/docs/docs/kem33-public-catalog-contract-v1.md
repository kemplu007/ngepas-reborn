# KEM-33 — Public Catalog Contract v1

## Status

**Review-ready** — branch `feat/kem-33-public-catalog-contract-v1`.

## Tujuan

Menjadikan katalog publik dan katalog admin memiliki kontrak read yang terpisah. Produk Draft tidak boleh dikirim oleh API publik maupun dirender pada surface publik, sementara admin terautentikasi tetap dapat melihat, mengedit, menerbitkan, dan menghapus seluruh produk.

## Kontrak endpoint

| Endpoint | Akses | Dataset | Konsumen |
|---|---|---|---|
| `GET /api/products` | Publik | Hanya `status = "published"` | Discover, kategori, featured, pencarian publik |
| `GET /api/products/:slug` | Publik | Satu produk Published | Product Detail publik |
| `GET /api/products/admin` | Bearer token | Draft dan Published | Dashboard, daftar produk, form edit admin |

## Boundary implementasi

Query SQL tetap berada di `productModel`. Controller hanya memilih kontrak read yang tepat, route `/admin` dilindungi middleware JWT, dan `ProductContext` memegang state katalog publik serta admin secara terpisah. Tidak ada perubahan pada schema SQLite, write flow, media, upload, billing, atau token JWT.

## Acceptance criteria

1. Respons `GET /api/products` tidak berisi produk Draft.
2. `GET /api/products/admin` menolak akses tanpa token dan mengembalikan Draft untuk admin terautentikasi.
3. Discover, category, featured products, dan search tetap menggunakan katalog publik upstream.
4. Daftar produk, dashboard, dan edit Draft admin memakai katalog admin terautentikasi.
5. `npm run quality:catalog-contract` dan `npm run quality:check` lulus.

## Evidence

Harness KEM-33 menjalankan database SQLite sementara, membuktikan query publik hanya mengembalikan Published, query admin mempertahankan Draft, dan route katalog admin memakai middleware auth. Harness tidak membaca atau mengubah database produksi.
