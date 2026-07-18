/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Navbar.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

/*
 * Navbar utama Ngepas.
 *
 * Berisi tombol menu dan logo.
 */

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          ☰
        </button>

        <h2 className="text-2xl font-extrabold text-green-600">
          Ngepas
        </h2>

      </div>
    </nav>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Navbar;