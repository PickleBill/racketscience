import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote: "Finally, a coach who speaks the language of data and results. The Bio-Vault changed my game in three weeks. I went from guessing what I was doing wrong to seeing exactly where my mechanics broke down—frame by frame.",
    name: "David Sterling",
    title: "Executive VP — 4.5 NTRP Tennis",
  },
  {
    quote: "I've worked with coaches across three countries. This is the first time someone showed me the physics behind my serve instead of just telling me to 'follow through more.' Night and day difference.",
    name: "Sarah Chen",
    title: "Managing Director — Competitive Padel",
  },
];

const TestimonialSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-primary text-sm tracking-[0.25em] uppercase text-center mb-4 font-medium">Member Stories</p>
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-20 text-foreground">
          Results That <span className="text-gradient-lime">Speak</span>
        </h2>

        <div className="space-y-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-3xl p-10 md:p-16 relative hover:glow-lime transition-all duration-500">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-8 justify-center">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl text-center text-foreground leading-relaxed mb-10 italic">
                  "{t.quote}"
                </blockquote>
                <div className="text-center">
                  <div className="text-foreground font-semibold font-sans">{t.name}</div>
                  <div className="text-muted-foreground text-sm">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/consultation")}
            variant="outline"
            className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10"
          >
            Start Your Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
