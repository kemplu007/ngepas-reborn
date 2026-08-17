<!-- ==================================================
NGEPAS REBORN
File   : admin-product-form-mobile-rhythm-v1.md
Module : UI/UX Slice 4 Audit
================================================== -->

# Slice 4 — Admin Product Form Mobile Rhythm v1

| Field | Decision |
| --- | --- |
| Status | In progress — audit dan visual validation dimulai 2026-08-17 |
| Branch | `polish/admin-product-form-mobile-rhythm-v1` |
| Owner | `src/pages/admin/ProductForm.jsx` |
| Scope | Ritme, hierarchy, spacing, dan penempatan action form mobile; maksimum dua file implementasi + dokumen slice ini |
| Out of scope | State, handler, payload, validator, service, context, auth JWT, route, API, schema, persistence, upload, gallery behavior, dan varian produk |

## Sumber kebenaran

Slice ini mengikuti `ngepas-core.md`, `uiux-system-v1.1.md`, `coding-standard.md`, `foundation-baseline-v1.md`, token `src/styles/tokens.css`, dan referensi visual `src/docs/assets/uiux-v1.1/additional/step-6-5-admin.jpg`.

> Prinsip yang dipertahankan: admin harus efisien, form tetap satu alur, dan mobile memakai satu kolom tanpa menghilangkan aksi utama.

## Bukti baseline

Audit production dilakukan pada `https://ngepas-reborn.vercel.app/admin/products/new` dengan sesi admin yang sah pada 2026-08-17. Halaman menampilkan sidebar admin, top bar, header form, progress empat langkah, Step 1 field dasar, serta action `Lanjut` dan `Batal`.

| Area | Temuan | Keputusan Slice 4 |
| --- | --- | --- |
| Header dan progress | Header form ringkas, tetapi progress angka di desktop tersebar lebar dan tidak memberi konteks langkah aktif selain warna badge. | Patch komposisi dan label pendukung saja; tidak mengubah state `currentStep` atau navigasi. |
| Form shell | `Card as="form"` memakai `lg:grid-cols-2` dengan kolom kanan kosong, sehingga area kerja desktop terlalu renggang. | Rapikan shell menjadi satu kolom dengan lebar baca yang terkendali; field internal yang sudah memakai grid tetap dipertahankan. |
| Ritme mobile | Section Step 1 dan Step 2 menggunakan struktur serupa, sedangkan Step 3 dan Step 4 memakai eyebrow/spacing berbeda. | Selaraskan header setiap langkah dan gap vertikal menggunakan token yang sudah ada. |
| Action row | Action berada setelah form dengan urutan mobile `Lanjut`/`Batal` yang dapat diperjelas secara visual. | Pertahankan callback, label, dan urutan logika; hanya tingkatkan hierarchy serta touch rhythm. |
| Detail dan kurasi | Dua Card Step 4 sudah menandai informasi katalog vs alasan kurasi, tetapi belum memiliki heading kelompok yang konsisten. | Perjelas hierarchy presentasional tanpa mengubah field atau payload. |

## Kontrak patch terkecil

| Concern | Keputusan |
| --- | --- |
| Component boundary | `ProductForm.jsx` tetap menjadi pemilik komposisi halaman; primitive UI tidak diubah tanpa bukti kebutuhan lintas-surface. |
| Perilaku yang dipertahankan | Semua props, handler, `handleSubmit`, `nextStep`, `prevStep`, `navigate`, gallery add/remove, data binding, dan native validation. |
| Delta visual | Progress lebih mudah dipahami, content column lebih fokus, heading antar-step konsisten, action bar mobile lebih jelas dan tidak mengubah flow. |
| Token | Hanya token `--np-*`, radius/utilitas `np`, serta motion yang telah ada bila benar-benar diperlukan. |
| Validasi | `git diff --check`, `npx vite build`, pemeriksaan authenticated desktop, dan mobile melalui sesi admin sah sebelum branch review. |

## Implementasi dalam branch

`ProductForm.jsx` memakai shell satu kolom berlebar baca terkendali, header langkah dengan eyebrow konsisten, indikator angka berbentuk sudut token `np`, dan action row dengan target sentuh lebar penuh pada mobile. State, callback, serta urutan keputusan `Kembali` → `Lanjut`/`Simpan` → `Batal` tidak diubah.

## Catatan validasi

- Tidak ada write test, submit, perubahan produk, atau aksi destruktif selama review visual.
- Sesi admin diperlukan kembali untuk bukti viewport mobile setelah patch; kredensial tidak disimpan di repository atau dokumentasi.
- Desktop branch lokal pada `http://localhost:5176/admin/products/new` telah terbuka dalam sesi admin sah setelah patch. Shell form kini memakai satu kolom terfokus, header langkah konsisten, dan action tetap berada dalam alur form tanpa perubahan data atau submit.
- Browser pengujian terautentikasi pada preview lokal pada 2026-08-17 dan hanya akan digunakan untuk navigasi langkah serta inspeksi visual; kredensial tidak dicatat pada artefak proyek.
- Viewport browser pengujian telah diatur ke `375×812` untuk bukti mobile Slice 4; pemeriksaan berikutnya dibatasi pada layout dan navigasi langkah tanpa submit form.
- Artefak mobile Step 1 telah direkam sebagai `product-form-slice4-mobile-step1.png` dan snapshot aksesibilitas terkait untuk pemeriksaan hierarchy, action, serta overflow.
- Mobile Step 1 lulus inspeksi awal: header dan progress tampil tanpa tabrakan, kolom input memiliki lebar baca `277px` di dalam card, serta urutan semantik tetap `heading → fields → Lanjut → Batal`. Tombol `Lanjut` dan `Batal` memiliki lebar target sentuh yang sama penuh tanpa horizontal overflow yang terlihat.
- Aksi `Lanjut` ditekan secara non-destruktif pada preview lokal, tetapi snapshot berikutnya masih menampilkan Step 1. Penyebabnya perlu diperiksa dari console sebelum mengklaim validasi lintas-langkah; tidak ada field yang diisi atau submit yang dijalankan.
- Artefak yang semula diberi label Step 2 masih merekam Step 1 dan hanya dipertahankan sebagai bukti temuan navigasi tersebut.
- Console browser tidak mengandung error dan tombol `Lanjut` berstatus `type="button"` serta tidak disabled. Verifikasi navigasi alternatif masih diperlukan untuk membedakan batas alat pengujian dari perilaku UI.
- Percobaan DOM dan driver click diikuti jeda render satu detik; snapshot final sesudah jeda diperlukan sebelum menentukan apakah perubahan state benar-benar tertunda atau tidak terpicu.
- Inspeksi source mengonfirmasi tombol `Lanjut` tetap memanggil `nextStep`, tombol `Kembali` memanggil `prevStep`, dan submit tetap hanya tersedia pada Step 4. Tidak ada handler, payload, atau flow submit yang diubah oleh Slice 4.
- Desktop Step 1 terautentikasi tetap menampilkan seluruh label, field, dan action tanpa error build. Pada mobile Step 1 tidak tampak overflow horizontal secara visual; pengukuran DOM otomatis ditunda karena konektor browser pengujian mengalami timeout eksternal, bukan error aplikasi.
- Verifikasi alternatif pada browser preview utama berhasil memindahkan form dari Step 1 ke Step 2 tanpa memasukkan atau menyimpan data. Ini mengonfirmasi flow `nextStep` aplikasi tetap bekerja; kegagalan sebelumnya terbatas pada sesi Playwright yang stale.
- Tahap galeri juga dapat diakses melalui action `Lanjut` pada preview lokal. Heading, field URL, state gallery kosong, dan action `Kembali`/`Lanjut` hadir tanpa perubahan data maupun submit; ritme card tetap mengikuti token Slice 4.
- Sesi preview browser kemudian kembali ke Step 2 saat inspeksi Step 4, sehingga validasi lintas-langkah browser dianggap terbatas pada Step 1–3. Source tetap menunjukkan Step 4 sebagai satu-satunya action `type="submit"`; tidak ada submit yang pernah dijalankan selama audit.
