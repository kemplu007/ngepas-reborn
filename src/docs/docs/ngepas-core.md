==================================================

NGEPAS REBORN

CORE (AI ENTRY POINT)

==================================================


Baca file ini dulu sebelum mengubah code.

Dokumen lain = detail. File ini = nyawa project.


Status        : LIVE

Last verified : 2026-08-15

Stack         : React + Vite + Tailwind (FE)

Express + better-sqlite3 (BE)

Deploy        : Vercel (frontend)

Railway (backend + Volume)

Dev           : Solo · mobile-first · AI-assisted


==================================================

==================================================

1. APA ITU NGEPAS

==================================================

Platform kurasi & bantu keputusan belanja (affiliate).
Bukan toko. Bukan marketplace.
User yakin di Ngepas → checkout di marketplace.


Phase 1: kurasi (dimulai Home & Living) + 1 link affiliate.
Kategori lain = ekspansi data, bukan rewrite backend.
Multi-harga marketplace = Phase 3 (product_offers).


==================================================

2. ATURAN MUTLAK (JANGAN DILANGGAR)

==================================================


FE fetch hanya di Service Component & Context dilarang fetch()


BE SQL hanya di Model Controller dilarang SQL


Response lewat Response Helper Success : { success, message, data } Error : { success, message }


Satu file = satu tanggung jawab Jangan campur layer


YAGNI Jangan bangun fitur "kalau-kalau"


Docs untuk perubahan berarti Perubahan perilaku / arsitektur wajib didokumentasikan sebelum commit final. Commit kecil / typo tidak wajib update docs.



Alur resmi FE:
  Component → Context → Service → API → Backend


Alur resmi BE:
  Routes → Validator → Sanitizer → Parser
  → Controller → Model → SQLite


==================================================

3. DEPLOY & ENV

==================================================

Frontend
  https://ngepas-reborn.vercel.app


Backend
  https://ngepas-reborn-production-c3aa.up.railway.app


VITE_API_URL (Vercel)
  https://ngepas-reborn-production-c3aa.up.railway.app/api


Local API default
  http://localhost:3000/api


DB_PATH (Railway)
  /app/data/ngepas.db


JWT_SECRET (Railway)
  wajib untuk login JWT


ADMIN_EMAIL / ADMIN_PASSWORD
  seed admin saja


ADMIN_API_KEY (Railway)
  legacy write + internal (fallback middleware)



VERCEL


1 project saja (jangan import repo 2x)

Root = root monorepo (bukan server/)

Build FE saja (npm run build)



RAILWAY


Project resmi : adventurous-perception

Service : ngepas-reborn

Domain : ngepas-reborn-production-c3aa.up.railway.app

Port : 8080

Root Directory: server

Start : node index.js

Init DB : require("./database/init") di index.js (wajib)

Volume : ngepas-reborn-volume mount path : /app/data (lewat UI Railway)

SQLite path : DB_PATH=/app/data/ngepas.db

Local fallback di db.js: path.join(__dirname, "..", "ngepas.db")


Jangan mengandalkan key volumes di railway.json saja.
Volume dibuat / ditempel lewat UI Railway.


Jangan jalankan npm install di folder server/
di Windows / Termux untuk workflow harian.
BE production = Railway.


==================================================

4. DEVELOPMENT WORKFLOW

==================================================


LOCAL (laptop / HP)


Frontend: root repo → npm install → npm run dev

.env di root (FE): VITE_API_URL=https://ngepas-reborn-production-c3aa.up.railway.app/api

Backend: tidak dijalankan lokal (native better-sqlite3)

Testing admin: login di /admin/login token di localStorage key ngepas_token



PRODUCTION


FE: Vercel

BE: Railway Variables

Kode sama; yang beda hanya env



GIT


main = stabil

Kerja di feat/* → merge

AI: jangan push main tanpa izin mandor (kecuali docs sync yang diminta)


Urutan kerja biasa:
  code → test → update docs (jika perilaku berubah)
  → commit → push


==================================================

5. STRUKTUR CEPAT

==================================================

server/
  controllers/   → alur request (tanpa SQL)
  models/        → SQL only (product, category, user)
  routes/        → endpoint (+ authRoutes)
  middleware/    → auth, error, notFound
  helpers/       → validator, sanitizer, parser
  database/      → db.js, init.js
  utils/         → response.js
  railway.json
  seed.js


src/
  services/      → satu-satunya tempat fetch
                   (api, auth, product, category)
  context/       → Auth, Product, Category, Toast, Favorites
  components/    → UI public + admin + common/ProtectedRoute
  pages/         → public + admin (Login, Dashboard, Forms)
  layouts/       → MainLayout, AdminLayout (logout)
  config/        → routes, menu
  data/          → konten statis · mock/ = legacy
  docs/docs/     → semua dokumentasi MD


Detail:
  folders-frontend.md
  folders-backend.md


==================================================

6. API (RINGKAS)

==================================================

Base: VITE_API_URL  (= .../api)


GET  /products          → publik
GET  /categories        → publik
POST /auth/login        → publik
                          body: email, password
                          result: { token }


POST / PUT / DELETE
  /products…            → Bearer JWT (utama)
  /categories…          → Bearer JWT (utama)


Write auth:
  Authorization: Bearer   = mekanisme utama
                                 setelah login admin
  x-api-key                    = fallback legacy / internal saja
  x-api-key BUKAN mekanisme login user


Belum di BE:
  GET /products/:slug
  featured
  search
  pagination
  upload


Kontrak lengkap: api-contract.md
(sync menyusul; kalau konflik dengan CORE → CORE menang dulu)


==================================================

7. AUTH (END-TO-END)

==================================================


BACKEND


POST /api/auth/login → JWT 1 hari

Write dilindungi authMiddleware (Bearer dulu, fallback x-api-key)

Seed admin: ADMIN_EMAIL + ADMIN_PASSWORD + JWT_SECRET



FRONTEND


Route publik admin: /admin/login

Setelah login: token di localStorage key ngepas_token

apiRequest otomatis kirim Authorization Bearer

/admin/* dibungkus ProtectedRoute → redirect login jika belum auth

Logout: hapus token + set state null (tombol di AdminLayout)



BELUM (YAGNI)


Multi-admin / role

Refresh token

Remember me


==================================================

8. CODING STANDARD (INTI)

==================================================


Header wajib di setiap file

Naming: folder → lowercase component → PascalCase function → camelCase

Jangan hardcode URL backend → pakai env

Satu outcome per sesi

Max 2–3 file untuk polish UI


Lengkap: coding-standard.md


==================================================

9. ARSITEKTUR BACKEND (INTI)

==================================================


Controller = orkestrasi saja

Model = SQL saja

Validator / Sanitizer / Parser = di helpers

Response = success() / error() saja

DB driver = better-sqlite3 (bukan node:sqlite)


Lengkap: backend-architekture.md


==================================================

10. STATUS SEKARANG

==================================================

Last verified: 2026-08-15



DONE


Deploy Vercel (1 project)
Railway (1 project + Volume + DB_PATH)

CRUD Product & Category (BE + Admin FE)

Service layer + Context

Dashboard stats, bulk delete, toast, confirm

Sprint 6.0–6.1: API key write lock (legacy tetap di BE)

Sprint 6.5 BE: JWT login production

Sprint 6.5 FE: login page, AuthContext, Bearer write, ProtectedRoute, logout

Kategori di schema generic (ekspansi = data, bukan rombak)

Auth end-to-end JWT hidup



CURRENT CHECKPOINT


Auth end-to-end stabil (jangan rebuild)

Deploy tunggal stabil (1 FE, 1 BE)

Siap lanjut fitur produk / polish, bukan auth ulang



NEXT (urut, jangan loncat)


Polish UI /admin/login (masih bare HTML)

GET /products/:slug

Admin form: wajibkan field kurasi (reason, whyWeRecommend, considerations)

Search sederhana

Polish UI mobile (Mockup A)

CORS ketat / rate limit

Upload image

product_offers (Phase 3)


==================================================

11. KNOWN LIMITATIONS

==================================================


BACKEND LOCAL (Windows / Android / Termux)

Bukan workflow resmi.


Alasan:
  better-sqlite3 = native module
  (Python / node-gyp / NDK)


Workflow resmi:
  Frontend Local
       ↓
  Railway Backend (production + Volume)
       ↓
  Testing
       ↓
  Deploy Vercel


Jangan buang waktu install Python / build tools
hanya untuk npm install di server/.



DUPLIKAT DEPLOY


Jangan import repo yang sama 2x ke Vercel atau Railway

Satu FE project, satu BE project


==================================================

12. PETA DOKUMEN

==================================================

ngepas-core.md (ini)
  → Entry point AI & manusia


api-contract.md
  → Endpoint & response contract
  → (perlu sync menyusul)


coding-standard.md
  → Aturan menulis code


backend-architekture.md
  → Flow & layer backend


folders-backend.md
  → Isi tiap folder server


folders-frontend.md
  → Isi tiap folder src
  → (perlu sync ringan)


changelog.md
  → Riwayat sprint


Kalau konflik antar dokumen:
  CORE menang, lalu perbaiki MD lain.


==================================================

13. INSTRUKSI UNTUK AI

==================================================


Baca ngepas-core.md dulu.


Jangan bypass Service layer (FE) atau taruh SQL di Controller (BE).


Jangan tambah endpoint di luar api-contract.md tanpa update contract.


Satu perubahan kecil per sesi. Update docs jika perilaku / arsitektur berubah.


Volume: path production lewat DB_PATH. Jangan rusak deploy dengan config Railway aneh.


Dev di HP / laptop pinjaman, solo, waktu terbatas → solusi sederhana.


Jangan debug native better-sqlite3 di Termux / Windows untuk workflow harian.


JANGAN rebuild JWT BE / FE auth. Sudah live end-to-end. Lanjut slug / kurasi / polish.


Jangan usul ganti stack / rombak total untuk multi-kategori.


Satu outcome per sesi. Update changelog jika perilaku API atau auth berubah.


Polish UI: 1 tujuan, max 2–3 file, Definition of Done jelas.


Hormati CURRENT CHECKPOINT vs NEXT. Jangan loncat ke Phase 3.



==================================================

END OF CORE

==================================================
