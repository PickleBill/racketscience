import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import playbookHero from "@/assets/playbook-hero.jpg";
import playbookDoc from "@/assets/playbook.docx.asset.json";

const pillars = [
  {
    name: "Play",
    line: "Preserve the thing that made you begin.",
    body: "Play is not the reward after the serious work; it is one of the conditions that makes serious work sustainable. The question is not whether you care about winning. Care. The question is whether winning has crowded out the reason you came.",
  },
  {
    name: "Think",
    line: "Learn to see before you try to control.",
    body: "Between points, think deliberately. During the point, let perception lead. After the point, reflect without prosecution. The goal of coaching is not obedience. It is autonomy.",
  },
  {
    name: "Challenge",
    line: "Enter difficulty that can teach you.",
    body: "Too little challenge and attention leaks away. Too much and the player stops receiving information because the task has become threat. Difficulty is not automatically noble. It becomes useful when it teaches.",
  },
  {
    name: "Believe",
    line: "Confidence is evidence remembered under pressure.",
    body: "The strongest belief is sometimes small enough to fit inside one point: I do not know whether I will win, but I know I can play this ball.",
  },
  {
    name: "Connect",
    line: "I am because we are.",
    body: "No one becomes a player alone. A partner changes the geometry. An opponent creates the difficulty. We > Me does not erase the self. It teaches the self to become useful.",
  },
];

const entries = [
  { level: "Beginner", want: "I want to learn the right way.", door: "The Kitchen" },
  { level: "Intermediate", want: "I'm stuck.", door: "The Reset" },
  { level: "Advanced", want: "I want to compete.", door: "The Player Who Thinks" },
  { level: "Tournament", want: "I want an edge.", door: "Attention to Detail, Degnan" },
  { level: "Team", want: "We want to become better together.", door: "Ubuntu" },
];

const fires = [
  { friction: "Fear of difficulty", door: "Misogi — choose the difficult thing" },
  { friction: "Exhausted, tempted to quit", door: "Sisu — stay when it's hard" },
  { friction: "Failed, injured, or changed", door: "Phoenix — rise differently" },
  { friction: "Powerless", door: "Orenda — create change" },
  { friction: "Tentative because of fear", door: "Koa — play courageously" },
  { friction: "Disconnected from your partner", door: "Ubuntu — I am because we are" },
];

const parts = [
  { part: "Prologue", chapters: ["The Beautiful Grind"] },
  { part: "I — Play", chapters: ["Play Is Sacred", "The Kitchen"] },
  { part: "II — Think", chapters: ["Read the Wind", "The Player Who Thinks", "The Reset"] },
  { part: "III — Challenge", chapters: ["Misogi", "The Third Shot", "Sisu"] },
  { part: "IV — Believe", chapters: ["Believe", "The Dink", "Phoenix"] },
  { part: "V — The Zone", chapters: ["The Zone", "Breathe", "The Speed-Up"] },
  { part: "VI — Come Back", chapters: ["Come Back to Play", "Orenda", "Koa"] },
  { part: "VII — Connect", chapters: ["Ubuntu", "The Partner", "We > Me"] },
  { part: "VIII — Becoming", chapters: ["Attention to Detail, Degnan", "Risk Is Opportunity", "The Attack", "Emotions Are Terrible Advisors", "Character"] },
  { part: "IX — The Beautiful Grind", chapters: ["Delayed Is Not Denied", "You Never Arrive", "The Point", "Epilogue — One More"] },
];

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const Playbook = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Playbook — Pickleball, Belief & the Beautiful Grind | Racket Science";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Read Casey Degnan's Playbook: a manifesto on playing better, thinking better and competing better — five pillars, 28 chapters, one beautiful grind.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <img
          src={playbookHero}
          alt="An open book beside a pickleball paddle and ball on a dark court"
          className="absolute inset-0 w-full h-full object-cover"
          width={1600}
          height={912}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative max-w-5xl mx-auto px-6 pb-20 pt-40">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">The Book</p>
          <h1 className="font-serif text-4xl md:text-7xl text-foreground leading-[1.05] mb-6">
            Play<span className="text-gradient-lime">book</span>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground italic mb-6">
            Pickleball, Belief, and the Beautiful Grind
          </p>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            How to play better, think better, compete better — and become more yourself along the way.
            A manifesto you can use: a way of seeing, deciding, practicing, recovering, connecting,
            creating, and beginning again.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="rounded-full px-8 glow-lime">
              <a href={playbookDoc.url} target="_blank" rel="noopener noreferrer">
                Read the Playbook →
              </a>
            </Button>
            <Button variant="outline" onClick={() => navigate("/book")} className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10">
              Work with Casey
            </Button>
          </div>
        </div>
      </header>

      {/* Note before the first serve */}
      <section className="py-24 px-6">
        <Reveal className="max-w-3xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 font-medium">A Note Before the First Serve</p>
          <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-snug mb-8">
            "Pickleball is the laboratory because the feedback is immediate. The ball lands in or out.
            A point ends, and another begins."
          </blockquote>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The rhythm is deliberate: philosophy → story → pickleball → practice → reflection.
            Story appears only when an idea needs a body. The life material is evidence, not destination.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You can read straight through, or enter sideways. One map tells you where you are as a
            player. The other asks what you need as a human being. It is meant to be used, doubled
            back through, written in, argued with, and returned to.
          </p>
        </Reveal>
      </section>

      {/* Five pillars */}
      <section className="py-24 px-6 border-t border-border">
        <Reveal className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">Five Pillars</p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
            Not steps. A <span className="text-gradient-lime">compass.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            The pillars are not five separate personalities. They overlap in every good point.
            When one disappears, the others help you find your way back.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.name}
                className={`glass rounded-2xl p-8 hover:border-primary/40 transition-colors ${i === 4 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-primary/40 font-sans text-sm font-bold">0{i + 1}</span>
                  <h3 className="font-serif text-2xl text-foreground">{p.name}</h3>
                </div>
                <p className="text-primary text-sm italic mb-4">{p.line}</p>
                <p className="text-muted-foreground leading-relaxed text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Compass */}
      <section className="py-24 px-6 border-t border-border">
        <Reveal className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">The Playbook Compass</p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-12">
            One book. <span className="text-gradient-lime">Two maps.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Choose your entry</h3>
              <div className="space-y-3">
                {entries.map((e) => (
                  <div key={e.level} className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-foreground font-semibold text-sm">{e.level}</span>
                      <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">{e.door}</span>
                    </div>
                    <p className="text-muted-foreground text-sm italic">"{e.want}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Choose your fire</h3>
              <div className="space-y-3">
                {fires.map((f) => (
                  <div key={f.friction} className="glass rounded-xl p-4">
                    <p className="text-foreground text-sm mb-1">{f.friction}</p>
                    <p className="text-primary text-sm">→ {f.door}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed mt-10 max-w-3xl">
            These concepts come from living cultural and philosophical traditions. The book treats
            them as doors, not costumes — invitations to encounter a useful idea while preserving the
            difference between the original tradition and its athletic application.
          </p>
        </Reveal>
      </section>

      {/* Prologue excerpt */}
      <section className="py-24 px-6 border-t border-border">
        <Reveal className="max-w-3xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 font-medium">Excerpt — The Beautiful Grind</p>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>A player stands at the baseline holding the ball like evidence against herself.</p>
            <p className="font-serif text-xl text-foreground italic">"I destroyed my drop shot," she says.</p>
            <p>
              Athletes like nouns when the game becomes uncertain. We want the broken thing to have a
              name because names suggest a repair. So I watch. The swing is mostly there. The problem
              is happening around it. Her feet arrive late, forcing the arm to solve a problem created
              somewhere else. The shot is not only the shot.
            </p>
            <p>
              She misses long. Nets one. Her shoulders rise. The court gets smaller. She is no longer
              playing pickleball. She is defending a verdict about herself.
            </p>
            <p className="font-serif text-xl text-foreground italic">"Are you having any fun?" I ask.</p>
            <p>
              Now she laughs, which is not the same thing as solving the drop, but it changes the room
              inside the point. We make the target bigger. Move first. Make space. Let the paddle be
              quieter. The next ball lands in the kitchen. Then another.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Contents */}
      <section className="py-24 px-6 border-t border-border">
        <Reveal className="max-w-5xl mx-auto">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">Contents</p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-12">
            Nine parts. <span className="text-gradient-lime">Twenty-eight chapters.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parts.map((p) => (
              <div key={p.part} className="border-l-2 border-primary/30 pl-4">
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-primary mb-3">{p.part}</h3>
                <ul className="space-y-1.5">
                  {p.chapters.map((c) => (
                    <li key={c} className="text-muted-foreground text-sm">{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-10 italic">
            Plus "100 Ways Back to Play" — scattered throughout the book.
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
            Read it. Then <span className="text-gradient-lime">play it.</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            The book is the theory. A session on court is where it lands.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="rounded-full px-8 glow-lime">
              <a href={playbookDoc.url} target="_blank" rel="noopener noreferrer">Read the Playbook</a>
            </Button>
            <Button variant="outline" onClick={() => navigate("/consultation")} className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10">
              Free 5-Minute Consult
            </Button>
          </div>
        </Reveal>
      </section>

      <FooterSection />
    </div>
  );
};

export default Playbook;
