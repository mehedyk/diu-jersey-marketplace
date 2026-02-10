import { Button } from "@/components/ui/button";
import retroImage from "@/assets/retro-banner.jpg";

const RetroBanner = () => (
  <section className="relative h-[50vh] min-h-[300px] overflow-hidden">
    <img
      src={retroImage}
      alt="Retro jerseys"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-background/60" />

    <div className="container relative flex h-full flex-col items-start justify-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
        Throwback Collection
      </p>
      <h2 className="mt-2 text-4xl font-extrabold uppercase text-foreground md:text-6xl">
        Retro
      </h2>
      <Button
        size="lg"
        variant="outline"
        className="mt-6 border-foreground/40 text-foreground hover:bg-foreground hover:text-background font-bold uppercase tracking-widest text-sm px-10"
      >
        Shop Now
      </Button>
    </div>
  </section>
);

export default RetroBanner;
