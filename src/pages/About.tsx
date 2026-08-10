"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CaretDown, ArrowRight, Sparkle, Check, Lightning, LinkedinLogo, Planet, Rocket, Handshake } from "@phosphor-icons/react";

/* ───────────────────────── ANIMATION HELPERS ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ───────────────────────── DATA ───────────────────────── */

const whyMidisReasons = [
  {
    icon: Planet,
    title: "Global Perspective",
    desc: "We understand how people behave online in different cultures, so our strategies adapt—they are not copy-paste.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Rocket,
    title: "Return on Investment",
    desc: "We don't celebrate likes or impressions. We celebrate leads, sales, and revenue growth.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Handshake,
    title: "Real Collaboration",
    desc: "We don't disappear after sending a report. We work alongside you, adjusting strategy when the market shifts.",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: Lightning,
    title: "Ideas & Data Balance",
    desc: "We love creative campaigns, but numbers keep us grounded.",
    color: "from-purple-500/20 to-pink-500/20"
  },
];



const gains = [
  { text: "Experience across borders — we know what works globally." },
  { text: "All-in-one solutions — no need to hire five different agencies." },
  { text: "Clear communication — no jargon, just results explained simply." },
  { text: "Growth strategies — designed to scale with your business." },
];

const faqs = [
  { q: "WHAT SERVICES DO YOU OFFER?", a: "We provide end-to-end creative solutions including UI/UX Design, Branding, Web Development, SEO & Ads, Content Writing, Video Editing, Email Marketing, and Digital Strategy." },
  { q: "HOW DO YOU APPROACH A NEW PROJECT?", a: "Our process starts with deep research and discovery, followed by strategic planning, creative execution, and rigorous testing—all with clear communication at every step." },
  { q: "WHO WILL BE WORKING ON MY PROJECT?", a: "You'll have a dedicated team of senior designers and developers working directly with you throughout the lifecycle." },
  { q: "DO YOU PROVIDE SUPPORT?", a: "Yes, we offer comprehensive maintenance and support packages to ensure your digital products stay ahead of the curve." },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT 1 — ABOUT HERO
   ═══════════════════════════════════════════════════════ */

const AboutHero = () => {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "25K", label: "Happy Clients" },
  ];

  const headlineWords = ["CRAFTING", "THE", "FUTURE"];
  const sublineWords = ["OF", "DIGITAL", "EXCELLENCE"];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#06060e] text-white">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(252, 108, 5, 1), #ea580c, transparent)" }}
          animate={{ x: ["-10%", "15%", "-5%"], y: ["-20%", "10%", "-15%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          initial={{ top: "-10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle, #8b5cf6, #6d28d9, transparent)" }}
          animate={{ x: ["10%", "-20%", "5%"], y: ["15%", "-10%", "20%"] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          initial={{ bottom: "10%", right: "5%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, #0891b2, transparent)" }}
          animate={{ x: ["-5%", "20%", "-10%"], y: ["10%", "-20%", "5%"] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          initial={{ top: "40%", left: "50%" }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')", backgroundRepeat: "repeat" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#06060e_70%)]" />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col items-center justify-center px-6 pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 min-h-screen">
        {/* Top Label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600 backdrop-blur-md border border-orange-600/20 animate-pulse">
            <Sparkle size={20} weight="fill" className="opacity-80" />
          </div>
          <span className="text-white/50 text-[11px] uppercase font-semibold tracking-[0.3em] font-sans">About Midis</span>
          <div className="w-12 h-px bg-white/20" />
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-6">
          <div className="flex flex-wrap justify-center items-center gap-x-[0.2em] md:gap-x-[0.35em]">
            {headlineWords.map((word, i) => (
              <motion.span key={`h-${i}`} initial={{ opacity: 0, y: 80, rotateX: 90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} className="text-[clamp(2.8rem,11vw,10rem)] leading-[0.9] font-normal uppercase tracking-tight inline-block" style={{ fontFamily: "Anton, sans-serif" }}>
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-[0.2em] md:gap-x-[0.35em] mt-1">
            {sublineWords.map((word, i) => (
              <motion.span key={`s-${i}`} initial={{ opacity: 0, y: 80, rotateX: 90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.55 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center">
                <span className={`text-[clamp(2.8rem,11vw,10rem)] leading-[0.9] font-normal uppercase tracking-tight ${i === 2 ? "bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent" : "text-white"}`} style={{ fontFamily: "Anton, sans-serif" }}>
                  {word}
                </span>
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="text-white/40 text-sm md:text-base max-w-lg text-center leading-relaxed font-medium tracking-wide">
          We specialize in accelerating startup growth — building bold, memorable brands with precision, creativity, and impact.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.3 }} className="mt-10">
          <button className="group relative px-10 py-4 rounded-full border border-white/15 text-white text-[11px] uppercase font-bold tracking-[0.25em] overflow-hidden transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]">
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-orange-300">
              Explore Our Story
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>

        <div className="flex-1" />

        {/* Bottom Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }} className="w-full mt-auto pt-8">
          <div className="border-t border-white/10 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 md:gap-x-8 lg:gap-x-12 items-center">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.6 + i * 0.1 }} className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-normal text-white shrink-0 leading-none" style={{ fontFamily: "Anton, sans-serif" }}>{stat.value}</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] md:tracking-[0.18em] text-white/50 font-semibold leading-tight">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-orange-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 2 — WHO WE ARE
   ═══════════════════════════════════════════════════════ */

const WhoWeAreSection = () => {
  return (
    <section className="bg-white py-10 sm:py-16 md:py-24 lg:py-36 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        {/* Label */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 backdrop-blur-md border border-orange-500/20">
            <Sparkle size={20} weight="bold" />
          </div>
          <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">Who We Are</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-24">
          {/* Left — Big heading + paragraphs */}
          <div className="space-y-6 sm:space-y-8">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-6xl font-black uppercase text-[#0C0E12] leading-[0.95] tracking-tight">
              NOT JUST ANOTHER <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">DIGITAL AGENCY</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium">
              If you've been looking around for a digital agency, you already know the challenge: everyone says they can build websites, run ads, or "do SEO." The problem is, most of them stop there.
            </motion.p>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium">
              At Midis, we look at things differently. We're not just about delivering a service and moving on. We're about building a <strong className="text-[#0C0E12]">brand presence that lasts</strong>. A website that isn't just pretty but also fast. Content that isn't just SEO-friendly but actually enjoyable to read. Campaigns that don't just get clicks but bring customers who stick.
            </motion.p>
          </div>

          {/* Right — Continued text + accent card */}
          <div className="space-y-6 sm:space-y-8 md:pt-2 lg:pt-6">
            <motion.p variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium">
              We've worked with businesses in different corners of the world. Some were startups trying to get noticed. Others were established companies looking for smarter growth. Different goals, different markets—but the same outcome: <strong className="text-[#0C0E12]">measurable results that make sense for the business</strong>.
            </motion.p>

            {/* Accent highlight card */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-[#0C0E12] rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <span className="text-orange-400 text-4xl sm:text-5xl mb-3 sm:mb-4 block">→</span>
                <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
                  We don't chase vanity metrics. We build <strong className="text-white">systems that help you grow</strong> month after month.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 3 — WHY MIDIS
   ═══════════════════════════════════════════════════════ */

const WhyMidisSection = () => {
  return (
    <section className="bg-[#faf9f7] py-8 sm:py-16 md:py-24 lg:py-36 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-3 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 backdrop-blur-md border border-orange-500/20">
            <Sparkle className="w-4 h-4 sm:w-5 sm:h-5" weight="bold" />
          </div>
          <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">Why Choose Us</span>
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[26px] sm:text-[30px] md:text-5xl lg:text-7xl font-black uppercase text-[#0C0E12] leading-[0.95] md:leading-[0.9] tracking-tight mb-3 sm:mb-6">
          WHY MIDIS AND <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">NOT SOMEONE ELSE?</span>
        </motion.h2>

        <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium mb-6 sm:mb-12 md:mb-16">
          Let's be honest: there are plenty of agencies out there. So why us? Here's what clients tell us:
        </motion.p>

        {/* Reason Cards */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {whyMidisReasons.map((reason, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 border border-black/5 hover:border-orange-500/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] cursor-default overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />

              <div className="relative z-10">
                <div className="flex items-start gap-3.5 sm:gap-4 md:gap-5">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-[20px] bg-gradient-to-br ${reason.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm border border-black/5 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                    <reason.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-black/80 relative z-10 ${reason.icon === Planet ? "animate-[spin_10s_linear_infinite]" : ""}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-[#0C0E12] tracking-tight mb-1 sm:mb-2 leading-tight group-hover:text-orange-600 transition-colors duration-300">{reason.title}</h3>
                    <p className="text-[#5a5a6a] text-xs sm:text-sm md:text-base leading-relaxed font-medium group-hover:text-[#2a2a3a] transition-colors duration-300">{reason.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 4 — DIRECTORS SECTION
   ═══════════════════════════════════════════════════════ */



const DirectorsSection = () => {
  const directors = [
    {
      name: "Sagar Bakshi",
      role: "Managing Director",
      bio: "Sagar Bakshi is the Managing Director of Midis, where he leads strategy, operations, and digital growth initiatives. With a focus on AI-driven solutions, automation, and brand building, he helps businesses scale smarter and faster while turning complex challenges into clear, actionable strategies. Sagar brings hands-on experience from multiple e-commerce ventures, ranging from home decor and wellness brands to streetwear, ensuring every project is designed for practical growth and long-term success.",
      image: "/images/Sagar-bakshi.jpg.webp",
      bg: "bg-orange-50/50",
      num: "01",
      imgPos: "object-top md:object-center",
      imgScale: "scale-100 group-hover:scale-105"
    },
    {
      name: "Gaurav Sharma",
      role: "CEO & Director",
      bio: "Gaurav Sharma is the CEO and a Director at Midis, where he drives the company’s vision, strategy, and innovation. With deep expertise in digital solutions, branding, marketing, and web development, he ensures that every project delivers measurable results and meaningful impact for clients. Gaurav plays a pivotal role at Mining Discovery, overseeing content strategy, platform growth, and insights delivery for the global mining industry.",
      image: "/images/gaurav-sharma.png",
      bg: "bg-blue-50/50",
      num: "02",
      imgPos: "object-cover object-center",
      imgScale: "scale-[1.35] -translate-y-[8%] group-hover:scale-[1.4]"
    }
  ];

  return (
    <section className="bg-white py-0 overflow-hidden">
      {/* Intro Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-24 pt-6 pb-6 sm:pt-16 sm:pb-12 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-4">
            <span className="w-12 h-[2px] bg-black" />
            <span className="text-black font-black text-[12px] tracking-[0.4em] uppercase">The Visionaries</span>
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase text-[#0C0E12] leading-[0.85] tracking-tighter">
            DRIVING THE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>FUTURE OF MIDIS</span>
          </h2>
        </motion.div>
      </div>

      {/* Split Screen Rows */}
      <div className="flex flex-col border-t border-black/5">
        {directors.map((director, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-0 md:min-h-[600px] lg:min-h-[80vh] items-stretch border-b border-black/5`}>

            {/* Image Half - Full Bleed */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 relative group overflow-hidden h-[380px] md:h-auto md:self-stretch"
            >
              <img
                src={director.image}
                alt={director.name}
                className={`absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ${director.imgPos} ${director.imgScale}`}
              />
              <div className={`absolute inset-0 ${director.bg} mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-700`} />

              {/* Floating ID Tag */}
              <div className="absolute top-4 left-4 sm:top-8 sm:left-8 md:left-12 lg:left-20 z-20 bg-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full shadow-2xl">
                <span className="text-black font-black text-xs sm:text-sm tracking-widest">{director.num}</span>
              </div>
            </motion.div>

            {/* Content Half - Minimalist centered */}
            <div className="w-full md:w-1/2 flex items-center justify-center pt-6 pb-3 px-6 sm:p-10 md:p-12 lg:p-24 bg-white relative md:self-stretch">
              {/* Background Large Number Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <span className="text-[25vw] md:text-[18vw] font-normal leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>
                  {director.num}
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-md w-full space-y-4 sm:space-y-8 md:space-y-10 relative z-10"
              >
                <div className="space-y-2.5 sm:space-y-4">
                  <div className="w-12 h-1 bg-orange-600" />
                  <span className="block text-orange-600 font-bold text-[13px] tracking-[0.3em] uppercase">
                    {director.role}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal uppercase text-[#0C0E12] tracking-normal sm:tracking-tight leading-[1.05]" style={{ fontFamily: 'Anton, sans-serif' }}>
                    {director.name.split(' ')[0]} <br />
                    <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0C0E12' }}>{director.name.split(' ')[1]}</span>
                  </h3>
                </div>

                <p className="text-[#3a3a4a] text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                  {director.bio}
                </p>

                <div className="pt-2 sm:pt-4">
                  <button className="flex items-center gap-4 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center transition-all duration-300">
                      <LinkedinLogo size={18} className="text-white" />
                    </div>
                    <span className="text-black font-black text-xs tracking-widest uppercase">Connect on LinkedIn</span>
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 5 — WHAT YOU'LL GAIN
   ═══════════════════════════════════════════════════════ */

const GainsSection = () => {
  return (
    <section className="bg-white py-10 sm:py-16 md:py-32 lg:py-40 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600 backdrop-blur-md border border-orange-600/20 animate-pulse">
                <Sparkle size={20} weight="fill" className="opacity-80" />
              </div>
              <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">Partnership</span>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-6xl font-black uppercase text-[#0C0E12] leading-[0.95] tracking-tight mb-4 sm:mb-6">
              WHAT YOU'LL <br />
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">GAIN WITH MIDIS</span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#3a3a4a] text-base md:text-lg leading-relaxed font-medium mb-8 sm:mb-10">
              When you work with Midis, you're not just outsourcing tasks — you're building a partnership.
            </motion.p>
          </div>

          {/* Right — Gains list */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-3.5 sm:space-y-5">
            {gains.map((gain, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group flex items-start gap-3.5 sm:gap-5 p-4 sm:p-6 rounded-2xl bg-[#faf9f7] border border-black/5 hover:border-orange-500/20 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 backdrop-blur-md border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent" />
                  <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 relative z-10" weight="bold" />
                </div>
                <p className="text-[#2a2a3a] text-sm sm:text-base md:text-lg font-semibold leading-relaxed">{gain.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 6 — MARQUEE
   ═══════════════════════════════════════════════════════ */

const AboutMarquee = () => {
  return (
    <div className="bg-[#0C0E12] py-16 overflow-hidden relative flex border-y border-white/5">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20"
      >
        {[1, 2, 3].map(i => (
          <span key={i} className="text-[12vw] font-black uppercase text-white/10 tracking-[0.05em] leading-none">
            MIDIS AGENCY <span className="text-orange-500">*</span> MIDIS AGENCY <span className="text-orange-500">*</span> MIDIS AGENCY <span className="text-orange-500">*</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 7 — FAQ
   ═══════════════════════════════════════════════════════ */

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-10 sm:py-16 md:py-32 lg:py-40 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 backdrop-blur-md border border-orange-500/20">
            <Sparkle size={20} weight="bold" />
          </div>
          <span className="text-black font-bold text-[11px] tracking-[0.25em] uppercase">FAQ</span>
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-6xl font-black uppercase text-[#0C0E12] leading-[0.95] tracking-tight mb-8 sm:mb-12 md:mb-16">
          FREQUENTLY ASKED <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">QUESTIONS</span>
        </motion.h2>

        <div className="divide-y divide-black/10">
          {faqs.map((f, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-5 sm:py-8 md:py-10">
              <button onClick={() => setOpenIndex(openIndex === i ? -1 : i)} className="w-full flex justify-between items-center group gap-4">
                <h4 className={`text-lg md:text-2xl font-black uppercase tracking-tighter transition-all text-left ${openIndex === i ? "text-orange-500" : "text-[#0C0E12]/80"}`}>{f.q}</h4>
                <div className={`w-11 h-11 border border-black/10 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ${openIndex === i ? "rotate-180 bg-[#0C0E12] text-white" : ""}`}>
                  <CaretDown size={22} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="pt-6 text-lg text-[#5a5a6a] font-medium max-w-3xl leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT 8 — LET'S START BUILDING (CTA)
   ═══════════════════════════════════════════════════════ */

const StartBuildingCTA = () => {
  return (
    <section className="relative bg-[#0C0E12] py-12 sm:py-20 md:py-36 lg:py-44 px-4 md:px-12 lg:px-24 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-600 backdrop-blur-md border border-orange-600/20 animate-pulse">
            <Sparkle size={20} weight="fill" className="opacity-80" />
          </div>
          <span className="text-white/40 font-bold text-[11px] tracking-[0.25em] uppercase">Get Started</span>
        </motion.div>

        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[30px] md:text-5xl lg:text-7xl font-black uppercase text-white leading-[0.95] tracking-tight mb-8">
          LET'S START <br />
          <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">BUILDING</span>
        </motion.h2>

        <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium mb-12">
          At the end of the day, you don't just need a website or a campaign. You need a partner who understands your goals and knows how to get you there. That's Midis.
        </motion.p>

        <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full text-black font-black uppercase text-[12px] tracking-[0.2em] hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] transition-all duration-500 hover:scale-105"
          >
            Book a Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>


        <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/20 text-sm font-medium mt-8">
          Let's talk about where you want your business to be six months from now.
        </motion.p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════ */

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <Navigation />

      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Who We Are */}
      <WhoWeAreSection />

      {/* 3. Why Midis */}
      <WhyMidisSection />
      {/* 4. Directors Section */}
      <DirectorsSection />



      {/* 5. What You'll Gain */}
      <GainsSection />

      {/* 6. Marquee Divider */}
      <AboutMarquee />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. Let's Start Building CTA */}
      <StartBuildingCTA />

      <Footer />
    </main>
  );
};

export default AboutPage;
