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

import { useState } from "react";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import products from "../data/products";

/*==================================================
 FEATURED PRODUCTS
==================================================*/

function FeaturedProducts() {

  /*==================================================
   STATE
  ==================================================*/

  const [activeCategory, setActiveCategory] = useState("All");

  /*==================================================
   FILTER PRODUCTS
  ==================================================*/

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  /*==================================================
   UI
  ==================================================*/

  return (
    <section className="px-6 py-16 bg-slate-50">

      {/*==================================================
        SECTION HEADER
      ==================================================*/}

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-800">
          Produk Pilihan
        </h2>

        <p className="mt-3 text-slate-600">
          Temukan produk terbaik pilihan kami dengan kualitas terpercaya.
        </p>
      </div>

      {/*==================================================
        CATEGORY FILTER
      ==================================================*/}

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/*==================================================
        PRODUCT GRID
      ==================================================*/}

      <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default FeaturedProducts;
