# ==================================================
# NGEPAS REBORN
# CHANGELOG
# ==================================================

## Unreleased — FE Foundation Baseline v1

Release Date: 2026-08-16

==================================================

## DISCOVER HERO RHYTHM — SLICE 2

✓ `CampaignBanner.jsx` mempertahankan mobile one-column flow dan memakai komposisi copy-kiri/visual-kanan pada desktop
✓ Hierarki CTA diringankan: action utama tetap Button hijau, sedangkan action sekunder menjadi quiet outline tanpa mengganti copy atau destination
✓ Manfaat ditata sebagai scan path vertikal desktop; asset visual dan disclosure marketplace dipertahankan tanpa data atau logo rekaan
✓ Tidak ada perubahan pada `discoverCampaign`, `onAction`, `secondaryCtaHref`, asset, alt, section ID, route, search/filter logic, API, backend, database, auth JWT, Railway, atau deployment

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); mobile 375 px tanpa overflow; desktop 1280 px memakai komposisi dua kolom

✓ Branch `polish/discover-hero-rhythm-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `fb65112`

STATUS: DISCOVER HERO RHYTHM SLICE 2 PROMOTED TO `main`

==================================================

FRONTEND FOUNDATION
==================================================

✓ `src/components/ui/Button.jsx` dikunci sebagai authority visual tunggal; `common/Button.jsx` menjadi compatibility wrapper
✓ `Container`, `IconButton`, dan `Badge` diselaraskan ke semantic tokens dan motion tokens
✓ `Input`, `FormField`, `Card`, dan `Dialog` ditambahkan sebagai primitive reusable lintas public/admin
✓ `/admin/login` menjadi proof-of-system pertama untuk `Input`, `FormField`, dan `ui/Button`
✓ `ConfirmDialog` memakai `Dialog` dan `ui/Button` tanpa mengubah callback delete atau auth flow
✓ Dialog memiliki Escape, click-outside, focus return, body lock, semantic labeling, dan reduced-motion-compatible surface motion
✓ `SelectField` dan `CheckboxField` ditambahkan sebagai primitive form reusable lintas public/admin
✓ `CategoryForm` dimigrasikan ke `Container`, `Card`, `Input`, `FormField`, `SelectField`, `CheckboxField`, dan `ui/Button` tanpa mengubah payload, service, auth, atau redirect
✓ `SelectField` menggunakan satu kontrak reusable berbasis `options` array; CategoryForm mempertahankan kepadatan field admin melalui `size="md"`

VALIDATION: `git diff --check` + `npx vite build` PASSED (1841 modules)

==================================================
PUBLIC PAGE MIGRATION
==================================================

✓ `CategoryPage.jsx` memakai `Section`, `SectionHeading`, `Card`, `SearchInput`, `SelectField`, dan Discover `ProductCard`
✓ State filter, query params `room`/`category`, sorting, loading/error state, dan destination `/product/:slug` dipertahankan
✓ `SelectField.jsx` memakai kontrak reusable berbasis `options` array, semantic tokens, accessible labeling, helper/error state, dan reduced-motion-safe transition
✓ Tidak ada perubahan pada auth JWT, service/context/API, backend, database, atau route contract

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: CATEGORY PAGE FOUNDATION MIGRATION REVIEW

==================================================
INTEGRATION CHECKPOINT
==================================================

✓ CategoryPage dan CategoryForm sudah dipromosikan ke `main` setelah review branch terpisah
✓ Konflik `SelectField` diselesaikan dengan satu authority options-array untuk public dan admin
✓ `category-form-preview-audit.md` dipertahankan sebagai catatan review route protected dan browser verification
✓ Merge validation: `git diff --check` + `npx vite build` PASSED (1843 modules)

STATUS: FOUNDATION SLICES INTEGRATED — PRODUCTION PUSH COMPLETED

==================================================

## PRODUCT DETAIL FOUNDATION SLICE

✓ `ProductDetail.jsx` memakai `Section`, `Card`, `Badge`, `Button`, `SectionHeading`, dan Discover `ProductCard`
✓ Raw surface, badge, CTA, dan legacy related-product card diganti dengan foundation/token composition
✓ Gallery thumbnail mempertahankan selection state dan ditambah accessible pressed state
✓ Loading, error, dan not-found state memakai surface foundation tanpa mengubah route atau data contract
✓ Affiliate link, target external, `useProducts`, `useParams`, related-product filter, serta route `/product/:slug` dipertahankan
✓ Tidak ada perubahan pada auth JWT, service/context/API contract, backend, database, compare endpoint, atau favorite state baru

VALIDATION: `git diff --check` + JSX parser + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT DETAIL FOUNDATION SLICE PROMOTED TO `main` — PRODUCTION ROUTE VERIFIED

==================================================

## PRODUCT DETAIL PRODUCTION PROMOTION

✓ ProductDetail foundation di-merge ke `main` melalui merge commit `e3adb58`
✓ `origin/main` berhasil dipush dan route `/product/rak-bumbu-dapur` berhasil dimuat di production
✓ Loading state lalu loaded state berhasil diverifikasi pada route ProductDetail
✓ Production screenshot mencatat observasi asset image utama yang tampak blank pada capture; tidak diperbaiki di luar scope promotion dan menunggu audit asset/runtime terpisah bila reproducible

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules); production route LOAD PASSED

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 1

✓ ProductForm shell memakai `Container`, `Card`, `IconButton`, `Badge`, dan `ui/Button`
✓ Field Step 1 memakai `Input`, `FormField`, dan `SelectField` dengan kontrak `options` array
✓ Step navigation, state, handler, payload, service, context, auth, route, dan backend dipertahankan
✓ Contract audit mencatat `tags`, `gallery`, dan `status` sebagai gap persistence existing; tidak ada perubahan backend/schema pada slice ini

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT FORM FOUNDATION STEP 1 READY FOR REVIEW ON `feat/admin-product-form-foundation-v1`

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 2 HARGA & STOK

✓ Field `price`, `originalPrice`, `rating`, `sold`, `stock`, dan `affiliateLink` memakai `FormField` dan `Input`
✓ Ringkasan diskon otomatis memakai `Card` muted dan semantic foundation tokens
✓ Name field, value binding, `handleChange`, kalkulasi diskon, native validation, dan payload dipertahankan
✓ Tidak ada field varian produk, endpoint baru, perubahan backend/schema, auth, route, atau service contract

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT FORM FOUNDATION STEP 2 READY FOR REVIEW ON `feat/admin-product-form-foundation-v1`

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 3 GALLERY & PREVIEW

✓ URL gambar utama memakai `FormField` dan `Input` dengan type URL serta helper text
✓ Preview gambar utama memakai `Card` muted/default dan mempertahankan `imageError` fallback
✓ Gallery memakai `Card`, `Badge`, `Button`, dan `IconButton` dengan label hapus aksesibel
✓ State `image`, `gallery`, `newGalleryUrl`, handler tambah/hapus, fallback image, dan payload dipertahankan
✓ Tidak ada upload service, gallery schema, backend persistence, varian produk, atau perubahan auth/route/service contract

VALIDATION: `git diff --check` + `npx vite build` PASSED (1842 modules)

STATUS: PRODUCT FORM FOUNDATION STEP 3 READY FOR REVIEW ON `feat/admin-product-form-gallery-v1`

==================================================

## PRODUCT FORM FOUNDATION SLICE — STEP 4 DETAILS

✓ Primitive baru `TextareaField.jsx` dibuat sebagai foundation untuk label, hint/error, required, invalid, size, focus, token, dan reduced motion
✓ Field `description`, `features`, `specifications`, `whyWeRecommend`, `bestFor`, dan `considerations` memakai `TextareaField` dalam komposisi `Card`
✓ Name field, value binding, `handleChange`, rows, placeholder, payload, service, auth, route, dan backend dipertahankan
✓ Varian produk dan upload service tidak diimplementasikan karena belum memiliki state, payload, schema, endpoint, dan acceptance criteria aktif

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/admin-product-form-details-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Scope tetap terbatas pada Details dan primitive `TextareaField`; varian produk serta upload service tidak masuk

STATUS: PRODUCT FORM FOUNDATION STEP 4 DETAILS PROMOTED TO `main` VIA MERGE COMMIT `4c46bd0`

==================================================

## PRODUCT TABLE FOUNDATION SLICE

✓ `ProductTable.jsx` memakai `CheckboxField`, `Badge`, dan `IconButton`; harga memakai format rupiah; stok dan status memakai badge semantic (primary saat stok ada, danger saat habis, neutral untuk draft)
✓ Edit memakai `Link` wrapper dengan `IconButton` berlabel aksesibel; hapus memakai `IconButton` ghost dengan hover danger
✓ `Products.jsx` memakai `Button`, `SearchInput`, dan `SelectField` dengan label resmi untuk filter kategori
✓ State filter, bulk delete, `ConfirmDialog`, `useProducts`, `useToast`, route, payload, auth JWT, service, dan backend dipertahankan tanpa perubahan
✓ Review visual di dev server dengan data produksi: tabel merender produk nyata, filter kategori berfungsi, dan search/filter foundation tampil sesuai kiblat

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/admin-product-table-foundation-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Tidak ada perubahan pada auth JWT, service/context/API contract, backend, database, atau varian produk dan upload service

STATUS: PRODUCT TABLE FOUNDATION SLICE PROMOTED TO `main` VIA MERGE COMMIT `0c27b67`

==================================================

## ADMIN SIDEBAR ACTIVE OUTLINE FIX

✓ Active `NavLink` tidak lagi memakai outline default yang dapat terlihat sebagai double outline saat fokus
✓ Keyboard focus tetap terlihat melalui focus ring hijau berbasis token dengan offset terhadap surface Sidebar
✓ Radius, transition duration, easing, dan reduced-motion behavior mengikuti token foundation
✓ Tidak ada perubahan pada route, menu, logout, auth JWT, layout, atau navigation behavior

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

STATUS: ADMIN SIDEBAR ACTIVE OUTLINE FIX PROMOTED TO `main` VIA MERGE COMMIT `bb41b73`

==================================================

## ADMIN CATEGORIES LISTING FOUNDATION

✓ Halaman Categories admin memakai `Button` untuk CTA tambah kategori
✓ Listing table memakai surface, border, shadow, spacing, typography, dan hover token foundation
✓ Status Aktif/Nonaktif memakai `Badge` reusable
✓ Action edit/hapus memakai `IconButton` dengan label aksesibilitas dan destination edit nyata
✓ Loading/error state memakai surface dan semantic color token
✓ CategoryContext, categoryService, ConfirmDialog, toast, CRUD behavior, route, auth JWT, dan backend tetap dipertahankan

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules); preview berhasil memuat 6 kategori nyata

STATUS: ADMIN CATEGORIES LISTING FOUNDATION PROMOTED TO `main` VIA MERGE COMMIT `0a11f39`

==================================================

## PRODUCT STATUS PERSISTENCE — PR-1

✓ Migration idempotent menambahkan `products.status` dengan enum kontrak `published` atau `draft`
✓ Row lama dan produk baru memakai default `published`; update mempertahankan status lama ketika field tidak dikirim
✓ Validator, sanitizer, parser, model, controller, initializer, dan seed lokal diperbarui tanpa menyentuh auth JWT
✓ Product response sekarang membawa nilai status yang sudah dipersistenkan; PR-1 belum mengubah visibility endpoint publik
✓ Scope guard tetap aktif: tags, gallery, upload service, product_offers, search, dan public visibility filtering tidak masuk slice ini

VALIDATION: `git diff --check` + backend syntax check + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-status-persistence-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `377e22d`

STATUS: PRODUCT STATUS PERSISTENCE PR-1 PROMOTED TO `main`

==================================================

## PRODUCT STATUS READ-BACK VERIFICATION — PR-1.5

✓ ProductForm menunggu response create/update dari backend sebelum menampilkan toast sukses atau melakukan navigasi kembali ke daftar
✓ ProductContext mengembalikan row persisted dari service dan meneruskan error agar kegagalan status invalid tidak menjadi sukses palsu
✓ Opsi status FE diselaraskan dengan enum contract `published`/`draft`; opsi `hidden` dihapus
✓ ProductTable tetap memakai `product.status` dari ProductContext tanpa hardcoded fallback lokal
✓ Tidak ada perubahan pada auth JWT, endpoint, schema, tags, gallery, upload service, product_offers, search, atau visibility publik

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-status-readback-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `170a1c1`

STATUS: PRODUCT STATUS READ-BACK PR-1.5 PROMOTED TO `main`

==================================================

## PRODUCT TAGS PERSISTENCE — PR-2

✓ Migration idempotent menambahkan `products.tags` dengan default `[]` untuk row legacy
✓ Tags dinormalisasi dengan trim, penghapusan item kosong, deduplikasi case-insensitive, dan ejaan item pertama dipertahankan
✓ Validator memberlakukan maksimal 12 tag per produk dan maksimal 40 karakter per tag
✓ Controller, model, parser, dan seed lokal sudah meneruskan tags sebagai JSON array tanpa mengubah route atau auth
✓ ProductForm dan ProductContext yang sudah dipromosikan sebelumnya langsung meneruskan serta membaca kembali tags melalui alur resmi
✓ Tags hanya dipersistenkan; search, filter, SEO, public visibility, upload, gallery, dan product_offers tetap di luar scope

VALIDATION: migration/parser/model round-trip smoke test + backend syntax check + `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-tags-persistence-v1` dipromosikan ke `main` melalui merge commit `c81fa03`

STATUS: PRODUCT TAGS PERSISTENCE PR-2 PROMOTED TO `main`

==================================================

## PRODUCT GALLERY URL PERSISTENCE — PR-3

✓ Migration idempotent menambahkan `products.gallery` dengan default `[]` dan menormalkan nilai legacy kosong menjadi `[]`
✓ Gallery menerima array maksimal 8 URL absolut `http://` atau `https://`; sanitizer hanya melakukan trim dan mempertahankan urutan editorial
✓ Controller, model, parser, initializer, dan seed lokal meneruskan gallery sebagai JSON array tanpa mengubah route, auth JWT, atau response helper
✓ POST tanpa gallery menyimpan `[]`; PUT tanpa gallery mempertahankan nilai gallery yang tersimpan; response GET/POST/PUT selalu memberi array bersih
✓ `image` tetap gambar utama; tidak ada upload, object storage, WebP, multipart, endpoint media, search, public visibility, atau `product_offers`
✓ ProductForm dan ProductDetail tidak membutuhkan patch karena payload dan read-back gallery sudah tersedia sebelum PR-3

VALIDATION: migration/model/parser/validator/controller smoke test + backend syntax check + `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `feat/product-gallery-persistence-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `1088246`
✓ Tidak ada migration production Railway atau write verification yang dijalankan pada promotion ini; keduanya tetap menunggu runbook dan recovery procedure terpisah

STATUS: PRODUCT GALLERY URL PERSISTENCE PR-3 PROMOTED TO `main`

==================================================

## DISCOVER PRODUCT CARD RHYTHM — SLICE 1

✓ `ProductCard.jsx` merapikan hierarchy badge, kategori, nama, rating, harga, dan CTA tanpa mengubah props, route detail, favorite flow, API, backend, atau data produk
✓ Harga numerik dirender sebagai format Rupiah; placeholder `— review` dan `Data katalog` tidak lagi muncul bila data nyata tidak tersedia
✓ CTA detail tetap memiliki destination, target sentuh, dan focus ring yang sama, dengan bobot visual yang lebih tenang terhadap harga dan badge kurasi
✓ Browser review membuktikan tidak ada document overflow pada 375 px; empat card desktop tampil seimbang pada 1280 px

VALIDATION: `git diff --check` + `npx vite build` PASSED (1843 modules)

✓ Branch `polish/discover-product-card-rhythm-v1` dipromosikan ke `main` setelah approval eksplisit
✓ Merge commit promotion: `ee5d889`
✓ Tidak ada perubahan backend, auth JWT, database, API, Railway, atau konfigurasi deployment

STATUS: DISCOVER PRODUCT CARD RHYTHM SLICE 1 PROMOTED TO `main`

==================================================

## v1.5.0 — Discover Filter Surface + Global Panel Motion

Release Date: 2026-08-15

==================================================
FRONTEND POLISH
==================================================

✓ FilterPanel mengikuti pola mockup Search & Filter: surface putih, hierarki bernomor, border tipis, dan kontrol native yang tetap accessible
✓ FilterPanel tetap presentational; callback dan state business tidak berubah
✓ MobileNavDrawer dirampingkan ke `min(80vw, 320px)` dengan padding mobile yang lebih compact
✓ Utility `.np-motion-surface` reusable untuk panel dan drawer dengan transform/opacity, token motion, dan reduced-motion support
✓ Overlay dan drawer menggunakan state `data-motion-state` agar transisi muncul/hilang konsisten

STATUS: DISCOVER MOBILE POLISH REVIEW

==================================================

## v1.4.0 — FE JWT Login + Logout

Release Date: 2026-08-14

==================================================
FRONTEND
==================================================

✓ AuthContext (token, login, logout, isAuthenticated)
✓ authService: POST /auth/login + saveToken / removeToken
✓ api.js: Authorization Bearer otomatis jika token ada
✓ /admin/login (Login.jsx)
✓ ProtectedRoute → redirect ke /admin/login
✓ Logout di AdminLayout
✓ productService / categoryService lewat apiRequest (Bearer)
✓ AuthProvider di main.tsx
✓ Vercel Speed Insights (App.tsx)

==================================================
DEPLOY / OPS
==================================================

✓ Vercel: 1 project saja (duplikat dihapus)
✓ Railway: 1 project resmi (adventurous-perception)
  - Domain: ngepas-reborn-production-c3aa.up.railway.app
  - Volume: ngepas-reborn-volume → /app/data
✓ Duplikat Railway (lovely-encouragement) dihapus

==================================================
STATUS
==================================================

SPRINT 6.5 FE COMPLETED
(Auth end-to-end: BE JWT + FE login/logout + Bearer write)

==================================================
NEXT
==================================================

□ Polish UI halaman /admin/login (masih minimal)
□ GET /api/products/:slug
□ Search / featured / pagination
□ Validasi kurasi wajib di admin form
□ CORS ketat + rate limit write
□ Polish UI mobile (Mockup A)
□ Upload image
□ product_offers multi-marketplace (Phase 3)

==================================================

## v1.3.0 — JWT Login (Backend)

Release Date: 2026-08-08

✓ Tabel users (init.js)
✓ userModel.getUserByEmail
✓ POST /api/auth/login (bcrypt + JWT 1d)
✓ authMiddleware: Bearer JWT dulu, fallback x-api-key
✓ seed admin (ADMIN_EMAIL + ADMIN_PASSWORD)
✓ package: bcryptjs, jsonwebtoken
✓ Production: JWT_SECRET + seed + login 200 + token

STATUS: SPRINT 6.5 BE COMPLETED

==================================================

## v1.2.0 — Auth Foundation (API Key)

Release Date: 2026-08-06

✓ authMiddleware x-api-key
✓ POST/PUT/DELETE products + categories diproteksi
✓ FE Service kirim x-api-key (VITE_ADMIN_API_KEY) — diganti Bearer di v1.4.0

STATUS: SPRINT 6.0 + 6.1 COMPLETED

==================================================

## v1.0.0 — Foundation Live

Release Date: 2026-08-06

✓ Railway + Vercel + Volume + better-sqlite3
✓ CRUD Product + Category
✓ Service layer + Context + Admin

==================================================

## v0.9.0

Release Date: 2026-08-03

✓ Admin Category CRUD + bug form

==================================================
END
==================================================
