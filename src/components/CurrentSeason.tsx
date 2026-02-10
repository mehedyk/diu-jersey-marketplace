import { jerseyDesigns } from "@/data/mockData";
import JerseyCard from "@/components/JerseyCard";

const CurrentSeason = () => {
  const featured = jerseyDesigns.filter((j) => j.isFeatured);

  return (
    <section className="bg-background py-16">
      <div className="container">
        <h2 className="mb-10 text-center text-2xl font-extrabold uppercase tracking-widest text-foreground md:text-3xl">
          Current Season
        </h2>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((jersey) => (
            <JerseyCard key={jersey.id} jersey={jersey} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentSeason;
