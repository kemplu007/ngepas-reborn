/*==================================================
 NGEPAS REBORN
 File    : Dashboard.jsx
 Module  : Admin Pages — Dashboard + Statistik
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* Context */
import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";

/* Components */
import AdminDataState from "../../components/admin/AdminDataState";

/* Icons */
import {
  Package,
  Star,
  Grid2X2,
  Database,
  ArrowUpRight,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";

/* Router */
import { Link } from "react-router-dom";

/*==================================================
 STAT CARD
==================================================*/

function StatCard({
  title,
  value,
  subtitle,
  icon,
  valueColor = "text-slate-900",
}) {
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
 DASHBOARD
==================================================*/

function Dashboard() {
  /*==================================================
   CONTEXT
  ==================================================*/

  const {
    adminProducts: products = [],
    adminLoading,
    adminError,
  } = useProducts();
  const {
    categories = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  /*==================================================
   STATISTICS
  ==================================================*/

  const totalProducts = products?.length || 0;

  const featuredProducts = products.filter((product) =>
    Boolean(Number(product.featured)),
  ).length;

  const totalCategories = categories?.length || 0;

  /* Low Stock Products */
  const lowStockProducts = products.filter(
    (p) => Number(p.stock) <= 5 && Number(p.stock) >= 0,
  );

  /* Out of Stock */
  const outOfStock = products.filter((p) => Number(p.stock) === 0);

  /* Category Stats */
  const categoryStats = categories.map((cat) => ({
    ...cat,
    productCount: products.filter(
      (p) =>
        p.category?.toLowerCase() === cat.name?.toLowerCase() ||
        p.category?.toLowerCase() === cat.slug?.toLowerCase(),
    ).length,
  }));

  /* Top Selling (by sold count) */
  const topSelling = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5);

  /* Latest Products */
  const latestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  /* Total Revenue Estimate (price * sold) */
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.sold || 0),
    0,
  );
  const isLoading = adminLoading || categoriesLoading;
  const loadError = adminError || categoriesError;
  const isCatalogEmpty = products.length === 0 && categories.length === 0;

  /*==================================================
   RENDER
  ==================================================*/

  return (
    <div className="flex flex-col gap-6">
      {/*==================================================
       HEADER
      ==================================================*/}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Ringkasan aktivitas produk Ngepas.
        </p>
      </div>

      {isLoading ? (
        <AdminDataState
          state="loading"
          title="Memuat data admin"
          description="Katalog produk dan kategori sedang disiapkan."
        />
      ) : loadError ? (
        <AdminDataState
          state="error"
          title="Data admin belum dapat dimuat"
          description={loadError}
        />
      ) : isCatalogEmpty ? (
        <AdminDataState
          state="empty"
          title="Katalog admin masih kosong"
          description="Tambahkan kategori lalu produk saat konten kurasi siap dikelola."
        />
      ) : (
        <>

      {/*==================================================
       STATISTICS ROW 1
      ==================================================*/}
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
          title="Status data"
          value="Siap"
          subtitle="Katalog admin dan kategori termuat"
          valueColor="text-emerald-600"
          icon={<Database size={18} className="text-emerald-600" />}
        />
      </div>

      {/*==================================================
       STATISTICS ROW 2 — NEW
      ==================================================*/}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard
          title="Estimasi Revenue"
          value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
          subtitle="price × sold"
          valueColor="text-emerald-700"
          icon={<TrendingUp size={18} className="text-emerald-600" />}
        />

        <StatCard
          title="Stok Menipis"
          value={lowStockProducts.length}
          subtitle="≤ 5 unit"
          valueColor={lowStockProducts.length > 0 ? "text-amber-600" : "text-slate-900"}
          icon={<AlertTriangle size={18} className="text-amber-500" />}
        />

        <StatCard
          title="Stok Habis"
          value={outOfStock.length}
          subtitle="0 unit tersedia"
          valueColor={outOfStock.length > 0 ? "text-red-600" : "text-slate-900"}
          icon={<ShoppingCart size={18} className="text-red-500" />}
        />
      </div>

      {/*==================================================
       KATEGORI STATISTIK — NEW
      ==================================================*/}
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Produk per Kategori
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryStats.length > 0 ? (
            categoryStats.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span className="text-2xl">{cat.icon || "📁"}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {cat.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {cat.productCount} produk
                  </p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {((cat.productCount / (totalProducts || 1)) * 100).toFixed(0)}%
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Belum ada kategori.</p>
          )}
        </div>
      </div>

      {/*==================================================
       TOP SELLING — NEW
      ==================================================*/}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Produk Terlaris</h2>

        <div className="mt-4 grid gap-3">
          {topSelling.length > 0 ? (
            topSelling.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {idx + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg border border-slate-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {product.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      Terjual {product.sold || 0} unit
                    </span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Belum ada data penjualan.</p>
          )}
        </div>
      </div>

      {/*==================================================
       LOW STOCK WARNING — NEW
      ==================================================*/}
      {lowStockProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-amber-700">
            Peringatan Stok Menipis
          </h2>

          <div className="mt-4 grid gap-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4"
              >
                <AlertTriangle size={20} className="text-amber-600" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {product.name}
                  </p>
                  <p className="text-xs text-amber-700">
                    Sisa stok:{" "}
                    <strong>{product.stock} unit</strong>
                  </p>
                </div>
                <Link
                  to={`/admin/products/${product.id}/edit`}
                  className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-700"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/*==================================================
       LATEST PRODUCTS
      ==================================================*/}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Produk Terbaru</h2>

        <div className="mt-4 grid gap-3">
          {latestProducts.length > 0 ? (
            latestProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg border border-slate-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {product.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {product.category}
                    </span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Belum ada produk.</p>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
