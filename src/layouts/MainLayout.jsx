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

import Navbar from "../components/public/Navbar";

/*==================================================
 COMPONENT
==================================================*/

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
