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
import { Link } from "react-router-dom";
import { Sofa, BedDouble, Utensils, Bath, Coffee } from "lucide-react";

/*==================================================
 DATA KATEGORI
 Analogi: Daftar ikon sesuai blueprint lu
==================================================*/
const categoryItems = [
  { id: 1, name: "Living Room", slug: "living-room", icon: Sofa },
  { id: 2, name: "Bedroom", slug: "bedroom", icon: BedDouble },
  { id: 3, name: "Kitchen", slug: "kitchen", icon: Utensils },
  { id: 4, name: "Bathroom", slug: "bathroom", icon: Bath },
  { id: 5, name: "Coffee Corner", slug: "coffee-corner", icon: Coffee },
];

/*==================================================
 COMPONENT
==================================================*/

function Category() {
  return (
    <section className="bg-muted/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/*==============================================
         SECTION HEADER
        ==============================================*/}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground md:text-2xl text-balance">
            Pilih cara kamu
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mulai jelajahi dari ruangan favoritmu.
          </p>
        </div>

        {/*==============================================
         CATEGORY GRID
         Analogi: Kita jejerin ikonnya rapi ke samping
        ==============================================*/}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {categoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/category?room=${item.slug}`}
                className="group flex min-w-[100px] snap-center cursor-pointer flex-col items-center justify-center rounded-2xl bg-card p-4 shadow-sm border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                {/* Wadah Ikon */}
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-primary">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* Teks Nama Kategori */}
                <h3 className="text-center text-xs font-medium text-foreground group-hover:text-primary">
                  {item.name}
                </h3>
              </Link>
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
