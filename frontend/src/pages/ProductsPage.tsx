import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageSearch, Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../lib/products";
import ProductCard from "../components/ProductCard";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get("category");
  const activeCategory =
    rawCategory && (CATEGORIES as string[]).includes(rawCategory)
      ? rawCategory
      : "All";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (product) =>
        (activeCategory === "All" || product.category === activeCategory) &&
        (normalized === "" || product.name.toLowerCase().includes(normalized))
    );

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
        );
    }
    return list;
  }, [query, activeCategory, sort]);

  const selectCategory = (category: string) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          The Collection
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          Our Products
        </h1>
        <p className="mt-3 leading-relaxed text-clay">
          Every piece is chosen for quality, longevity and quiet design.
          Search by name or browse by category.
        </p>
      </header>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-clay"
          />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products by name…"
            className="h-12 w-full rounded-full border border-line bg-cream/50 pl-11 pr-4 text-sm outline-none transition focus:border-ink focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={15} className="text-clay" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-11 cursor-pointer rounded-full border border-line bg-white px-4 text-sm font-medium outline-none transition focus:border-ink"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-white text-clay hover:border-ink/40 hover:text-ink"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-clay">
        Showing{" "}
        <span className="font-semibold text-ink">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "product" : "products"}
        {activeCategory !== "All" && (
          <>
            {" "}
            in <span className="font-semibold text-ink">{activeCategory}</span>
          </>
        )}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-line bg-cream/50 px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white">
            <PackageSearch size={22} className="text-clay" />
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold">
            No products found
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-clay">
            We couldn&rsquo;t find anything matching your search. Try a
            different keyword or clear your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectCategory("All");
            }}
            className="mt-6 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-black"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
