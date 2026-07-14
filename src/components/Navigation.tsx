import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Instagram, Linkedin, Youtube, Facebook } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useScrollHide } from "@/hooks/useScrollHide";

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hideNav = useScrollHide();
  const [isOnLight, setIsOnLight] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Detect if navbar is over a light section using data-navbar-theme="dark"
  const checkTheme = useCallback(() => {
    const sections = document.querySelectorAll("[data-navbar-theme]");
    const navHeight = 80;

    let onLight = false;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // If the section's top is above the navbar bottom and section's bottom is below navbar top
      if (rect.top < navHeight && rect.bottom > 0) {
        const theme = section.getAttribute("data-navbar-theme");
        if (theme === "dark") {
          onLight = true;
        }
      }
    });

    setIsOnLight(onLight);
  }, []);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(checkTheme);
    window.addEventListener("scroll", handleScroll, { passive: true });
    checkTheme(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkTheme]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50
        transition-transform duration-300 ease-in-out
        ${hideNav ? "-translate-y-full" : "translate-y-0"}`}
      >

        <div className={`
          relative mx-auto flex items-center justify-between transition-all duration-500
          lg:max-w-[1400px] lg:px-6 2xl:px-0 lg:py-6 lg:mt-0 lg:rounded-none lg:border-none
          mx-4 mt-4 px-4 py-3 rounded-full shadow-lg
          ${isOnLight
            ? "bg-black/90 md:bg-black/80 backdrop-blur-md border border-black/10"
            : "bg-black/40 md:bg-black/20 backdrop-blur-md border border-white/10"
          }
        `}>
          {/* ================= LOGO (LEFT) ================= */}
          <Link 
            to="/" 
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center z-50 relative shrink-0"
          >
            <img
              src="/images/midis final logo-01.png"
              alt="Midis Logo"
              className="h-8 md:h-10 lg:h-12 xl:h-14 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* ================= CENTER PILL ================= */}
          <div className={`
            hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center rounded-full shadow-lg transition-all duration-500
            px-4 xl:px-8 h-[52px] xl:h-[60px] gap-2 xl:gap-6
            ${isOnLight ? "bg-white" : "bg-white"}
            min-w-fit whitespace-nowrap
          `}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative h-full flex items-center px-3 xl:px-4 text-[11px] xl:text-[12px] font-bold uppercase tracking-widest transition-all duration-300 group text-black/50 hover:text-orange-600`}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:scale-[1.25] group-hover:drop-shadow-[0_0_10px_rgba(234,88,12,0.4)] block">
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="pl-2 border-l border-black/5 h-1/2 flex items-center">
              <Link 
                to="/work"
                className="w-9 h-9 xl:w-11 xl:h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-orange-600 transition-all duration-300 shadow-md group"
              >
                <ArrowUpRight size={14} className="xl:size-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT SIDE (DESKTOP ICONS) ================= */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 z-10 shrink-0">
            {[
              { icon: <Instagram size={18} />, href: "https://www.instagram.com/officialmidis/" },
              { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/midismarket/" },
              { icon: <Youtube size={18} />, href: "https://www.youtube.com/@MidisOfficial" },
              { icon: <Facebook size={18} />, href: "https://www.facebook.com/people/Midis/61579354660327/" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 xl:w-11 xl:h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOnLight
                    ? "border-white/30 text-white hover:bg-orange-600 hover:border-orange-600"
                    : "border-white/10 text-white hover:bg-orange-600 hover:border-orange-600"
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 z-50 relative focus:outline-none rounded-full backdrop-blur-sm active:scale-90 transition-all duration-200 border ${
              isOnLight
                ? "text-white bg-white/10 border-white/20"
                : "text-white bg-white/10 border-white/10"
            }`}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 lg:hidden flex flex-col bg-black/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-full"
          }`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-8 pt-32">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-white/50 hover:text-white transition-colors duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Footer (Social Icons) */}
        <div className="pb-12 flex flex-wrap items-center justify-center gap-6 px-4">
          <a
            href="https://www.instagram.com/officialmidis/"
            target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/midismarket/"
            target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.youtube.com/@MidisOfficial"
            target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://www.facebook.com/people/Midis/61579354660327/"
            target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </>
  );
};
