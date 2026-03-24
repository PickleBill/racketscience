import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Share2, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
        setIsAdmin(!!data && data.length > 0);
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
        setIsAdmin(!!data && data.length > 0);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { label: "Framework", action: () => scrollToSection("value-props") },
    { label: "Process", action: () => { setMobileOpen(false); navigate("/process"); } },
    { label: "Methodology", action: () => { setMobileOpen(false); navigate("/methodology"); } },
    { label: "Pricing", action: () => scrollToSection("pricing") },
    { label: "Free Consult", action: () => { setMobileOpen(false); navigate("/consultation"); } },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 shadow-lg shadow-black/20" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg text-foreground tracking-wide">
          Racket <span className="text-primary">Science</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          {!user && (
            <button onClick={() => navigate("/claim")} className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              Free Lesson
            </button>
          )}
          {user ? (
            <>
              {isAdmin && (
                <button onClick={() => navigate("/admin")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                </button>
              )}
              <button onClick={() => navigate("/refer")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <Button size="sm" variant="ghost" onClick={handleSignOut} className="text-muted-foreground">
                Sign Out
              </Button>
              <Button size="sm" onClick={() => navigate("/book")} className="rounded-full px-6 glow-lime">
                Book Now
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate("/auth")} className="text-muted-foreground">
                Sign In
              </Button>
              <Button size="sm" onClick={() => navigate("/book")} className="rounded-full px-6 glow-lime">
                Book Now
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          {!user && (
            <Button size="sm" variant="ghost" onClick={() => { setMobileOpen(false); navigate("/claim"); }} className="w-full text-primary justify-start font-medium">
              🎁 Free Lesson
            </Button>
          )}
          <div className="pt-4 border-t border-border space-y-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button size="sm" variant="ghost" onClick={() => { setMobileOpen(false); navigate("/admin"); }} className="w-full text-muted-foreground justify-start gap-2">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => { setMobileOpen(false); navigate("/refer"); }} className="w-full text-muted-foreground justify-start gap-2">
                  <Share2 className="w-4 h-4" /> Share the Court
                </Button>
                <Button size="sm" variant="ghost" onClick={handleSignOut} className="w-full text-muted-foreground">
                  Sign Out
                </Button>
                <Button size="sm" onClick={() => { setMobileOpen(false); navigate("/book"); }} className="w-full rounded-full glow-lime">
                  Book Now
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="ghost" onClick={() => { setMobileOpen(false); navigate("/auth"); }} className="w-full text-muted-foreground">
                  Sign In
                </Button>
                <Button size="sm" onClick={() => { setMobileOpen(false); navigate("/book"); }} className="w-full rounded-full glow-lime">
                  Book Now
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
