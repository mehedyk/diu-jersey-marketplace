import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, size, products(title, price_per_piece, main_image_url)")
      .eq("user_id", user.id);
    
    setItems(
      (data ?? []).map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        product: item.products,
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = useCallback(async (productId: string, quantity: number, size = "M") => {
    if (!user) return;
    await supabase.from("cart_items").upsert(
      { user_id: user.id, product_id: productId, quantity, size },
      { onConflict: "user_id,product_id,size" }
    );
    await fetchCart();
  }, [user, fetchCart]);

  const removeFromCart = useCallback(async (itemId: string) => {
    await supabase.from("cart_items").delete().eq("id", itemId);
    await fetchCart();
  }, [fetchCart]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    await supabase.from("cart_items").update({ quantity }).eq("id", itemId);
    await fetchCart();
  }, [removeFromCart, fetchCart]);

  const clearCart = useCallback(async () => {
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setItems([]);
  }, [user]);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + (i.product?.price_per_piece ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, cartCount, loading, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount, refetch: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
