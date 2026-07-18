/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Category.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

function Category() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Belanja Berdasarkan Kategori
          </h2>

          <p className="mt-4 text-slate-600">
            Temukan produk favoritmu lebih cepat melalui kategori pilihan.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            🏠
            <h3 className="mt-4 font-semibold text-slate-900">Rumah</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            ☕<h3 className="mt-4 font-semibold text-slate-900">Dapur</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            💡
            <h3 className="mt-4 font-semibold text-slate-900">Lampu</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            🪴
            <h3 className="mt-4 font-semibold text-slate-900">Dekorasi</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            🛁
            <h3 className="mt-4 font-semibold text-slate-900">Kamar</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            🧺
            <h3 className="mt-4 font-semibold text-slate-900">Organisasi</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Category;
