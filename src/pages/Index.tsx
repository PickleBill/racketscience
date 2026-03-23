import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePropSection from "@/components/ValuePropSection";
import SpecialistSection from "@/components/SpecialistSection";
import PricingSection from "@/components/PricingSection";
import BioVaultSection from "@/components/BioVaultSection";
import AudienceSection from "@/components/AudienceSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="value-props"><ValuePropSection /></div>
      <SpecialistSection />
      <div id="pricing"><PricingSection /></div>
      <div id="bio-vault"><BioVaultSection /></div>
      <AudienceSection />
      <div id="testimonials"><TestimonialSection /></div>
      <FooterSection />
    </div>
  );
};

export default Index;
