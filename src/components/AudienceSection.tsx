import { MapPin, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AudienceSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6">
      <div ref={ref} className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Who We Serve</p>
        <h2 className="font-serif text-3xl md:text-5xl mb-8 text-foreground">
          Designed for the{" "}
          <span className="text-gradient-lime">Local Professional</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          We dominate the local racket scene, offering on-site coaching that fits seamlessly into 
          a busy executive schedule. No commute to distant academies. No wasted time. Premium 
          coaching, delivered where you play.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Briefcase, title: "Executive-Friendly", desc: "Sessions designed around your calendar, not ours." },
            { icon: MapPin, title: "On-Site Coaching", desc: "We come to your club. Your court. Your terms." },
            { icon: Clock, title: "Flexible Scheduling", desc: "Early morning to evening slots. 1-hour reschedule grace." },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center group cursor-pointer" onClick={() => navigate("/consultation")}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:glow-lime transition-all">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={() => navigate("/consultation")}
          variant="outline"
          className="rounded-full px-8 py-5 border-primary/30 text-primary hover:bg-primary/10"
        >
          Schedule a Free Consultation
        </Button>
      </div>
    </section>
  );
};

export default AudienceSection;
