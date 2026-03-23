import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Video, Target, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: ClipboardCheck,
    phase: "Phase 1",
    title: "Initial Assessment",
    description: "A comprehensive 90-minute evaluation where we map your current biomechanics, identify compensatory patterns, and establish your performance baseline.",
    experience: "You'll perform your natural strokes while we capture high-speed video from multiple angles. We assess grip pressure, wrist angles, shoulder rotation, hip engagement, and footwork patterns.",
    duration: "90 minutes",
  },
  {
    icon: Video,
    phase: "Phase 2",
    title: "Bio-Vault Analysis",
    description: "Your session footage is processed through our biomechanical analysis platform, generating frame-by-frame breakdowns compared against professional benchmarks.",
    experience: "Within 48 hours, your personal Bio-Vault populates with annotated videos, force diagrams, and specific metrics like wrist angle optimization, impact force vectors, and follow-through efficiency scores.",
    duration: "48-hour turnaround",
  },
  {
    icon: Target,
    phase: "Phase 3",
    title: "Custom Program Design",
    description: "Based on your analysis, we design a progressive training program targeting your specific mechanical inefficiencies and performance goals.",
    experience: "You receive a structured roadmap with milestone-based goals. Each session builds on the last, with real-time feedback loops that adjust intensity and focus areas as you progress.",
    duration: "Ongoing",
  },
  {
    icon: TrendingUp,
    phase: "Phase 4",
    title: "Progressive Mastery",
    description: "Regular re-assessments track your improvement with quantified data. Your Bio-Vault becomes a living record of your athletic evolution.",
    experience: "Monthly progress reviews overlay your current mechanics against your baseline. You see exactly how far you've come—and what's next on your mastery roadmap.",
    duration: "Monthly reviews",
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center glow-lime">
            <step.icon className="w-7 h-7 text-primary" />
          </div>
          {index < steps.length - 1 && (
            <div className="w-px h-full min-h-[80px] bg-gradient-to-b from-primary/30 to-transparent mt-4" />
          )}
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8 mb-8 hover:bg-white/10 transition-all duration-500 group">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary text-xs tracking-[0.25em] uppercase font-semibold">{step.phase}</span>
            <span className="text-muted-foreground text-xs">• {step.duration}</span>
          </div>
          <h3 className="font-serif text-2xl text-foreground mb-4">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              <span className="text-primary font-medium not-italic">What you experience: </span>
              {step.experience}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <img
          src="/__l5e/assets-v1/00d8d730-b9ef-46bc-9aa0-500bbeb211c4/process-hero.jpg"
          alt="Dark court with dramatic lighting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative text-center px-6">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">The Journey</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
              From Assessment to <span className="text-gradient-lime">Mastery</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every elite athlete follows a structured path. Here's exactly how we take you from where you are to where you want to be.
            </p>
        </div>
      </div>

      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-2 mt-16">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Ready to begin your journey?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/book")} className="rounded-full px-10 py-6 glow-lime font-semibold">
                Book Your Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button onClick={() => navigate("/consultation")} variant="outline" className="rounded-full px-10 py-6 border-primary/30 text-primary">
                Free 5-Min Consult
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
