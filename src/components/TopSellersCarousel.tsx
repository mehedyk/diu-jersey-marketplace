import { Star } from "lucide-react";
import { jerseyDesigns } from "@/data/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const topSellers = jerseyDesigns.filter((j) => j.isTopSeller);

const TopSellersCarousel = () => (
  <section className="bg-secondary py-16">
    <div className="container">
      <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
        🔥 Top Sellers
      </h2>

      <Carousel opts={{ align: "start", loop: true }} className="mx-auto max-w-5xl">
        <CarouselContent>
          {topSellers.map((jersey) => (
            <CarouselItem key={jersey.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <img
                  src={jersey.mainImageUrl}
                  alt={jersey.title}
                  className="h-64 w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-bold text-foreground">{jersey.title}</h3>
                  <p className="text-xs text-muted-foreground">{jersey.supplierName}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">৳{jersey.pricePerPiece}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-xs font-semibold">{jersey.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12" />
        <CarouselNext className="-right-4 md:-right-12" />
      </Carousel>
    </div>
  </section>
);

export default TopSellersCarousel;
