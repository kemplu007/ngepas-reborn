/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : CategoryPage.jsx
 Module  : Pages
==================================================*/

import rooms from "../data/rooms";
import { useState } from "react";
import roomCategories from "../data/roomCategories";

/*==================================================
 CATEGORY PAGE
==================================================*/

const CategoryPage = () => {

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  
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
            className="
              border
              rounded-2xl
              p-4
              bg-white
              transition
              hover:shadow-lg
              text-left
            "
          >
            {/* Image Placeholder */}
            <div className="aspect-square rounded-xl bg-gray-100 mb-4" />

            {/* Room Name */}
            <h2 className="font-semibold text-lg">
              {room.name}
            </h2>

            {/* Product Count */}
            <p className="text-sm text-gray-500 mt-1">
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
      className="
        border
        rounded-xl
        px-4
        py-3
        text-left
        hover:border-green-600
        hover:bg-green-50
        transition
      "
    >
      {category}
    </button>
  ))}
</div>
)}
  {selectedCategory && (
  <p className="mt-4 text-green-600 font-medium">
    Kategori dipilih: {selectedCategory}
  </p>
)}
</section>
      
    </main>
  );
};

/*==================================================
 EXPORT
==================================================*/

export default CategoryPage;