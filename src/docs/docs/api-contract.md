# ==================================================

# NGEPAS REBORN

# API CONTRACT v1.1

# ==================================================

Status : ACTIVE · diselaraskan pada `main@f0f35d2`
Module : Backend API
Version : 1.1

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

---

Error

{
"success": false,
"message": "Terjadi kesalahan."
}

==================================================
PRODUCT API
==================================================

---

GET
/api/products
--------------------------------------------------

Deskripsi

Mengambil katalog publik. Respons hanya berisi produk dengan `status = "published"`; produk Draft tidak dikirim ke Discover, kategori, featured products, atau pencarian publik.

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

Product response selalu mengembalikan `tags` dan `gallery` sebagai array string yang sudah dinormalisasi. Row legacy tanpa nilai tags atau gallery dibaca sebagai `[]`.

---

GET
/api/products/admin
--------------------------------------------------

Deskripsi

Mengambil katalog lengkap untuk admin terautentikasi, termasuk produk Draft. Request wajib membawa `Authorization: Bearer <token>` valid. Endpoint ini dipakai Dashboard, daftar produk, dan form edit admin; tidak boleh dipakai surface publik.

Response

{
success,
message,
data: [
Product
]
}

Error

401: token tidak ada atau tidak valid.

---

GET
/api/products/:slug
--------------------------------------------------

Deskripsi

Mengambil satu produk `published` berdasarkan slug melalui lookup exact. Produk `draft` diperlakukan sama seperti produk yang tidak ditemukan agar Product Detail publik tidak dapat dirender atau di-enumerasi dari slug.

Parameter

:slug

Response sukses

{
success,
message,
data: Product
}

Error

400: slug kosong atau tidak valid.

404: Produk tidak ditemukan, termasuk bila slug merujuk produk `draft`.

`Product` memakai bentuk normalisasi yang sama dengan response `GET /api/products`, termasuk default `status`, `tags`, `gallery`, dan seluruh field kurasi.

---

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
considerations,
tags,
status,
gallery
}

Response

{
success,
message,
data: Product
}

Product.status wajib bernilai `published` atau `draft`. Nilai default untuk produk baru dan row legacy adalah `published`. Pada PUT, jika `status` tidak dikirim, backend mempertahankan status tersimpan sebelumnya.

Product.tags menerima array string, dinormalisasi dengan trim, penghapusan item kosong, dan deduplikasi case-insensitive dengan mempertahankan ejaan item pertama. Maksimal 12 tag per produk dan maksimal 40 karakter per tag. Nilai default row legacy adalah `[]`. Tags hanya dipersistenkan pada PR-2; belum digunakan untuk search, filter, SEO, atau visibility publik.

Product.gallery menerima array URL absolut `http://` atau `https://`. URL di-trim, urutan dipertahankan, dan maksimum 8 URL per produk. `image` tetap menjadi gambar utama; gallery tidak pernah menggantikannya otomatis. Nilai default row legacy dan POST tanpa gallery adalah `[]`. PR-3 hanya menyimpan URL yang sudah tersedia; tidak mencakup upload, object storage, WebP, multipart request, atau endpoint media.

---

PUT
/api/products/:id
--------------------------------------------------

Deskripsi

Memperbarui data produk berdasarkan id.

Parameter

:id

Body

Sama seperti POST. Field `status` mengikuti enum `published` atau `draft`; backend mempertahankan status lama bila field tidak dikirim. Field `tags` mengikuti aturan normalisasi dan batas yang sama; bila tidak dikirim, backend mempertahankan tags tersimpan sebelumnya. Field `gallery` mengikuti aturan URL dan batas yang sama; bila tidak dikirim, backend mempertahankan gallery tersimpan sebelumnya.

Response

{
success,
message,
data: Product
}

---

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

---

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

---

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

---

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

---

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
AUTH API
==================================================

POST /api/auth/login

Body: { "email": "...", "password": "..." }

Success 200:
{
  "success": true,
  "message": "Login berhasil",
  "data": { "token": "<jwt>" }
}

Error 401: email/password salah
Error 400: email/password kosong
Error 500: JWT_SECRET tidak di-set

---

WRITE AUTH (products & categories POST/PUT/DELETE)

Utama:
Authorization: Bearer <token>

Legacy (masih didukung):
x-api-key: <ADMIN_API_KEY>

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
DEFERRED ENDPOINT / PROPOSAL
==================================================

`GET /api/products/:slug` sudah aktif sebagai endpoint detail publik canonical dan hanya mengembalikan produk Published.

Tidak ada endpoint publik baru yang disetujui pada checkpoint ini. `featured`, `search`, `category/:category`, dan `room/:room` bukan backlog otomatis; proposal baru hanya dibuka oleh ADR/contract terpisah dengan bukti kebutuhan pengguna dan backward compatibility.

---

Authentication

`POST /api/auth/login` sudah aktif untuk admin. Logout ditangani client dengan menghapus token lokal; endpoint `POST /api/auth/logout` belum dibutuhkan dan tidak boleh ditambahkan tanpa kebutuhan nyata.

---

Upload

`POST /api/upload` ditunda. Katalog mempertahankan URL gambar publik existing sesuai Zero-Cost Media Runway; tidak ada multipart, object storage, WebP pipeline, atau billing media pada kontrak ini.

---

Settings

GET /api/settings

PUT /api/settings

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

Admin Product

██████████

100%

Admin Category

██████████

100%

==================================================
CURRENT STATUS
==================================================

Checkpoint `main@f0f35d2`

Public catalog, admin catalog terautentikasi, detail publik canonical per-slug, Product CRUD admin, Category CRUD admin, JWT admin, dan CORS/rate limit aktif sesuai kontrak. Contract regression harness KEM-38 mengunci boundary Published/Draft, validator kurasi, dan route canonical pada CI.

==================================================
NEXT DECISION GATE
==================================================

Tidak ada sprint endpoint baru yang otomatis dibuka. Kebutuhan konten nyata, ADR Artikel, atau evidence scale harus terlebih dahulu mendefinisikan kontrak, consumer, data lifecycle, error state, dan batas backward compatibility.

==================================================
END OF DOCUMENT
==================================================
