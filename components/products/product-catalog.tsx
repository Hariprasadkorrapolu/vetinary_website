"use client";

import { SlidersHorizontal, Search, Shield, HelpCircle, X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { categories, productTypesByCategory } from "@/lib/constants";
import { Product, products } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { QuickViewModal } from "@/components/products/quick-view-modal";
import { useEnquiry } from "@/components/modals/enquiry-provider";
import { AnimatePresence, motion } from "framer-motion";

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
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M10 2C9.0335 2 8.25 2.7835 8.25 3.75C8.25 4.7165 9.0335 5.5 10 5.5H14C14.9665 5.5 15.75 4.7165 15.75 3.75C15.75 2.7835 14.9665 2 14 2H10Z" fill="currentColor"/>
        <path opacity="0.5" d="M3.86327 16.2052C3.00532 12.7734 2.57635 11.0575 3.47718 9.90376C4.37801 8.75 6.14672 8.75 9.68413 8.75H14.3148C17.8522 8.75 19.6209 8.75 20.5218 9.90376C21.4226 11.0575 20.9936 12.7734 20.1357 16.2052C19.59 18.3879 19.3172 19.4792 18.5034 20.1146C17.6896 20.75 16.5647 20.75 14.3148 20.75H9.68413C7.43427 20.75 6.30935 20.75 5.49556 20.1146C4.68178 19.4792 4.40894 18.3879 3.86327 16.2052Z" fill="currentColor"/>
        <path d="M15.5805 4.5023C15.6892 4.2744 15.75 4.01931 15.75 3.75C15.75 3.48195 15.6897 3.22797 15.582 3.00089C16.2655 3.00585 16.7983 3.03723 17.2738 3.22309C17.842 3.44516 18.3362 3.82266 18.6999 4.31242C19.0669 4.8065 19.2391 5.43979 19.4762 6.31144L19.5226 6.48181L20.0353 9.44479C19.6266 9.16286 19.0996 8.99533 18.418 8.89578L18.0567 6.80776C17.7729 5.76805 17.6699 5.44132 17.4957 5.20674C17.2999 4.94302 17.0337 4.73975 16.7278 4.62018C16.508 4.53427 16.2424 4.50899 15.5805 4.5023Z" fill="currentColor"/>
        <path d="M8.41799 3.00089C8.31027 3.22797 8.25 3.48195 8.25 3.75C8.25 4.01931 8.31083 4.27441 8.41951 4.50231C7.75766 4.509 7.49208 4.53427 7.27227 4.62018C6.96633 4.73975 6.70021 4.94302 6.50436 5.20674C6.33015 5.44132 6.22715 5.76805 5.94337 6.80776L5.58207 8.89569C4.90053 8.99518 4.37353 9.1626 3.96484 9.44433L4.47748 6.48181L4.52387 6.31145C4.76095 5.4398 4.9332 4.8065 5.30013 4.31242C5.66384 3.82266 6.15806 3.44516 6.72624 3.22309C7.20177 3.03724 7.73449 3.00586 8.41799 3.00089Z" fill="currentColor"/>
        <path d="M8.75 12.75C8.75 12.3358 8.41421 12 8 12C7.58579 12 7.25 12.3358 7.25 12.75V16.75C7.25 17.1642 7.58579 17.5 8 17.5C8.41421 17.5 8.75 17.1642 8.75 16.75V12.75Z" fill="currentColor"/>
        <path d="M16 12C16.4142 12 16.75 12.3358 16.75 12.75V16.75C16.75 17.1642 16.4142 17.5 16 17.5C15.5858 17.5 15.25 17.1642 15.25 16.75V12.75C15.25 12.3358 15.5858 12 16 12Z" fill="currentColor"/>
        <path d="M12.75 12.75C12.75 12.3358 12.4142 12 12 12C11.5858 12 11.25 12.3358 11.25 12.75V16.75C11.25 17.1642 11.5858 17.5 12 17.5C12.4142 17.5 12.75 17.1642 12.75 16.75V12.75Z" fill="currentColor"/>
      </svg>
    );
  }
  if (category === "Poultry") {
    return (
      <img
        src="/hen-svgrepo-com.svg"
        alt="Poultry"
        className={`${className} object-contain`}
      />
    );
  }
  if (category === "Sheep & Goat") {
    return (
      <img
        src="/sheep-svgrepo-com.svg"
        alt="Sheep & Goat"
        className={`${className} object-contain`}
      />
    );
  }
  if (category === "Dairy / Cattle") {
    return (
      <img
        src="/cow-face-svgrepo-com.svg"
        alt="Dairy / Cattle"
        className={`${className} object-contain`}
      />
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

  // Prevent scroll when mobile filters are open
  useEffect(() => {
    if (isFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFiltersOpen]);

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
                          ? "bg-brand-yellow text-brand-blue"
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
            
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[1.75rem] border border-medical bg-white p-6 shadow-soft">
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

            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsFiltersOpen(true)}
                className="flex w-full items-center justify-between rounded-2xl border border-medical bg-white px-5 py-4 text-sm font-semibold text-slateblue shadow-soft mb-4"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Show Filters
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  {filtered.length} products found
                </span>
              </button>
            </div>

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

      {/* Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {isFiltersOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFiltersOpen(false)}
              className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            />
            
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative z-10 flex h-full w-full max-w-[20rem] flex-col bg-white p-6 shadow-premium"
            >
              {/* Header with Title and Close Button */}
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-slateblue" />
                  <h2 className="text-lg font-bold text-ink">Filters</h2>
                </div>
                <div className="flex items-center gap-3">
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
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="rounded-full p-1.5 hover:bg-slate-100 transition"
                    aria-label="Close filters"
                  >
                    <X className="h-5 w-5 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Scrollable Filters Content */}
              <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
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
                <FilterGroup title="Product Type" isMobile>
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
                <FilterGroup title="Sort By" isMobile>
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

              {/* Bottom Actions inside drawer */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="w-full h-12 bg-brand-blue text-white rounded-2xl font-bold hover:bg-brand-blue/90 transition shadow-soft flex items-center justify-center gap-2"
                >
                  Apply Filters ({filtered.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterGroup({
  title,
  children,
  className = "mt-6 border-t border-slate-100 pt-5",
  isMobile = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-xs font-bold text-slateblue uppercase tracking-wider">{title}</h3>
      {/* Horizontal scroll track on mobile, wrapping on desktop */}
      <div className={`flex gap-2 pb-2 ${
        isMobile 
          ? "flex-wrap overflow-visible" 
          : "overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible"
      }`}>
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
