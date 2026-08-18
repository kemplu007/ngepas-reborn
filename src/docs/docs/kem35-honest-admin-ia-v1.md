# KEM-35 — Honest Admin IA v1

**Status:** Review-ready  
**Branch:** `feat/kem-35-honest-admin-ia-v1`  
**Scope:** PR-D dari Readiness Patrol v1

## Tujuan

Admin hanya boleh menampilkan navigasi dan status yang dapat dipertanggungjawabkan oleh runtime saat ini. Slice ini menghapus affordance menuju route yang tidak ada, membedakan keadaan data admin, dan memakai daftar kategori resmi untuk filter produk.

## Kontrak kecil

| Concern | Keputusan |
| --- | --- |
| Menu admin | `adminMenu` hanya memuat `/admin`, `/admin/products`, dan `/admin/categories`, seluruhnya route aktif. |
| State data | `AdminDataState` adalah komponen presentational khusus admin untuk `loading`, `error`, dan `empty`; ia tidak memanggil context, service, atau API. |
| Dashboard | Menggunakan `adminLoading`/`adminError` dan state CategoryContext yang sudah ada. Status siap hanya dirender setelah kedua dataset termuat. |
| Products | Pilihan filter kategori berasal dari `CategoryContext`; filter, pencarian, seleksi, bulk delete, dan write flow dipertahankan. |
| Kejujuran status | Label `Database Online` diganti menjadi `Status data` agar UI tidak mengklaim health check infrastruktur yang tidak dilakukan halaman ini. |

## Batas yang sengaja tidak disentuh

Tidak ada perubahan pada route aplikasi, `ProtectedRoute`, JWT, service, API, Express, SQLite, schema, media, billing, data produksi, atau perilaku create/update/delete. PR-D tidak membangun Orders, Users, Settings, observability database, atau state management baru.

## Acceptance criteria

| Bukti | Kondisi lulus |
| --- | --- |
| Route truth | Tidak ada item sidebar admin yang menuju 404. |
| State | Dashboard dan Products memiliki state loading, error, empty, serta ready yang terpisah dan berbahasa jujur. |
| Source kategori | Filter Products tidak lagi menyusun pilihan hanya dari rows produk. |
| Guardrail | Tidak ada perubahan pada auth, API, backend, database, schema, media, billing, atau flow write. |
| Validasi | `git diff --check` dan `npm run quality:check` lulus; preview admin diperiksa read-only. |

## Evidence sebelum PR

| Pemeriksaan | Hasil |
| --- | --- |
| Route/menu contract | Lulus: menu hanya berisi `/admin`, `/admin/products`, dan `/admin/categories`; tidak ada label atau path Orders, Users, atau Settings. |
| Quality Gate lokal | Lulus: `npm run quality:check` menjalankan ESLint lalu build Vite tanpa error. Peringatan bundle `>500 kB` adalah baseline yang tidak disentuh slice ini. |
| Diff hygiene | Lulus: `git diff --check` tanpa whitespace error. |
| Walkthrough runtime | Akan dilakukan terhadap preview PR tanpa aksi write; validasi login/admin memerlukan sesi JWT existing dan tidak dipalsukan. |
