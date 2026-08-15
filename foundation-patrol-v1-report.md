# Ngepas Foundation Patrol v1

**Tanggal audit:** 16 Agustus 2026  
**Branch audit:** `fix/discover-mobile-visual-density-v1`  
**Mode:** read-only; tidak ada source code aplikasi yang diubah selama patrol.  
**Tujuan:** memastikan Component Foundation dapat dipakai lintas public dan admin, mencegah duplikasi visual, serta membuat pengembangan berikutnya cukup memperbaiki satu sumber.

## Ringkasan keputusan

Fondasi Ngepas sudah memiliki rumah yang benar di `src/components/ui`, tetapi **authority-nya belum tunggal**. Komponen tokenized seperti `Button`, `IconButton`, `Badge`, `Container`, `Section`, `SectionHeading`, dan `SearchInput` sudah ada; masalah utamanya adalah adopsi runtime belum merata dan beberapa komponen legacy masih hidup di `components/common` serta `components/public`.

Keputusan patrol ini adalah **tidak membuat redesign baru dan tidak membuat rumah baru secara berlebihan**. Kita akan mengunci `components/ui` sebagai rumah foundation visual. File legacy dimigrasikan atau dijadikan wrapper secara bertahap. Rumah baru hanya dibuat untuk kontrak yang memang lintas minimal dua surface, memiliki state/accessibility yang jelas, dan mengurangi duplikasi nyata.

> **Halaman mengatur komposisi dan business flow; foundation mengatur perilaku visual, state, accessibility, dan token.**

Website production boleh tetap live sebagai baseline review. Patrol ini belum mengubah kode production, data backend, auth JWT, atau route.

## Sumber kebenaran

Audit menggunakan Core Ngepas, handoff UI/UX, coding standard, Component Foundation, design tokens, route truth, struktur aktual repository, dan mockup Design System v1.0. Core menetapkan pemisahan Component → Context → Service → API → Backend, prinsip satu file satu tanggung jawab, YAGNI, serta aturan branch terpisah.[^1] Handoff UI/UX menetapkan mockup tim sebagai sumber visual, breakpoint mobile/tablet/desktop, state wajib, dan konsistensi public-admin.[^2] Component Foundation menetapkan komponen presentational menerima data dan callback dari page/context tanpa melakukan fetch.[^3]

Mockup Design System v1.0 memperlihatkan foundation yang harus dapat diterjemahkan ke kode: logo dan application mark, palette green-yellow-neutral, typography Inter, button primary/secondary/accent/disabled, input default/focused/filled/disabled, outline icons, badges, Product Card, Category Card, Feature/Value Card, header desktop/mobile, desktop navigation, mobile bottom navigation, rating, serta prinsip sederhana, jelas, konsisten, fungsional, tepercaya, dan bersahabat.[^4]

## Peta rumah dan penghuni saat ini

| Rumah saat ini | Penghuni penting | Keputusan patrol |
|---|---|---|
| `src/components/ui` | `Button`, `IconButton`, `SearchInput`, `Badge`, `Container`, `Section`, `SectionHeading` | **Rumah authority.** Dipertahankan dan diperkuat. Jangan membuat Button/Input/Card kedua di folder lain. |
| `src/components/discover` | `CampaignBanner`, `ProductCard`, `CategoryCard`, `FilterPanel`, `TrustStrip` | **Feature components.** Dipertahankan sebagai komposisi Discover; visual dasar harus mengonsumsi foundation UI. |
| `src/components/navigation` | `BottomNavigation`, `DiscoveryGuide`, `MobileNavDrawer` | **Public navigation.** Dipertahankan; drawer dapat memakai overlay/drawer primitive bersama, tetapi IA public tetap terpisah dari admin. |
| `src/components/admin` | `ProductTable`, `Sidebar` | **Admin feature/shell.** Business flow tetap di sini; visual table/sidebar perlu migrasi ke foundation. |
| `src/components/common` | legacy `Button`, `ConfirmDialog`, `ProtectedRoute`, `ScrollToTop` | `ProtectedRoute` dan `ScrollToTop` tetap utility. `Button` harus dipensiunkan setelah migrasi. `ConfirmDialog` menjadi wrapper dari dialog foundation. |
| `src/components/public` | legacy `ProductCard`, `Hero`, `Navbar`, `Category`, `Categories`, `CtaBanner`, `FeaturedProducts`, `SearchDropdown`, `WhyNgepas` | **Rumah legacy.** Tidak dihapus massal. Setiap penghuni dipetakan berdasarkan route truth, lalu dimigrasikan atau dipensiunkan setelah replacement tervalidasi. |
| `src/layouts` | `MainLayout`, `AdminLayout` | **Rumah shell.** Dipertahankan. Layout mengatur komposisi dan outlet; primitive visual tidak ditulis ulang di sini. |
| `src/config` | `admin/menu`, `iconMap` | Dipertahankan. Public IA dapat dipusatkan bila drawer dan bottom navigation mulai drift, tetapi tidak dicampur dengan menu admin. |
| `src/context`, `src/services`, `src/data/mock` | state, service, mock fallback | Tidak disentuh dalam Foundation Patrol. Penggantian dummy data adalah sprint terpisah. |

## Audit foundation yang sudah ada

| Foundation | Status | Temuan utama | Keputusan |
|---|---|---|---|
| `ui/Button` | **Patch lalu kunci** | Kontrak variant dan size sudah benar serta memiliki loading/disabled/focus. Masih ada `duration-200` hardcoded dan warna danger raw. | Jadikan satu-satunya authority Button. Patch token motion dan semantic danger sebelum migrasi massal. |
| `common/Button` | **Migrate lalu retire** | Memakai radius, warna, shadow, duration, dan scale hardcoded. Ini adalah konflik authority langsung. | Tidak membuat Button baru. Cari semua pemakai, migrasikan ke `ui/Button`, lalu hapus atau ubah menjadi compatibility wrapper sementara. |
| `ui/IconButton` | **Patch ringan** | Sudah memiliki label, pressed, variant, touch target, dan focus ring. API belum memiliki size serta state loading yang eksplisit. | Pertahankan. Tambahkan size/disabled hanya bila ada kebutuhan runtime nyata dari header, table, dan admin. |
| `ui/SearchInput` | **Migrate ke runtime** | Presentational dan callback boundary sudah sesuai, tetapi belum dipakai oleh live page; clear/filter masih raw button inline. | Pakai di DiscoverHeader dan admin list filter. Clear/filter dapat memakai `IconButton`. |
| `ui/Badge` | **Patch semantic** | Variants sudah ada. Danger masih menggunakan `red-50/red-700` raw class. | Pertahankan API, arahkan ke semantic token. Jangan membuat `StatusBadge` sebelum variant Badge terbukti tidak cukup. |
| `ui/Container` | **Patch contract** | Rumah layout sudah tepat, tetapi memakai `--np-layout-container` dan gutter yang tidak sepenuhnya selaras dengan token/layout live. | Selaraskan nama token dan jadikan Container dasar public/admin. |
| `ui/Section` | **Keep setelah Container** | Surface dan rhythm sudah terdefinisi serta mendelegasikan ke Container. | Tidak membuat wrapper section lain. Audit adopsi admin setelah Container dikunci. |
| `ui/SectionHeading` | **Keep** | Kontrak eyebrow/title/description/action sudah berguna lintas surface. | Pertahankan; migrasikan heading inline secara bertahap. |
| `discover/ProductCard` | **Keep sebagai feature composition** | Sudah lebih dekat ke mockup dan memakai token. | Jadikan card Discover resmi; audit DTO/fallback/image state lalu migrasikan legacy ProductCard. |
| `public/ProductCard` | **Migrate lalu retire** | Masih hardcoded, memakai route `/product/:slug`, dan visual berbeda dari Discover ProductCard. | Satu kontrak card untuk route publik; route destination harus dipastikan sebelum migrasi. |
| `discover/CategoryCard` | **Keep + audit state** | Sudah menjadi feature component. | Pastikan empty/image/error/active state dan icon registry konsisten. |
| `FilterPanel` | **Keep + extract only if needed** | Surface custom dan motion sudah tokenized; select/reset masih lokal. | Jangan membuat panel kedua. Jika admin membutuhkan pola sama, ekstrak primitive field/filter hanya setelah kontrak jelas. |
| `TrustStrip` | **Keep** | Sudah reusable dan menggantikan markup inline Discover. | Pertahankan sebagai feature component, bukan foundation generik sebelum ada pemakai kedua. |
| `BottomNavigation` | **Keep + IA audit** | Sudah tokenized, tetapi item IA hardcoded lokal. | Pertahankan; sentralisasi config hanya jika drawer/bottom nav mulai tidak konsisten. |
| `MobileNavDrawer` | **Keep + overlay extraction later** | Focus return, Escape, body lock, portal, inert, dan motion sudah lebih matang. | Tidak copy-paste ke admin. Kandidat sumber perilaku untuk `Drawer`/`OverlaySurface` generik setelah kontraknya ditulis. |
| `ConfirmDialog` | **Migrate to dialog foundation** | Legacy; belum jelas portal/focus trap/Escape/reduced-motion/shared Button. | Buat `ui/Dialog` generik, lalu `common/ConfirmDialog` menjadi wrapper semantik. |

## Kecocokan terhadap mockup Design System v1.0

| Area mockup | Kondisi implementasi | Gap | Prioritas |
|---|---|---|---|
| Logo/application mark | Logo resmi tersedia dan tidak boleh dibuat ulang. | Header/admin shell masih menulis wordmark lokal dan belum seluruhnya memakai identity asset yang sama. | P1 |
| Typography | Token typography tersedia. | Banyak halaman legacy memakai ukuran dan warna Tailwind langsung. | P1 |
| Palette | Token brand tersedia. | Admin dan legacy public masih dominan `emerald-*`, `slate-*`, `green-*`, `red-*` raw. | P0 |
| Buttons | Foundation `ui/Button` sudah ada. | Discover, admin form, table, Hero, ProductDetail masih memiliki raw buttons/link CTA. | P0 |
| Input fields | `SearchInput` sudah ada. | CategoryPage, ProductForm, CategoryForm, ProductTable filter, dan DiscoverHeader masih raw input/select. | P0 |
| Icons | Lucide registry tersedia. | Sebagian UI masih memakai emoji untuk rating, CTA, info, dan status; icon action belum seragam. | P1 |
| Badges/labels | `Badge` sudah ada. | ProductDetail, ProductTable, ProductCard legacy memakai raw pills. | P1 |
| Product Card | Discover card sudah dipatch. | Legacy public card masih hidup dan dipakai ProductDetail/CategoryPage. | P0 |
| Category Card | Discover card ada. | CategoryPage membuat room/category card inline dengan resep lokal. | P1 |
| Feature/Value Card | TrustStrip mendekati pola value card. | Belum ada base surface/card primitive yang bisa dipakai public dan admin tanpa mengikat copy. | P1 |
| Header/navigation | Public header/drawer/bottom nav ada. | Admin shell terpisah, raw controls, motion lokal, dan IA/config belum disatukan pada level behavior. | P1 |
| Rating | Product data menampilkan rating. | Belum ada rating primitive yang konsisten dengan star count/label dan state. | P2 |
| UI states | Loading/empty/error ada tersebar. | Belum ada state primitives atau visual contract yang seragam untuk public/admin. | P1 |
| Spacing/radius/shadow | Token tersedia. | Legacy masih memakai `rounded-xl/2xl/3xl`, shadow, px/py, dan duration mentah. | P0 |

## Rumah baru yang benar-benar dibutuhkan

Rumah utama **tidak perlu ditambah sekarang**. `src/components/ui` masih cukup sebagai rumah foundation dan penambahan subfolder terlalu dini akan menambah navigasi mental. Namun beberapa penghuni baru memang diperlukan karena pola sudah muncul lintas public dan admin.

| Penghuni yang diusulkan | Rumah | Alasan | Kapan dibuat |
|---|---|---|---|
| `Field` atau `FormField` | `src/components/ui` | Label, helper, error, required, disabled, dan focus state diperlukan oleh ProductForm serta CategoryForm. | P1, sebelum migrasi form. |
| `SelectField` | `src/components/ui` | Select sudah muncul pada FilterPanel, CategoryPage, ProductForm, dan CategoryForm. | P1, setelah kontrak native select disepakati. |
| `TextareaField` | `src/components/ui` | ProductForm memiliki textarea dengan kebutuhan label/error/disabled. | P1, bersama FormField; boleh menjadi variant `Field` bila API tetap sederhana. |
| `CheckboxField` atau `Switch` | `src/components/ui` | Status category dan checkbox table membutuhkan label, checked, disabled, focus, dan touch target. | P1, pilih satu berdasarkan kebutuhan nyata; jangan membuat keduanya sekaligus tanpa use case. |
| `Card` base | `src/components/ui` | Product, category, feature/value, dan panel admin membutuhkan surface, border, radius, padding, dan elevation konsisten. | P1, setelah `ProductCard` dan `CategoryCard` API dibandingkan. |
| `Dialog` | `src/components/ui` | ConfirmDialog adalah kebutuhan admin dan pola dialog dapat dipakai untuk destructive action public/admin. | P1, sebelum memperluas aksi admin. |
| `Drawer` atau `OverlaySurface` | `src/components/ui` | MobileNavDrawer dan admin sidebar memiliki perilaku overlay/panel yang sama, walau IA berbeda. | P1, setelah perilaku focus/escape/body lock ditulis sebagai kontrak. |
| `StateMessage` | `src/components/ui` | Loading, empty, error, dan disabled muncul di public/admin dan sekarang masih raw text/div. | P1, setelah copy dan icon semantic disepakati. |
| `DataTable` | `src/components/ui` | ProductTable sudah ada dan Categories kemungkinan membutuhkan pola serupa. | P2, setelah specimen kedua dikonfirmasi; jangan overbuild sekarang. |
| `Rating` | `src/components/ui` | Rating tampil di card/detail dan mockup memiliki rating block. | P2, setelah kebutuhan display versus input rating dipisahkan. |

Dengan demikian, **folder baru belum diperlukan untuk sprint foundation v1**. Semua kandidat dapat tinggal di `src/components/ui` agar mudah ditemukan. Subfolder seperti `ui/form`, `ui/overlay`, atau `ui/feedback` baru dibuat jika jumlah file sudah cukup banyak dan kontraknya stabil; bukan sebagai hiasan struktur.

## Migration map public dan admin

| Area | Kondisi | Rencana aman |
|---|---|---|
| Discover | Sudah paling dekat dengan baseline baru, tetapi masih memiliki raw CTA/chip dan belum memakai SearchInput penuh. | Patch authority Button/IconButton/SearchInput terlebih dahulu; jangan ubah data flow. |
| CategoryPage | Banyak card, input, select, info panel, dan product card legacy. | Migrasikan satu surface per commit: CategoryCard → Search/Select → ProductCard → state. |
| ProductDetail | Hampir seluruh detail surface masih legacy dan menggunakan emoji/raw CTA. | Jadikan migration slice tersendiri setelah ProductCard/Card/Badge/Rating siap. |
| MainLayout/Navbar | Public shell lama masih hidup di route tertentu. | Cocokkan route truth dulu; retire hanya setelah tidak dipakai. |
| AdminLayout/Sidebar | Shell berfungsi, tetapi visual dan motion berdiri sendiri. | Pertahankan auth dan menu; migrasikan overlay, IconButton, Button, typography, dan token tanpa mengubah JWT. |
| Products/ProductTable | Logic selection dan action sudah ada; visual raw. | Introduce Badge/IconButton/Table contract, kemudian audit responsive mobile. |
| ProductForm/CategoryForm | Logic Context/Toast/Navigate tetap dipertahankan; field dan action raw. | Migrasikan visual field secara bertahap, tanpa memindahkan fetch atau state keluar dari boundary. |
| Confirm actions | ConfirmDialog dipakai admin dan masih legacy. | Bangun `ui/Dialog`, lalu wrapper confirm. Uji keyboard dan reduced motion. |

## Urutan eksekusi yang direkomendasikan

**P0 — Authority cleanup.** Kunci `ui/Button` sebagai satu-satunya Button, patch duration dan semantic danger, selaraskan Container dengan token, serta buat inventory pemakai `common/Button`. Pada tahap ini belum ada redesign halaman dan belum ada integrasi data baru.

**P1 — Foundation states.** Tambahkan `FormField`/`SelectField`/`TextareaField` seperlunya, perkuat `IconButton`, bangun `Dialog` dan `OverlaySurface`/`Drawer` dengan kontrak accessibility, serta tetapkan `Card` base dan `StateMessage`. Setiap komponen harus memiliki header file, token, focus state, disabled state bila relevan, dan reduced-motion behavior.

**P2 — Public migration.** Migrasikan Discover raw controls, CategoryPage, lalu ProductDetail. Setiap slice dibatasi satu keluarga komponen dan divalidasi dengan `git diff --check` serta `npx vite build` sebelum slice berikutnya.

**P3 — Admin migration.** Migrasikan ProductTable, CategoryForm, ProductForm, dan AdminLayout/Sidebar. Auth JWT, Context, service, endpoint, dan kontrak API tidak disentuh kecuali ada bug yang terbukti oleh slice tersebut.

**P4 — Retirement dan dokumentasi.** Setelah seluruh pemakai berpindah, retire `common/Button` dan legacy `public/ProductCard` sesuai route truth. Sinkronkan `folders-frontend.md`, Component Foundation, Core changelog, Notion, dan Linear. Tidak menghapus file hanya karena terlihat tua; setiap penghapusan harus dibuktikan dengan zero runtime import.

## Acceptance criteria Foundation v1

| Kriteria | Lulus bila |
|---|---|
| Single authority | Tidak ada pemakaian runtime `components/common/Button`; semua Button memakai `components/ui/Button`. |
| Token compliance | Foundation dan migrated surfaces tidak menambah warna, radius, shadow, atau duration hardcoded baru. |
| Accessibility | Icon-only control memiliki accessible label; button memiliki focus-visible; field memiliki label/error; dialog/drawer memiliki Escape dan focus handling yang benar. |
| State coverage | Komponen relevan memiliki default, active/focused, disabled, loading, empty, dan error sesuai use case. |
| Motion | Motion memakai `--np-motion-*`/alias dan aman saat `prefers-reduced-motion: reduce`; tidak ada `duration-300`/`duration-500` baru. |
| Route safety | Tidak ada link yang sengaja diarahkan ke 404; ProductCard migration mempertahankan destination route yang benar. |
| Layer safety | Component tetap presentational; tidak ada fetch langsung di component; Context/Service/API boundary tetap utuh. |
| Responsive | Review minimum pada lebar 360px, 390px, 430px, 768px, 1024px, dan desktop; tidak ada overflow atau touch target yang terlalu kecil. |
| Validation | Setiap slice lulus `git diff --check` dan `npx vite build`; working tree serta branch dicatat sebelum commit. |
| Delivery | Setiap slice berada di branch terpisah, memiliki commit kecil, preview, changelog, dan catatan review sebelum merge. |

## Keputusan yang sengaja tidak diambil

Kita tidak akan membuat design system baru di luar mockup resmi, tidak akan mengganti logo/typography/palette final, tidak akan mencampur icon library, tidak akan merombak backend hanya karena data masih dummy, dan tidak akan menghapus seluruh folder `components/public` sekaligus. Kita juga tidak akan membuat `StatusBadge`, `Input`, `Modal`, atau `Card` ketiga hanya karena nama yang berbeda; kontrak existing akan diperluas bila masih sehat.

Foundation Patrol ini menyimpulkan bahwa **masalah utama bukan kekurangan file, melainkan authority dan adopsi**. Karena itu, langkah teknis pertama yang paling bernilai bukan menambah banyak komponen, melainkan mengunci Button/Container/Field/Overlay/Card secara kecil lalu memigrasikan pemakai satu per satu.

## Referensi

[^1]: [Ngepas Core](https://github.com/kemplu007/ngepas-reborn/blob/main/src/docs/docs/ngepas-core.md) — sumber kebenaran arsitektur dan guardrail proyek.
[^2]: [UI/UX System v1.1](https://github.com/kemplu007/ngepas-reborn/blob/main/src/docs/docs/uiux-system-v1.1.md) — handoff visual, breakpoint, state, dan do/don't.
[^3]: [Component Foundation v1.0](https://github.com/kemplu007/ngepas-reborn/blob/main/src/docs/docs/component-foundation-v1.0.md) — kontrak reusable component.
[^4]: [Design System reference asset](https://github.com/kemplu007/ngepas-reborn/blob/main/src/docs/assets/uiux-v1.1/reference/1000702639.jpg) — mockup visual Design System v1.0 yang diberikan user.
[^5]: [Coding standard](https://github.com/kemplu007/ngepas-reborn/blob/main/src/docs/docs/coding-standard.md) — aturan header, naming, motion, layer, dan validasi.
