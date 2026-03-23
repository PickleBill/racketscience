import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Video } from "lucide-react";
import Navbar from "@/components/Navbar";

const Consultation = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    sport: "",
    experience_level: "",
    goals: "",
    video_link: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("consultations").insert({
      name: form.name,
      email: form.email,
      sport: form.sport || null,
      experience_level: form.experience_level || null,
      goals: form.goals || null,
      video_link: form.video_link || null,
      message: form.message || null,
    });

    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
    }
    setLoading(false);
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
            <h1 className="font-serif text-3xl text-foreground mb-4">Request Received</h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Thank you for reaching out. We'll review your information and get back to you within 24 hours with a personalized assessment of how we can help elevate your game.
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">
              No Commitment Required
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Free 5-Minute <span className="text-gradient-lime">Assessment</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tell us about your game. Share a video if you'd like. We'll provide an honest, no-pressure assessment of how we can help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-secondary border-border rounded-xl h-12"
              />
              <Input
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-secondary border-border rounded-xl h-12"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Select value={form.sport} onValueChange={(v) => setForm({ ...form, sport: v })}>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12">
                  <SelectValue placeholder="Primary Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="padel">Padel</SelectItem>
                  <SelectItem value="squash">Squash</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.experience_level} onValueChange={(v) => setForm({ ...form, experience_level: v })}>
                <SelectTrigger className="bg-secondary border-border rounded-xl h-12">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="competitive">Competitive / Tournament</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="What are your goals? (e.g., improve serve, reduce injuries)"
              value={form.goals}
              onChange={(e) => setForm({ ...form, goals: e.target.value })}
              className="bg-secondary border-border rounded-xl h-12"
            />

            <div className="relative">
              <Video className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Video link (YouTube, Google Drive, etc.) — optional"
                value={form.video_link}
                onChange={(e) => setForm({ ...form, video_link: e.target.value })}
                className="bg-secondary border-border rounded-xl h-12 pl-10"
              />
            </div>

            <Textarea
              placeholder="Tell us about your game — what's working, what's not, what you've tried..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-secondary border-border rounded-xl min-h-[120px]"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime hover:scale-[1.02] transition-transform"
            >
              {loading ? "Submitting..." : "Request Free Assessment"}
            </Button>

            <p className="text-center text-muted-foreground text-xs">
              No spam. No pressure. Just an honest conversation about your game.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
