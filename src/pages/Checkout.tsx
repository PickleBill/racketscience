import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { CreditCard, Lock, CheckCircle, ShieldCheck } from "lucide-react";

const sessionLabels: Record<string, string> = {
  legacy: "Legacy Assessment",
  growth: "Growth Tier — Monthly",
  elite: "Elite Tier — Monthly",
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const type = searchParams.get("type") || "legacy";
  const amount = parseInt(searchParams.get("amount") || "200");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("checkout_intents" as any).insert({
      email,
      name: name || null,
      session_type: type,
      amount,
      status: "pending",
    } as any);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setComplete(true);
    }
    setLoading(false);
  };

  if (complete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 glow-lime">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-4">Payment Reserved</h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Your {sessionLabels[type] || type} spot is secured.
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              We'll finalize billing once our payment system goes live. A confirmation will be sent to <span className="text-foreground">{email}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate("/")} variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
                Back to Home
              </Button>
              <Button onClick={() => navigate("/book")} className="rounded-full px-8 glow-lime">
                Book a Session
              </Button>
            </div>
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
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Secure Checkout</p>
            <h1 className="font-serif text-3xl text-foreground mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground">{sessionLabels[type] || type}</p>
          </div>

          {/* Order summary */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-foreground font-semibold">{sessionLabels[type] || type}</p>
                <p className="text-muted-foreground text-sm">One-time charge</p>
              </div>
              <p className="text-2xl font-bold text-foreground font-sans">${amount}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
              <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-border rounded-xl h-12"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email Address *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-border rounded-xl h-12"
              />
            </div>

            {/* Simulated card field */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Card Information</label>
              <div className="bg-secondary border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <input
                    disabled
                    placeholder="4242 4242 4242 4242"
                    className="bg-transparent text-muted-foreground text-sm flex-1 outline-none cursor-not-allowed"
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    disabled
                    placeholder="MM / YY"
                    className="bg-transparent text-muted-foreground text-sm flex-1 outline-none cursor-not-allowed"
                  />
                  <input
                    disabled
                    placeholder="CVC"
                    className="bg-transparent text-muted-foreground text-sm w-20 outline-none cursor-not-allowed"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Payment processing coming soon — your spot is reserved.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime hover:scale-[1.02] transition-transform"
            >
              {loading ? "Processing..." : `Reserve — $${amount}`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>Secured by Stripe (coming soon)</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
