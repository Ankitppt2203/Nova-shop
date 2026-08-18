import { Link } from "react-router-dom";
import { ArrowRight, BadgeIndianRupee, Sparkles } from "lucide-react";
import { CATEGORY_GROUPS, buildCategoryPath } from "../lib/categoryOptions";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-line bg-[radial-gradient(circle_at_top_left,_rgba(239,233,221,0.9),_#fff_55%)] px-6 py-10 sm:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-clay">
            <Sparkles size={14} />
            Shop by Category
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Find the right category fast
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-clay sm:text-lg">
            Browse the full category directory from men and women to shoes,
            sports, formal and accessories. Some categories already have
            products behind them, and others are ready for upcoming drops.
          </p>
        </div>
      </section>

      <div className="mt-10 space-y-12">
        {CATEGORY_GROUPS.map((group) => (
          <section key={group.title}>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-clay">
                  Browse
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  {group.title}
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <article
                  key={item.name}
                  className="group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(29,26,22,0.2)]"
                >
                  <div
                    className={`h-24 bg-gradient-to-br ${item.accent} border-b border-line`}
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-clay">
                          {item.description}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-line bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-clay">
                        <BadgeIndianRupee size={13} />
                        Flexible assortment
                      </div>
                      <Link
                        to={buildCategoryPath(item.name)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 transition group-hover:underline"
                      >
                        Explore
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
