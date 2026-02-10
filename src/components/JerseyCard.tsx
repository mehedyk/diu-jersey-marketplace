import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JerseyDesign } from "@/data/mockData";

interface JerseyCardProps {
  jersey: JerseyDesign;
}

const JerseyCard = ({ jersey }: JerseyCardProps) => (
  <div className="group relative rounded-xl border bg-card p-3 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:bg-primary/5">
    {/* Badges */}
    <div className="absolute left-5 top-5 z-10 flex flex-col gap-1">
      {jersey.isTopSeller && (
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
          Top Seller
        </span>
      )}
      {jersey.isFeatured && (
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
          Featured
        </span>
      )}
    </div>

    {/* Favourite heart */}
    <button className="absolute right-5 top-5 z-10 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive">
      <Heart className="h-4 w-4" />
    </button>

    {/* Image */}
    <div className="overflow-hidden rounded-lg">
      <img
        src={jersey.mainImageUrl}
        alt={jersey.title}
        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {/* Info */}
    <div className="mt-3 space-y-1.5 px-1">
      <p className="text-xs font-medium text-muted-foreground">{jersey.supplierName}</p>
      <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2">{jersey.title}</h3>

      <div className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
        <span className="text-xs font-semibold">{jersey.rating}</span>
        <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {jersey.category}
        </span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-base font-bold text-primary">৳{jersey.pricePerPiece}</span>
        <Button size="sm" variant="outline" className="h-8 text-xs">
          View Details
        </Button>
      </div>
    </div>
  </div>
);

export default JerseyCard;
