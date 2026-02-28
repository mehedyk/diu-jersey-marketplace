import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const categories = ["Section", "Club", "Batch Jersey", "Tournament", "Departmental"];

const SupplierProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Section",
    price_per_piece: "",
    min_order_quantity: "10",
    base_color: "",
    fabric_type: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from("products").select("*").eq("supplier_user_id", user.id);
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const { error } = await supabase.from("products").insert({
      title: form.title,
      description: form.description,
      category: form.category,
      price_per_piece: Number(form.price_per_piece),
      min_order_quantity: Number(form.min_order_quantity),
      base_color: form.base_color,
      fabric_type: form.fabric_type,
      supplier_name: user.user_metadata?.full_name || "Supplier",
      supplier_user_id: user.id,
    });

    if (!error) {
      toast({ title: "Product added!" });
      setShowForm(false);
      setForm({ title: "", description: "", category: "Section", price_per_piece: "", min_order_quantity: "10", base_color: "", fabric_type: "" });
      fetchProducts();
    } else {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      toast({ title: "Product deleted" });
      fetchProducts();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">My Products</h1>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price per piece (৳)</Label>
              <Input type="number" value={form.price_per_piece} onChange={(e) => setForm({ ...form, price_per_piece: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Min Order Qty</Label>
              <Input type="number" value={form.min_order_quantity} onChange={(e) => setForm({ ...form, min_order_quantity: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Base Color</Label>
              <Input value={form.base_color} onChange={(e) => setForm({ ...form, base_color: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Fabric Type</Label>
              <Input value={form.fabric_type} onChange={(e) => setForm({ ...form, fabric_type: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <Button type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add Product"}</Button>
        </form>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground">No products yet. Add your first product!</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-bold text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.category} • ৳{p.price_per_piece}</p>
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default SupplierProducts;
