import type { JerseyDesign } from "@/data/mockData";

interface JerseyCardProps {
  jersey: JerseyDesign;
}

const JerseyCard = ({ jersey }: JerseyCardProps) => (
  <div className="group cursor-pointer">
    {/* Image */}
    <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[3/4]">
      <img
        src={jersey.mainImageUrl}
        alt={jersey.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
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
      <p className="text-sm text-muted-foreground">
        ৳{jersey.pricePerPiece}
      </p>
    </div>
  </div>
);

export default JerseyCard;
