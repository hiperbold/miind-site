import { initAnalytics, trackPageView } from "@/lib/analytics";
import { captureFirstTouch } from "@/lib/attribution";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Index from "./pages/Index";
import ArquivoPage from "./pages/ArquivoPage";
import TermosDeServicoPage from "./pages/TermosDeServicoPage";
import PoliticaDePrivacidadePage from "./pages/PoliticaDePrivacidadePage";
import GramadoPage from "./pages/GramadoPage";
import TechnologiesPage from "./pages/TechnologiesPage";
import TechnologyDetailPage from "./pages/TechnologyDetailPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import PortfolioPage from "./pages/PortfolioPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogAdminPage from "./pages/BlogAdminPage";
import BuilderSegmentPage from "./pages/builders/BuilderSegmentPage";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import BackToTop from "./components/BackToTop";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    captureFirstTouch();
    initAnalytics();
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/arquivo" element={<ArquivoPage />} />
        <Route path="/termos-de-servico" element={<TermosDeServicoPage />} />
        <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidadePage />} />
        <Route path="/gramado" element={<GramadoPage />} />
        <Route path="/tecnologias" element={<TechnologiesPage />} />
        <Route path="/tecnologia/:techId" element={<TechnologyDetailPage />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/admin" element={<BlogAdminPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/bu1lder/*" element={<BuilderRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function BuilderRedirect(){window.location.replace(import.meta.env.BASE_URL+'bu1lder/'+(window.location.pathname.split('/bu1lder/')[1]||''));return null;}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <AnimatedRoutes />
        <FloatingWhatsApp />
        <BackToTop />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
