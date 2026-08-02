# ==================================================

# NGEPAS REBORN

# CODING STANDARD v1.0

# ==================================================

Status : ACTIVE
Module : Global
Version : 1.0

==================================================
FILOSOFI
==================================================

Code harus mudah dibaca.

Code harus mudah dipelihara.

Code harus konsisten.

Dokumentasi lebih penting daripada ingatan AI.

==================================================
PRINSIP
==================================================

✔ Satu File = Satu Tanggung Jawab

✔ Konsisten lebih penting daripada keren

✔ Bangun fitur saat dibutuhkan (YAGNI)

✔ Hindari duplikasi (DRY)

✔ Component kecil lebih baik daripada Component besar

==================================================
STRUKTUR FRONTEND
==================================================

Component
↓

Context

↓

Service

↓

API

↓

Backend

Frontend dilarang melakukan fetch() langsung
ke Backend.

Semua komunikasi API harus melalui Service Layer.

==================================================
STRUKTUR BACKEND
==================================================

Routes

↓

Middleware

↓

Validator

↓

Sanitizer

↓

Parser

↓

Controller

↓

Model

↓

SQLite

Controller tidak boleh berisi SQL.

Model tidak boleh mengembalikan Response.

==================================================
NAMING
==================================================

Folder

lowercase

Contoh

components

context

services

helpers

---

Component

PascalCase

ProductCard.jsx

AdminLayout.jsx

---

Function

camelCase

getProducts()

createCategory()

updateProduct()

---

Variable

camelCase

featuredProducts

selectedCategory

productData

==================================================
COMMENT
==================================================

Setiap file wajib memiliki Header.

Contoh

/_==================================================
NGEPAS REBORN
File :
Module :
==================================================_/

Section besar wajib diberi pemisah.

==================================================
SERVICE LAYER
==================================================

Component

×

fetch()

Context

×

fetch()

Service

✓

fetch()

API Helper

✓

request()

==================================================
CONTEXT RULES
==================================================

Context hanya bertugas:

✓ Mengelola Global State

✓ Memanggil Service

✓ Menyimpan Loading

✓ Menyimpan Error

Context tidak boleh:

×

fetch()

×

Hardcode URL Backend

==================================================
ENVIRONMENT
==================================================

×

Hardcode URL Backend

✓

Gunakan Environment Variable

Contoh

VITE_API_URL

==================================================
DOCUMENTATION
==================================================

Setiap perubahan besar wajib:

✔ Update Dokumentasi

✔ Update Changelog

✔ Baru Git Commit

==================================================
GIT
==================================================

Urutan kerja resmi

Ngoding

↓

Testing

↓

Dokumentasi

↓

Git Add

↓

Commit

↓

Push

==================================================
END
==================================================
