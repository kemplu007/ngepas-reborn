/*==================================================
 NGEPAS REBORN
 File    : Products.jsx
 Module  : Admin Pages
==================================================*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { useProducts } from "../../context/ProductContext";
import ProductTable from "../../components/admin/ProductTable";

/*==================================================
 ADMIN PRODUCTS
==================================================*/
function Products() {
  const { products, deleteProduct } = useProducts();

  /*==================================================
   SEARCH & FILTER STATE
  ==================================================*/
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /*==================================================
   DERIVED DATA
  ==================================================*/
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  /*==================================================
   UI
  ==================================================*/
  return (
    <section className="flex flex-col gap-6">
      {/*==============================================
       HEADER
      ==============================================*/}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">Management</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Produk</h1>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Tambah Produk
        </Link>
      </div>

      {/*==============================================
       FILTERS
      ==============================================*/}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau kategori produk..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 sm:w-72"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 sm:w-40"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*==============================================
       PRODUCT TABLE
      ==============================================*/}
      {filteredProducts.length > 0 ? (
        <ProductTable products={filteredProducts} onDelete={deleteProduct} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-700">
            Produk tidak ditemukan
          </p>
          <p className="mt-2 text-slate-500">Coba gunakan kata kunci lain.</p>
        </div>
      )}
    </section>
  );
}

export default Products;
