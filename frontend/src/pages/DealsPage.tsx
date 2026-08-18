import { Link } from "react-router-dom";
import { Clock3, Percent, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, formatPrice } from "../lib/products";

export default function DealsPage() {
  const dealItems = PRODUCTS.filter((product) => product.originalPrice).slice(
    0,
    8
  );
  const bestSavings = dealItems.reduce((max, product) => {
    const savings =
      (product.originalPrice ?? product.price) - product.price;
    return Math.max(max, savings);
  }, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-line bg-ink px-6 py-10 text-cream sm:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream/80">
            <Clock3 size={14} />
            Today Deals
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Limited-time prices on selected favorites
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            We surface the strongest discounts here so the best value is easy to
            spot in one place.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">
            Discounted items
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">
            {dealItems.length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">
            Best markdown
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">Up to 20%</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">
            Today
          </p>
          <p className="mt-2 font-display text-3xl font-semibold">
            Fresh picks
          </p>
        </div>
      </section>

      {dealItems.length > 0 ? (
        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-clay">
                Sale rack
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">
                Products with reduced prices
              </h2>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-clay sm:inline-flex">
              <Percent size={15} />
              Marked down
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dealItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mt-8 text-sm text-clay">
            Best current savings:{" "}
            <span className="font-semibold text-ink">
              {bestSavings > 0 ? formatPrice(bestSavings) : "No savings"}
            </span>{" "}
            on selected items.
          </p>
        </section>
      ) : (
        <section className="mt-10 rounded-2xl border border-dashed border-line bg-cream/50 px-6 py-16 text-center">
          <Sparkles className="mx-auto text-clay" size={22} />
          <h2 className="mt-4 font-display text-2xl font-semibold">
            No live deals yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-clay">
            Add an `originalPrice` to any product to feature it here.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black"
          >
            Browse products
          </Link>
        </section>
      )}
    </div>
  );
}
