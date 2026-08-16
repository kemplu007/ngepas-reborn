# ==================================================
# NGEPAS REBORN
# CHANGELOG
# ==================================================

## Unreleased — FE Foundation Baseline v1

Release Date: 2026-08-16

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