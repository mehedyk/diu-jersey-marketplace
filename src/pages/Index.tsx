import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProductCarousel from "@/components/ProductCarousel";
import ShopByCategory from "@/components/ShopByCategory";
import StoresList from "@/components/StoresList";
import CurrentSeason from "@/components/CurrentSeason";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BottomSignupBanner from "@/components/BottomSignupBanner";

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <AnnouncementBar />
    <Navbar />
    <main className="flex-1">
      <HeroBanner />
      <StoresList />
      <ProductCarousel title="New Arrivals" />
      <ShopByCategory />
      <CurrentSeason />
      <ProductCarousel
        title="Fans Favourites"
        filterFn={(j) => j.isTopSeller}
      />
      <FAQ />
    </main>
    <Footer />
    <BottomSignupBanner />
  </div>
);

export default Index;
