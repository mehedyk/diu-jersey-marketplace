import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-jerseys.jpg";

const HeroBanner = () => (
  <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
    {/* Background image */}
    <img
      src={heroImage}
      alt="Jersey collection display"
      className="absolute inset-0 h-full w-full object-cover"
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

    {/* Content */}
    <div className="container relative flex h-full flex-col justify-end pb-16 md:pb-24">
      <h1 className="max-w-3xl text-5xl font-extrabold uppercase leading-none text-foreground md:text-7xl lg:text-8xl">
        Claim Your{" "}
        <span className="text-primary">Official</span>{" "}
        Jerseys
      </h1>

      <div className="mt-8">
        <Button
          size="lg"
          variant="outline"
          className="border-foreground/40 text-foreground hover:bg-foreground hover:text-background font-bold uppercase tracking-widest text-sm px-10 py-6"
        >
          Shop Now
        </Button>
      </div>
    </div>
  </section>
);

export default HeroBanner;
