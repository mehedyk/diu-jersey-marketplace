import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Truck, Calendar, Clock, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  placed: "bg-muted text-muted-foreground",
  processing: "bg-blue-500/20 text-blue-400",
  in_production: "bg-orange-500/20 text-orange-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-destructive/20 text-destructive",
};

const statusLabels: Record<string, string> = {
  pending: "Order Placed", placed: "Order Placed", processing: "Processing",
  in_production: "In Production", shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled",
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/login"); return; }
    if (!user || !id) return;

    Promise.all([
      supabase.from("orders").select("*").eq("id", id).eq("user_id", user.id).single(),
      supabase.from("order_items").select("*").eq("order_id", id),
      supabase.from("order_status_history").select("*").eq("order_id", id).order("changed_at", { ascending: true }),
    ]).then(([orderRes, itemsRes, histRes]) => {
      if (!orderRes.data) { navigate("/my-orders"); return; }
      setOrder(orderRes.data);
      setItems(itemsRes.data ?? []);
      setHistory((histRes.data as any[]) ?? []);
      setLoading(false);
    });
  }, [user, authLoading, id, navigate]);

  if (loading) return <div className="flex min-h-screen flex-col"><Navbar /><main className="flex-1 container py-12"><p className="text-muted-foreground">Loading...</p></main><Footer /></div>;
  if (!order) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12 space-y-8">
        <Link to="/my-orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to My Orders
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-card border border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
                <Badge className={`text-sm px-3 py-1 ${statusColors[order.status] ?? statusColors.pending}`}>
                  {statusLabels[order.status] ?? order.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Date:</span> <span className="font-semibold text-foreground">{new Date(order.created_at).toLocaleDateString()}</span></div>
                <div><span className="text-muted-foreground">Total:</span> <span className="font-bold text-primary">৳{order.total_amount}</span></div>
                <div><span className="text-muted-foreground">Payment:</span> <span className="font-semibold text-foreground">{order.payment_method}</span></div>
                <div><span className="text-muted-foreground">Payment Status:</span> <span className="font-semibold text-foreground">{order.payment_status}</span></div>
              </div>

              {/* Tracking info */}
              {(order.courier_name || order.tracking_id || order.estimated_delivery_date) && (
                <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                  <h3 className="font-bold text-foreground flex items-center gap-2"><Truck className="h-4 w-4" /> Tracking Info</h3>
                  {order.courier_name && <p className="text-sm text-muted-foreground">Courier: <span className="text-foreground font-semibold">{order.courier_name}</span></p>}
                  {order.tracking_id && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Tracking ID:</span>
                      <span className="font-mono font-bold text-foreground">{order.tracking_id}</span>
                      <button onClick={() => { navigator.clipboard.writeText(order.tracking_id); toast({ title: "Copied!" }); }}>
                        <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  )}
                  {order.estimated_delivery_date && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Est. Delivery: <span className="text-foreground font-semibold">{order.estimated_delivery_date}</span>
                    </p>
                  )}
                </div>
              )}
              {order.status_note && <p className="text-sm text-muted-foreground italic">Note: {order.status_note}</p>}

              {/* Message Supplier button */}
              <Button
                onClick={async () => {
                  if (!user) return;
                  // Check for existing conversation
                  const { data: existing } = await supabase
                    .from("conversations")
                    .select("id")
                    .eq("order_id", order.id)
                    .eq("buyer_id", user.id)
                    .maybeSingle();

                  if (existing) {
                    navigate(`/conversation/${existing.id}`);
                  } else {
                    // Create new conversation — supplier_id is a placeholder; in production map from order
                    const { data: newConv } = await supabase
                      .from("conversations")
                      .insert({
                        order_id: order.id,
                        buyer_id: user.id,
                        supplier_id: user.id, // fallback — will be supplier's user_id when orders have supplier mapping
                      })
                      .select("id")
                      .single();
                    if (newConv) navigate(`/conversation/${newConv.id}`);
                  }
                }}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Supplier
              </Button>
            </div>

            {/* Order Items */}
            <div className="rounded-xl bg-card border border-border p-6 space-y-4">
              <h3 className="font-bold text-foreground">Order Items</h3>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items found</p>
              ) : items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm border-b border-border pb-2 last:border-0">
                  <span className="text-muted-foreground">Product {item.product_id.slice(0, 8)} × {item.quantity} (Size: {item.size})</span>
                  <span className="text-foreground font-bold">৳{(item.price_per_piece * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="rounded-xl bg-card border border-border p-6 space-y-4 h-fit">
            <h3 className="font-bold text-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> Status History</h3>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">No status updates yet</p>
            ) : (
              <div className="space-y-4">
                {history.map((h, i) => (
                  <div key={h.id} className="relative pl-6 border-l-2 border-border">
                    <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary" />
                    <p className="text-sm font-bold text-foreground">{statusLabels[h.status] ?? h.status}</p>
                    <p className="text-xs text-muted-foreground">{new Date(h.changed_at).toLocaleString()}</p>
                    {h.note && <p className="text-xs text-muted-foreground mt-1 italic">{h.note}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
