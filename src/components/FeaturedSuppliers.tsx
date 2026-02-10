import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { suppliers } from "@/data/mockData";

const FeaturedSuppliers = () => (
  <section className="container py-16">
    <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
      Featured Suppliers
    </h2>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {suppliers.map((s) => (
        <div
          key={s.id}
          className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
        >
          <img src={s.logoUrl} alt={s.brandName} className="h-16 w-16 rounded-full" />
          <h3 className="mt-3 text-base font-bold text-foreground">{s.brandName}</h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.description}</p>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm font-semibold">{s.rating}</span>
            <span className="ml-2 text-xs text-muted-foreground">{s.designCount} designs</span>
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            View Supplier
          </Button>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedSuppliers;
