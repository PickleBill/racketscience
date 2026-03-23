import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Book from "./pages/Book.tsx";
import Process from "./pages/Process.tsx";
import Methodology from "./pages/Methodology.tsx";
import Consultation from "./pages/Consultation.tsx";
import Admin from "./pages/Admin.tsx";
import Refer from "./pages/Refer.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/book" element={<Book />} />
          <Route path="/process" element={<Process />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/refer" element={<Refer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
