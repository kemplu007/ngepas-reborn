/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : FeaturedProducts.jsx
 Module  : Components
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "../../context/ProductContext";

/*==================================================
 FEATURED PRODUCTS
==================================================*/

function FeaturedProducts() {
  const { products, loading } = useProducts();

  /*==================================================
   LOADING STATE
  ==================================================*/
  if (loading)
    return (
      <p className="p-6 text-center text-muted-foreground">Sedang memuat produk...</p>
    );

  /*==================================================
   FEATURED PRODUCTS DATA
  ==================================================*/
  const featuredProducts = products.filter((product) =>
    Boolean(Number(product.featured)),
  );

  /*==================================================
   UI
  ==================================================*/
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      {/*==================================================
        SECTION HEADER
      ==================================================*/}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          <Sparkles size={14} />
          Pilihan Ngepas
        </span>

        <h2 className="mt-4 text-3xl font-bold text-foreground text-balance sm:text-4xl">
          Produk terbaik, sudah kami kurasi
        </h2>

        <p className="mt-4 text-muted-foreground text-pretty">
          Kami sudah memilihkan produk terbaik berdasarkan kualitas, harga, dan
          ulasan. Tinggal pilih yang paling cocok untukmu.
        </p>
      </div>

      {/*==================================================
        PRODUCT GRID
      ==================================================*/}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
