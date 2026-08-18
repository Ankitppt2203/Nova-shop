/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../lib/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface WishlistItem {
  product: Product;
}

interface ToastState {
  id: number;
  message: string;
}

interface CartContextValue {
  items: CartItem[];
  wishlistItems: WishlistItem[];
  count: number;
  wishlistCount: number;
  subtotal: number;
  toast: ToastState | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  dismissToast: () => void;
}

const STORAGE_KEY = "nova-shop-cart";
const WISHLIST_STORAGE_KEY = "nova-shop-wishlist";

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(
    loadWishlist
  );
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable — cart still works in memory.
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // Storage unavailable — wishlist still works in memory.
    }
  }, [wishlistItems]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setToast({ id: Date.now(), message: `${product.name} added to cart` });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.product.id !== productId)
        : prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const dismissToast = useCallback(() => setToast(null), []);
  const toggleWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      const next = exists
        ? prev.filter((item) => item.product.id !== product.id)
        : [...prev, { product }];
      setToast({
        id: Date.now(),
        message: exists
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`,
      });
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) =>
      wishlistItems.some((item) => item.product.id === productId),
    [wishlistItems]
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);
  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        wishlistItems,
        count,
        wishlistCount,
        subtotal,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
