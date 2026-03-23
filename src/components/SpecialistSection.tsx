import { Award, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SpiderManEasterEgg from "@/components/SpiderManEasterEgg";

const CertificationSeal = () => (
  <svg viewBox="0 0 240 240" className="w-56 h-56 md:w-72 md:h-72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="120" r="110" stroke="hsl(72 100% 50%)" strokeWidth="1" opacity="0.3" />
    <circle cx="120" cy="120" r="100" stroke="hsl(72 100% 50%)" strokeWidth="2" opacity="0.6" />
    <circle cx="120" cy="120" r="88" stroke="hsl(72 100% 50%)" strokeWidth="0.5" opacity="0.2" />
    {Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 10 * Math.PI) / 180;
      const x1 = 120 + 95 * Math.cos(angle);
      const y1 = 120 + 95 * Math.sin(angle);
      const x2 = 120 + 100 * Math.cos(angle);
      const y2 = 120 + 100 * Math.sin(angle);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(72 100% 50%)" strokeWidth="1" opacity="0.3" />;
    })}
    <circle cx="120" cy="120" r="45" fill="hsl(72 100% 50% / 0.08)" stroke="hsl(72 100% 50%)" strokeWidth="1" opacity="0.4" />
    <path d="M120 90 L145 105 L145 130 L120 150 L95 130 L95 105 Z" stroke="hsl(72 100% 50%)" strokeWidth="1.5" fill="hsl(72 100% 50% / 0.1)" />
    <path d="M120 105 L110 125 L120 120 L130 125 Z" fill="hsl(72 100% 50%)" opacity="0.6" />
    <text fill="hsl(72 100% 50%)" fontSize="9" fontFamily="Inter" letterSpacing="3" opacity="0.7">
      <textPath href="#seal-text-path">MASTER CERTIFIED • PHYSICAL EDUCATION •</textPath>
    </text>
    <defs>
      <path id="seal-text-path" d="M 120 28 A 92 92 0 1 1 119.99 28" />
    </defs>
  </svg>
);

const stats = [
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Award, value: "Master", label: "Certification Level" },
  { icon: Users, value: "500+", label: "Athletes Coached" },
  { icon: Shield, value: "3", label: "Sport Disciplines" },
];

const SpecialistSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">The Specialist</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 text-foreground leading-tight">
              Beyond Coaching.{" "}
              <span className="text-gradient-lime">Physical Education Science.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This isn't about hitting balls harder. It's about biomechanical optimization—understanding 
              the kinetic chain from ground reaction forces through racket head speed.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Each athlete receives a comprehensive movement assessment before any coaching begins. 
              We identify compensatory patterns, optimize joint loading, and build sustainable 
              performance that protects your body while elevating your game.
            </p>

            <Button
              onClick={() => navigate("/methodology")}
              variant="outline"
              className="rounded-full px-8 py-5 border-primary/30 text-primary hover:bg-primary/10 mb-10"
            >
              Explore the Methodology →
            </Button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground font-sans">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
              <CertificationSeal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialistSection;
