"use client";

import { SlidersHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, productTypesByCategory } from "@/lib/constants";
import { Product, products } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { QuickViewModal } from "@/components/products/quick-view-modal";

type SortOption = "Most Popular" | "Latest" | "Featured" | "A-Z" | "Z-A";

const sortOptions: SortOption[] = [
  "Most Popular",
  "Latest",
  "Featured",
  "A-Z",
  "Z-A",
];

export function ProductCatalog({
  initialCategory,
}: {
  initialCategory?: string;
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory ?? "All",
  );
  const [selectedType, setSelectedType] = useState("All");
  const [sort, setSort] = useState<SortOption>("Most Popular");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Dynamic type lookup based on selected category (Future Ready)
  const visibleProductTypes = useMemo(() => {
    if (selectedCategory === "All") {
      // Get unique union of all product types across all categories
      const allTypes = new Set<string>();
      Object.values(productTypesByCategory).forEach((types) => {
        types.forEach((type) => allTypes.add(type));
      });
      return Array.from(allTypes);
    }
    const categoryKey = selectedCategory as keyof typeof productTypesByCategory;
    return productTypesByCategory[categoryKey] || [];
  }, [selectedCategory]);

  // Reset type selection to "All" whenever category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedType("All");
  };

  const filtered = useMemo(() => {
    const result = products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
      .filter(
        (product) =>
          selectedCategory === "All" ||
          (Array.isArray(product.category)
            ? product.category.includes(selectedCategory as any)
            : product.category === selectedCategory),
      )
      .filter(
        (product) => selectedType === "All" || product.type === selectedType,
      );

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
      <section className="bg-mist py-8 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 lg:grid-cols-[20rem_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex w-full items-center justify-between rounded-2xl border border-medical bg-white px-5 py-4 text-sm font-semibold text-slateblue shadow-soft lg:hidden mb-4"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {isFiltersOpen ? "Hide Filters" : "Show Filters"}
              </span>
              <span className="text-xs text-slate-500 font-normal">
                {filtered.length} products found
              </span>
            </button>

            <div className={`rounded-[1.75rem] border border-medical bg-white p-5 shadow-soft ${isFiltersOpen ? "block" : "hidden lg:block"}`}>
              <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-slateblue" />
                <h2 className="text-lg text-ink">Filters</h2>
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
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </FilterButton>
                ))}
              </FilterGroup>

              <FilterGroup title="Product Type">
                {["All", ...visibleProductTypes].map((type) => (
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
                  onChange={(event) =>
                    setSort(event.target.value as SortOption)
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none focus:border-slateblue"
                >
                  {sortOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </FilterGroup>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-[1.5rem] border border-medical bg-white p-5 shadow-soft sm:flex-row sm:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slateblue/70">
                  Product Catalog
                </p>

                <h2 className="mt-1 text-2xl tracking-tight text-ink font-heading">
                  {filtered.length} products found
                </h2>
              </div>

              <p className="text-sm text-slate-500 font-sans">
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

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7 border-t border-slate-100 pt-5">
      <h3 className="mb-3.5 text-sm font-bold text-slateblue uppercase tracking-wider font-sans">{title}</h3>

      {/* Horizontal scroll track on mobile, wrapping on desktop */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-3 -mx-5 px-5 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible">
        {children}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 shrink-0 select-none ${
        active
          ? "bg-brand-blue text-white shadow-soft hover:shadow-md scale-[1.02]"
          : "bg-slate-50 text-slate-600 hover:bg-medical hover:text-brand-blue"
      }`}
    >
      {children}
    </button>
  );
}
