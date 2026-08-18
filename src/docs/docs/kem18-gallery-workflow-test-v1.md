# KEM-18 — Bukti Uji Workflow Gallery URL v1

**Status:** Existing capability verified · no-build  
**Issue:** KEM-18 — *Tambahkan gallery sederhana bila Product Detail membutuhkannya*  
**Branch dokumentasi:** `feat/kem-18-gallery-need-assessment-v1`  
**Tanggal uji:** 18 Agustus 2026

## 1. Tujuan uji

Membuktikan melalui workflow admin dan Product Detail nyata apakah kontrak existing `image` + `gallery` URL sudah cukup untuk kebutuhan beberapa gambar per produk. Uji ini bukan audit visual baru dan bukan izin untuk menambah upload, storage, atau schema media.

## 2. Skenario dan hasil

| Tahap | Bukti yang dilakukan | Hasil |
| --- | --- | --- |
| Objek aman | Membuat produk khusus uji dengan status **Draft** melalui admin. | Berhasil; produk tidak masuk katalog normal selama proses pengisian. |
| Gambar utama | Mengisi satu URL gambar utama valid. | Berhasil; preview admin tersedia dan data diterima. |
| Gallery multi-item | Menambahkan dua URL gambar pendukung melalui kontrol gallery existing. | Berhasil; kedua item masuk, tanpa upload atau pemrosesan file. |
| Persistensi | Menyimpan produk Draft lalu memuat route detail berdasarkan slug uji. | Berhasil; Product Detail menerima gambar utama dan gambar pendukung yang sama. |
| Interaksi publik | Memilih thumbnail gallery kedua pada Product Detail. | Berhasil; gambar aktif berganti sesuai thumbnail. |
| Pembersihan | Menghapus produk Draft uji setelah verifikasi. | Berhasil; daftar admin kembali ke empat produk baseline dan slug uji kemudian memunculkan `Produk tidak ditemukan`. |

## 3. Keputusan KEM-18

Decision gate pada kontrak assessment terpenuhi: workflow admin URL-based dapat menyimpan beberapa gambar, dan Product Detail dapat merender serta menavigasi gambar tersebut. Karena itu, **tidak ada kebutuhan terbukti** untuk tabel `product_images`, migrasi, endpoint media, upload multipart, Railway volume, object storage, konversi WebP, atau provider baru.

> **Keputusan:** tutup KEM-18 sebagai **existing capability verified**. `ProductForm` dan `ProductDetail` tetap menjadi owner gallery existing; tidak ada perubahan kode runtime dari slice ini.

## 4. Temuan di luar scope dan follow-up

Produk Draft uji dapat dirender melalui Product Detail publik ketika slug diketahui langsung. Karena ini menyangkut visibilitas data, bukan kebutuhan gallery, temuan dipisahkan ke **KEM-30 — Batasi Product Detail publik hanya untuk produk Published** dengan prioritas High.

KEM-30 harus memastikan public `GET /api/products/:slug` tidak memaparkan data Draft, sementara jalur admin yang terautentikasi tetap dapat membaca dan mengedit Draft. KEM-18 tidak mengubah perilaku ini secara diam-diam.

## 5. Guardrail terverifikasi

- Auth JWT, route admin, schema SQLite, kontrak persistence gallery, dan API write tidak diubah.
- Tidak ada data uji yang dipertahankan di produksi setelah verifikasi.
- Tidak ada file gambar disimpan ke repository, Vercel, Railway, database, atau provider baru.
- Tidak ada perubahan media storage, billing, secret, scheduler, atau migrasi.
