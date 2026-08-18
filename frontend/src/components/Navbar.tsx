import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Shop by Category" },
  { to: "/deals", label: "Today Deals" },
  { to: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const { count, wishlistCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-lg font-semibold text-cream">
            N
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Nova-Shop
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-white text-clay hover:border-ink/30 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-cream"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart size={20} strokeWidth={1.8} />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-cream"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-cream"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            to="/profile"
            className="hidden h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-cream md:inline-flex"
          >
            <UserRound size={16} />
            Profile
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-cream md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-ink text-cream"
                        : "text-clay hover:bg-cream hover:text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
