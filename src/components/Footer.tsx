import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* =========================
         FOOTER COLUMNS
      ========================= */
      gsap.from(".footer-col", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-grid",
          start: "top 85%",
        },
      });

      /* =========================
         COPYRIGHT
      ========================= */
      gsap.from(".footer-copy", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-copy",
          start: "top 95%",
        },
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#0C0E12] text-white pt-16 pb-10 px-6 md:px-16 lg:px-24"
    >
      {/* ================= TOP CTA ================= */}
    

      {/* ================= MAIN GRID ================= */}
      <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-10 pb-8">

        {/* TOP SERVICES */}
        <div className="footer-col">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-3">Our Top Service</h3>
          <ul className="space-y-2 text-gray-400 text-sm font-medium">
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Web Development</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Web Designing</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Graphic Design</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Content Writing</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Video Editing</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">YouTube Management</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Search Engine Optimization</Link></li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm font-medium">
            <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            <li><Link to="/services2" className="hover:text-orange-500 transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
            <li><Link to="/blogs" className="hover:text-orange-500 transition-colors">Blogs</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-col">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm font-medium">
            <li className="flex flex-col gap-0.5">
              <span className="text-xs uppercase text-white/40 tracking-widest">Email</span>
              <a href="mailto:Hello@midis.in" className="text-white hover:text-orange-500 transition-colors">Hello@midis.in</a>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-xs uppercase text-white/40 tracking-widest">Phone</span>
              <div className="flex flex-col gap-0.5 text-white">
                 <span className="flex items-center gap-2">🇺🇸 +1 (862) 295-0117</span>
                 <span className="flex items-center gap-2">🇮🇳 +91 97793 20626</span>
              </div>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-xs uppercase text-white/40 tracking-widest">Address</span>
              <span className="text-white leading-relaxed">
                1st Floor, E 279, Industrial Area,<br />
                Sector 75, S.A.S Nagar, Punjab<br />
                160055
              </span>
            </li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="footer-col">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-3">Follow Us</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.instagram.com/officialmidis/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
              <Instagram size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/company/midismarket/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.youtube.com/@MidisOfficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
              <Youtube size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com/people/Midis/61579354660327/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
              <Facebook size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="footer-copy border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
        <span>© {new Date().getFullYear()} Midis. All Rights Reserved.</span>
        <span className="text-white/20 italic">Innovative Solutions for Modern Challenges</span>
      </div>
    </footer>
  );
};
