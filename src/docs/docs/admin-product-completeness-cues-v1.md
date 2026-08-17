NGEPAS REBORN
Document : Admin Product Completeness Cues v1
Purpose  : Membuat status kelengkapan produk mudah dipindai oleh admin tanpa mengubah kontrak produk atau perilaku simpan.
-->

# Admin Product Completeness Cues v1

## Status

| Field | Nilai |
| --- | --- |
| Status | Tervalidasi lokal; siap dikomit dan diajukan untuk review pada branch `feat/admin-product-completeness-cues-v1` |
| Dasar branch | `origin/main` commit `cbc7deb` |
| Lingkup | FE visual-only; dua file kode dan dokumen slice ini |
| Permukaan | `/admin/products/new`, `/admin/products/:id/edit`, dan daftar produk admin |

## Tujuan

Admin dapat melihat empat informasi dasar yang masih perlu diisi—nama produk, harga, link affiliate, dan gambar utama—tanpa harus membaca kode atau mencoba menyimpan form lebih dahulu. Status **Published** dan **Draft** juga harus terbaca di form maupun daftar produk, termasuk pada layar mobile yang menyembunyikan kolom tabel desktop.

> Cue kelengkapan adalah bantuan orientasi, bukan aturan publish baru. Status tetap ditentukan oleh pilihan admin pada field yang sudah ada dan tombol simpan tetap mempunyai perilaku semula.

## Kontrak patch terkecil

| Concern | Keputusan |
| --- | --- |
| Pemilik perubahan | `ProductForm.jsx` menghitung presentasi dari `formData` lokal; `ProductTable.jsx` hanya merender ulang `product.status` yang sudah ada. |
| Data dipertahankan | `formData`, `gallery`, handler, langkah wizard, payload submit, dan aksi tabel tidak berubah. |
| Cue visual | Ringkasan `0–4 siap`, daftar empat field dengan langkah asal, dan label status form. |
| Status daftar mobile | Badge Published/Draft tampil bersama metadata produk ketika kolom Status desktop disembunyikan. |
| Foundation | Menggunakan `Badge`, `Card`, token `--np-*`, dan ikon Lucide yang sudah dipakai proyek. |
| Bukan scope | Tidak ada upload, WebP, storage, endpoint, validator, schema, migration, API, persistence, atau perubahan auth JWT. |

## Detail implementasi

`ProductForm.jsx` membentuk `completenessItems` dari nilai yang telah tersedia di `formData`. Setiap cue berubah saat admin mengetik, tetapi tidak menjalankan submit otomatis, tidak menyetel nilai field, dan tidak mengunci tombol navigasi ataupun tombol simpan. Label Published/Draft pada header membaca field status yang sama dengan select existing.

`ProductTable.jsx` memakai `Badge` semantik yang sama dengan kolom status desktop. Badge dipindahkan ke metadata ringkas untuk breakpoint di bawah `lg`, sehingga admin mobile tidak kehilangan konteks status ketika kolom tabel tersebut disembunyikan.

## Guardrail yang diverifikasi melalui diff

| Area | Hasil |
| --- | --- |
| Auth JWT | Tidak disentuh. |
| Service, Context, API, backend | Tidak disentuh. |
| Payload, validator, schema, persistence | Tidak disentuh. |
| Route dan flow wizard | Tidak disentuh. |
| Data contoh atau mutasi saat form dibuka | Tidak ditambahkan. |
| File kode berubah | Hanya `ProductForm.jsx` dan `ProductTable.jsx`. |

## Validasi

| Pemeriksaan | Hasil |
| --- | --- |
| `git diff --check` | Lulus. |
| `npx vite build` | Lulus; 1.843 modul ditransformasikan. Peringatan ukuran chunk baseline tetap muncul tanpa error build. |
| Desktop Step 1 | Ringkasan kelengkapan, status, dan stepper tampil bersamaan tanpa mengganggu field form. |
| Mobile 390 × 844 — form | Lulus. Ringkasan menampilkan empat item, tidak ada overflow horizontal, dan input nama mengubah ringkasan dari `0/4 siap` menjadi `1/4 siap` tanpa submit. |
| Mobile 390 × 844 — daftar | Lulus untuk cue status. Delapan badge Published terdeteksi pada metadata produk; badge tetap tersedia ketika kolom status desktop disembunyikan. |
| Isolasi overflow daftar | Lebar dokumen daftar terdeteksi 436 px pada viewport 390 px, tetapi tetap 436 px ketika delapan badge status disembunyikan sementara saat runtime. Temuan ini tidak berasal dari cue status A1 dan tidak disentuh dalam slice ini. |
| Console | Tidak ada error maupun warning pada preview yang diuji. |
| Submit dan persistence | Tidak dipicu dalam validasi; slice ini tidak mengubahnya. |

## Acceptance criteria A1

- [x] Admin melihat field dasar yang belum lengkap tanpa dokumentasi teknis.
- [x] Status Published/Draft ditampilkan konsisten di form dan daftar produk pada breakpoint yang relevan.
- [x] Tidak ada perubahan field, payload, validator, endpoint, persistence, route, atau auth.
- [x] Tidak ada submit otomatis atau data contoh baru ketika form dibuka.
- [x] `git diff --check` dan `npx vite build` lulus.
- [x] Verifikasi visual mobile dan desktop lengkap sebelum pull request dibuat.

## Review yang diminta

Review hanya perlu memeriksa apakah ringkasan terasa membantu di Step 1, apakah label status terbaca jelas, apakah badge status di daftar mobile tidak membuat metadata sesak, dan apakah tidak ada perilaku simpan yang berubah. Jika lolos review, branch ini tetap menunggu approval eksplisit sebelum pull request dan promosi ke `main`.
