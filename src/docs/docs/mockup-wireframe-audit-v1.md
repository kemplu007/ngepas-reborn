# Ngepas Mockup → Wireframe Audit v1

## Tujuan

Dokumen ini menjadi baseline wireframe sebelum prototype. Semua keputusan visual diambil dari aset referensi repo dan dokumentasi IA; tidak ada progressive search atau improvisasi visual pada tahap ini.

## Sumber yang Dibaca

| Area | Aset / dokumen | Peran wireframe |
|---|---|---|
| Core produk | `src/docs/docs/ngepas-core.md` | Batas produk, route, dan alur kerja |
| IA | `src/docs/docs/navigation-ia-guide-v1.md` | Side drawer versus Panduan Ngepas |
| UI system | `src/docs/docs/uiux-system-v1.1.md` | Urutan Discover, breakpoint, state minimum |
| Header | `src/docs/assets/uiux-v1.1/reference/1000702671.jpg` | Struktur header mobile dan desktop |
| Hero | `src/docs/assets/uiux-v1.1/reference/1000702670.jpg` | Struktur value proposition dan CTA |

## Temuan Header

Mockup Header Discover mendefinisikan dua versi utama. Mobile memakai satu baris header dengan hamburger di kiri, wordmark Ngepas di tengah, notifikasi dan akun di kanan; search menjadi baris fokus tersendiri di bawah header, bukan menggantikan seluruh header secara otomatis. Search focus adalah state terpisah dengan input fokus dan tombol batal. Mockup juga mendefinisikan state menu open, notification open, dan account menu open.

Desktop memakai satu baris dengan wordmark di kiri, search di tengah, lalu Bandingkan, Notifikasi, dan Akun di kanan. Filter/quick access berada di dalam area search sebagai affordance tambahan. Wireframe tidak boleh mengganti struktur ini dengan progressive wordmark-to-favicon experiment.

## Temuan Hero

Mockup Hero memiliki headline utama, penjelasan singkat, tiga bullet manfaat, CTA utama `Mulai Cari Sekarang`, CTA sekunder `Cara Kerja Ngepas`, visual produk/ilustrasi, dan informasi pendukung marketplace. Mobile menempatkan headline dan manfaat lebih dulu lalu CTA dan visual; desktop memakai komposisi dua area dengan copy di kiri dan visual di kanan. Hero harus menjawab manfaat Ngepas dalam beberapa detik dan tidak berubah menjadi banner promo yang mengambil alih fungsi utama.

## Wireframe Rule Sementara

Sebelum prototype, setiap screen akan dipetakan dengan format `screen → component → state → action → destination`. Struktur default dan state focus/open harus dipisahkan. Mockup menjadi sumber bentuk; route truth dan IA menjadi sumber destination. Komponen yang belum memiliki destination nyata tidak akan diaktifkan sebagai navigasi.

## Temuan Kategori Populer

Mockup Kategori Populer memakai section heading dengan CTA `Lihat Semua`, daftar icon category card, horizontal scroll pada mobile, grid delapan kolom pada desktop, dan information strip singkat di bawahnya. State minimum yang harus masuk wireframe adalah default, hover desktop, active, disabled, serta variasi icon outline/filled/dutone dari design system. Label harus singkat dan konsisten; kartu tidak boleh berubah menjadi card besar dengan copy panjang.

## Temuan Pilihan Ngepas

Mockup Pilihan Ngepas menampilkan judul section, penjelasan singkat, filter/tab horizontal, daftar ProductCard horizontal pada mobile dan grid lima kolom pada desktop. ProductCard wajib memprioritaskan badge kurasi, favorite, gambar, nama, rating/review count, harga, marketplace, dan CTA `Lihat Detail`. Di bawah daftar ada trust strip yang menjelaskan perbandingan marketplace. State minimum: default, hover desktop, loading, badge variants, dan CTA detail. Wireframe tidak memasukkan checkout di Ngepas.

## Temuan Artikel & Tips

Mockup Artikel & Tips memakai judul dan deskripsi singkat, tab filter kategori, card artikel horizontal pada mobile, grid tiga kolom pada desktop, dan CTA `Lihat Semua Artikel`. Setiap card membawa badge tipe konten, gambar relevan, judul jelas, ringkasan singkat, waktu baca, dan tanggal. State minimum: default, hover desktop, loading, empty, serta CTA semua artikel. Section ini bersifat edukasi keputusan, bukan placeholder dekoratif.

## Temuan Why Ngepas

Mockup Why Ngepas memakai judul dan deskripsi singkat, daftar keunggulan berbasis benefit, bukti kepercayaan, dan trust strip. Mobile memakai horizontal card/scroll; desktop memakai empat kolom. Konten harus menjawab mengapa user mempercayai kurasi Ngepas, bukan klaim marketplace atau checkout. State minimum: default, hover desktop, active, dan disabled bila card interaktif digunakan.

## Batas Wireframe Discover v1

Screen Discover v1 mengikuti urutan: Header → Hero/Value Proposition → Kategori Populer → Pilihan Ngepas → Trending Minggu Ini → Artikel & Tips → Cara Kerja Ngepas → Why Ngepas → Trust/closing. Panduan Ngepas bukan screen baru; ia adalah overlay/navigation aid yang dipetakan terpisah setelah struktur halaman disetujui.
