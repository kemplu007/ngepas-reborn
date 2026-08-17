# A4 — Media Zero-Cost Runway & Future Upload Decision Brief v1

> **Status:** Decision brief — jalur nol biaya direkomendasikan untuk direview.
> **Tanggal:** 17 Agustus 2026
> **Pemilik keputusan:** Founder Ngepas
> **Prasyarat:** Kontrak media A3 sudah dipromosikan melalui PR #15.
> **Bukan implementasi:** Dokumen ini tidak membuat akun, billing, storage, secret, domain, endpoint, dependency, migration, atau perubahan production.

## 1. Keputusan inti

Ngepas **tidak perlu masuk ke layanan berbayar untuk mulai produktif**. Product form sudah mendukung `image` dan sampai delapan URL `gallery` HTTPS melalui kontrak JSON yang live. Artinya admin dapat mengisi produk hari ini tanpa upload server, tanpa WebP pipeline, tanpa bucket, dan tanpa perubahan kode.

> Tidak mungkin memperoleh sekaligus **upload terintegrasi satu klik**, **transformasi WebP server-side**, **storage milik sendiri yang tahan lama**, dan **tanpa akun/provider maupun biaya**. Jalur nol biaya yang jujur adalah memakai kemampuan URL yang sudah live terlebih dahulu, lalu menunda integrasi upload sampai kebutuhan operasional serta nilai bisnisnya terbukti.

Keputusan A4 yang direvisi adalah: **tahan implementasi upload native dan billing**. Gunakan jalur URL existing sebagai workflow produktif awal. Provider gratis hanya menjadi pilihan pendukung bila admin membutuhkan tempat upload gambar yang lebih rapi; ia tidak boleh disambungkan ke Ngepas sebelum founder memilihnya secara sadar.

## 2. Jalur operasi sekarang: tanpa billing dan tanpa coding

| Langkah admin dari HP | Alur yang dipakai | Perubahan pada Ngepas | Biaya wajib |
|---|---|---|---|
| 1. Siapkan gambar | Gunakan gambar milik sendiri, materi resmi brand/seller yang memang diizinkan, atau URL asset yang hak penggunaannya jelas. Simpan original di perangkat founder/admin. | Tidak ada | Tidak ada |
| 2. Masukkan produk | Isi detail, harga, dan link affiliate di ProductForm seperti biasa. | Tidak ada | Tidak ada |
| 3. Tempel URL gambar | Tempel URL HTTPS ke gambar utama atau Gallery URL Assistant. A2 sudah menolak URL invalid/duplikat dan membatasi maksimal delapan gambar. | Tidak ada | Tidak ada |
| 4. Terbitkan dan cek | Buka Product Detail publik untuk memastikan seluruh gambar tampil sebelum produk dibagikan. | Tidak ada | Tidak ada |

Jalur ini tidak menjadikan hotlink dari marketplace sebagai fondasi jangka panjang. URL gambar dapat berubah atau aksesnya dapat ditutup oleh pemilik host. Untuk produk yang penting, pilih aset yang memang dikendalikan atau diizinkan pemiliknya; bila ragu, gunakan gambar hasil foto sendiri atau materi resmi yang hak penggunaannya jelas.

## 3. Pilihan host gambar gratis bila workflow URL saja belum nyaman

Admin masih dapat menggunakan host media gratis **secara manual**: upload gambar melalui dashboard provider dari HP, ambil URL HTTPS hasilnya, lalu tempel ke form Ngepas. Tidak ada API key, billing, maupun integrasi kode yang diperlukan pada tahap ini.

| Opsi | Paket gratis resmi | Kelebihan bagi Ngepas awal | Batas yang harus diterima | Sikap |
|---|---|---|---|---|
| **Tetap URL existing** | Tidak perlu provider baru | Paling cepat; cocok untuk menguji pengisian produk sekarang juga; sepenuhnya kompatibel dengan produk live. | Admin perlu memiliki URL gambar yang stabil dan berizin. | **Default sekarang** |
| **Cloudinary Free** | `Free forever`, tanpa kartu kredit; 25 credit bulanan. Fitur termasuk upload, transformasi, CDN delivery, auto-backup, dan revision tracking.[1] | Dapat menjadi lemari gambar gratis milik founder tanpa coding Ngepas; upload dari dashboard dan paste URL. | Credit dibagi untuk storage, bandwidth, dan transformasi; kuota bukan tanpa batas; custom domain tidak termasuk pada Free. | **Pilihan gratis pertama jika butuh upload manual** |
| **ImageKit Forever Free** | $0/bulan; 3 GB storage, 20 GB bandwidth/bulan, 2 users, serta CDN HTTPS/optimasi. Custom domain tidak termasuk.[2] | Kuota storage/bandwidth terlihat jelas dan cukup untuk eksperimen katalog kecil. | Ada batas tetap; URL provider tidak boleh dianggap sebagai domain brand permanen. | Alternatif jika batas Cloudinary kurang cocok |
| **Supabase Free** | $0/bulan, 1 GB file storage dan 5 GB egress; project gratis dipause setelah satu minggu tidak aktif dan tidak memiliki automatic backup.[3] | Tidak ada keunggulan penting dibanding jalur di atas untuk kebutuhan media Ngepas saat ini. | Menambah database/platform yang tidak dibutuhkan; pause dan recovery tidak cocok untuk media publik. | **Tidak dipilih** |

## 4. Rekomendasi runway nol biaya

### Tahap Z0 — Isi konten sekarang

Gunakan **Gallery URL Assistant A2** dan URL HTTPS dari aset yang berhak dipakai. Tahap ini sudah memungkinkan istri/admin mengisi produk tanpa menunggu pengembangan A4. Tidak ada akun baru dan tidak ada biaya wajib.

### Tahap Z1 — Upload manual gratis bila diperlukan

Jika mengumpulkan URL gambar terasa merepotkan, founder dapat membuka **satu akun Cloudinary Free** atas nama founder. Admin mengunggah file dari HP di dashboard Cloudinary, menyalin URL delivery, lalu menempelkannya ke Ngepas. Tahap ini tetap tidak membutuhkan billing, kartu kredit, secret, atau perubahan Ngepas menurut halaman pricing resmi Cloudinary.[1]

ImageKit Forever Free adalah alternatif jika founder lebih menyukai batas 3 GB storage dan 20 GB bandwidth yang eksplisit.[2] Founder memilih **satu**, bukan keduanya, untuk menghindari aset terpencar. Bila belum ingin membuat akun mana pun, tetap berada di Z0; itu keputusan yang valid.

### Tahap Z2 — Baru pertimbangkan A4 native upload

Implementasi upload, Sharp/WebP, bucket, metadata media, dan endpoint baru hanya boleh dibuka setelah milestone berikut tercapai. Semuanya dapat dicek manual; tidak ada analytics atau sistem baru yang perlu dibuat sekarang.

| Milestone produktif yang diusulkan | Bukti sederhana | Mengapa menjadi gate |
|---|---|---|
| Operasi konten berjalan | Admin mampu menerbitkan sedikitnya **20 produk lengkap** tanpa bantuan developer. | Membuktikan workflow admin benar-benar dipakai, bukan sekadar fitur yang terlihat bagus. |
| Ritme konten stabil | Ada pengisian/penyegaran produk selama **empat minggu berturut-turut**. | Membedakan kebutuhan nyata dari kebutuhan sesaat. |
| Nilai bisnis muncul | Ada minimal satu sinyal monetisasi yang dapat dilihat founder, misalnya click/komisi affiliate pada dashboard partner atau permintaan pengguna yang nyata. | Biaya baru dipertimbangkan setelah Ngepas menunjukkan nilai, bukan sebelumnya. |
| Kuota gratis menjadi hambatan | Host gratis menyentuh sekitar **70%** kuota selama dua bulan berturut-turut, atau admin kehilangan waktu berulang karena workflow paste URL. | Memastikan native upload menyelesaikan masalah aktual, bukan spekulasi teknis. |

Angka tersebut adalah **proposal operasional**, bukan syarat produk yang kaku. Founder boleh menaikkan, menurunkan, atau menghapus milestone sesuai kondisi rumah tangga. Sampai milestone disetujui, kata keputusan yang berlaku adalah **tahan A4**.

## 5. Yang secara tegas tidak dilakukan sekarang

| Dilarang dalam runway nol biaya | Alasan |
|---|---|
| Menambah endpoint multipart, Sharp, SDK storage, database table media, atau migration | Semua itu adalah A4 native upload dan harus menunggu gate produktif. |
| Membuat bucket, akun berbayar, kartu billing, secret, custom domain, atau DNS asset | Itu mengunci biaya dan kepemilikan operasional sebelum ada alasan bisnis. |
| Menyimpan gambar di repository, folder static Vercel, Railway Volume, atau base64 database | Bukan storage media production yang aman dan bertentangan dengan batas deployment/operasional proyek. |
| Menghapus URL gallery lama atau melakukan migrasi massal | Produk live harus tetap kompatibel; migrasi hanya dibahas setelah A4 benar-benar disetujui. |
| Menjanjikan WebP otomatis sekarang | WebP otomatis membutuhkan jalur upload/server yang sengaja ditunda. |

## 6. Keputusan founder yang diperlukan sekarang

Tidak ada keputusan biaya yang diperlukan. Founder cukup memilih salah satu jalur di bawah agar backlog jelas.

```text
Jalur media sekarang: Z0 URL existing / Z1 Cloudinary Free / Z1 ImageKit Free
Milestone produktif: setuju proposal / revisi menjadi <tuliskan revisi>
A4 native upload: tahan sampai milestone / diskusikan ulang ketika siap
```

Jika memilih **Z0 URL existing**, tidak ada yang perlu dikonfigurasi. Jika memilih Z1, pembuatan akun tetap dilakukan oleh founder pada waktunya sendiri; Ngepas tidak perlu diubah untuk memakai URL hasil upload manual.

## 7. Bila suatu hari A4 dibuka kembali

Decision brief lama mengenai R2/B2/S3, domain asset, recovery, cleanup, Sharp, dan backend-mediated upload tetap menjadi referensi teknis. Ia baru aktif kembali setelah founder menyatakan milestone produktif terpenuhi dan memberikan approval biaya terpisah. Saat itu, provider tidak dipilih otomatis; kita buat slice proposal baru dengan biaya yang jelas, akun milik founder, recovery procedure yang dapat diuji, serta preview/branch review sebelum runtime berubah.

## Referensi

[1]: https://cloudinary.com/pricing "Cloudinary Pricing"
[2]: https://imagekit.io/plans/ "ImageKit Plans"
[3]: https://supabase.com/pricing "Supabase Pricing"
