import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryFilters from "@/components/CategoryFilters";
import JerseyCard from "@/components/JerseyCard";
import { jerseyDesigns, type Category } from "@/data/mockData";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "relevance" | "price-low" | "price-high" | "top-rated";

const sortLabels: Record<SortOption, string> = {
  relevance: "Relevance",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  "top-rated": "Top Rated",
};

const JerseysPage = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("cat") as Category | null;
  const [selected, setSelected] = useState<Category>(catParam || "All");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = selected === "All"
    ? [...jerseyDesigns]
    : jerseyDesigns.filter((j) => j.category === selected);

  // Sort
  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.pricePerPiece - b.pricePerPiece);
      break;
    case "price-high":
      filtered.sort((a, b) => b.pricePerPiece - a.pricePerPiece);
      break;
    case "top-rated":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <CategoryFilters selected={selected} onSelect={setSelected} />
        <section className="container pb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Browse Jerseys</h2>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              {showFilters && (
                <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-xl border border-border bg-popover p-4 shadow-xl">
                  <h4 className="mb-3 text-sm font-bold text-foreground">Sort by</h4>
                  <div className="space-y-2">
                    {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                      <label
                        key={opt}
                        className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
                      >
                        <input
                          type="radio"
                          name="sort"
                          checked={sortBy === opt}
                          onChange={() => { setSortBy(opt); setShowFilters(false); }}
                          className="accent-primary"
                        />
                        {sortLabels[opt]}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

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
