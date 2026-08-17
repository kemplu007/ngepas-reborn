# Ngepas Reborn — KEM-18 Gallery Need Assessment Contract v1

**Status:** Assessment-only · belum ada perubahan runtime atau schema  
**Issue:** KEM-18 — *Tambahkan gallery sederhana bila Product Detail membutuhkannya*  
**Branch:** `feat/kem-18-gallery-need-assessment-v1`  
**Baseline:** `origin/main@4ae8e55`  
**Tanggal:** 17 Agustus 2026

## 1. Tujuan dan prinsip keputusan

KEM-18 bukan mandat untuk membuat galeri baru. Slice ini hanya boleh menambah sesuatu apabila alur Product Detail yang nyata tidak dapat dipenuhi oleh kontrak gallery yang sudah hidup. Keputusan harus berdasarkan kebutuhan operasional admin dan perilaku Product Detail, bukan keinginan memperbanyak UI atau asumsi desain.

> **Keputusan awal:** repository sudah memiliki gallery URL yang dipersistenkan pada produk dan dirender pada Product Detail. Karena itu tidak ada justifikasi untuk tabel `product_images`, route media, upload, object storage, WebP, ataupun migration baru pada assessment ini.

## 2. Bukti baseline yang diverifikasi

| Area | Bukti saat ini | Implikasi KEM-18 |
| --- | --- | --- |
| Kontrak produk | `gallery` adalah array URL HTTP/HTTPS, maksimal delapan item; urutan dipertahankan dan `image` tetap gambar utama. | Kebutuhan beberapa gambar untuk satu produk telah memiliki bentuk data yang kecil dan kompatibel. |
| Admin | `ProductForm.jsx` menyediakan input URL gallery, preview, penghapusan, batas delapan, serta feedback URL. | Admin dapat mengelola beberapa gambar tanpa file upload atau perubahan payload. |
| Public | `ProductDetail.jsx` menyusun `image` utama dan `gallery` non-duplikat, menyediakan gambar aktif, counter, serta thumbnail bila lebih dari satu. | User public sudah dapat membaca lebih dari satu gambar dari data produk yang tersimpan. |
| Persistensi | Produk menyimpan `gallery` sebagai JSON array; API menormalkan nilai legacy menjadi `[]`. | Data lama tetap aman dan tidak membutuhkan tabel baru. |

Sumber bukti repository: `src/docs/docs/api-contract.md`, `src/pages/admin/ProductForm.jsx`, `src/pages/public/ProductDetail.jsx`, dan `src/docs/docs/admin-operational-finalization-audit-v1.md`.

## 3. Decision gate yang harus dipenuhi sebelum kode runtime baru

| Pertanyaan | Bukti yang diterima | Jika jawabannya tidak | Jika jawabannya ya |
| --- | --- | --- | --- |
| Apakah Product Detail gagal menampilkan gambar tambahan yang telah dimasukkan melalui `gallery`? | Produk nyata dengan `image` + 1–8 URL valid, reproduksi langkah, dan bukti perilaku. | Perbaiki bug yang terisolasi saja; jangan membangun gallery baru. | Definisikan kontrak bug-fix terpisah pada existing `gallery`. |
| Apakah admin tidak dapat menyelesaikan tugas katalog dengan URL gallery existing? | Contoh workflow admin yang gagal, frekuensi, dampak, dan alasan URL manual tidak memadai. | Pertahankan URL workflow yang zero-cost. | Buat decision brief terpisah untuk upload/media; jangan memasukkannya ke KEM-18. |
| Apakah metadata, reorder kompleks, atau lifecycle file memang diperlukan? | Kebutuhan user nyata yang tidak dapat dipenuhi array URL terurut maksimal 8 item. | Jangan buat tabel `product_images`. | Rancang proposal schema/API terpisah, aditif, dan melalui approval founder. |

## 4. Kontrak slice terkecil

| Concern | Keputusan |
| --- | --- |
| Component boundary | Tidak ada komponen baru. `ProductForm` dan `ProductDetail` existing tetap menjadi owner gallery URL. |
| Data contract | `image` tetap gambar utama; `gallery` tetap array URL HTTP/HTTPS maksimal 8 item. |
| Preserved behavior | Payload JSON, admin JWT, service/context, response helper, visibility existing, data legacy, dan urutan gallery. |
| Deliberately excluded | `product_images`, migration, multipart upload, bucket/object storage, WebP, media endpoint, provider baru, scheduler, conversion, dan mass migration URL. |
| Validasi bila kode nanti diperlukan | Reproduksi workflow public/admin, validasi normalisasi URL, `git diff --check`, `node --check` untuk backend yang tersentuh, serta `npx vite build`. |

## 5. Rekomendasi status

KEM-18 **tidak boleh masuk implementasi runtime** sampai decision gate memiliki bukti kebutuhan baru. Jika owner product mengonfirmasi workflow gallery URL yang ada sudah cukup, slice ini ditutup sebagai **no-build / existing capability verified** dengan dokumentasi ini sebagai jejak. Jika ada kebutuhan yang terbukti, issue lanjutan harus menjelaskan perubahan kontrak secara eksplisit sebelum coding.

## 6. Guardrail

- Tidak mengubah auth JWT, schema SQLite, data produksi, persistence, atau endpoint media.
- Tidak menyimpan image di repository, Vercel static, Railway volume, atau database sebagai base64.
- Tidak menambahkan provider, biaya, secret, atau background job.
- Tidak menggantikan atau menghapus URL gallery lama.
- Tidak menambah kode aplikasi pada branch assessment ini.
