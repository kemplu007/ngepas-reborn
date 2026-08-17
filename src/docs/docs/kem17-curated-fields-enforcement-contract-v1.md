# KEM-17 — Perketat Field Kurasi di Admin Form dan Validator

**Status:** Implementasi branch review · Belum dipromosikan
**Branch:** `feat/curated-fields-enforcement-v1` · Basis `origin/main@7333dc4`
**Tanggal kontrak:** 17 Agustus 2026
**Jenis slice:** Validasi produk baru (create) dan form admin; edit produk existing tidak diubah wajibnya (backward compatibility dengan data lama).

## Acceptance criteria (Linear)

Outcome: produk baru mempunyai alasan kurasi yang cukup untuk ditampilkan di Discover dan Product Detail. Field target: `reason`, `whyWeRecommend`, `bestFor`, `considerations`, `slug`, `price`, `rating`, dan `stock`. Validasi server dan form admin konsisten; pesan error dapat dipahami user admin; data lama tidak rusak tanpa migrasi destruktif; mengikuti pipeline backend resmi dan arsitektur frontend service/context. Batasan: tidak menyentuh auth JWT admin dan tidak merombak schema besar.

## Keputusan aturan (scope yang dipilih)

Field `reason`, `rating`, dan `stock` tidak dipakai oleh panel Panduan keputusan publik saat ini; KEM-17 tidak mengubah kontrak tampil. Enforcement fokus pada **field kurasi yang sudah live**: `whyWeRecommend` dan `bestFor`. Field `considerations` bersifat opsional (produk boleh jujur tanpa pertimbangan negatif).

| Aturan | Create (produk baru) | Update (edit) |
|---|---|---|
| `whyWeRecommend` | Wajib, minimal 1 alasan, minimal 8 karakter per alasan | Tidak berubah (jangan merusak data lama) |
| `bestFor` | Wajib, minimal 1 kecocokan | Tidak berubah |
| `considerations` | Opsional | Tidak berubah |
| Draft | Tetap dapat menyimpan tanpa field kurasi (field kurasi wajib hanya pada status Published) | Tidak berubah |

Keputusan draft-exception menjaga fleksibilitas workflow admin: admin dapat menyimpan progres tanpa klaim kurasi sebelum produk layak ditampilkan.

## Batas perubahan

Backend hanya pada `server/helpers/validators/productValidator.js` (menambahkan `validateCurationFields(published)` dipanggil di create/update dengan status published) dan pipeline existing Routes → Validator → Sanitizer → Controller → Model. Frontend hanya pada `src/pages/admin/ProductForm.jsx`: pemeriksaan lokal sebelum submit dengan pesan bahasa manusia yang merujuk field spesifik. Tidak ada perubahan auth JWT, schema, migration, persistence, media, billing, atau data produksi (verifikasi harness read-only).

## Validasi

`git diff --check` bersih, `node --check` pada file backend yang berubah, `npx vite build` sukses, harness controller read-only untuk jalur validasi (tanpa menulis database produksi), pemeriksaan visual form admin mobile/desktop.

## Jejak promosi

PR dan merge commit dicatat pada changelog setelah approval founder; Linear KEM-17 ditandai In Progress selama review dan Done setelah dokumentasi promosi masuk `main`.
