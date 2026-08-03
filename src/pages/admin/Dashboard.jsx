/*==================================================
 NGEPAS REBORN
 File    : Dashboard.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

/* Context */
import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";

/* Icons */
import { Package, Star, Grid2X2, Database, ArrowUpRight } from "lucide-react";

/*==================================================
 KOMPONEN
==================================================*/

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

  const { products } = useProducts();

  const { categories } = useCategories();

  /*==================================================
   STATISTICS
  ==================================================*/

  /* Total Produk */

  const totalProducts = products?.length || 0;

  /* Produk Unggulan */

  const featuredProducts = products.filter((product) =>
    Boolean(Number(product.featured)),
  ).length;

  /* Total Kategori */

  const totalCategories = categories?.length || 0;

  /*==================================================
   LATEST PRODUCTS
  ==================================================*/

  const latestProducts = [...(products || [])].sort((a, b) => b.id - a.id).slice(0, 5);

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

      {/*==================================================
       STATISTICS
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
          title="Database"
          value="Online"
          subtitle="SQLite terhubung"
          valueColor="text-emerald-600"
          icon={<Database size={18} className="text-emerald-600" />}
        />
      </div>

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
    </div>
  );
}

export default Dashboard;
