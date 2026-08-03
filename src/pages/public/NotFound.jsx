/*==================================================
 NGEPAS REBORN
 Nama File : NotFound.jsx
 Desc      : 404 Page — route not found 
 Author    : Tim Ngepas
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

/* Router */
import { Link } from "react-router-dom";

/* Icons */
import { ArrowLeft } from "lucide-react";

/* Assets */
import SiPas from "../../assets/mascot/si-pas.png";

/*==================================================
 RENDER / UI
==================================================*/

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">

      {/*============================================
        Header
      ============================================*/}

      <header className="px-6 py-5">
        <Link
          to="/"
          className="text-xl font-bold text-[#2E6F4F] transition hover:opacity-80"
        >
          🌿 Ngepas
        </Link>
      </header>

      {/*============================================
        Content
      ============================================*/}

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <img
          src={SiPas}
          alt="Si Pas bingung"
          className="w-36 drop-shadow-md"
        />

        <h1 className="mt-8 text-8xl font-bold text-[#2E6F4F]">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-[#111827]">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mt-3 max-w-sm text-slate-500">
          Si Pas udah nyari ke mana-mana, tapi halaman ini
          kayaknya belum ada atau udah pindah.
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#2E6F4F] px-8 py-3 font-medium text-white transition hover:bg-[#245a3f]"
        >
          <ArrowLeft size={18} />
          Balik ke Beranda
        </Link>
      </main>

    </div>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default NotFound;