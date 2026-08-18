import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ChevronRight,
  Heart,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { formatPrice, getProduct, PRODUCTS } from "../lib/products";
import { useCart } from "../context/CartContext";
import RatingStars from "../components/RatingStars";
import QuantitySelector from "../components/QuantitySelector";
import ProductCard from "../components/ProductCard";

const serviceNotes = [
  { icon: Truck, label: "Free shipping over ₹1,999" },
  { icon: RotateCcw, label: "30-day easy returns" },
  { icon: ShieldCheck, label: "Secure checkout" },
];

function ProductDetailsContent({ id }: { id: string }) {
  const product = getProduct(id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const saved = isInWishlist(product?.id ?? "");

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold">
          Product not found
        </h1>
        <p className="mt-3 text-clay">
          The product you&rsquo;re looking for doesn&rsquo;t exist or has been
          removed.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const related = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  const handleAdd = async () => {
    const success = await addToCart(product, quantity);
    if (!success) {
      return;
    }

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-clay">
        <Link to="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/products" className="transition-colors hover:text-ink">
          Products
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative self-start overflow-hidden rounded-3xl border border-line bg-cream">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          {product.tag && (
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink backdrop-blur">
              {product.tag}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-clay">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2.5">
            <RatingStars rating={product.rating} size={16} showValue />
            <span className="text-sm text-clay">
              · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-clay line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full border border-line bg-cream px-2.5 py-1 text-xs font-semibold">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-clay">
            {product.description}
          </p>

          {product.specifications && product.specifications.length > 0 && (
            <section className="mt-8 rounded-2xl border border-line bg-white p-5">
              <h2 className="font-display text-lg font-semibold">
                Product Specifications
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-line bg-cream/40 px-4 py-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wider text-clay">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-8 border-t border-line pt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="w-full lg:w-auto">
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-cream transition-all lg:flex-1 lg:px-12 ${
                  added
                    ? "bg-ink/85"
                    : "bg-ink hover:bg-black hover:shadow-[0_12px_30px_-10px_rgba(29,26,22,0.5)] active:scale-[0.98]"
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} /> Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                type="button"
                onClick={handleWishlist}
                aria-pressed={saved}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all lg:w-auto lg:flex-none ${
                  saved
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-white text-ink hover:border-ink/30 hover:bg-cream"
                }`}
              >
                <Heart size={15} className={saved ? "fill-current" : ""} />
                {saved ? "Saved" : "Wishlist"}
              </button>
            </div>
            <p className="mt-3 text-xs text-clay">
              In stock - ships within 24 hours.
            </p>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border border-line bg-cream/60 p-5 sm:grid-cols-3">
            {serviceNotes.map((note) => (
              <div
                key={note.label}
                className="flex items-center gap-2.5 text-xs font-medium text-ink/80"
              >
                <note.icon size={16} className="shrink-0" />
                {note.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            You May Also Like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return <ProductDetailsContent key={id} id={id} />;
}
