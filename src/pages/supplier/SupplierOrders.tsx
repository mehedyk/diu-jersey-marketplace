import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  placed: "bg-muted text-muted-foreground",
  processing: "bg-blue-500/20 text-blue-400",
  in_production: "bg-orange-500/20 text-orange-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
};

const allowedStatuses = ["processing", "in_production", "shipped", "delivered"];

const SupplierOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (!error) {
      await supabase.from("order_status_history").insert({
        order_id: orderId,
        status: newStatus,
        note: `Status updated to ${newStatus} by supplier`,
        changed_by: "supplier",
      } as any);
      toast({ title: "Order status updated" });
      fetchOrders();
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">My Orders</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">No orders assigned to you.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-foreground mt-1">৳{Number(order.total_amount).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[order.status] || "bg-muted"}>
                    {order.status.replace("_", " ").toUpperCase()}
                  </Badge>
                  <Select onValueChange={(v) => updateStatus(order.id, v)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Update" />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedStatuses.map((s) => (
                        <SelectItem key={s} value={s}>{s.replace("_", " ").toUpperCase()}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default SupplierOrders;
