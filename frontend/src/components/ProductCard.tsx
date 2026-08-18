import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Heart, Plus } from "lucide-react";
import { formatPrice, type Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [added, setAdded] = useState(false);
  const saved = isInWishlist(product.id);

  const handleAdd = async () => {
    const success = await addToCart(product);
    if (!success) {
      return;
    }

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(29,26,22,0.18)]">
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Link
          to={`/products/${product.id}`}
          className="block h-full w-full overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink backdrop-blur">
            {product.tag}
          </span>
        )}
        <button
          type="button"
          onClick={handleWishlist}
          aria-pressed={saved}
          aria-label={
            saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
            saved
              ? "border-ink bg-ink text-cream"
              : "border-white/80 bg-white/90 text-ink backdrop-blur hover:border-ink/20"
          }`}
        >
          <Heart size={16} className={saved ? "fill-current" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-clay">
          {product.category}
        </span>
        <Link
          to={`/products/${product.id}`}
          className="mt-1.5 font-display text-lg font-semibold leading-snug underline-offset-4 hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-clay">({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-clay line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-5 sm:grid-cols-2">
          <Link
            to={`/products/${product.id}`}
            className="flex h-11 w-full items-center justify-center rounded-xl border border-line px-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5 sm:h-12"
          >
            Buy Now
          </Link>
          <button
            type="button"
            onClick={handleAdd}
            className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-ink px-3 text-sm font-medium text-cream transition-all hover:bg-black active:scale-[0.98] sm:h-12"
          >
            {added ? <Check size={15} /> : <Plus size={15} />}
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
