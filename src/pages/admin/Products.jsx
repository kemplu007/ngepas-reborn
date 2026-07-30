/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Products.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useProducts } from "../../context/ProductContext";
/*==================================================
 ADMIN PRODUCTS
==================================================*/

function Products() {
  /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  const { products, deleteProduct } = useProducts();

  /*==================================================
 SEARCH
==================================================*/

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.room.toLowerCase().includes(keyword);

    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <section>
      {/*==============================================
       PAGE HEADER
      ==============================================*/}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-600">
            Product Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">Products</h1>

          <p className="mt-2 text-slate-500">
            Kelola seluruh produk yang tampil di Ngepas.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
          "
        >
          <Plus size={18} />
          Tambah Produk
        </Link>
      </div>

      {/*==============================================
       PRODUCT SUMMARY
      ==============================================*/}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Total Produk</p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {products.length}
        </p>
      </div>

      {/*==============================================
 SEARCH
==============================================*/}

      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk, kategori, atau room..."
          className="
      w-full
      rounded-xl
      border
      border-slate-200
      bg-white
      px-4
      py-3
      outline-none
      transition
      focus:border-emerald-500
    "
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`
        rounded-full
        px-4
        py-2
        text-sm
        font-medium
        transition
        ${
          selectedCategory === category
            ? "bg-emerald-600 text-white"
            : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
        }
      `}
          >
            {category}
          </button>
        ))}
      </div>
      {/*==============================================
       PRODUCT LIST
      ==============================================*/}

      <div className="mt-8 space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article
              key={product.id}
              className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
        "
            >
              {/*==============================================
               PRODUCT IMAGE
              ==============================================*/}

              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                  h-20
                  w-20
                  shrink-0
                  rounded-xl
                  object-cover
                "
                />

                {/*==============================================
               PRODUCT INFO
              ==============================================*/}

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase text-emerald-600">
                    {product.room}
                  </p>

                  <h2 className="mt-1 font-bold text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {product.category}
                  </p>

                  <p className="mt-2 font-bold text-emerald-600">
                    {product.price}
                  </p>
                </div>
              </div>

              {/*==============================================
             PRODUCT ACTIONS
            ==============================================*/}

              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                <Link
                  to={`/admin/products/${product.id}/edit`}
                  className="
    flex
    flex-1
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-slate-200
    px-4
    py-2
    text-sm
    font-semibold
    text-slate-600
    transition
    hover:bg-slate-50
  "
                >
                  <Pencil size={16} />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Yakin mau hapus "${product.name}"?`,
                    );

                    if (confirmed) {
                      deleteProduct(product.id);
                    }
                  }}
                  className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-200
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-50
                "
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </article>
          ))
        ) : (
          <div
            className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            p-10
            text-center
          "
          >
            <p className="text-lg font-semibold text-slate-700">
              Produk tidak ditemukan
            </p>

            <p className="mt-2 text-slate-500">
              Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Products;
