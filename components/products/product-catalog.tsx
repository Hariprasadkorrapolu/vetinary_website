"use client";

import { SlidersHorizontal, Search, Shield, HelpCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, productTypesByCategory } from "@/lib/constants";
import { Product, products } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { QuickViewModal } from "@/components/products/quick-view-modal";
import { useEnquiry } from "@/components/modals/enquiry-provider";

type SortOption = "Most Popular" | "Latest" | "Featured" | "A-Z" | "Z-A";

const sortOptions: SortOption[] = [
  "Most Popular",
  "Latest",
  "Featured",
  "A-Z",
  "Z-A",
];

// Helper to get category count
function getCategoryCount(category: string) {
  if (category === "All") return products.length;
  return products.filter((p) => {
    if (Array.isArray(p.category)) {
      return p.category.includes(category as any);
    }
    return p.category === category;
  }).length;
}

// Custom Premium SVG Icons for Categories
function CategoryIcon({ category, className = "h-7 w-7" }: { category: string; className?: string }) {
  if (category === "All") {
    return <Shield className={className} />;
  }
  if (category === "Poultry") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Rooster / Chicken outline */}
        <path d="M12 2a1 1 0 0 1 1 1v1.5a1.5 1.5 0 0 0 1.5 1.5h.5a1.5 1.5 0 0 1 1.5 1.5v.5a1.5 1.5 0 0 0 1.5 1.5h1a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1h1a1.5 1.5 0 0 0 1.5-1.5v-.5A1.5 1.5 0 0 1 11 6h.5A1.5 1.5 0 0 0 13 4.5V3a1 1 0 0 1 1-1z" />
        <path d="M8 14c0 3 2 5 4 5s4-2 4-5" />
        <path d="M9 19v3M15 19v3M12 19v3" />
        <path d="M12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
      </svg>
    );
  }
  if (category === "Sheep & Goat") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Sheep head/horn outline */}
        <circle cx="12" cy="12" r="5" />
        <path d="M7 10c0-1.5-1-2.5-2.5-2.5S2 8.5 2 10c0 2 1.5 3 2.5 3" />
        <path d="M17 10c0-1.5 1-2.5 2.5-2.5S22 8.5 22 10c0 2-1.5 3-2.5 3" />
        <path d="M10 14.5c1 .5 3 .5 4 0" />
        <circle cx="10" cy="11" r="0.5" fill="currentColor" />
        <circle cx="14" cy="11" r="0.5" fill="currentColor" />
      </svg>
    );
  }
  if (category === "Dairy / Cattle") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Cow head/ears outline */}
        <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
        <path d="M4 11c0-1.5 1.5-2.5 3-2.5h10c1.5 0 3 1 3 2.5v2c0 3-2.5 5-5.5 5h-5C6.5 18 4 16 4 11z" />
        <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
        <path d="M16 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
        <path d="M10 15c1 .8 3 .8 4 0" />
      </svg>
    );
  }
  return <HelpCircle className={className} />;
}

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
  const { openEnquiry } = useEnquiry();

  // Dynamic type lookup based on selected category (Future Ready)
  const visibleProductTypes = useMemo(() => {
    if (selectedCategory === "All") {
      const allTypes = new Set<string>();
      Object.values(productTypesByCategory).forEach((types) => {
        types.forEach((type) => allTypes.add(type));
      });
      return Array.from(allTypes);
    }
    const categoryKey = selectedCategory as keyof typeof productTypesByCategory;
    return productTypesByCategory[categoryKey] || [];
  }, [selectedCategory]);

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
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* Premium Category Navigation */}
          <div className="mb-10">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-slateblue/80">
              Select Species / Category
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["All", ...categories].map((cat) => {
                const isActive = selectedCategory === cat;
                const count = getCategoryCount(cat);
                const displayLabel = cat === "All" ? "All Products" : cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`group relative flex flex-col items-center rounded-3xl border p-6 text-center transition-all duration-300 ${
                      isActive
                        ? "border-brand-blue bg-brand-blue text-white shadow-premium scale-[1.02]"
                        : "border-medical bg-white text-slate-800 shadow-soft hover:-translate-y-1 hover:border-brand-pink/30 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/12 text-white"
                          : "bg-medical text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                      }`}
                    >
                      <CategoryIcon category={cat} />
                    </div>
                    <span className="text-base font-bold tracking-tight">{displayLabel}</span>
                    <span
                      className={`mt-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-mist text-slate-500"
                      }`}
                    >
                      {count} {count === 1 ? "Product" : "Products"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
            
            {/* Filter Sidebar */}
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

              <div className={`rounded-[1.75rem] border border-medical bg-white p-6 shadow-soft ${isFiltersOpen ? "block" : "hidden lg:block"}`}>
                <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-slateblue" />
                    <h2 className="text-lg font-bold text-ink">Filters</h2>
                  </div>
                  {(search !== "" || selectedType !== "All") && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedType("All");
                      }}
                      className="text-xs font-semibold text-brand-pink hover:text-brand-pink/80 transition"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Search Input */}
                <div className="mb-6">
                  <h3 className="mb-2.5 text-xs font-bold text-slateblue uppercase tracking-wider">Search</h3>
                  <label className="relative block">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search products..."
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                    />
                  </label>
                </div>

                {/* Product Type Filter */}
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

                {/* Sort By Filter */}
                <FilterGroup title="Sort By">
                  <select
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value as SortOption)
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-ink outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  >
                    {sortOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </FilterGroup>
              </div>
            </aside>

            {/* Product Grid / Empty State */}
            <div>
              <div className="mb-6 flex flex-col justify-between gap-4 rounded-[1.5rem] border border-medical bg-white p-5 shadow-soft sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slateblue/70">
                    Product Catalog
                  </p>
                  <h2 className="mt-1 text-2xl tracking-tight text-ink font-heading font-bold">
                    {selectedCategory === "Dairy / Cattle" ? 0 : filtered.length} {selectedCategory === "Dairy / Cattle" ? "products" : filtered.length === 1 ? "product" : "products"} found
                  </h2>
                </div>
                <p className="text-sm text-slate-500 font-sans">
                  Showing {selectedCategory === "All" ? "All Categories" : selectedCategory}
                </p>
              </div>

              {selectedCategory === "Dairy / Cattle" ? (
                /* Premium Future-Ready Empty State for Dairy / Cattle */
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-medical/60 shadow-soft max-w-xl mx-auto px-6 mt-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-medical text-brand-blue mb-5">
                    <CategoryIcon category="Dairy / Cattle" className="h-9 w-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-ink tracking-tight">Dairy & Cattle Range Coming Soon</h3>
                  <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-sm mx-auto font-sans">
                    We are currently updating our portfolio with advanced formulations and veterinary products for dairy and cattle healthcare. Stay tuned!
                  </p>
                  <button
                    onClick={() => openEnquiry(undefined, "Sales Inquiry")}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-brand-blue/95 transition-all duration-300"
                  >
                    Inquire About Dairy Range
                  </button>
                </div>
              ) : filtered.length === 0 ? (
                /* No Results Found for Other Categories */
                <div className="py-16 text-center bg-white rounded-3xl border border-medical/60 shadow-soft max-w-md mx-auto px-6 mt-6">
                  <p className="text-lg font-semibold text-slate-700">No products found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedType("All");
                    }}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue/90"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                /* Product Grid */
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickView}
                    />
                  ))}
                </div>
              )}
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
  className = "mt-6 border-t border-slate-100 pt-5",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-xs font-bold text-slateblue uppercase tracking-wider">{title}</h3>
      {/* Horizontal scroll track on mobile, wrapping on desktop */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible">
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
      className={`rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-300 shrink-0 select-none ${
        active
          ? "bg-brand-blue text-white shadow-soft hover:shadow-md scale-[1.02]"
          : "bg-slate-50 text-slate-600 hover:bg-medical hover:text-brand-blue"
      }`}
    >
      {children}
    </button>
  );
}
