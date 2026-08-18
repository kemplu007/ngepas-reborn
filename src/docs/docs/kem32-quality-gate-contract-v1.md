# NGEPAS REBORN
# KEM-32 — QUALITY GATE HIJAU CONTRACT v1

## Status

Review-ready. Dokumen ini mengunci otomatisasi minimum untuk menjaga kualitas branch tanpa mengubah runtime produk.

## Tujuan

Menjalankan satu pemeriksaan yang reproducible pada setiap push branch dan pull request, sehingga perubahan hanya dapat direview setelah command quality lokal lulus.

## Trigger dan Command

| Peristiwa | Workflow | Command |
|---|---|---|
| Push ke branch mana pun | `Quality Gate (KEM-32)` | `npm ci` → `npm run quality:check` |
| Pull request | `Quality Gate (KEM-32)` | `npm ci` → `npm run quality:check` |

`quality:check` adalah kontrak command tunggal yang menjalankan `npm run lint` lalu `npm run build`. Build tetap memakai `tsc -b && vite build`.

## Batas Scope

| Di dalam scope | Di luar scope |
|---|---|
| Memulihkan lint dan build ke kondisi hijau | Migrasi TypeScript massal |
| Workflow GitHub Actions read-only | Perubahan UI/UX, route, API, dan data flow |
| `npm ci` berbasis `package-lock.json` | Auth JWT, SQLite schema/migrasi, media, storage, billing |
| Cache dependency npm dan pembatalan run lama pada ref sama | Deploy otomatis atau akses secret/produksi |

## Acceptance Criteria

1. `npm run lint` lulus pada branch KEM-32.
2. `npm run build` lulus pada branch KEM-32.
3. `npm run quality:check` menjalankan keduanya secara berurutan dan gagal saat salah satu gagal.
4. `.github/workflows/quality-gate.yml` memicu job pada push branch dan pull request.
5. Workflow menggunakan izin `contents: read`, Node.js 22, serta `npm ci`; tidak ada secret, deployment, atau request produksi.
6. PR memuat bukti `git diff --check` dan command Quality Gate lokal sebelum review founder.

## Catatan Keputusan

Repository memakai codebase campuran `.tsx` dan `.jsx`. KEM-32 mengaktifkan `allowJs` pada konfigurasi TypeScript agar build memeriksa graph aplikasi yang benar tanpa memaksa migrasi file besar-besaran. Dua pengecualian `react-refresh/only-export-components` dibuat lokal dan diberi alasan pada public API yang memang mengekspor utilitas/hook di samping komponen.
