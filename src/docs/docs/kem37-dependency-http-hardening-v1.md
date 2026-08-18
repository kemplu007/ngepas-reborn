# KEM-37 — Dependency & HTTP Hardening v1

## Tujuan

KEM-37 mengurangi paparan dependency yang tidak dipakai pada runtime dan mengganti CORS wildcard API dengan allowlist yang eksplisit. Slice ini juga menambahkan rate limit kecil pada API publik/admin untuk memberi respons konsisten ketika satu IP melebihi batas.

## Bukti dan Keputusan

| Temuan | Bukti | Keputusan minimal |
|---|---|---|
| `npm audit --omit=dev` menunjukkan advisory indirect pada jalur toolchain `shadcn`, `@tailwindcss/vite`, dan `tailwindcss` → `vite`/`postcss`/`nanoid`. | Toolchain ini tercatat sebagai root production dependency, tetapi source aplikasi tidak mengimpornya saat runtime browser. | Pindahkan seluruh toolchain ke `devDependencies`; tidak ada upgrade runtime API spekulatif. |
| `app.use(cors())` menerima semua origin. | Preflight production untuk origin Ngepas dan origin tak dikenal sama-sama menghasilkan `access-control-allow-origin: *`. | Izinkan production dan local development secara default; origin tambahan harus eksplisit melalui environment. |
| API tidak memiliki rate limit eksplisit. | `server/index.js` hanya memakai CORS dan parser JSON sebelum route. | Gunakan `express-rate-limit` per IP, default `120` request / `15` menit, tanpa membatasi preflight. |

## Kontrak Runtime

| Area | Kontrak |
|---|---|
| Origin default | `https://ngepas-reborn.vercel.app`, `http://localhost:5173`, dan `http://127.0.0.1:5173`. |
| Origin tambahan | `CORS_ALLOWED_ORIGINS` berupa daftar origin dipisahkan koma, misalnya preview/domain khusus yang telah dipetakan. |
| Origin tanpa header | Diterima untuk health check, curl read-only, dan server-to-server yang tidak membawa browser origin. |
| Origin tak dikenal | Ditolak sebagai error HTTP `403` melalui middleware error yang sudah ada. |
| Rate limit | `API_RATE_LIMIT_WINDOW_MS` dan `API_RATE_LIMIT_MAX` bersifat opsional; default adalah `900000` ms dan `120`. |
| Respons limit | HTTP `429` dengan payload `{ "success": false, "message": "Terlalu banyak permintaan. Coba lagi nanti." }`. |
| Preflight | `OPTIONS` tidak dihitung ke quota agar browser dapat bernegosiasi CORS. |

## Guardrail

KEM-37 tidak mengubah JWT, permission, route, controller, model, SQLite/schema, request payload, data produksi, upload, media storage, WebP, billing, atau user flow. Rate limit in-memory ini adalah guard ringan untuk instance saat ini, bukan pengganti WAF, DDoS protection, atau quota terdistribusi.

## Konfigurasi Operasional

Tidak ada secret baru. Bila browser sah baru perlu mengakses Railway API secara langsung, admin menambahkan origin tepatnya ke `CORS_ALLOWED_ORIGINS` pada environment Railway, dipisahkan koma. Jangan memasukkan wildcard, path URL, atau domain yang belum dipetakan.

## Validasi Wajib

1. Jalankan `npm run quality:check` pada root.
2. Jalankan `node --check server/index.js` dan `node --check server/config/security.js`.
3. Jalankan harness konfigurasi untuk origin default, origin tambahan, origin tak dikenal, preflight, parsing limit, dan respons `429` (14 assertion lulus pada branch ini).
4. Jalankan ulang `npm audit --omit=dev`; hasil branch ini adalah 0 advisory production setelah toolchain dipindahkan ke `devDependencies`.
5. Setelah approval dan deploy, periksa read-only bahwa origin production mendapat header CORS, origin tak dikenal tidak, `OPTIONS` tetap berhasil, dan API masih menjawab normal.
