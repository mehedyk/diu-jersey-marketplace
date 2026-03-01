import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-jerseys.jpg";

const HeroBanner = () => (
  <section className="relative h-[90vh] min-h-[550px] overflow-hidden">
    {/* Background image */}
    <img
      src={heroImage}
      alt="Jersey collection display"
      className="absolute inset-0 h-full w-full object-cover"
    />
    {/* Dark overlay — 65% black */}
    <div className="absolute inset-0 bg-black/[0.65]" />

    {/* Content */}
    <div className="container relative flex h-full flex-col items-center justify-center text-center">
      <h1 className="max-w-4xl text-5xl font-extrabold uppercase leading-none text-white md:text-7xl lg:text-8xl drop-shadow-lg">
        All DIU Jerseys.
        <br />
        <span className="text-[hsl(var(--primary))]">One Platform.</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
        The official marketplace for every DIU club, department &amp; team jersey.
      </p>

      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Button
          size="lg"
          className="bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90 font-bold uppercase tracking-widest text-sm px-10 py-6"
        >
          Shop Now
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white/40 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-sm px-10 py-6"
        >
          Custom Order
        </Button>
      </div>
    </div>
  </section>
);

export default HeroBanner;
