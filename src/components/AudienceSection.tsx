import { MapPin, Clock, Briefcase } from "lucide-react";

const AudienceSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">
          Who We Serve
        </p>
        <h2 className="font-serif text-3xl md:text-5xl mb-8 text-foreground">
          Designed for the{" "}
          <span className="text-gradient-lime">Local Professional</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          We dominate the local racket scene, offering on-site coaching that fits seamlessly into 
          a busy executive schedule. No commute to distant academies. No wasted time. Premium 
          coaching, delivered where you play.
        </p>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: Briefcase, title: "Executive-Friendly", desc: "Sessions designed around your calendar, not ours." },
            { icon: MapPin, title: "On-Site Coaching", desc: "We come to your club. Your court. Your terms." },
            { icon: Clock, title: "Flexible Scheduling", desc: "Early morning to evening slots. 1-hour reschedule grace." },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
