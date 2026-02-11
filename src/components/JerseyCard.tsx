import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { JerseyDesign } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

interface JerseyCardProps {
  jersey: JerseyDesign;
}

const JerseyCard = ({ jersey }: JerseyCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(jersey.id, 1);
    toast({ title: "Added to cart", description: jersey.title });
  };

  return (
    <Link to={`/jerseys/${jersey.id}`} className="group cursor-pointer block">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-card aspect-[3/4] transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
        <img
          src={jersey.mainImageUrl}
          alt={jersey.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Heart icon */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute right-3 top-3 rounded-full bg-background/60 p-1.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-primary"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 rounded-full bg-primary p-2 text-primary-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-primary/80"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>

        {/* Badges */}
        {jersey.isTopSeller && (
          <span className="absolute left-3 top-3 rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
            Top Seller
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {jersey.title}
        </h3>
        <p className="text-sm font-semibold text-primary">
          ৳{jersey.pricePerPiece}
        </p>
      </div>
    </Link>
  );
};

export default JerseyCard;
