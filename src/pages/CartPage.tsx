import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, loading, removeFromCart, updateQuantity, totalAmount } = useCart();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Your Cart</h1>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Link to="/stores"><Button>Browse Stores</Button></Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl bg-card border border-border p-4">
                  <img
                    src={item.product?.main_image_url || "/placeholder.svg"}
                    alt={item.product?.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-foreground">{item.product?.title}</h3>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <p className="text-sm font-semibold text-primary">৳{item.product?.price_per_piece}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded bg-secondary p-1 text-foreground hover:bg-muted">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-bold text-foreground w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded bg-secondary p-1 text-foreground hover:bg-muted">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4 h-fit lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-foreground">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="text-foreground font-bold">৳{totalAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-foreground">Calculated at checkout</span>
                </div>
                {totalAmount > 1000 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-semibold">Savings</span>
                    <span className="text-primary font-bold">-৳{Math.round(totalAmount * 0.05)}</span>
                  </div>
                )}
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">৳{totalAmount.toFixed(0)}</span>
              </div>
              <Link to="/checkout" className="block">
                <Button className="w-full font-bold text-sm" size="lg">Go to Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
