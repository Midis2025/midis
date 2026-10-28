"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  ShieldCheck,
  LockSimple,
  Cookie,
  Database,
  Eye,
  FileText,
  EnvelopeSimple,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight
} from "@phosphor-icons/react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const keyPrinciples = [
    {
      icon: ShieldCheck,
      title: "No Data Selling",
      desc: "We never sell, rent, or trade your personal information to third-party brokers or advertisers."
    },
    {
      icon: LockSimple,
      title: "Strictly Necessary Info",
      desc: "We only collect details you voluntarily provide to discuss projects or schedule consultations."
    },
    {
      icon: Eye,
      title: "Transparent Tracking",
      desc: "Standard analytics (Google Analytics & Meta Pixel) are used solely to measure and improve site performance."
    }
  ];

  return (
    <>
      <Navigation />

      <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-orange-600 selection:text-white">
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center pt-32 sm:pt-40 pb-16 sm:pb-20 px-6 overflow-hidden bg-black text-white">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="Privacy Policy Background" 
              className="w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505]" />
          </div>

          <div className="max-w-[1200px] mx-auto relative z-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6">
                <ShieldCheck size={16} weight="bold" />
                Data Protection & Transparency
              </div>

              <h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase leading-[0.95] mb-4 text-white"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                PRIVACY POLICY
              </h1>

              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/60 font-medium leading-relaxed">
                Learn how Midis collects, uses, and safeguards your information when you browse our website or reach out for our design, development, and digital marketing services.
              </p>


            </motion.div>
          </div>

          {/* Glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/10 blur-[140px] pointer-events-none -z-0" />
        </section>

        {/* ================= KEY PRINCIPLES HIGHLIGHT ================= */}
        <section className="py-10 px-6 md:px-12 lg:px-24 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyPrinciples.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4">
                  <item.icon size={22} weight="duotone" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= MAIN POLICY CONTENT ================= */}
        <section className="py-16 sm:py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-14">

            {/* Section 1: Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <FileText size={18} weight="bold" />
                <span>01. Overview & Scope</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Who We Are & What This Policy Covers
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>
                  This Privacy Policy applies to <strong className="text-white">Midis</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operating the website <strong className="text-white">midis.in</strong>. We are a creative and digital marketing agency providing web development, UI/UX design, graphic design, content writing, video editing, SEO optimization, and brand identity solutions.
                </p>
                <p>
                  This policy outlines our transparent data handling practices. It applies specifically to information gathered when you visit our website, interact with our content, or contact us through our consultation and inquiry forms.
                </p>
              </div>
            </div>

            {/* Section 2: Information We Collect */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <Database size={18} weight="bold" />
                <span>02. Information We Collect</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Information Collected on Our Website
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-4 font-normal">
                <p>
                  We keep data collection minimal and focused strictly on answering inquiries and delivering agency services:
                </p>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <h4 className="text-white font-bold text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    A. Information You Voluntarily Provide
                  </h4>
                  <p className="text-sm text-white/70">
                    When you fill out our &ldquo;Book a Consultation&rdquo; or contact forms, or when you reach out directly via email or phone, we collect:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80 pt-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-orange-500 shrink-0" weight="fill" />
                      <span>Full Name</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-orange-500 shrink-0" weight="fill" />
                      <span>Email Address</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-orange-500 shrink-0" weight="fill" />
                      <span>Phone Number</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-orange-500 shrink-0" weight="fill" />
                      <span>Requested Service / Category</span>
                    </li>
                    <li className="flex items-center gap-2 sm:col-span-2">
                      <CheckCircle size={16} className="text-orange-500 shrink-0" weight="fill" />
                      <span>Message and Project Brief Details</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <h4 className="text-white font-bold text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    B. Information Collected Automatically
                  </h4>
                  <p className="text-sm text-white/70">
                    When you navigate our website, basic technical data may be automatically recorded by our web server and analytics providers:
                  </p>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Device, browser type, and operating system information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>IP address and approximate geographic location (country/city level)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Pages viewed, duration of visit, and referring URL paths</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: What We Do NOT Collect */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <ShieldCheck size={18} weight="bold" />
                <span>03. Data We Do NOT Collect</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                No Extra Data or Unrelated Processing
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>
                  To ensure complete clarity and protect your personal privacy, our website intentionally avoids extraneous data gathering:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="font-semibold text-white text-sm mb-1">No Account Creation</p>
                    <p className="text-xs text-white/50">We do not operate public user accounts, logins, or password databases on this website.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="font-semibold text-white text-sm mb-1">No Online Card Transactions</p>
                    <p className="text-xs text-white/50">We do not collect credit card numbers, CVVs, or bank credentials on our website. Project billing is handled through direct B2B invoicing.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="font-semibold text-white text-sm mb-1">No Sensitive Information</p>
                    <p className="text-xs text-white/50">We never request or process biometric data, government ID numbers, health information, or other sensitive categories.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="font-semibold text-white text-sm mb-1">No Children&apos;s Data</p>
                    <p className="text-xs text-white/50">Our agency services are exclusively directed to businesses and adults. We do not knowingly collect information from anyone under 18.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: How We Use Your Information */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <LockSimple size={18} weight="bold" />
                <span>04. Purpose of Use</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                How We Use Your Information
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>We use the information we collect strictly for legitimate business and client-service objectives:</p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span><strong>Consultation & Inquiry Response:</strong> Reviewing your project requirements and getting in touch via email or phone to discuss strategy, timelines, and proposals.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span><strong>Service Delivery & Communication:</strong> Collaborating with you to execute requested digital marketing, web development, branding, or design deliverables.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span><strong>Website Optimization:</strong> Monitoring site performance, resolving technical errors, and enhancing user navigation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span><strong>Security & Abuse Prevention:</strong> Protecting our website, contact forms, and systems against automated bots, spam submissions, and fraudulent activity.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5: Third-Party Services */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <Eye size={18} weight="bold" />
                <span>05. Third-Party Services & Integrations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Tools & Providers We Use
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>
                  To operate our website securely and analyze engagement, we work with select trusted third-party service providers:
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h5 className="font-bold text-white text-sm mb-1">Strapi Backend</h5>
                    <p className="text-xs text-white/60">
                      When you submit an inquiry form, the payload is transmitted securely to our cloud-hosted Strapi API endpoint so our team can read and respond to your message.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h5 className="font-bold text-white text-sm mb-1">Google Analytics (gtag.js)</h5>
                    <p className="text-xs text-white/60">
                      We use Google Analytics to track aggregated, non-personally identifiable metrics (such as page views, popular content, and average visit duration).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h5 className="font-bold text-white text-sm mb-1">Meta Pixel</h5>
                    <p className="text-xs text-white/60">
                      Used to understand campaign performance and measure visits generated from our social outreach.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h5 className="font-bold text-white text-sm mb-1">External Social Links</h5>
                    <p className="text-xs text-white/60">
                      Our site links to our official social media channels (Instagram, LinkedIn, YouTube, Facebook). When you click external links, you become subject to those individual platforms&apos; privacy terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Cookies */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <Cookie size={18} weight="bold" />
                <span>06. Cookies & Tracking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                How Cookies Are Used
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>
                  Cookies are small text files placed on your device to ensure smooth site navigation and collect aggregated traffic metrics.
                </p>
                <p>
                  You can choose to disable or block cookies at any time through your browser settings (Chrome, Safari, Firefox, Edge). Please note that even if you disable cookies, you will still have full access to explore our portfolio and submit inquiries through our forms.
                </p>
              </div>
            </div>

            {/* Section 7: Security & Data Retention */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <LockSimple size={18} weight="bold" />
                <span>07. Data Security & Retention</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                How We Protect and Retain Data
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>
                  We employ HTTPS encryption across all web traffic to safeguard the transmission of your inquiry submissions. Access to incoming client inquiries is restricted strictly to authorized team members who require it to respond to your request.
                </p>
                <p>
                  We keep inquiry records only for as long as is necessary to evaluate the project, complete business discussions, or maintain business correspondence records. If no ongoing relationship is established, data may be periodically cleared.
                </p>
              </div>
            </div>

            {/* Section 8: Your Rights */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <CheckCircle size={18} weight="bold" />
                <span>08. Your Privacy Rights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Access, Correction & Deletion
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed space-y-3 font-normal">
                <p>
                  You have the right to maintain control over your personal contact information. At any time, you can:
                </p>
                <ul className="space-y-1.5 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Request a copy of the inquiry data we hold about you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Request correction of outdated or inaccurate contact details.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Request that we delete your inquiry records from our database.</span>
                  </li>
                </ul>
                <p className="pt-2">
                  To submit a privacy request, simply write to us at <a href="mailto:hello@midis.in" className="text-orange-500 underline font-semibold hover:text-orange-400">hello@midis.in</a>. We respond to all verified requests promptly.
                </p>
              </div>
            </div>

            {/* Section 9: Updates */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <FileText size={18} weight="bold" />
                <span>09. Policy Updates</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Changes to This Privacy Policy
              </h2>
              <div className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                <p>
                  We may periodically update this Privacy Policy to reflect modifications in our service offerings, technical infrastructure, or legal requirements. Any modifications will be posted directly on this page.
                </p>
              </div>
            </div>

            {/* Section 10: Contact Us */}
            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-orange-500 font-black text-xs uppercase tracking-[0.2em]">
                <EnvelopeSimple size={18} weight="bold" />
                <span>10. Contact Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Questions or Concerns?
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed">
                If you have questions regarding this Privacy Policy or wish to exercise your privacy rights, please reach out to our team:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center gap-3 text-orange-500 mb-2">
                    <EnvelopeSimple size={20} weight="bold" />
                    <span className="text-xs uppercase tracking-widest font-bold text-white/60">Email</span>
                  </div>
                  <a href="mailto:hello@midis.in" className="text-white hover:text-orange-500 font-semibold transition-colors text-sm sm:text-base">
                    hello@midis.in
                  </a>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center gap-3 text-orange-500 mb-2">
                    <Phone size={20} weight="bold" />
                    <span className="text-xs uppercase tracking-widest font-bold text-white/60">Phone</span>
                  </div>
                  <div className="text-white text-xs sm:text-sm font-semibold space-y-1">
                    <p>🇺🇸 +1 (862) 295-0117</p>
                    <p>🇮🇳 +91 97793 20626</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center gap-3 text-orange-500 mb-2">
                    <MapPin size={20} weight="bold" />
                    <span className="text-xs uppercase tracking-widest font-bold text-white/60">Office</span>
                  </div>
                  <p className="text-white/80 text-xs leading-relaxed font-medium">
                    1st Floor, E 279, Industrial Area, Sector 75, S.A.S Nagar, Punjab 160055, India
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA Card */}
            <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                  READY TO GROW YOUR BUSINESS?
                </h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-md font-medium">
                  Have questions about working with Midis or want to schedule a strategy consultation?
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-widest transition-all shrink-0 shadow-lg"
              >
                <span>Contact Us</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default PrivacyPolicy;

