import { Link } from "react-router-dom";
import { Heart, MapPin, Package, Settings, UserRound } from "lucide-react";

const profileStats = [
  { label: "Orders", value: "8" },
  { label: "Wishlist", value: "24" },
  { label: "Saved addresses", value: "2" },
];

const quickLinks = [
  { label: "Account settings", icon: Settings },
  { label: "Saved items", icon: Heart, to: "/wishlist" },
  { label: "Order history", icon: Package },
  { label: "Shipping details", icon: MapPin },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-line bg-white p-8 shadow-[0_18px_50px_-24px_rgba(29,26,22,0.18)]">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream text-ink">
              <UserRound size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-clay">
                My Profile
              </p>
              <h1 className="mt-2 font-display text-4xl font-semibold">
                Welcome back, Ankit
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-clay sm:text-base">
                Track your saved items, orders and account settings from one
                place.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {profileStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-cream/40 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-clay">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-line bg-cream p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">
            Quick access
          </p>
          <div className="mt-5 space-y-3">
            {quickLinks.map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 transition-colors hover:border-ink/20 hover:bg-cream"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink">
                    <item.icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink">
                    <item.icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {item.label}
                  </span>
                </div>
              )
            ))}
          </div>
          <Link
            to="/products"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black"
          >
            Continue shopping
          </Link>
        </aside>
      </section>
    </div>
  );
}
