/*==================================================
 NGEPAS REBORN
 File    : Discover.jsx
 Module  : Public Discover Page
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Heart,
  Home,
  LayoutGrid,
  Lightbulb,
  Search,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Truck,
} from "lucide-react";

import { useCategories } from "../../context/CategoryContext";
import { useProducts } from "../../context/ProductContext";
import { useFavoriteContext } from "../../context/FavoritesContext";
import DiscoverHeader from "../../components/public/DiscoverHeader";
import SectionHeading from "../../components/ui/SectionHeading";
import ProductCard from "../../components/discover/ProductCard";
import FilterPanel from "../../components/discover/FilterPanel";
import BottomNavigation from "../../components/navigation/BottomNavigation";

import lampImage from "../../assets/products/lampu-tidur.jpg";
import shelfImage from "../../assets/products/rak-dinding.jpg";
import spiceImage from "../../assets/products/rak-bumbu.jpg";
import plantImage from "../../assets/products/tanaman.jpg";

/*==================================================
 DISCOVER DATA
==================================================*/

const demoProducts = [
  { id: "demo-1", slug: "lampu-tidur-minimalis", name: "Lampu Tidur Minimalis", category: "Rumah", image: lampImage, price: 129000, rating: 4.8, badge: "Pilihan Ngepas", reason: "Cahaya hangat, bentuk ringkas, dan mudah dipakai setiap hari.", featured: true, whyWeRecommend: ["Cahaya hangat untuk kamar", "Ukuran ringkas", "Mudah dirawat"], features: ["Lampu LED", "Material ABS", "Kabel USB"], bestFor: ["Kamar tidur", "Meja kerja"] },
  { id: "demo-2", slug: "rak-dinding-kayu", name: "Rak Dinding Kayu Serbaguna", category: "Rumah", image: shelfImage, price: 189000, rating: 4.7, badge: "Teruji", reason: "Membantu menyimpan barang tanpa membuat ruang terasa penuh.", featured: true, whyWeRecommend: ["Hemat ruang", "Mudah dipasang", "Desain netral"], features: ["Kayu solid", "Beban hingga 10 kg", "Finishing matte"], bestFor: ["Ruang tamu", "Kamar"] },
  { id: "demo-3", slug: "rak-bumbu-dapur", name: "Rak Bumbu Dapur 3 Tingkat", category: "Dapur", image: spiceImage, price: 99000, rating: 4.6, badge: "Harga Ngepas", reason: "Pilihan praktis untuk dapur kecil yang butuh lebih rapi.", featured: true, whyWeRecommend: ["Memakai ruang vertikal", "Tiga tingkat penyimpanan", "Mudah dibersihkan"], features: ["Besi powder coat", "Anti-slip", "3 tingkat"], bestFor: ["Dapur kecil", "Apartemen"] },
  { id: "demo-4", slug: "tanaman-hias-daun", name: "Tanaman Hias Daun Indoor", category: "Dekorasi", image: plantImage, price: 79000, rating: 4.5, badge: "Terbaru", reason: "Aksen hijau sederhana untuk membuat sudut ruang terasa hidup.", featured: true, whyWeRecommend: ["Cocok untuk indoor", "Perawatan mudah", "Membuat ruang lebih segar"], features: ["Pot keramik", "Tinggi 35 cm", "Cahaya tidak langsung"], bestFor: ["Meja kerja", "Ruang tamu"] },
];

const categoryIcons = [
  { label: "Elektronik", icon: "▣" },
  { label: "Komputer", icon: "▤" },
  { label: "Rumah", icon: "⌂" },
  { label: "Otomotif", icon: "▱" },
  { label: "Dapur", icon: "♨" },
  { label: "Fashion", icon: "◇" },
  { label: "Kesehatan", icon: "♡" },
  { label: "Lainnya", icon: "⋯" },
];

const editorialCards = [
  { title: "Cara Memilih Barang yang Aman dan Ngepas", meta: "5 min read", image: shelfImage },
  { title: "Tips Hemat Belanja Online di Marketplace", meta: "4 min read", image: plantImage },
  { title: "Perbedaan Garansi Resmi dan Garansi Toko", meta: "4 min read", image: spiceImage },
];

function toSlug(value = "") {
  return value.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatPrice(value) {
  if (typeof value === "string" && value.includes("Rp")) return value;
  return `Rp ${new Intl.NumberFormat("id-ID").format(Number(value) || 0)}`;
}

function normalizeProduct(product) {
  return {
    ...product,
    slug: product.slug || toSlug(product.name),
    category: typeof product.category === "object" ? product.category?.name : product.category || "Pilihan",
    price: product.price ?? 0,
    rating: product.rating || 4.5,
    image: product.image || lampImage,
    badge: product.badge || (product.featured ? "Pilihan Ngepas" : "Teruji"),
    whyWeRecommend: product.whyWeRecommend || [product.reason || "Dipilih berdasarkan manfaat dan kebutuhan pengguna."],
    features: product.features || ["Informasi produk jelas", "Mudah digunakan"],
    bestFor: product.bestFor || ["Penggunaan sehari-hari"],
    reviewCount: product.reviewCount || product.reviewsCount || "—",
    marketplace: product.marketplace || "Data katalog",
  };
}

/*==================================================
 SMALL COMPONENTS
==================================================*/

function DiscoverHero({ onSearch }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-10">
      <div className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-amber-50/60 px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-0 right-20 h-24 w-24 rounded-full bg-amber-300/40 blur-2xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Kurasi yang membantu keputusan
            </span>
            <h1 className="mt-5 max-w-xl text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl">
              Cari barang bagus itu susah.<br />Biar <span className="text-emerald-700">Ngepas</span> yang pilihin.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Kami bantu menyaring pilihan berdasarkan manfaat, kualitas, rating, dan harga supaya kamu tidak perlu membuka terlalu banyak toko.
            </p>
            <div className="mt-6 grid gap-2 text-sm text-slate-700 sm:grid-cols-3 sm:gap-3">
              {["Dibandingkan di banyak toko", "Pilih produk terbaik", "Hemat waktu & uang"].map((item) => (
                <div key={item} className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0 text-emerald-600" /> <span>{item}</span></div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onSearch} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800">
                Mulai Cari Sekarang <ArrowRight size={17} />
              </button>
              <a href="#cara-kerja" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800">
                <Lightbulb size={17} /> Cara Kerja Ngepas
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -right-4 top-8 h-24 w-24 rounded-full bg-amber-300/50 blur-2xl" />
            <div className="absolute bottom-10 left-0 h-32 w-32 rounded-full bg-emerald-100/80 blur-2xl" />
            <div className="relative mx-auto max-w-[360px] overflow-hidden rounded-[28px] border border-white bg-white/80 p-3 shadow-[0_24px_70px_rgba(6,78,59,0.14)]">
              <div className="relative overflow-hidden rounded-[22px] bg-emerald-50">
                <img src={lampImage} alt="Contoh produk pilihan Ngepas" className="aspect-square w-full object-cover mix-blend-multiply" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
                  <span className="text-[11px] font-bold text-emerald-800">Pilihan yang lebih Ngepas</span>
                  <Sparkles size={15} className="text-amber-500" />
                </div>
              </div>
            </div>
            <div className="mx-auto mt-4 flex max-w-[360px] items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm">
              <Scale size={16} className="text-emerald-700" /> Dibandingkan dari 5+ marketplace
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryStrip({ categories, selectedCategory, onSelect }) {
  const names = categories.length ? categories.slice(0, 8).map((category) => category.name || category.title) : categoryIcons.map((item) => item.label);
  return (
    <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
      <SectionHeading title="Kategori Populer" description="Jalan cepat menuju pilihan yang paling relevan." action={<button type="button" className="hidden items-center gap-1 text-sm font-bold text-emerald-700 sm:flex">Lihat semua <ChevronRight size={16} /></button>} />
      <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8">
        {names.map((name, index) => {
          const icon = categoryIcons[index % categoryIcons.length].icon;
          const active = selectedCategory === name;
          return (
            <button key={name} type="button" onClick={() => onSelect(active ? "" : name)} className={`min-w-[92px] rounded-2xl border px-3 py-4 text-center transition sm:min-w-0 ${active ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm" : "border-slate-100 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-800"}`}>
              <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-xl text-slate-700">{icon}</span>
              <span className="mt-2 block truncate text-xs font-bold">{name}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"><BadgeCheck size={19} className="text-emerald-600" /> Pilih kategori untuk melihat rekomendasi yang lebih relevan.</div>
    </section>
  );
}

function TrustStrip() {
  return <div className="mt-5 grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3"><div className="flex items-center gap-3 text-xs text-slate-600"><ShieldCheck size={20} className="text-emerald-700" /><span><strong className="block text-slate-800">Kurasi transparan</strong>Alasan rekomendasi jelas.</span></div><div className="flex items-center gap-3 text-xs text-slate-600"><Truck size={20} className="text-emerald-700" /><span><strong className="block text-slate-800">Bantu hemat waktu</strong>Pilihan lebih ringkas.</span></div><div className="flex items-center gap-3 text-xs text-slate-600"><BadgeCheck size={20} className="text-emerald-700" /><span><strong className="block text-slate-800">Bukan checkout</strong>Kamu tetap belanja di marketplace.</span></div></div>;
}

function TrendingSection({ products, favorites, onFavorite }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
      <SectionHeading eyebrow="Sedang dicari" title="Trending Minggu Ini" description="Pilihan yang sedang banyak dilihat dan dibandingkan." action={<button type="button" className="hidden items-center gap-1 text-sm font-bold text-emerald-700 sm:flex">Lihat semua <ChevronRight size={16} /></button>} />
      <div className="flex gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-4 sm:overflow-visible">
        {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} compact favorite={favorites.includes(product.slug)} onFavorite={onFavorite} />)}
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
      <SectionHeading eyebrow="Biar makin yakin" title="Artikel & Tips" description="Panduan singkat sebelum kamu menentukan pilihan." action={<button type="button" className="hidden items-center gap-1 text-sm font-bold text-emerald-700 sm:flex">Lihat semua <ChevronRight size={16} /></button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        {editorialCards.map((article) => (
          <article key={article.title} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <img src={article.image} alt="" className="aspect-[1.45] w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400"><BookOpen size={12} /> {article.meta}</div>
              <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-slate-900">{article.title}</h3>
              <button type="button" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">Baca ringkas <ArrowRight size={13} /></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Cari kebutuhanmu", text: "Mulai dari kategori atau kata kunci yang paling dekat." },
    { number: "02", title: "Pahami alasannya", text: "Lihat manfaat, rating, spesifikasi, dan pertimbangan." },
    { number: "03", title: "Checkout di marketplace", text: "Ngepas membantu memilih; transaksi tetap di toko tujuan." },
  ];
  return (
    <section id="cara-kerja" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-7 sm:px-6 sm:py-10">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:p-7">
        <SectionHeading eyebrow="Sederhana dan jelas" title="Cara Kerja Ngepas" description="Bantu kamu bergerak dari kebutuhan ke pilihan dengan lebih tenang." />
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step) => <div key={step.number} className="rounded-xl border border-white bg-white/80 p-4"><span className="text-2xl font-extrabold text-emerald-700">{step.number}</span><h3 className="mt-2 text-sm font-bold text-slate-900">{step.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{step.text}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function WhyNgepasSection() {
  const values = [
    { icon: Scale, title: "Dibandingkan", text: "Pilihan disaring dari banyak toko." },
    { icon: Tag, title: "Harga terbaik", text: "Informasi harga ditampilkan apa adanya." },
    { icon: ShieldCheck, title: "Aman & terpercaya", text: "Alasan rekomendasi dibuat jelas." },
    { icon: Clock3, title: "Update setiap hari", text: "Data mengikuti informasi yang tersedia." },
  ];
  return (
    <section id="why-ngepas" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-7 sm:px-6 sm:pt-10">
      <SectionHeading eyebrow="Kepercayaan" title="Why Ngepas?" description="Kami membuat pilihan lebih ringkas, jelas, dan tidak terasa seperti didorong untuk membeli." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {values.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-slate-100 bg-white p-4 text-center sm:p-5"><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Icon size={19} /></div><h3 className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">{title}</h3><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{text}</p></div>)}
      </div>
    </section>
  );
}

function DiscoverDetail({ product, favorite, onFavorite }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700"><ArrowLeft size={17} /> Kembali ke Discover</Link>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-slate-50 p-4"><img src={product.image} alt={product.name} className="aspect-square w-full rounded-2xl object-cover" /></div>
        <div>
          <span className="inline-flex rounded-md bg-emerald-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{product.badge}</span>
          <p className="mt-4 text-sm font-semibold text-slate-400">{product.category}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600"><Star size={18} className="fill-amber-400 text-amber-400" /> <strong>{product.rating}</strong> · Review terkurasi</div>
          <p className="mt-5 text-2xl font-extrabold text-emerald-700">{formatPrice(product.price)}</p>
          <p className="mt-1 text-xs text-slate-400">Pembaruan harga mengikuti data produk yang tersedia.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800">⚖ Bandingkan Marketplace</button><button type="button" onClick={() => onFavorite(product.slug)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:border-emerald-200"><Heart size={17} className={favorite ? "fill-rose-500 text-rose-500" : ""} /> {favorite ? "Tersimpan" : "Simpan ke Favorite"}</button></div>
          <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5"><h2 className="font-bold text-slate-900">Kenapa Kami Memilih Produk Ini</h2><ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">{product.whyWeRecommend.map((reason) => <li key={reason} className="flex gap-2"><Check size={17} className="mt-0.5 shrink-0 text-emerald-700" /> {reason}</li>)}</ul></section>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3"><section className="rounded-2xl border border-slate-100 bg-white p-5"><h2 className="font-bold text-slate-900">Spesifikasi Utama</h2><ul className="mt-3 space-y-2 text-sm text-slate-600">{product.features.map((feature) => <li key={feature} className="border-b border-slate-100 pb-2">{feature}</li>)}</ul></section><section className="rounded-2xl border border-slate-100 bg-white p-5"><h2 className="font-bold text-slate-900">Cocok Untuk</h2><div className="mt-3 flex flex-wrap gap-2">{product.bestFor.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{item}</span>)}</div></section><section className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5"><h2 className="font-bold text-slate-900">Catatan Ngepas</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Ngepas membantu memilih. Saat kamu siap, CTA marketplace akan membuka toko di luar Ngepas; checkout tidak terjadi di sini.</p></section></div>
    </main>
  );
}

/*==================================================
 PAGE
==================================================*/

function Discover() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useProducts();
  const { categories } = useCategories();
  const { favorites, toggleFavorite } = useFavoriteContext();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const catalog = useMemo(() => {
    const source = products.length ? products : demoProducts;
    return source.map(normalizeProduct);
  }, [products]);

  const selectedProduct = catalog.find((product) => product.slug === slug);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();
    return catalog.filter((product) => {
      const matchesQuery = !normalizedQuery || `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [catalog, selectedCategory, submittedQuery]);

  const featuredProducts = filteredProducts.filter((product) => product.featured).slice(0, 6);
  const visibleProducts = featuredProducts.length ? featuredProducts : filteredProducts.slice(0, 6);

  const submitSearch = () => {
    setSubmittedQuery(query);
    setShowFilters(false);
    document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openFilters = () => {
    setShowFilters(true);
    document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (slug && selectedProduct) {
    return <><DiscoverHeader query={query} onQueryChange={setQuery} onSubmit={submitSearch} onFilter={openFilters} /><DiscoverDetail product={selectedProduct} favorite={favorites.includes(selectedProduct.slug)} onFavorite={toggleFavorite} /></>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DiscoverHeader query={query} onQueryChange={setQuery} onSubmit={submitSearch} onFilter={openFilters} />
      <DiscoverHero onSearch={() => { document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth" }); }} />
      <CategoryStrip categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <section id="hasil-produk" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-6 sm:px-6 sm:py-10">
        <SectionHeading eyebrow="Kurasi Ngepas" title="Pilihan Ngepas Untukmu" description="Produk pilihan berdasarkan manfaat, rating, dan informasi yang tersedia." action={<button type="button" onClick={() => setShowFilters((open) => !open)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-800"><SlidersHorizontal size={15} /> Filter</button>} />
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1"><button type="button" onClick={() => setSelectedCategory("")} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${!selectedCategory ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600"}`}>Pilihan Ngepas</button>{["Terbaru", "Promo", "Elektronik", "Rumah"].map((tab) => <button key={tab} type="button" onClick={() => setSelectedCategory(tab === "Rumah" ? tab : "")} className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{tab}</button>)}</div>
        <FilterPanel
          open={showFilters}
          category={selectedCategory}
          categories={Array.from(new Set(catalog.map((product) => product.category)))}
          onCategoryChange={setSelectedCategory}
          onReset={() => {
            setSelectedCategory("");
            setSubmittedQuery("");
            setQuery("");
          }}
        />
        {productsLoading && <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Menyiapkan pilihan dari katalog...</div>}
        {submittedQuery && <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"><span>Hasil untuk <strong>“{submittedQuery}”</strong></span><button type="button" onClick={() => { setSubmittedQuery(""); setQuery(""); }} className="font-bold text-emerald-700">Hapus</button></div>}
        {visibleProducts.length ? <div className="flex gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} favorite={favorites.includes(product.slug)} onFavorite={toggleFavorite} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center"><Search className="mx-auto text-slate-300" size={30} /><p className="mt-3 font-bold text-slate-800">Belum ada produk yang cocok</p><p className="mt-1 text-sm text-slate-500">Coba kata kunci atau kategori lain.</p></div>}
        <TrustStrip />
      </section>
      <TrendingSection products={catalog} favorites={favorites} onFavorite={toggleFavorite} />
      <ArticlesSection />
      <HowItWorksSection />
      <WhyNgepasSection />
      <footer className="border-t border-slate-100 bg-slate-50/70 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link to="/" className="text-xl font-extrabold tracking-tight text-emerald-800">Ngepas<span className="text-amber-400">.</span></Link>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-500">Platform kurasi yang membantu kamu memilih. Ngepas bukan toko dan checkout tetap terjadi di marketplace.</p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500" aria-label="Navigasi footer">
            <Link to="/" className="transition hover:text-emerald-700">Discover</Link>
            <Link to="/category" className="transition hover:text-emerald-700">Kategori</Link>
            <Link to="/#why-ngepas" className="transition hover:text-emerald-700">Why Ngepas</Link>
          </nav>
        </div>
      </footer>
      <BottomNavigation
        active="home"
        onSearch={() => document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth" })}
        onAccount={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Discover;
