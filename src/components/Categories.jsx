/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Categories.jsx
 Module  : Components
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import categories from "../data/categories";

/*==================================================
 CATEGORIES COMPONENT

Menampilkan daftar kategori dalam
bentuk tombol.

Digunakan oleh:
- FeaturedProducts.jsx

==================================================*/

function Categories({
  activeCategory,
  setActiveCategory,
}) {

  /*==================================================
 ACTIVE CATEGORY

Menyimpan kategori yang sedang dipilih.

Default:
- All

==================================================*/
  
  return (
    
    <section className="py-8">

      {/*==============================================
      CATEGORY CONTAINER
      ==============================================*/}
      <div className="flex flex-wrap justify-center gap-3">

        {/*==============================================
 CATEGORY BUTTONS
==============================================*/}

        {categories.map((category, index) => (

          <button
            key={category}

            onClick={() => setActiveCategory(category)}

            className={`
  px-5 py-2 rounded-full border transition-all duration-300

  ${
    activeCategory === category
      ? "bg-green-600 border-green-600 text-white"
      : "bg-white border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600"
  }
`}
          >
            {category}
          </button>

        ))}

      </div>

    </section>
  );
}

export default Categories;