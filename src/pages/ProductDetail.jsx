/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductDetail.jsx
 Module  : Pages
 Version : 0.3
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { ArrowLeft, Heart, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useFavoriteContext } from "../context/FavoritesContext";

/*==================================================
 PRODUCT DETAIL
==================================================*/

function ProductDetail() {
  /*==================================================
  GET URL PARAMETER
  ==================================================*/

  const { slug } = useParams();

  /*==================================================
 HOOKS
==================================================*/

const { favorites, toggleFavorite } = useFavoriteContext();

  /*==================================================
  FIND PRODUCT
  ==================================================*/

  const product = products.find((item) => item.slug === slug);

  /*==================================================
  PRODUCT NOT FOUND
  ==================================================*/

  if (!product) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          Produk tidak ditemukan.
        </h2>

        <Link
          to="/"
          className="mt-6 inline-block text-emerald-600"
        >
          ← Kembali ke Home
        </Link>
      </section>
    );
  }

  /*==================================================
  DESTRUCTURING
  ==================================================*/

  const {
  name,
  image,
  category,
  description,
  features,
  specifications,
  whyWeRecommend,
  bestFor,
  considerations,
  price,
  originalPrice,
  discount,
  rating,
  sold,
  stock,
  affiliateLink,
} = product;

  /*==================================================
 FAVORITE STATUS
==================================================*/

const isFavorite = favorites.includes(slug);
    /*==================================================
  RELATED PRODUCTS
  ==================================================*/

  const relatedProducts = products
  .filter(
    (item) =>
      item.id !== product.id &&
      item.category === product.category
  )
  .slice(0, 3);
  /*==================================================
  PRODUCT DETAIL UI
  ==================================================*/

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      {/*==================================================
      BACK BUTTON
      ==================================================*/}

      <Link
  to="/"
  className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 transition hover:bg-emerald-100"
>
        <ArrowLeft size={18} />
        Kembali
      </Link>

      {/*==================================================
      CONTENT
      ==================================================*/}

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/*==================================================
        PRODUCT IMAGE
        ==================================================*/}

        <img
          src={image}
          alt={name}
          className="aspect-square w-full rounded-3xl border border-slate-200 object-cover shadow-xl"
        />

        {/*==================================================
        PRODUCT INFO
        ==================================================*/}

        <div className="relative">

          {/*==================================================
 FAVORITE BUTTON
==================================================*/}

<button
  type="button"
  onClick={() => toggleFavorite(slug)}
  className="
    absolute
    right-0
    top-0
    rounded-full
    bg-white
    p-3
    shadow-md
    transition-all
    duration-300
    hover:scale-110
    hover:bg-red-50
  "
>
  <Heart
    size={22}
    className={
      isFavorite
        ? "fill-red-500 text-red-500"
        : "text-slate-500"
    }
  />
</button>

          <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            {category}
          </span>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
            {name}
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-slate-600">
            {description}
          </p>

          {/* PRICE */}

          <div className="mt-8">

            <p className="text-slate-400 line-through text-base">
              {originalPrice}
            </p>

            <div className="flex items-center gap-3">

              <p className="text-4xl font-extrabold text-emerald-600">
                {price}
              </p>

              <span className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                -{discount}%
              </span>

            </div>

          </div>

          {/* META */}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">

            <span className="flex items-center gap-1">
              <Star size={16} fill="currentColor" />
              {rating}
            </span>

            <span className="font-medium">
  {sold} Terjual
</span>

            <span
  className={`rounded-full px-3 py-1 font-medium ${
    stock > 10
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {stock > 10
    ? `🟢 Stok ${stock}`
    : `🔴 Sisa ${stock}`}
</span>

          </div>

          {/* FEATURES */}

          <div className="mt-10">

            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Keunggulan
            </h2>

            <ul className="space-y-3">

              {features.map((feature) => (
                <li key={feature}>
                  ✅ {feature}
                </li>
              ))}

            </ul>

          </div>

          {/* SPECIFICATIONS */}

          <div className="mt-10">

            <h2 className="mb-4 text-xl font-semibold">
              Spesifikasi
            </h2>

            <div className="space-y-3">

              {Object.entries(specifications).map(([key, value]) => (

                <div
                  key={key}
                  className="flex justify-between rounded-xl border p-4"
                >

                  <span className="font-medium capitalize">
                    {key}
                  </span>

                  <span>{value}</span>

                </div>

              ))}

            </div>

          </div>

          {/* WHY WE RECOMMEND */}

<div className="mt-10">

  <h2 className="mb-4 text-2xl font-bold text-slate-900">
  💡 Kenapa Produk Ini Ngepas?
</h2>

  <ul className="space-y-3">

    {whyWeRecommend.map((item) => (
      <li key={item}>✅ {item}</li>
    ))}

  </ul>

</div>

{/* BEST FOR */}

<div className="mt-10">

  <h2 className="mb-4 text-2xl font-bold text-slate-900">
  🎯 Cocok Untuk
</h2>

  <ul className="space-y-3">

    {bestFor.map((item) => (
      <li key={item}>🏡 {item}</li>
    ))}

  </ul>

</div>

{/* CONSIDERATIONS */}

<div className="mt-10">

  <h2 className="mb-4 text-2xl font-bold text-slate-900">
  ⚠ Perlu Diketahui
</h2>

  <ul className="space-y-3">

    {considerations.map((item) => (
      <li key={item}>ℹ️ {item}</li>
    ))}

  </ul>

</div>

          {/* CTA */}

          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 block w-full rounded-2xl bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
          >
            🛒 Cek di Marketplace
          </a>

        </div>

      </div>

            {/*==================================================
      RELATED PRODUCTS
      ==================================================*/}

      <section className="mt-24">

        <h2 className="mb-8 text-3xl font-bold">
          Produk Lainnya
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {relatedProducts.map((item) => (

            <ProductCard
              key={item.id}
              product={item}
            />

          ))}

        </div>

      </section>

    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductDetail;