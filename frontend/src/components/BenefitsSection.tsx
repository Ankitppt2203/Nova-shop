import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "Free delivery on all orders over ₹1,999, straight to your door.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "Every transaction is encrypted and fully protected end to end.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    text: "Changed your mind? Enjoy 30-day hassle-free returns.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Our friendly team is here for you, day or night.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-clay">
          Why Nova-Shop
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          Shop with Confidence
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-line bg-cream/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-cream hover:shadow-[0_12px_30px_-12px_rgba(29,26,22,0.15)]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm">
              <benefit.icon size={20} strokeWidth={1.8} />
            </div>
            <h3 className="font-semibold">{benefit.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-clay">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
