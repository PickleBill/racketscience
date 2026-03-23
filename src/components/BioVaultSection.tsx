import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const BioVaultSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">The Bio-Vault</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 text-foreground leading-tight">
              Your Swing,{" "}
              <span className="text-gradient-lime">Decoded.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our proprietary Bio-Vault platform gives you frame-by-frame analysis of your technique, 
              side-by-side with professional benchmarks. Every angle, every force vector, every 
              millisecond—measured and optimized.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Access your vault 24/7 from any device. Track your progression over weeks and months 
              with quantified data that proves your improvement isn't just felt—it's measured.
            </p>
            <Button
              onClick={() => navigate("/process")}
              variant="outline"
              className="rounded-full px-8 py-5 border-primary/30 text-primary hover:bg-primary/10"
            >
              See the Full Process →
            </Button>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="animate-float">
              <div className="relative w-[280px] h-[560px] rounded-[40px] border-2 border-white/10 bg-card overflow-hidden shadow-2xl glow-lime">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-background rounded-b-2xl z-10" />
                <div className="pt-10 px-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-primary font-semibold tracking-wider uppercase">Bio-Vault</span>
                    <span className="text-xs text-muted-foreground">Session #14</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="aspect-[3/4] rounded-lg bg-secondary flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                      <span className="text-[10px] text-muted-foreground absolute top-2 left-2 font-medium">YOUR SWING</span>
                      <svg viewBox="0 0 60 80" className="w-12 h-16 opacity-30">
                        <circle cx="30" cy="12" r="6" stroke="hsl(72 100% 50%)" strokeWidth="1" fill="none" />
                        <line x1="30" y1="18" x2="30" y2="45" stroke="hsl(72 100% 50%)" strokeWidth="1" />
                        <line x1="30" y1="28" x2="15" y2="38" stroke="hsl(72 100% 50%)" strokeWidth="1" />
                        <line x1="30" y1="28" x2="50" y2="22" stroke="hsl(72 100% 50%)" strokeWidth="1" />
                        <line x1="30" y1="45" x2="18" y2="65" stroke="hsl(72 100% 50%)" strokeWidth="1" />
                        <line x1="30" y1="45" x2="42" y2="65" stroke="hsl(72 100% 50%)" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="aspect-[3/4] rounded-lg bg-secondary flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                      <span className="text-[10px] text-muted-foreground absolute top-2 left-2 font-medium">PRO MODEL</span>
                      <svg viewBox="0 0 60 80" className="w-12 h-16 opacity-30">
                        <circle cx="30" cy="12" r="6" stroke="white" strokeWidth="1" fill="none" />
                        <line x1="30" y1="18" x2="30" y2="45" stroke="white" strokeWidth="1" />
                        <line x1="30" y1="28" x2="12" y2="35" stroke="white" strokeWidth="1" />
                        <line x1="30" y1="28" x2="52" y2="20" stroke="white" strokeWidth="1" />
                        <line x1="30" y1="45" x2="20" y2="65" stroke="white" strokeWidth="1" />
                        <line x1="30" y1="45" x2="40" y2="65" stroke="white" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Wrist Angle", value: "42°", badge: "Optimized" },
                      { label: "Impact Force", value: "88mph", badge: "+12% ↑" },
                      { label: "Follow-Through", value: "94%", badge: "Excellent" },
                    ].map((item) => (
                      <div key={item.label} className="glass rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</div>
                          <div className="text-lg font-bold text-foreground font-sans">{item.value}</div>
                        </div>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">
                          {item.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioVaultSection;
