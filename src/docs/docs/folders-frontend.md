# ==================================================

# NGEPAS REBORN

# FRONTEND STRUCTURE v1.0

# ==================================================

src/
│
├── assets/
│ │
│ ├── banner/
│ │
│ ├── categories/
│ │ ├── bathroom.png
│ │ ├── coffee-space.png
│ │ ├── kitchen.png
│ │ └── living-room.png
│ │
│ ├── icon/
│ │
│ ├── illustration/
│ │
│ ├── images/
│ │ └── hero-bg.png
│ │
│ ├── logo/
│ │
│ ├── mascot/
│ │ └── si-pas.png
│ │
│ ├── placeholder/
│ │
│ └── products/
│ ├── lampu-tidur.jpg
│ ├── rak-bumbu.jpg
│ ├── rak-dinding.jpg
│ └── tanaman.jpg
│
├── components/
│ │
│ ├── admin/
│ │ └── Sidebar.jsx
│ │
│ ├── common/
│ │ ├── Button.jsx
│ │ └── ScrollToTop.jsx
│ │
│ └── public/
│ ├── Categories.jsx
│ ├── Category.jsx
│ ├── CtaBanner.jsx
│ ├── FeaturedProducts.jsx
│ ├── Hero.jsx
│ ├── Navbar.jsx
│ ├── ProductCard.jsx
│ ├── SearchDropdown.jsx
│ └── WhyNgepas.jsx
│
├── config/
│ │
│ ├── admin/
│ │ ├── menu.js
│ │ └── routes.js
│ │
│ ├── public/
│ │ ├── navigation.js
│ │ └── routes.js
│ │
│ ├── constants.js
│ └── theme.js
│
├── context/
│ ├── FavoritesContext.jsx
│ └── ProductContext.jsx
│
├── data/
│ ├── categories.js
│ ├── ctaBanner.js
│ ├── features.js
│ ├── hero.js
│ ├── navigation.js
│ ├── products.js
│ ├── roomCategories.js
│ ├── rooms.js
│ └── whyNgepas.js
│
├── docs/
│ ├── assets/
│ ├── blueprint/
│ ├── checkpoint/
│ ├── docs/
│ ├── mockup/
│ ├── roadmap/
│ └── folders-frontend.md
│
├── hooks/
│ └── useFavorites.js
│
├── layouts/
│ ├── AdminLayout.jsx
│ └── MainLayout.jsx
│
├── pages/
│ │
│ ├── admin/
│ │ ├── Dashboard.jsx
│ │ ├── ProductForm.jsx
│ │ └── Products.jsx
│ │
│ └── public/
│ ├── Home.jsx
│ ├── CategoryPage.jsx
│ └── ProductDetail.jsx
├── services/
│
├── api.js
├── productService.js
└── categoryService.js
│
├── utils/
│ └── highlightText.jsx
│
├── App.tsx
├── index.css
└── main.tsx

==================================================
NOTE PER FOLDER & FILE
==================================================

📁 components/admin

Sidebar.jsx
• Sidebar khusus Admin Panel.
• Berisi menu Dashboard, Product, Category, Settings, dll.

---

📁 components/common

Button.jsx
• Reusable Button.
• Digunakan di seluruh project.
• Mendukung variant (Primary, Secondary, dll.)

ScrollToTop.jsx
• Otomatis scroll ke atas setiap pindah halaman.

---

📁 components/public

Hero.jsx
• Hero Section Homepage.
• Menampilkan headline, mascot, CTA, dan background.

Navbar.jsx
• Navigasi utama website.
• Logo, Menu, Search, Responsive Menu.

Categories.jsx
• Section daftar kategori pada Homepage.

Category.jsx
• Card kategori.
• Dipanggil oleh Categories.jsx.

FeaturedProducts.jsx
• Menampilkan produk unggulan.
• Me-render ProductCard.

ProductCard.jsx
• Card produk reusable.
• Digunakan di FeaturedProducts,
CategoryPage, Search Result, dll.

SearchDropdown.jsx
• Live Search Product.

CtaBanner.jsx
• Banner Call To Action.

WhyNgepas.jsx
• Section branding.
• Menjelaskan value Ngepas.

---

📁 config

admin/menu.js
• Data menu Sidebar Admin.

admin/routes.js
• Routing Dashboard Admin.

public/navigation.js
• Data menu Navbar.

public/routes.js
• Routing halaman Frontend.

constants.js
• Konstanta global.
• API_URL
• APP_NAME
• LIMIT_PRODUCT
• dll.

theme.js
• Pengaturan tema aplikasi.

---

📁 context

FavoritesContext.jsx
• Global State Favorite.

ProductContext.jsx

• Global State Produk.

• Mengelola loading.

• Mengelola error.

• Menggunakan Product Service.

• Tidak melakukan fetch() langsung.

• Menyediakan refreshProducts().

---

📁 data

categories.js
• Data kategori utama.

ctaBanner.js
• Data CTA Banner.

features.js
• Data fitur Hero.

hero.js
• Data Hero Section.

navigation.js
• Data Navbar.

products.js
• Database produk frontend.

roomCategories.js
• Mapping kategori berdasarkan Room.

rooms.js
• Data seluruh Room.

whyNgepas.js
• Data Why Ngepas.

---

📁 docs

assets/
• Dokumentasi Asset.

blueprint/
• Blueprint Project.

checkpoint/
• Checkpoint Development.

docs/
• Dokumentasi tambahan.

mockup/
• Mockup UI.

roadmap/
• Roadmap Project.

folders-frontend.md
• Dokumentasi struktur frontend.

---

📁 hooks

useFavorites.js
• Custom Hook FavoritesContext.

---

📁 layouts

MainLayout.jsx
• Layout Website Public.

AdminLayout.jsx
• Layout Dashboard Admin.

---

📁 pages/admin

Dashboard.jsx
• Halaman Dashboard Admin.

Products.jsx
• CRUD Produk.

ProductForm.jsx
• Form Tambah/Edit Produk.

---

📁 pages/public

Home.jsx
• Landing Page Ngepas.

CategoryPage.jsx
• Halaman kategori berdasarkan Room.

ProductDetail.jsx
• Detail Produk.

---

📁 services

api.js

• Konfigurasi Base URL Backend.

• Satu pintu perubahan API.

---

productService.js

• Seluruh komunikasi Product API.

• Request Helper.

• CRUD Product.

---

categoryService.js

• Seluruh komunikasi Category API.

• CRUD Category.

📁 utils

highlightText.jsx
• Utility Highlight Text.

---

📄 App.tsx

• Root React App.
• Mengatur seluruh React Router.
• Memasang Provider Global.

---

📄 main.tsx

• Entry Point React.
• BrowserRouter.
• Render App.

---

📄 index.css

• Global CSS Project.
• Base Style.
• Reset.
• Utility Global.
