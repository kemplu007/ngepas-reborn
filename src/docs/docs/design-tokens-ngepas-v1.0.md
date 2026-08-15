# Ngepas Design Tokens v1.0

**Status:** Foundation draft untuk review tim  
**Branch:** `feat/ngepas-design-tokens-v1`  
**Sumber kebenaran:** `uiux-system-v1.1.md` dan referensi visual tim Ngepas  
**Implementasi:** `src/styles/tokens.css`

## Tujuan

Token ini mengunci ukuran dasar yang dipakai lintas halaman Ngepas. Tujuannya bukan membuat halaman terlihat penuh dekorasi, melainkan menjaga **ritme, hierarki, keterbacaan, dan konsistensi** agar komponen tidak mlenuk-mlenuk atau berubah ukuran tanpa alasan.

> Prinsip utama: **konsisten lebih penting daripada keren**. Jika sebuah nilai tidak tersedia di token, jangan langsung membuat angka baru. Pilih token terdekat atau jelaskan alasan penambahannya di review.

## 1. Spacing

Ngepas memakai skala dasar **4px**. Jarak kecil dipakai untuk isi komponen, jarak sedang untuk antar-kelompok, dan jarak besar untuk antar-section. Hindari padding acak seperti 13px, 18px, atau 27px pada komponen baru.

| Token | Nilai | Pemakaian |
|---|---:|---|
| `--np-space-1` | 4px | Jarak icon dan label, caption kecil |
| `--np-space-2` | 8px | Gap elemen rapat, badge |
| `--np-space-3` | 12px | Padding compact, gap card kecil |
| `--np-space-4` | 16px | Padding control dan card standar |
| `--np-space-5` | 20px | Gap antar blok dalam card |
| `--np-space-6` | 24px | Padding section kecil |
| `--np-space-8` | 32px | Gap antar kelompok |
| `--np-space-10` | 40px | Jarak section mobile |
| `--np-space-12` | 48px | Jarak section desktop kecil |
| `--np-space-16` | 64px | Jarak section utama |
| `--np-space-20` | 80px | Jarak hero dan section besar |

Kontrak layout: gutter mobile **16px**, tablet **24px**, desktop **24–32px**; container maksimum **1200px**; satu section tidak boleh memakai padding berbeda-beda tanpa alasan UX.

## 2. Typography

Font utama tetap **Geist Variable** sesuai implementasi repo dan referensi visual. Typography memakai sedikit tingkat hierarki supaya user langsung tahu mana judul, penjelasan, metadata, dan aksi.

| Token | Nilai | Pemakaian |
|---|---:|---|
| `--np-text-display` | 44px / 1.08 | Hero desktop; turun ke 36px di mobile melalui utility komponen |
| `--np-text-h1` | 36px / 1.18 | Judul halaman utama |
| `--np-text-h2` | 24px / 1.18 | Judul section |
| `--np-text-h3` | 18px / 1.25 | Judul card atau sub-section |
| `--np-text-body` | 16px / 1.5 | Body utama dan deskripsi |
| `--np-text-small` | 14px / 1.5 | Metadata, tab, helper text |
| `--np-text-caption` | 12px / 1.25 | Label, badge, timestamp |

Bobot yang tersedia hanya regular 400, medium 500, semibold 600, dan bold 700. Jangan membuat semua teks bold; title dan CTA boleh semibold, sedangkan body harus tetap ringan untuk mengurangi kelelahan mata.

## 3. Color

Hijau adalah warna aksi dan kepercayaan. Kuning hanya aksen untuk rating, highlight, atau perhatian ringan. Putih dan neutral menjadi kanvas utama agar halaman terasa tenang.

| Kelompok | Token utama | Aturan |
|---|---|---|
| Primary action | `--np-color-green-700` | Tombol utama, link aktif, logo/brand emphasis |
| Primary hover | `--np-color-green-800` | State hover dan pressed |
| Soft green | `--np-color-green-100` | Background badge, trust card, selected surface |
| Accent | `--np-color-yellow-500` | Rating, titik logo, highlight terbatas |
| Text primary | `--np-color-ink` | Judul dan teks penting |
| Text secondary | `--np-color-muted` | Deskripsi, metadata, helper |
| Border | `--np-color-border` | Divider dan card boundary |
| Canvas | `--np-color-canvas` | Background halaman |
| Surface | `--np-color-white` | Card, input, panel |

Kontras harus menjadi pertimbangan utama. Jangan memakai kuning sebagai teks panjang atau background besar. Jangan memakai hijau tua untuk semua elemen karena akan membuat halaman berat.

## 4. Radius

Radius Ngepas dibuat **moderat dan konsisten**, bukan setiap elemen dibuat sangat membulat. Card dan panel memakai radius 16px, control memakai 12px, badge memakai pill.

| Token | Nilai | Pemakaian |
|---|---:|---|
| `--np-radius-xs` | 4px | Divider kecil atau elemen teknis |
| `--np-radius-sm` | 8px | Badge kecil, chip, compact input |
| `--np-radius-md` | 12px | Button, input, tab, control |
| `--np-radius-lg` | 16px | Product card, category card, panel |
| `--np-radius-xl` | 20px | Hero container atau feature panel |
| `--np-radius-2xl` | 24px | Surface besar yang memang perlu lembut |
| `--np-radius-pill` | 999px | Badge, status, filter chip |

Aturan: jangan mencampur radius 8px, 10px, 14px, dan 18px untuk jenis komponen yang sama. Satu jenis komponen harus punya satu radius utama.

## 5. Shadow dan border

Ngepas menggunakan border tipis sebagai pemisah utama. Shadow hanya digunakan untuk layer yang mengambang seperti dropdown, modal, atau sticky action.

| Token | Pemakaian |
|---|---|
| `--np-shadow-none` | Default untuk surface biasa |
| `--np-shadow-sm` | Card atau control yang perlu sedikit terangkat |
| `--np-shadow-md` | Dropdown, popover, sticky panel |
| `--np-shadow-lg` | Modal atau layer penting |
| `--np-shadow-focus` | Focus ring keyboard/input |

## 6. Ukuran komponen

Control interaktif harus mudah disentuh dari HP. Tinggi standar control adalah 40px, control utama 48px, dan target sentuh minimum 44px.

| Token | Nilai | Pemakaian |
|---|---:|---|
| `--np-control-height-sm` | 32px | Compact badge atau filter desktop |
| `--np-control-height-md` | 40px | Input, tab, button standar |
| `--np-control-height-lg` | 48px | CTA utama dan input search mobile |
| `--np-touch-target` | 44px | Area klik minimum icon/button |
| `--np-card-min-width` | 160px | Card pada horizontal rail mobile |

## 7. Breakpoint

| Breakpoint | Kontrak |
|---|---|
| Mobile | sampai 768px; satu kolom atau horizontal rail terkontrol |
| Tablet | 769–1023px; hierarki tetap sama, grid mulai melebar |
| Desktop | mulai 1024px; container terpusat dan grid multi-kolom |

Breakpoint tidak dipakai untuk mengecilkan desktop secara mentah. Mobile harus menentukan urutan informasi dan target sentuh terlebih dahulu.

## 8. Mapping komponen inti

| Komponen | Spacing | Typography | Radius | Shadow |
|---|---|---|---|---|
| Header | `space-3` sampai `space-4` | small/body | md | none atau sm |
| Search input | `space-3`/`space-4` | small | md | focus |
| Primary button | `space-3`/`space-5` | small, semibold | md | none |
| Product card | `space-3`/`space-4` | h3, small, caption | lg | sm |
| Category card | `space-3` | small, medium | lg | none |
| Hero panel | `space-6` sampai `space-12` | display/h1/body | xl | none atau sm |
| Section | `space-8` sampai `space-16` | h2/body | none | none |
| Bottom navigation | `space-2` | caption | none | md/top divider |
| Modal/dropdown | `space-4` | h3/body | lg | md |

## 9. Aturan untuk agent dan developer

Sebelum membuat komponen baru, cari token yang sudah ada. Jika membutuhkan nilai baru, gunakan kelipatan 4px dan tambahkan ke `tokens.css` hanya setelah alasan UX dicatat. Jangan memasukkan warna hex langsung ke JSX/TSX. Jangan membuat shadow baru di level komponen jika `--np-shadow-*` sudah cukup.

Komponen tidak boleh mengatur ukuran berdasarkan isi yang tidak terkontrol. Judul card perlu line clamp, gambar perlu aspect ratio yang sama, tombol harus punya tinggi tetap, dan grid harus punya gap konsisten. Inilah aturan teknis yang mencegah tampilan “mlenuk-mlenuk”.

## 10. Scope implementasi

Commit awal ini hanya memasang **foundation tokens** dan dokumentasinya. Belum ada refactor massal pada seluruh halaman. Refactor komponen dilakukan bertahap setelah token disetujui, dimulai dari header, search, product card, button, dan section container.
