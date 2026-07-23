import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ReasonItem = {
  number: string;
  title: string;
  image: string;
};

const items: ReasonItem[] = [
  {
    number: "01.",
    title: "PROVEN ROI &\nDIGITAL GROWTH",
    image: "/MIDIS/photo-1504868584819-f8e8b4b6d7e3.avif",
  },
  {
    number: "02.",
    title: "CREATIVE MASTERY &\nBRAND STRATEGY",
    image: "/MIDIS/BRANDING.webp",
  },
  {
    number: "03.",
    title: "TECHNICAL SEO &\nPERFORMANCE",
    image: "/MIDIS/SEOOOOOOO.webp",
  },
  {
    number: "04.",
    title: "SOCIAL MEDIA &\nAD EXPERTS",
    image: "/MIDIS/SOCIAL MED.avif",
  },
];

export const ReasonsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const switchRef = useRef<HTMLDivElement | null>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useRef(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!sectionRef.current || !switchRef.current) return;

    const ctx = gsap.context(() => {
      /* ================= HEADING ANIMATION ================= */
      gsap.fromTo(
        ".reason-line",
        {
          y: 60,
          opacity: 0,
          rotateX: -20,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* ================= SWITCH SCROLL ================= */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const backgrounds = bgRefs.current.filter(Boolean) as HTMLDivElement[];
        const cards = itemRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(backgrounds, { opacity: 0, scale: 1.05, filter: "blur(10px)" });
        gsap.set(backgrounds[0], { opacity: 1, scale: 1, filter: "blur(0px)" });
        cards[0]?.classList.add("active");

        ScrollTrigger.create({
          trigger: switchRef.current,
          start: "top top",
          end: `+=${items.length * 120}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,

          onUpdate: (self) => {
            const index = Math.min(
              items.length - 1,
              Math.floor(self.progress * (items.length - 0.01))
            );

            if (index === activeIndex.current) return;

            const prevIndex = activeIndex.current;
            activeIndex.current = index;

            gsap.to(backgrounds[index], {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(backgrounds[prevIndex], {
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
              duration: 0.6,
              ease: "power2.inOut",
            });

            cards.forEach((card) => card.classList.remove("active"));
            cards[index]?.classList.add("active");
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-navbar-theme="dark" className="bg-white overflow-hidden">
      {/* ================= HEADING ================= */}
      <div className="py-10 sm:py-16 md:py-24 lg:py-28 flex items-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 md:px-16 lg:px-24">
          <h2
            className="uppercase font-black leading-[0.9] text-black
            text-[38px] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[6.2rem]
            tracking-[-2px] lg:tracking-tighter"
          >
            <span className="reason-line block">WHY CHOOSE</span>
            <span className="reason-line block">MIDIS FOR YOUR</span>
            <span className="reason-line block text-orange-500">
              SUCCESS
            </span>
          </h2>
        </div>
      </div>

      {/* ================= DESKTOP SWITCH SECTION ================= */}
      <div ref={switchRef} className="relative hidden md:block">
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            border-t border-gray-100
            bg-white
          "
        >
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="
                reason-item
                p-6 sm:p-10
                border-b lg:border-b-0
                border-r
                border-gray-100
                transition-all
                duration-500
                flex flex-col justify-between
                min-h-[160px] md:min-h-[220px]
              "
            >
              <p className={`text-[10px] md:text-sm font-bold transition-colors duration-500 
                ${activeIndex.current === i ? "text-black" : "text-gray-300"}
              `}>
                {item.number}
              </p>

              <h3 className="text-sm sm:text-lg md:text-xl font-bold whitespace-pre-line leading-[1.2] text-black mt-4">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="relative h-[60vh] sm:h-[70vh] md:h-[90vh] overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => (bgRefs.current[i] = el)}
              className="absolute inset-0"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE ACCORDION SECTION ================= */}
      <div className="md:hidden flex flex-col w-full border-t border-gray-100 bg-white">
        {items.map((item, i) => {
          const isActive = activeMobileIndex === i;
          return (
            <div key={i} className="border-b border-gray-100 flex flex-col">
              <button
                onClick={() => setActiveMobileIndex(isActive ? null : i)}
                className={`text-left p-6 w-full flex flex-col transition-colors duration-300 ${isActive ? "bg-[#fafafa]" : "bg-white"
                  }`}
              >
                <div className="flex justify-between items-center w-full">
                  <p
                    className={`text-[10px] font-bold transition-colors duration-300 ${isActive ? "text-black" : "text-gray-300"
                      }`}
                  >
                    {item.number}
                  </p>
                  <div
                    className={`transform transition-transform duration-300 text-gray-400 ${isActive ? "rotate-180" : ""
                      }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-[17px] font-black tracking-tight whitespace-pre-line leading-[1.2] text-black mt-4 uppercase">
                  {item.title}
                </h3>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="relative w-full">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-auto block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= ACTIVE STYLE ================= */}
      <style>{`
        .reason-item {
          position: relative;
          overflow: hidden;
        }

        .reason-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 4px;
          background: #000;
          transition: width 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 10;
        }

        .reason-item.active::before {
          width: 100%;
        }

        .reason-item.active {
          background-color: #fafafa;
        }
        
        @media (max-width: 768px) {
          .reason-item h3 {
            font-size: 14px;
            letter-spacing: -0.02em;
          }
        }
      `}</style>
    </section>
  );
};