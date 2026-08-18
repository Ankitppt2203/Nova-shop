export type Category = "Home & Living" | "Accessories" | "Tech" | "Wellness";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  featured?: boolean;
  tag?: "Bestseller" | "New";
}

export const CATEGORIES: Category[] = [
  "Home & Living",
  "Accessories",
  "Tech",
  "Wellness",
];

export const FREE_SHIPPING_THRESHOLD = 1999;
export const SHIPPING_COST = 99;

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const PRODUCTS: Product[] = [
  {
    id: "aurelia-vase",
    name: "Aurelia Ceramic Vase",
    category: "Home & Living",
    price: 1499,
    rating: 4.8,
    reviews: 214,
    description:
      "Hand-thrown from matte stoneware with a soft sand glaze, the Aurelia vase brings quiet sculptural warmth to shelves and tables. Each piece is finished by hand, so no two are exactly alike.",
    image: "/images/products/aurelia-vase.jpg",
    featured: true,
    tag: "Bestseller",
  },
  {
    id: "linen-throw",
    name: "Sable Linen Throw",
    category: "Home & Living",
    price: 2299,
    rating: 4.9,
    reviews: 168,
    description:
      "Woven from 100% European flax, this generously sized throw softens with every wash. Breathable in summer and layering-warm in winter — the kind of piece your home reaches for daily.",
    image: "/images/products/linen-throw.jpg",
  },
  {
    id: "halo-lamp",
    name: "Halo Table Lamp",
    category: "Home & Living",
    price: 3499,
    rating: 4.7,
    reviews: 96,
    description:
      "A soft dome of warm light wrapped in brushed metal. The Halo dims smoothly from reading-bright to a low evening glow, with a discreet touch control on its base.",
    image: "/images/products/halo-lamp.jpg",
    tag: "New",
  },
  {
    id: "atlas-tote",
    name: "Atlas Leather Tote",
    category: "Accessories",
    price: 4999,
    rating: 4.8,
    reviews: 342,
    description:
      "Cut from full-grain vegetable-tanned leather, the Atlas tote develops a rich patina over time. Fits a 14-inch laptop, with an interior zip pocket and reinforced handles.",
    image: "/images/products/atlas-tote.jpg",
    featured: true,
  },
  {
    id: "pulse-headphones",
    name: "Pulse Wireless Headphones",
    category: "Tech",
    price: 6999,
    originalPrice: 8999,
    rating: 4.9,
    reviews: 1024,
    description:
      "Studio-tuned sound, adaptive noise cancellation and 40 hours of battery. Plush memory-foam ear cushions keep long listening sessions comfortable.",
    image: "/images/products/pulse-headphones.jpg",
    featured: true,
    tag: "Bestseller",
  },
  {
    id: "nova-watch",
    name: "Nova Smart Watch",
    category: "Tech",
    price: 7499,
    rating: 4.6,
    reviews: 512,
    description:
      "Track workouts, sleep and notifications from a bright always-on display. A week of battery life in a case that looks more jewelry than gadget.",
    image: "/images/products/nova-watch.jpg",
    tag: "New",
  },
  {
    id: "ember-candles",
    name: "Ember Candle Trio",
    category: "Wellness",
    price: 1199,
    rating: 4.8,
    reviews: 287,
    description:
      "Three of our most loved scents — Cedar & Amber, Fig Leaf, and Sea Salt — poured into reusable glass vessels with 45 hours of burn time each.",
    image: "/images/products/ember-candles.jpg",
  },
  {
    id: "botanica-serum",
    name: "Botanica Face Serum",
    category: "Wellness",
    price: 1599,
    rating: 4.7,
    reviews: 431,
    description:
      "A lightweight daily serum with 10% vitamin C, hyaluronic acid and squalane. Brightens, plumps and absorbs in seconds — no residue, no fuss.",
    image: "/images/products/botanica-serum.jpg",
    featured: true,
    tag: "New",
  },
  {
    id: "solstice-shades",
    name: "Solstice Sunglasses",
    category: "Accessories",
    price: 2499,
    rating: 4.5,
    reviews: 178,
    description:
      "Hand-polished acetate frames with scratch-resistant, UV400 polarized lenses. Classic proportions that suit every face shape.",
    image: "/images/products/solstice-shades.jpg",
  },
  {
    id: "jute-basket",
    name: "Jute Woven Basket",
    category: "Home & Living",
    price: 999,
    rating: 4.6,
    reviews: 121,
    description:
      "Handwoven from natural jute with sturdy cotton handles. Beautiful with blankets by the sofa, or corralled as storage anywhere life accumulates.",
    image: "/images/products/jute-basket.jpg",
  },
  {
    id: "orbit-speaker",
    name: "Orbit Mini Speaker",
    category: "Tech",
    price: 3299,
    rating: 4.7,
    reviews: 689,
    description:
      "Room-filling 360° sound in a palm-sized fabric body. Twelve hours of playtime, IPX5 water resistance and one-touch pairing.",
    image: "/images/products/orbit-speaker.jpg",
  },
  {
    id: "meridian-watch",
    name: "Meridian Classic Watch",
    category: "Accessories",
    price: 5499,
    rating: 4.9,
    reviews: 256,
    description:
      "A slim 38mm case, sapphire crystal and Japanese quartz movement, finished with a quick-release leather strap. Understated, precise, everyday.",
    image: "/images/products/meridian-watch.jpg",
  },
];

export interface CategoryMeta {
  name: Category;
  image: string;
  blurb: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    name: "Home & Living",
    image: "/images/categories/home.jpg",
    blurb: "Warm textures and timeless objects for considered spaces.",
  },
  {
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
    blurb: "Leather goods and everyday carry, crafted to age beautifully.",
  },
  {
    name: "Tech",
    image: "/images/categories/tech.jpg",
    blurb: "Quiet technology that blends into the way you live.",
  },
  {
    name: "Wellness",
    image: "/images/categories/wellness.jpg",
    blurb: "Small rituals — candles, skincare and calm.",
  },
];

export function getProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
