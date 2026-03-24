import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePropSection from "@/components/ValuePropSection";
import SpecialistSection from "@/components/SpecialistSection";
import StatsSection from "@/components/StatsSection";
import PricingSection from "@/components/PricingSection";
import BioVaultSection from "@/components/BioVaultSection";
import AudienceSection from "@/components/AudienceSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterSection from "@/components/FooterSection";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const SectionDivider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <div id="value-props"><ValuePropSection /></div>
      <SectionDivider />
      <SpecialistSection />
      <StatsSection />
      <SectionDivider />
      <div id="pricing"><PricingSection /></div>
      <SectionDivider />
      <div id="bio-vault"><BioVaultSection /></div>
      <SectionDivider />
      <AudienceSection />
      <SectionDivider />
      <div id="testimonials"><TestimonialSection /></div>
      <FooterSection />
    </div>
  );
};

export default Index;
