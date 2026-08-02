# ==================================================
# NGEPAS REBORN
# API CONTRACT v1.0
# ==================================================

Status  : ACTIVE
Module  : Backend API
Version : 1.0

==================================================
RULES
==================================================

Dokumen ini menjadi kontrak antara Backend dan Frontend.

Frontend hanya boleh mengakses endpoint yang
terdaftar di dokumen ini.

Backend wajib mengembalikan format response yang
konsisten menggunakan Response Helper.

==================================================
FRONTEND RULES
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

Semua komunikasi API Frontend harus melalui
Service Layer.

Service bertanggung jawab:

• Fetch API

• Error Handling

• Parsing Response

• Return Data Bersih

Context hanya menerima data.

Component hanya menggunakan Context.

==================================================
BASE URL
==================================================

BASE URL

VITE_API_URL

Default Development

http://localhost:3000/api

==================================================
STANDARD RESPONSE
==================================================

Success

{
  "success": true,
  "message": "Berhasil mengambil data.",
  "data": {}
}

--------------------------------------------------

Error

{
  "success": false,
  "message": "Terjadi kesalahan."
}

==================================================
PRODUCT API
==================================================

--------------------------------------------------
GET
/api/products
--------------------------------------------------

Deskripsi

Mengambil seluruh data produk.

Request

-

Response

{
  success,
  message,
  data: [
      Product
  ]
}

--------------------------------------------------
POST
/api/products
--------------------------------------------------

Deskripsi

Menambahkan produk baru.

Body

{
  name,
  room,
  category,
  slug,
  price,
  originalPrice,
  discount,
  image,
  badge,
  reason,
  rating,
  sold,
  featured,
  stock,
  affiliateLink,
  description,
  features,
  specifications,
  whyWeRecommend,
  bestFor,
  considerations
}

Response

{
  success,
  message,
  data: Product
}

--------------------------------------------------
PUT
/api/products/:id
--------------------------------------------------

Deskripsi

Memperbarui data produk berdasarkan id.

Parameter

:id

Body

Sama seperti POST.

Response

{
  success,
  message,
  data: Product
}

--------------------------------------------------
DELETE
/api/products/:id
--------------------------------------------------

Deskripsi

Menghapus produk.

Parameter

:id

Response

{
  success,
  message,
  data: Product
}

==================================================
CATEGORY API
==================================================

--------------------------------------------------
GET
/api/categories
--------------------------------------------------

Deskripsi

Mengambil seluruh kategori.

Response

{
  success,
  message,
  data: [
      Category
  ]
}

--------------------------------------------------
POST
/api/categories
--------------------------------------------------

Deskripsi

Menambahkan kategori.

Body

{
  name,
  slug,
  room,
  icon,
  status,
  sortOrder
}

Response

{
  success,
  message,
  data: Category
}

--------------------------------------------------
PUT
/api/categories/:id
--------------------------------------------------

Deskripsi

Mengubah kategori.

Parameter

:id

Body

{
  name,
  slug,
  room,
  icon,
  status,
  sortOrder
}

Response

{
  success,
  message,
  data: Category
}

--------------------------------------------------
DELETE
/api/categories/:id
--------------------------------------------------

Deskripsi

Menghapus kategori.

Parameter

:id

Response

{
  success,
  message,
  data: Category
}

==================================================
HTTP STATUS
==================================================

200

Berhasil mengambil data.

201

Berhasil membuat data.

400

Validasi gagal.

404

Data tidak ditemukan.

500

Internal Server Error.

==================================================
RULES
==================================================

✓ Semua endpoint diawali dengan /api

✓ Semua response menggunakan
Response Helper.

✓ Controller tidak mengembalikan
res.json() secara langsung.

✓ Semua validasi dilakukan di Validator.

✓ Semua sanitasi dilakukan di Sanitizer.

✓ Semua parsing dilakukan di Parser.

✓ Semua SQL hanya berada di Model.

==================================================
NEXT ENDPOINT
==================================================

Sprint Berikutnya

GET    /api/products/:slug

GET    /api/products/featured

GET    /api/products/search

GET    /api/products/category/:category

GET    /api/products/room/:room

--------------------------------------------------

Authentication

POST   /api/auth/login

POST   /api/auth/logout

--------------------------------------------------

Upload

POST   /api/upload

--------------------------------------------------

Settings

GET    /api/settings

PUT    /api/settings

==================================================
IMPLEMENTATION STATUS
==================================================

Backend API

██████████

100%

Frontend Service Layer

██████████

100%

Product Context

██████████

100%

Category Context

██████████

100%

Homepage

██████████

100%

Search

██████████

100%

Status

SPRINT 3.2 COMPLETED

READY FOR ADMIN MODULE

==================================================
END OF DOCUMENT
==================================================