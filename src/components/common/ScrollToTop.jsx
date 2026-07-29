/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : ScrollToTop.jsx
 Module  : Components
 Version : 1.0
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*==================================================
 SCROLL TO TOP
==================================================*/

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/*==================================================
 EXPORT
==================================================*/

export default ScrollToTop;
