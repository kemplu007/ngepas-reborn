# ==================================================

# NGEPAS REBORN

# BACKEND STRUCTURE v1.0

# ==================================================

server/
│
├── controllers/
│ ├── categoryController.js
│ └── productController.js
│
├── database/
│ ├── db.js
│ └── init.js
│
├── helpers/
│ │
│ ├── parsers/
│ │ └── productParser.js
│ │
│ ├── sanitizers/
│ │ └── productSanitizer.js
│ │
│ └── validators/
│ ├── categoryValidator.js
│ └── productValidator.js
│
├── middleware/
│ ├── errorMiddleware.js
│ └── notFoundMiddleware.js
│
├── models/
│ ├── categoryModel.js
│ └── productModel.js
│
├── routes/
│ ├── categoryRoutes.js
│ └── productRoutes.js
│
├── utils/
│ └── response.js
│
├── .env
├── .gitignore
├── index.js
├── ngepas.db
├── package.json
├── package-lock.json
└── seed.js

==================================================
NOTE PER FOLDER & FILE
==================================================

📁 controllers

categoryController.js
• Logic CRUD Category.
• Menghubungkan Request → Model → Response.

productController.js
• Logic CRUD Product.
• Mengatur Create, Read, Update, Delete.

---

📁 database

db.js
• Konfigurasi koneksi SQLite.

init.js
• Membuat database.
• Membuat tabel jika belum ada.
• Inisialisasi struktur database.

---

📁 helpers

parsers/

productParser.js
• Mengubah request mentah menjadi object yang siap diproses.
• Parsing body, query, atau parameter.

---

sanitizers/

productSanitizer.js
• Membersihkan input user.
• Menghapus karakter yang tidak diperlukan.
• Normalisasi data sebelum disimpan.

---

validators/

categoryValidator.js
• Validasi data kategori.
• Mengecek field wajib dan format.

productValidator.js
• Validasi data produk.
• Memastikan data sesuai aturan aplikasi.

---

📁 middleware

errorMiddleware.js
• Global Error Handler.
• Menangani seluruh error Express.

notFoundMiddleware.js
• Handler Route 404.
• Mengembalikan response jika endpoint tidak ditemukan.

---

📁 models

categoryModel.js
• Query Database Category.
• Berkomunikasi langsung dengan SQLite.

productModel.js
• Query Database Product.
• Semua operasi SQL produk berada di sini.

---

📁 routes

categoryRoutes.js
• Endpoint API Category.

productRoutes.js
• Endpoint API Product.

---

📁 utils

response.js
• Format standar Response API.
• Success Response.
• Error Response.
• Konsisten untuk seluruh backend.

---

📄 index.js

• Entry Point Backend.
• Membuat Express Server.
• Memasang Middleware.
• Register seluruh Routes.
• Menjalankan server.

---

📄 seed.js

• Seeder Database.
• Mengisi data awal produk & kategori.

---

📄 ngepas.db

• Database SQLite Project.

---

📄 package.json

• Dependency Backend.
• Script npm.
• Konfigurasi project.

---

📄 package-lock.json

• Lock Version Dependency npm.

---

📄 .env

• Environment Variable.
• PORT
• Database Path
• Konfigurasi rahasia aplikasi.

---

📄 .gitignore

• File yang tidak ikut ke Git.
• node_modules
• .env
• file sementara.

==================================================
ROADMAP NEXT
==================================================

📁 services/

productService.js

• Business Logic Product.

• Digunakan jika Controller mulai terlalu besar.

---

categoryService.js

• Business Logic Category.

---

authService.js

• Login

• JWT

• Hash Password

---

emailService.js

• Email Notification

---


STATUS
Mengikuti prinsip YAGNI

Backend CRUD Product

✔

Backend CRUD Category

✔

Frontend Integration

✔

NEXT

Authentication

Upload

Settings

Service Layer Backend (Jika diperlukan)