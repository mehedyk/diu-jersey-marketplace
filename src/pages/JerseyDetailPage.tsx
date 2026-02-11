import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { jerseyDesigns } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const sizes = ["S", "M", "L", "XL", "XXL"];

const JerseyDetailPage = () => {
  const { id } = useParams();
  const jersey = jerseyDesigns.find((j) => j.id === id);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  if (!jersey) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Jersey not found</h2>
            <Link to="/jerseys"><Button>Browse Jerseys</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: "Please login", description: "You need to login to add items to cart", variant: "destructive" });
      return;
    }
    await addToCart(jersey.id, quantity, selectedSize);
    toast({ title: "Added to cart!", description: `${jersey.title} (${selectedSize}) × ${quantity}` });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <Link to="/jerseys" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Jerseys
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-xl bg-card aspect-square">
            <img src={jersey.mainImageUrl} alt={jersey.title} className="h-full w-full object-cover" />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              {jersey.isTopSeller && (
                <span className="inline-block rounded bg-accent px-2 py-0.5 text-xs font-bold uppercase text-accent-foreground mb-2">
                  Top Seller
                </span>
              )}
              <h1 className="text-3xl font-extrabold text-foreground">{jersey.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">by {jersey.supplierName}</p>
            </div>

            <p className="text-3xl font-extrabold text-primary">৳{jersey.pricePerPiece}</p>

            <p className="text-sm text-muted-foreground leading-relaxed">{jersey.description}</p>

            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Category: <span className="text-muted-foreground font-normal">{jersey.category}</span></p>
              <p className="text-sm font-bold text-foreground">Fabric: <span className="text-muted-foreground font-normal">{jersey.fabricType}</span></p>
              <p className="text-sm font-bold text-foreground">Min Order: <span className="text-muted-foreground font-normal">{jersey.minOrderQuantity} pcs</span></p>
              <p className="text-sm font-bold text-foreground">Delivery: <span className="text-muted-foreground font-normal">~{jersey.estimatedDeliveryDays} days</span></p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Size</p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-lg border px-4 py-2 text-sm font-bold transition-all ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded bg-secondary px-3 py-1 text-foreground hover:bg-muted">−</button>
                <span className="text-lg font-bold text-foreground w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="rounded bg-secondary px-3 py-1 text-foreground hover:bg-muted">+</button>
              </div>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="w-full gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart — ৳{(jersey.pricePerPiece * quantity).toFixed(0)}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JerseyDetailPage;
