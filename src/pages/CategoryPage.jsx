/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : CategoryPage.jsx
 Module  : Pages
==================================================*/

import rooms from "../data/rooms";
import { useState } from "react";
import roomCategories from "../data/roomCategories";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

/*==================================================
 CATEGORY PAGE
==================================================*/

const CategoryPage = () => {

    /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  /*
  Mengambil data produk dari ProductContext
  agar halaman kategori menggunakan shared product state.
  */

  const { products } = useProducts();

  
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  /*==================================================
 SEARCH STATE
==================================================*/

  /*
Menyimpan kata kunci pencarian.
Digunakan untuk memfilter produk
secara realtime.
*/

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("default");

  /*==================================================
 FILTER PRODUCTS
==================================================*/

  const filteredProducts = products.filter(
    (product) =>
      product.room === selectedRoom &&
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /*==================================================
 SORT PRODUCTS
==================================================*/

  /*
Mengurutkan produk sesuai pilihan user.
*/

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "rating":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;

    case "price":
      sortedProducts.sort(
        (a, b) =>
          Number(a.price.replace(/\D/g, "")) -
          Number(b.price.replace(/\D/g, "")),
      );
      break;

    case "sold":
      sortedProducts.sort((a, b) => b.sold - a.sold);
      break;

    default:
      break;
  }

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
              setSearchTerm("");
              setSortBy("default");
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
            <h2 className="font-semibold text-lg">{room.name}</h2>

            {/* Product Count */}
            <p
              className={`text-sm mt-1 ${
                selectedRoom === room.slug ? "text-green-100" : "text-gray-500"
              }`}
            >
              {products.filter((product) => product.room === room.slug).length}{" "}
              Produk
            </p>
          </button>
        ))}
      </div>

      {/*==============================================
  Category List
==============================================*/}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Pilih Jenis Barang</h2>

        {!selectedRoom ? (
          <p className="text-gray-500 mt-2">
            Silakan pilih ruangan terlebih dahulu.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            {roomCategories[selectedRoom]?.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchTerm("");
                  setSortBy("default");
                }}

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
 PRODUCT SEARCH
==============================================*/}

        {selectedCategory && (
          <div className="mt-8 mb-8">
            <input
              type="text"
              placeholder="🔍 Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
        w-full
        rounded-2xl
        border
        border-slate-300
        px-5
        py-4
        outline-none
        transition
        focus:border-green-600
        focus:ring-2
        focus:ring-green-200
      "
            />
          </div>
        )}

        {/*==============================================
 PRODUCT SORT
==============================================*/}

        {selectedCategory && (
          <div className="mb-8">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
      w-full
      rounded-2xl
      border
      border-slate-300
      px-5
      py-4
      outline-none
      focus:border-green-600
      focus:ring-2
      focus:ring-green-200
    "
            >
              <option value="default">Default</option>

              <option value="rating">⭐ Rating Tertinggi</option>

              <option value="price">💰 Harga Termurah</option>

              <option value="sold">🔥 Terlaris</option>
            </select>
          </div>
        )}
        {/*==================================================
 NGEPAS INFO
==================================================*/}

        {filteredProducts.length > 0 && (
          <div
            className="
  mb-8
  rounded-3xl
  border
  border-emerald-200
  bg-emerald-50
  p-6
"
          >
            <h2 className="text-2xl font-bold text-emerald-700">
              💚 5 Pilihan Ngepas
            </h2>

            <p className="mt-3 text-slate-600 leading-7">
              Kami sudah memilihkan produk terbaik berdasarkan kualitas, harga,
              dan ulasan positif agar kamu tidak perlu bingung memilih.
            </p>
          </div>
        )}

        {/*==============================================
  FILTERED PRODUCTS
==============================================*/}

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
