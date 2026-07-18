/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : MainLayout.jsx
 Module  : Layouts
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import Navbar from "../components/Navbar";

/*==================================================
 COMPONENT
==================================================*/

/*
 * Main Layout digunakan sebagai
 * kerangka utama setiap halaman.
 *
 * Nantinya berisi:
 * - Navbar
 * - Content
 * - Footer
 */

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default MainLayout;
