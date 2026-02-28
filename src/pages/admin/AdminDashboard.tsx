import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, ShoppingBag, Store, DollarSign, Shirt } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, suppliers: 0, orders: 0, revenue: 0, customRequests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, ordersRes, customRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id, total_amount"),
        supabase.from("custom_jersey_requests").select("id", { count: "exact", head: true }),
      ]);

      const orders = ordersRes.data || [];
      const revenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

      setStats({
        users: profilesRes.count || 0,
        suppliers: 0, // would need user_roles query
        orders: orders.length,
        revenue,
        customRequests: customRes.count || 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.users, icon: Users, color: "text-blue-500" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "text-primary" },
    { label: "Revenue", value: `৳${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-accent" },
    { label: "Custom Requests", value: stats.customRequests, icon: Shirt, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Admin Dashboard</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-foreground">{c.value}</p>
                </div>
                <c.icon className={`h-8 w-8 ${c.color}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
