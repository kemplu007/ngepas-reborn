# Mobile Header Logic Audit v1

## Diagnosis

Screenshot user menunjukkan state yang tercampur: search terbuka menempati row header sementara konten sudah berada di posisi scroll yang jauh, notifikasi masih tampil bersamaan dengan mode search, dan Panduan Ngepas yang expanded menutupi heading Trending. Pada implementasi sebelumnya, state search berada lokal di header sehingga guide tidak dapat membuka search secara konsisten, state active guide selalu `start`, dan guide tidak menutup ketika user mulai scroll.

## Logic Contract Baru

State search sekarang dikendalikan oleh halaman Discover. State default harus tertutup. Saat user memilih search, menu mobile dan notifikasi disembunyikan, logo resmi `/favicon.svg` tetap terlihat, input mengambil ruang sisa header, dan tombol close berada di ujung input. Submit search menutup mode search setelah mengarahkan user ke hasil. Escape dan tombol close mengembalikan fokus ke trigger search.

Panduan Ngepas sekarang mengikuti posisi viewport secara sederhana: `Mulai` sebelum kategori, `Jelajah` saat kategori terlihat, dan `Pahami` saat hasil produk terlihat. Tahap `Mulai` membuka search secara eksplisit. Guide expanded otomatis menutup ketika user scroll agar panel tidak terus menutupi section yang sedang dibaca. Chevron mengikuti affordance yang benar: collapsed menampilkan tanda buka, expanded menampilkan tanda tutup.

## Validation

`git diff --check` dan `npx vite build` lulus setelah perbaikan JSX. Smoke test DOM mengonfirmasi state awal form tertutup, state open menampilkan form, menu dan bell memiliki class tersembunyi, asset `/favicon.svg` tersedia, dan Escape mengembalikan form ke state tertutup. Fokus autofocus tetap perlu dikonfirmasi dari viewport mobile nyata karena preview sandbox yang dipakai berada di breakpoint desktop sehingga elemen mobile `lg:hidden` tidak benar-benar terlihat.

## Scope Boundary

Patch ini hanya menyentuh logic frontend Discover dan komponen guide/header. Tidak ada perubahan backend, auth JWT admin, product offers, akun publik, atau route baru. Branch kerja: `fix/mobile-header-logic-v1`.
