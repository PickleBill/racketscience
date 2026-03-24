import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FooterSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState("");
  const [ranking, setRanking] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("assessments").insert({
      name,
      email,
      sport: sport || null,
      ranking: ranking || null,
    });

    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Assessment Reserved",
        description: "We'll be in touch within 24 hours to confirm your session.",
      });
      setName("");
      setEmail("");
      setSport("");
      setRanking("");
    }
    setLoading(false);
  };

  return (
    <footer className="py-32 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Start Here</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-foreground">Reserve Your Assessment</h2>
            <p className="text-muted-foreground mb-10">
              Begin with a 90-minute Legacy Assessment. We'll map your biomechanics and build your personalized mastery roadmap.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary border-border rounded-xl h-12 placeholder:text-muted-foreground" />
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary border-border rounded-xl h-12 placeholder:text-muted-foreground" />
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12 text-muted-foreground">
                  <SelectValue placeholder="Primary Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="padel">Padel</SelectItem>
                  <SelectItem value="pickleball">Pickleball</SelectItem>
                  <SelectItem value="squash">Squash</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Current Ranking (e.g., 4.0 NTRP)" value={ranking} onChange={(e) => setRanking(e.target.value)} className="bg-secondary border-border rounded-xl h-12 placeholder:text-muted-foreground" />
              <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime hover:scale-[1.02] transition-transform">
                {loading ? "Submitting..." : "Reserve My Assessment — $200"}
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6">Racket Science</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Boutique, science-backed coaching for executive athletes who demand precision, data, and results. Master-certified in Physical Education and Racket Sports.
              </p>
              <div className="glass rounded-2xl p-6 inline-flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-foreground font-semibold text-sm">Local Loyalty</div>
                  <div className="text-muted-foreground text-xs">Proudly serving our local racket community</div>
                </div>
              </div>
            </div>

            <div className="mt-8 glass rounded-2xl p-4 inline-flex items-center gap-3">
              <span className="text-primary text-lg">🎁</span>
              <div>
                <a href="/claim" className="text-foreground font-semibold text-sm hover:text-primary transition-colors">Share a Free Lesson</a>
                <p className="text-muted-foreground text-xs">Send a friend their first session on us</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-muted-foreground text-xs">
                  © {new Date().getFullYear()} Racket Science. All rights reserved.
                </p>
                <div className="flex gap-6 text-xs text-muted-foreground">
                  <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
                  <span className="hover:text-primary transition-colors cursor-pointer">Terms</span>
                  <span className="hover:text-primary transition-colors cursor-pointer">Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
