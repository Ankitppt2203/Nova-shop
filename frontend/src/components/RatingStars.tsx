import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  size = 14,
  showValue = false,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? "fill-amber-500 text-amber-500"
                : "fill-line text-line"
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-ink">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
