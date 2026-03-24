import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import spiderCasey from "@/assets/spider-casey.jpg";

const SpiderManEasterEgg = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div ref={ref} className={`mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="glass rounded-2xl overflow-hidden relative">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 md:h-auto min-h-[300px]">
            <img
              src={spiderCasey}
              alt="Two pickleball players in Spider-Man costumes pointing at each other across the net"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={576}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
          </div>

          {/* Text */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-primary text-xs tracking-[0.25em] uppercase mb-3 font-medium">Origin Story</p>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              They Call Him <span className="text-gradient-lime">"Spider-Man"</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Fun fact: Casey earned the nickname "Spider-Man" when he first started — for his
              uncanny court coverage and reflexes that seemed to defy physics. The way he'd
              appear at the net out of nowhere, stretching for impossible volleys, making shots
              that shouldn't exist.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm italic">
              Some things never change. Except now, the webs are pickleballs — and the
              pointing meme? That's just every opponent trying to figure out how he got there first. 🕷️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiderManEasterEgg;
