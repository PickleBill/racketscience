import { Button } from "@/components/ui/button";

const BiomechanicalOverlay = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    viewBox="0 0 1200 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trajectory arc */}
    <path
      d="M200 600 Q 500 100 900 400"
      stroke="hsl(72 100% 50%)"
      strokeWidth="1.5"
      strokeDasharray="8 6"
      className="animate-draw-line"
      style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
    />
    {/* Angle indicator */}
    <path
      d="M600 400 L680 320"
      stroke="hsl(72 100% 50%)"
      strokeWidth="1"
      opacity="0.6"
    />
    <path
      d="M600 400 L700 400"
      stroke="hsl(72 100% 50%)"
      strokeWidth="1"
      opacity="0.6"
    />
    <path
      d="M640 400 A 40 40 0 0 0 632 368"
      stroke="hsl(72 100% 50%)"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <text x="655" y="385" fill="hsl(72 100% 50%)" fontSize="11" fontFamily="Inter" opacity="0.5">42°</text>

    {/* Impact point */}
    <circle cx="900" cy="400" r="4" fill="hsl(72 100% 50%)" className="animate-pulse-glow" />
    <circle cx="900" cy="400" r="16" stroke="hsl(72 100% 50%)" strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="900" cy="400" r="32" stroke="hsl(72 100% 50%)" strokeWidth="0.3" fill="none" opacity="0.15" />

    {/* Velocity vector */}
    <line x1="870" y1="420" x2="920" y2="380" stroke="hsl(72 100% 50%)" strokeWidth="1" opacity="0.4" markerEnd="url(#arrow)" />
    <text x="925" y="375" fill="hsl(72 100% 50%)" fontSize="10" fontFamily="Inter" opacity="0.4">88mph</text>

    {/* Data grid lines */}
    {[200, 400, 600].map((y) => (
      <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="hsl(0 0% 100%)" strokeWidth="0.2" opacity="0.05" />
    ))}
    {[300, 600, 900].map((x) => (
      <line key={x} x1={x} y1="0" x2={x} y2="800" stroke="hsl(0 0% 100%)" strokeWidth="0.2" opacity="0.05" />
    ))}
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(72_100%_50%/0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(72_100%_50%/0.02),transparent_50%)]" />

      <BiomechanicalOverlay />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="text-primary font-sans text-sm tracking-[0.3em] uppercase mb-6 font-medium">
          MasterClass Racketry
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-foreground">
          Mastery in Motion:{" "}
          <span className="text-gradient-lime">Science-Backed</span> Coaching
          for the Executive Athlete
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Unlocking elite performance through the highest level of PE certification 
          and biomechanical precision. Boutique coaching for those who demand the best.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-base font-semibold tracking-wide glow-lime hover:scale-105 transition-transform"
          >
            Apply for Elite Coaching
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-6 text-base font-medium border-primary/30 text-primary hover:bg-primary/10 transition-all"
          >
            View the Biomechanic Vault
          </Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
