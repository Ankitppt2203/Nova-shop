import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  TicketPercent,
  Lock,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  formatPrice,
} from "../lib/products";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";

const COUPONS = {
  SAVE10: { label: "10% off your subtotal", type: "percent", value: 10 },
  SAVE200: { label: "₹200 off your subtotal", type: "fixed", value: 200 },
  FREESHIP: { label: "Free shipping", type: "shipping", value: 0 },
} as const;

type CouponCode = keyof typeof COUPONS;

export default function CartPage() {
  const {
    items,
    count,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
    error,
    refreshCart,
  } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const baseShipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const coupon = appliedCoupon ? COUPONS[appliedCoupon] : null;
  const discount =
    coupon?.type === "percent"
      ? Math.min(subtotal, Math.round((subtotal * coupon.value) / 100))
      : coupon?.type === "fixed"
        ? Math.min(subtotal, coupon.value)
        : 0;
  const shipping = coupon?.type === "shipping" ? 0 : baseShipping;
  const total = Math.max(0, subtotal - discount + shipping);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase() as CouponCode;
    if (code in COUPONS) {
      setAppliedCoupon(code);
      setCouponMessage(`${code} applied successfully.`);
    } else {
      setAppliedCoupon(null);
      setCouponMessage("That coupon code is not valid.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("");
  };

  const handleCheckout = async () => {
    if (isCheckingOut) {
      return;
    }

    setIsCheckingOut(true);
    const success = await clearCart();
    setIsCheckingOut(false);

    if (!success) {
      return;
    }

    setOrderPlaced(true);
    removeCoupon();
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

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
          <Loader2 size={28} className="animate-spin text-clay" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
          Loading your cart
        </h1>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-clay">
          We are syncing your cart with the server.
        </p>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-cream">
          <ShoppingBag size={28} className="text-clay" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
          We could not load your cart
        </h1>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-clay">
          {error}
        </p>
        <button
          type="button"
          onClick={() => void refreshCart()}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-black"
        >
          Retry
        </button>
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

      {error && items.length > 0 && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-cream/70 px-4 py-3 text-sm text-clay sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => void refreshCart()}
            className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 font-medium text-ink transition-colors hover:bg-sand sm:self-auto"
          >
            Retry sync
          </button>
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* Items */}
        <ul className="space-y-4">
          {items.map(({ id, product, quantity }) => (
            <li
              key={id}
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
                    onClick={() => void removeFromCart(id)}
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
                    onChange={(value) => void updateQuantity(id, value)}
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
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-clay">Coupon discount</dt>
                <dd className="font-semibold text-ink">
                  -{formatPrice(discount)}
                </dd>
              </div>
            )}
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
            <div className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center gap-2">
                <TicketPercent size={16} className="text-clay" />
                <h3 className="text-sm font-semibold">Apply coupon</h3>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(event) => setCouponInput(event.target.value)}
                  placeholder="Enter code"
                  className="h-11 flex-1 rounded-full border border-line bg-cream/40 px-4 text-sm outline-none transition focus:border-ink focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="h-11 rounded-full bg-ink px-4 text-sm font-semibold text-cream transition-colors hover:bg-black"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className="mt-2 text-xs text-clay">{couponMessage}</p>
              )}
              {appliedCoupon && (
                <div className="mt-3 flex items-center justify-between rounded-full bg-cream px-4 py-2 text-xs font-semibold text-ink">
                  <span>
                    {appliedCoupon} · {COUPONS[appliedCoupon].label}
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="inline-flex items-center gap-1 text-clay transition-colors hover:text-ink"
                  >
                    <X size={13} />
                    Remove
                  </button>
                </div>
              )}
            </div>
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
            disabled={isCheckingOut}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-cream transition-all hover:bg-black hover:shadow-[0_12px_30px_-10px_rgba(29,26,22,0.5)] disabled:cursor-not-allowed disabled:bg-ink/80"
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
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
