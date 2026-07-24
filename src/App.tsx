/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : App.tsx
 Module  : Root Component
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import { ProductProvider } from "./context/ProductContext";

/*==================================================
 COMPONENT
==================================================*/

function App() {
  return (
    <ProductProvider>
      <Routes>
        {/*==============================================
         WEBSITE ROUTES
        ==============================================*/}

        <Route path="/" element={<Home />} />

        <Route path="/product/:slug" element={<ProductDetail />} />

        <Route path="/category" element={<CategoryPage />} />

        {/*==============================================
         ADMIN ROUTES
        ==============================================*/}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="products/new" element={<AdminProductForm />} />
        </Route>
      </Routes>
    </ProductProvider>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default App;
