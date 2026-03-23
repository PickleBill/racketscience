import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, CalendarDays, MessageSquare, ClipboardList } from "lucide-react";

const statusColors: Record<string, string> = {
  confirmed: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
      if (!data || data.length === 0) { setIsAdmin(false); return; }
      setIsAdmin(true);
      fetchAll();
    };
    checkAdmin();
  }, []);

  const fetchAll = async () => {
    const [b, c, a] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("consultations").select("*").order("created_at", { ascending: false }),
      supabase.from("assessments").select("*").order("created_at", { ascending: false }),
    ]);
    setBookings(b.data || []);
    setConsultations(c.data || []);
    setAssessments(a.data || []);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      toast({ title: "Status updated" });
    }
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex justify-center"><p className="text-muted-foreground">Loading...</p></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <ShieldCheck className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-foreground mb-4">Access Restricted</h1>
          <p className="text-muted-foreground mb-8">This area is for authorized administrators only.</p>
          <Button onClick={() => navigate("/")} variant="outline" className="rounded-full px-8 border-primary/30 text-primary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-primary text-sm tracking-[0.25em] uppercase mb-2 font-medium">Admin Dashboard</p>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground">
              Command <span className="text-gradient-lime">Center</span>
            </h1>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="glass border-border rounded-xl p-1 h-auto">
              <TabsTrigger value="bookings" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 gap-2">
                <CalendarDays className="w-4 h-4" /> Bookings ({bookings.length})
              </TabsTrigger>
              <TabsTrigger value="consultations" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 gap-2">
                <MessageSquare className="w-4 h-4" /> Consultations ({consultations.length})
              </TabsTrigger>
              <TabsTrigger value="assessments" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 gap-2">
                <ClipboardList className="w-4 h-4" /> Assessments ({assessments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <div className="glass rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Type</TableHead>
                      <TableHead className="text-muted-foreground">Time</TableHead>
                      <TableHead className="text-muted-foreground">Sport</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b) => (
                      <TableRow key={b.id} className="border-border">
                        <TableCell className="text-foreground">{b.session_date}</TableCell>
                        <TableCell className="text-foreground capitalize">{b.session_type?.replace(/_/g, " ")}</TableCell>
                        <TableCell className="text-foreground capitalize">{b.time_slot}</TableCell>
                        <TableCell className="text-foreground capitalize">{b.sport || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[b.status] || ""}>{b.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Select value={b.status} onValueChange={(v) => updateBookingStatus(b.id, v)}>
                            <SelectTrigger className="w-32 h-8 bg-secondary border-border rounded-lg text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                    {bookings.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No bookings yet</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="consultations">
              <div className="glass rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Email</TableHead>
                      <TableHead className="text-muted-foreground">Sport</TableHead>
                      <TableHead className="text-muted-foreground">Level</TableHead>
                      <TableHead className="text-muted-foreground">Goals</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations.map((c) => (
                      <TableRow key={c.id} className="border-border">
                        <TableCell className="text-foreground">{c.name}</TableCell>
                        <TableCell className="text-foreground">{c.email}</TableCell>
                        <TableCell className="text-foreground capitalize">{c.sport || "—"}</TableCell>
                        <TableCell className="text-foreground capitalize">{c.experience_level || "—"}</TableCell>
                        <TableCell className="text-foreground max-w-[200px] truncate">{c.goals || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[c.status] || ""}>{c.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {consultations.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No consultations yet</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="assessments">
              <div className="glass rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Email</TableHead>
                      <TableHead className="text-muted-foreground">Sport</TableHead>
                      <TableHead className="text-muted-foreground">Ranking</TableHead>
                      <TableHead className="text-muted-foreground">Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessments.map((a) => (
                      <TableRow key={a.id} className="border-border">
                        <TableCell className="text-foreground">{a.name}</TableCell>
                        <TableCell className="text-foreground">{a.email}</TableCell>
                        <TableCell className="text-foreground capitalize">{a.sport || "—"}</TableCell>
                        <TableCell className="text-foreground">{a.ranking || "—"}</TableCell>
                        <TableCell className="text-foreground">{a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"}</TableCell>
                      </TableRow>
                    ))}
                    {assessments.length === 0 && (
                      <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No assessments yet</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
