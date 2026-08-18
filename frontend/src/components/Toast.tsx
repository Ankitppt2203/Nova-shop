import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-line bg-white py-2.5 pl-3 pr-2.5 shadow-[0_12px_40px_-8px_rgba(29,26,22,0.25)]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
              <Check size={14} strokeWidth={2.5} />
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
            <Link
              to="/cart"
              className="rounded-full bg-cream px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-sand"
            >
              View Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
