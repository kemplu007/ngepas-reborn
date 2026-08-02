/*==================================================
 NGEPAS REBORN
 File    : MainLayout.jsx
 Module  : Layouts
==================================================*/

import { Outlet } from "react-router-dom";
import Navbar from "../components/public/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      {/* Outlet ini ibarat "lubang" buat isi halaman ganti-ganti */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
