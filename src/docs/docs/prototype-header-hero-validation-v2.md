# Prototype Header + Hero — Validation v2

## Scope

Slice ini menerapkan ulang Header + Hero Discover berdasarkan wireframe scroll rhythm mobile dan prinsip UX yang disepakati. Scope sengaja dibatasi pada struktur statis, hierarchy, spacing, proporsi, dan aset visual. Progressive search, Panduan Ngepas, quick-nav tambahan, backend, auth, dan route baru tidak termasuk.

## Perubahan utama

- Header mobile kembali menjadi dua row: identity row stabil di atas dan search row terpisah di bawah.
- Header desktop memakai satu row dengan wordmark, navigasi, search, dan action icons.
- Hero memakai satu komposisi utama dengan headline dominan, deskripsi singkat, tiga benefit, satu CTA primer, CTA sekunder ringan, visual editorial, dan marketplace disclaimer.
- Hero memakai aset resmi `src/assets/images/hero-bg.png`, bukan gambar product demo lampu.
- Section berikutnya diberi vertical rhythm tokenized agar Kategori Populer tidak menempel langsung pada Hero.
- Panduan Ngepas dikeluarkan dari slice agar review Header + Hero tidak terganggu overlay atau bottom navigation.

## Validasi teknis

- `git diff --check`: lulus.
- `npx vite build`: lulus; 1832 modules transformed.
- Preview DOM: `hero-bg.png` terdeteksi sebagai aset Hero.
- Preview DOM: Panduan Ngepas tidak terpasang pada slice ini.
- Preview DOM: input mobile `#discover-search` dan desktop `#discover-search-desktop` sama-sama tersedia.
- Preview DOM: CTA primer dan CTA sekunder memiliki target nyata.
- Smoke test viewport sandbox desktop: 1280 × 1100. Mobile layout perlu direview langsung dari perangkat user karena browser sandbox tidak sedang diemulasikan sebagai viewport HP.

## Keputusan review

Slice ini belum dianggap final sampai user memvalidasi dari HP: apakah headline menjadi fokus pertama, Hero terasa sebagai satu komposisi lega, CTA tidak berebut perhatian, gambar tidak terasa seperti kartu produk, dan jarak menuju Kategori Populer memberi napas yang cukup.
