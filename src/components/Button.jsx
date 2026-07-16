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

        <button className="cursor-pointer">

            {children}

        </button>

    );

}

/*==================================================
 EXPORT
==================================================*/

export default Button;