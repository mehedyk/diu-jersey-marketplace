import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  placed: "bg-muted text-muted-foreground",
  processing: "bg-blue-500/20 text-blue-400",
  in_production: "bg-orange-500/20 text-orange-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
};

const statusOptions = ["placed", "processing", "in_production", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ status: "", courier_name: "", tracking_id: "", status_note: "" });

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdate = async (orderId: string) => {
    const { error } = await supabase.from("orders").update({
      status: editData.status,
      courier_name: editData.courier_name || null,
      tracking_id: editData.tracking_id || null,
      status_note: editData.status_note || null,
    }).eq("id", orderId);

    if (!error) {
      await supabase.from("order_status_history").insert({
        order_id: orderId,
        status: editData.status,
        note: editData.status_note || `Status updated to ${editData.status}`,
        changed_by: "admin",
      } as any);
      toast({ title: "Order updated successfully" });
      setEditingId(null);
      fetchOrders();
    } else {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">All Orders</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-foreground mt-1">৳{Number(order.total_amount).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{order.payment_method} • {order.payment_status}</p>
                </div>
                <Badge className={statusColors[order.status] || "bg-muted"}>
                  {order.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>

              {editingId === order.id ? (
                <div className="mt-4 space-y-3 border-t border-border pt-4">
                  <Select value={editData.status} onValueChange={(v) => setEditData({ ...editData, status: v })}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s}>{s.replace("_", " ").toUpperCase()}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Courier name" value={editData.courier_name} onChange={(e) => setEditData({ ...editData, courier_name: e.target.value })} />
                  <Input placeholder="Tracking ID" value={editData.tracking_id} onChange={(e) => setEditData({ ...editData, tracking_id: e.target.value })} />
                  <Input placeholder="Status note" value={editData.status_note} onChange={(e) => setEditData({ ...editData, status_note: e.target.value })} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdate(order.id)}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => {
                    setEditingId(order.id);
                    setEditData({
                      status: order.status,
                      courier_name: order.courier_name || "",
                      tracking_id: order.tracking_id || "",
                      status_note: order.status_note || "",
                    });
                  }}
                >
                  Manage
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminOrders;
