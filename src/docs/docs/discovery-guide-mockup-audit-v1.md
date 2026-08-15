# Discovery Guide Mockup Audit v1

## Temuan Referensi Resmi

Referensi `1000702639.jpg` menampilkan **Navigation (Mobile - Bottom)** sebagai bar bawah yang tipis dan terstruktur. Elemen navigasi berada dalam satu row, menggunakan icon outline dan label pendek. Referensi tidak menunjukkan panel besar berbentuk pill yang menutupi konten, juga tidak menunjukkan stepper empat tahap yang mengembang menjadi kartu besar.

Visual grammar yang perlu dipertahankan adalah background putih, garis/border tipis, icon outline, label ringkas, spacing terukur, dan state aktif yang memakai hijau Ngepas. Logo mobile menggunakan mark resmi berbentuk `N.`; wordmark dan typography mengikuti design system yang sudah final.

## Implikasi untuk Baseline

Baseline pertama Panduan Ngepas harus mengembalikan **bentuk dasar bar bawah terlebih dahulu**, bukan langsung mengerjakan behavior. Lebar bar mengikuti container mobile dengan margin aman yang kecil, tinggi tidak berlebihan, dan seluruh tahap tampil dalam satu baris horizontal. State default harus compact dan tidak menutupi section. Expanded stepper, auto-active berdasarkan scroll, progressive search, dan motion ditunda sampai baseline ini disetujui lewat screenshot HP.

## Scope yang Ditunda

Tidak ada perubahan pada header, progressive search, backend, route, drawer, auth JWT, product offers, atau akun publik pada slice baseline pertama. Branch eksperimen sebelumnya tidak menjadi basis patch baru; baseline sebaiknya dibuat dari `feat/mobile-nav-drawer-motion-v1` atau commit aman yang tidak membawa logic header eksperimental.

## Baseline 01 — Geometry Only

Baseline pertama mengubah hanya container Panduan Ngepas dari `inset-x-4/max-w-md` menjadi container terpusat dengan lebar maksimum `20rem`, sehingga bar tidak otomatis memenuhi lebar mobile. Arah chevron juga dikoreksi: state compact menampilkan chevron bawah untuk affordance membuka, sedangkan state expanded menampilkan chevron atas untuk affordance menutup.

`git diff --check` dan `npx vite build` lulus. Preview sandbox berada pada breakpoint desktop sehingga guide memakai `lg:hidden` dan tidak dapat dinilai secara visual dari browser tersebut. Review utama harus dilakukan dari HP pada branch baseline ini. Tidak ada perubahan behavior, header, search, drawer, atau backend.
