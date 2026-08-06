# ==================================================
# NGEPAS REBORN
# BACKEND ARCHITECTURE v1.0
# ==================================================

## Filosofi

Backend Ngepas dibangun dengan prinsip:

- Satu file, satu tanggung jawab.
- Controller tidak berisi SQL.
- Model hanya berkomunikasi dengan database.
- Helper menangani validasi, sanitasi, dan parsing.
- Response selalu menggunakan helper agar format API konsisten.
- Bangun fitur saat dibutuhkan (YAGNI), bukan karena mungkin dipakai.

---

# FLOW REQUEST

Frontend
│
▼
index.js
│
▼
Routes
│
▼
Middleware
│
▼
Validator
│
▼
Sanitizer
│
▼
Parser
│
▼
Controller
│
▼
Service (Future)
│
▼
Model
│
▼
SQLite(better-SQLite3)
│
▼
Response Helper
│
▼
Frontend

---

---

# FRONTEND FLOW

Frontend Ngepas menggunakan Service Layer.

Seluruh komunikasi API wajib mengikuti alur berikut.

Component → Context → Service → api.js → Backend API → SQLite
==================================================
SERVICE LAYER
==================================================

Service menjadi satu-satunya pintu komunikasi
antara Frontend dan Backend.

Component tidak boleh menggunakan fetch().

Context tidak boleh menggunakan URL Backend.

Semua request harus melalui Service.

Contoh

Hero

↓

ProductContext

↓

productService

↓

api.js

↓

Backend

==================================================
STATUS
==================================================

✔ Product Service

✔ Category Service

✔ API Configuration

✔ ProductContext Migration

✔ CategoryContext Migration

✔ Homepage Backend Driven

✔ Admin Product CRUD

✔ Admin Category CRUD

✔ Backend CRUD Audit

STATUS

SPRINT 4.0 COMPLETED

# LAYER

## index.js

• Entry Point Backend
• Register Middleware
• Register Routes
• Error Handler
• Menjalankan Server

---

## Routes

Tugas:

• Endpoint API
• Mapping URL
• Tidak boleh berisi Business Logic

Contoh:

GET /api/products

↓

productController.getProducts()

---

## Middleware

Tugas:

• Authentication
• Error Handler
• Not Found
• Upload
• Rate Limiter (Future)

---

## Validator

Tugas:

Memastikan data valid.

Tidak mengubah data.

---

## Sanitizer

Tugas:

Membersihkan input user.

Trim.

Normalisasi.

Menghapus karakter yang tidak diperlukan.

---

## Parser

Tugas:

Mengubah format database menjadi format yang siap dikirim ke Frontend.

---

## Controller

Tugas:

Mengatur alur.

Controller tidak boleh:

❌ SQL

❌ Query Database

❌ Business Logic yang berat

Controller hanya:

↓

Model

↓

Response

---

## Service (Future)

Belum digunakan.

Service hanya dibuat ketika:

- Logic mulai panjang.
- Digunakan oleh banyak Controller.
- Membutuhkan integrasi pihak ketiga.

---

## Model

Tugas:

Berkomunikasi langsung dengan SQLite.

Model hanya berisi:

SELECT

INSERT

UPDATE

Service = satu-satunya pintu fetch.  
Component & Context dilarang `fetch()` langsung.

---

# DATABASE

- Driver: **better-sqlite3**
- Config: `server/database/db.js`
- Path: `process.env.DB_PATH` atau fallback lokal `../ngepas.db`
- Production (Railway): `DB_PATH=/app/data/ngepas.db` + Volume mount `/app/data`
- Init: `server/database/init.js` dipanggil dari `index.js` saat start (`CREATE TABLE IF NOT EXISTS`)
- Seed: `server/seed.js` (jalankan manual di Railway console bila perlu)

---

# LAYER

## index.js

Entry point · dotenv · init DB · middleware · routes · listen

## Routes

Endpoint saja · mapping ke controller · tanpa business logic

## Middleware

errorMiddleware · notFoundMiddleware · (auth future)

## Validator / Sanitizer / Parser

helpers/ — validasi, bersihkan input, parsing

## Controller

Orkestrasi saja · panggil model · response helper · **tanpa SQL**

## Model

SQL only (SELECT / INSERT / UPDATE / DELETE)

## Response Helper

`success()` · `error()` — format `{ success, message, data? }`

## Service (Future)

Hanya jika logic controller membesar / dipakai banyak tempat

---

# DEPLOY NOTES

- Railway root: `server`
- Start: `node index.js`
- Volume via **dashboard** (mount `/app/data`), bukan andalkan JSON volumes saja
- Env wajib production: `DB_PATH`, `PORT` (otomatis Railway)

---

# STATUS (2026-08-06)

| Area | Status |
|------|--------|
| Foundation | 100% |
| CRUD Product | 100% |
| CRUD Category | 100% |
| Admin FE | 100% |
| Service layer FE | 100% |
| Deploy Vercel + Railway | 100% |
| Volume + DB_PATH | 100% |
| Authentication | 0% |
| Upload Image | 0% |

---

# PRINSIP NGEPAS

✔ Satu file satu tanggung jawab  
✔ Tidak over engineering  
✔ Bangun saat dibutuhkan  
✔ Dokumentasi lebih penting daripada ingatan AI  
✔ Konsisten lebih penting daripada keren  

---

**END**