import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import playbookHero from "@/assets/playbook-hero.jpg";

const pillars = ["Play", "Think", "Challenge", "Believe", "Connect"];

const PlaybookSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-32 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto min-h-[320px]">
              <img
                src={playbookHero}
                alt="An open book beside a pickleball paddle and ball on a dark court"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width={1600}
                height={912}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-primary text-xs tracking-[0.25em] uppercase mb-3 font-medium">The Book</p>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                <span className="text-gradient-lime">Playbook</span>
              </h3>
              <p className="font-serif italic text-muted-foreground mb-4">
                Pickleball, Belief, and the Beautiful Grind
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Casey's manifesto on playing better, thinking better and competing better — and
                becoming more yourself along the way. Five pillars, twenty-eight chapters, and one
                stubborn question: are you having any fun?
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {pillars.map((p) => (
                  <span key={p} className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => navigate("/playbook")}
                variant="outline"
                className="rounded-full px-8 self-start border-primary/30 text-primary hover:bg-primary/10"
              >
                Read the Playbook →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaybookSection;
