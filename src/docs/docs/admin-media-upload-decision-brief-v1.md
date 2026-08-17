# Admin Media Upload — Decision Brief A4 v1

> **Status:** Decision brief — belum disetujui untuk implementasi  
> **Tanggal:** 17 Agustus 2026  
> **Pemilik keputusan:** Founder Ngepas  
> **Prasyarat:** `admin-media-upload-contract-v1.md` telah dipromosikan melalui PR #15.  
> **Bukan implementasi:** Dokumen ini tidak mengubah aplikasi, API, database, storage, secret, domain, dependensi, maupun production data.

## 1. Tujuan keputusan

Kontrak media A3 sudah mengunci **cara kerja aman** untuk upload produk: admin terautentikasi mengirim berkas ke backend, backend memvalidasi dan mentransformasi aset, lalu object storage menyimpan output WebP. A4 baru boleh dimulai setelah keputusan operasional berikut memiliki pemilik yang jelas: **provider storage, kepemilikan akun, domain asset, kelas biaya, kebijakan recovery, dan mekanisme cleanup**.

Ngepas saat ini masih mempertahankan `image` dan `gallery` sebagai URL eksternal. Karena itu, A4 tidak boleh memigrasikan URL lama, tidak boleh menyimpan media di Railway Volume, Vercel, atau repository, serta tidak boleh menambah multipart endpoint sebelum brief ini disetujui.

## 2. Rekomendasi awal yang dapat direview

Untuk tahap Ngepas saat ini—solo developer, traffic awal belum tervalidasi, dan kebutuhan inti adalah upload admin yang sederhana—rekomendasi awal adalah **Cloudflare R2 dengan satu bucket privat, custom domain production yang dikelola pada akun yang sama, dan jalur upload tetap melalui backend**. Ini bukan keputusan otomatis: rekomendasi hanya dapat berlaku bila akun pemilik, domain, dan kebijakan biaya dikonfirmasi founder.

R2 memiliki pricing publik yang sederhana untuk storage dan operasi, termasuk tier gratis bulanan serta egress tanpa biaya. Namun, custom domain R2 harus berada pada zone Cloudflare pada akun yang sama; URL `r2.dev` hanya untuk non-production dan tidak boleh dijadikan alamat asset produksi.[^r2-pricing][^r2-public] Keterbatasan kompatibilitas S3 juga harus tetap dianggap sebagai risiko integrasi, bukan diasumsikan identik dengan Amazon S3.[^r2-s3]

## 3. Opsi provider yang dinilai

| Opsi | Kesesuaian dengan A3 | Kelebihan operasional | Konsekuensi / batas | Sikap pada A4 |
|---|---|---|---|---|
| **Cloudflare R2** | S3-compatible dan dapat menyajikan asset melalui custom domain | Model biaya storage/operasi mudah diprediksi untuk asset awal; egress R2 tidak dikenai biaya; caching dan kontrol akses tersedia di jalur custom domain | Domain asset harus dikelola dalam akun Cloudflare yang sama; `r2.dev` tidak layak untuk produksi; tidak semua fitur S3 tersedia | **Direkomendasikan bersyarat** |
| **Backblaze B2** | Menyediakan S3-compatible API dan pre-signed URL upload/download | Storage berbiaya rendah; S3 compatibility membantu bila SDK abstraksi diperlukan | Beberapa fitur S3 tidak penuh, termasuk object ACL, IAM roles, tagging, website configuration, dan browser POST pre-signed | Alternatif bila R2/domain tidak dapat disatukan |
| **Amazon S3** | Referensi API S3 paling lengkap; pre-signed URL matang | Opsi paling fleksibel untuk skala dan IAM yang kompleks | Billing dan konfigurasi lebih luas; menambah beban operasional yang belum dibutuhkan pada A4 | Tunda sampai kebutuhan skala/enterprise terbukti |

| Fakta biaya publik per 17 Agustus 2026 | R2 | B2 | S3 |
|---|---:|---:|---|
| Storage awal | US$0,015/GB-bulan; 10 GB-bulan gratis | mulai US$6,95/TB-bulan; 10 GB gratis | tergantung region dan storage class |
| Transfer keluar | tidak dikenai biaya oleh R2 | gratis sampai tiga kali rata-rata storage bulanan | tergantung region, tujuan, dan layanan |
| Catatan | Masih terdapat charge per operasi | Fitur API S3 tidak seluruhnya setara | Model charge terdiri dari beberapa dimensi |

Angka di atas bukan perkiraan tagihan Ngepas maupun janji biaya. Founder tetap harus membaca halaman pricing provider sebelum mengaktifkan billing, karena penggunaan aktual, wilayah, cache, dan request dapat mengubah biaya.[^r2-pricing][^b2-pricing][^s3-pricing]

## 4. Keputusan yang wajib dipilih founder

| ID | Keputusan | Pilihan yang aman | Rekomendasi awal | Dampak jika tidak dipilih |
|---|---|---|---|---|
| D1 | Provider dan akun pemilik | R2 / B2 / S3; akun owner yang dapat diakses founder, bukan akun pribadi kontributor | R2 pada akun owner | Tidak boleh membuat bucket atau secret |
| D2 | Region / locality data | Region/default provider yang dicatat eksplisit | R2 `auto` hanya bila R2 dipilih | Tidak boleh menulis konfigurasi provider |
| D3 | Domain asset produksi | Subdomain khusus, misalnya `media.<domain-Ngepas>`; domain harus benar-benar dimiliki dan dikelola founder | Custom domain; tidak memakai URL development | Asset production tidak boleh dipublikasikan |
| D4 | Batas biaya dan alert | Limit bulanan serta pemilik notifikasi billing | Starter cap yang dipilih founder sebelum billing aktif | Tidak boleh mengaktifkan layanan berbayar |
| D5 | Recovery objective | Lokasi backup metadata dan prosedur restore yang diuji | Restore drill sebelum production media | Tidak boleh menjalankan migration atau menghapus asset |
| D6 | Cleanup | Manual terkontrol dahulu, atau job terjadwal yang memiliki owner dan log | Manual dulu; scheduler hanya setelah ada contract job | Tidak boleh menghapus orphan otomatis |
| D7 | Jalur A4 | Backend-mediated upload + Sharp, atau menunda A4 | Backend-mediated sesuai A3 | Tidak boleh membuat pre-signed direct upload di luar A3 |

## 5. Batas rekomendasi implementasi A4

### 5.1 Jalur upload yang dipertahankan

Pilihan A4 yang kompatibel dengan A3 adalah **browser → backend Express dengan JWT admin → validasi signature/MIME/dimensi → Sharp → object storage**. Upload langsung dari browser ke storage melalui pre-signed URL **tidak termasuk A4 v1**, meskipun banyak provider mendukungnya. URL pre-signed bersifat bearer token, sehingga memerlukan kontrak authorization, expiry, checksum, dan observability tersendiri.[^s3-presigned]

### 5.2 Domain dan akses publik

Bucket harus tetap privat pada jalur tulis. Hanya output WebP `ready` yang boleh disajikan lewat domain asset production setelah D3 selesai. Tidak ada listing bucket, URL development, atau credential provider di frontend. Bila custom domain belum tersedia, A4 ditunda; tidak ada fallback ke `r2.dev`, Railway Volume, Vercel filesystem, atau repository.

### 5.3 Backup dan recovery

Tidak ada asumsi backup otomatis untuk database maupun media pada kondisi repository saat ini. Sebelum migration, A4 harus memiliki runbook yang menuliskan lokasi backup metadata, export cadangan URL produk yang ada, pemilik recovery, langkah restore, bukti uji restore, dan batas kehilangan data yang founder terima. Tanpa bukti recovery ini, migration dan cleanup produksi tidak boleh dijalankan.

### 5.4 Cleanup

Pada rilis A4 pertama, cleanup otomatis **ditunda**. Admin atau owner melakukan cleanup manual dengan daftar `staged`/orphan yang dapat diaudit. Job otomatis baru dapat diusulkan setelah ada runner yang persistent atau scheduler yang disetujui, log eksekusi, retry yang terbatas, dan guard yang mencegah penghapusan asset berelasi aktif.

## 6. Kriteria mulai A4

Semua kondisi berikut harus bernilai **ya** sebelum satu baris implementasi upload dibuat.

| Gate | Bukti minimum |
|---|---|
| Provider dipilih | Jawaban D1–D2 dicatat di issue/PR dan akun dimiliki founder |
| Domain asset siap | Jawaban D3, ownership domain, dan jalur DNS terdokumentasi |
| Biaya disetujui | Jawaban D4 termasuk owner alert billing |
| Recovery dapat dilakukan | Runbook dan bukti restore drill minimal untuk metadata/test object |
| Cleanup aman | Jawaban D6 dengan owner, log, dan rollback; atau manual mode dipilih |
| Kontrak A3 tetap utuh | Tidak ada perubahan diam-diam pada JWT, JSON contract existing, gallery URL lama, atau public flow |
| Scope A4 disetujui | PR proposal A4 menyebut endpoint, migration, dependencies, UI, tests, rollback, dan production verification secara eksplisit |

## 7. Jawaban minimum yang diperlukan dari founder

Founder dapat membalas dengan format berikut tanpa perlu memahami kode.

```text
D1 provider: R2 / B2 / S3 / tunda
D1 akun owner: milik saya / belum ada
D3 domain asset: <subdomain yang dipilih> / belum punya domain
D4 biaya bulanan maksimum: <angka + mata uang> / tunda billing
D5 recovery: manual backup + restore drill / belum siap
D6 cleanup: manual dulu / scheduler nanti
D7 jalur A4: backend-mediated / tunda
```

Apabila ada jawaban `tunda`, A4 tidak dimulai dan kemampuan galeri URL dari A2 tetap menjadi workflow admin yang didukung.

## 8. Catatan audit

Dokumen ini membedakan dua hal yang sering tercampur: **provider bisa mendukung kemampuan teknis** dan **Ngepas sudah siap mengoperasikannya**. Dukungan S3-compatible atau pre-signed URL bukan alasan untuk mem-bypass A3. Keputusan A4 hanya akan dilanjutkan sebagai slice baru ketika semua gate di atas disetujui dan dapat diuji.

## Referensi

[^r2-pricing]: Cloudflare, [R2 pricing](https://developers.cloudflare.com/r2/pricing/), diakses 17 Agustus 2026.
[^r2-public]: Cloudflare, [Public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/), diakses 17 Agustus 2026.
[^r2-s3]: Cloudflare, [S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/), diakses 17 Agustus 2026.
[^b2-pricing]: Backblaze, [B2 Cloud Storage pricing](https://www.backblaze.com/cloud-storage/pricing), diakses 17 Agustus 2026.
[^b2-s3]: Backblaze, [S3-Compatible API](https://www.backblaze.com/docs/cloud-storage-s3-compatible-api), diakses 17 Agustus 2026.
[^s3-pricing]: AWS, [Amazon S3 pricing](https://aws.amazon.com/s3/pricing/), diakses 17 Agustus 2026.
[^s3-presigned]: AWS, [Download and upload objects with presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html), diakses 17 Agustus 2026.
