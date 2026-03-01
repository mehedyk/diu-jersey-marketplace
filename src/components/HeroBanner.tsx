import heroImage from "@/assets/hero-jerseys.jpg";

const HeroBanner = () => (
  <section className="relative h-[90vh] min-h-[550px] overflow-hidden">
    <img
      src={heroImage}
      alt="Jersey collection display"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/[0.65]" />

    <div className="container relative flex h-full flex-col justify-center">
      <h1 className="text-5xl font-extrabold uppercase leading-none text-white md:text-7xl lg:text-8xl drop-shadow-lg">
        All DIU Jerseys
        <br />
        <span className="text-primary">One Platform</span>
      </h1>
    </div>
  </section>
);

export default HeroBanner;
