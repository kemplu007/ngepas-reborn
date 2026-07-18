/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductDetail.jsx
 Module  : Pages
 Version : 0.2
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";

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

  const product = products.find(
    (item) => item.slug === slug
  );

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
  PRODUCT DETAIL UI
  ==================================================*/

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">

      {/*==================================================
      BACK BUTTON
      ==================================================*/}

      <Link
        to="/"
        className="
          mb-8
          inline-flex
          items-center
          gap-2
          text-emerald-600
          transition
          hover:text-emerald-700
        "
      >
        <ArrowLeft size={18} />
        Kembali
      </Link>

      {/*==================================================
      PRODUCT IMAGE
      ==================================================*/}

      <img
        src={product.image}
        alt={product.name}
        className="mb-8 w-full max-w-md rounded-2xl"
      />

      {/*==================================================
      PRODUCT INFO
      ==================================================*/}

      <h1 className="text-4xl font-bold">
        {product.name}
      </h1>

      <p className="mt-3 text-slate-500">
        {product.category}
      </p>

      <p className="mt-6 text-3xl font-bold text-emerald-600">
        {product.price}
      </p>

      <p className="mt-3">
        ⭐ {product.rating}
      </p>

      <p>
        Terjual {product.sold}
      </p>

    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ProductDetail;