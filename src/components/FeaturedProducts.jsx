/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : FeaturedProducts.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim, ChatGPT & Gemini
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductContext";

/*==================================================
 FEATURED PRODUCTS
==================================================*/

function FeaturedProducts() {

    /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  const { products } = useProducts();

  
/*==================================================
 FEATURED PRODUCTS DATA
==================================================*/

const featuredProducts = products.filter(
  (product) => product.featured === true
);
  /*==================================================
   UI
  ==================================================*/

  return (
    <section className="px-6 py-16 bg-slate-50">
      {/*==================================================
        SECTION HEADER
      ==================================================*/}

      {/*==================================================
  SECTION HEADER
==================================================*/}

      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          ✨ Pilihan Ngepas
        </h2>

        <p className="mt-4 text-slate-600">
          Kami sudah memilihkan produk terbaik berdasarkan kualitas, harga, dan
          ulasan. Tinggal pilih yang paling cocok untukmu.
        </p>
      </div>

      {/*==================================================
        CATEGORY FILTER
      ==================================================*/}

      {/*==================================================
        PRODUCT GRID
      ==================================================*/}

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default FeaturedProducts;
