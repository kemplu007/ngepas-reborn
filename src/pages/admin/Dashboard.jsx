/*==================================================
 NGEPAS REBORN
 File    : Dashboard.jsx
 Module  : Admin Pages
==================================================*/

import { useProducts } from "../../context/ProductContext";
import { Package, Star, Grid2X2, Database, ArrowUpRight } from "lucide-react";

/*==================================================
 KOMPONEN KARTU STATISTIK (Reusable)
==================================================*/
function StatCard({ title, value, subtitle, icon, valueColor = "text-slate-900" }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon}
      </div>
      <p className={`mt-1 text-3xl font-bold ${valueColor}`}>{value}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">{subtitle}</p>
        <ArrowUpRight size={16} className="text-emerald-500" />
      </div>
    </div>
  );
}

/*==================================================
 KOMPONEN DASHBOARD UTAMA
==================================================*/
function Dashboard() {
  // Ambil data produk dari Context (Backend)
  const { products } = useProducts();

  /*==============================================
   HITUNG STATISTIK
  ==============================================*/
  const totalProducts = products.length;
  const featuredProducts = products.filter((p) => p.featured === true).length;
  const totalCategories = new Set(products.map((p) => p.category)).size;
  
  // Ambil 5 produk terbaru (berdasarkan ID terbesar)
  const latestProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/*==============================================
       HEADER HALAMAN
      ==============================================*/}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-500">Ringkasan aktivitas produk Ngepas.</p>
      </div>

      {/*==============================================
       GRID STATISTIK (4 KARTU)
      ==============================================*/}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Produk"
          value={totalProducts}
          subtitle="Produk aktif"
          icon={<Package size={18} className="text-emerald-600" />}
        />
        <StatCard
          title="Produk Unggulan"
          value={featuredProducts}
          subtitle="Produk Featured"
          icon={<Star size={18} className="text-yellow-500" />}
        />
        <StatCard
          title="Kategori"
          value={totalCategories}
          subtitle="Kategori aktif"
          icon={<Grid2X2 size={18} className="text-sky-500" />}
        />
        <StatCard
          title="Database"
          value="Online"
          subtitle="SQLite terhubung"
          valueColor="text-emerald-600"
          icon={<Database size={18} className="text-emerald-600" />}
        />
      </div>

      {/*==============================================
       SECTION PRODUK TERBARU
      ==============================================*/}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-slate-900">Produk Terbaru</h2>
        <div className="mt-4 grid grid-cols-1 gap-3">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover border border-slate-100"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{product.category}</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-semibold text-emerald-600">{product.price}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Belum ada produk.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;