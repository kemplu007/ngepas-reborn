/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Categories.jsx
 Module  : Components
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useCategories } from "../../context/CategoryContext";

function Categories({ activeCategory, setActiveCategory }) {

  /*================================================== CONTEXT
==================================================*/

const { categories, loading, error } = useCategories();
  
  /*==================================================
 ACTIVE CATEGORY
==================================================*/
if (loading) {
  return (
    <section className="py-8 text-center">
      Memuat kategori...
    </section>
  );
}

if (error) {
  return (
    <section className="py-8 text-center text-red-500">
      {error}
    </section>
  );
}
  return (
    <section className="py-8">
      {/*==============================================
      CATEGORY CONTAINER
      ==============================================*/}
      <div className="flex flex-wrap justify-center gap-3">
        {/*==============================================
 CATEGORY BUTTONS
==============================================*/}

        {categories.map((category) => (
          <button
            key={category.id}

            onClick={() => setActiveCategory(category.name)}

            className={`
  px-5 py-2 rounded-full border transition-all duration-300

  ${
    activeCategory === category.name
      ? "bg-green-600 border-green-600 text-white"
      : "bg-white border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600"
  }
`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
