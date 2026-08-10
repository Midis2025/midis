import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    const ctx = gsap.context(() => {
      /* ================= TEXT REVEAL ================= */
      gsap.from(".cta-text span", {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      /* ================= PIN + IMAGE ZOOM ================= */
      // Centre via GSAP so it owns the transform and `scale` composes with it.
      gsap.set(imageWrap, { xPercent: -50, yPercent: -50 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%", // ~2 scrolls
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Uniform scale instead of width/height: composited, no layout per frame.
        // Function-based so it re-measures on ScrollTrigger.refresh (resize).
        tl.to(imageWrap, {
          scale: () =>
            Math.max(
              (window.innerWidth * 1.5) / imageWrap.offsetWidth,
              (window.innerHeight * 1.5) / imageWrap.offsetHeight
            ),
          borderRadius: "0px",
          ease: "power2.inOut",
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Just empty here to allow normal scrolling without pin logic
        // The image is hidden via CSS (.hidden md:inline-flex)
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-navbar-theme="dark"
      className="relative min-h-[60svh] md:min-h-[100svh] bg-white overflow-hidden flex items-center"
    >
      {/* 👇 text-black added here */}
      <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1680px] 2xl:max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 text-center text-black">

        {/* 👇 color changed to black */}
        <p className="text-xs sm:text-sm xl:text-base tracking-widest uppercase mb-8 sm:mb-10 text-black font-semibold">
          JOIN US TODAY!
        </p>

        {/* LINE 1 */}
        <div className="flex flex-wrap justify-center mb-2 sm:mb-6">
          <span className="cta-text text-[clamp(42px,10vw,5rem)] md:text-[clamp(50px,5vw,6rem)] lg:text-[clamp(60px,5.2vw,6.8rem)] xl:text-[clamp(72px,6vw,8.5rem)] 2xl:text-[clamp(84px,6.5vw,10rem)] font-extrabold overflow-hidden tracking-[-1.2px] md:tracking-[-1.6px] lg:tracking-tighter leading-[1.1]">
            <span className="inline-block">LET&apos;S BUILD</span>
          </span>
        </div>

        {/* LINE 2 */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-2 sm:mb-6 px-2">
          <span className="cta-text text-[clamp(42px,10vw,5rem)] md:text-[clamp(50px,5vw,6rem)] lg:text-[clamp(60px,5.2vw,6.8rem)] xl:text-[clamp(72px,6vw,8.5rem)] 2xl:text-[clamp(84px,6.5vw,10rem)] font-extrabold overflow-hidden tracking-[-1.2px] md:tracking-[-1.6px] lg:tracking-tighter leading-[1.1]">
            <span className="inline-block">SOMETHING</span>
          </span>

          {/* INLINE IMAGE - Hidden on mobile */}
          <span className="hidden md:inline-flex relative w-20 h-10 sm:w-28 sm:h-16 lg:w-44 lg:h-22 xl:w-52 xl:h-26 2xl:w-60 2xl:h-30 shrink-0 align-middle">
            <span
              ref={imageWrapRef}
              className="
                absolute
                top-1/2 left-1/2
                w-full h-full
                rounded-full
                overflow-hidden
                will-change-transform
              "
              style={{ zIndex: 50 }}
            >
              <img
                src="/MIDIS/growth (33).avif"
                alt="CTA"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </span>
          </span>

          <span className="cta-text text-[clamp(42px,10vw,5rem)] md:text-[clamp(50px,5vw,6rem)] lg:text-[clamp(60px,5.2vw,6.8rem)] xl:text-[clamp(72px,6vw,8.5rem)] 2xl:text-[clamp(84px,6.5vw,10rem)] font-extrabold overflow-hidden tracking-[-1.2px] md:tracking-[-1.6px] lg:tracking-tighter leading-[1.1]">
            <span className="inline-block">AMAZING</span>
          </span>
        </div>

        {/* LINE 3 */}
        <div className="flex flex-wrap justify-center mb-10 sm:mb-14">
          <span className="cta-text text-[clamp(42px,10vw,5rem)] md:text-[clamp(50px,5vw,6rem)] lg:text-[clamp(60px,5.2vw,6.8rem)] xl:text-[clamp(72px,6vw,8.5rem)] 2xl:text-[clamp(84px,6.5vw,10rem)] font-extrabold overflow-hidden tracking-[-1.2px] md:tracking-[-1.6px] lg:tracking-tighter leading-[1.1]">
            <span className="inline-block">TOGETHER</span>
          </span>
        </div>

        {/* BUTTON */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-black text-white text-sm font-semibold hover:scale-105 transition-transform"
        >
          LET&apos;S GET STARTED →
        </Link>
      </div>
    </section>
  );
};
