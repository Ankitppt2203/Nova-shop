import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { CATEGORIES } from "../lib/products";

const companyLinks = ["About Us", "Journal", "Careers", "Press"];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream font-display text-lg font-semibold text-ink">
                N
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                Nova-Shop
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Thoughtfully curated essentials for modern living. Quality
              materials, honest prices, and design that lasts.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Instagram, Twitter, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-cream/50 hover:bg-cream/10 hover:text-cream"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/50">
              Shop
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-cream/75 transition-colors hover:text-cream"
                >
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/50">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((label) => (
                <li key={label} className="text-cream/75">
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/50">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
              <li>hello@novashop.in</li>
              <li>+91 96706 57715</li>
              <li>Mon–Sat, 10am–7pm IST</li>
              <li>Beta 1, Greater Noida, Uttar Pradesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-8 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Nova-Shop. All rights reserved.</p>
          <p>Free shipping over ₹1,999 · 30-day returns · Secure checkout</p>
        </div>
      </div>
    </footer>
  );
}
