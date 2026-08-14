# NGEPAS REBORN
# MOCKUP & WIREFRAME V2

# ==================================================

Status : DRAFT
Module : UI/UX Design
Version : 1.0
Author : Manus

==================================================
RINGKASAN
==================================================

Dokumen ini berisi UI/UX mockup dan wireframe untuk
Ngepas V2, berdasarkan IA V2 dan User Flow yang
sudah disepakati tim.

Semua desain mengikuti:
- Design System Ngepas (warna, font, radius, spacing)
- Prinsip mobile-first
- Konsep modern minimalis & canggih

==================================================
FILE YANG DIHASILKAN
==================================================

Folder: src/docs/assets/mockup-v2/

MOBILE MOCKUP (HIGH-FIDELITY):
1. mockup-mobile-home.png        - Home / Discover
2. mockup-mobile-search.png      - Pencarian
3. mockup-mobile-category.png    - Kategori
4. mockup-mobile-product-detail.png - Detail Produk
5. mockup-mobile-compare-product.png - Bandingkan Produk
6. mockup-mobile-compare-marketplace.png - Bandingkan Marketplace
7. mockup-admin-dashboard.png    - Admin Dashboard (desktop)
8. mockup-admin-products.png     - Admin Products (desktop)

MOBILE WIREFRAME (LOW-FIDELITY):
9. wireframe-mobile-home.png     - Home wireframe
10. wireframe-mobile-search.png  - Search wireframe
11. wireframe-mobile-category.png - Category wireframe
12. wireframe-mobile-product-detail.png - Detail wireframe
13. wireframe-mobile-compare-marketplace.png - Marketplace compare wireframe

DESKTOP WIREFRAME:
14. wireframe-desktop-overview.png - 6 halaman desktop overview

==================================================
DESIGN SYSTEM YANG DIGUNAKAN
==================================================

WARNA:
- Primary Green  : #16A34A (button, link, badge)
- Dark Green     : #0F5132 (sidebar admin, heading)
- Accent Yellow  : #FFC107 (highlight, best deal)
- Background     : #F7F9F9
- Neutral 900    : #1E1E27 (text utama)
- Neutral 500    : #6B7280 (text sekunder)

FONT:
- Inter (semua ukuran)
- Heading: 600-700 weight
- Body: 400 weight

RADIUS:
- Buttons: 12px
- Cards: 16px
- Images: 12px
- Pills: Full

NAVIGATION:
- Mobile: Bottom nav (Home, Cari, Kategori, Compare, Akun)
- Desktop: Top nav + left sidebar (admin)

==================================================
HALAMAN & FLOW
==================================================

PUBLIC FLOW:
Home → Search/Kategori → Product Detail →
Compare Marketplace → Buka di Marketplace

HALAMAN PUBLIC:
1. DISCOVER (Home)
   - Hero + tagline
   - Kategori populer (horizontal scroll)
   - Pilihan Ngepas (featured products)
   - Trending Minggu Ini

2. SEARCH
   - Pencarian terakhir (chips)
   - Rekomendasi
   - Hasil pencarian + filter + badge

3. PRODUCT DETAIL
   - Gallery + rating + harga
   - "Kenapa Kami Memilih" (checklist)
   - Spesifikasi (expander)
   - Kelebihan & Kekurangan
   - Review pengguna
   - Bandingkan Marketplace (tabel)

4. COMPARE PRODUCT
   - 3 produk side-by-side
   - Skor Ngepas
   - Tabel spesifikasi
   - Best value highlight

5. COMPARE MARKETPLACE
   - 5 marketplace (Shopee, Tokopedia, TikTok, Lazada, Blibli)
   - Harga, Ongkir, Promo, Total
   - Best deal highlight
   - Tips Ngepas

6. KATEGORI
   - Grid 12 kategori
   - Rekomendasi per kategori

ADMIN PANEL:
- Dashboard (stats, revenue, low stock, top products)
- Products (table, bulk delete, filter, pagination)
- Categories
- Reviews
- Settings

==================================================
IMPROVISASI YANG DITAMBAHKAN
==================================================

1. "Tips Ngepas" card di halaman Compare Marketplace
   - Edukasi user sebelum beli

2. "Update harga: 2 jam lalu" di Product Detail
   - Transparansi data

3. Skor Ngepas di Compare Product
   - Quick decision helper

4. Best Deal highlight (border hijau)
   - Visual cue untuk pilihan terbaik

5. Stok menipis/habis warning di Admin Dashboard
   - Proaktif alert untuk admin

==================================================
NEXT STEP
==================================================

- Review mockup dengan tim
- Finalisasi design sebelum coding
- Implementasi bertahap per halaman
- Update docs setelah implementasi
