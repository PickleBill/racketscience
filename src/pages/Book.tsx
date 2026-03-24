import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckCircle, Share2 } from "lucide-react";
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

  const handleSkipDetails = () => {
    setBooked(true);
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
            <p className="text-muted-foreground text-sm mb-8">
              We'll send a confirmation to <span className="text-foreground">{email}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate("/")} variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
                Back to Home
              </Button>
              {user && (
                <Button onClick={() => navigate("/refer")} className="rounded-full px-8 glow-lime gap-2">
                  <Share2 className="w-4 h-4" /> Share the Court
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Progressive details step (optional, after initial booking)
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
              <Input
                placeholder="Current Ranking (e.g., 4.0 NTRP)"
                value={ranking}
                onChange={(e) => setRanking(e.target.value)}
                className="bg-secondary border-border rounded-xl h-12"
              />
              <Input
                placeholder="Goals or notes for your coach"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="bg-secondary border-border rounded-xl h-12"
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleSkipDetails}
                  variant="outline"
                  className="flex-1 rounded-full py-6 border-primary/30 text-primary"
                >
                  Skip for Now
                </Button>
                <Button
                  onClick={() => setBooked(true)}
                  className="flex-1 rounded-full py-6 font-semibold glow-lime"
                >
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

          <form onSubmit={handleBook} className="glass rounded-2xl p-8 space-y-5">
            {/* Email */}
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

            {/* Session Type */}
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

            {/* Date */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Preferred Date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-secondary border-border rounded-xl h-12",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slot */}
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

            {!user && (
              <p className="text-xs text-muted-foreground text-center">
                Have an account?{" "}
                <button type="button" onClick={() => navigate("/auth")} className="text-primary hover:underline">
                  Sign in
                </button>{" "}
                for faster booking & referral rewards.
              </p>
            )}

            <Button
              type="submit"
              disabled={loading || !date || !sessionType || !timeSlot || !email}
              className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime hover:scale-[1.02] transition-transform"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
