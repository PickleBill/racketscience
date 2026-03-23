import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckCircle, ArrowRight, Copy, Share2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
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
  const [date, setDate] = useState<Date>();
  const [sessionType, setSessionType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [sport, setSport] = useState("");
  const [ranking, setRanking] = useState("");
  const [goals, setGoals] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date || !sessionType || !timeSlot) return;

    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      session_type: sessionType,
      session_date: format(date, "yyyy-MM-dd"),
      time_slot: timeSlot,
      sport: sport || null,
      ranking: ranking || null,
      goals: goals || null,
    });

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      setBooked(true);
    }
    setLoading(false);
  };

  // Not logged in — redirect to auth
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-md text-center">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Exclusive Access</p>
            <h1 className="font-serif text-3xl text-foreground mb-4">Sign In to Book</h1>
            <p className="text-muted-foreground mb-8">
              Create an account or sign in to access our booking system and reserve your session.
            </p>
            <Button onClick={() => navigate("/auth")} className="rounded-full px-10 py-6 glow-lime font-semibold">
              Sign In / Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="font-serif text-3xl text-foreground mb-4">Session Booked</h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Your {sessionTypes.find(s => s.value === sessionType)?.label} is confirmed.
            </p>
            <p className="text-muted-foreground mb-8">
              {date && format(date, "EEEE, MMMM d, yyyy")} — {timeSlots.find(t => t.value === timeSlot)?.label}
            </p>
            <Button onClick={() => navigate("/")} variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">Book a Session</p>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Reserve Your <span className="text-gradient-lime">Session</span>
            </h1>
            <p className="text-muted-foreground">Select your session type, pick a date, and you're in.</p>
          </div>

          <form onSubmit={handleBook} className="glass rounded-2xl p-8 space-y-5">
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

            {/* Additional info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12">
                  <SelectValue placeholder="Primary Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="padel">Padel</SelectItem>
                  <SelectItem value="squash">Squash</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Current Ranking"
                value={ranking}
                onChange={(e) => setRanking(e.target.value)}
                className="bg-secondary border-border rounded-xl h-12"
              />
            </div>

            <Input
              placeholder="Goals or notes for your coach"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="bg-secondary border-border rounded-xl h-12"
            />

            <Button
              type="submit"
              disabled={loading || !date || !sessionType || !timeSlot}
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
