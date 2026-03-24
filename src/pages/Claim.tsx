import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Gift, CheckCircle, Copy, Share2 } from "lucide-react";

const Claim = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sport, setSport] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("consultations").insert({
      name,
      email,
      sport: sport || null,
      message: "Source: referral_claim | Phone: " + (phone || "N/A"),
      status: "pending",
    });

    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 glow-lime">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-4">You're In!</h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Casey will reach out within 24 hours to schedule your free lesson. Get ready to level up.
            </p>
            <Button onClick={() => window.location.href = "/"} variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 glow-lime">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Exclusive Offer</p>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Claim Your <span className="text-gradient-lime">Free Lesson</span> with Casey
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Experience what science-backed coaching feels like. One session. No strings. Just results.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
            <Input
              placeholder="Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-secondary border-border rounded-xl h-12"
            />
            <Input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary border-border rounded-xl h-12"
            />
            <Input
              type="tel"
              placeholder="Phone (Optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-secondary border-border rounded-xl h-12"
            />
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
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime hover:scale-[1.02] transition-transform"
            >
              {loading ? "Submitting..." : "Claim My Free Lesson"}
            </Button>
          </form>

          {/* Share section */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm mb-3">Know someone who'd love this?</p>
            <Button onClick={copyLink} variant="outline" className="rounded-full px-6 border-primary/30 text-primary gap-2">
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Share This Offer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
