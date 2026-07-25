/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : AdminDashboard.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useProducts } from "../context/ProductContext";

/*==================================================
 ADMIN DASHBOARD
==================================================*/

function AdminDashboard() {

    /*==================================================
   PRODUCT DATA
  ==================================================*/

  /*
  Mengambil data produk dari ProductContext
  agar statistik dashboard selalu mengikuti
  perubahan produk dari Admin Panel.
  */

  const { products } = useProducts();

  const totalProducts = products.length;

  /*==================================================
 ROOM & CATEGORY STATS
==================================================*/

/*
Menghitung jumlah room dan category unik
yang digunakan oleh produk.
*/

const totalRooms = new Set(
  products.map((product) => product.room)
).size;

const totalCategories = new Set(
  products.map((product) => product.category)
).size;

  /*==================================================
 LATEST PRODUCTS
==================================================*/

/*
Mengambil maksimal 3 produk terakhir.

slice(-3) mengambil 3 data paling belakang,
kemudian reverse() membalik urutannya
agar produk paling baru tampil pertama.
*/

const latestProducts = [...products]
  .slice(-3)
  .reverse();

  
  return (
    <main className="min-h-screen bg-slate-50">
      {/*==============================================
       ADMIN HEADER
      ==============================================*/}

      <section className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm font-semibold text-emerald-600">Ngepas Admin</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Kelola produk dan data Ngepas dari satu tempat.
        </p>
      </section>

      {/*==============================================
 DASHBOARD STATS
==============================================*/}

<div className="
  mx-auto
  max-w-7xl
  px-4
  mt-8
  grid
  gap-4
  sm:grid-cols-2
  lg:grid-cols-4
">

  {/*============================================
   TOTAL PRODUCTS
  ============================================*/}

  <div
    className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
    "
  >
    <p className="text-sm font-medium text-slate-500">
      Total Produk
    </p>

    <p className="mt-2 text-3xl font-bold text-slate-900">
      {totalProducts}
    </p>
  </div>

</div>

      {/*============================================
 TOTAL ROOMS
============================================*/}

<div
  className="
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
  "
>
  <p className="text-sm font-medium text-slate-500">
    Total Ruangan
  </p>

  <p className="mt-2 text-3xl font-bold text-slate-900">
    {totalRooms}
  </p>
</div>

{/*============================================
 TOTAL CATEGORIES
============================================*/}

<div
  className="
    rounded-2xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
  "
>
  <p className="text-sm font-medium text-slate-500">
    Total Kategori
  </p>

  <p className="mt-2 text-3xl font-bold text-slate-900">
    {totalCategories}
  </p>
</div>

      {/*==============================================
 LATEST PRODUCTS
==============================================*/}

<section className="mx-auto max-w-7xl px-4 py-10">

  {/*============================================
   SECTION HEADER
  ============================================*/}

  <div>
    <p className="text-sm font-semibold text-emerald-600">
      Product Activity
    </p>

    <h2 className="mt-1 text-2xl font-bold text-slate-900">
      Produk Terbaru
    </h2>

    <p className="mt-2 text-slate-500">
      Produk terbaru yang tersedia di katalog Ngepas.
    </p>
  </div>

  {/*============================================
   PRODUCT LIST
  ============================================*/}

  <div className="mt-6 space-y-3">
    {latestProducts.map((product) => (
      <div
        key={product.id}
        className="
          flex
          items-center
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
        "
      >
        {/* PRODUCT IMAGE */}

        <img
          src={product.image}
          alt={product.name}
          className="
            h-16
            w-16
            shrink-0
            rounded-xl
            object-cover
          "
        />

        {/* PRODUCT INFO */}

        <div className="min-w-0 flex-1">

          <p className="
            text-xs
            font-semibold
            uppercase
            text-emerald-600
          ">
            {product.room}
          </p>

          <h3 className="
            truncate
            font-bold
            text-slate-900
          ">
            {product.name}
          </h3>

          <p className="
            mt-1
            text-sm
            font-semibold
            text-slate-500
          ">
            {product.price}
          </p>

        </div>
      </div>
    ))}
  </div>

</section>
    </main>

    
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminDashboard;
