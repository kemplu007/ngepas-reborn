/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : Category.jsx
 Module  : Components
 Author  : Muhammad Abdul Chakim, ChatGPT & Gemini
==================================================*/

/*==================================================
 IMPORTS
 Analogi: Kita pinjem ikon siap pakai dari tukang ikon (lucide-react)
==================================================*/
import { Sofa, BedDouble, Utensils, Bath, Coffee } from "lucide-react";

/*==================================================
 DATA KATEGORI
 Analogi: Daftar ikon sesuai blueprint lu
==================================================*/
const categoryItems = [
  { id: 1, name: "Living Room", icon: Sofa },
  { id: 2, name: "Bedroom", icon: BedDouble },
  { id: 3, name: "Kitchen", icon: Utensils },
  { id: 4, name: "Bathroom", icon: Bath },
  { id: 5, name: "Coffee Corner", icon: Coffee },
];

/*==================================================
 COMPONENT
==================================================*/

function Category() {
  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/*==============================================
         SECTION HEADER
        ==============================================*/}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            Pilih cara kamu
          </h2>
        </div>

        {/*==============================================
         CATEGORY GRID
         Analogi: Kita jejerin ikonnya rapi ke samping
        ==============================================*/}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {categoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group flex min-w-[100px] snap-center cursor-pointer flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
              >
                {/* Wadah Ikon */}
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-700 transition-colors duration-300 group-hover:bg-green-50 group-hover:text-green-600">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* Teks Nama Kategori */}
                <h3 className="text-center text-xs font-medium text-slate-700 group-hover:text-green-700">
                  {item.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/*==================================================
 EXPORT
==================================================*/
export default Category;
