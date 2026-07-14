import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { services, CategoryKey } from "@/data/services";
import { CategoryTabs } from "@/components/services/CategoryTabs";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Link } from "react-router-dom";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const servicesRef = useRef<HTMLElement>(null);

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <main className="relative bg-[#050505] text-white min-h-screen overflow-hidden">
      {/* Background gradients with floating animation */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob-1 absolute -top-40 -left-40 w-80 h-80 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="blob-2 absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="blob-3 absolute bottom-[-6rem] left-20 w-72 h-72 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <Navigation />

      {/* REDESIGNED HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 px-6 overflow-hidden bg-black text-white">
        {/* Background Image - Clear view without overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/6936354b56d45fd81bf94509_Sections-p-1600.jpg"
            alt="AI Hero Background"
            className="w-full h-full object-cover opacity-80 blur-[2px] scale-105"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center">


          {/* Main Heading */}
          <div className="text-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(2rem,7vw,9rem)] leading-[1.1] md:leading-[0.9] font-normal uppercase tracking-tight"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              DISCOVER THE CREATIVITY &
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[clamp(2rem,7vw,9rem)] leading-[1.1] md:leading-[0.9] font-normal uppercase tracking-tight mt-2"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >    <span>OUR</span>
              {/* Removed Decorative Image */}

              <span>EXPERTISE</span>
            </motion.div>
 
            {/* CTA BUTTONS SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-12 relative z-20"
            >
              <Link
                to="/contact"
                className="px-10 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
              >
                Start a Project
              </Link>
              <Link
                to="/work"
                className="px-10 py-4 bg-transparent text-white font-bold border-2 border-white/20 uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white hover:text-black transition-all duration-500"
              >
                View Our Work
              </Link>
            </motion.div>


          </div>


        </div>
      </section>

      {/* Re-transition text color for the rest of the page if it's dark */}
      <div className="bg-[#050505] pt-20">

        {/* SERVICES SECTION - Mobile first */}
        <section ref={servicesRef} className="section-spacing">
          <div className="container-responsive max-w-6xl">
            {/* Heading - Mobile first */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
              <div>
                <h2 className="text-heading-md font-semibold">
                  Everything you need under one roof.
                </h2>
                <p className="text-body text-white/75 mt-2 max-w-xl">
                  Mix and match services or build an end-to-end growth stack. We
                  design, develop, write, run ads, and integrate AI—so you don't
                  have to juggle multiple agencies.
                </p>
              </div>
            </div>

            {/* Category tabs with staggered animation */}
            <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

            {/* SERVICES GRID with enhanced animations */}
            <ServiceGrid services={filteredServices} />
          </div>
        </section>

        {/* AI STRIP - Mobile first */}
        <section className="section-spacing-sm bg-gradient-to-r from-[#12040f] via-[#080814] to-[#04050a] border-y border-white/10 animate-fade-in">
          <div className="container-responsive max-w-6xl flex-stack-to-row items-center justify-between">
            <div className="max-w-xl animate-slide-in-left">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200/80 mb-2">
                AI at Midis
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2">
                Ready to add real AI to your marketing stack?
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                We don't just plug in tools. We help you design AI use-cases,
                connect them to your workflows, and measure impact—whether that's
                chatbots, content engines, or full OpenAI API integrations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs animate-slide-in-right">
              <span className="px-3 py-1 rounded-full bg-black/40 border border-white/20 text-white/80 hover:border-orange-400/60 hover:bg-black/60 transition-all duration-300 cursor-pointer hover:scale-105">
                ChatGPT Assistants
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 border border-white/20 text-white/80 hover:border-orange-400/60 hover:bg-black/60 transition-all duration-300 cursor-pointer hover:scale-105">
                AI Lead Capture
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 border border-white/20 text-white/80 hover:border-orange-400/60 hover:bg-black/60 transition-all duration-300 cursor-pointer hover:scale-105">
                Automated Reporting
              </span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}