/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductDetail.jsx
 Module  : Pages
 Version : 1.0
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { ArrowLeft, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

/*==================================================
 PRODUCT DETAIL
==================================================*/

function ProductDetail() {
  /*==================================================
  GET URL PARAMETER
  ==================================================*/

  const { slug } = useParams();

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
        <h2 className="text-2xl font-bold">Produk tidak ditemukan.</h2>

        <Link
          to="/"
          className="mt-6 inline-block text-emerald-600 hover:underline"
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
  RELATED PRODUCTS
  ==================================================*/

  const relatedProducts = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
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
        className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
      >
        <ArrowLeft size={18} />
        Kembali
      </Link>

      {/*==================================================
      PRODUCT CONTENT
      ==================================================*/}

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {/*==================================================
        PRODUCT IMAGE
        ==================================================*/}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <img
            src={image}
            alt={name}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/*==================================================
        PRODUCT INFO
        ==================================================*/}

        <div>
          {/* CATEGORY */}

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
            {category}
          </span>

          {/* TITLE */}

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">
            {name}
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-5 leading-8 text-slate-600">{description}</p>

          {/* PRICE */}

          <div className="mt-8">
            <p className="text-base text-slate-400 line-through">
              {originalPrice}
            </p>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-4xl font-extrabold text-emerald-600">
                {price}
              </h2>

              <span className="rounded-lg bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                -{discount}%
              </span>
            </div>
          </div>

          {/* PRODUCT META */}

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              <Star size={16} fill="currentColor" />

              {rating}
            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {sold} Terjual
            </div>

            <div
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                stock > 10
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {stock > 10 ? `Stok ${stock}` : `Sisa ${stock}`}
            </div>
          </div>

          {/* WHY WE RECOMMEND */}

          <div className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              💚 Kenapa Kami Memilih Produk Ini
            </h2>

            <ul className="mt-5 space-y-3">
              {whyWeRecommend.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <span>✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}

          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block w-full rounded-2xl bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-emerald-700"
          >
            🛒 Cek Harga di Marketplace
          </a>

          {/*==================================================
          FEATURES
          ==================================================*/}

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              ✨ Keunggulan
            </h2>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex gap-3 text-slate-700">
                  <span>✅</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/*==================================================
          SPECIFICATIONS
          ==================================================*/}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              📋 Spesifikasi
            </h2>

            <div className="space-y-3">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <span className="font-semibold capitalize text-slate-700">
                    {key}
                  </span>

                  <span className="text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/*==================================================
          BEST FOR
          ==================================================*/}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              🎯 Cocok Untuk
            </h2>

            <ul className="space-y-3">
              {bestFor.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <span>🏡</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/*==================================================
          CONSIDERATIONS
          ==================================================*/}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              ⚠️ Perlu Diketahui
            </h2>

            <ul className="space-y-3">
              {considerations.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <span>ℹ️</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*==================================================
      RELATED PRODUCTS
      ==================================================*/}

      <section className="mt-24">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Produk Serupa</h2>

          <p className="mt-2 text-slate-600">
            Masih satu kategori dan mungkin juga cocok buat kamu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
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
