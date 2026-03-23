import { Star, Quote } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-primary text-sm tracking-[0.25em] uppercase text-center mb-4 font-medium">
          Member Stories
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-20 text-foreground">
          Results That <span className="text-gradient-lime">Speak</span>
        </h2>

        <div className="glass rounded-3xl p-10 md:p-16 relative">
          <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />

          <div className="relative z-10">
            <div className="flex gap-1 mb-8 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="font-serif text-xl md:text-2xl text-center text-foreground leading-relaxed mb-10 italic">
              "Finally, a coach who speaks the language of data and results. The Bio-Vault changed 
              my game in three weeks. I went from guessing what I was doing wrong to seeing 
              exactly where my mechanics broke down—frame by frame."
            </blockquote>

            <div className="text-center">
              <div className="text-foreground font-semibold font-sans">David Sterling</div>
              <div className="text-muted-foreground text-sm">Executive VP — 4.5 NTRP Tennis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
