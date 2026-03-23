import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Zap, Shield, BarChart3, Brain, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const principles = [
  {
    icon: Activity,
    title: "Kinetic Chain Optimization",
    description: "Every stroke is a chain reaction—from ground reaction forces through hip rotation, trunk coiling, shoulder acceleration, and finally racket head speed. We optimize each link.",
    metric: "Avg. 18% power increase in 8 weeks",
  },
  {
    icon: Brain,
    title: "Motor Learning Theory",
    description: "We apply evidence-based motor learning protocols: blocked vs. random practice, external focus of attention, and constraint-led approaches that accelerate skill acquisition.",
    metric: "3x faster skill retention vs. traditional coaching",
  },
  {
    icon: Shield,
    title: "Injury Prevention Protocols",
    description: "Biomechanical analysis identifies compensatory patterns that lead to overuse injuries. We correct loading patterns at the source—before pain becomes a problem.",
    metric: "92% reduction in overuse injuries",
  },
  {
    icon: BarChart3,
    title: "Quantified Performance Tracking",
    description: "Every session generates measurable data: wrist angles, impact force, spin rates, footwork efficiency. Your improvement isn't subjective—it's quantified and visualized.",
    metric: "200+ data points per session",
  },
];

const SectionCard = ({ item, index }: { item: typeof principles[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="glass rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 group hover:glow-lime">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <item.icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-serif text-xl text-foreground mb-4">{item.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm mb-6">{item.description}</p>
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <Zap className="w-4 h-4" />
          {item.metric}
        </div>
      </div>
    </div>
  );
};

const Methodology = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <img
          src="/__l5e/assets-v1/0cb45f03-081b-4c88-ab23-98f8f2a72ec5/methodology-hero.jpg"
          alt="Biomechanical analysis visualization"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative text-center px-6">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">The Science</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              The Science Behind <span className="text-gradient-lime">the Swing</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our methodology is rooted in exercise science, biomechanics, and motor learning theory—not guesswork. Every technique we teach has a peer-reviewed foundation.
            </p>
        </div>
      </div>

      <div className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Principles grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {principles.map((item, i) => (
              <SectionCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Philosophy section */}
          <div className="glass rounded-3xl p-10 md:p-16 mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Philosophy</p>
                <h2 className="font-serif text-3xl text-foreground mb-6">
                  This Isn't About Hitting Balls Harder
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Most coaching focuses on what your racket does. We focus on what your body does. The racket is just the end effector of a complex kinematic chain that starts at your feet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With a Master-level certification in Physical Education, our approach integrates anatomy, physics, and psychology into every session. We don't just make you play better—we make you understand why you play better.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Ground Reaction Forces", value: "87%" },
                  { label: "Hip-Shoulder Separation", value: "94%" },
                  { label: "Racket Head Speed", value: "76%" },
                  { label: "Follow-Through Efficiency", value: "91%" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{bar.label}</span>
                      <span className="text-primary font-semibold">{bar.value}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000"
                        style={{ width: bar.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-serif text-3xl text-foreground mb-4">Experience the Difference</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              See science-backed coaching in action. Start with a free 5-minute consultation or book your full assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/consultation")} className="rounded-full px-10 py-6 glow-lime font-semibold">
                Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button onClick={() => navigate("/book")} variant="outline" className="rounded-full px-10 py-6 border-primary/30 text-primary">
                Book Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
