
# NGEPAS REBORN — CORE (AI ENTRY POINT)

> Baca file ini dulu sebelum mengubah code.
> Dokumen lain = detail. File ini = nyawa project.

**Status:** LIVE  
**Stack:** React + Vite + Tailwind (FE) · Express + better-sqlite3 (BE)  
**Deploy:** Vercel (frontend) · Railway (backend)  
**Dev:** Solo · mobile-first · AI-assisted

---

## 1. APA ITU NGEPAS

Platform rekomendasi produk rumah (affiliate).  
User lihat produk → admin kelola produk & kategori via dashboard.

---

## 2. ATURAN MUTLAK (JANGAN DILANGGAR)

| Aturan | Keterangan |
|--------|------------|
| FE fetch hanya di **Service** | Component & Context dilarang `fetch()` |
| BE SQL hanya di **Model** | Controller dilarang SQL |
| Response wajib lewat **response helper** | `{ success, message, data }` |
| Satu file = satu tanggung jawab | Jangan campur layer |
| YAGNI | Jangan bangun fitur “kalau-kalau” |
| Dokumentasi dulu, baru commit besar | AI & manusia gampang lupa |

Alur resmi:

Component → Context → Service → API → Backend
Backend: Routes → Validator → Sanitizer → Parser → Controller → Model → SQLite

---

## 3. DEPLOY & ENV

| Bagian | URL / nilai |
|--------|-------------|
| Frontend | https://ngepas-reborn.vercel.app |
| Backend | https://ngepas-reborn-production-c3aa.up.railway.app |
| `VITE_API_URL` | `https://ngepas-reborn-production-c3aa.up.railway.app/api` |
| Local API default | `http://localhost:3000/api` |

- Root Directory Railway: `server`
- Start: `node index.js`
- Init DB: `require("./database/init")` di `index.js` (wajib)
- SQLite **ephemeral** tanpa Volume → data bisa hilang saat redeploy

---

## 4. STRUKTUR CEPAT

server/          → Backend Express
controllers/   → Alur request (tanpa SQL)
models/        → SQL only
routes/        → Endpoint
helpers/       → validator, sanitizer, parser
database/      → db.js, init.js
utils/response.js
src/
services/      → Satu-satunya tempat fetch
context/       → State global (panggil service)
components/    → UI (public + admin)
pages/         → Halaman
config/        → routes, menu, constants
data/          → Konten statis (hero, dll). mock/ = legacy
docs/docs/     → Semua dokumentasi MD

Detail folder: lihat `folders-frontend.md` & `folders-backend.md`.

---

## 5. API (RINGKAS)

Base: `VITE_API_URL` (= `.../api`)

| Method | Path | Ket |
|--------|------|-----|
| GET/POST | `/products` | List / create |
| PUT/DELETE | `/products/:id` | Update / hapus |
| GET/POST | `/categories` | List / create |
| PUT/DELETE | `/categories/:id` | Update / hapus |

Belum ada: `GET /products/:slug`, featured, search, auth, upload.

Kontrak lengkap: `api-contract.md`.

---

## 6. CODING STANDARD (INTI)

- Header wajib di setiap file
- Naming: folder `lowercase`, component `PascalCase`, function `camelCase`
- Jangan hardcode URL backend → pakai env
- Urutan kerja: code → test → update docs → commit → push

Lengkap: `coding-standard.md`.

---

## 7. ARSITEKTUR BACKEND (INTI)

- Controller = orkestrasi saja  
- Model = SQL saja  
- Validator / Sanitizer / Parser = di helpers  
- Response = `success()` / `error()` saja  

Lengkap: `backend-architekture.md`.

---

## 8. STATUS SEKARANG

**Selesai**
- CRUD Product & Category (BE + Admin FE)
- Service layer + Context
- Homepage terhubung API
- Deploy Vercel + Railway
- Init DB on start
- Seed pernah dijalankan

**Belum kokoh**
- Railway Volume (data persistent)
- Auth admin
- GET by slug / featured / search (API)
- Proteksi admin route

**Next (prioritas pondasi, bukan fitur hias)**
1. Volume SQLite di Railway  
2. Pastikan docs & CORE ini selalu di-update  
3. Baru fitur (auth, upload, dsb)

Changelog detail: `changelog.md`.

---

## 9. PETA DOKUMEN

| File | Isi |
|------|-----|
| **ngepas-core.md** (ini) | Entry point AI & manusia |
| `api-contract.md` | Endpoint & response contract |
| `coding-standard.md` | Aturan menulis code |
| `backend-architekture.md` | Flow & layer backend |
| `folders-backend.md` | Isi tiap folder server |
| `folders-frontend.md` | Isi tiap folder src |
| `changelog.md` | Riwayat sprint |

Kalau konflik antar dokumen → **CORE + api-contract menang**, lalu perbaiki MD lain.

---

## 10. INSTRUKSI UNTUK AI

1. Baca `ngepas-core.md` dulu.  
2. Jangan bypass Service layer (FE) atau taruh SQL di Controller (BE).  
3. Jangan tambah endpoint di luar `api-contract.md` tanpa update contract.  
4. Satu perubahan kecil per sesi; update docs jika perilaku berubah.  
5. Ingat: dev di HP, solo, waktu terbatas → solusi harus sederhana.

---

**END OF CORE**