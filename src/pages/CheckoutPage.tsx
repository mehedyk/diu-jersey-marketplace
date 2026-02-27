import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { createNotification } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Smartphone, Banknote } from "lucide-react";

const paymentMethods = [
  { id: "bkash", label: "bKash", icon: Smartphone, color: "bg-pink-600" },
  { id: "nagad", label: "Nagad", icon: Smartphone, color: "bg-orange-500" },
  { id: "rocket", label: "Rocket", icon: Smartphone, color: "bg-purple-600" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, color: "bg-primary" },
];

const CheckoutPage = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isMobile = paymentMethod !== "cod";

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || items.length === 0) return;

    if (!phone.trim() || !address.trim()) {
      toast({ title: "Missing info", description: "Please provide phone and address", variant: "destructive" });
      return;
    }

    if (isMobile && !transactionId.trim()) {
      toast({ title: "Transaction ID required", description: `Please enter your ${paymentMethod} transaction ID`, variant: "destructive" });
      return;
    }

    setSubmitting(true);

    // Create order
    const { data: order, error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      payment_method: paymentMethod,
      payment_status: isMobile ? "pending_verification" : "unpaid",
      total_amount: totalAmount,
      shipping_address: address,
      phone,
      notes,
      transaction_id: isMobile ? transactionId : null,
    }).select().single();

    if (orderError || !order) {
      toast({ title: "Order failed", description: orderError?.message || "Something went wrong while placing your order. Please try again.", variant: "destructive" });
      setSubmitting(false);
      return;
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
      price_per_piece: item.product?.price_per_piece ?? 0,
    }));

    await supabase.from("order_items").insert(orderItems);

    // Insert initial status history
    await supabase.from("order_status_history").insert({
      order_id: order.id,
      status: "placed",
      note: "Order placed by customer",
    } as any);

    // Create notification
    await createNotification(
      user.id,
      "order_confirmation",
      "Order placed successfully!",
      `Your order #${order.id.slice(0, 8).toUpperCase()} has been placed. Track it from My Orders.`,
      { orderId: order.id, status: "placed" }
    );

    await clearCart();

    toast({ title: "Order placed successfully!", description: `Order #${order.id.slice(0, 8).toUpperCase()} created. You can track it from My Orders.` });
    setSubmitting(false);
    navigate(`/order-success?orderId=${order.id}`);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Delivery Information</h3>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="01XXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Your full address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions..." />
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() => { setPaymentMethod(method.id); setTransactionId(""); }}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className={`rounded-full p-2 ${method.color}`}>
                      <method.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-foreground">{method.label}</span>
                  </button>
                ))}
              </div>

              {isMobile && (
                <div className="mt-4 space-y-3 rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Send <span className="font-bold text-primary">৳{totalAmount.toFixed(2)}</span> to our{" "}
                    <span className="font-bold text-foreground">{paymentMethod}</span> number:{" "}
                    <span className="font-bold text-accent">01XXXXXXXXX</span>
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="txnId">Transaction ID</Label>
                    <Input
                      id="txnId"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                      placeholder="Enter your transaction ID"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-xl bg-card border border-border p-6 space-y-4 h-fit lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-foreground">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product?.title} × {item.quantity}</span>
                <span className="text-foreground">৳{((item.product?.price_per_piece ?? 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="border-border" />
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">৳{totalAmount.toFixed(2)}</span>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={submitting || items.length === 0}>
              {submitting ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
