# Product Detail by Slug — Contract v1

**Checkpoint:** 17 Agustus 2026 — Documented after promotion record

## 1. Problem dan keputusan

Route publik `/product/:slug` saat ini memperoleh produk utama dari katalog penuh yang dimuat oleh `ProductContext`. KEM-14 menambahkan lookup read-only satu produk agar Product Detail meminta resource yang dituju melalui kontrak resmi, tanpa mengubah katalog yang dipakai surface lain.

| Concern | Keputusan KEM-14 |
| --- | --- |
| Endpoint | `GET /api/products/:slug` tanpa autentikasi, setelah `GET /api/products` pada router yang sama. |
| Param | `slug` wajib berupa string non-kosong setelah sanitasi trim; slug invalid menerima respons 400 helper standar. |
| Lookup | Exact lookup parameterized di Product Model; tidak ada SQL pada route atau controller. |
| Sukses | `200 { success: true, message, data: Product }`, dengan normalisasi `parseProduct` yang sama seperti daftar produk. |
| Tidak ditemukan | `404 { success: false, message: "Produk tidak ditemukan" }`. |
| Frontend | `ProductDetail` → `ProductContext` → `productService` → API; komponen tidak memanggil `fetch`. |

## 2. Scope dan perilaku yang dipertahankan

### In scope

1. Route, controller, model, sanitizer, dan validator minimal untuk lookup slug publik.
2. Fungsi `productService` dan action `ProductContext` untuk membaca satu produk per slug.
3. `ProductDetail` mengganti sumber produk utama dari katalog penuh menjadi lookup per slug, dengan state loading dan not-found yang jujur.
4. Pembaruan `api-contract.md` sebelum commit akhir dan bukti request sukses/not-found read-only.

### Preserved

- Route publik tetap `/product/:slug`.
- CTA marketplace, harga, gallery, section kurasi KEM-13, related products, dan detail visual tetap memakai komposisi existing.
- `GET /api/products` serta semua write product tetap berperilaku seperti sebelumnya.
- Normalisasi `status`, `tags`, `gallery`, dan field kurasi tetap menjadi authority `parseProduct`.

### Out of scope / guardrails

- Auth JWT admin, middleware write, schema, migration, persistence tambahan, data seed/produksi, dan deployment config.
- Filter `published`/`draft`: public list existing belum melakukan filtering, sehingga KEM-14 mempertahankan kebijakan visibility itu. Perubahan visibility adalah keputusan produk dan security slice terpisah.
- Search, featured, pagination, kategori/room filter, cache global, analytics, upload, WebP, storage, provider, billing, secret, scheduler, dan `product_offers`.

## 3. Owner file dan alur

| Lapisan | Owner | Tanggung jawab |
| --- | --- | --- |
| Route | `server/routes/productRoutes.js` | Mendaftarkan GET slug publik. |
| Validator / sanitizer | `server/helpers/validators/productValidator.js`, `server/helpers/sanitizers/productSanitizer.js` | Menilai dan membersihkan parameter slug tanpa mengubah write payload. |
| Controller | `server/controllers/productController.js` | Orkestrasi, response helper, 400/404. |
| Model | `server/models/productModel.js` | SQL parameterized lookup slug. |
| Parser | `server/helpers/parsers/productParser.js` | Product API shape normal. |
| FE service | `src/services/productService.js` | Satu-satunya pemilik request endpoint baru. |
| FE state | `src/context/ProductContext.jsx` | Mengekspos action lookup tanpa mengganti state katalog existing. |
| FE page | `src/pages/public/ProductDetail.jsx` | Menampilkan loading/error/produk yang dikembalikan action Context. |

## 4. Acceptance criteria

- `GET /api/products/<known-slug>` mengembalikan satu Product ter-normalisasi melalui response helper.
- Slug kosong/tidak valid menghasilkan 400; slug tidak ada menghasilkan 404; tidak ada write atau perubahan database.
- Product Detail berhasil menampilkan produk dari route slug tanpa fetch langsung dan tanpa mengubah CTA marketplace atau section KEM-13.
- `git diff --check`, `node --check` untuk file backend yang diubah, validasi request read-only, dan `npx vite build` lulus.
- Branch review terpisah, diff fokus, dan promosi ke `main` hanya setelah approval founder eksplisit.

## 5. Promotion state dan handoff

- **Implementation promotion:** branch `feat/product-detail-by-slug-v1` dipromosikan melalui PR #27 ke `main` commit `2c57ac2` setelah approval eksplisit founder.
- **Protected local state:** laporan verifikasi dan `todo.md` untracked tetap lokal, di luar commit.
- **Tracker:** Linear dan Notion merekam KEM-14 sebagai Review Ready sebelum approval; penutupan Done dilakukan hanya setelah rekam promosi dokumentasi ini masuk ke `main`.
- **Validation:** `git diff --check`, `node --check` pada seluruh file backend yang diubah, dan `npx vite build` lulus. Harness controller read-only di luar repository membuktikan respons 200 sukses, 400 slug invalid, dan 404 not-found tanpa membaca atau menulis database produksi.
- **Known baseline:** build memberi warning ukuran chunk frontend yang sudah ada; tidak ada warning atau error baru yang berasal dari KEM-14.
- **Next decision:** promosikan branch dokumentasi ini, lalu tutup KEM-14 di Linear dan sinkronkan checkpoint final Notion. Audit produk Draft/Published untuk endpoint publik tetap menjadi slice keputusan terpisah.
