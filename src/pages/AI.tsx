"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Check, Zap, Brain, MessageSquare, Code } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";



const AIHero = () => {
  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] flex items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden bg-black text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src=""
          alt="AI Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Main Heading */}
          <div className="text-center relative mb-6 sm:mb-8 md:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(2.5rem,8vw,9.5rem)] leading-[1.1] md:leading-[0.9] font-normal uppercase tracking-tight"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              Transforming Future With
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[clamp(2.5rem,8vw,9.5rem)] leading-[1.1] md:leading-[0.9] font-normal uppercase tracking-tight mt-1"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              <span>SMARTER</span>
              {/* Removed Decorative Image */}

              <span>AI SOLUTIONS</span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-medium mb-8 sm:mb-10 md:mb-12 px-4"
          >
            At Midis, we help brands unlock the true potential of AI-driven solutions to enhance customer experiences, streamline workflows, and drive measurable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            <Link to="/contact" className="px-8 py-4 sm:px-10 sm:py-5 bg-orange-600 text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center gap-3 shadow-2xl">
              Get an AI Consultation <ArrowUpRight size={18} strokeWidth={3} />
            </Link>
            <button className="px-8 py-4 sm:px-10 sm:py-5 border-2 border-white/20 text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-white/5 transition-all">
              Explore Our Services
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 sm:mt-14 md:mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-orange-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= AI SERVICES SECTION ================= */
const AIServices = () => {
  const services = [
    {
      title: "ChatGPT Integration",
      desc: "Integrate the power of ChatGPT into your platform, app, or website. Whether for customer support, lead generation, or internal knowledge systems, we deliver human-like interactions that boost efficiency.",
      icon: <MessageSquare size={32} />,
      color: "#FF6B35",
      features: ["Custom Brand Tone Setup", "Multilingual Experiences", "CRM & Website Integration", "Ongoing Optimisation"]
    },
    {
      title: "OpenAI API Integration",
      desc: "Unlock the full potential of OpenAI’s ecosystem (GPT, DALL-E, Whisper). We connect advanced AI models into your existing systems for intelligent automation, creative generation, and predictive insights.",
      icon: <Zap size={32} />,
      color: "#9B5DE5",
      features: ["Content Automation", "Summarisation Systems", "AI-Based Analytics", "Smart Virtual Assistants"]
    },
    {
      title: "Generative AI Consultancy",
      desc: "Our experts design and develop solutions tailored to your business goals. From concept to deployment, we identify opportunities to reimagine processes and create value through AI that learns and adapts.",
      icon: <Brain size={32} />,
      color: "#4ECDC4",
      features: ["Strategy & Feasibility Analysis", "Model Fine-Tuning", "End-to-End Product Development", "Continuous Monitoring"]
    },
    {
      title: "AI Chatbot Development",
      desc: "Deliver 24/7 intelligent customer experiences with chatbots designed to understand and resolve queries naturally. We combine NLP and deep learning for seamless user interactions and reduced costs.",
      icon: <Code size={32} />,
      color: "#00BBF9",
      features: ["Human-like Flow", "Multi-Platform Integration", "Secure & Compliant", "Performance Analytics"]
    }
  ];

  return (
    <section className="bg-white py-10 sm:py-16 md:py-24 lg:py-40 px-6 text-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-[clamp(2rem,6vw,6rem)] font-black uppercase tracking-tighter leading-none mb-4 sm:mb-6 md:mb-8">
            Expert AI Services <br /> For Competitive Brands
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-black/60 leading-relaxed">
            Artificial intelligence is no longer futuristic — it’s the core of today’s most competitive brands. We deliver AI solutions that drive measurable impact from predictive insights to human-like automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          {services.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group p-6 sm:p-10 md:p-12 rounded-[30px] sm:rounded-[40px] bg-gray-50 hover:bg-black hover:text-white transition-all duration-500 border border-gray-100"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 bg-white text-black shadow-sm group-hover:scale-110 transition-transform"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-4 sm:mb-6">{item.title}</h3>
              <p className="text-base sm:text-lg text-black/50 group-hover:text-white/60 leading-relaxed mb-6 sm:mb-8">
                {item.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-auto">
                {item.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Check size={12} className="text-orange-500" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest group-hover:text-white/80">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= AI PROCESS SECTION ================= */
const AIProcess = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "Understanding your business needs and AI objectives." },
    { num: "02", title: "Data Strategy", desc: "Building a data-driven foundation for accurate insights." },
    { num: "03", title: "Development", desc: "Creating custom AI systems aligned with your workflow." },
    { num: "04", title: "Testing", desc: "Ensuring seamless performance across all platforms." },
    { num: "05", title: "Optimisation", desc: "Enhancing outcomes through continuous learning." }
  ];

  return (
    <section className="bg-[#050505] py-10 sm:py-16 md:py-24 lg:py-40 px-6 text-white overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="text-center mb-10 sm:mb-16 md:mb-24">
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-black uppercase mb-4 sm:mb-6 tracking-tighter">Our Development Process</h2>
          <p className="text-white/50 max-w-xl mx-auto uppercase tracking-widest text-xs sm:text-sm font-bold">Structured, transparent, and result-orientated</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="text-5xl sm:text-7xl font-black text-white/5 group-hover:text-orange-500/20 transition-colors duration-500 mb-2 sm:mb-4 tracking-tighter">
                {step.num}
              </div>
              <h4 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-2 sm:mb-4">{step.title}</h4>
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[2.5rem] -right-6 w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= INDUSTRIES SECTION ================= */
const AIIndustries = () => {
  const industries = ["eCommerce & Retail", "Real Estate", "Healthcare", "Education & e-Learning", "Marketing & Advertising", "Finance & Banking"];

  return (
    <section className="bg-white py-10 sm:py-16 md:py-24 lg:py-40 px-6 overflow-hidden text-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 items-center">
          <div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-none mb-6 sm:mb-8 lg:mb-10 tracking-tighter">
              Industries <br /> We Serve
            </h2>
            <p className="text-base sm:text-lg text-black/60 leading-relaxed mb-6 sm:mb-8 lg:mb-12">
              Our AI solutions are scalable, secure, and custom-built for diverse sectors, turning data into decisions and automation into advantage.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4">
              {industries.map((industry, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-orange-600" />
                  <span className="text-base sm:text-lg font-black uppercase tracking-tight">{industry}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden aspect-[16/9] lg:aspect-video relative z-10 border border-gray-100 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                alt="AI Development"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-10 text-white">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2 opacity-70">Efficiency & Scale</p>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tight">Smart Tech Solutions</h4>
              </div>
            </div>
            {/* Shapes */}
            <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-32 h-32 sm:w-40 sm:h-40 bg-purple-100 rounded-full blur-[50px] sm:blur-[60px] -z-0 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-32 h-32 sm:w-40 sm:h-40 bg-orange-100 rounded-full blur-[50px] sm:blur-[60px] -z-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= FAQ SECTION ================= */
const AIFAQ = () => {
  const faqs = [
    {
      q: "What industries will benefit from AI-driven solutions?",
      a: "All industries from eCommerce and healthcare to finance and education, may apply AI to streamline workflows and generate a better customer experience."
    },
    {
      q: "Does one require technical knowledge to use AI tools?",
      a: "Not necessarily; while we do the integration and AI developments, your business shall benefit from AI without involving any extra frustration."
    },
    {
      q: "How do AI chatbots improve customer support?",
      a: "The AI chatbots receive immediate and personalised answers to questions from customers, regardless of the time, thereby reducing wait time and raising the customer satisfaction rate."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-10 sm:py-16 md:py-24 lg:py-40 px-6 text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-center mb-10 sm:mb-14 md:mb-20 leading-[0.9]">Common Questions</h2>
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-8 text-left transition-colors hover:bg-gray-50"
              >
                <h4 className="text-base sm:text-xl font-bold uppercase tracking-tight pr-6 sm:pr-8">{faq.q}</h4>
                <div className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} className="sm:w-6 sm:h-6" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-8 pt-0 border-t border-gray-50">
                      <p className="text-base sm:text-lg text-black/50 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= PAGE COMPONENT ================= */
export default function AI() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-orange-600 selection:text-white">
      <Navigation />

      <AIHero />

      <div data-navbar-theme="dark">
        <AIServices />
      </div>

      <AIProcess />

      <div data-navbar-theme="dark">
        <AIIndustries />
        <AIFAQ />
      </div>

      {/* FINAL CTA */}
      <section className="bg-[#050505] py-12 sm:py-16 md:py-24 lg:py-40 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase tracking-tighter leading-none mb-8 sm:mb-12">
          Let’s build your <br />
          <span className="text-orange-600">intelligent future</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(234, 88, 12, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-5 sm:px-10 sm:py-6 bg-orange-600 text-white rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-4 shadow-2xl"
        >
          Start Your AI Journey <ArrowUpRight size={20} strokeWidth={3} />
        </motion.button>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-orange-600/10 rounded-full blur-[120px] -z-0 pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}
