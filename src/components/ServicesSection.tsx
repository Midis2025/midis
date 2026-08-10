"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal } from "@/components/SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "WEB DESIGNING",
    description:
      "Transform your vision into stunning digital experiences. Our expert designers craft responsive, user-centric interfaces that captivate your audience and elevate your brand's online presence with cutting-edge aesthetics.",
    tags: ["UI Design", "UX Strategy", "Responsive Design", "Prototyping"],
    image: "/MIDIS/Casual Tablet Reader Engaging Digital Magazine with Vivid Red Design.webp",
    color: "#FF6B35"
  },
  {
    number: "02",
    title: "WEB DEVELOPMENT",
    description:
      "Build powerful digital solutions with our full-stack development expertise. From concept to deployment, we create robust, scalable, and high-performing websites that drive growth and deliver exceptional user experiences.",
    tags: ["Frontend", "Backend", "Full Stack", "API Integration"],
    image: "/MIDIS/a54a634124ad63442b5f54bade85751d.webp",
    color: "#00BBF9"
  },
  {
    number: "03",
    title: "SEO OPTIMIZATION",
    description:
      "Dominate search rankings and drive organic traffic with our strategic SEO solutions. We optimize every aspect of your digital presence to increase visibility, engage your target audience, and maximize conversions.",
    tags: ["On-Page SEO", "Technical SEO", "Content Strategy", "Link Building"],
    image: "/MIDIS/1981-digital-bMWHu8wU1Vk-unsplash.webp",
    color: "#F9C74F"
  },
  {
    number: "04",
    title: "GRAPHIC DESIGNING",
    description:
      "Create compelling visual narratives that resonate with your audience. Our creative designers blend artistry with strategy to produce captivating graphics, branding assets, and visual content that sets you apart.",
    tags: ["Branding", "Logo Design", "Marketing Materials", "Visual Identity"],
    image: "/MIDIS/96b1e114eb9429fbaa1184628477472d.webp",
    color: "#F94144"
  },
  {
    number: "05",
    title: "GOOGLE & META ADS",
    description:
      "Maximize your advertising ROI with data-driven paid campaigns. Our specialists craft and optimize high-converting ads across Google and Meta platforms.",
    tags: ["Google Ads", "Facebook Ads", "Campaign Management", "Analytics"],
    image: "/MIDIS/53c12dc9df93a32c024fd34facd4139a.webp",
    color: "#90BE6D"
  },
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Handed down so each panel's SplitReveal measures along the track's x axis.
  const [trackTween, setTrackTween] = useState<gsap.core.Tween | null>(null);

  // Deliberately useEffect, not useGSAP: useGSAP runs on useLayoutEffect, which
  // fires before the useEffect every sibling section uses. That created this
  // pinned trigger before the earlier sections' pin spacers existed, so it
  // measured its start ~3600px too high and overlapped CrearistCollage's pin.
  // ScrollTriggers must be created in page order.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop only. A pinned horizontal track on a phone fights the browser's
      // own gesture handling, so small screens keep the vertical stack.
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          // Required: any other ease breaks the 1:1 scroll-to-position mapping.
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        setTrackTween(tween);
        return () => setTrackTween(null);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B0B0B] antialiased text-white relative overflow-hidden py-10 sm:py-0"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:h-screen md:items-center md:will-change-transform"
      >
        {services.map((service) => (
          <div
            key={service.number}
            // 80vw leaves the next panel peeking, which is what tells the eye
            // this section moves sideways.
            className="service-item w-full md:w-[80vw] md:shrink-0 px-4 sm:px-6 lg:px-12 md:px-16 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 group"
          >
              <div className="py-2">
                {/* 1. TITLE & NUMBER HEADER */}
                <div className="relative w-full flex justify-between items-end pb-8">
                  <div className="flex flex-col">
                    <span className="text-[12px] md:text-[16px] font-bold tracking-tight text-white/40 mb-2 md:mb-3">
                      {service.number}
                    </span>
                    <SplitReveal
                      as="h3"
                      chars
                      containerAnimation={trackTween}
                      // Sized to fit an 80vw panel minus padding and the arrow
                      // button; 7vw clipped the longer titles at the panel edge.
                      className="font-black tracking-tighter uppercase text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.85] mb-0 select-none text-white"
                    >
                      {service.title}
                    </SplitReveal>
                  </div>

                  <div className="mb-6 w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center bg-white text-black">
                    <svg
                      width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 7L17 17M17 17H7M17 17V7" />
                    </svg>
                  </div>
                </div>

                {/* 2. FULL CARD CONTENT */}
                <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-16 pt-8 pb-6">

                  {/* LEFT CONTENT: Desc + Tags */}
                  <div className="w-full md:w-[55%] flex flex-col justify-end">
                    <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-xl mb-10">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-4 mt-8">
                      {service.tags.map((tag) => (
                        <div
                          key={tag}
                          className="group/tag relative cursor-pointer"
                        >
                          {/* Background Marker Highlight */}
                          <div 
                            className="absolute -inset-x-2 inset-y-0.5 opacity-0 group-hover/tag:opacity-100 transition-all duration-300 rounded-sm"
                            style={{ backgroundColor: service.color }}
                          />
                          
                          <span 
                            className="relative z-10 text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/tag:text-black transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT CONTENT: Image (Static) */}
                  <div className="w-full md:w-[45%] flex justify-end">
                    <div className="w-full aspect-[4/3] md:aspect-[1.4/1] overflow-hidden rounded-3xl border border-white/5">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
};

