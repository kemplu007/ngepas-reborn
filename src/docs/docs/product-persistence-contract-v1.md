# Ngepas Product Persistence Contract v1 — PR-0

**Status:** Draft untuk approval founder  
**Tanggal:** 2026-08-16  
**Branch:** `docs/product-persistence-contract-v1`  
**Scope:** Contract dan acceptance criteria saja. Tidak ada perubahan runtime, schema, endpoint, auth, deploy, atau data production pada PR-0.

## 1. Tujuan

Dokumen ini mengunci kontrak sebelum implementasi persistence untuk tiga field produk yang sudah ada di `ProductForm`, tetapi belum didukung oleh backend dan schema SQLite: `status`, `tags`, dan `gallery`.

Saat ini alur frontend sudah membentuk payload ketiga field tersebut, tetapi backend belum meneruskannya ke model, tabel `products` belum memiliki kolomnya, dan parser belum mengembalikannya sebagai data ter-normalisasi. Temuan ini sudah dicatat pada audit contract ProductForm dan dikonfirmasi melalui response production API. [1](../../../product-form-contract-audit.md) [2](./api-contract.md)

> **PR-0 bukan migration.** PR-0 hanya menyamakan bahasa produk, bentuk data, aturan validasi, backward compatibility, dan pagar operasional agar PR backend berikutnya tidak menebak-nebak.

## 2. Batas scope yang disepakati

PR-0 tidak membuat `POST /api/upload`, tidak membuat `product_offers`, tidak mengubah auth JWT atau fallback `x-api-key`, tidak mengganti SQLite, tidak membuat endpoint search/filter baru, dan tidak mengubah visibility produk publik.

Persistence akan dikerjakan sebagai slice backend terpisah setelah dokumen ini mendapat approval eksplisit. Urutan implementasi yang direkomendasikan adalah **status**, kemudian read-back FE untuk status, lalu **tags** dan **gallery URL-only** sebagai slice terpisah.

## 3. Kontrak produk yang diusulkan

Field baru berikut menjadi tambahan pada Product request body dan Product response. Bentuk response harus sudah bersih; frontend tidak boleh menerima JSON string mentah dari kolom SQLite.

| Field | Tipe API | Nilai valid | Default backward-compatible | Penyimpanan yang diusulkan |
|---|---|---|---|---|
| `status` | string | `published` atau `draft` | `published` untuk row lama dan produk baru sampai ada keputusan publish workflow baru | `TEXT NOT NULL DEFAULT 'published'` |
| `tags` | array of strings | Array boleh kosong; setiap item non-empty setelah trim | `[]` | `TEXT` berisi JSON array |
| `gallery` | array of strings | Array boleh kosong; setiap item URL valid sesuai aturan PR-3 | `[]` | `TEXT` berisi JSON array |

### 3.1 Semantik `status`

Untuk PR-1, `status` adalah **editorial state yang persisten**, bukan visibility gate. Nilai `draft` tidak otomatis disembunyikan dari endpoint publik pada slice status pertama karena filtering publik belum menjadi contract aktif. Perubahan visibility harus menjadi keputusan dan slice terpisah agar tidak terjadi perubahan user flow tersembunyi.

Dua nilai saja yang diizinkan:

| Nilai | Makna |
|---|---|
| `published` | Produk sudah ditandai siap secara editorial berdasarkan workflow admin saat ini |
| `draft` | Produk masih dalam proses kurasi atau belum ditandai siap |

Default yang diusulkan adalah `published` karena menjaga perilaku existing: produk lama tetap diperlakukan seperti sebelumnya, dan ProductForm saat ini juga memulai status dengan `published`. Jika founder memilih default `draft`, keputusan itu harus dinyatakan eksplisit karena akan mengubah makna produk baru setelah PR-1.

### 3.2 Semantik `tags`

`tags` dikembalikan sebagai array string. Input harus dinormalisasi dengan trim whitespace, menghapus item kosong, dan menghapus duplikat secara case-insensitive sambil mempertahankan ejaan item pertama. Contoh:

```json
{
  "input": [" Dapur ", "Minimalis", "dapur", ""],
  "normalized": ["Dapur", "Minimalis"]
}
```

Batas awal yang diusulkan untuk menjaga kualitas data adalah maksimal **12 tag** per produk dan maksimal **40 karakter** per tag. Angka ini masih proposal contract dan perlu approval founder sebelum validator ditulis.

### 3.3 Semantik `gallery`

`gallery` dikembalikan sebagai array URL string dengan urutan yang dipertahankan. `image` tetap menjadi gambar utama dan tidak digantikan otomatis oleh item pertama gallery.

PR-3 hanya mendukung **penyimpanan URL yang sudah tersedia**. Tidak ada upload, object storage, transformasi WebP, multipart request, atau endpoint media pada PR-3. Batas awal yang diusulkan adalah maksimal **8 URL** per produk. Validasi URL dan batas tersebut masih proposal contract dan perlu approval founder sebelum validator ditulis.

## 4. Backward compatibility

Row produk yang dibuat sebelum migration harus tetap dapat dibaca, diedit, dan disimpan tanpa kehilangan field existing. Pada read path, nilai kosong harus dinormalisasi menjadi:

```json
{
  "status": "published",
  "tags": [],
  "gallery": []
}
```

Backfill `status` ke `published` direkomendasikan agar ProductTable tidak lagi menampilkan `Draft` hanya karena key tidak ada. Backfill `tags` dan `gallery` ke `[]` menjaga bentuk response tetap konsisten tanpa memaksa data historis memiliki isi baru.

Tidak boleh ada fallback localStorage, shadow state di `ProductContext`, atau hardcoded status di `ProductTable`. Setelah persistence aktif, sumber kebenaran harus tetap backend melalui alur resmi:

`ProductForm → ProductContext → productService → apiRequest → controller → model → SQLite`

## 5. API contract yang perlu diperbarui pada PR berikutnya

PR-1 sampai PR-3 wajib memperbarui body dan response Product di `api-contract.md`. Bentuk targetnya:

```json
{
  "name": "Rak Bumbu Dapur",
  "status": "published",
  "tags": ["Dapur", "Minimalis"],
  "gallery": [
    "https://example.com/product-side.jpg",
    "https://example.com/product-detail.jpg"
  ]
}
```

Body POST/PUT harus menerima field baru dengan bentuk yang sama. Response GET/POST/PUT harus mengembalikan array yang sudah diparse, bukan string JSON SQLite. Response DELETE boleh mengembalikan snapshot produk dengan field baru jika itu konsisten dengan response existing.

## 6. Migration guardrail SQLite/Railway

`CREATE TABLE IF NOT EXISTS` pada initializer tidak cukup untuk mengubah tabel `products` yang sudah ada. PR implementasi harus menyediakan migration yang aman untuk database existing di Railway Volume, bukan hanya mengedit definisi tabel untuk instalasi baru.

Guardrail wajib sebelum perubahan production:

1. Migration bersifat idempotent dan aman dijalankan ulang.
2. Pemeriksaan keberadaan kolom dilakukan sebelum `ALTER TABLE`.
3. Backup atau snapshot database production diverifikasi sebelum migration.
4. Jumlah row sebelum dan sesudah migration dicatat.
5. Nilai default dan jumlah nilai null diverifikasi dengan query sanity check.
6. Backend dapat start ulang dan endpoint GET/POST/PUT tetap merespons sesuai contract.
7. Ada langkah rollback atau prosedur pemulihan yang tertulis.
8. Migration tidak dijalankan dari frontend dan tidak menyentuh auth middleware.

Runbook operasional production dibuat atau diperbarui sebelum deployment schema. Implementasi migration dan runbook bukan bagian dari PR-0 ini.

## 7. Acceptance criteria PR-0

PR-0 dianggap selesai apabila founder menyetujui keputusan berikut secara eksplisit:

| Area | Kriteria persetujuan |
|---|---|
| Status enum | Founder menyetujui hanya `published`/`draft` atau mengubahnya sebelum coding |
| Status default | Founder menyetujui default row lama dan produk baru; proposal saat ini `published` |
| Status visibility | Founder menyetujui bahwa PR-1 hanya menyimpan editorial state dan belum memfilter endpoint publik |
| Tags shape | Founder menyetujui array string JSON, normalisasi trim/dedupe, serta batas yang dipilih |
| Gallery shape | Founder menyetujui array URL JSON, `image` tetap primary, tanpa upload service |
| Legacy rows | GET/edit row lama tetap menghasilkan `status`, `tags`, dan `gallery` dengan default aman |
| API response | Frontend menerima enum dan array bersih, bukan JSON string |
| Migration | Idempotency, backup, sanity check, dan rollback diwajibkan sebelum production |
| Scope guard | Auth JWT, `product_offers`, upload, search, public visibility, dan arsitektur tidak ikut berubah |

## 8. Acceptance criteria PR-1 setelah PR-0 disetujui

PR-1 hanya boleh dimulai setelah contract di atas disetujui. Slice tersebut harus membuktikan:

1. GET produk lama berhasil dan mengembalikan `status: "published"` ketika tidak ada nilai historis.
2. POST dengan status valid menyimpan dan mengembalikan status yang sama.
3. PUT dapat berpindah antara `published` dan `draft`.
4. Status invalid ditolak dengan response 400 yang konsisten.
5. ProductTable menampilkan Published/Draft berdasarkan nilai persisted.
6. Tidak ada perubahan pada visibility endpoint publik.
7. `git diff --check` dan `npx vite build` tetap lulus di sisi frontend.
8. Verifikasi backend round-trip dan migration dilakukan sebelum promotion.

## 9. Keputusan yang sengaja ditunda

Keputusan berikut tidak boleh ditebak dalam PR-1:

- Apakah `draft` disembunyikan dari public catalog.
- Apakah status memerlukan workflow publish, scheduled publish, atau role khusus.
- Apakah gallery nantinya memakai upload service atau CDN.
- Apakah tags nantinya dipakai untuk search, filter, SEO, atau rekomendasi.
- Apakah produk memerlukan status tambahan seperti `archived`.
- Apakah perlu tabel relasional terpisah untuk tags atau media.

## 10. Referensi repository

[1] [ProductForm Contract Audit](../../../product-form-contract-audit.md)  
[2] [API Contract v1.0](./api-contract.md)  
[3] [Ngepas Core](./ngepas-core.md)  
[4] [Backend Architecture](./backend-architekture.md)  
[5] [ProductForm admin](../../pages/admin/ProductForm.jsx)  
[6] [Product controller](../../../server/controllers/productController.js)  
[7] [Product model](../../../server/models/productModel.js)  
[8] [SQLite initializer](../../../server/database/init.js)
