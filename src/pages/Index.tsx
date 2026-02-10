import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductCarousel from "@/components/ProductCarousel";
import ShopByCategory from "@/components/ShopByCategory";
import CurrentSeason from "@/components/CurrentSeason";
import RetroBanner from "@/components/RetroBanner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <AnnouncementBar />
    <Navbar />
    <main className="flex-1">
      <HeroBanner />
      <ProductCarousel title="New Arrivals" />
      <ShopByCategory />
      <CurrentSeason />
      <RetroBanner />
      <ProductCarousel
        title="Fans Favourites"
        filterFn={(j) => j.isTopSeller}
      />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default Index;
