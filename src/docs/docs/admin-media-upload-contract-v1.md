NGEPAS REBORN
Document : Admin Media Upload Contract v1
Purpose  : Mengunci kontrak upload media, transformasi WebP, kompatibilitas produk, dan guardrail operasional sebelum A4.
-->

# Admin Media Upload Contract v1

> **Status:** Proposal untuk approval founder. Dokumen ini tidak menambah endpoint, dependensi, storage provider, environment variable, schema, migration, atau perubahan runtime.

## 1. Tujuan keputusan

Tujuan A3 adalah memberi pengelola konten alur sederhana: **pilih file gambar, sistem memvalidasi dan mengoptimasi, lalu admin memilih hasilnya untuk gambar utama atau galeri produk**. Admin tidak perlu memahami URL object storage, format WebP, ukuran byte, atau lifecycle file. Namun, sistem tetap harus menjaga kontrak produk yang sudah live, khususnya `image` sebagai gambar utama dan `gallery` sebagai daftar URL tambahan.

Saat ini aplikasi hanya mengelola URL gambar. Product write tetap berbentuk JSON, `image` wajib berupa string URL, `gallery` adalah array URL HTTP/HTTPS maksimal delapan item, dan tidak ada route multipart atau media storage. [1] [2] [3] A3 menetapkan bentuk target yang **baru boleh diimplementasikan** pada A4 setelah semua decision gate di bagian 14 disetujui.

| Batas A3 | Keputusan |
| --- | --- |
| Yang dihasilkan | Kontrak media, risiko, urutan migration, acceptance criteria, dan runbook recovery. |
| Yang tidak dilakukan | Instalasi Sharp/middleware upload, pembuatan bucket, perubahan package, endpoint, schema, migration, credential, atau write production. |
| Auth | JWT admin yang ada tetap satu-satunya mekanisme write utama; A3 tidak mengubahnya. |
| Produk live | `image`, `gallery`, payload JSON, URL pihak ketiga, dan renderer public tetap dipertahankan. |

## 2. Fakta baseline repository

Repository saat ini mempunyai satu kolom `image TEXT NOT NULL` dan menyimpan `gallery` sebagai JSON array pada kolom produk. Tidak terdapat tabel media, metadata MIME, checksum, dimensi, key provider, atau lifecycle asset. [4] [5] Pada sisi public, ProductDetail selalu menempatkan `image` terlebih dahulu, lalu menambahkan item `gallery` yang tidak duplikat; karena itu gambar utama tidak boleh diganti secara implisit oleh proses upload. [6]

| Area | Fakta saat ini | Implikasi kontrak A3 |
| --- | --- | --- |
| Product API | POST/PUT `/api/products` hanya menerima JSON dan memvalidasi `image` serta `gallery`. [1] | Upload harus menjadi alur baru yang terpisah; product write tidak langsung berubah ke multipart. |
| Product persistence | `image` disimpan sebagai satu string, `gallery` diserialisasi sebagai JSON string. [4] | Asset baru harus tetap menghasilkan URL final yang dapat masuk ke field existing. |
| Public rendering | `image` adalah kandidat pertama dalam galeri public. [6] | Fallback URL lama dan urutan galeri wajib dipertahankan. |
| Backend dependencies | Backend saat ini tidak membawa middleware multipart atau image processor. [7] | A4 harus memperkenalkan dependensi secara eksplisit dan tervalidasi, bukan menyisipkannya ke patch UI. |
| Deploy | SQLite berada pada Railway Volume; Core belum mendefinisikan storage media. [8] | Media permanen tidak boleh diasumsikan aman pada filesystem aplikasi atau volume database. |

## 3. Keputusan arsitektur yang diusulkan

Kontrak ini memilih **object storage yang dikelola aplikasi dan kompatibel S3** sebagai kelas storage A4. Nama provider belum dipilih; pemilihan provider hanya dapat dilakukan setelah founder menilai biaya, region, domain asset, dan kemampuan recovery. Media permanen tidak disimpan pada filesystem source code, direktori Vercel, atau Railway Volume SQLite.

Arsitektur awal memakai **upload melalui backend**. Browser mengirim satu file ke backend terautentikasi; backend menjalankan validasi berlapis dan transformasi WebP; hanya output valid yang ditulis ke object storage. Model ini menjaga validasi dan transformasi tetap berada pada sistem, bukan pada perangkat admin. Presigned URL bukan bagian A4 awal. Ia dapat dievaluasi kemudian bila ukuran atau volume upload membuat proxy backend tidak memadai; bila dipakai, URL harus diperlakukan sebagai bearer token terbatas waktu. [9]

| Keputusan | Proposal A4 | Alasan |
| --- | --- | --- |
| Penyimpanan permanen | Satu bucket object storage khusus Ngepas, dengan prefix aplikasi dan kredensial hanya di backend. | Mengisolasi media dari aplikasi dan volume database. |
| Jalur upload awal | Browser → backend Express → Sharp → object storage. | Backend dapat memverifikasi file sebelum output tersedia untuk public. |
| Jalur baca public | URL output WebP berversi dari domain asset/provider yang disetujui. | Product renderer saat ini hanya membutuhkan URL. |
| Bentuk output | WebP tunggal untuk upload baru; URL output menjadi kandidat `image` atau `gallery`. | Mengurangi beban keputusan format bagi admin sambil menjaga kontrak URL live. |
| File sumber | Dipakai sementara untuk validasi/transformasi, lalu dihapus setelah output dan metadata sukses. | Menghindari penyimpanan ganda yang tidak diperlukan. |
| URL legacy | Tetap valid; tidak diunduh ulang atau ditransformasi secara otomatis. | Mencegah katalog existing putus dan menghindari fetch remote yang tidak perlu. |

## 4. Kontrak data media yang diusulkan

A4 menambah metadata media **tanpa mengganti kolom `products.image` atau `products.gallery`**. Produk tetap menyimpan URL siap-render; metadata media memberi sistem kemampuan audit, hapus aman, dan troubleshooting untuk asset hasil upload Ngepas. URL eksternal lama tetap tidak memerlukan record media.

### 4.1 `media_assets`

| Field | Tipe usulan | Aturan |
| --- | --- | --- |
| `id` | UUID string | Dibuat backend; tidak memakai nama file admin. |
| `storage_key` | string unik | Dibuat backend; tidak dapat berasal dari request klien. |
| `public_url` | URL unik | URL WebP final dan satu-satunya URL yang boleh dipasang ke produk. |
| `source_filename` | string terbatas | Metadata audit saja; tidak dipakai sebagai path atau storage key. |
| `source_mime` | string | MIME terdeteksi server, bukan header klien. |
| `source_bytes` | integer | Ukuran file input setelah limit request diberlakukan. |
| `source_sha256` | string | Jejak integritas input untuk audit dan investigasi. |
| `output_format` | enum | Pada A4 selalu `webp`. |
| `output_bytes` | integer | Ukuran output WebP. |
| `width`, `height` | integer | Dimensi output terdeteksi setelah decode. |
| `state` | enum | `staged`, `ready`, `attached`, `detach_pending`, `deleted`, atau `failed`. |
| `created_at`, `updated_at`, `deleted_at` | ISO timestamp | Mendukung audit dan retensi. |
| `failure_reason` | string terbatas | Kode internal yang aman untuk diagnosis; bukan stack trace atau secret. |

### 4.2 `product_media_links`

Tabel relasi ini diusulkan untuk asset milik Ngepas saja. Ia tidak mengubah payload produk existing dan tidak mencoba memaksa URL pihak ketiga masuk ke sistem media.

| Field | Tipe usulan | Aturan |
| --- | --- | --- |
| `product_id` | integer | Foreign key logis ke produk yang sudah tersimpan. |
| `asset_id` | UUID string | Mengacu ke `media_assets.id`. |
| `role` | enum | Hanya `primary` atau `gallery`. |
| `position` | integer nullable | `0–7` untuk `gallery`; `NULL` untuk `primary`. |
| `created_at` | ISO timestamp | Audit attach. |

Satu product write yang memasukkan URL asset Ngepas harus merekonsiliasi link ini dalam **transaksi SQLite yang sama** dengan perubahan `products.image` dan `products.gallery`. Jika URL berprefix asset Ngepas tidak memiliki record `ready` yang sesuai, write produk ditolak; URL eksternal HTTP/HTTPS tetap mengikuti validator produk yang berlaku. Dengan demikian, product URL tetap kompatibel, tetapi sistem tidak dapat menautkan asset internal palsu atau belum siap.

## 5. Kontrak file dan transformasi

Kontrak menggunakan allowlist sempit. OWASP merekomendasikan validasi extension, tipe file, signature, ukuran, nama file buatan aplikasi, otorisasi upload, dan penyimpanan di luar webroot sebagai defense in depth; `Content-Type` dari klien tidak dapat dipercaya sebagai kontrol keamanan. [10]

| Concern | Proposal A4 | Ditolak |
| --- | --- | --- |
| Source format | JPEG, PNG, dan WebP statis. | SVG, GIF/animated image, AVIF, TIFF, PDF, ZIP, dan semua tipe lain. |
| Validasi tipe | Extension hanya hint UX; backend memeriksa MIME/signature dan memastikan file dapat didecode. | Hanya mengandalkan ekstensi atau `Content-Type` request. |
| Ukuran input | Maksimal **6 MiB** per file dan satu file per request. | Multi-file batch pada endpoint pertama. |
| Dimensi input | Maksimum 16 megapiksel dan sisi terpanjang 4.096 px; minimum 320 px pada sisi terpendek. | Decode gambar raksasa atau gambar terlalu kecil untuk kartu produk. |
| Output | WebP, kualitas awal 82, tanpa mempertahankan source file permanen. | Menulis source tanpa batas atau menerbitkan format yang tidak disetujui. |
| Nama/key | UUID backend pada prefix `products/YYYY/MM/`. | Nama berkas dari admin, overwrite key lama, atau path yang dikirim klien. |

Sharp adalah kandidat transformasi A4 karena mendukung input JPEG/PNG/WebP dan output WebP, memakai Node-API/libvips, serta berlisensi Apache-2.0. Repository resminya memiliki 32.576 bintang dan aktivitas pada 2026-08-17 ketika kontrak ini ditulis. [11] [12] Ini adalah **keputusan kandidat, bukan approval instalasi**. A4 wajib memasang versi yang dipin, memeriksa advisori keamanan pada saat implementasi, dan menambahkan test transformasi sebelum production.

## 6. State machine dan cleanup

State berikut membedakan file yang belum dipakai produk dari asset yang sudah tampil public. Tidak ada asset yang boleh dianggap attached hanya karena browser selesai upload.

| State | Makna | Transisi yang diizinkan |
| --- | --- | --- |
| `staged` | File valid diterima dan sedang diproses; belum dapat dipilih. | `ready` atau `failed`. |
| `ready` | Output WebP dan metadata berhasil dibuat; belum direferensikan produk. | `attached`, `detach_pending`, atau `deleted`. |
| `attached` | URL dipakai `image` atau `gallery` produk dan link SQLite tersinkron. | `detach_pending`. |
| `detach_pending` | Tidak lagi direferensikan produk; menunggu kebijakan retensi. | `deleted` atau kembali `attached` bila dipakai lagi sebelum hapus. |
| `failed` | Validasi, transformasi, storage, atau metadata gagal; tidak dapat dipilih. | Terminal untuk request tersebut; retry menghasilkan asset baru. |
| `deleted` | Object storage telah dihapus atau dikarantina sesuai provider; metadata tetap minimal untuk audit. | Terminal. |

Asset `ready` yang tidak pernah dipakai menjadi kandidat cleanup setelah **24 jam**. Asset `detach_pending` baru dihapus setelah **7 hari** dan hanya setelah pemeriksaan ulang memastikan tidak ada URL asset tersebut pada `products.image`, `products.gallery`, atau `product_media_links`. Karena Ngepas belum memiliki worker/scheduler yang sudah disetujui, A4 tidak boleh mengklaim cleanup otomatis. Kontrak A4 harus memilih satu mekanisme eksplisit—scheduled job terautentikasi, worker, atau tindakan admin terkontrol—sebelum retention policy diaktifkan.

## 7. Kontrak API A4 yang diusulkan

Route berikut adalah **proposal**, bukan endpoint yang sudah ada. Semua response tetap memakai Response Helper Ngepas: success `{ success, message, data }` dan error `{ success, message }`. A3 tidak menambah field error response baru.

| Endpoint proposal | Auth | Request | Success | Batas |
| --- | --- | --- | --- | --- |
| `POST /api/media/images` | Bearer JWT admin yang ada | `multipart/form-data`, tepat satu field `file`. | `201` dengan `MediaAsset` state `ready`. | Tidak membuat atau mengubah produk. |
| `DELETE /api/media/assets/:id` | Bearer JWT admin yang ada | Tidak ada body. | `200` setelah asset tak-referensi menjadi `deleted`. | `409` bila asset masih dipakai produk. |
| Product POST/PUT existing | Bearer JWT admin yang ada | JSON existing berisi URL output bila dipilih admin. | Response produk existing tetap. | Tidak menjadi multipart dan tidak menerima binary. |

Contoh response upload yang diusulkan:

```json
{
  "success": true,
  "message": "Gambar siap digunakan.",
  "data": {
    "id": "7c1a0e7f-5ad8-49a5-a4fb-29a253a2f718",
    "publicUrl": "https://assets.example/products/2026/08/7c1a0e7f.webp",
    "format": "webp",
    "width": 1600,
    "height": 1600,
    "bytes": 184220,
    "state": "ready"
  }
}
```

URL contoh di atas bersifat ilustrasi dan bukan domain produksi. Response tidak mengungkap bucket name, storage key, credential, stack trace, atau detail provider.

## 8. Error taxonomy dan pengalaman admin

Admin memerlukan instruksi jelas tanpa istilah infrastruktur. Respons error tetap konsisten dengan format Core, sedangkan `event` internal dicatat di log terstruktur.

| HTTP | Pesan untuk admin | Event log internal | Tindakan UI |
| --- | --- | --- | --- |
| `400` | “Pilih satu file gambar terlebih dahulu.” | `media.file_missing` | Tetap pada area upload. |
| `413` | “Ukuran gambar melebihi batas 6 MiB.” | `media.size_rejected` | Jangan memulai product save. |
| `415` | “Format gambar belum didukung. Gunakan JPG, PNG, atau WebP.” | `media.type_rejected` | Jangan menambah item galeri. |
| `422` | “Gambar tidak dapat diproses atau dimensinya tidak sesuai.” | `media.decode_rejected` | Minta admin memilih file lain. |
| `401`/`403` | Pesan auth existing Ngepas. | `media.auth_rejected` | Ikuti flow login yang sudah ada; tidak mengubah JWT. |
| `409` | “Gambar masih dipakai produk dan belum dapat dihapus.” | `media.delete_conflict` | Tampilkan link/keterangan penggunaan bila tersedia. |
| `429` | “Terlalu banyak percobaan. Coba lagi beberapa menit.” | `media.rate_limited` | Pertahankan pilihan form, jangan retry otomatis. |
| `502`/`503` | “Penyimpanan gambar sedang bermasalah. Coba lagi nanti.” | `media.storage_failed` | Jangan mengubah URL produk existing. |

## 9. Keamanan dan integritas

> “There is no silver bullet in validating user content. Implementing a defense in depth approach is key.” — OWASP File Upload Cheat Sheet [10]

| Risiko | Kontrol kontrak | Bukti pada A4 |
| --- | --- | --- |
| File berbahaya atau type spoofing | Allowlist, batas request, signature/MIME server, dan decode aman sebelum transform. | Test mismatch header, ekstensi ganda, file korup, dan source tak diizinkan. |
| Path traversal atau overwrite | Key UUID dibuat backend; nama source tidak dipakai sebagai path. | Test nama `../` dan key unik. |
| Kebocoran credential | Hanya backend memegang credential provider; browser tidak menerima secret atau signed credential A4. | Review environment dan network request. |
| URL internal palsu | Product write memverifikasi asset internal `ready` sebelum link dibuat. | Test URL prefix asset tanpa record. |
| Exhaustion storage/memori | Satu file/request, 6 MiB, batas piksel/dimensi, dan rate limit yang eksplisit. | Test 413 dan batas decode. |
| Penghapusan asset aktif | Link SQLite dan reference scan sebelum delete fisik. | Test `409` pada asset `attached`. |
| Cache stale setelah ganti gambar | Key immutable berbasis UUID; tidak overwrite object yang sama. | Test upload dua file bernama sama menghasilkan URL berbeda. |

Apabila masa depan membutuhkan presigned upload, kontrak tambahan wajib menetapkan method, object key, expiry, checksum bila provider mendukung, izin minimal, dan perlindungan URL sebagai bearer token. [9] Presigned URL tidak boleh ditambahkan sebagai optimasi tersembunyi pada A4.

## 10. Alur frontend dan admin A4

Alur baru harus tetap memenuhi arsitektur Core. `ProductForm` tidak melakukan `fetch()` langsung dan tidak membentuk credential provider. Media mendapat service dan boundary sendiri.

```text
ProductForm
  → MediaContext
  → mediaService
  → apiRequest
  → POST /api/media/images
  → validator + transform + storage + media model
  → URL WebP siap
  → ProductForm menaruh URL tersebut ke state image/gallery existing
  → ProductContext → productService → JSON Product API existing
```

Pada mobile, upload harus menjadi pilihan tambahan yang jelas di langkah gambar/galeri; URL external existing tetap tersedia sebagai fallback operasional. Setelah upload sukses, sistem menambahkan URL output pada state lokal dan menampilkan preview. Tidak boleh ada product save otomatis, publish otomatis, atau penghapusan URL lama tanpa aksi eksplisit admin.

## 11. Urutan migration dan deployment A4

Migration A4 harus aditif dan dapat dijalankan ulang. Ia tidak memigrasikan URL existing ke object storage, tidak menulis ulang `products.image` atau `products.gallery`, dan tidak menyentuh auth middleware.

| Urutan | Aktivitas wajib | Exit criterion |
| --- | --- | --- |
| 0 | Founder memilih provider, asset domain, recovery owner, dan biaya yang dapat diterima. | Credential belum dibuat di repo; pilihan terdokumentasi. |
| 1 | Siapkan bucket/prefix terpisah, kebijakan write minimal backend, read policy asset, dan environment secret di Railway. | Test object non-production dan secret tidak masuk Git. |
| 2 | Buat migration aditif untuk `media_assets` dan `product_media_links`; tambahkan index yang diperlukan. | Idempotent, tidak mengubah tabel produk existing. |
| 3 | Implementasikan validator, middleware multipart berlimit, media model/service/controller/route, dan transform Sharp. | Unit/integration test untuk success dan seluruh failure utama. |
| 4 | Integrasikan `MediaContext`/`mediaService` lalu ProductForm tanpa mengubah JSON Product API. | Upload hasil siap menjadi URL pada state form; URL manual tetap berfungsi. |
| 5 | Jalankan runbook pre-deploy, backup/recovery proof, dan smoke test non-destruktif. | Semua sanity check lulus, rollback diverifikasi. |
| 6 | Deploy A4, monitor event media, lalu aktifkan cleanup hanya jika mekanismenya sudah dipilih. | Tidak ada error transform/storage baru yang tidak tertriage. |

## 12. Runbook recovery dan rollback

Core melarang migration production tanpa recovery point yang aman. Karena backup terkelola Railway pada akun saat ini pernah dibatasi, A4 **diblokir** dari migration production sampai founder memiliki artefak recovery database yang terverifikasi dan cara restore yang dipahami. [8]

| Skenario | Respons aman |
| --- | --- |
| Migration belum diterapkan | Hentikan deployment A4; tidak ada perubahan production. |
| Migration gagal sebelum aplikasi mulai | Rollback release code, restore database dari recovery artifact terverifikasi, lalu cek row count dan schema. |
| Upload transform gagal | Kembalikan error tanpa mengubah URL produk; hapus output/object parsial secara best-effort dan catat event. |
| Storage write sukses tetapi metadata gagal | Hapus object baru dengan key yang tercatat; jika gagal, tandai orphan untuk cleanup manual. |
| Produk save gagal setelah upload sukses | Asset tetap `ready` dan tidak dipublikasikan ke produk; berlaku retensi staged/ready, tidak ada auto-delete yang diklaim sebelum scheduler dipilih. |
| Asset delete gagal | Pertahankan metadata `detach_pending`, jangan menghapus record; retry hanya lewat mekanisme yang disetujui. |
| Rollback aplikasi setelah A4 | Product URL existing tetap dapat dirender; tabel media tambahan dibiarkan aditif dan tidak merusak route lama. |

Runbook pre-deploy minimal harus mencatat commit yang dideploy, waktu, operator, recovery artifact location, checksum/ukuran artifact bila tersedia, jumlah produk sebelum/sesudah, jumlah record media, jumlah object prefix, hasil health check, dan keputusan rollback bila diperlukan. Tidak ada production write verification yang boleh dijalankan hanya untuk “mencoba”.

## 13. Acceptance criteria A4

| Area | Kriteria sebelum A4 dapat dipromosikan |
| --- | --- |
| Kontrak | Founder menyetujui provider class, batas file, output WebP, retensi, lifecycle, API proposal, dan fallback legacy. |
| Auth | Semua write media memakai JWT admin yang ada; tidak ada bypass atau pembaruan auth flow. |
| Validation | Source JPG/PNG/WebP valid diproses; source unsupported, spoofed, oversize, korup, dan over-dimension ditolak. |
| Output | Asset sukses menghasilkan WebP, metadata lengkap, key immutable, dan URL public yang aman. |
| Compatibility | Product JSON tetap valid; `image` tetap primary; gallery URL external dan data legacy tetap ter-render. |
| Persistence | Migration aditif, idempotent, diverifikasi dengan sanity check, dan link product-media konsisten. |
| Delete | Asset yang masih direferensikan tidak dapat dihapus; object/media orphan tidak dihapus tanpa trace. |
| UX | Mobile dan desktop dapat upload satu file, melihat progress/hasil/error, memilih hasil untuk primary/gallery, dan tetap dapat memakai URL manual. |
| Operations | Recovery artifact dan restore procedure diverifikasi sebelum migration production; event/error dapat ditriage. |
| Validation | `node --check` file backend baru, `git diff --check`, `npx vite build`, test endpoint, serta review PR/Vercel lulus. |

## 14. Decision gate founder sebelum A4

Kontrak ini belum mengizinkan implementasi A4 sampai seluruh keputusan berikut mendapat jawaban eksplisit.

| Keputusan | Proposal | Jawaban founder |
| --- | --- | --- |
| Provider object storage | Provider S3-compatible dengan bucket khusus Ngepas dan domain asset terpisah. | Pending |
| Model akses asset | Output public-read melalui domain asset; write hanya dari backend. | Pending |
| Batas file awal | JPG/PNG/WebP, satu file/request, 6 MiB, 16 MP, sisi terpanjang 4.096 px. | Pending |
| Output | WebP kualitas 82, original tidak disimpan permanen. | Pending |
| Lifecycle | `ready` 24 jam, `detach_pending` 7 hari, cleanup hanya setelah mekanisme eksplisit tersedia. | Pending |
| Metadata | `media_assets` dan `product_media_links` aditif; product URL fields tetap source rendering. | Pending |
| Recovery point | Artefak backup database dan prosedur restore terverifikasi sebelum migration Railway. | Pending |
| Rate limiting | Implementasi provider-safe dan limit awal terdokumentasi sebelum endpoint aktif. | Pending |
| Sharp | Kandidat Apache-2.0 dengan evaluasi versi/advisori ulang pada A4. | Pending |

## 15. Keputusan yang sengaja ditunda

Kontrak A3 tidak memutuskan campaign/banner, artikel, crop editor, AI tagging, content moderation, multi-admin role, CDN provider khusus, direct presigned upload, multi-size responsive image, background queue, atau migrasi URL legacy. Setiap keputusan tersebut menambah boundary baru dan harus hadir sebagai slice serta kontrak tersendiri.

## 16. Referensi

[1] [API Contract v1.0](./api-contract.md)  
[2] [Product controller](../../../server/controllers/productController.js)  
[3] [Product validator](../../../server/helpers/validators/productValidator.js)  
[4] [Product model](../../../server/models/productModel.js)  
[5] [SQLite initializer](../../../server/database/init.js)  
[6] [ProductDetail public](../../pages/public/ProductDetail.jsx)  
[7] [Backend package manifest](../../../server/package.json)  
[8] [Ngepas Core](./ngepas-core.md)  
[9] [Amazon S3: Download and upload objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)  
[10] [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)  
[11] [Sharp documentation](https://sharp.pixelplumbing.com/)  
[12] [lovell/sharp repository](https://github.com/lovell/sharp)
