<!--
NGEPAS REBORN
Document : Admin Gallery URL Assistant v1
Purpose  : Membantu admin mengelola gallery URL yang sudah didukung tanpa membuka scope media upload atau mengubah kontrak produk.
-->

# Admin Gallery URL Assistant v1

## Status

| Field | Nilai |
| --- | --- |
| Status | Tervalidasi lokal; siap dikomit dan diajukan untuk review pada branch `feat/admin-gallery-url-assistant-v1`. |
| Lingkup | Satu file kode dan dokumen slice ini. |
| Permukaan | Step 3 pada `/admin/products/new` dan `/admin/products/:id/edit`. |

## Tujuan

Admin dapat menambah URL gambar pendukung dengan feedback yang mudah dipahami sebelum menyimpan produk. Asisten menampilkan jumlah gambar, slot yang tersisa, serta alasan ketika URL belum diisi, bukan `http/https`, duplikat, atau ketika gallery sudah mencapai batas.

> Asisten hanya memperjelas kontrak gallery URL yang sudah berlaku. Ia bukan upload gambar, tidak memeriksa ketersediaan file jarak jauh, dan tidak mengubah proses simpan.

## Kontrak patch terkecil

| Concern | Keputusan |
| --- | --- |
| Batas gallery | Maksimal **8 URL**, sama dengan validator produk aktif. |
| Protokol URL | Hanya `http:` dan `https:`, diverifikasi lokal agar admin mendapat feedback sebelum submit. |
| Duplikasi | URL identik ditolak secara lokal dan urutan URL yang sudah ada dipertahankan. |
| Interaksi | URL valid ditambahkan ke state `gallery` existing; hapus tetap memakai handler existing. |
| Foundation | Menggunakan `FormField`, `Input`, `Button`, `Badge`, token `--np-*`, serta motion existing. |
| Bukan scope | Tidak ada upload, file picker, storage, WebP, transformasi image, endpoint, service, backend, validator, schema, payload, persistence, auth JWT, atau migration. |

## Detail implementasi

`ProductForm.jsx` menambahkan konstanta lokal `PRODUCT_GALLERY_LIMIT` dan helper `isValidGalleryUrl`. `handleAddGallery` memeriksa nilai kosong, protokol, URL duplikat, dan batas delapan sebelum memperbarui state `gallery`; tidak ada request jaringan atau submit yang dijalankan oleh aksi tersebut.

Badge gallery berubah dari hitungan tunggal menjadi format `n/8 gambar`. `FormField` memakai hint untuk slot tersisa dan error aksesibel ketika tindakan tidak dapat dilanjutkan. Ketika batas tercapai, input serta tombol tambah dinonaktifkan; admin tetap dapat memakai aksi hapus yang sudah ada untuk membuka slot kembali.

## Guardrail yang diverifikasi melalui diff

| Area | Hasil |
| --- | --- |
| Auth JWT | Tidak disentuh. |
| API, service, context, backend | Tidak disentuh. |
| Validator, schema, payload, persistence | Tidak disentuh. |
| Upload, storage, WebP, multipart, endpoint media | Tidak dibuat. |
| Route, wizard, tombol simpan | Tidak disentuh. |
| File kode berubah | Hanya `ProductForm.jsx`. |

## Validasi

| Pemeriksaan | Hasil |
| --- | --- |
| `git diff --check` | Lulus. |
| `npx vite build` | Lulus; peringatan ukuran chunk baseline tetap muncul tanpa error build. |
| Desktop Step 3 | Counter `0/8`, hint slot tersisa, input, dan tombol tambah tampil bersama. |
| URL `ftp://...` | Ditolak lokal dengan pesan protokol yang valid; jumlah gambar tetap `0/8`. |
| URL `https://...` | Ditambahkan lokal; counter berubah menjadi `1/8`, input dikosongkan, dan slot tersisa menjadi 7. |
| URL duplikat | Ditolak lokal dengan pesan duplikasi; jumlah gambar tetap `1/8`. |
| Mobile 390 × 844 | Lebar dokumen sama dengan viewport 390 px; kontrol input dan tambah terdeteksi tanpa overflow horizontal. |
| Submit dan persistence | Tidak dipicu selama validasi. |

## Acceptance criteria A2

- [x] Admin memahami batas maksimum dan slot gallery yang tersisa.
- [x] URL kosong, protokol tidak valid, dan URL duplikat mendapat feedback lokal sebelum submit.
- [x] URL `http/https` valid bisa ditambahkan dengan urutan yang tetap.
- [x] Tidak ada perubahan pada payload, validator, endpoint, persistence, backend, auth, maupun media pipeline.
- [x] Validasi build dan pemeriksaan desktop/mobile selesai sebelum pull request.

## Review yang diminta

Review difokuskan pada keterbacaan counter dan hint gallery di Step 3, kejelasan feedback ketika URL ditolak, serta kepastian bahwa tidak ada flow upload atau simpan baru yang diperkenalkan. Branch tetap menunggu approval eksplisit sebelum dipromosikan ke `main`.
