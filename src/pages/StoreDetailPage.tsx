import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JerseyCard from "@/components/JerseyCard";
import { stores, jerseyDesigns } from "@/data/mockData";
import { Star, Clock, ArrowLeft } from "lucide-react";

const StoreDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const store = stores.find((s) => s.id === id);
  const storeJerseys = jerseyDesigns.filter((j) => j.storeId === id);

  if (!store) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Store not found</h2>
            <Link to="/stores" className="text-primary hover:underline">← Back to stores</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Store header */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img src={store.coverImageUrl} alt={store.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container flex items-end gap-4 pb-4">
              <img src={store.logoUrl} alt="" className="h-16 w-16 rounded-full border-4 border-background shadow-lg" />
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-foreground">{store.name}</h1>
                <p className="text-sm text-muted-foreground">{store.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" />{store.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{store.deliveryTime}</span>
                  <span>{storeJerseys.length} jerseys</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="container pt-4">
          <Link to="/stores" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> All Stores
          </Link>
        </div>

        {/* Jersey grid */}
        <section className="container py-8">
          <h2 className="mb-6 text-xl font-bold text-foreground">Available Jerseys</h2>
          {storeJerseys.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">No jerseys available in this store yet.</p>
          ) : (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {storeJerseys.map((j) => (
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

export default StoreDetailPage;
