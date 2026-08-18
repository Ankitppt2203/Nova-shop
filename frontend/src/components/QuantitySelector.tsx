import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  compact = false,
}: QuantitySelectorProps) {
  const buttonClass = `flex items-center justify-center text-ink transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-30 ${
    compact ? "h-9 w-9" : "h-12 w-12"
  }`;

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line bg-white ${
        compact ? "" : "shadow-sm"
      }`}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={compact ? 14 : 16} />
      </button>
      <span
        className={`text-center font-semibold tabular-nums ${
          compact ? "w-8 text-sm" : "w-10"
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={compact ? 14 : 16} />
      </button>
    </div>
  );
}
