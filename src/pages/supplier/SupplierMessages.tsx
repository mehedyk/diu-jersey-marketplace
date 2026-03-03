import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

const SupplierMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .eq("supplier_id", user.id)
        .order("last_message_at", { ascending: false });

      if (data) {
        setConversations(data);

        // Get unread counts
        const counts: Record<string, number> = {};
        for (const conv of data) {
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("is_read", false)
            .eq("sender_role", "buyer");
          counts[conv.id] = count ?? 0;
        }
        setUnreadCounts(counts);
      }
      setLoading(false);
    };

    fetchConversations();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">Messages</h1>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : conversations.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No conversations yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => (
              <Link
                key={conv.id}
                to={`/conversation/${conv.id}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">
                    Order #{conv.order_id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {conv.last_message_text || "No messages yet"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {conv.last_message_at && new Date(conv.last_message_at).toLocaleString()}
                  </p>
                </div>
                {(unreadCounts[conv.id] ?? 0) > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    {unreadCounts[conv.id]}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SupplierMessages;
