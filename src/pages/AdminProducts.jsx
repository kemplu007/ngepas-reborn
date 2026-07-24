/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : AdminProducts.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useProducts } from "../context/ProductContext";
/*==================================================
 ADMIN PRODUCTS
==================================================*/

/*
Halaman untuk menampilkan seluruh produk
yang tersimpan di data Ngepas.

Untuk tahap ini halaman masih READ ONLY.

Fitur berikutnya:
- Tambah produk
- Edit produk
- Hapus produk
*/

function AdminProducts() {

  /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  /*
  Mengambil seluruh data produk dari ProductContext.

  Dengan shared state ini, produk baru dari Admin Form
  dapat langsung muncul tanpa membaca products.js lagi.
  */

  const { products } = useProducts();

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
       PRODUCT LIST
      ==============================================*/}

      <div className="mt-8 space-y-4">
        {products.map((product) => (
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
            <div className="flex gap-4">
              {/*==============================================
               PRODUCT IMAGE
              ==============================================*/}

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
              <button
                type="button"
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
              </button>

              <button
                type="button"
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
        ))}
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminProducts;
