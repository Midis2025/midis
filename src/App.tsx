import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";


/* Lazy load pages for code splitting */
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Services2 = lazy(() => import("./pages/Services2"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Work = lazy(() => import("./pages/Work"));
const AI = lazy(() => import("./pages/AI"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { SmoothScroll } from "@/components/SmoothScroll";

// ScrollToTop component to reset page scroll to 0 on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Routes are React.lazy, so the new page mounts after this effect and any
    // ScrollTriggers on it are measured against the outgoing layout.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

/* Loading component for Suspense fallback */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-orange-500 animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 rounded-full bg-orange-500/10 blur-xl animate-pulse"></div>
    </div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast & Notifications */}
        <Toaster />
        <Sonner />

        <SmoothScroll>
          {/* Router */}
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>

                {/* Main Pages */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services2" element={<Services2 />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/case-study" element={<CaseStudy />} />
                <Route path="/work" element={<Work />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/contact" element={<Contact />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
