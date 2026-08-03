/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ProductDetail.jsx
 Module  : Pages
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Star,
  Check,
  Heart,
  Info,
  Sparkles,
  ClipboardList,
  Target,
  ShoppingCart,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/public/ProductCard";

/*==================================================
 PRODUCT DETAIL
==================================================*/

function ProductDetail() {
  /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  const { products, loading } = useProducts();
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Produk tidak ditemukan.
        </h2>

        <Link
          to="/"
          className="mt-6 inline-block text-primary hover:underline"
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
    room,
    category,
    badge,
    tags = [],
    description,
    features = [],
    specifications = {},
    whyWeRecommend = [],
    bestFor = [],
    considerations = [],
    price,
    originalPrice,
    discount,
    rating,
    sold,
    stock,
    affiliateLink,
  } = product;

  /*==================================================
  PRODUCT GALLERY
  ==================================================*/

  const galleryImages = useMemo(() => {
    const images = [];

    if (image) {
      images.push(image);
    }

    if (product.gallery?.length) {
      product.gallery.forEach((item) => {
        if (!images.includes(item)) {
          images.push(item);
        }
      });
    }

    return images;
  }, [image, product.gallery]);

  const [selectedImage, setSelectedImage] = useState(0);
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
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-primary hover:text-primary-foreground"
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

        <div className="space-y-4">
          {/*--------------------------------------------------
  MAIN IMAGE
  --------------------------------------------------*/}

          <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-sm">
            <img
              src={galleryImages[selectedImage]}
              alt={name}
              className="aspect-square w-full rounded-2xl object-cover transition duration-300 hover:scale-105"
            />
          </div>

          {/*--------------------------------------------------
  GALLERY THUMBNAIL
  --------------------------------------------------*/}

          <div className="flex gap-3 overflow-x-auto pb-1">
            {galleryImages.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  selectedImage === index
                    ? "scale-105 border-primary shadow-md"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={item}
                  alt={`${name} ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        {/*==================================================
        PRODUCT INFO
        ==================================================*/}

        <div>
          {/* CATEGORY */}

          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>

            <span>/</span>

            <span>{room}</span>

            <span>/</span>

            <span>{category}</span>

            <span>/</span>

            <span className="font-medium text-foreground">{name}</span>
          </nav>

          <span className="inline-flex rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground">
            {category}
          </span>

          {badge && (
            <span className="ml-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
              {badge}
            </span>
          )}

          {/* TITLE */}

          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-foreground text-balance max-w-2xl">
            {name}
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-5 leading-8 text-muted-foreground">{description}</p>

          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* PRICE */}

          <div className="mt-8">
            <p className="text-base text-muted-foreground line-through">
              {originalPrice}
            </p>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-5xl font-black tracking-tight text-primary">
                {price}
              </h2>

              <span className="rounded-lg bg-destructive/10 px-3 py-1 text-sm font-bold text-destructive">
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

            <div className="rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-foreground">
              {sold} Terjual
            </div>

            <div
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                stock > 10
                  ? "bg-accent text-accent-foreground"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {stock > 10 ? `Stok ${stock}` : `Sisa ${stock}`}
            </div>
          </div>

          {/* WHY WE RECOMMEND */}

          <div className="mt-10 rounded-3xl border border-primary/15 bg-accent p-6">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <Heart size={22} className="text-primary" fill="currentColor" />
              Kenapa Kami Memilih Produk Ini
            </h2>

            <ul className="mt-5 space-y-3">
              {whyWeRecommend.map((item) => (
                <li key={item} className="flex gap-3 text-foreground">
                  <Check size={20} className="mt-0.5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}

          <div className="sticky bottom-4 z-20 mt-8">
            {affiliateLink ? (
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-2xl bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-emerald-700"
              >
                🛒 Cek Harga di Marketplace
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="block w-full cursor-not-allowed rounded-2xl bg-slate-300 px-8 py-4 text-lg font-bold text-slate-500"
              >
                🛒 Link Marketplace Belum Tersedia
              </button>
            )}
          </div>

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
