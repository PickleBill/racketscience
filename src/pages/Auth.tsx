import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We've sent you a confirmation link." });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        navigate("/book");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-4 font-medium">
              {isSignUp ? "Join the Elite" : "Welcome Back"}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              {isSignUp ? "Create Your Account" : "Sign In"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp
                ? "Start your journey to biomechanical mastery."
                : "Access your bookings and Bio-Vault."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary border-border rounded-xl h-12"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-secondary border-border rounded-xl h-12"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-6 font-semibold tracking-wide glow-lime"
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
