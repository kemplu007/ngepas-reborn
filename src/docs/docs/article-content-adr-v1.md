# Article Content ADR v1 — Contract Before CRUD

**Status:** Review-ready · docs-only  
**Branch:** `docs/adr-article-content-contract-v1`  
**Baseline:** `origin/main@5d21759`  
**Scope:** Menetapkan keputusan produk dan boundary implementasi Artikel & Tips. Dokumen ini tidak menambah route, API, service, Context, schema SQLite, admin UI, upload, media pipeline, atau data artikel.

## Konteks dan evidence

Artikel & Tips adalah surface edukasi keputusan belanja, bukan katalog, marketplace, atau tempat untuk membuat ulasan/review. Ia tercatat sebagai section Discover yang bernilai bagi user, tetapi belum memiliki kontrak runtime yang dapat dikelola admin.

| Evidence | Fakta pada `main@5d21759` | Konsekuensi keputusan |
| --- | --- | --- |
| `Discover.jsx` | `editorialCards` adalah tiga konstanta lokal; card hanya memuat judul, waktu baca, dan asset produk lokal. CTA `Baca ringkas` belum menavigasi ke route publik. | Jangan menganggap artikel sudah merupakan CRUD atau public detail yang aktif. |
| `App.tsx` | Route publik hanya mencakup Discover, kategori, dan detail produk; admin hanya mengelola produk serta kategori. | Tidak ada route artikel yang boleh ditautkan atau diekspos sebelum diimplementasikan. |
| `api-contract.md` | Hanya kontrak produk, kategori, dan auth yang aktif. | Tidak ada endpoint article yang boleh dipanggil oleh FE. |
| Audit operasional admin v1 | Produk/kategori adalah capability admin yang tersedia; banner dan artikel diklasifikasikan sebagai fitur konten baru. | Article tidak boleh disisipkan ke `ProductForm`, `ProductContext`, atau slice polish UI. |
| Mockup wireframe | Card ideal memuat tipe konten, gambar, judul, ringkasan, waktu baca, tanggal, filter kategori, loading/empty state, dan CTA semua artikel. | Ini adalah intent UX, bukan bukti bahwa model, route, atau data sudah ada. |

## Keputusan

Ngepas akan memperlakukan Article sebagai entitas konten terpisah yang membantu user memahami keputusan pembelian. Implementasi tidak dimulai pada ADR ini. Setelah evidence konten nyata dan slice terpisah disetujui, Article v1 wajib memiliki lifecycle draft/published, route publik yang nyata, serta surface admin khusus—tanpa menumpang kontrak produk.

### 1. Lifecycle editorial v1

| State | Arti | Surface yang boleh membaca | Transisi v1 |
| --- | --- | --- | --- |
| `draft` | Konten kerja internal yang belum layak dibaca publik. | Admin terautentikasi saja. | Dibuat sebagai draft; dapat diperbarui; dapat dipublikasikan setelah field minimum terpenuhi. |
| `published` | Konten yang telah ditinjau admin dan layak dibaca publik. | Publik dan admin. | Dapat dikembalikan ke draft untuk menghapusnya dari surface publik. |

Tidak ada scheduled publishing, role multi-admin, revision history, soft delete, komentar, review, rating, SEO automation, atau AI-generated content pipeline pada v1. Keputusan tersebut memerlukan evidence dan ADR baru bila benar-benar dibutuhkan.

### 2. Boundary data minimum yang diusulkan

Model Article v1 dipisahkan dari produk dan baru boleh dibuat pada slice persistence khusus. Field minimum berikut adalah kontrak proposal, bukan schema yang sudah aktif.

| Field | Tujuan | Aturan awal |
| --- | --- | --- |
| `id` | Identitas internal untuk admin write. | Tidak dipakai sebagai URL publik. |
| `title` | Judul yang dibaca user. | Wajib dan tidak boleh kosong. |
| `slug` | Identitas URL publik. | Wajib, unik, dan immutable setelah published kecuali ada redirect contract baru. |
| `excerpt` | Ringkasan untuk card/list. | Wajib sebelum published; bukan body yang dipotong otomatis tanpa review. |
| `body` | Isi panduan manusia. | Wajib sebelum published; format rendering diputuskan dalam contract rendering terpisah. |
| `coverImageUrl` | Gambar cover pada list/detail. | URL publik existing saja pada v1; tidak ada upload, transformasi, atau storage baru. |
| `contentType` | Label seperti panduan, tips, atau penjelasan. | Taxonomy final hanya setelah evidence minimal tiga artikel nyata tersedia. |
| `status` | Boundary draft/published. | Hanya enum `draft` atau `published`. |
| `publishedAt` dan `updatedAt` | Metadata waktu yang jujur pada card/detail. | `publishedAt` diisi saat pertama menjadi published; `updatedAt` hanya mencerminkan update aktual. |

Tidak ada field yang menyimpan klaim review pengguna, skor otomatis, stok, harga, marketplace, atau affiliate checkout. Artikel boleh mengarahkan user ke produk hanya melalui link yang nyata dan dibuktikan, tetapi hubungan artikel–produk tidak masuk scope v1 sebelum use case pertama terbukti.

### 3. Kontrak route dan visibility yang diusulkan

| Surface | Contract v1 setelah slice implementasi disetujui | Status sekarang |
| --- | --- | --- |
| Discover | `/#artikel-tips` tetap menjadi anchor section; card hanya menaut ke detail bila route nyata sudah live. | Anchor live; card masih data statis. |
| Daftar publik | `/articles` hanya menampilkan Article `published`. | Belum ada. |
| Detail publik | `/articles/:slug` melakukan lookup exact dan hanya mengembalikan `published`; draft harus memperlihatkan 404 yang sama dengan slug tidak ada. | Belum ada. |
| Daftar admin | `/admin/articles` terproteksi JWT dan dapat membaca draft + published. | Belum ada. |
| Form admin | `/admin/articles/new` dan `/admin/articles/:id/edit` adalah surface terpisah dari `ProductForm`. | Belum ada. |

Public list/detail tidak boleh membaca endpoint admin atau menerima draft lewat filter client-side. Sebaliknya, admin tidak boleh bergantung pada route publik untuk memeriksa draft. Boundary ini mengikuti pola public/admin katalog yang telah berlaku pada produk.

### 4. Urutan implementasi yang diizinkan

| Urutan | Slice terpisah | Tujuan | Gate sebelum promotion |
| --- | --- | --- | --- |
| A-ADR | ADR ini | Mengunci lifecycle, boundary, dan non-goals. | Review docs dan `git diff --check`. |
| A-1 | Evidence konten nyata | Menyiapkan minimal tiga draft panduan yang ditulis manusia, sumber gambar URL existing, serta acceptance checklist. | Founder memeriksa bahwa Article memang membantu keputusan belanja dan bukan filler. |
| A-2 | Persistence/API contract | Menetapkan migration yang reversible, Model → Controller → Validator → Route, public/admin response, dan contract test. | Recovery/runbook, Quality Gate, serta review contract sebelum write production. |
| A-3 | Admin authoring | Menambah daftar/form Article yang memakai JWT existing dan state draft/published. | Tidak mengubah `ProductForm`, auth, maupun media pipeline. |
| A-4 | Public read surfaces | Menambah `/articles`, `/articles/:slug`, lalu mengubah card Discover menjadi link nyata. | Published-only contract, 404 draft, loading/empty/error, mobile walkthrough, dan Quality Gate. |

Pagination, search server-side, filter kategori, related products, newsletter, komentar, scheduled publish, rich-text provider, upload, storage, WebP, dan analytics event baru tidak masuk A-1 sampai A-4. Mereka hanya dapat dibuka oleh evidence penggunaan dan kontrak baru.

## Acceptance criteria ADR

1. Repository truth menyatakan bahwa Article saat ini adalah section statis, bukan CRUD yang tersembunyi.
2. Lifecycle `draft`/`published`, route publik, dan route admin terpisah telah disetujui sebagai target implementasi; belum ada runtime yang diklaim aktif.
3. CTA atau menu Artikel tidak boleh mengarah ke route fiktif. Sampai A-4, `/#artikel-tips` adalah satu-satunya destinasi Article yang valid.
4. Tidak ada perubahan pada JWT, Context produk/kategori, service produk, API aktif, SQLite, data produksi, asset storage, upload, WebP, billing, dependency, atau deployment.
5. Implementasi hanya boleh dimulai setelah evidence minimal tiga konten nyata, contract persistence yang terpisah, dan approval slice berikutnya tersedia.

## Validasi slice ini

1. `git diff --check` tidak menemukan whitespace error.
2. Diff hanya menyentuh ADR ini dan changelog; tidak ada file runtime.
3. Dokumen dibaca bersama `ngepas-core.md`, `api-contract.md`, audit admin operasional, audit mockup, serta route truth `App.tsx`.

## Non-goals eksplisit

ADR ini tidak membangun CMS, blog generik, artikel rekaan, upload gambar, layanan media, pipeline WebP, SEO otomatis, endpoint baru, migration database, atau mekanisme publish. Ia hanya membuat langkah implementasi berikutnya dapat diuji dan diaudit.
