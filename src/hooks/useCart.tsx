import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";
import { jerseyDesigns } from "@/data/mockData";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size: string;
  product?: {
    title: string;
    price_per_piece: number;
    main_image_url: string;
  };
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string, quantity: number, size?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalAmount: number;
  refetch: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "diu_jersey_hub_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function findProduct(productId: string) {
  const j = jerseyDesigns.find((d) => d.id === productId);
  if (!j) return undefined;
  return { title: j.title, price_per_piece: j.pricePerPiece, main_image_url: j.mainImageUrl };
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [loading] = useState(false);

  useEffect(() => { saveCart(items); }, [items]);

  const refetch = useCallback(async () => {
    setItems(loadCart());
  }, []);

  const addToCart = useCallback(async (productId: string, quantity: number, size = "M") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === productId && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product_id === productId && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      const newItem: CartItem = {
        id: `${productId}-${size}-${Date.now()}`,
        product_id: productId,
        quantity,
        size,
        product: findProduct(productId),
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback(async (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(async () => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + (i.product?.price_per_piece ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, cartCount, loading, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount, refetch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
