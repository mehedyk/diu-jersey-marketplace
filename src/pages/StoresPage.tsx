import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stores } from "@/data/mockData";
import { Star, Clock, ChevronRight } from "lucide-react";

const StoresPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">All Stores</h1>
          <p className="text-muted-foreground mb-8">Browse jersey stores and find your perfect kit</p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Link
                key={store.id}
                to={`/stores/${store.id}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/40"
              >
                {/* Cover image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={store.coverImageUrl}
                    alt={store.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {/* Logo */}
                  <img
                    src={store.logoUrl}
                    alt=""
                    className="absolute bottom-3 left-3 h-12 w-12 rounded-full border-2 border-background shadow-lg"
                  />
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{store.name}</h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{store.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {store.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {store.deliveryTime}
                    </span>
                    <span>{store.jerseyCount} jerseys</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StoresPage;
