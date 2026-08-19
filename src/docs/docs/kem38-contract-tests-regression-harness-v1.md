# KEM-38 — Contract Tests & Regression Harness v1

**Status:** Promoted to `main` sebagai `2723a1f` melalui PR #42
**Branch historis:** `feat/kem-38-contract-tests-v1` (sudah dihapus setelah squash merge)
**Baseline:** `origin/main` pada `d6028a6` setelah KEM-37
**Scope:** Gate regresi kecil untuk kontrak existing; tidak mengubah runtime aplikasi.

## Masalah yang ditutup

Sebelum KEM-38, kontrak visibility public/admin, validasi kurasi Published, visibility Draft per-slug, dan canonical public detail telah diuji pada slice masing-masing, tetapi belum berjalan bersama sebagai satu command CI. Readiness Patrol meminta harness kecil untuk memastikan regresi KEM-30 tidak dapat masuk tanpa gate gagal.[1]

> Harness ini bukan test suite besar atau browser E2E. Ia mengunci kontrak perilaku yang sudah disepakati dengan assertion Node.js kecil, deterministik, dan read-only.

## Command resmi

```bash
npm run quality:contract-tests
```

Command menjalankan empat harness secara berurutan dan gagal pada assertion pertama yang tidak sesuai. Totalnya **18 assertion**.

| Harness | Assertion | Kontrak yang dikunci | Batas eksekusi |
|---|---:|---|---|
| `server/.harness-kem17.mjs` | 7 | Produk Published wajib memiliki alasan kurasi dan target kecocokan; Draft tetap boleh belum lengkap. | Mengimpor validator murni; tanpa database. |
| `server/.harness-kem30.mjs` | 3 | Lookup public per-slug dan produk terkait tidak dapat membuka Draft kembali. | Membaca source lokal; tanpa network atau database. |
| `server/.harness-kem33.mjs` | 3 | Katalog public hanya Published; admin dapat membaca Draft dan tetap melalui JWT middleware. | Membuat SQLite temporary lewat `mkdtempSync`, lalu dibersihkan. |
| `server/.harness-kem34.mjs` | 5 | `/discover/:slug` memakai redirect replace ke `/product/:slug`; ProductCard default tetap canonical; Discover tidak menghidupkan detail inline. | Membaca source lokal; tanpa browser atau network. |

## Integrasi CI

Workflow Quality Gate yang sudah ada tetap menjalankan `npm run quality:check`. Setelah itu, workflow menjalankan `npm run quality:contract-tests` pada setiap push branch dan pull request.[2]

Harness KEM-33 menggunakan `better-sqlite3`, dependency backend yang telah ada sebelumnya. Karena backend memiliki manifest terpisah, KEM-38 menambahkan `server/package-lock.json` dan langkah `npm ci --prefix server` pada CI agar install bersifat locked dan reproducible. Tidak ada package baru yang ditambahkan ke manifest root maupun backend.[3]

## Validation evidence

| Pemeriksaan | Hasil pada branch review |
|---|---|
| `npm ci` | Lulus. |
| `npm ci --prefix server` | Lulus; audit dependency backend melaporkan 0 vulnerability. |
| `npm run quality:check` | Lulus: ESLint dan `tsc -b && vite build`. Warning bundle lebih dari 500 kB adalah warning baseline build, bukan kegagalan. |
| `npm run quality:contract-tests` | Lulus: 18 assertion KEM-17, KEM-30, KEM-33, dan KEM-34. |
| `git diff --check` | Lulus. |
| `npm audit --omit=dev --offline --audit-level=low` | Lulus: 0 vulnerability production dari cache lokal. |
| Audit scope harness baru | Lulus: tidak ada `fetch`, URL HTTP, Authorization header, atau path database produksi pada harness KEM-17/KEM-34. |

## Boundary yang dipertahankan

Tidak ada perubahan pada logic aplikasi, route, Context, service, API, auth JWT, schema SQLite, data produksi, CORS, rate limit, media storage, upload, WebP, billing, atau user flow. Harness KEM-33 hanya memakai database sementara pada filesystem lokal dan menghapusnya setelah assertion selesai.

Tidak ada Jest, Vitest, Playwright, coverage target, test browser, atau dependency test baru. Browser E2E hanya perlu dipertimbangkan dalam slice baru bila bukti nyata menunjukkan source-contract ini tidak cukup menangkap regresi routing.

## Acceptance criteria

1. Satu command `npm run quality:contract-tests` menjalankan empat harness lokal secara deterministik.
2. CI menjalankan install root dan backend yang locked, quality gate resmi, lalu contract tests pada push branch dan pull request.
3. Kegagalan pada visibility public/admin, validator Published, visibility Draft per-slug, atau canonical route menghentikan command/CI.
4. Tidak ada harness mengakses network, credential, database produksi, atau melakukan write ke layanan production.
5. `npm run quality:check` dan `git diff --check` tetap lulus.

## Guardrail promotion

Branch ini telah mendapat approval founder dan di-squash merge ke `main` sebagai `2723a1f` pada 18 Agustus 2026. Quality Gate main sukses; health katalog Railway tetap HTTP 200 sebagai verifikasi bounded walaupun runtime aplikasi tidak berubah. Status lifecycle authoritative tercatat di `changelog.md`.

## Referensi

[1]: ./readiness-patrol-v1.md "Readiness Patrol v1 — PR-G Contract Tests & Regression Harness"
[2]: ../../../.github/workflows/quality-gate.yml "Quality Gate workflow"
[3]: ../../../server/package.json "Backend dependency manifest"
