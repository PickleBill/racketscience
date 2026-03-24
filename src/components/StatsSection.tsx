import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Athletes Coached" },
  { value: 4, suffix: "", label: "Certifications" },
  { value: 3, suffix: "", label: "Sport Disciplines" },
];

const AnimatedCounter = ({ target, suffix, visible }: { target: number; suffix: string; visible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / (duration / 30)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <span className="text-4xl md:text-5xl font-bold text-foreground font-sans">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section className="py-20 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="glass rounded-3xl p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} visible={isVisible} />
                <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
