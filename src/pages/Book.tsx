import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckCircle, Share2, Copy } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const sessionTypes = [
  { value: "legacy_assessment", label: "Legacy Assessment — $200", desc: "90-min master evaluation" },
  { value: "group_clinic", label: "Group Clinic — Growth Tier", desc: "Weekly group session" },
  { value: "private_session", label: "Private Session — Elite Tier", desc: "1-on-1 coaching" },
];

const timeSlots = [
  { value: "morning", label: "Morning (7am – 11am)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening (5pm – 8pm)" },
];

const Book = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get("ref");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [step, setStep] = useState<"booking" | "details">("booking");
  const [date, setDate] = useState<Date>();
  const [sessionType, setSessionType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState("");
  const [ranking, setRanking] = useState("");
  const [goals, setGoals] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) setEmail(session.user.email);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) setEmail(session.user.email);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleOAuth = async (provider: "google" | "apple") => {
    const { error } = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin + "/book",
    });
    if (error) {
      toast({ title: "Sign-in failed", description: String(error), variant: "destructive" });
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !sessionType || !timeSlot || !email) return;

    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user?.id || null,
      email,
      session_type: sessionType,
      session_date: format(date, "yyyy-MM-dd"),
      time_slot: timeSlot,
      sport: sport || null,
      ranking: ranking || null,
      goals: goals || null,
      referred_by: referredBy || null,
    } as any);

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      if (step === "booking") {
        setStep("details");
      } else {
        setBooked(true);
      }
    }
    setLoading(false);
  };

  const handleSkipDetails = () => setBooked(true);

  const copyClaimLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/claim`);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  // Booking confirmed
  if (booked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 glow-lime">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-4">You're In</h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Your {sessionTypes.find(s => s.value === sessionType)?.label} is confirmed.
            </p>
            <p className="text-muted-foreground mb-8">
              {date && format(date, "EEEE, MMMM d, yyyy")} — {timeSlots.find(t => t.value === timeSlot)?.label}
            </p>

            {/* Share card */}
            <div className="glass rounded-2xl p-6 mb-8 text-left">
              <p className="text-foreground font-semibold text-sm mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" /> Share with a friend
              </p>
              <p className="text-muted-foreground text-xs mb-3">Know someone who'd love this? Give them a free lesson.</p>
              <Button onClick={copyClaimLink} variant="outline" size="sm" className="rounded-full border-primary/30 text-primary gap-2">
                {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy Free Lesson Link"}
              </Button>
            </div>

            <Button onClick={() => navigate("/")} variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Progressive details step
  if (step === "details") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 glow-lime">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Almost There</p>
              <h1 className="font-serif text-3xl text-foreground mb-4">Tell Us More <span className="text-muted-foreground text-lg font-sans">(Optional)</span></h1>
              <p className="text-muted-foreground">Help us prepare the perfect session for you.</p>
            </div>

            <div className="glass rounded-2xl p-8 space-y-5">
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12">
                  <SelectValue placeholder="Primary Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="padel">Padel</SelectItem>
                  <SelectItem value="pickleball">Pickleball</SelectItem>
                  <SelectItem value="squash">Squash</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Current Ranking (e.g., 4.0 NTRP)" value={ranking} onChange={(e) => setRanking(e.target.value)} className="bg-secondary border-border rounded-xl h-12" />
              <Input placeholder="Goals or notes for your coach" value={goals} onChange={(e) => setGoals(e.target.value)} className="bg-secondary border-border rounded-xl h-12" />
              <div className="flex gap-3">
                <Button onClick={handleSkipDetails} variant="outline" className="flex-1 rounded-full py-6 border-primary/30 text-primary">
                  Skip for Now
                </Button>
                <Button onClick={() => setBooked(true)} className="flex-1 rounded-full py-6 font-semibold glow-lime">
                  Complete Booking
                </Button>
              </div>
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Book a Session</p>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Reserve Your <span className="text-gradient-lime">Session</span>
            </h1>
            <p className="text-muted-foreground">Pick a date, choose your session, and you're in. No account required.</p>
          </div>

          {/* OAuth quick sign-in */}
          {!user && (
            <div className="glass rounded-2xl p-6 mb-6">
              <p className="text-sm text-muted-foreground text-center mb-4">Quick sign in for faster booking</p>
              <div className="flex gap-3">
                <Button onClick={() => handleOAuth("google")} variant="outline" className="flex-1 rounded-xl h-12 border-border gap-2 hover:bg-white/5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </Button>
                <Button onClick={() => handleOAuth("apple")} variant="outline" className="flex-1 rounded-xl h-12 border-border gap-2 hover:bg-white/5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          )}

          <form onSubmit={handleBook} className="glass rounded-2xl p-8 space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email Address *</label>
              <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary border-border rounded-xl h-12" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Session Type *</label>
              <Select value={sessionType} onValueChange={setSessionType} required>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12">
                  <SelectValue placeholder="Choose a session" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      <div>
                        <div>{s.label}</div>
                        <div className="text-xs text-muted-foreground">{s.desc}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Preferred Date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-secondary border-border rounded-xl h-12", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Time Slot *</label>
              <Select value={timeSlot} onValueChange={setTimeSlot} required>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12">
                  <SelectValue placeholder="Choose a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading || !date || !sessionType || !timeSlot || !email} className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime hover:scale-[1.02] transition-transform">
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
