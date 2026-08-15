# Ngepas Frontend Foundation Baseline v1

**Status:** Review baseline

**Branch:** `feat/ngepas-fe-foundation-baseline-v1`

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
| `common/Button` | `src/components/common/Button.jsx` | Compatibility | Delegasi sementara ke `ui/Button` |
| `ConfirmDialog` | `src/components/common/ConfirmDialog.jsx` | Migrated wrapper | API konfirmasi delete tetap, visual dan lifecycle memakai foundation |

## Proof of system

`src/pages/admin/Login.jsx` menjadi proof-of-system pertama. Auth flow tetap sama: `useAuth().login()`, loading state, error state, redirect state, dan `navigate(..., { replace: true })` tidak diubah. Yang berubah hanya komposisi visual agar memakai `Input`, `FormField`, dan `ui/Button`.

`ConfirmDialog` menjadi proof-of-system overlay. `open`, `title`, `message`, `confirmText`, `cancelText`, `onConfirm`, dan `onCancel` tetap kompatibel dengan caller admin yang sudah ada.

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

1. Tambahkan `SelectField` dan `TextareaField` setelah kontrak `Input` terbukti pada Login.
2. Migrasikan `CategoryForm` sebagai specimen form admin kecil.
3. Migrasikan `ProductForm` secara bertahap, tanpa mengubah payload atau handler.
4. Migrasikan `Products`, `Categories`, dan `ProductTable` ke `Button`, `IconButton`, `Badge`, `Input`, `SelectField`, dan `Dialog`.
5. Audit `ProductCard`, `CategoryCard`, `ProductDetail`, dan `CategoryPage` untuk menghapus resep visual legacy setelah caller baru tervalidasi.
6. Hapus compatibility wrapper hanya setelah tidak ada runtime import ke `common/Button` dan seluruh build/review lulus.

## Definition of Done baseline

Baseline v1 dapat diajukan untuk review jika `git diff --check` dan `npx vite build` lulus, tidak ada perubahan pada auth/API/database, seluruh primitive memakai token, proof-of-system dapat dirender, Dialog memiliki lifecycle accessibility, dan branch review tetap terpisah dari `main`.
