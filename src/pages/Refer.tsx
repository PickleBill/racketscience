import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, CheckCircle, Gift, Users, Trophy, ArrowRight } from "lucide-react";

const rewards = [
  { icon: Trophy, title: "Free Lesson On Us", description: "A complimentary private session — because legends share the court." },
  { icon: Gift, title: "Premium Body Bag", description: "Our signature gear bag, because your equipment deserves a throne." },
  { icon: Users, title: "Pro On Your Team", description: "A pro player joins your next match. Yes, really." },
];

const Refer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);
      const { data } = await supabase.from("referrals").select("*").eq("referrer_id", session.user.id);
      if (data) {
        setReferralCount(data.length);
        setEarnedRewards(data);
      }
    };
    init();
  }, []);

  const referralLink = user
    ? `${window.location.origin}/book?ref=${user.id}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({ title: "Link copied!", description: "Share it with your friends." });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Sign In to Share</h1>
          <p className="text-muted-foreground mb-8">Create an account to get your personal referral link.</p>
          <Button onClick={() => navigate("/auth")} className="rounded-full px-10 py-6 glow-lime font-semibold">
            Sign In <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Share the Court</p>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Bring Your <span className="text-gradient-lime">People</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Great players elevate everyone around them. Share the experience — and earn something memorable.
            </p>
          </div>

          {/* Referral Link Card */}
          <div className="glass rounded-2xl p-8 mb-12 text-center">
            <p className="text-sm text-muted-foreground mb-3 italic">"I found my secret weapon. Your turn."</p>
            <div className="flex items-center gap-3 bg-secondary rounded-xl p-4 mb-4">
              <input
                readOnly
                value={referralLink}
                className="flex-1 bg-transparent text-foreground text-sm outline-none truncate"
              />
              <Button onClick={copyLink} size="sm" className="rounded-full px-6 glow-lime shrink-0">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {referralCount > 0
                ? `🔥 You've brought ${referralCount} friend${referralCount > 1 ? "s" : ""} to the court!`
                : "Share your link and earn experiential rewards."}
            </p>
          </div>

          {/* Rewards */}
          <h2 className="font-serif text-2xl text-foreground text-center mb-8">What You Earn</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {rewards.map((r) => (
              <div key={r.title} className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.description}</p>
              </div>
            ))}
          </div>

          {/* Earned Rewards */}
          {earnedRewards.length > 0 && (
            <div className="glass rounded-2xl p-8">
              <h3 className="font-serif text-xl text-foreground mb-4">Your Rewards</h3>
              <div className="space-y-3">
                {earnedRewards.map((r) => (
                  <div key={r.id} className="flex items-center justify-between bg-secondary rounded-xl p-4">
                    <span className="text-foreground capitalize">{r.reward_type?.replace(/_/g, " ")}</span>
                    <span className={`text-sm ${r.redeemed ? "text-muted-foreground" : "text-primary font-semibold"}`}>
                      {r.redeemed ? "Redeemed" : "Available"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Refer;
