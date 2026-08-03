/*==================================================
 NGEPAS REBORN
 Nama File : MainLayout.jsx
 Desc      : Layout wrapper for all public pages
 Author    : Tim Ngepas
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

/* Router */
import { Outlet } from "react-router-dom";

/* Components */
import Navbar from "../components/public/Navbar";

/*==================================================
 RENDER / UI
==================================================*/

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default MainLayout;