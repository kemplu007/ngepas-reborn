/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Dashboard.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useProducts } from "../../context/ProductContext";

import {
  Package,
  Star,
  Grid2X2,
  Database,
  ArrowUpRight,
} from "lucide-react";

/*==================================================
 DASHBOARD CARD
==================================================*/

function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  valueColor = "text-slate-900",
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        {icon}
      </div>

      <p className={`mt-1 text-3xl font-bold ${valueColor}`}>
        {value}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {subtitle}
        </p>

        <ArrowUpRight
          size={16}
          className="text-emerald-500"
        />
      </div>
    </div>
  );
}

/*==================================================
 DASHBOARD SECTION
==================================================*/

function DashboardSection({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section>
      <p className="text-sm font-semibold text-emerald-600">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-2xl font-bold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

/*==================================================
 QUICK ACTION CARD
==================================================*/

function QuickActionCard({
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        text-left
        transition
        hover:border-emerald-300
        hover:bg-emerald-50
        hover:shadow-sm
      "
    >
      <p className="font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </button>
  );
}

/*==================================================
 ADMIN DASHBOARD
==================================================*/

function Dashboard() {
  /*==================================================
   PRODUCT DATA
  ==================================================*/

  const { products, resetProducts } = useProducts();

  const totalProducts = products.length;

  /*==================================================
 ROOM & CATEGORY STATS
==================================================*/

  const featuredProducts = products.filter(
    (product) => product.featured,
  ).length;

  const databaseStatus = "Online";

  const totalCategories = new Set(products.map((product) => product.category))
    .size;

  /*==================================================
 QUICK ACTIONS
==================================================*/

const quickActions = [
  {
    title: "Tambah Produk",
    description: "Buat produk baru",
    action: () => alert("Coming Soon 🚀"),
  },
  {
    title: "Kelola Kategori",
    description: "Edit kategori",
    action: () => alert("Coming Soon 🚀"),
  },
  {
    title: "Lihat Katalog",
    description: "Preview website",
    action: () => window.open("/", "_self"),
  },
];

  /*==================================================
 LATEST PRODUCTS
==================================================*/

  const latestProducts = [...products].slice(-4).reverse();

  return (
    <main className="min-h-screen bg-slate-50">
      {/*==============================================
       ADMIN HEADER
      ==============================================*/}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>

        <p className="mt-3 text-lg font-medium text-slate-700">
          Selamat datang kembali, Admin! 👋
        </p>

        <p className="mt-2 text-slate-500">
          Kelola Ngepas dengan mudah dan efisien.
        </p>
      </section>
      {/*==============================================
 DASHBOARD STATS
==============================================*/}
      <div
        className="
  mx-auto
  max-w-7xl
  px-4
  mt-8
  grid
  gap-5
  sm:grid-cols-2
  lg:grid-cols-4
"
      >
        {/*============================================
   TOTAL PRODUCTS
  ============================================*/}

        <DashboardCard
  title="Total Produk"
  value={totalProducts}
  subtitle="Produk tersedia di katalog"
  icon={<Package size={18} className="text-emerald-600" />}
/>
        {/*============================================
 FEATURED PRODUCTS
============================================*/}
        
<DashboardCard
  title="Featured Products"
  value={featuredProducts}
  subtitle="Produk unggulan"
  icon={<Star size={18} className="text-yellow-500" />}
/>
        {/*============================================
 TOTAL CATEGORIES
============================================*/}

        <DashboardCard
  title="Total Kategori"
  value={totalCategories}
  subtitle="Kategori aktif"
  icon={<Grid2X2 size={18} className="text-sky-500" />}
/>
        {/*============================================
 DATABASE STATUS
============================================*/}

        <DashboardCard
  title="Database Status"
  value={databaseStatus}
  subtitle="Local Storage Database"
  valueColor="text-emerald-600"
  icon={<Database size={18} className="text-emerald-600" />}
/>
        
 </div>{" "}
      {/*==============================================
MAIN DASHBOARD GRID
==============================================*/}

<div
  className="
    mx-auto
    mt-8
    grid
    max-w-7xl
    gap-6
    px-4
    lg:grid-cols-3
  "
>
      {/*==============================================
 SALES CHART PLACEHOLDER
==============================================*/}
      <section className="lg:col-span-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-600">Analytics</p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
  Dashboard Analytics
</h2>

<div
  className="
    mt-6
    flex
    h-52
    items-center
    justify-center
    rounded-xl
    border-2
    border-dashed
    border-slate-300
    bg-slate-50
  "
>
            <div className="w-full space-y-4">

  <div className="h-3 w-full rounded-full bg-slate-200">
    <div className="h-3 w-4/5 rounded-full bg-emerald-500"></div>
  </div>

  <div className="h-3 w-3/4 rounded-full bg-slate-200">
    <div className="h-3 w-2/3 rounded-full bg-sky-500"></div>
  </div>

  <div className="h-3 w-5/6 rounded-full bg-slate-200">
    <div className="h-3 w-1/2 rounded-full bg-amber-500"></div>
  </div>

  <div className="mt-8 flex items-end justify-between">
    <div className="h-20 w-8 rounded bg-emerald-400"></div>
    <div className="h-28 w-8 rounded bg-emerald-500"></div>
    <div className="h-16 w-8 rounded bg-emerald-300"></div>
    <div className="h-36 w-8 rounded bg-emerald-600"></div>
    <div className="h-24 w-8 rounded bg-emerald-400"></div>
    <div className="h-40 w-8 rounded bg-emerald-700"></div>
  </div>

</div>
          </div>
        </div>
      </section>

  {/*==============================================
 QUICK ACTIONS
==============================================*/}

<DashboardSection
  eyebrow="Quick Actions"
  title="Shortcut"
>

  <div className="space-y-3">

    {quickActions.map((item) => (
      <QuickActionCard
        key={item.title}
        title={item.title}
        description={item.description}
        onClick={item.action}
      />
    ))}

  </div>

</DashboardSection>
      {/*==============================================
 LATEST PRODUCTS
==============================================*/}
      <section className="py-0">
        {/*============================================
   SECTION HEADER
  ============================================*/}

        <DashboardSection
  eyebrow="Product Activity"
  title="Produk Terbaru"
  description="Produk terbaru yang tersedia di katalog Ngepas."
>

        {/*============================================
   PRODUCT LIST
  ============================================*/}

        <div className="mt-5 space-y-2">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="
  flex
  items-center
  gap-3
  rounded-xl
  border
  border-slate-200
  bg-white
  p-4
  transition
  hover:border-emerald-300
  hover:shadow-md
"
            >
              {/* PRODUCT IMAGE */}

              <img
                src={product.image}
                alt={product.name}
                className="
            h-16
            w-16
            shrink-0
            rounded-xl
            object-cover
          "
              />

              {/* PRODUCT INFO */}

              <div className="min-w-0 flex-1">
                <span
  className="
    rounded-full
    bg-emerald-100
    px-2
    py-1
    text-[10px]
    font-semibold
    uppercase
    text-emerald-700
  "
>
  {product.room}
</span>

                <h3
                  className="
            mt-1
            truncate
            text-base
            font-bold
            text-slate-900
          "
                >
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500">
                    {product.price}
                  </p>

                  <span
                    className="
      rounded-full
      bg-emerald-100
      px-3
      py-1
      text-xs
      font-semibold
      text-emerald-700
    "
                  >
                    New
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        </DashboardSection>
        </section>
  </div>
  
      {/*==============================================
 DEVELOPMENT TOOLS
==============================================*/}
      {import.meta.env.DEV && (
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-semibold text-slate-900">Development Tools</p>

            <p className="mt-1 text-sm text-slate-500">
              Kembalikan katalog ke data produk awal.
            </p>

            <button
              type="button"
              onClick={resetProducts}
              className="
        mt-4
        rounded-xl
        bg-slate-900
        px-4
        py-2.5
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-slate-700
      "
            >
              Reset Product Data
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Dashboard;
