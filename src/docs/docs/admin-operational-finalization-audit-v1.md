<!--
NGEPAS REBORN
Document : Admin Operational Finalization Audit v1
Purpose  : Menetapkan fakta kemampuan admin saat ini, kesenjangan operasional, dan scope guard sebelum membuat fitur konten atau media baru.
-->

# Admin Operational Finalization Audit v1

> **Tujuan operasional:** pengelola konten cukup mengisi data, memilih gambar, dan meninjau hasilnya. Aturan validasi, pembentukan payload, optimasi media, serta penyajian public harus ditangani oleh sistem, bukan dipahami admin.

## Keputusan audit

Audit ini **bukan** persetujuan untuk menambah semua fitur sekaligus. Ia adalah pagar urutan kerja agar admin dapat berkembang dari pengelolaan katalog yang sudah ada menuju pengelolaan konten tanpa merombak arsitektur, memutus kontrak produk, atau menyentuh auth JWT.

## Kemampuan yang sudah tersedia

| Area | Kondisi saat ini | Nilai untuk admin | Batas saat ini |
| --- | --- | --- | --- |
| Produk | CRUD terautentikasi melalui `ProductContext` dan route `/api/products`; `ProductForm` mengatur detail, harga, stok, link affiliate, status, tags, alasan kurasi, serta deskripsi. | Admin sudah bisa membuat dan memperbarui katalog utama tanpa kode. | Form masih wizard empat langkah dan belum memiliki mode review/publish khusus. |
| Galeri produk | Produk memiliki `image` utama dan `gallery` berupa array URL HTTP/HTTPS; validator membatasi galeri maksimal 8 URL. | Sistem telah punya kontrak galeri dan preview URL. | Admin harus mencari, menempel, dan menjaga URL gambar sendiri. Belum ada file upload, storage, transformasi, atau lifecycle asset. |
| Kategori | CRUD kategori tersedia untuk nama, slug otomatis, room, ikon, dan status. | Admin dapat menjaga struktur katalog dasar. | Tidak ada metadata editorial, landing configuration, atau asset category. |
| Daftar produk | Pencarian, filter kategori, edit, hapus, dan bulk delete tersedia. | Pengelolaan katalog sudah layak sebagai dasar operasi. | Tidak ada bulk publish, duplikasi produk, atau media health check. |
| Dashboard | Ringkasan produk, kategori, stok, dan metrik turunan dari data katalog tersedia. | Memberi orientasi cepat bagi admin. | Belum menunjukkan status kelengkapan konten maupun kesiapan public. |

## Kesenjangan yang terverifikasi

| Kebutuhan founder | Fakta repository | Kesimpulan scope |
| --- | --- | --- |
| Upload gambar agar admin tidak mencari URL | Route backend hanya menyediakan produk, kategori, dan auth; tidak ada endpoint multipart, storage provider, atau service upload. | **Fitur baru lintas FE/BE**, bukan polish form. Butuh kontrak asset dan recovery procedure tersendiri. |
| Auto WebP | Repository tidak memiliki proses image/media/upload. Produk saat ini mengirim JSON URL, bukan berkas. | Tidak boleh ditambahkan diam-diam ke `ProductForm`. Dilakukan setelah upload dan storage memiliki kontrak eksplisit. |
| Galeri per produk | Kontrak `gallery` sudah ada dan tervalidasi; UI URL entry + preview sudah tersedia. | Bisa ditingkatkan bertahap dengan helper UI atau asset picker setelah sumber asset tersedia. Tidak perlu schema baru untuk memperbaiki UX URL. |
| Banner/campaign | Hero Discover masih didefinisikan sebagai `discoverCampaign` di frontend. | **Fitur konten baru**; perlu model, route, admin surface, fallback public, serta guard khusus. |
| Artikel/tips | `editorialCards` masih statis di `Discover.jsx`. | **Fitur konten baru**; tidak boleh diperlakukan seolah CRUD sudah ada. |

## Evaluasi optimasi gambar

Transformasi WebP memang tepat sebagai target operasional, tetapi **bukan langkah pertama**. Untuk server Node/Express, [Sharp](https://github.com/lovell/sharp) adalah kandidat yang telah diuji luas: repository sumber mendukung JPEG, PNG, WebP, AVIF, dan TIFF; memiliki lebih dari 32 ribu star serta aktivitas terkini pada saat audit. Integrasi hanya dipertimbangkan setelah keputusan storage ditetapkan.

Urutan aman untuk media:

1. Tentukan storage asset dan kepemilikan URL final.
2. Buat endpoint upload terautentikasi dengan batas tipe, ukuran, dan jumlah file.
3. Transformasikan upload server-side ke WebP menggunakan library yang ditetapkan; simpan metadata sumber, hasil, dimensi, dan ukuran byte.
4. Tampilkan preview, urutan galeri, alt text, dan penghapusan yang aman di admin.
5. Pastikan produk hanya menyimpan URL asset hasil; pertahankan fallback URL lama agar katalog existing tidak putus.
6. Siapkan runbook recovery sebelum mengaktifkan transformasi atau migrasi pada production.

## Scope guard yang tidak boleh dilanggar

- Tidak mengubah atau membypass auth JWT admin.
- Tidak mengubah kontrak produk, tags, atau gallery URL yang sudah live tanpa migration dan fallback yang terdokumentasi.
- Tidak menjalankan migration atau write verification Railway sebelum recovery point aman tersedia.
- Tidak membuat banner, artikel, storage, atau upload endpoint di dalam slice polish UI.
- Tidak memasukkan review, rating, stok, marketplace, atau data editorial rekaan.
- Tidak menghapus dukungan URL gambar existing saat media upload belum tersedia.

## Kandidat backlog berurutan

| Urutan | Slice | Tujuan admin | Dampak | Status |
| --- | --- | --- | --- | --- |
| A0 | Audit ini | Membedakan kemampuan yang sudah ada dengan fitur baru. | Dokumentasi saja | Selesai di branch ini |
| A1 | Product completeness cues | Membantu admin melihat field wajib, status draft/published, dan kesiapan konten tanpa mengubah payload. | FE visual-only | Kandidat pertama |
| A2 | Gallery URL assistant | Mempermudah validasi URL, urutan, preview, dan pesan batas 8 gambar dengan kontrak gallery existing. | FE visual-only | Setelah A1 |
| A3 | Media upload contract | Menetapkan storage, keamanan, format, batas ukuran, response, dan fallback. | Dokumen kontrak + review | Wajib sebelum implementasi upload |
| A4 | Upload + WebP pipeline | Mengubah upload menjadi asset WebP yang dikelola sistem. | FE/BE + storage | Setelah A3 dan recovery plan |
| A5 | Campaign/banner content | Memindahkan campaign Discover dari konstanta ke konten terkelola dengan fallback public. | FE/BE + schema | Sesudah media contract |
| A6 | Editorial/article content | Membuat CRUD artikel terpisah dengan rute public nyata. | FE/BE + schema | Sesudah A5 |

## Acceptance criteria A1: Product completeness cues

1. Admin dapat memahami tahap yang belum lengkap tanpa membaca dokumentasi teknis.
2. Status draft/published terlihat konsisten dengan data produk yang sudah ada.
3. Tidak ada field, payload, validator, endpoint, persistence, route, atau auth yang berubah.
4. Tidak ada submit otomatis, data contoh, atau perubahan produk saat membuka form.
5. Validasi mencakup mobile, desktop, `git diff --check`, dan `npx vite build`.

## Bukti audit

| Bukti | Temuan |
| --- | --- |
| `src/config/admin/routes.js` | Admin hanya menyediakan dashboard, produk, kategori, serta form produk/kategori. |
| `src/pages/admin/ProductForm.jsx` | Galeri berada dalam kontrak URL; tidak ada input file, FormData, atau image processing. |
| `server/routes/productRoutes.js` | Route produk hanya GET, POST, PUT, DELETE JSON yang diproteksi auth. |
| `server/helpers/validators/productValidator.js` | Gallery dibatasi maksimal 8 URL HTTP/HTTPS valid. |
| `src/pages/public/Discover.jsx` | Banner campaign dan kartu artikel masih dideklarasikan statis di frontend. |

## Status keputusan

Audit ini menjadikan **A1 — Product completeness cues** sebagai slice pertama yang paling aman: manfaat langsung bagi admin, tidak memerlukan kontrak data baru, dan dapat diuji tanpa menyentuh production data. A2 tetap berada setelah A1 untuk meningkatkan pengalaman galeri URL existing. A3–A6 memerlukan review kontrak eksplisit sebelum mulai coding.
