/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : MenuItem.jsx
 Module  : Components
 Version : 0.1
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 IMPORTS
==================================================*/

import { Link } from "react-router-dom";

/*==================================================
 COMPONENT
==================================================*/

function MenuItem({ label, path, onClick }) {
  /*==================================================
   UI
  ==================================================*/

  return (
    <Link
      to={path}
      onClick={onClick}
      className="rounded-xl px-4 py-3 text-lg font-medium transition-all duration-300 active:scale-95 active:bg-green-100"
    >
      <span className="flex items-center gap-3">
        <span>•</span>
        <span>{label}</span>
      </span>
    </Link>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default MenuItem;
