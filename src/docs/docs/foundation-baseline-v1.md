# Ngepas Frontend Foundation Baseline v1

**Status:** Integrated to `main` — 2026-08-16

**Branch:** `main` (promotion merge setelah review branch terpisah)

**Scope:** Reusable frontend foundation untuk public dan admin. Patch ini tidak mengubah backend, database, JWT, service contract, atau business logic.

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

`ProductForm` admin memiliki foundation shell dan Step 1 pada branch `feat/admin-product-form-foundation-v1`, commit `9de7efe`. Slice ini mengganti shell raw dengan `Container`, `Card`, `IconButton`, `Badge`, dan `ui/Button`, serta mengganti field Step 1 dengan `Input`, `FormField`, dan `SelectField` options-array. State, handler, payload, service, context, auth, route, dan backend tidak diubah. Audit juga mencatat bahwa `tags`, `gallery`, dan `status` adalah gap persistence existing pada controller/model/schema dan tidak diperluas pada slice foundation ini.

`ProductForm` Step 2 Harga & Stok dimigrasikan pada branch yang sama sebagai patch lanjutan. Field `price`, `originalPrice`, `rating`, `sold`, `stock`, dan `affiliateLink` sekarang memakai `FormField` serta `Input`; ringkasan diskon otomatis memakai `Card` muted dan semantic tokens. Nama field, handler `handleChange`, kalkulasi diskon, payload, validasi native, service, context, auth, route, dan backend tetap dipertahankan. Tidak ada field varian produk yang ditambahkan.

`ProductForm` Step 3 Gallery dan preview produk dimigrasikan pada branch `feat/admin-product-form-gallery-v1`. URL gambar utama memakai `FormField` dan `Input`, preview memakai `Card`, gallery memakai `Card`, `Badge`, `Button`, dan `IconButton`, sementara state `image`, `gallery`, `newGalleryUrl`, `handleAddGallery`, `handleRemoveGallery`, fallback image, dan payload tetap dipertahankan. Tidak ada upload service, gallery schema, backend persistence, atau varian produk yang ditambahkan pada slice ini.

`ProductForm` Step 4 Details dimigrasikan pada branch `feat/admin-product-form-details-v1` dan dipromosikan ke `main` melalui merge commit `4c46bd0`. Primitive baru `TextareaField` dipakai untuk `description`, `features`, `specifications`, `whyWeRecommend`, `bestFor`, dan `considerations`; nama field, value binding, `handleChange`, rows, placeholder, payload, service, auth, route, dan backend tetap dipertahankan. Validasi gabungan `git diff --check` dan `npx vite build` lulus pada 1843 modules. Varian produk dan upload service tetap diperlakukan sebagai gap contract terpisah karena belum memiliki state, payload, schema, endpoint, dan acceptance criteria aktif.

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
4. Step 2 Harga & Stok, Step 3 Gallery, dan Step 4 Details sudah dipromosikan ke `main` melalui merge commit terpisah; Step 4 memakai `TextareaField` tanpa mengubah payload atau handler.
5. `ProductTable` dan halaman `Products` admin sudah dipromosikan ke `main` melalui merge commit `0c27b67`; tabel memakai `CheckboxField`, `Badge`, dan `IconButton`, halaman memakai `Button`, `SearchInput`, dan `SelectField`, tanpa mengubah state, filter, bulk delete, route, atau contract.
6. Evaluasi terpisah apakah gap persistence `tags`, `gallery`, dan `status` memerlukan backend/schema slice dengan acceptance criteria dan approval eksplisit.
7. Jangan mengimplementasikan varian produk atau upload service sebelum state, payload, schema, endpoint, dan acceptance criteria disepakati sebagai slice fitur terpisah.
8. Migrasikan halaman `Categories` admin dan halaman admin lain yang tersisa ke `Button`, `IconButton`, `Badge`, `Input`, `SelectField`, dan `Dialog`.
9. Hapus compatibility wrapper hanya setelah tidak ada runtime import ke `common/Button` dan seluruh build/review lulus.

## Definition of Done baseline

Baseline v1 dan migration slices dapat dipromosikan jika `git diff --check` dan `npx vite build` lulus, tidak ada perubahan pada auth/API/database, seluruh primitive memakai token, proof-of-system dapat dirender, Dialog memiliki lifecycle accessibility, dan setiap perubahan awalnya dikerjakan pada branch terpisah sebelum merge ke `main`. Integrasi ProductDetail terakhir lulus pada 1842 modules dan route production berhasil dimuat.
