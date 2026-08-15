# Discover Mobile Visual Audit v2

## Diagnosis dari screenshot user

Screenshot mobile memperlihatkan tiga masalah utama yang saling memperkuat. Hero menggabungkan terlalu banyak copy, tiga benefit, dua CTA, visual besar, label overlay, dan disclaimer sehingga mengambil terlalu banyak ruang sebelum user mencapai discovery content. ProductCard memakai siluet kartu katalog yang tinggi dengan radius, padding, dan CTA besar yang membuat halaman terasa kaku. Area informasi kepercayaan di bawah carousel tampil sebagai box besar, padahal Component Foundation Ngepas sudah memiliki primitive reusable untuk feedback dan toast.

## Baseline koreksi yang dikunci sebelum coding

| Area | Keputusan baseline | Batasan |
|---|---|---|
| Hero | Hero mobile dipadatkan menjadi satu tugas: memahami positioning Ngepas lalu mulai mencari. Copy diprioritaskan, benefit tidak boleh membuat Hero berubah menjadi halaman penjelasan. Visual tetap editorial tetapi aspect ratio dipendekkan agar Hero tidak memakan dua viewport. | Tidak menambah badge, gradient, progressive search, atau CTA baru. |
| CTA | CTA primer menggunakan `components/ui/Button.jsx` dengan ukuran dan radius foundation. CTA sekunder menjadi text action ringan, bukan tombol kotak kedua. | Tidak ada radius/padding ad hoc di CampaignBanner. |
| Trust/feedback | TrustStrip dipisahkan dari markup halaman menjadi reusable `components/discover/TrustStrip.jsx` atau primitive yang sudah ada, dengan treatment inline yang ringan. ToastContext tetap digunakan untuk notifikasi sementara; TrustStrip tidak menyamar sebagai toast. | Tidak membangun box informasi baru di dalam Discover.jsx. |
| ProductCard | Kartu dibuat lebih editorial: image tetap dominan, metadata diringkas, whitespace terkontrol, dan CTA menggunakan Button foundation. Radius turun ke kontrak md/lg; tidak ada shadow dekoratif berlapis. | Tidak mengubah data product, route, atau favorite behavior. |
| Section rhythm | Section hasil tidak membawa TrustStrip sebagai box besar yang menutup akhir carousel. TrustStrip menjadi reassurance strip yang ringkas dan tidak mengalahkan heading section berikutnya. | Tidak mengubah urutan section atau menambah bottom guide. |

## Component Foundation yang wajib dipakai

`Button.jsx` menjadi sumber tunggal untuk CTA. `Badge.jsx` dipakai hanya untuk status product/image. `IconButton.jsx` dipakai untuk favorite dan action icon. `SectionHeading.jsx` tetap menangani hierarchy section. `ToastContext.jsx` dipakai untuk feedback transient; trust/reassurance bukan toast dan harus memiliki component visual tersendiri agar tidak tercampur secara konsep.

## Urutan patch

Patch berikutnya dikerjakan dalam satu branch review tetapi tetap dalam tiga langkah yang dapat diaudit. Langkah pertama hanya memadatkan Hero. Langkah kedua hanya memindahkan TrustStrip ke reusable component. Langkah ketiga hanya menormalkan ProductCard dan CTA. Build dan screenshot HP dilakukan setelah setiap langkah; bila satu langkah terasa meleset, langkah berikutnya tidak dikerjakan.

## Kriteria lolos mobile

Hero harus berhenti sebelum menghabiskan dua viewport. Headline tetap menjadi fokus pertama, CTA primer terbaca tanpa menambah tinggi yang tidak perlu, dan visual tidak mengalahkan copy. ProductCard harus terlihat seperti unit rekomendasi yang mudah dipindai, bukan kotak katalog berat. TrustStrip harus terbaca sebagai reassurance tipis, bukan panel besar. Semua perubahan wajib menggunakan token dan Component Foundation, tanpa menyentuh backend, auth, route, atau `main`.
