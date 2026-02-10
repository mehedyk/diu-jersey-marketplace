import { jerseyDesigns } from "@/data/mockData";
import JerseyCard from "@/components/JerseyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  title: string;
  filterFn?: (j: typeof jerseyDesigns[number]) => boolean;
}

const ProductCarousel = ({ title, filterFn }: ProductCarouselProps) => {
  const items = filterFn ? jerseyDesigns.filter(filterFn) : jerseyDesigns;

  return (
    <section className="bg-background py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-extrabold uppercase tracking-widest text-foreground md:text-3xl">
          {title}
        </h2>

        <Carousel opts={{ align: "start", loop: true }} className="mx-auto max-w-6xl">
          <CarouselContent>
            {items.map((jersey) => (
              <CarouselItem key={jersey.id} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <JerseyCard jersey={jersey} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12 bg-secondary border-border text-foreground hover:bg-muted" />
          <CarouselNext className="-right-4 md:-right-12 bg-secondary border-border text-foreground hover:bg-muted" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
