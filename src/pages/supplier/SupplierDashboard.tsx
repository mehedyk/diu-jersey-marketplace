import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { ShoppingBag, Package, CheckCircle, DollarSign } from "lucide-react";

const SupplierDashboard = () => {
  const [stats, setStats] = useState({ total: 0, inProduction: 0, completed: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: orders } = await supabase.from("orders").select("*");
      const all = orders || [];
      setStats({
        total: all.length,
        inProduction: all.filter((o) => o.status === "in_production").length,
        completed: all.filter((o) => o.status === "delivered").length,
        revenue: all.filter((o) => o.status === "delivered").reduce((s, o) => s + Number(o.total_amount || 0), 0),
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Assigned Orders", value: stats.total, icon: ShoppingBag, color: "text-blue-500" },
    { label: "In Production", value: stats.inProduction, icon: Package, color: "text-orange-500" },
    { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-primary" },
    { label: "Revenue", value: `৳${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-accent" },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Supplier Dashboard</h1>
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

export default SupplierDashboard;
