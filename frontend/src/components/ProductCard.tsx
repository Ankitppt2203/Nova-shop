import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Check, Heart, Plus, X } from "lucide-react";
import { formatPrice, type Product } from "../lib/products";
import { useCart } from "../context/CartContext";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [added, setAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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

  useEffect(() => {
    if (!showPopup) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPopup]);

  return (
    <>
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
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="flex h-11 w-full items-center justify-center rounded-xl border border-line px-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5 sm:h-12"
            >
              Buy Now
            </button>
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

      {showPopup &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center px-3 py-3 sm:items-center sm:px-4 sm:py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`product-popup-title-${product.id}`}
            onClick={() => setShowPopup(false)}
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
            <div
              className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45)] sm:rounded-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                aria-label="Close product popup"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
              >
                <X size={18} />
              </button>

              <div className="grid flex-1 overflow-y-auto gap-0 md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative bg-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-4 sm:p-6"
                  />
                </div>
                <div className="flex flex-col gap-5 p-5 sm:p-6 lg:p-8">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {product.tag && (
                        <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">
                          {product.tag}
                        </span>
                      )}
                      <span className="text-xs font-medium uppercase tracking-wider text-clay">
                        {product.category}
                      </span>
                    </div>
                    <h3
                      id={`product-popup-title-${product.id}`}
                      className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[2rem]"
                    >
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <RatingStars rating={product.rating} />
                      <span className="text-sm text-clay">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-2xl font-semibold text-ink">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-clay line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">
                      Description
                    </h4>
                    <p className="text-sm leading-7 text-clay">
                      {product.description}
                    </p>
                  </div>

                  {product.specifications && product.specifications.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">
                        Full Details
                      </h4>
                      <dl className="grid gap-3 rounded-2xl border border-line bg-cream/60 p-4">
                        {product.specifications.map((spec) => (
                          <div
                            key={`${product.id}-${spec.label}`}
                            className="flex items-start justify-between gap-4 border-b border-line/60 pb-3 last:border-b-0 last:pb-0"
                          >
                            <dt className="text-sm font-medium text-ink">{spec.label}</dt>
                            <dd className="text-sm text-clay text-right">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  <div className="mt-auto grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="flex h-12 items-center justify-center rounded-xl bg-ink px-4 text-sm font-medium text-cream transition-all hover:bg-black active:scale-[0.98]"
                    >
                      {added ? (
                        <Check size={15} className="mr-1.5" />
                      ) : (
                        <Plus size={15} className="mr-1.5" />
                      )}
                      {added ? "Added to Cart" : "Add to Cart"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPopup(false)}
                      className="h-12 rounded-xl border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
