# O1 — Real Content Workflow Test v1

**Tanggal operasi:** 19 Agustus 2026  
**Jenis:** evidence operasi konten produksi + dokumentasi docs-only  
**Scope:** satu produk nyata dibuat sebagai Draft melalui admin existing.  
**Non-scope:** tidak ada perubahan source runtime, API, auth, SQLite schema, migration, upload/storage, WebP, billing, dependency, atau deployment.

---

## 1. Tujuan

Menguji jalur operator yang benar-benar tersedia untuk satu listing affiliate nyata tanpa mengisi katalog dengan data sintetis, tanpa mengubah empat produk seed, dan tanpa memublikasikan entri yang belum melalui keputusan kurasi.

> O1 menguji workflow admin yang ada. O1 **bukan** pembangunan media pipeline, CMS, fitur Artikel, ataupun perubahan kontrak produk.

---

## 2. Input dan keputusan operator

| Concern | Evidence / keputusan |
| --- | --- |
| Sumber affiliate | Link pendek Shopee yang diberikan founder: `https://s.shopee.co.id/5ArnyVYg11` |
| Resolusi listing | Mengarah ke listing `IKEA MALM Lemari Laci 6 Susun Putih Minimalis 80×123 cm` dari seller `opaanlp` |
| Kecocokan katalog seed | Tidak cocok dengan empat produk seed; link tidak ditempelkan pada seed product |
| Persetujuan founder | Founder memilih opsi **A**: membuat satu produk baru sebagai **Draft** |
| Kategori operasional | Room existing `Bedroom`; kategori existing `lemari` |
| Harga referensi | Rp2.499.000 berdasarkan evidence publik listing yang dapat dibaca; tidak ada harga pembanding, rating, stok, atau penjualan sintetis yang dibuat |
| Gambar utama | Satu URL gambar publik CDN Shopee diverifikasi dapat dimuat browser sebelum disimpan |

---

## 3. Hasil workflow

| Tahap | Hasil | Evidence |
| --- | --- | --- |
| Akses admin | Lulus setelah reload `/admin/products` | Token tersimpan diterima endpoint admin dengan HTTP 200; state `Unauthorized` awal bersifat stale page/session |
| Buat produk | Lulus sebagai Draft | Produk baru dibuat melalui ProductForm existing; ID admin `15` |
| Katalog existing | Tetap aman | Empat produk seed tidak diubah |
| Readiness URL | Lulus | Form menunjukkan readiness 4/4 setelah URL affiliate dan gambar utama valid tersedia |
| Gambar | Lulus | Browser memuat gambar CDN Shopee (`naturalWidth` dan `naturalHeight` valid) |
| Visibilitas publik | Lulus | `GET /api/products/ikea-malm-lemari-laci-6-susun-putih-minimalis-80x123-cm` → HTTP 404 `Produk tidak ditemukan` |
| Publikasi | Tidak dilakukan | Produk tetap Draft sesuai approval founder; tidak muncul dalam katalog publik |

Produk uji yang tersimpan:

- **Nama:** IKEA MALM Lemari Laci 6 Susun Putih Minimalis 80×123 cm
- **Status:** Draft
- **Room / kategori:** Bedroom / lemari
- **Harga referensi:** Rp2.499.000
- **Affiliate dan gambar:** URL nyata dari sumber listing Shopee yang telah diverifikasi

---

## 4. Friction yang dapat direproduksi

| Friction | Evidence | Keputusan |
| --- | --- | --- |
| Halaman Products awal menampilkan `Unauthorized` | Token ternyata valid dan endpoint admin menerima HTTP 200 setelah page reload | Tidak ada perubahan auth. Catat sebagai stale session/page state; buka slice perbaikan hanya bila dapat direproduksi lintas sesi/operator. |
| Form berpindah dari galeri kembali ke daftar produk | Draft telah tercipta sebelum field kurasi detail dapat diisi pada percobaan yang sama | Jangan menyamarkan perilaku ini. Re-open Draft untuk inspeksi dan kumpulkan bukti operator kedua sebelum mengubah UI/form flow. |
| Shopee menolak pembacaan detail lanjutan | Halaman memunculkan traffic verification | Tidak ada bypass. Harga hanya dicatat dari evidence publik yang dapat dibaca; tidak ada klaim stok, diskon, rating, atau jumlah penjualan. |

---

## 5. Keputusan O1

1. **Workflow Draft dengan affiliate URL dan image URL existing terbukti berjalan** tanpa media pipeline baru.
2. **Kontrak Draft visibility berjalan:** entri admin dapat tersimpan tetapi endpoint publik mengembalikan 404.
3. Produk IKEA MALM **tetap Draft**. Peralihan ke Published tidak termasuk O1 karena founder mengizinkan pembuatan Draft saja dan field keputusan kurasi belum divalidasi melalui workflow lengkap.
4. Target katalog `12 Published` tetap belum tercapai; jangan menganggap satu Draft sebagai progres publik.
5. Perbaikan admin baru hanya boleh dibuka jika friction di atas terulang atau operator dapat membuktikan hambatan yang spesifik.

---

## 6. Next safe action

Sebelum mempertimbangkan publish untuk Draft IKEA MALM atau produk nyata lain, lakukan keputusan terpisah untuk mengisi dan memeriksa field kurasi yang diwajibkan oleh status Published. Gunakan data sumber yang nyata; tidak boleh membuat rating, metrik stok/penjualan, klaim material, gambar, maupun URL affiliate palsu.

---

## 7. Validation record

| Check | Hasil |
| --- | --- |
| Admin product listing setelah reload | Lulus |
| Draft tampil di admin | Lulus |
| Product seed tidak diubah | Lulus |
| URL gambar dimuat browser | Lulus |
| Kontrak Draft tidak terlihat publik | Lulus — HTTP 404 |
| Runtime/code change | Tidak ada |

---

**Authority:** `ngepas-core.md`, `kem36-content-readiness-checklist-v1.md`, `admin-content-operations-readiness-audit-v2.md`, dan kontrak public/admin KEM-33/KEM-30.  
**Evidence session lokal:** `/home/ubuntu/o1_admin_access_evidence.md` dan `/home/ubuntu/o1_shopee_listing_evidence.md` (bukan source runtime dan tidak dipromosikan ke repository).
