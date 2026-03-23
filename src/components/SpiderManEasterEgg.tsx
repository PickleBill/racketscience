import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SpiderManEasterEgg = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div ref={ref} className={`mt-16 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 w-32 h-32 border border-primary rounded-full" />
          <div className="absolute bottom-4 right-4 w-24 h-24 border border-primary rounded-full" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Animated SVG Illustration */}
          <div className="w-full md:w-1/2 flex justify-center">
            <svg viewBox="0 0 400 300" className="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left player */}
              <g className={`transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
                 style={{ transform: isVisible ? "translateX(0)" : "translateX(-48px)", opacity: isVisible ? 1 : 0, transition: "all 1s ease 0.3s" }}>
                {/* Body */}
                <circle cx="100" cy="100" r="18" fill="hsl(0 80% 50% / 0.3)" stroke="hsl(0 80% 50%)" strokeWidth="1.5" />
                {/* Web pattern on head */}
                <path d="M88 95 L100 100 L112 95" stroke="hsl(0 80% 50% / 0.5)" strokeWidth="0.5" fill="none" />
                <path d="M90 105 L100 100 L110 105" stroke="hsl(0 80% 50% / 0.5)" strokeWidth="0.5" fill="none" />
                {/* Eyes */}
                <ellipse cx="94" cy="98" rx="5" ry="4" fill="hsl(0 0% 100% / 0.9)" />
                <ellipse cx="106" cy="98" rx="5" ry="4" fill="hsl(0 0% 100% / 0.9)" />
                {/* Body line */}
                <line x1="100" y1="118" x2="100" y2="180" stroke="hsl(0 80% 50%)" strokeWidth="1.5" />
                {/* Pointing arm */}
                <line x1="100" y1="140" x2="160" y2="125" stroke="hsl(0 80% 50%)" strokeWidth="1.5" />
                {/* Back arm with paddle */}
                <line x1="100" y1="140" x2="60" y2="130" stroke="hsl(0 80% 50%)" strokeWidth="1.5" />
                <ellipse cx="52" cy="126" rx="12" ry="8" fill="none" stroke="hsl(72 100% 50%)" strokeWidth="1.5" transform="rotate(-15 52 126)" />
                {/* Legs */}
                <line x1="100" y1="180" x2="80" y2="240" stroke="hsl(0 80% 50%)" strokeWidth="1.5" />
                <line x1="100" y1="180" x2="120" y2="240" stroke="hsl(0 80% 50%)" strokeWidth="1.5" />
              </g>

              {/* Right player */}
              <g style={{ transform: isVisible ? "translateX(0)" : "translateX(48px)", opacity: isVisible ? 1 : 0, transition: "all 1s ease 0.5s" }}>
                {/* Body */}
                <circle cx="300" cy="100" r="18" fill="hsl(220 80% 50% / 0.3)" stroke="hsl(220 80% 50%)" strokeWidth="1.5" />
                {/* Web pattern on head */}
                <path d="M288 95 L300 100 L312 95" stroke="hsl(220 80% 50% / 0.5)" strokeWidth="0.5" fill="none" />
                <path d="M290 105 L300 100 L310 105" stroke="hsl(220 80% 50% / 0.5)" strokeWidth="0.5" fill="none" />
                {/* Eyes */}
                <ellipse cx="294" cy="98" rx="5" ry="4" fill="hsl(0 0% 100% / 0.9)" />
                <ellipse cx="306" cy="98" rx="5" ry="4" fill="hsl(0 0% 100% / 0.9)" />
                {/* Body line */}
                <line x1="300" y1="118" x2="300" y2="180" stroke="hsl(220 80% 50%)" strokeWidth="1.5" />
                {/* Pointing arm */}
                <line x1="300" y1="140" x2="240" y2="125" stroke="hsl(220 80% 50%)" strokeWidth="1.5" />
                {/* Back arm with paddle */}
                <line x1="300" y1="140" x2="340" y2="130" stroke="hsl(220 80% 50%)" strokeWidth="1.5" />
                <ellipse cx="348" cy="126" rx="12" ry="8" fill="none" stroke="hsl(72 100% 50%)" strokeWidth="1.5" transform="rotate(15 348 126)" />
                {/* Legs */}
                <line x1="300" y1="180" x2="280" y2="240" stroke="hsl(220 80% 50%)" strokeWidth="1.5" />
                <line x1="300" y1="180" x2="320" y2="240" stroke="hsl(220 80% 50%)" strokeWidth="1.5" />
              </g>

              {/* Pickleballs flying between them (instead of webs) */}
              <g style={{ opacity: isVisible ? 1 : 0, transition: "opacity 1s ease 0.8s" }}>
                {/* Ball trajectories - dotted lines */}
                <path d="M160 125 Q 200 105 240 125" stroke="hsl(72 100% 50% / 0.4)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                <path d="M155 135 Q 200 150 245 135" stroke="hsl(72 100% 50% / 0.3)" strokeWidth="1" strokeDasharray="3 5" fill="none" />

                {/* Pickleballs */}
                <circle cx="185" cy="112" r="6" fill="hsl(72 100% 50%)" opacity="0.9">
                  <animate attributeName="cx" values="160;240;160" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="125;110;125" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="215" cy="145" r="5" fill="hsl(72 100% 50%)" opacity="0.6">
                  <animate attributeName="cx" values="240;160;240" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="135;148;135" dur="4s" repeatCount="indefinite" />
                </circle>
                {/* Pickleball holes */}
                <circle cx="185" cy="112" r="1.5" fill="hsl(72 100% 30%)" opacity="0.5">
                  <animate attributeName="cx" values="160;240;160" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="123;108;123" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* "VS" text */}
              <text x="200" y="200" fill="hsl(72 100% 50% / 0.15)" fontSize="48" fontFamily="Inter" fontWeight="900" textAnchor="middle">VS</text>
            </svg>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
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
