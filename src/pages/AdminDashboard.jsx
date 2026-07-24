/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : AdminDashboard.jsx
 Module  : Admin Pages
==================================================*/

/*==================================================
 ADMIN DASHBOARD
==================================================*/

function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/*==============================================
       ADMIN HEADER
      ==============================================*/}

      <section className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm font-semibold text-emerald-600">Ngepas Admin</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Kelola produk dan data Ngepas dari satu tempat.
        </p>
      </section>
    </main>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default AdminDashboard;
