import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ConversationPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { isSupplier } = useRole();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/login"); return; }
    if (!user || !id) return;

    const load = async () => {
      const { data: conv } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id)
        .single();

      if (!conv) { navigate("/"); return; }
      setConversation(conv);

      const { data: ord } = await supabase
        .from("orders")
        .select("*")
        .eq("id", conv.order_id)
        .single();
      setOrder(ord);
      setLoading(false);
    };
    load();
  }, [user, authLoading, id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const currentRole = isSupplier ? "supplier" : "buyer";
  const backLink = isSupplier ? "/supplier/messages" : "/my-orders";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <Link to={backLink} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ height: "70vh" }}>
          <ChatWindow
            conversationId={id!}
            currentRole={currentRole}
            orderSummary={order ? {
              orderId: order.id,
              storeName: undefined,
              status: order.status,
            } : undefined}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConversationPage;
