# Ngepas Foundation Patrol — Temuan Sementara

Tanggal audit: 2026-08-16
Branch saat audit: `fix/discover-mobile-visual-density-v1`
Scope: audit read-only; belum mengubah source code.

## Sumber kebenaran yang dibaca

- `src/docs/docs/ngepas-core.md`: FE fetch hanya di Service; Context mengelola state dan memanggil Service; satu file satu tanggung jawab; YAGNI; `main` stabil; kerja di branch; public flow dan admin flow tidak boleh keluar scope.
- `src/docs/docs/uiux-system-v1.1.md`: mockup tim adalah source of truth; identitas logo, typography, hijau-kuning, outline icon, header, navigation, spacing, radius, dan dokumentasi step-by-step final; breakpoint mobile <=768, tablet 769-1023, desktop >=1024; state wajib mencakup loading, empty, error, disabled, active, dan admin bulk action.
- `src/docs/docs/coding-standard.md`: header wajib, naming konsisten, motion memakai `--np-motion-*`, Button/IconButton wajib focus ring, press feedback, disabled/loading bila relevan, reduced-motion safe.
- `src/docs/docs/component-foundation-v1.0.md`: target foundation `Container`, `Section`, `SectionHeading`, `Button`, `IconButton`, `SearchInput`, `Badge`, `ProductCard`, `CategoryCard`, `FilterPanel`, `TrustStrip`, `BottomNavigation`; component presentational, data dari page/context, tanpa fetch.
- `src/styles/tokens.css`: token typography, spacing 4px, brand palette, neutral/surface, radius, shadow, motion, layout/control, reduced-motion, semantic aliases.

## Baseline repository

Folder yang aktif: `components/admin`, `components/common`, `components/discover`, `components/navigation`, `components/public`, `components/ui`, `config`, `context`, `data/mock`, `docs`, `hooks`, `layouts`, `pages/admin`, `pages/public`, `services`, `styles`, `utils`.

Branch review masih aktif. Working tree memiliki untracked audit/deployment notes dari sesi sebelumnya; jangan dibersihkan atau ditimpa tanpa instruksi.

## Temuan high-signal

1. Ada dua authority Button: `src/components/ui/Button.jsx` adalah foundation tokenized dengan variant/size/loading/disabled/focus, sementara `src/components/common/Button.jsx` adalah legacy hardcoded `rounded-xl`, `bg-green-600`, `px-6 py-3`, `duration-300`, shadow, dan `active:scale-95`. Ini konflik fondasi dan harus diselesaikan dengan migrasi/retirement, bukan menambah Button ketiga.
2. `ui/Button.jsx` masih memiliki `duration-200` hardcoded dan danger hover `red-700`; perlu patch token semantic pada foundation, bukan sekarang jika audit belum disetujui.
3. `ui/IconButton.jsx` sudah ada, memakai target sentuh dan label, tetapi API masih minimal dan belum jelas disabled/loading/press-feedback tokenized.
4. `ui/SearchInput.jsx` sudah ada dan presentational, tetapi clear/filter controls masih raw button inline; perlu audit adopsi di header/admin.
5. `ui/Badge.jsx` sudah ada, tetapi danger memakai `red-50`/`red-700` raw class alih-alih semantic danger tokens.
6. `Container`, `Section`, dan `SectionHeading` sudah menjadi rumah layout yang baik; perlu audit adopsi ke admin, bukan membuat rumah layout kedua.
7. Folder `components/public` dan dokumen `folders-frontend.md` adalah legacy/stale relatif terhadap struktur aktual; komponen public aktual banyak berpindah ke `components/discover` dan `components/navigation`. Dokumen struktur perlu disinkronkan sebagai pekerjaan dokumentasi terpisah.
8. Mockup Design System v1.0 menunjukkan foundation minimum: logo/application mark, palette green-yellow-neutral, Inter typography scale, buttons primary/secondary/accent/disabled, input default/focused/filled/disabled, outline icons, badges/labels, Product Card, Category Card, Feature/Value Card, header desktop/mobile, desktop navigation, mobile bottom navigation, rating, UI preview, serta prinsip sederhana/jelas/konsisten/fungsional/tepercaya/bersahabat.

## Guardrail sementara

Belum melakukan implementasi. Audit berikutnya harus memeriksa adopsi foundation pada DiscoverHeader, CampaignBanner, ProductCard, CategoryCard, FilterPanel, navigation, AdminLayout/Sidebar, Products, Categories, forms, ConfirmDialog, dan penggunaan raw controls. Setiap gap diklasifikasikan `keep`, `patch`, `migrate`, atau `missing`; rumah baru hanya dibuat bila pola lintas minimal dua surface atau kontraknya jelas.

## Temuan lanjutan: adopsi dan drift

- Runtime public masih terbagi: `Discover.jsx` memakai `components/discover/ProductCard` dan `CategoryCard`, sedangkan `CategoryPage.jsx` dan `ProductDetail.jsx` masih memakai legacy `components/public/ProductCard`. Ini membuat kontrak route dan visual card berbeda (`/discover/:slug` vs `/product/:slug`) dan harus dimigrasikan dengan keputusan route yang eksplisit.
- `DiscoverHeader.jsx` masih menulis search field, filter icon button, menu button, notification button, dan account icon button secara lokal; `ui/SearchInput` belum diadopsi. Ini adalah target migrasi, bukan alasan membuat SearchInput ketiga.
- `Discover.jsx` masih memiliki beberapa raw CTA/button dan chip inline walau sudah memakai `Button` di CampaignBanner. Foundation belum menjadi authority penuh di halaman Discover.
- `FilterPanel.jsx` sudah tokenized dan presentational, tetapi select dan reset action masih lokal; jika pola select/filter dipakai admin, perlu kontrak `SelectField` atau `FilterBar` yang terukur sebelum membuat primitive.
- `ProductTable.jsx` memakai raw checkbox, raw action links/buttons, hardcoded slate/emerald/red colors, `transition-all duration-200`, dan `active:scale-95`; status chip seharusnya mengonsumsi `Badge`, aksi icon seharusnya `IconButton`, dan motion memakai token.
- `Sidebar.jsx` dan `AdminLayout.jsx` adalah shell admin bespoke dengan `w-64`, palette emerald Tailwind, `duration-300`, overlay lokal, dan raw controls. Public `MobileNavDrawer` sudah punya motion/focus/body-lock pattern yang lebih matang; jangan copy-paste, tetapi pertimbangkan `OverlaySurface`/`Drawer` foundation dengan kontrak yang dapat dipakai dua shell tanpa menyatukan IA public-admin.
- `ConfirmDialog.jsx` masih legacy: tidak memakai portal, focus trap, Escape, shared Button, token colors/radius/motion, atau reduced-motion contract. Ini kandidat kuat untuk `Dialog`/`ConfirmDialog` foundation sebelum form admin diperluas.
- `ProductForm.jsx` adalah bukti terbesar kebutuhan rumah form: banyak raw input/select/textarea, inline buttons, raw radius/colors, dan stepper lokal. Business logic tetap di page; visual field, helper/error, stepper, gallery item, dan actions dapat diekstrak bertahap.
- `CategoryPage.jsx` dan `ProductDetail.jsx` masih memakai raw room/category cards, search/select, info surfaces, badge/chip, CTA, sections, dan legacy colors/radius; keduanya adalah migration targets setelah foundation v1 dikunci.
- Legacy `components/public` berisi beberapa Hero/CtaBanner/Category/FeaturedProducts/Navbar/Categories yang masih menggunakan raw recipes. Statusnya perlu dipetakan sebagai `migrate` atau `retire` berdasarkan route truth, bukan dihapus massal.

## Patokan keputusan

Tidak membuat primitive hanya karena satu file memiliki markup lokal. Primitive baru diprioritaskan jika pola lintas minimal dua surface, state/accessibility contract jelas, dan ada manfaat pemeliharaan. Kandidat rumah baru berstatus `proposed`: `Field`/`FormField`, `SelectField`, `TextareaField`, `Dialog`, `Drawer/OverlaySurface`, `Table`, `StatusBadge` (atau perluas Badge), dan `Stepper`; implementasi menunggu baseline disetujui.
