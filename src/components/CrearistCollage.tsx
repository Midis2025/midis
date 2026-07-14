"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CrearistCollage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleGroupRef = useRef<HTMLDivElement | null>(null);
  const milestonesRef = useRef<HTMLDivElement | null>(null);

  // Image Refs
  const imgGuyRef = useRef<HTMLDivElement | null>(null);
  const imgGoldRef = useRef<HTMLDivElement | null>(null);
  const imgOrangeRef = useRef<HTMLDivElement | null>(null);
  const imgRobotRef = useRef<HTMLDivElement | null>(null);
  const imgMotionRef = useRef<HTMLDivElement | null>(null);
  const cardStackRef = useRef<HTMLDivElement | null>(null);
  const imgStack2Ref = useRef<HTMLDivElement | null>(null);
  const imgMotionMobileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* ===============================
         INITIAL SETUP
      =============================== */
      gsap.set(titleGroupRef.current, {
        opacity: 1,
        scale: 0.1,
        y: 0,
        zIndex: 0
      });

      gsap.set(milestonesRef.current, { opacity: 0, x: 100 });
      gsap.set(cardStackRef.current, { y: "100%", opacity: 0 });
      gsap.set(imgStack2Ref.current, { opacity: 0 });

      /* ===============================
         TIMELINE ANIMATION
      =============================== */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1200%", // Increased for slower, more luxurious scrolling
          scrub: 1.5, // Added more smooth inertia
          pin: true,
          anticipatePin: 1,
        },
      });

      /* --- PHASE 1: IMAGES SHIFT --- */
      tl.to(titleGroupRef.current, {
        scale: 0.15,
        duration: 3,
        ease: "power2.inOut"
      }, 0);

      tl.to(imgGuyRef.current, { x: "-55%", y: "-15%", duration: 3, ease: "power2.inOut" }, 0);
      tl.to(imgGoldRef.current, { x: "-50%", y: "-35%", duration: 3, ease: "power2.inOut" }, 0);
      tl.to(imgMotionRef.current, { x: "55%", y: "-15%", duration: 3, ease: "power2.inOut" }, 0);
      tl.to(imgRobotRef.current, { x: "65%", duration: 3, ease: "power2.inOut" }, 0);
      tl.to(imgOrangeRef.current, { x: "-10%", y: "20%", duration: 3, ease: "power2.inOut" }, 0);

      /* --- PHASE 2: TEXT ZOOMS IN (2nd Scroll) --- */
      tl.to(titleGroupRef.current, {
        scale: 0.9,
        duration: 4,
        ease: "power2.inOut"
      }, ">");

      tl.to(imgGuyRef.current, { x: "-140%", y: "-20%", duration: 4, ease: "power2.inOut" }, "<");
      tl.to(imgGoldRef.current, { x: "-150%", y: "-150%", duration: 4, ease: "power2.inOut" }, "<");
      tl.to(imgMotionRef.current, { x: "140%", y: "-30%", duration: 4, ease: "power2.inOut" }, "<");
      tl.to(imgRobotRef.current, { x: "160%", y: "50%", duration: 4, ease: "power2.inOut" }, "<");
      tl.to(imgOrangeRef.current, { x: "10%", y: "160%", duration: 4, ease: "power2.inOut" }, "<");

      /* --- PHASE 3: IMAGE TO LEFT & TEXT PERSISTENCE (3rd Scroll) --- */
      tl.to(imgMotionRef.current, {
        left: 0,
        top: 0,
        width: "50vw",
        height: "100vh",
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 50,
        duration: 4,
        ease: "power3.inOut"
      }, ">");

      tl.to(titleGroupRef.current, {
        y: -100,
        opacity: 0,
        duration: 2.5,
        ease: "power3.inOut"
      }, "<+1"); // Delay fade to keep text visible longer

      tl.to([imgGuyRef.current, imgGoldRef.current, imgOrangeRef.current, imgRobotRef.current], {
        opacity: 0,
        scale: 0.4,
        y: 80,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.in"
      }, "<");

      /* --- PHASE 4: FINAL REVEAL (MILESTONES) --- */
      tl.to(milestonesRef.current, {
        opacity: 1,
        x: 0,
        duration: 3,
        ease: "power3.out"
      }, "<+0.5");

      tl.from(".milestone-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power2.out"
      }, "<+0.2");

      /* --- PHASE 6: STACK CARD (Directly after Milestones) --- */
      tl.to(milestonesRef.current, {
        scale: 0.96,
        y: -40,
        opacity: 0.3,
        duration: 4,
        ease: "power2.inOut"
      }, ">+1");

      tl.to(imgMotionRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power3.inOut"
      }, "<");

      tl.to(imgStack2Ref.current, {
        opacity: 1,
        duration: 3,
        ease: "power3.out"
      }, "<+1");

      tl.to(cardStackRef.current, {
        y: 0,
        opacity: 1,
        duration: 5,
        ease: "power2.out"
      }, "<+0.5");
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(imgStack2Ref.current, {
        scrollTrigger: {
          trigger: imgStack2Ref.current,
          start: "top 85%",
          end: "center center",
          scrub: 1,
        },
        y: 100,
        scale: 0.9,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "power2.out"
      });

      // First Card (Motion Portrait) Animation for Mobile
      gsap.from(imgMotionMobileRef.current, {
        scrollTrigger: {
          trigger: imgMotionMobileRef.current,
          start: "top 85%",
          end: "center center",
          scrub: 1,
        },
        y: 100,
        scale: 0.9,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "power2.out"
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} data-navbar-theme="dark" className="relative w-full min-h-screen md:h-screen bg-white overflow-x-hidden md:overflow-hidden flex flex-col md:block">

      {/* 1. LAYER: TEXT (BEHIND IMAGES - z-0) */}
      <div
        ref={titleGroupRef}
        className="relative md:absolute inset-0 flex flex-col items-center md:justify-center justify-start z-0 select-none md:pointer-events-none text-center px-4 sm:px-6 md:px-0 pt-8 sm:pt-12 pb-6 sm:pb-8 md:py-0"
      >
        <span className="text-[9px] sm:text-[10px] md:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-black/30 mb-3 sm:mb-6 uppercase">
          TOP RATED GLOBAL DIGITAL AGENCY
        </span>
        <h2 className="text-[clamp(1.6rem,7vw,6rem)] font-bold text-black leading-[1.1] uppercase tracking-[-1px] sm:tracking-[-1.6px] lg:tracking-tight mb-6 sm:mb-10 max-w-[90vw] md:max-w-none">
          BUILDING BRANDS,<br />
          DRIVING GROWTH,<br />
          GROWING BEYOND LIMITS
        </h2>

        {/* Scroll Indicator */}
        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center bg-white/50 backdrop-blur-sm mt-2 sm:mt-4 hidden md:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 13l5 5 5-5M12 6v12" />
          </svg>
        </div>
      </div>

      {/* MOBILE ONLY: FIRST CARD (Motion Portrait) */}
      <div className="md:hidden w-full px-0 mb-12">
        <div ref={imgMotionMobileRef} className="w-full h-[50vh] overflow-hidden">
          <img
           src="/MIDIS/f7061bc55a7cf09a527cfce4804a6977.jpg"
            alt="Motion Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2. LAYER: COLLAGE ASSETS (IN FRONT - z-10+) */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-10">
        {/* ... (Existing Desktop Images) ... */}
        {/* Guy Portrait */}
        <div
          ref={imgGuyRef}
          className="absolute left-[18%] top-[25%] w-[21vw] aspect-[3/4.4] overflow-hidden shadow-2xl z-20"
        >
          <img
            src="/MIDIS/f7061bc55a7cf09a527cfce4804a6977.jpg"
            alt="Main Portrait"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gold Shape */}
        <div
          ref={imgGoldRef}
          className="absolute left-[30%] top-[15%] w-[13vw] aspect-square z-30 pointer-events-none"
        >
          <img
            src="/MIDIS/Blog-6-2.png"
            alt="Gold Asset"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Orange Fruit */}
        <div
          ref={imgOrangeRef}
          className="absolute left-[37%] top-[54%] w-[11vw] aspect-square z-25 pointer-events-none"
        >
          <img
            src="/images/growth (14).avif"
            alt="Orange"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Large Blur Center Portrait */}
        <div
          ref={imgMotionRef}
          className="absolute left-[47%] top-[10%] w-[25vw] h-[35vw] overflow-hidden z-10"
        >
          <img
               src="/MIDIS/72dc388e327d089bca87f77834fa5c46 (1).jpg"
            alt="Motion Portrait"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Robot */}
        <div
          ref={imgRobotRef}
          className="absolute left-[68%] top-[32%] w-[19vw] aspect-[4/3] z-20"
        >
          <img
            src="/images/growth (15).avif"
            alt="Asset"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* 3. LAYER: FINAL MILESTONES (In Front) */}
      <div
        ref={milestonesRef}
        className="relative md:absolute inset-0 flex z-40 md:pointer-events-none"
      >
        <div className="hidden md:block w-1/2 h-full" />
        <div className="w-full md:w-1/2 min-h-0 md:min-h-screen md:h-full bg-white flex flex-col items-center md:justify-center justify-start pointer-events-auto shadow-[-20px_0_50px_rgba(0,0,0,0.05)] pt-6 pb-12 md:py-8">
          <div className="w-full max-w-2xl px-6 md:px-12 lg:px-16">
            <h2 className="milestone-reveal text-[30px] md:text-[clamp(2rem,4vw,3.2rem)] font-bold text-black leading-[1.1] mb-8 md:mb-10 tracking-[-1.6px] lg:tracking-tight uppercase">
              RESULTS THAT<br />
              POWER REAL<br />
              BUSINESS GROWTH
            </h2>

            <div className="grid grid-cols-2 relative border-t border-black/10">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10"></div>
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/10"></div>

              <div className="pt-6 pb-8 md:pt-8 md:pb-10 px-4 md:px-6">
                <span className="milestone-reveal block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  CLIENT ROI<br />INCREASE
                </span>
                <div className="flex items-center gap-3 relative">
                  <span className="absolute -left-4 w-1.5 h-1.5 rounded-full bg-red-500 milestone-reveal"></span>
                  <span className="milestone-reveal block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">3.4X</span>
                </div>
              </div>

              <div className="pt-6 pb-8 md:pt-8 md:pb-10 px-4 md:px-6">
                <span className="milestone-reveal block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  ORGANIC TRAFFIC<br />GROWTH
                </span>
                <span className="milestone-reveal block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">120%</span>
              </div>

              <div className="pt-8 pb-6 md:pt-10 md:pb-8 px-4 md:px-6">
                <span className="milestone-reveal block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  SUPPORT COST<br />SAVINGS
                </span>
                <span className="milestone-reveal block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">40%</span>
              </div>

              <div className="pt-8 pb-6 md:pt-10 md:pb-8 px-4 md:px-6">
                <span className="milestone-reveal block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-400 mb-3 md:mb-4 font-bold leading-tight">
                  CSAT SCORE<br />IMPROVEMENT
                </span>
                <span className="milestone-reveal block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">+25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={cardStackRef}
        className="relative md:absolute inset-0 flex flex-col md:flex-row z-50 md:pointer-events-none"
      >
        <div ref={imgStack2Ref} className="block w-full h-[50vh] md:w-1/2 md:h-full overflow-hidden">
          <img
            src="/MIDIS/71c06f41f9f6c6715b4de3690ed53236 copy.jpg"
            alt="Stack 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 min-h-0 md:min-h-screen md:h-full bg-white flex flex-col items-center md:justify-center justify-start pointer-events-auto shadow-[-20px_0_50px_rgba(0,0,0,0.05)] pt-6 pb-12 md:py-8">
          <div className="w-full max-w-2xl px-6 md:px-12 lg:px-16">
            <h2 className="text-[30px] md:text-[clamp(2rem,4vw,3.2rem)] font-bold text-black leading-[1.1] mb-8 md:mb-10 tracking-[-1.6px] lg:tracking-tight uppercase">
              WHY TOP BRANDS<br />
              TRUST OUR<br />
              EXPERTISE
            </h2>

            <div className="grid grid-cols-2 relative border-t border-black/10">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10"></div>
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/10"></div>

              <div className="pt-6 pb-8 md:pt-8 md:pb-10 px-4 md:px-6">
                <span className="block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  GLOBAL BRANDING<br />SOLUTIONS
                </span>
                <div className="flex items-center gap-3 relative">
                  <span className="absolute -left-4 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">360°</span>
                </div>
              </div>

              <div className="pt-6 pb-8 md:pt-8 md:pb-10 px-4 md:px-6">
                <span className="block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  DEDICATED TEAM<br />EXPERTS
                </span>
                <span className="block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">15+</span>
              </div>

              <div className="pt-8 pb-6 md:pt-10 md:pb-8 px-4 md:px-6">
                <span className="block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  TRANSPARENT<br />COMMUNICATION
                </span>
                <span className="block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">100%</span>
              </div>

              <div className="pt-8 pb-6 md:pt-10 md:pb-8 px-4 md:px-6">
                <span className="block text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 mb-3 md:mb-4 font-bold leading-tight">
                  LONG-TERM<br />PARTNERSHIPS
                </span>
                <span className="block text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-[#141414] leading-none">YES</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute inset-0 opacity-[0.02] pointer-events-none z-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </section>
  );
}