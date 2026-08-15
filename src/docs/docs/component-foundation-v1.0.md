# Ngepas Component Foundation v1.0

**Status:** Draft implementasi bertahap  
**Branch:** `feat/ngepas-design-tokens-v1`  
**Depends on:** `design-tokens-ngepas-v1.0.md`  
**Scope:** Frontend reusable components; tidak mengubah backend, auth, atau database.

## Tujuan

Design token mengunci nilai dasar. Component foundation mengunci cara nilai tersebut dipakai. Dengan begitu, halaman tidak lagi membuat button, card, input, atau section dengan ukuran berbeda-beda untuk fungsi yang sama.

> Page mengatur komposisi dan state. Component mengatur tampilan, accessibility, dan interaksi lokal. Context/Service tetap menjadi pemilik data dan business logic.

## Boundary komponen

| Komponen | Lokasi target | Tanggung jawab | Bukan tanggung jawab |
|---|---|---|---|
| `Container` | `src/components/ui/Container.jsx` | Lebar maksimum dan gutter responsive | Fetch data atau menentukan section |
| `Section` | `src/components/ui/Section.jsx` | Vertical rhythm, id, dan surface opsional | Menentukan isi section |
| `SectionHeading` | `src/components/ui/SectionHeading.jsx` | Eyebrow, title, description, action slot | Mengambil data atau navigasi otomatis |
| `Button` | `src/components/ui/Button.jsx` | Primary, secondary, ghost, danger, loading | Menyimpan state global |
| `IconButton` | `src/components/ui/IconButton.jsx` | Target sentuh minimum dan aria-label | Menentukan ikon bisnis |
| `SearchInput` | `src/components/ui/SearchInput.jsx` | Input query, submit, clear, filter trigger | Melakukan fetch langsung |
| `Badge` | `src/components/ui/Badge.jsx` | Label status/curation/rating | Menghitung status produk |
| `ProductCard` | `src/components/discover/ProductCard.jsx` | Presentasi product DTO, favorite, detail CTA | Mengambil product dari API |
| `CategoryCard` | `src/components/discover/CategoryCard.jsx` | Presentasi kategori dan active state | Memiliki taxonomy sendiri |
| `FilterPanel` | `src/components/discover/FilterPanel.jsx` | Render filter value dan callback perubahan | Mengubah URL/API sendiri |
| `TrustStrip` | `src/components/discover/TrustStrip.jsx` | Menampilkan trust points statis | Membuat klaim baru tanpa keputusan produk |
| `BottomNavigation` | `src/components/navigation/BottomNavigation.jsx` | Navigasi mobile dan active item | Menambahkan route yang belum disetujui |

## API minimum

### `Button`

```jsx
<Button variant="primary" size="md" loading={false} disabled={false} onClick={handler}>
  Mulai Cari Sekarang
</Button>
```

Variant awal: `primary`, `secondary`, `ghost`, `danger`. Size awal: `sm`, `md`, `lg`. Semua variant mempunyai focus ring dan target sentuh yang konsisten.

### `IconButton`

```jsx
<IconButton label="Simpan ke favorite" pressed={favorite} onClick={toggleFavorite}>
  <Heart />
</IconButton>
```

`label` wajib ada. `pressed` dipakai untuk favorite atau toggle state. Ikon tidak boleh menjadi satu-satunya informasi yang bisa ditebak user.

### `SearchInput`

```jsx
<SearchInput
  value={query}
  onChange={setQuery}
  onSubmit={submitSearch}
  onFilter={openFilter}
  placeholder="Cari produk terbaik, kategori, atau merek..."
/>
```

Input hanya mengirim callback. Ia tidak mengetahui context, service, endpoint, atau route bisnis.

### `ProductCard`

```jsx
<ProductCard
  product={productViewModel}
  favorite={favorites.includes(product.slug)}
  onFavorite={toggleFavorite}
  href={`/discover/${product.slug}`}
  compact={false}
/>
```

Card menerima `productViewModel` yang sudah dinormalisasi oleh page/context. Field minimum: `slug`, `name`, `image`, `category`, `price`, `rating`, `reviewCount`, `badge`, dan `marketplace`.

## State wajib

Komponen interaktif tidak hanya dibuat untuk happy path. State minimum yang harus tersedia:

| Komponen | State |
|---|---|
| Button | default, hover, focus, disabled, loading |
| SearchInput | empty, filled, focused, filter active, disabled |
| Badge | primary, soft, accent, danger |
| ProductCard | default, favorite active, image fallback, unavailable |
| CategoryCard | default, active, disabled |
| FilterPanel | closed, open, changed, reset |
| BottomNavigation | active, inactive |

## Aturan arsitektur

Komponen boleh memakai `Link`, ikon, dan callback props. Komponen tidak boleh memanggil `fetch()`, context data, atau SQL. Data flow tetap mengikuti:

```text
Page/Context → normalized view model → reusable component → callback kembali ke page/context
```

Jangan mengekstrak komponen hanya karena file menjadi panjang. Ekstraksi dilakukan jika pola dipakai minimal dua tempat, memiliki state/visual contract yang jelas, atau merupakan primitive yang akan dipakai lintas halaman.

## Urutan implementasi

Implementasi dimulai dari `Container`, `Section`, `SectionHeading`, `Button`, dan `IconButton`. Setelah primitive stabil, lanjut ke `SearchInput`, `Badge`, `ProductCard`, `CategoryCard`, dan `FilterPanel`. Satu slice Discover kemudian dimigrasikan sebagai proof of system. Migrasi CategoryPage dilakukan setelah kontrak SearchInput, SelectField, dan ProductCard terbukti.

## Definition of Done

Component foundation dianggap selesai jika komponen memiliki props yang terdokumentasi, memakai token tanpa hex/spacing acak, memiliki focus state, memiliki target sentuh yang layak, tidak melakukan fetch langsung, lulus build, dan dipakai minimal pada satu slice Discover tanpa mengubah behavior search, filter, favorite, atau Product Detail.


## Status Implementasi

Foundation reusable tahap pertama sudah tersedia di `src/components/ui/`, `src/components/discover/`, dan `src/components/navigation/`.

Komponen yang sudah dibuat adalah `Container`, `Section`, `SectionHeading`, `Button`, `IconButton`, `Badge`, `SearchInput`, `ProductCard`, `CategoryCard`, `FilterPanel`, dan `BottomNavigation`. Komponen-komponen tersebut mengonsumsi token dari `src/styles/tokens.css` dan tidak membuat sumber warna, radius, atau spacing baru.

Discover sudah memakai `SectionHeading`, `ProductCard`, `FilterPanel`, dan `BottomNavigation` sebagai proof of system. State business tetap berada di halaman dan context; komponen hanya menerima props serta callback. Dengan demikian, component foundation tidak mengambil data API langsung dan tidak mengubah alur Component → Context → Service.

Validasi tahap ini: `npx vite build` berhasil dan `git diff --check` bersih. Migrasi berikutnya dilakukan per slice, dimulai dari `DiscoverHeader`, `CategoryStrip`, dan Hero setelah kontrak visualnya direview.
