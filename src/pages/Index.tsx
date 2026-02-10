import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import JerseyGrid from "@/components/JerseyGrid";
import TopSellersCarousel from "@/components/TopSellersCarousel";
import FeaturedSuppliers from "@/components/FeaturedSuppliers";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <HeroBanner />
      <JerseyGrid />
      <TopSellersCarousel />
      <FeaturedSuppliers />
      <HowItWorks />
      <Testimonials />
    </main>
    <Footer />
  </div>
);

export default Index;
