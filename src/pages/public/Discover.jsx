/*==================================================
 NGEPAS REBORN
 File    : Discover.jsx
 Module  : Public Discover Page
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { useEffect, useMemo, useState } from "react";
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
import DiscoveryGuide from "../../components/navigation/DiscoveryGuide";
import CampaignBanner from "../../components/discover/CampaignBanner";
import CategoryCard from "../../components/discover/CategoryCard";
import { categoryIconMap, getCategoryIcon } from "../../config/iconMap";

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

const editorialCards = [
  { title: "Cara Memilih Barang yang Aman dan Ngepas", meta: "5 min read", image: shelfImage },
  { title: "Tips Hemat Belanja Online di Marketplace", meta: "4 min read", image: plantImage },
  { title: "Perbedaan Garansi Resmi dan Garansi Toko", meta: "4 min read", image: spiceImage },
];

const discoverCampaign = {
  id: "discover-value",
  eyebrow: "Kurasi yang membantu keputusan",
  title: (
    <>
      Cari barang bagus itu susah. Biar{" "}
      <span className="text-[var(--np-color-green-700)]">Ngepas</span> yang pilihin.
    </>
  ),
  description: "Pilihan lebih ringkas berdasarkan manfaat, kualitas, rating, dan harga.",
  ctaLabel: "Mulai Cari",
  image: lampImage,
  imageLabel: "Pilihan yang lebih Ngepas",
};

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
  return <CampaignBanner campaign={discoverCampaign} onAction={onSearch} />;
}

function CategoryStrip({ categories, selectedCategory, onSelect }) {
  const names = categories.length
    ? categories.slice(0, 8).map((category) => category.name || category.title)
    : Object.keys(categoryIconMap);
  return (
    <section id="kategori-populer" className="mx-auto scroll-mt-24 max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
      <SectionHeading title="Kategori Populer" description="Jalan cepat menuju pilihan yang paling relevan." action={<Link to="/category" className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold text-emerald-700 transition-colors duration-np-fast ease-np-standard hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2">Selengkapnya <ChevronRight size={15} /></Link>} />
      <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8">
        {names.map((name) => {
          const Icon = getCategoryIcon(name);
          const active = selectedCategory === name;
          return (
            <CategoryCard
              key={name}
              name={name}
              active={active}
              onSelect={() => onSelect(active ? "" : name)}
              icon={<Icon size={20} strokeWidth={1.8} />}
            />
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
      <SectionHeading eyebrow="Sedang dicari" title="Trending Minggu Ini" description="Pilihan yang sedang banyak dilihat dan dibandingkan." action={<Link to="/#hasil-produk" className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold text-emerald-700 transition-colors duration-np-fast ease-np-standard hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2">Selengkapnya <ChevronRight size={15} /></Link>} />
      <div className="flex gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-4 sm:overflow-visible">
        {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} compact favorite={favorites.includes(product.slug)} onFavorite={onFavorite} />)}
      </div>
    </section>
  );
}

function ArticlesSection() {
  return (
    <section id="artikel-tips" className="mx-auto scroll-mt-24 max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
      <SectionHeading eyebrow="Biar makin yakin" title="Artikel & Tips" description="Panduan singkat sebelum kamu menentukan pilihan." action={<a href="#artikel-tips" className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold text-emerald-700 transition-colors duration-np-fast ease-np-standard hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-green-700)] focus-visible:ring-offset-2">Selengkapnya <ChevronRight size={15} /></a>} />
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeGuideStep, setActiveGuideStep] = useState("start");

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

  useEffect(() => {
    const updateGuideStep = () => {
      const viewportMarker = window.scrollY + window.innerHeight * 0.35;
      const categoryTop = document.getElementById("kategori-populer")?.offsetTop ?? Number.POSITIVE_INFINITY;
      const resultsTop = document.getElementById("hasil-produk")?.offsetTop ?? Number.POSITIVE_INFINITY;
      const nextStep = viewportMarker >= resultsTop ? "understand" : viewportMarker >= categoryTop ? "explore" : "start";
      setActiveGuideStep((currentStep) => (currentStep === "decide" ? currentStep : nextStep));
    };

    updateGuideStep();
    window.addEventListener("scroll", updateGuideStep, { passive: true });
    return () => window.removeEventListener("scroll", updateGuideStep);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveGuideStep("explore");
  };

  const submitSearch = () => {
    setSubmittedQuery(query);
    setShowFilters(false);
    setActiveGuideStep("understand");
    document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openFilters = () => {
    setShowFilters(true);
    setActiveGuideStep("understand");
    document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (slug && selectedProduct) {
    return <><DiscoverHeader query={query} onQueryChange={setQuery} onSubmit={submitSearch} onFilter={openFilters} /><DiscoverDetail product={selectedProduct} favorite={favorites.includes(selectedProduct.slug)} onFavorite={toggleFavorite} /></>;
  }

  return (
    <div className="min-h-screen bg-white pb-32 text-slate-900 lg:pb-0">
      <DiscoverHeader
        query={query}
        onQueryChange={setQuery}
        onSubmit={submitSearch}
        onFilter={openFilters}
        searchOpen={searchOpen}
        onSearchOpen={() => {
          setSearchOpen(true);
          setActiveGuideStep("start");
        }}
        onSearchClose={() => setSearchOpen(false)}
      />
      <DiscoverHero onSearch={() => {
        setActiveGuideStep("understand");
        document.getElementById("hasil-produk")?.scrollIntoView({ behavior: "smooth" });
      }} />
      <CategoryStrip categories={categories} selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
      <section id="hasil-produk" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-6 sm:px-6 sm:py-10">
        <SectionHeading eyebrow="Kurasi Ngepas" title="Pilihan Ngepas Untukmu" description="Produk pilihan berdasarkan manfaat, rating, dan informasi yang tersedia." action={<button type="button" onClick={() => setShowFilters((open) => !open)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-emerald-200 hover:text-emerald-800"><SlidersHorizontal size={15} /> Filter</button>} />
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1"><button type="button" onClick={() => { setSelectedCategory(""); setActiveGuideStep("explore"); }} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${!selectedCategory ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600"}`}>Pilihan Ngepas</button>{["Terbaru", "Promo", "Elektronik", "Rumah"].map((tab) => <button key={tab} type="button" onClick={() => { setSelectedCategory(tab === "Rumah" ? tab : ""); setActiveGuideStep("understand"); }} className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{tab}</button>)}</div>
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
      <DiscoveryGuide
        activeStep={activeGuideStep}
        searchOpen={searchOpen}
        onStepChange={setActiveGuideStep}
        onStart={() => {
          setSearchOpen(true);
          setActiveGuideStep("start");
        }}
      />
    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Discover;
