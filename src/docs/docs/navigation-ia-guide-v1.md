<!--==================================================
 NGEPAS REBORN
 File    : navigation-ia-guide-v1.md
 Module  : Navigation Information Architecture
==================================================-->

# Navigation IA & Panduan Ngepas v1.0

## Keputusan inti

Ngepas menggunakan dua lapisan navigasi dengan tanggung jawab berbeda. **Side drawer** menjadi peta fitur dan informasi yang benar-benar tersedia. **Panduan Ngepas** menjadi kompas untuk membantu user bergerak melalui decision journey, bukan daftar route kedua.

> Side drawer membantu user menjelajah area Ngepas. Panduan Ngepas membantu user maju dari kebutuhan menuju keputusan.

Kedua lapisan tidak boleh menampilkan daftar tujuan yang sama hanya karena pola tersebut umum digunakan aplikasi lain.

## Side drawer

Side drawer mobile hanya mempromosikan destination yang sudah memiliki route atau anchor nyata. Drawer tidak menampilkan akun publik, compare route, bantuan kosong, atau future feature yang belum memiliki pengalaman lengkap.

| Menu | Destination | Status |
|---|---|---|
| Discover | `/` | Live |
| Kategori | `/category` | Live, legacy page |
| Cara Kerja Ngepas | `/#cara-kerja` | Live anchor |
| Why Ngepas | `/#why-ngepas` | Live anchor |
| Artikel & Tips | `/#artikel-tips` | Live anchor |

Item yang belum mempunyai tujuan nyata harus disembunyikan sampai siap. **404 bukan destination yang boleh ditawarkan kepada user.**

## Panduan Ngepas

Panduan Ngepas menggantikan bottom navigation lima item lama pada Discover. State default-nya compact supaya tidak mengganggu konten. Saat diketuk, guide mengembang untuk memperlihatkan empat tahap journey.

| Tahap | Fungsi | Aksi v1 |
|---|---|---|
| Mulai | Memulai dari kebutuhan atau kata kunci | Fokus ke `#discover-search` |
| Jelajah | Menemukan kategori dan pilihan relevan | Scroll ke `#kategori-populer` |
| Pahami | Melihat produk, alasan, rating, dan detail | Scroll ke `#hasil-produk` |
| Putuskan | Mengarahkan user memilih kandidat yang paling Ngepas | Scroll ke `#hasil-produk` sampai compare flow matang |

`Putuskan` belum membuat route compare palsu. Compare tetap menjadi action kontekstual yang akan diperkuat saat flow compare dan empty state sudah siap.

## Motion dan accessibility

Guide hanya menganimasikan opacity, transform, dan ekspansi panel. State compact menggunakan `aria-expanded=false` dan panel yang mengkeret memakai `inert` supaya step tersembunyi tidak masuk tab order. Klik di luar drawer tetap menutup side drawer, sedangkan Panduan Ngepas menutup kembali setelah user memilih tahap.

Bottom guide hanya aktif pada viewport mobile. Desktop tetap memakai header navigation karena tidak ada kebutuhan untuk menampilkan dua navigasi global pada layar yang sama.

## Batas scope

Perubahan ini tidak menambahkan route baru, backend endpoint baru, akun publik, `product_offers`, atau perubahan auth JWT admin. Component `BottomNavigation.jsx` lama belum dihapus pada slice ini agar penghapusan dead component dapat diaudit sebagai housekeeping terpisah setelah guide diterima.

## Sumber kebenaran

Route truth berada di `src/App.tsx`. Kontrak visual dan urutan journey mengikuti `src/docs/docs/uiux-system-v1.1.md`. Implementasi guide berada di `src/components/navigation/DiscoveryGuide.jsx`, sedangkan side drawer berada di `src/components/navigation/MobileNavDrawer.jsx`.
