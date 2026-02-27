import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shirt } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  in_review: "bg-blue-500/20 text-blue-400",
  in_production: "bg-orange-500/20 text-orange-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-destructive/20 text-destructive",
};

const MyCustomJerseysPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/login"); return; }
    if (!user) return;
    supabase
      .from("custom_jersey_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setRequests((data as any[]) ?? []); setLoading(false); });
  }, [user, authLoading, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">My Custom Jerseys</h1>
          <Link to="/custom-jersey"><Button>+ New Request</Button></Link>
        </div>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <Shirt className="mx-auto h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No custom jersey requests yet</p>
            <Link to="/custom-jersey"><Button>Create Your First Request</Button></Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <div key={req.id} className="rounded-xl bg-card border border-border overflow-hidden">
                {req.design_image_url && (
                  <img src={req.design_image_url} alt={req.team_or_club} className="h-40 w-full object-cover" />
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">{req.team_or_club || req.jersey_type}</h3>
                    <Badge className={statusColors[req.status] ?? statusColors.pending}>{req.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{req.jersey_type} • Qty: {req.quantity}</p>
                  <p className="text-xs text-muted-foreground">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyCustomJerseysPage;
