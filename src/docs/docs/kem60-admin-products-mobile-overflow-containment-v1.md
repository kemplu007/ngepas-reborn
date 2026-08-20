# ==================================================
# NGEPAS REBORN
# KEM-60 — ADMIN PRODUCTS MOBILE OVERFLOW CONTAINMENT v1
# ==================================================

## Status

**In progress.** Slice ini membatasi overflow horizontal daftar produk admin pada viewport mobile tanpa mengubah data katalog, aksi operator, state selection, kontrak API, maupun alur admin.

## Evidence

Audit mobile A1 sebelumnya mencatat lebar dokumen Products sebesar **436 px** pada viewport **390 px**. Saat preview KEM-60 diperiksa, ProductTable sudah dapat di-contain secara lokal, tetapi dokumen desktop masih memiliki `scrollWidth` **1375 px** terhadap client width **1265 px**, sementara surface tabel tidak overflow. Pemetaan DOM menunjukkan overflow berakhir pada `html` → `body` → `#root` → flex shell AdminLayout. Root cause-nya adalah flex item konten utama (`flex flex-1 flex-col`) yang belum memiliki `min-w-0`, sehingga minimum intrinsic width child dapat memperlebar flex row.

| Lokasi | Temuan | Konsekuensi sebelum slice |
| --- | --- | --- |
| `src/layouts/AdminLayout.jsx` | Konten utama adalah flex item `flex-1` tanpa `min-w-0`. | Minimum intrinsic width child dapat memperlebar flex shell dan dokumen. |
| `src/components/admin/ProductTable.jsx` | Wrapper tabel memerlukan boundary scroll lokal dan floor lebar mobile eksplisit untuk checkbox, cluster produk, serta action. | Setelah shell dapat menyusut, overflow tabel tetap berada di dalam surface tabel. |
| `src/pages/admin/Products.jsx` | Parent hanya meneruskan produk yang sudah difilter serta callback select/edit/delete. | Tidak ada alasan untuk menyentuh state, bulk action, Context, Service, atau API. |
| `src/pages/admin/Categories.jsx` | Tabel kategori memakai pola `overflow-x-auto` dengan floor lebar tabel eksplisit. | Menjadi precedent containment; tidak perlu mengubah daftar menjadi card atau menghapus kolom/action. |

## Kontrak Perbaikan v1

1. AdminLayout tetap menjadi pemilik shell admin; tidak ada component baru, route, atau perubahan prop.
2. Flex item konten utama AdminLayout harus dapat menyusut (`min-w-0`) agar child tidak dapat memperlebar flex shell.
3. ProductTable tetap menjadi pemilik presentasi tabel produk; wrapper harus menjadi flex item yang dapat menyusut (`min-w-0`) dan tidak dapat melebihi lebar parent (`max-w-full`), sementara `overflow-x-auto` tetap menjadi boundary scroll lokal.
4. Pada mobile, tabel diberi floor lebar presentasional yang eksplisit agar kolom checkbox, cluster produk, dan action tidak menekan lebar dokumen; overflow diarahkan ke scroll area tabel. Pada breakpoint `md` ke atas, tabel kembali menggunakan lebar parent agar desktop/tablet tidak dipaksa scroll oleh floor mobile.
5. Tidak ada perubahan pada `products`, `selectedIds`, `onToggleSelect`, `onSelectAll`, `onDelete`, route edit, dialog delete, label, payload, Context, Service, API, backend, auth JWT, schema/data, media, billing, atau deployment.

## Acceptance Criteria

| Kriteria | Bukti yang diperlukan |
| --- | --- |
| Overflow terkandung | Pada viewport 390 px dan desktop, lebar dokumen tidak lebih lebar dari viewport; bila tabel memerlukan ruang tambahan, hanya wrapper tabel yang dapat discroll horizontal. |
| Aksi tetap tersedia | Checkbox serta IconButton edit/hapus tetap bisa dijangkau dan label aksesibelnya tidak berubah. |
| Data dan callback tidak berubah | Diff runtime hanya menyentuh class presentasi ProductTable dan AdminLayout; tidak ada callback, state, payload, atau boundary data yang berubah. |
| Desktop tidak regresi | Pada viewport desktop, tabel tetap mengisi lebar container tanpa scroll paksa dari floor mobile. |
| Guardrail utuh | Tidak ada perubahan auth, Context/Service/API, backend, schema/data, media, billing, dependency, config deploy, atau user flow. |

## Validasi yang Direncanakan

Jalankan `git diff --check`, `npm run quality:check`, dan `npm run quality:contract-tests`. Verifikasi read-only dilakukan pada daftar produk admin dengan viewport mobile 390 px dan desktop, tanpa select, edit, delete, save, atau publish data.

## Non-goals

Slice ini tidak merombak ProductTable menjadi card list, mengubah Categories table, memperbaiki bulk action bar, mendesain ulang Dashboard, menambah filter/bulk action, mengubah ProductForm, membangun upload/media, atau mengubah logika katalog. Penambahan `min-w-0` pada shell AdminLayout hanya memperbaiki contract flex-width yang menjadi akar overflow; tidak mengubah navigasi, sidebar, header, atau user flow.
