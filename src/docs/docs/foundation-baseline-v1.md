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
| `CheckboxField` | `src/components/ui/CheckboxField.jsx` | Baseline | Checkbox dengan label, hint, checked, disabled, focus, semantic tokens |
| `common/Button` | `src/components/common/Button.jsx` | Compatibility | Delegasi sementara ke `ui/Button` |
| `ConfirmDialog` | `src/components/common/ConfirmDialog.jsx` | Migrated wrapper | API konfirmasi delete tetap, visual dan lifecycle memakai foundation |

## Proof of system

`src/pages/admin/Login.jsx` menjadi proof-of-system pertama. Auth flow tetap sama: `useAuth().login()`, loading state, error state, redirect state, dan `navigate(..., { replace: true })` tidak diubah. Yang berubah hanya komposisi visual agar memakai `Input`, `FormField`, dan `ui/Button`.

`ConfirmDialog` menjadi proof-of-system overlay. `open`, `title`, `message`, `confirmText`, `cancelText`, `onConfirm`, dan `onCancel` tetap kompatibel dengan caller admin yang sudah ada.

`CategoryForm` dan `CategoryPage` menjadi proof-of-system lintas admin/public untuk kontrak `SelectField` berbasis `options` array. CategoryForm mempertahankan ukuran field `md`, sedangkan CategoryPage memakai kontrak yang sama pada sorting; payload, filter state, query params, dan route tetap dipertahankan.

`ProductDetail` public sudah dipromosikan ke `main` melalui branch `feat/public-product-detail-foundation-v1` dan merge commit `e3adb58`. Slice ini memusatkan komposisi ke `Section`, `Card`, `Badge`, `Button`, `SectionHeading`, dan Discover `ProductCard`; gallery state, `useProducts`, `useParams`, related-product filter, route `/product/:slug`, serta affiliate link tetap dipertahankan. Tidak ada endpoint slug baru, compare backend, favorite state baru, auth, atau perubahan data contract pada slice ini. Production route `/product/rak-bumbu-dapur` berhasil dimuat setelah deployment.

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
4. Migrasikan `ProductForm` secara bertahap, tanpa mengubah payload atau handler.
5. Migrasikan `Products`, `Categories`, dan `ProductTable` ke `Button`, `IconButton`, `Badge`, `Input`, `SelectField`, dan `Dialog`.
6. Hapus compatibility wrapper hanya setelah tidak ada runtime import ke `common/Button` dan seluruh build/review lulus.

## Definition of Done baseline

Baseline v1 dan migration slices dapat dipromosikan jika `git diff --check` dan `npx vite build` lulus, tidak ada perubahan pada auth/API/database, seluruh primitive memakai token, proof-of-system dapat dirender, Dialog memiliki lifecycle accessibility, dan setiap perubahan awalnya dikerjakan pada branch terpisah sebelum merge ke `main`. Integrasi ProductDetail terakhir lulus pada 1842 modules dan route production berhasil dimuat.
