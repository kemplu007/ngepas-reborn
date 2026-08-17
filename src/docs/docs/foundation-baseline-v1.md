# Ngepas Frontend Foundation Baseline v1

**Status:** Integrated to `main` — 2026-08-16

**Branch:** `main` (promotion merge setelah review branch terpisah)

**Scope:** Reusable frontend foundation untuk public dan admin. Baseline visual tetap tidak mengubah auth JWT atau business logic. PR-1 Product Status Persistence dicatat sebagai contract slice backend terpisah yang sudah dipromosikan, bukan sebagai authority visual baru.

## Prinsip authority

`src/components/ui` adalah rumah utama untuk primitive visual lintas halaman. Halaman mengatur komposisi dan state. Component mengatur presentasi, accessibility, dan interaksi lokal. Context dan Service tetap menjadi pemilik data serta business logic.

`src/components/common` hanya boleh berisi wrapper lintas fitur atau compatibility layer. `common/Button.jsx` dipertahankan sementara sebagai wrapper ke `ui/Button.jsx` agar migrasi tidak memutus caller lama. Ia bukan authority visual kedua.

## Penghuni baseline v1

| Component | Rumah | Status | Tanggung jawab |
|---|---|---|---|
| `Button` | `src/components/ui/Button.jsx` | Authority | CTA, submit, loading, disabled, variant, size, focus, motion |
| `IconButton` | `src/components/ui/IconButton.jsx` | Baseline | Icon action, label wajib, pressed state, touch target |
| `Container` | `src/components/ui/Container.jsx` | Baseline | Max-width dan gutter responsive |
| `Badge` | `src/components/ui/Badge.jsx` | Baseline | Label status, curation, rating, semantic danger |
| `Input` | `src/components/ui/Input.jsx` | Baru | Input text, email, password, number, URL; focus, disabled, invalid |
| `FormField` | `src/components/ui/FormField.jsx` | Baru | Label, required marker, hint, error |
| `Card` | `src/components/ui/Card.jsx` | Baru | Surface default, muted, elevated; ref forwarding |
| `Dialog` | `src/components/ui/Dialog.jsx` | Baru | Overlay, Escape, click-outside, focus return, body lock, semantic dialog |
| `SelectField` | `src/components/ui/SelectField.jsx` | Authority | Select berbasis `options` array, label, helper/error, required, invalid, size, focus, motion |
| `TextareaField` | `src/components/ui/TextareaField.jsx` | Baru | Textarea dengan label, hint/error, required, invalid, size, focus, reduced motion |
| `CheckboxField` | `src/components/ui/CheckboxField.jsx` | Baseline | Checkbox dengan label, hint, checked, disabled, focus, semantic tokens |
| `common/Button` | `src/components/common/Button.jsx` | Compatibility | Delegasi sementara ke `ui/Button` |
| `ConfirmDialog` | `src/components/common/ConfirmDialog.jsx` | Migrated wrapper | API konfirmasi delete tetap, visual dan lifecycle memakai foundation |

## Proof of system

`src/pages/admin/Login.jsx` menjadi proof-of-system pertama. Auth flow tetap sama: `useAuth().login()`, loading state, error state, redirect state, dan `navigate(..., { replace: true })` tidak diubah. Yang berubah hanya komposisi visual agar memakai `Input`, `FormField`, dan `ui/Button`.

`ConfirmDialog` menjadi proof-of-system overlay. `open`, `title`, `message`, `confirmText`, `cancelText`, `onConfirm`, dan `onCancel` tetap kompatibel dengan caller admin yang sudah ada.

`CategoryForm` dan `CategoryPage` menjadi proof-of-system lintas admin/public untuk kontrak `SelectField` berbasis `options` array. CategoryForm mempertahankan ukuran field `md`, sedangkan CategoryPage memakai kontrak yang sama pada sorting; payload, filter state, query params, dan route tetap dipertahankan.

`ProductDetail` public sudah dipromosikan ke `main` melalui branch `feat/public-product-detail-foundation-v1` dan merge commit `e3adb58`. Slice ini memusatkan komposisi ke `Section`, `Card`, `Badge`, `Button`, `SectionHeading`, dan Discover `ProductCard`; gallery state, `useProducts`, `useParams`, related-product filter, route `/product/:slug`, serta affiliate link tetap dipertahankan. Tidak ada endpoint slug baru, compare backend, favorite state baru, auth, atau perubahan data contract pada slice ini. Production route `/product/rak-bumbu-dapur` berhasil dimuat setelah deployment.

`Product Detail Decision Rhythm` Slice 3 dipromosikan ke `main` melalui PR #6 dan merge commit `94fd8c1`. Slice visual ini memperjelas label posisi gallery, ringkasan harga format Rupiah, meta nyata yang kondisional, serta panel Pilihan Ngepas yang hanya tampil saat data alasan kurasi tersedia. CTA affiliate mobile kini tetap berada setelah hierarchy keputusan pada ambang sticky yang aman, sedangkan desktop mempertahankan action statis. `useProducts`, `useParams`, route `/product/:slug`, href/target/link affiliate, Context, service, API, schema, checkout, offer, backend, database, dan auth JWT tidak diubah. Validasi meliputi `git diff --check`, `npx vite build` pada 1843 modules, viewport mobile 375×812 tanpa horizontal overflow, dan desktop 1280×720 dengan komposisi dua kolom.

`ProductForm` admin memiliki foundation shell dan Step 1 pada branch `feat/admin-product-form-foundation-v1`, commit `9de7efe`. Slice ini mengganti shell raw dengan `Container`, `Card`, `IconButton`, `Badge`, dan `ui/Button`, serta mengganti field Step 1 dengan `Input`, `FormField`, dan `SelectField` options-array. State, handler, payload, service, context, auth, route, dan backend tidak diubah. Audit juga mencatat bahwa `tags`, `gallery`, dan `status` adalah gap persistence existing pada controller/model/schema dan tidak diperluas pada slice foundation ini.

`ProductForm` Step 2 Harga & Stok dimigrasikan pada branch yang sama sebagai patch lanjutan. Field `price`, `originalPrice`, `rating`, `sold`, `stock`, dan `affiliateLink` sekarang memakai `FormField` serta `Input`; ringkasan diskon otomatis memakai `Card` muted dan semantic tokens. Nama field, handler `handleChange`, kalkulasi diskon, payload, validasi native, service, context, auth, route, dan backend tetap dipertahankan. Tidak ada field varian produk yang ditambahkan.

`ProductForm` Step 3 Gallery dan preview produk dimigrasikan pada branch `feat/admin-product-form-gallery-v1`. URL gambar utama memakai `FormField` dan `Input`, preview memakai `Card`, gallery memakai `Card`, `Badge`, `Button`, dan `IconButton`, sementara state `image`, `gallery`, `newGalleryUrl`, `handleAddGallery`, `handleRemoveGallery`, fallback image, dan payload tetap dipertahankan. Tidak ada upload service, gallery schema, backend persistence, atau varian produk yang ditambahkan pada slice ini.

`ProductForm` Step 4 Details dimigrasikan pada branch `feat/admin-product-form-details-v1` dan dipromosikan ke `main` melalui merge commit `4c46bd0`. Primitive baru `TextareaField` dipakai untuk `description`, `features`, `specifications`, `whyWeRecommend`, `bestFor`, dan `considerations`; nama field, value binding, `handleChange`, rows, placeholder, payload, service, auth, route, dan backend tetap dipertahankan. Validasi gabungan `git diff --check` dan `npx vite build` lulus pada 1843 modules. Varian produk dan upload service tetap diperlakukan sebagai gap contract terpisah karena belum memiliki state, payload, schema, endpoint, dan acceptance criteria aktif.

`Admin Product Form Mobile Rhythm` Slice 4 dipromosikan ke `main` melalui PR #8 dan merge commit `6b56897`. Slice ini merapikan hierarchy indikator langkah, lebar baca, spacing token, dan action rhythm pada `ProductForm.jsx` agar pengelolaan produk lebih nyaman dilakukan dari layar kecil. Tidak ada perubahan state, handler, validasi, payload, route, Context, service, upload service, persistence, API, backend, database, schema, atau auth JWT. Validasi mencakup `git diff --check`, `npx vite build` pada 1843 modules, pemeriksaan Step 1–3 desktop pada preview lokal terautentikasi, serta pemeriksaan Step 1 dan urutan semantik pada mobile tanpa submit atau mutasi produk.

`Product Completeness Cues` Slice A1 dipromosikan ke `main` melalui PR #11 dan merge commit `4a23c6b`. `ProductForm.jsx` kini memberi ringkasan visual `0–4 siap` yang merefleksikan nilai nama, harga, link affiliate, dan gambar utama yang telah tersedia, sedangkan `ProductTable.jsx` memakai `Badge` foundation untuk menampilkan Published/Draft secara konsisten pada metadata daftar mobile. Perubahan tetap visual-only: tidak ada state baru, handler, payload, validator, route, Context, service, API, backend, database, schema, persistence, upload, storage, WebP, campaign, artikel, maupun auth JWT yang diubah. Validasi mencakup `git diff --check`, `npx vite build`, respons ringkasan tanpa submit, dan console preview tanpa error atau warning.

`Gallery URL Assistant` Slice A2 dipromosikan ke `main` melalui PR #13 dan merge commit `4adaba4`. `ProductForm.jsx` kini mengubah counter gallery menjadi `n/8 gambar`, menampilkan slot tersisa, dan memberikan feedback lokal untuk nilai kosong, URL yang tidak memakai protokol `http/https`, URL duplikat, serta batas delapan gambar yang sudah menjadi kontrak persistence. URL valid tetap memakai state `gallery` dan handler tambah/hapus existing sehingga urutan editorial dipertahankan. Tidak ada perubahan pada JWT, payload, validator, route, Context, service, API, backend, database, schema, persistence, upload, storage, WebP, maupun endpoint media. Validasi mencakup `git diff --check`, `npx vite build`, uji desktop URL invalid/valid/duplikat tanpa submit, serta viewport mobile 390 px tanpa overflow horizontal.

`Admin Media Upload Contract` Slice A3 dipromosikan ke `main` melalui PR #15 dan merge commit `11f3df8`. Dokumen ini mengunci proposal kelas object storage, jalur upload Browser → backend Express → Sharp → object storage, kompatibilitas URL `image`/`gallery`, metadata media, link produk, lifecycle, validasi file, error taxonomy, observability, cleanup, recovery, dan acceptance criteria A4. A3 tidak menambah dependency, endpoint multipart, schema, migration, storage provider, secret, scheduler, upload UI, API runtime, ataupun perubahan JWT. Sharp hanya menjadi kandidat transformasi WebP yang wajib dipin, diperiksa advisori, dan diuji ketika A4 benar-benar disetujui. A4 tetap diblokir sampai founder memilih provider/region/domain asset, ownership biaya/quota, rotasi credential, recovery point, serta mekanisme cleanup eksplisit.

`Product Status Persistence` PR-1 sudah dipromosikan ke `main` melalui merge commit `377e22d` setelah approval eksplisit. Migration `products.status` bersifat idempotent dengan enum `published`/`draft`, default `published` untuk row lama dan produk baru, serta update yang mempertahankan status lama bila status tidak dikirim. Validator, sanitizer, parser, model, controller, initializer, dan seed lokal sudah selaras. Slice ini tidak menyentuh auth JWT dan belum mengubah visibility endpoint publik; tags, gallery, upload service, product_offers, dan search tetap berada di slice terpisah.

`Product Status Read-back Verification` PR-1.5 diimplementasikan pada branch `feat/product-status-readback-v1` dan dipromosikan ke `main` melalui merge commit `170a1c1`. ProductForm sekarang menunggu response create/update persisted sebelum navigasi, ProductContext mengembalikan row hasil service serta meneruskan error, dan opsi FE diselaraskan ke enum `published`/`draft`. ProductTable tetap membaca `product.status` dari context tanpa fallback hardcoded. Slice ini tidak mengubah auth, endpoint, schema, atau visibility publik.

`Product Tags Persistence` PR-2 dipromosikan ke `main` melalui merge commit `c81fa03`. Migration idempotent menambahkan `products.tags` dengan default `[]`; sanitizer menormalisasi trim, item kosong, dan deduplikasi case-insensitive; validator menerapkan maksimal 12 tag dan 40 karakter per tag; model, controller, parser, dan seed lokal sudah mendukung JSON array. ProductForm/ProductContext tidak memerlukan patch tambahan karena alur read-back PR-1.5 sudah meneruskan row persisted. Search, filter, SEO, public visibility, gallery, upload service, product_offers, dan auth tetap di luar scope.

`Product Gallery URL Persistence` PR-3 dipromosikan ke `main` melalui merge commit `1088246` setelah approval contract dan promotion eksplisit. Migration idempotent menambahkan `products.gallery` dengan default `[]`; sanitizer hanya melakukan trim agar urutan editorial tidak berubah; validator menerima maksimal 8 URL absolut `http`/`https`; model, controller, parser, initializer, dan seed lokal meneruskan JSON array. `ProductForm` dan `ProductDetail` tidak dipatch karena keduanya sudah membentuk atau membaca gallery melalui alur read-back yang aktif. `image` tetap gambar utama. Upload, storage, WebP, endpoint media, search, public visibility, product_offers, dan auth tetap di luar scope. Migration production Railway serta write verification tetap ditahan hingga runbook dan recovery procedure aman tersedia.

## Contract tokens

Primitive baru wajib mengonsumsi token dari `src/styles/tokens.css`. Nilai visual baru tidak boleh dibuat dengan hex, spacing acak, radius acak, duration hardcoded, atau raw semantic color. Motion interaktif memakai token `duration-np-fast`/`duration-np-normal` dan harus aman terhadap `prefers-reduced-motion` melalui utility global.

## State minimum

| Component | State yang harus diverifikasi |
|---|---|
| `Button` | default, hover, focus, disabled, loading, pressed feedback |
| `IconButton` | default, hover, focus, pressed, disabled |
| `Input` | empty, filled, focus, disabled, invalid |
| `FormField` | normal, required, hint, error |
| `Dialog` | closed, open, Escape, click-outside, focus return, reduced motion |
| `Card` | default, muted, elevated, responsive content |

## Urutan migrasi berikutnya

1. `SelectField` dan `CheckboxField` sudah menjadi primitive lintas public/admin dengan kontrak tunggal.
2. `CategoryForm` dan `CategoryPage` sudah dipromosikan sebagai proof-of-system setelah review branch terpisah.
3. `ProductDetail` public sudah dipromosikan dan diverifikasi di production tanpa mengubah route atau data contract.
4. Step 2 Harga & Stok, Step 3 Gallery, Step 4 Details, dan Slice 4 Mobile Rhythm sudah dipromosikan ke `main` melalui merge commit terpisah; Slice 4 merapikan hierarchy dan action rhythm tanpa mengubah payload atau handler.
5. `ProductTable` dan halaman `Products` admin sudah dipromosikan ke `main` melalui merge commit `0c27b67`; tabel memakai `CheckboxField`, `Badge`, dan `IconButton`, halaman memakai `Button`, `SearchInput`, dan `SelectField`, tanpa mengubah state, filter, bulk delete, route, atau contract.
6. Active item pada `Sidebar` admin sudah dipromosikan melalui merge commit `bb41b73`; outline default dihilangkan, keyboard focus tetap memakai focus ring token, dan navigation behavior dipertahankan.
7. `Categories` admin listing sudah dipromosikan ke `main` melalui merge commit `0a11f39`; listing memakai `Button`, `Badge`, dan `IconButton`, tanpa mengubah CRUD, route, service, auth, atau backend.
8. PR-1 Product Status Persistence sudah dipromosikan ke `main` melalui merge commit `377e22d`; PR-1.5 FE read-back verification sudah dipromosikan ke `main` melalui merge commit `170a1c1`.
9. PR-2 Product Tags Persistence sudah dipromosikan ke `main` melalui merge commit `c81fa03`.
10. PR-3 Gallery URL Persistence sudah dipromosikan ke `main` melalui merge commit `1088246`; migration production tetap memerlukan runbook/recovery procedure terpisah dan tidak dijalankan pada promotion kode.
11. Slice A1 Product Completeness Cues sudah dipromosikan melalui merge commit `4a23c6b`; Slice A2 Gallery URL Assistant sudah dipromosikan melalui merge commit `4adaba4` sebagai UX layer pada kontrak gallery URL yang ada.
12. Slice A3 Admin Media Upload Contract sudah dipromosikan melalui merge commit `11f3df8`; dokumen ini adalah authority keputusan untuk A4, bukan implementasi upload.
13. Sebelum A4 dimulai, founder wajib memutuskan provider/region/domain asset, ownership biaya/quota, credential rotation, recovery point, dan mekanisme cleanup. Jangan menambah upload, storage, WebP, endpoint media, dependency, schema, atau migration sebelum seluruh gate ini eksplisit.
14. Jangan mengimplementasikan varian produk atau upload service sebelum state, payload, schema, endpoint, dan acceptance criteria disepakati sebagai slice fitur terpisah.
15. Migrasikan halaman admin lain yang tersisa ke `Button`, `IconButton`, `Badge`, `Input`, `SelectField`, dan `Dialog`.
16. Hapus compatibility wrapper hanya setelah tidak ada runtime import ke `common/Button` dan seluruh build/review lulus.

## Definition of Done baseline

Baseline v1 dan migration slices dapat dipromosikan jika `git diff --check` dan `npx vite build` lulus, tidak ada perubahan pada auth/API/database, seluruh primitive memakai token, proof-of-system dapat dirender, Dialog memiliki lifecycle accessibility, dan setiap perubahan awalnya dikerjakan pada branch terpisah sebelum merge ke `main`. Integrasi ProductDetail terakhir lulus pada 1842 modules dan route production berhasil dimuat.
