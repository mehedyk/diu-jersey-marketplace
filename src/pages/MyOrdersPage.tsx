import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

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
  pending: "Order Placed",
  placed: "Order Placed",
  processing: "Processing",
  in_production: "In Production",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const MyOrdersPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/login"); return; }
    if (!user) return;
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data ?? []); setLoading(false); });
  }, [user, authLoading, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-extrabold text-foreground mb-8">My Orders</h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No orders yet</p>
            <Link to="/stores"><Button>Browse Stores</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex items-center justify-between rounded-xl bg-card border border-border p-5 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-sm font-mono font-bold text-foreground">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-foreground">৳{order.total_amount}</p>
                  <Badge className={statusColors[order.status] ?? statusColors.pending}>
                    {statusLabels[order.status] ?? order.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyOrdersPage;
