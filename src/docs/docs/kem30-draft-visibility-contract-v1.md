# KEM-30 — Kontrak Visibilitas Draft pada Product Detail Publik v1

**Status:** In Progress
**Branch:** `feat/kem-30-draft-visibility-fix-v1`
**Baseline:** `main@868790f770c38f776b581baaa90c63c0c9fc3a6c`

**Implementation commit:** `db181fc` — `fix(kem30): restrict public draft product visibility`

## Problem statement

Produk berstatus `draft` dapat ditemukan dari route Product Detail publik ketika slug diketahui. Status Draft seharusnya menjadi ruang kerja admin, bukan halaman yang dapat dirender untuk pengunjung publik.

## Scope contract

| Concern | Keputusan |
| --- | --- |
| Owner backend | `server/models/productModel.js` membatasi lookup slug publik ke `status = 'published'`. |
| Owner public route | `Discover.jsx` tidak memasukkan Draft ke katalog dan lookup `/discover/:slug`; `ProductDetail.jsx` tidak menampilkan Draft sebagai produk terkait. |
| Perilaku publik | Lookup slug Draft mengembalikan `404 Produk tidak ditemukan`, sama seperti slug yang tidak ada. |
| Perilaku admin | Listing dan edit admin berbasis katalog/context serta ID tidak diubah. |
| Fallback | Data legacy tanpa `status` tetap diterima di render frontend; persistence existing memberi default `published`. |

## Guardrail

KEM-30 tidak mengubah JWT, middleware auth, schema atau migrasi SQLite, create/update/delete produk, payload write, media/gallery, storage, WebP, billing, dependency, dan data produksi.

KEM-30 juga tidak mengubah kontrak `GET /api/products` untuk katalog. Pemisahan data list admin dan data list publik memerlukan contract change terpisah bila non-disclosure Draft pada raw API list menjadi kebutuhan produk berikutnya.

## Acceptance criteria

1. `getProductBySlug` hanya membangun query parameterized dengan `slug` dan `status = 'published'`.
2. `/product/:slug` menerima respons 404 yang sama untuk Draft dan slug tidak ada.
3. `/discover/:slug` tidak dapat merender Draft dari catalog context; Draft tidak masuk grid dan related products publik.
4. Jalur admin berbasis ID dan list existing tidak dimodifikasi.
5. `git diff --check`, `node --check`, harness read-only, dan `npx vite build` lulus sebelum PR.

## Validation evidence

| Pemeriksaan | Hasil |
| --- | --- |
| `git diff --check` | Lulus tanpa whitespace error. |
| `node --check server/models/productModel.js` | Lulus. |
| `node --check server/controllers/productController.js` | Lulus. |
| `node server/.harness-kem30.mjs` | Lulus: 3 assertion statis untuk SQL slug Published, filter Discover, dan related product. Harness tidak membuka database. |
| `npx vite build` | Lulus: 1864 modul ditransformasi. Warning chunk >500 kB sudah ada pada baseline build dan tidak disentuh slice ini. |

Tidak ada database produksi yang dibaca atau ditulis untuk validasi. Uji fixture Draft end-to-end ditunda sampai tersedia fixture lokal terisolasi; bukti implementasi saat ini berasal dari query, route owner, dan harness statis yang dapat direproduksi.
