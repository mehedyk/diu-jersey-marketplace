import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminSuppliers = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    setLoading(true);
    // Get all profiles and check roles
    const { data: profiles } = await supabase.from("profiles").select("*");
    setSuppliers(profiles || []);
    setLoading(false);
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const promoteToSupplier = async (userId: string) => {
    const { error } = await supabase.from("user_roles" as any).upsert({
      user_id: userId,
      role: "supplier",
    });
    if (!error) {
      toast({ title: "User promoted to supplier" });
      fetchSuppliers();
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Manage Suppliers</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : suppliers.length === 0 ? (
        <p className="text-muted-foreground">No users found.</p>
      ) : (
        <div className="space-y-3">
          {suppliers.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-bold text-foreground">{profile.full_name || "Unknown"}</p>
                <p className="text-sm text-muted-foreground">{profile.phone || "No phone"}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => promoteToSupplier(profile.user_id)}>
                Make Supplier
              </Button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminSuppliers;
