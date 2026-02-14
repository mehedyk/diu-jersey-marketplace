import { Link } from "react-router-dom";
import { stores } from "@/data/mockData";
import { Star, Clock, ChevronRight } from "lucide-react";

const StoresList = () => {
  const featured = stores.slice(0, 6);

  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground md:text-3xl">
            Popular Stores
          </h2>
          <Link to="/stores" className="text-sm font-bold text-primary hover:underline">
            See All →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((store) => (
            <Link
              key={store.id}
              to={`/stores/${store.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/40"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={store.coverImageUrl}
                  alt={store.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <img
                  src={store.logoUrl}
                  alt=""
                  className="absolute bottom-3 left-3 h-10 w-10 rounded-full border-2 border-background shadow-lg"
                />
              </div>
              <div className="p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{store.name}</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{store.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{store.deliveryTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoresList;
