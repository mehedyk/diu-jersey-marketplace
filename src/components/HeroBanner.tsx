import { Button } from "@/components/ui/button";

const HeroBanner = () => (
  <section className="relative overflow-hidden bg-primary">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary-foreground" />
    </div>

    <div className="container relative flex flex-col items-center gap-8 py-20 text-center md:py-28">
      <div className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
        🏆 DIU's #1 Jersey Marketplace
      </div>

      <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
        All DIU Jerseys{" "}
        <span className="text-accent">in One Place</span>
      </h1>

      <p className="max-w-xl text-lg text-primary-foreground/80">
        Compare designs from top suppliers and order for your department, club, or batch in a few clicks.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
          Order for Your Club
        </Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
          Become a Supplier
        </Button>
      </div>

      {/* Jersey showcase row — simple placeholders */}
      <div className="mt-8 flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-48 w-36 shrink-0 rounded-xl bg-primary-foreground/10 backdrop-blur-sm md:h-60 md:w-44"
          />
        ))}
      </div>
    </div>
  </section>
);

export default HeroBanner;
