/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : App.tsx
==================================================*/

import { Routes, Route } from "react-router-dom";

// Import Layout
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Import Public Pages
import Home from "./pages/public/Home";
import ProductDetail from "./pages/public/ProductDetail";
import CategoryPage from "./pages/public/CategoryPage";

// Import Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";

// Import Context
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <Routes>
        {/* =============================================
             BUNGKUS HALAMAN PUBLIK DISINI
             (Biar Navbarnya muncul di semua halaman)
            ============================================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>

        {/* =============================================
             BAGIAN ADMIN (Dibawah ini jangan diutak-atik)
            ============================================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
        </Route>
      </Routes>
    </ProductProvider>
  );
}

export default App;
