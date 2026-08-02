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
SQLite
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

Component

↓

Context

↓

Service

↓

API Configuration

↓

Backend API

↓

SQLite

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
✔ API Configuration
✔ ProductContext Migration

STATUS

COMPLETED

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

DELETE

---

## Database

SQLite

Semua query berasal dari Model.

---

## Response Helper

Semua Response API harus menggunakan:

success()

error()

Agar Frontend selalu menerima format JSON yang sama.

---

# PRINSIP NGEPAS

✔ Satu file satu tanggung jawab.

✔ Tidak over engineering.

✔ Bangun saat dibutuhkan.

✔ Dokumentasi lebih penting daripada ingatan AI.

✔ Konsisten lebih penting daripada keren.

---

# ROADMAP

Foundation
██████████ 100%

CRUD Product
██████████ 100%

CRUD Category
██████████ 100%

Backend Audit
██████████ 100%

Service Layer
░░░░░░░░░░

Authentication
░░░░░░░░░░

Upload Image
░░░░░░░░░░

Deployment
░░░░░░░░░░