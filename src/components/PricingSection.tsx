import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const tiers = [
  {
    name: "Legacy Assessment",
    price: "$200",
    period: "one-time",
    description: "A 90-minute master evaluation to baseline your biomechanics.",
    features: [
      "Full biomechanical screening",
      "Video analysis report",
      "Personalized correction plan",
      "Movement pattern assessment",
      "Injury risk evaluation",
    ],
    highlighted: false,
  },
  {
    name: "Growth Tier",
    price: "$150",
    period: "/mo",
    description: "Weekly group clinics with data-driven progress tracking.",
    features: [
      "Weekly group clinics",
      "Mastery Roadmap dashboard",
      "Community events access",
      "Monthly progress reports",
      "Priority booking windows",
    ],
    highlighted: false,
  },
  {
    name: "Elite Tier",
    price: "$400",
    period: "/mo",
    description: "The full concierge coaching experience for serious athletes.",
    features: [
      "4 private sessions monthly",
      "24/7 Bio-Vault access",
      "Prestige concierge booking",
      "1-hour reschedule grace",
      "Direct coach messaging",
      "Quarterly performance review",
    ],
    highlighted: true,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-32 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-primary text-sm tracking-[0.25em] uppercase text-center mb-4 font-medium">
          Boutique Pricing
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-6 text-foreground">
          Invest in <span className="text-gradient-lime">Your Mastery</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-20">
          Every tier is designed to deliver measurable, science-backed improvement. No fluff. No filler.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-500 ${
                tier.highlighted
                  ? "glass border-primary/40 glow-lime-strong relative hover:scale-[1.02]"
                  : "glass hover:bg-white/10 hover:glow-lime"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full tracking-wider uppercase animate-pulse-glow">
                  Most Popular
                </div>
              )}

              <h3 className="font-serif text-xl mb-2 text-foreground">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-foreground font-sans">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-8">{tier.description}</p>

              <ul className="space-y-3 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate(`/checkout?type=${tier.name === "Legacy Assessment" ? "legacy" : tier.name === "Growth Tier" ? "growth" : "elite"}&amount=${tier.price.replace("$", "").replace("/mo", "")}`)}
                className={`w-full rounded-full py-6 font-semibold tracking-wide ${
                  tier.highlighted
                    ? "glow-lime hover:scale-105 transition-transform"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                variant={tier.highlighted ? "default" : "secondary"}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
