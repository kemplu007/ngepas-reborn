/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : CategoryPage.jsx
 Module  : Pages
==================================================*/

import rooms from "../data/rooms";
import { useState } from "react";
import roomCategories from "../data/roomCategories";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

/*==================================================
 CATEGORY PAGE
==================================================*/

const CategoryPage = () => {

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

/*==================================================
 FILTER PRODUCTS
==================================================*/

const filteredProducts = products.filter(
  (product) =>
    product.room === selectedRoom &&
    product.category === selectedCategory
);
  
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/*==============================================
        Header
      ==============================================*/}
      <div className="mb-8">
        <p className="text-sm text-green-600 font-semibold">
          Blueprint Navigation
        </p>

        <h1 className="text-3xl font-bold mt-2">
          Mau cari produk buat ruangan apa?
        </h1>

        <p className="text-gray-500 mt-3">
          Pilih salah satu ruangan untuk mulai menemukan rekomendasi produk
          terbaik versi Ngepas.
        </p>
      </div>

      {/*==============================================
        Room List
      ==============================================*/}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => {
  setSelectedRoom(room.slug);
              
  setSelectedCategory(null);
}}
            className={`
  border
  rounded-2xl
  p-4
  transition
  text-left

  ${
    selectedRoom === room.slug
      ? "bg-green-600 text-white border-green-600 shadow-lg"
      : "bg-white hover:shadow-lg"
  }
`}
          >
            {/* Image Placeholder */}
            <div className="aspect-square rounded-xl bg-gray-100 mb-4" />

            {/* Room Name */}
            <h2 className="font-semibold text-lg">
              {room.name}
            </h2>

            {/* Product Count */}
            <p
  className={`text-sm mt-1 ${
    selectedRoom === room.slug
      ? "text-green-100"
      : "text-gray-500"
  }`}
>
  {room.totalProducts} Produk
</p>
          </button>
        ))}
      </div>

      {/*==============================================
  Category List
==============================================*/}
<section className="mt-10">
  <h2 className="text-2xl font-bold">
    Pilih Jenis Barang
  </h2>

  {!selectedRoom ? (
  <p className="text-gray-500 mt-2">
    Silakan pilih ruangan terlebih dahulu.
  </p>
) : (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
  {roomCategories[selectedRoom]?.map((category) => (
  <button
    key={category}
    onClick={() => setSelectedCategory(category)}
      className={`
  border
  rounded-xl
  px-4
  py-3
  text-left
  transition

  ${
    selectedCategory === category
      ? "bg-green-600 text-white border-green-600"
      : "bg-white hover:bg-green-50 hover:border-green-600"
  }
`}
    >
      {category}
    </button>
  ))}
</div>
)}
  {selectedCategory && (
  <div className="mt-4">

    <p className="text-green-600 font-medium">
      Kategori dipilih: {selectedCategory}
    </p>

    <p className="mt-2 text-green-600 font-medium">
      Total Produk: {filteredProducts.length}
    </p>

    {filteredProducts.length === 0 && (
      <p className="text-gray-500 mt-2">
        Belum ada produk untuk kategori ini.
      </p>
    )}

  </div>
)}

  {/*==============================================
  FILTERED PRODUCTS
==============================================*/}

{filteredProducts.length > 0 && (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

    {filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}

  </div>

)}
  
</section>
      
    </main>
  );
};

/*==================================================
 EXPORT
==================================================*/

export default CategoryPage;