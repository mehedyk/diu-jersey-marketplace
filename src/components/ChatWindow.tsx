import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatWindowProps {
  conversationId: string;
  currentRole: "buyer" | "supplier";
  orderSummary?: { orderId: string; storeName?: string; status?: string };
}

const ChatWindow = ({ conversationId, currentRole, orderSummary }: ChatWindowProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
  };

  // Mark messages as read
  const markRead = async () => {
    if (!user) return;
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", user.id)
      .eq("is_read", false);
  };

  useEffect(() => {
    fetchMessages().then(markRead);

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
        if (payload.new.sender_id !== user?.id) {
          supabase.from("messages").update({ is_read: true }).eq("id", payload.new.id);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [conversationId, user?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !user || sending) return;
    setSending(true);
    const text = newMsg.trim();
    setNewMsg("");

    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      sender_role: currentRole,
      text,
    });

    await supabase
      .from("conversations")
      .update({ last_message_text: text, last_message_at: new Date().toISOString() })
      .eq("id", conversationId);

    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Order summary header */}
      {orderSummary && (
        <div className="border-b border-border bg-card p-4">
          <p className="text-sm font-bold text-foreground">
            Order #{orderSummary.orderId.slice(0, 8).toUpperCase()}
          </p>
          {orderSummary.storeName && (
            <p className="text-xs text-muted-foreground">{orderSummary.storeName}</p>
          )}
          {orderSummary.status && (
            <p className="text-xs text-muted-foreground">Status: {orderSummary.status}</p>
          )}
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </p>
        )}
        {messages.map((msg) => {
          const isOwn = msg.sender_id === user?.id;
          return (
            <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${
                  isOwn
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isOwn ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 flex gap-2">
        <Input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={sending || !newMsg.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
