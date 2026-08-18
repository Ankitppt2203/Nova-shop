import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck } from "lucide-react";
import { PRODUCTS } from "../lib/products";
import ProductCard from "../components/ProductCard";
import BenefitsSection from "../components/BenefitsSection";

const stats = [
  { value: "12k+", label: "Happy customers" },
  { value: "4.9", label: "Average rating" },
  { value: "120+", label: "Curated products" },
];

export default function HomePage() {
  const featured = PRODUCTS.filter((product) => product.featured).slice(0, 4);
  const morePicks = PRODUCTS.filter((product) => !product.featured).slice(
    0,
    4
  );
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Discover Products You&rsquo;ll Love
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-clay sm:text-lg">
              Thoughtfully designed goods for modern living - quality
              materials, honest prices, and a shopping experience worth coming
              back to.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-black hover:shadow-[0_12px_30px_-10px_rgba(29,26,22,0.5)]"
              >
                Shop Now
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center rounded-full border border-ink/20 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Discover Products
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 border-t border-line pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-clay">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_60px_-24px_rgba(29,26,22,0.3)]">
              <img
                src="/images/hero.jpg"
                alt="Curated home essentials in warm neutral tones"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              />
            </div>
            <div className="absolute -left-4 top-6 hidden items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_12px_30px_-12px_rgba(29,26,22,0.25)] sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink">
                <Truck size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-clay">On orders over ₹1,999</p>
              </div>
            </div>
            <div className="absolute -right-3 bottom-8 hidden flex-col gap-1 rounded-2xl border border-line bg-white p-4 shadow-[0_12px_30px_-12px_rgba(29,26,22,0.25)] sm:flex">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    className="fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <p className="text-sm font-semibold">4.9/5</p>
              <p className="text-xs text-clay">2,400+ verified reviews</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-clay">
              Handpicked for you
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            View all products
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-clay">
              Fresh from the collection
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              More to Love
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Browse everything
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {morePicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <BenefitsSection />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-line bg-cream px-6 py-14 text-center sm:px-12">
          <h2 className="font-display text-3xl font-semibold">
            Stay in the Loop
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-clay">
            New arrivals, restocks and member-only offers - straight to your
            inbox. No spam, ever.
          </p>
          {subscribed ? (
            <p className="mx-auto mt-7 max-w-md rounded-full border border-line bg-white px-6 py-3.5 text-sm font-medium">
              Thanks for subscribing - welcome to Nova-Shop.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-full border border-line bg-white px-5 text-sm outline-none transition focus:border-ink"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-ink px-7 text-sm font-semibold text-cream transition-colors hover:bg-black"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
