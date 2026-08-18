export type CategoryCard = {
  name: string;
  description: string;
  status: string;
  accent: string;
};

export const CATEGORY_GROUPS: { title: string; items: CategoryCard[] }[] = [
  {
    title: "By Audience",
    items: [
      {
        name: "Mens",
        description: "Everyday essentials, occasion wear and smart staples.",
        status: "Popular",
        accent: "from-stone-200 to-amber-100",
      },
      {
        name: "Womens",
        description: "Versatile styles, statement pieces and seasonal picks.",
        status: "Popular",
        accent: "from-rose-200 to-orange-100",
      },
      {
        name: "Kids",
        description: "Comfort-first clothing, shoes and playful accessories.",
        status: "New",
        accent: "from-sky-200 to-cyan-100",
      },
    ],
  },
  {
    title: "By Category",
    items: [
      {
        name: "Shoes",
        description: "Sneakers, runners, sandals and everyday pairs.",
        status: "Browse",
        accent: "from-slate-200 to-zinc-100",
      },
      {
        name: "Sports",
        description: "Activewear, training gear and performance-focused picks.",
        status: "Browse",
        accent: "from-emerald-200 to-lime-100",
      },
      {
        name: "Formal",
        description: "Work-ready, polished looks for events and office wear.",
        status: "Browse",
        accent: "from-violet-200 to-indigo-100",
      },
      {
        name: "Accessories",
        description: "Bags, belts, watches, sunglasses and more.",
        status: "Browse",
        accent: "from-amber-200 to-yellow-100",
      },
      {
        name: "Shirts",
        description: "Casual, smart and layered shirt styles.",
        status: "Coming soon",
        accent: "from-teal-200 to-cyan-100",
      },
      {
        name: "Trackpants",
        description: "Relaxed fits for lounging, travel and training.",
        status: "Coming soon",
        accent: "from-neutral-200 to-stone-100",
      },
      {
        name: "Watches",
        description: "Minimal, sporty and statement timepieces.",
        status: "Browse",
        accent: "from-orange-200 to-rose-100",
      },
      {
        name: "More Categories",
        description: "Denim, bags, outerwear, beauty, travel and seasonal edits.",
        status: "Always expanding",
        accent: "from-sand to-cream",
      },
    ],
  },
] as const;

export const NAVBAR_CATEGORIES = CATEGORY_GROUPS.flatMap((group) => group.items);

export function buildCategoryPath(category: string): string {
  const params = new URLSearchParams({ category });
  return `/products?${params.toString()}`;
}
