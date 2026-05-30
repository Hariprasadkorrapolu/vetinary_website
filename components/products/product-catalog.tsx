"use client";

import { SlidersHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, productTypes } from "@/lib/constants";
import { Product, products } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { QuickViewModal } from "@/components/products/quick-view-modal";

type SortOption =
  | "Most Popular"
  | "Latest"
  | "Featured"
  | "A-Z"
  | "Z-A";

const sortOptions: SortOption[] = [
  "Most Popular",
  "Latest",
  "Featured",
  "A-Z",
  "Z-A"
];

export function ProductCatalog({ initialCategory }: { initialCategory?: string }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "All");
  const [selectedType, setSelectedType] = useState("All");
  const [sort, setSort] = useState<SortOption>("Most Popular");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const result = products
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
      .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
      .filter((product) => selectedType === "All" || product.type === selectedType);

    return result.sort((a, b) => {
      if (sort === "Latest") {
        return Number(b.isLatest) - Number(a.isLatest);
      }

      if (sort === "Featured") {
        if (b.isLatest !== a.isLatest) {
          return Number(b.isLatest) - Number(a.isLatest);
        }

        return b.popularity - a.popularity;
      }

      if (sort === "A-Z") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "Z-A") {
        return b.name.localeCompare(a.name);
      }

      return b.popularity - a.popularity;
    });
  }, [search, selectedCategory, selectedType, sort]);

  return (
    <>
      <section className="bg-mist py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[20rem_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] bg-white p-5 shadow-soft">
              <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-slateblue" />
                <h2 className="text-lg font-semibold text-ink">Filters</h2>
              </div>

              <label className="relative block">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-slateblue"
                />
              </label>

              <FilterGroup title="Categories">
                {["All", ...categories].map((category) => (
                  <FilterButton
                    key={category}
                    active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </FilterButton>
                ))}
              </FilterGroup>

              <FilterGroup title="Product Type">
                {["All", ...productTypes].map((type) => (
                  <FilterButton
                    key={type}
                    active={selectedType === type}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </FilterButton>
                ))}
              </FilterGroup>

              <FilterGroup title="Sort By">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-ink outline-none focus:border-slateblue"
                >
                  {sortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </FilterGroup>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-[1.5rem] bg-white p-5 shadow-soft sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slateblue/70">
                  Product Catalog
                </p>

                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                  {filtered.length} products found
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                Sticky filters, quick view, and detail pages are wired in.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickView}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickView}
        onClose={() => setQuickView(null)}
      />
    </>
  );
}

function FilterGroup({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7 border-t border-slate-100 pt-5">
      <h3 className="mb-3 text-sm font-bold text-ink">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-xs font-bold transition ${
        active
          ? "bg-slateblue text-white"
          : "bg-slate-50 text-slate-600 hover:bg-medical hover:text-slateblue"
      }`}
    >
      {children}
    </button>
  );
}
