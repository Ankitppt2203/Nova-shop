import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  formatPrice,
} from "../lib/products";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";

export default function CartPage() {
  const { items, count, subtotal, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
          <CheckCircle2 size={32} className="text-ink" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-clay">
          Your order has been placed successfully. A confirmation email is on
          its way to your inbox.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-black"
        >
          Continue Shopping
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
          <ShoppingBag size={28} className="text-clay" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-clay">
          Looks like you haven&rsquo;t added anything yet. Explore the
          collection and find something you&rsquo;ll love.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-black"
        >
          Continue Shopping
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          Your Cart
        </h1>
        <p className="mt-2 text-clay">
          {count} {count === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* Items */}
        <ul className="space-y-4">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-2xl border border-line bg-white p-4 sm:gap-5 sm:p-5"
            >
              <Link
                to={`/products/${product.id}`}
                className="block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream sm:h-28 sm:w-28"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-clay">
                      {product.category}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="mt-0.5 block truncate font-display text-lg font-semibold leading-snug underline-offset-4 hover:underline"
                    >
                      {product.name}
                    </Link>
                    <span className="mt-1 block text-sm text-clay">
                      {formatPrice(product.price)} each
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-clay transition-colors hover:bg-cream hover:text-ink"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantitySelector
                    compact
                    value={quantity}
                    onChange={(value) => updateQuantity(product.id, value)}
                  />
                  <span className="font-semibold">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="rounded-2xl border border-line bg-cream/60 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-clay">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-clay">Shipping</dt>
              <dd className="font-semibold">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            {remaining > 0 && (
              <div className="rounded-xl border border-line bg-white p-3 text-xs leading-relaxed text-clay">
                Add{" "}
                <span className="font-semibold text-ink">
                  {formatPrice(remaining)}
                </span>{" "}
                more to unlock free shipping.
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full bg-ink transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="text-base font-semibold">Total</dt>
              <dd className="font-display text-2xl font-semibold">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={handleCheckout}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-cream transition-all hover:bg-black hover:shadow-[0_12px_30px_-10px_rgba(29,26,22,0.5)]"
          >
            Checkout
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-clay">
            <Lock size={12} /> Secure checkout · 30-day returns
          </p>
          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-medium text-clay underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
