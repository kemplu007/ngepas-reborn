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
        bg-green-600
        px-6
        py-3
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-300
        hover:bg-green-700
        hover:shadow-lg
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