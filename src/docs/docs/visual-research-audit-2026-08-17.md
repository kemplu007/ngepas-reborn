# Ngepas Visual Research Audit — 2026-08-17

**Status:** Draft read-only; belum ada perubahan source aplikasi.

**Tujuan:** Membandingkan layar aktif Ngepas dengan pola UI yang terbukti, lalu membentuk backlog polish kecil. Dokumen ini tidak mengubah Core, route, auth JWT, API, database, atau alur belanja.

## Baseline yang diamati

| Layar aktif | Route | Observasi awal | Batas audit |
|---|---|---|---|
| Discover | `/` dan `/discover` | Desktop live menampilkan header sangat padat, hero dengan pesan dan gambar, kategori horizontal, hasil kurasi, trending, artikel, cara kerja, dan trust section. Struktur konten sudah sesuai urutan Discover di UI/UX System, tetapi kualitas hierarchy, density, dan surface perlu dibandingkan dengan pola mobile yang matang. | Jangan menambah section atau mengubah sequence Discover. |
| Product Detail | `/product/:slug` | Route detail terpisah dari `/discover/:slug` dan sudah memakai foundation reusable. Fokus audit: gallery, hierarchy harga/reason, serta reachability CTA affiliate pada mobile. | Jangan mengubah affiliate behavior, detail route, atau data contract. |
| Admin product form | `/admin/products/new` dan `/admin/products/:id/edit` | Form sudah memiliki foundation dan state gallery; fokus audit: density field, pembagian langkah, feedback validasi, serta touch ergonomics. | Jangan mengubah auth, payload, controller, atau persistence yang baru dipromosikan. |

### Observasi Discover live

- Header saat ini membawa wordmark, tiga nav link, search, filter, action compare, dan account action pada satu baris desktop. Kerapatan ini perlu diuji sebagai masalah prioritas mobile, bukan diperluas dengan control baru.
- Hero memperlihatkan pesan, tiga benefit, dua CTA, gambar besar, label gambar, dan catatan marketplace. Secara konten lengkap, namun ia berisiko terasa berat sebelum pengguna mencapai kategori atau produk pertama.
- Kategori sudah berfungsi sebagai jalan cepat dan memiliki affordance “Selengkapnya”, tetapi treatment visualnya harus dibandingkan dengan hierarchy produk agar tidak tenggelam sebagai dekorasi.
- Dua blok produk memakai struktur kartu yang sama. Audit berikutnya harus menentukan perbedaan hierarchy yang cukup antara “Pilihan Ngepas” dan “Trending Minggu Ini”, tanpa membuat template kartu kedua.
- Kata “Data katalog” serta rating kosong `—` terlihat pada kartu. Ini adalah state informasi yang perlu dipoles agar tetap jujur dan tidak terlihat sebagai data setengah jadi.

### Observasi Product Detail dan admin live

- Route dari kartu Discover menuju `/discover/:slug`, bukan `/product/:slug`; dokumen route truth perlu diperlakukan sebagai otoritas saat slice detail benar-benar dipilih agar tidak terjadi patch pada route yang keliru.
- Product Detail live memakai satu gambar hero besar, badge, kategori, nama, rating, harga, pembaruan harga, dua action, alasan kurasi, spesifikasi, tag kecocokan, dan catatan affiliate. Urutannya sudah mendukung keputusan, tetapi gallery URL yang kini persisten belum terlihat sebagai navigasi visual pada data contoh yang dibuka.
- CTA “Bandingkan Marketplace” hadir dekat harga dan CTA favorite di desktop. Audit mobile perlu menguji reachability dan hierarchy action, bukan mengubahnya menjadi cart atau checkout.
- Akses langsung ke `/admin/products/new` mengarahkan dengan benar ke `/admin/login`. Audit tidak mencoba login atau mengubah auth JWT. Untuk form admin, penilaian visual harus memakai source/component review dan, bila diperlukan, sesi admin yang disediakan founder secara eksplisit.

### Perbandingan terhadap referensi visual resmi tim

- **Header Discover:** implementasi mobile sudah mengikuti struktur inti referensi—menu di kiri, wordmark terpusat, notifikasi di kanan, dan search pada baris tersendiri. Namun referensi juga mencantumkan akses akun; karena akun publik belum masuk scope v1, audit tidak mengusulkan penambahan control palsu. Pada desktop, referensi memberi porsi utama untuk search dan tiga quick action berlabel/berikon; implementasi saat ini memasukkan tiga nav link teks dan kehilangan notifikasi. Ini adalah gap fidelity yang perlu diputuskan sebagai slice header tersendiri, bukan disisipkan ke polish hero.
- **Hero Discover:** referensi mengharuskan headline singkat, tiga manfaat mudah dipindai, dua CTA dengan bobot berbeda, visual produk relevan, dan catatan marketplace yang menumbuhkan trust. Implementasi sudah memuat semua elemen itu, tetapi membungkus copy, visual panorama, label visual, dan disclaimer dalam satu surface ber-border yang panjang. Pada mobile, hierarchy tersebut membuat hero terasa seperti satu blok informasi besar, bukan jembatan cepat menuju kategori dan produk.
- **Kesimpulan fidelity:** polish tidak memerlukan gaya baru atau section baru. Priority-nya adalah memperkecil kompetisi antar-elemen dengan ritme mobile yang lebih ringan, lalu memperjelas peran kategori dan kartu produk sebagai tujuan berikutnya.

### Perbandingan kartu Pilihan Ngepas

- Referensi kartu resmi memakai struktur sangat ringkas: badge kurasi, gambar, nama, rating/review, harga, marketplace, favorite, dan action detail berpenekanan rendah. Current `ProductCard` sudah memiliki susunan data yang setara dan memakai foundation yang benar, sehingga **tidak perlu template kartu kedua**.
- Gap utama berada pada treatment: CTA hijau penuh pada setiap card memiliki bobot hampir sama dengan badge kurasi dan harga; fallback `Data katalog` serta review `—` membuat card terlihat belum selesai ketika data belum tersedia. Polish yang tepat adalah menyempurnakan hierarchy CTA dan presentation state, tanpa mengarang rating, marketplace, atau ulasan.
- Reference juga menempatkan trust strip sesudah product lane. Ngepas sudah memiliki `TrustStrip`; saat slice kartu nanti dikerjakan, spacing ke trust strip perlu dirapikan bersama, bukan dengan menambah surface/card baru.

## Hipotesis audit yang perlu diuji dengan referensi

1. **Discover:** hierarchy hero/header terlalu kompetitif di viewport awal dan section card masih berpotensi terasa seragam atau padat.
2. **Product Detail:** nilai keputusan—alasan kurasi, harga, rating, dan CTA marketplace—harus dapat dipindai lebih cepat pada layar kecil tanpa memberi kesan checkout terjadi di Ngepas.
3. **Admin product form:** form perlu efisien untuk pengisian konten, bukan sekadar meniru layout dashboard desktop pada layar kecil.

## Guardrail riset

- Ambil pola interaksi, information hierarchy, serta spacing rhythm; jangan menyalin aset, logo, copy, atau layout pihak lain secara mentah.
- Referensi eksternal hanya dapat mengusulkan `patch` pada rumah komponen yang sudah ada atau `missing` jika kebutuhan reuse lintas dua surface terbukti.
- Semua rekomendasi harus kompatibel dengan token hijau-kuning, icon outline Lucide, geometri tegas, motion reduced-safe, dan flow yang sudah dikunci Ngepas.
- Implementasi hanya dimulai setelah founder menyetujui backlog slice kecil dan branch terpisah.

## Temuan eksternal yang relevan

### Ketersediaan connector dan referensi visual

- Connector **Mobbin** terdeteksi dan skema pencarian layar tersedia, tetapi hasil pencarian ditolak karena akun memerlukan paket berbayar. Tidak ada upgrade yang dilakukan dan tidak ada screen Mobbin yang dipakai sebagai dasar rekomendasi.
- Connector **Whimsical** tercatat aktif di konfigurasi, namun endpoint MCP belum tersedia bagi sesi ini. Wireframe tetap akan dibuat sebagai artefak repo yang dapat dipindahkan ke Whimsical ketika endpoint pulih.
- Beranda publik [Tokopedia](https://www.tokopedia.com/) dipakai sebagai observasi pembanding terbatas: search tampil sebagai utilitas primer di header, sedangkan banner promosional besar berperan setelah jalur navigasi utama. Ngepas tidak akan meniru volume promo, identitas, atau flow transaksi Tokopedia.

| Area | Temuan yang dapat diadaptasi | Relevansi untuk Ngepas | Sumber |
|---|---|---|---|
| Mobile discovery | Layar kecil membutuhkan hierarki “lebih sedikit, tetapi lebih mudah dipindai”; search perlu berada di lokasi konsisten, sedangkan filter sebaiknya berada dalam tray/overlay agar tidak menghabiskan ruang hasil. | Pertahankan search sebagai jalur utama di Discover, ringkas header awal, dan jangan membanjiri layar dengan filter terbuka. | [1] |
| Kategori dan orientasi katalog | Pengguna mobile membangun peta mental katalog dari kategori tingkat atas yang jelas; browsing tematik membantu pengguna yang belum tahu istilah produk spesifik. | Kategori populer Ngepas harus terlihat sebagai jalur keputusan, bukan sekadar deretan kartu hias. Artikel/kurasi dapat berfungsi sebagai browsing bertema, tanpa menambah section baru. | [2] |
| Search dan filter | Search yang sangat terlihat cocok untuk intent tinggi; filter harus ringkas, relevan, serta memperlihatkan dampak pilihan tanpa membebani layar kecil. | Polish harus mengutamakan affordance search/filter dan hit area, bukan membangun filter baru atau search-as-you-type yang membutuhkan scope backend. | [3] |
| Product detail | Pengguna memerlukan nama, gambar, harga, ketersediaan, deskripsi ringkas, dan informasi pembanding yang konsisten untuk memutuskan; gambar tambahan membantu menjawab pertanyaan yang tak dapat dijawab teks. | Prioritaskan gallery Ngepas, blok alasan kurasi, harga/rating/meta, dan urutan informasi yang konsisten. Jangan mengubah Ngepas menjadi checkout. | [4] |
| Gallery dan keputusan mobile | Banyak produk membutuhkan gambar konteks atau skala; kelemahan kecil yang menumpuk pada product page membuat pengguna ragu atau pergi. | Gallery yang baru persisten perlu disajikan sebagai bukti keputusan, bukan sekadar thumbnail dekoratif. | [5] |
| Sticky action | Action utama perlu tetap mudah dijangkau pada mobile, tetapi informasi tidak boleh menjadi “avalanche”; CTA dan trust information dekat titik keputusan mengurangi kebingungan. | Tetap gunakan sticky bottom action **Bandingkan Marketplace** yang sudah menjadi contract, dengan microcopy tegas bahwa checkout terjadi di marketplace. | [6] |
| Form admin | Field yang terkait perlu dikelompokkan secara visual, label perlu dekat dengan input, alur mayoritas field sebaiknya satu kolom, dan action destruktif tidak boleh bersaing dengan save. | ProductForm perlu dipoles melalui pengelompokan yang lebih mudah dipindai dan CTA save yang konsisten; jangan menambah atau menghapus payload hanya demi tampilan. | [7] |
| Validasi form | Error paling membantu ketika muncul dekat field, menjelaskan tindakan perbaikan, dan tidak muncul sebelum pengguna selesai mengisi field. Ringkasan error tidak boleh menjadi satu-satunya petunjuk. | Gunakan feedback inline yang ada atau perkuat treatment visualnya; jangan mengganti error server dengan modal baru atau toast yang tidak mengarahkan ke field. | [8] |
| Mobile entry | Persepsi form panjang meningkatkan beban, sehingga bagian dan input harus punya urutan jelas, focus state tegas, serta kebutuhan ketik diminimalkan. | Untuk pengisian konten istri founder, urutkan form menjadi section yang dapat dipindai dan gunakan hint/format existing dengan lebih jelas, tanpa membuat wizard baru sebelum ada bukti kebutuhan. | [9] |

### Interpretasi untuk scope sekarang

Riset ini **tidak** menjadi alasan untuk menambah fitur autocomplete, review, checkout, marketplace offers, upload gambar, ataupun endpoint baru. Nilainya ada pada urutan visual, penekanan CTA, density field, treatment surface, dan state feedback pada UI yang sudah ada.

## Kesenjangan dan backlog visual yang direkomendasikan

| Urutan | Slice usulan | Masalah yang diselesaikan | Rumah implementasi | Yang sengaja tidak disentuh |
|---|---|---|---|---|
| 1 | **Discover Product Card Rhythm** | Kartu masih terlalu berat karena badge, harga, CTA hijau penuh, dan metadata fallback bersaing dalam satu surface. | `components/discover/ProductCard.jsx`; bila perlu spacing parent pada `Discover.jsx`. | Model produk, route, favorite state, API, data rating, dan marketplace. |
| 2 | **Discover Hero Rhythm** | Hero memenuhi kontrak konten tetapi mobile rhythm masih terasa padat sebelum user mencapai kategori dan produk. | `components/discover/CampaignBanner.jsx` dan data copy yang sudah ada bila benar-benar diperlukan. | Sequence Discover, CTA destination, asset strategy, search/filter logic, dan section baru. |
| 3 | **Product Detail Decision Rhythm** | Gallery, price/meta, alasan kurasi, dan sticky CTA sudah lengkap tetapi perlu ritme scan mobile yang lebih jelas ketika gallery mulai terisi. | `pages/public/ProductDetail.jsx` serta foundation yang telah ada. | CTA affiliate, checkout behavior, persistence gallery, data contract, dan compare feature. |
| 4 | **Admin Product Form Mobile Rhythm** | Heading langkah 1–2 tidak konsisten dengan langkah 3–4; copy tags stale; gallery tidak memberi konteks batas 8 item pada UI. | `pages/admin/ProductForm.jsx` dan primitive existing bila perlu. | Auth JWT, payload, controller, validator backend, wizard baru, dan upload service. |

### Keputusan audit

**Slice pertama yang direkomendasikan adalah _Discover Product Card Rhythm_.** Ia berpengaruh langsung pada layar publik yang paling sering dilihat, memiliki rumah kode tunggal, dan dapat meningkatkan scanability tanpa mengubah data atau flow. Treatment CTA dapat diturunkan dari referensi tim menjadi action outline/quiet yang tetap memiliki target sentuh valid, sementara price dan badge mempertahankan bobot utama.

Header belum direkomendasikan sebagai slice pertama. Ia memiliki gap terhadap referensi desktop, tetapi perbedaan tersebut bersinggungan dengan akses akun publik yang belum masuk scope. Hero dan Product Detail tetap penting, tetapi keduanya sudah lebih dekat dengan referensi visual resmi sehingga perubahan awal berisiko terlalu subjektif. Admin form sebaiknya dikerjakan setelah founder memberi akses sesi admin secara eksplisit untuk review visual real, bukan hanya review source.

## References

[1]: https://www.algolia.com/blog/ux/mobile-search-and-discovery-how-to-create-ultra-user-friendly-ux "Algolia — Mobile Search and Discovery"
[2]: https://baymard.com/blog/mobile-ecommerce-search-and-navigation "Baymard — Mobile E-Commerce Search and Category Navigation"
[3]: https://shopney.co/blog/optimize-ecommerce-mobile-app-search-and-filters "Shopney — Mobile App Search and Filters"
[4]: https://www.nngroup.com/articles/ecommerce-product-pages/ "Nielsen Norman Group — Ecommerce Product Pages"
[5]: https://baymard.com/blog/current-state-ecommerce-product-page-ux "Baymard — Product Page UX"
[6]: https://www.convertcart.com/blog/mobile-product-pages "ConvertCart — Mobile Product Page Audit"
[7]: https://www.nngroup.com/articles/web-form-design/ "Nielsen Norman Group — Website Forms Usability"
[8]: https://www.nngroup.com/articles/errors-forms-design-guidelines/ "Nielsen Norman Group — Reporting Errors in Forms"
[9]: https://www.smashingmagazine.com/2018/08/best-practices-for-mobile-form-design/ "Smashing Magazine — Mobile Form Design"
