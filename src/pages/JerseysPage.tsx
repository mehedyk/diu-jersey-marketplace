import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFilters from "@/components/CategoryFilters";
import JerseyCard from "@/components/JerseyCard";
import { jerseyDesigns, type Category } from "@/data/mockData";

const JerseysPage = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("cat") as Category | null;
  const [selected, setSelected] = useState<Category>(catParam || "All");

  const filtered = selected === "All"
    ? jerseyDesigns
    : jerseyDesigns.filter((j) => j.category === selected);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <CategoryFilters selected={selected} onSelect={setSelected} />
        <section className="container pb-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Browse Jerseys</h2>
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No jerseys found for this category.</p>
          ) : (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((j) => (
                <JerseyCard key={j.id} jersey={j} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JerseysPage;
