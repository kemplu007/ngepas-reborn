/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : CategoryPage.jsx
 Module  : Pages
==================================================*/

/*==================================================
 IMPORT
==================================================*/

import { useState } from "react";
import { Bath, BedDouble, BriefcaseBusiness, CookingPot, Sofa } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import rooms from "../../data/rooms";
import roomCategories from "../../data/roomCategories";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/discover/ProductCard";
import Card from "../../components/ui/Card";
import SearchInput from "../../components/ui/SearchInput";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import SelectField from "../../components/ui/SelectField";

/*==================================================
 ROOM ICON REGISTRY
==================================================*/

const roomIconMap = {
  bedroom: BedDouble,
  "living-room": Sofa,
  kitchen: CookingPot,
  bathroom: Bath,
  workspace: BriefcaseBusiness,
};

const sortOptions = [
  { value: "default", label: "Urutan rekomendasi" },
  { value: "rating", label: "Rating tertinggi" },
  { value: "price", label: "Harga termurah" },
  { value: "sold", label: "Paling banyak dipilih" },
];

/*==================================================
 HELPERS
==================================================*/

function toPriceNumber(value) {
  return Number(String(value || "").replace(/\D/g, ""));
}

/*==================================================
 CATEGORY PAGE
==================================================*/

const CategoryPage = () => {
  /*==================================================
   PRODUCT CONTEXT
  ==================================================*/

  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const roomFromUrl = searchParams.get("room");
  const categoryFromUrl = searchParams.get("category");

  const [selectedRoom, setSelectedRoom] = useState(roomFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  /*==================================================
   FILTER PRODUCTS
  ==================================================*/

  const filteredProducts = products.filter(
    (product) =>
      product.room === selectedRoom &&
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "rating":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "price":
      sortedProducts.sort((a, b) => toPriceNumber(a.price) - toPriceNumber(b.price));
      break;
    case "sold":
      sortedProducts.sort((a, b) => b.sold - a.sold);
      break;
    default:
      break;
  }

  /*==================================================
   HANDLERS
  ==================================================*/

  const handleRoomSelect = (roomSlug) => {
    setSelectedRoom(roomSlug);
    setSelectedCategory(null);
    setSearchTerm("");
    setSortBy("default");
    setSearchParams({ room: roomSlug });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setSortBy("default");
    setSearchParams({ room: selectedRoom, category });
  };

  return (
    <main>
      {/*==================================================
        INTRO
      ==================================================*/}
      <Section
        surface="muted"
        className="pb-[var(--np-space-8)] sm:pb-[var(--np-space-10)]"
      >
        <SectionHeading
          eyebrow="Jelajah berdasarkan ruang"
          title="Mau cari produk buat ruangan apa?"
          description="Pilih ruang dan kategori untuk menemukan rekomendasi produk yang lebih relevan."
        />
      </Section>

      {/*==================================================
        ROOM SELECTOR
      ==================================================*/}
      <Section className="pt-[var(--np-space-8)] sm:pt-[var(--np-space-10)]">
        <SectionHeading
          title="Pilih ruangan"
          description="Mulai dari konteks ruang agar pencarian tidak terasa terlalu luas."
        />
        <div className="grid grid-cols-2 gap-[var(--np-space-3)] sm:grid-cols-3 lg:grid-cols-5">
          {rooms.map((room) => {
            const RoomIcon = roomIconMap[room.slug] || Sofa;
            const isSelected = selectedRoom === room.slug;
            const roomProductCount = products.filter(
              (product) => product.room === room.slug,
            ).length;

            return (
              <Card
                as="button"
                type="button"
                key={room.id}
                aria-pressed={isSelected}
                onClick={() => handleRoomSelect(room.slug)}
                className={`group min-h-[9.5rem] text-left transition-[border-color,background-color,box-shadow,transform] duration-np-normal ease-np-standard hover:-translate-y-0.5 hover:border-[var(--np-color-green-500)] hover:shadow-np-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 motion-reduce:transition-none ${isSelected ? "border-[var(--np-color-green-700)] bg-[var(--np-color-green-700)] text-white shadow-np-sm" : ""}`}
              >
                <span
                  className={`mb-[var(--np-space-4)] inline-flex h-10 w-10 items-center justify-center rounded-np-sm ${isSelected ? "bg-white/15 text-white" : "bg-[var(--np-color-green-100)] text-[var(--np-color-green-700)]"}`}
                >
                  <RoomIcon size={20} aria-hidden="true" />
                </span>
                <span className="block text-[var(--np-text-small)] font-semibold">
                  {room.name}
                </span>
                <span
                  className={`mt-1 block text-[var(--np-text-caption)] ${isSelected ? "text-white/75" : "text-[var(--np-color-muted)]"}`}
                >
                  {roomProductCount} produk
                </span>
              </Card>
            );
          })}
        </div>
      </Section>

      {/*==================================================
        CATEGORY AND PRODUCT DISCOVERY
      ==================================================*/}
      <Section
        surface="muted"
        className="pt-[var(--np-space-8)] sm:pt-[var(--np-space-10)]"
      >
        <SectionHeading
          title="Pilih jenis barang"
          description={
            selectedRoom
              ? "Persempit pilihan berdasarkan kategori yang kamu cari."
              : "Pilih ruangan terlebih dahulu untuk melihat kategori yang tersedia."
          }
        />

        {selectedRoom ? (
          <div className="grid grid-cols-2 gap-[var(--np-space-3)] sm:grid-cols-3 lg:grid-cols-5">
            {(roomCategories[selectedRoom] || []).map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <Card
                  as="button"
                  type="button"
                  key={category}
                  aria-pressed={isSelected}
                  onClick={() => handleCategorySelect(category)}
                  className={`min-h-[4.75rem] text-left text-[var(--np-text-small)] font-semibold transition-[border-color,background-color,box-shadow,transform] duration-np-normal ease-np-standard hover:-translate-y-0.5 hover:border-[var(--np-color-green-500)] hover:shadow-np-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--np-color-focus)] focus-visible:ring-offset-2 motion-reduce:transition-none ${isSelected ? "border-[var(--np-color-green-700)] bg-[var(--np-color-green-700)] text-white shadow-np-sm" : ""}`}
                >
                  {category}
                </Card>
              );
            })}
          </div>
        ) : (
          <Card
            variant="muted"
            className="text-[var(--np-text-small)] text-[var(--np-color-muted)]"
          >
            Silakan pilih ruangan untuk melanjutkan eksplorasi.
          </Card>
        )}

        {selectedCategory ? (
          <div className="mt-[var(--np-space-8)] space-y-[var(--np-space-6)]">
            <div className="flex flex-col gap-[var(--np-space-4)] lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[var(--np-text-caption)] font-semibold uppercase tracking-[0.16em] text-[var(--np-color-green-700)]">
                  Kategori dipilih
                </p>
                <p className="mt-1 text-[var(--np-text-h3)] font-semibold text-[var(--np-color-ink)]">
                  {selectedCategory}
                </p>
                <p className="mt-1 text-[var(--np-text-small)] text-[var(--np-color-muted)]">
                  {filteredProducts.length} produk sesuai pencarian
                </p>
              </div>
              <div className="w-full lg:max-w-[16rem]">
                <SelectField
                  id="category-sort"
                  name="category-sort"
                  label="Urutkan"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  options={sortOptions}
                />
              </div>
            </div>

            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Cari produk dalam kategori ini..."
            />

            {loading && (
              <Card
                variant="muted"
                className="text-[var(--np-text-small)] text-[var(--np-color-muted)]"
              >
                Menyiapkan produk rekomendasi...
              </Card>
            )}

            {error && !loading && (
              <Card
                variant="muted"
                className="text-[var(--np-text-small)] text-[var(--np-color-danger)]"
              >
                Produk belum dapat dimuat. Coba lagi beberapa saat lagi.
              </Card>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <Card
                variant="muted"
                className="text-[var(--np-text-small)] text-[var(--np-color-muted)]"
              >
                Belum ada produk untuk kombinasi pencarian ini.
              </Card>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <>
                <Card
                  variant="muted"
                  className="border-[var(--np-color-green-200)] bg-[var(--np-color-green-100)]/40"
                >
                  <p className="text-[var(--np-text-small)] font-semibold text-[var(--np-color-green-700)]">
                    Rekomendasi Ngepas
                  </p>
                  <p className="mt-1 text-[var(--np-text-small)] leading-relaxed text-[var(--np-color-muted)]">
                    Pilihan disusun berdasarkan konteks ruang, kategori, harga, dan sinyal kualitas yang tersedia.
                  </p>
                </Card>

                <div className="grid grid-cols-1 gap-[var(--np-space-4)] sm:grid-cols-2 lg:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      href={`/product/${product.slug}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : null}
      </Section>
    </main>
  );
};

/*==================================================
 EXPORT
==================================================*/

export default CategoryPage;
