/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Button.jsx
 Module  : Components
 Version : 0.2
 Author  : Muhammad Abdul Chakim & ChatGPT
==================================================*/

/*==================================================
 COMPONENT
==================================================*/

/*
 * Button universal.
 * Digunakan di seluruh halaman
 * agar desain tombol konsisten.
 */

function Button({ children }) {
  return (
    <button
      className="
        inline-flex
        items-center
        justify-center
        rounded-xl
        bg-primary
        px-6
        py-3
        font-semibold
        text-primary-foreground
        shadow-sm
        transition-all
        duration-300
        hover:bg-primary/90
        hover:shadow-md
        active:scale-95
        cursor-pointer
    "
    >
      {children}
    </button>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default Button;
