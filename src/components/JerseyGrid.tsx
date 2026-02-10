import { useState } from "react";
import CategoryFilters from "@/components/CategoryFilters";
import JerseyCard from "@/components/JerseyCard";
import { jerseyDesigns, type Category } from "@/data/mockData";

const JerseyGrid = () => {
  const [selected, setSelected] = useState<Category>("All");

  const filtered = selected === "All"
    ? jerseyDesigns
    : jerseyDesigns.filter((j) => j.category === selected);

  return (
    <>
      <CategoryFilters selected={selected} onSelect={setSelected} />
      <section className="container pb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Browse Jerseys</h2>
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No jerseys found for this category.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((j) => (
              <JerseyCard key={j.id} jersey={j} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default JerseyGrid;
