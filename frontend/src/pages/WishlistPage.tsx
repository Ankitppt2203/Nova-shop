import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlistItems } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
          <Heart size={28} className="text-clay" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
          Your wishlist is empty
        </h1>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-clay">
          Save products you like by tapping the heart button on any product
          card or product page.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-black"
          >
            Explore products
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-cream"
          >
            Go to cart
            <ShoppingBag size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          Saved for later
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          Your Wishlist
        </h1>
        <p className="mt-3 leading-relaxed text-clay">
          Everything you have saved in one place. Tap the heart again to remove
          an item.
        </p>
      </header>

      <p className="mt-8 text-sm text-clay">
        {wishlistItems.length}{" "}
        {wishlistItems.length === 1 ? "item" : "items"} saved
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistItems.map(({ product }) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
