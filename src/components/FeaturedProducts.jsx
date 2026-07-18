/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : FeaturedProducts.jsx
 Module  : Components
 Version : 0.1
==================================================*/
import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">Produk Pilihan</h2>

          <p className="mt-4 text-slate-600">
            Produk favorit dengan kualitas terbaik dan harga yang pas.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
