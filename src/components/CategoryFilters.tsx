import { categories, type Category } from "@/data/mockData";

interface CategoryFiltersProps {
  selected: Category;
  onSelect: (cat: Category) => void;
}

const CategoryFilters = ({ selected, onSelect }: CategoryFiltersProps) => (
  <section className="container py-8">
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
            selected === cat
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-primary/10"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </section>
);

export default CategoryFilters;
