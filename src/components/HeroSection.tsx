"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0); // 0 to 100
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isHeroInView = rect.top <= 0 && rect.bottom > window.innerHeight * 0.5;

      // If animation is complete and scrolling up back into hero, allow reverse
      if (animationComplete) {
        // Check if user is scrolling up and hero is coming back into view
        const isScrollingUp = e.deltaY < 0;
        const isAtTopOfPage = window.scrollY < 100;

        if (isScrollingUp && isAtTopOfPage && revealProgress === 100) {
          e.preventDefault();
          // Start reversing the animation
          setAnimationComplete(false);
        }
        return;
      }

      if (!isHeroInView) return;

      // Prevent page scroll during hero animation
      e.preventDefault();

      if (isAnimatingRef.current) return;

      const direction = e.deltaY > 0 ? "down" : "up";

      if (direction === "down") {
        // Scrolling down - reveal second image (right to left)
        isAnimatingRef.current = true;

        setRevealProgress(prev => {
          const newProgress = Math.min(prev + 8, 100);

          if (newProgress >= 100) {
            // Animation complete - allow normal scrolling
            setTimeout(() => {
              setAnimationComplete(true);
              isAnimatingRef.current = false;
            }, 500);
          } else {
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 50);
          }

          return newProgress;
        });
      } else if (direction === "up" && revealProgress > 0) {
        // Scrolling up - hide second image (reverse: left to right)
        isAnimatingRef.current = true;

        setRevealProgress(prev => {
          const newProgress = Math.max(prev - 8, 0);
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 50);
          return newProgress;
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [animationComplete, revealProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[85svh] min-h-[550px] md:h-screen overflow-hidden bg-neutral-900"
    >
      {/* FIRST IMAGE (Base) */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/MIDIS/ales-nesetril-Im7lZjxeLhg-unsplash.webp')",
          }}
        />
        {/* Gradient overlay for first image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* SECOND IMAGE (Reveals from Right to Left, Hides from Left to Right with black filter) */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          clipPath: `inset(0 0 0 ${100 - revealProgress}%)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/MIDIS/ales-nesetril-Im7lZjxeLhg-unsplash.webp')",
          }}
        />
        {/* Black filter overlay on second image */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{
            opacity: revealProgress < 100 ? 0.5 : 0.3,
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 h-full flex flex-col">
        {/* CENTER HERO TEXT */}
        <div className="flex-1 flex items-center justify-center px-8 pt-20 md:pt-24">
          <div className="text-center w-full mx-auto">
            <div className={`transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1
                className="leading-none uppercase flex flex-col items-center justify-center"
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(60px, 20vw, 450px)",
                  letterSpacing: "normal",
                  lineHeight: 0.9,
                  textAlign: "center",
                  WebkitTextFillColor: revealProgress >= 50 ? "#ffffff" : "transparent",
                  backgroundImage: revealProgress >= 50
                    ? "none"
                    : "linear-gradient(90deg, #fff, #ffffff45 72%, #fff0)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "#ffffff",
                }}
              >
                MIDIS
              </h1>
            </div>
            <p
              className={`
                mt-3 md:mt-8 text-base md:text-xl lg:text-2xl text-white/90 font-light tracking-widest uppercase
                transition-all duration-1000 delay-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Innovative Solutions for Modern Challenges
            </p>

            {/* CTA BUTTONS */}
            <div
              className={`
                mt-4 md:mt-10 flex flex-wrap gap-4 justify-center
                transition-all duration-1000 delay-700
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[15px] rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-xl"
              >
                Start a Project
              </Link>
              <Link
                to="/work"
                className="px-8 py-4 bg-transparent text-white font-black border-2 border-white/20 uppercase tracking-widest text-[15px] rounded-full hover:bg-white hover:text-black transition-all duration-500"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
