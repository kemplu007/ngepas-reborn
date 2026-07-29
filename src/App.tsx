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

import Home from "./pages/public/Home";

import ProductDetail from "./pages/public/ProductDetail";

import CategoryPage from "./pages/public/CategoryPage";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";

import Products from "./pages/admin/Products";

import ProductForm from "./pages/admin/ProductForm";

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
          <Route index element={<Dashboard />} />

          <Route path="products" element={<Products />} />

          <Route path="products/new" element={<ProductForm />} />

          {/*==============================================
 EDIT PRODUCT
==============================================*/}

          <Route path="products/:id/edit" element={<ProductForm />} />
        </Route>
      </Routes>
    </ProductProvider>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default App;
