import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data: profiles } = await supabase.from("profiles").select("*");
    setUsers(profiles || []);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const changeRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.from("user_roles" as any).upsert({
      user_id: userId,
      role: newRole,
    }, { onConflict: "user_id,role" as any });
    if (!error) {
      toast({ title: `Role updated to ${newRole}` });
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">All Users</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-bold text-foreground">{u.full_name || "Unknown"}</p>
                <p className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</p>
              </div>
              <Select onValueChange={(v) => changeRole(u.user_id, v)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Change role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;
