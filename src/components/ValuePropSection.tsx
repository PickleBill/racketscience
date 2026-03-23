import { Scan, CalendarCheck, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Scan,
    title: "Master-Level Biomechanic Vault",
    description: "AI-enhanced digital form analysis. Frame-by-frame breakdowns of your mechanics compared against pro benchmarks.",
  },
  {
    icon: CalendarCheck,
    title: "Prestige Booking Concierge",
    description: "High-touch scheduling built for executive calendars. 1-hour reschedule grace period and priority court access.",
  },
  {
    icon: TrendingUp,
    title: "Progressive Mastery Roadmap",
    description: "Data-driven progress tracking with milestone-based goals. Measurable improvement you can see and feel.",
  },
];

const ValuePropSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-primary text-sm tracking-[0.25em] uppercase text-center mb-4 font-medium">The Framework</p>
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-20 text-foreground">
          Three Pillars of <span className="text-gradient-lime">Elite Performance</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => navigate("/methodology")}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group cursor-pointer hover:glow-lime"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              <p className="text-primary text-xs mt-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropSection;
