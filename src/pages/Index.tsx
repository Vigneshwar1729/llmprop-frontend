import CrystalBackground from "@/components/CrystalBackground";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PredictorSection from "@/components/PredictorSection";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <ErrorBoundary>
        <CrystalBackground />
      </ErrorBoundary>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <PredictorSection />
        <ProcessSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
