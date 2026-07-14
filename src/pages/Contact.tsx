import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Send,
  Mail,
  Phone,
  CheckCircle,
  Loader2,
  Instagram,
  Linkedin,
  Facebook,
  Youtube
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const SERVICE_MAP: Record<string, string> = {
        'Web Development': 'Web development ',
        'Graphic Designing': 'Graphic designing ',
        'Digital Marketing': 'Digital Marketing',
        'SEO Optimization': 'Seo Optimisation',
        'Content Writing': 'Content Writing ',
        'Brand Identity': 'Brand Identity',
        'Social Media Management': 'Digital Marketing',
        'Other': 'Other',
      };

      const mappedService = SERVICE_MAP[formData.service] ?? formData.service;

      const payload = {
        data: {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          services: mappedService,
          message: formData.message,
        },
      };

      const res = await fetch('https://jubilant-sparkle-2f7bfe100e.strapiapp.com/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed ${res.status}: ${text}`);
      }

      await res.json();

      setSubmitted(true);

      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setSubmitted(false);
      }, 4000);
    } catch (err: any) {
      console.error('Failed to submit enquiry:', err);
      // Show a basic alert; keep UI non-blocking. You can replace with a nicer UI later.
      alert(`Failed to send message: ${err?.message ?? err}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/officialmidis/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/midismarket/", label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/people/Midis/61579354660327/", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@MidisOfficial", label: "Youtube" }
  ];

  const services = [
    "Web Development",
    "Graphic Designing",
    "Digital Marketing",
    "SEO Optimization",
    "Social Media Management",
    "Content Writing",
    "Brand Identity",
    "Other"
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <Navigation />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Main Heading */}
            <div className="text-center relative mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(2.5rem,8vw,9rem)] leading-[0.85] font-normal uppercase tracking-tight" 
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                BOOK A CONSULTATION
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-3xl mx-auto text-lg md:text-2xl text-white/80 font-medium mb-12"
            >
              Partner with a leading digital marketing agency that understands your goals and delivers proven results.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-2 bg-orange-500 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN FORM SECTION ================= */}
      <section className="py-12 md:py-20 lg:py-24 px-4 md:px-12 lg:px-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-4 block">
                Let's Strategy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C0E12] leading-[0.95] tracking-tight uppercase mb-8">
                GROW YOUR BUSINESS <br />
                <span className="text-orange-600">WITH MIDIS</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-md">
                Take the first step towards digital excellence. During our consultation, we'll analyze your current presence and build a roadmap for your growth.
              </p>

              {/* Contact Details */}
              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                    <a href="mailto:hello@midis.in" className="text-xl font-bold text-[#0C0E12] hover:text-orange-600 transition-colors">hello@midis.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                    <div className="flex flex-col">
                      <p className="text-xl font-bold text-[#0C0E12]">🇺🇸 +1 (862) 295-0117</p>
                      <p className="text-xl font-bold text-[#0C0E12]">🇮🇳 +91 97793 20626</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#0C0E12] hover:border-[#0C0E12] transition-all duration-300 group"
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/5 border border-gray-100">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-20 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                      >
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-[#0C0E12] mb-4">Request Received!</h3>
                      <p className="text-gray-500 text-lg">Our experts will contact you shortly to schedule your session.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Your Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'phone' || formData.phone
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>

                        {/* Service Selection */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'service' || formData.service
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Select a Service *
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('service')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium appearance-none"
                          >
                            <option value=""></option>
                            {services.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                          ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                          : 'text-gray-400 top-4'
                          }`}>
                          Your Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#0C0E12] text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] flex items-center justify-center gap-4 hover:bg-orange-600 transition-all duration-500 disabled:opacity-70 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Booking Strategy...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

 

      
      <Footer />
    </main>
  );
}