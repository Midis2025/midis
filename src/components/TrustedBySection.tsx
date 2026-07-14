import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        rating: 5,
        text: "Bribon's combination of creativity and technical skill is unmatched. Their team delivered a product that not only looks great but works exactly as we envisioned. They are reliable and trustworthy.",
        name: "shivani",
        role: "CEO & Founder @Lunor",
        img: "/images/shivii.jpg",
        bgColor: "bg-black", // black matching user request
        textColor: "text-white",
        rotate: "-rotate-2",
    },
    {
        rating: 5,
        text: "Bribon is creative, reliable, and highly skilled. They transformed our ideas into a digital product that exceeded our expectations, all while keeping the process smooth and collaborative. Their work is effortless.",
        name: "Walter Charles",
        role: "CEO & Founder @Mavrix",
        img: "https://www.midis.in/image/member1.jpg",
        bgColor: "bg-[#f4f4f4]", // light gray
        textColor: "text-black",
        rotate: "rotate-1",
    },
    {
        rating: 5,
        text: "We were looking for a partner who could bring both creativity and technical skill to the table, and Bribon delivered on every front. Their team guided us through design decisions, suggested improvements we hadn't considered.",
        name: "Julian Hart",
        role: "CEO & Founder @Avola",
        img: "https://www.midis.in/image/member2.jpg",
        bgColor: "bg-black", // black matching user request
        textColor: "text-white",
        rotate: "-rotate-1",
    },
    {
        rating: 5,
        text: "What I appreciate most about Bribon is their ability to balance aesthetics with performance. The website they built for us is visually stunning, fast, and easy to manage. Their ongoing support and responsiveness is on another level.",
        name: "James Porter",
        role: "CEO & Founder @Lumora",
        img: "https://www.midis.in/image/member3.jpg",
        bgColor: "bg-[#f4f4f4]", // light gray
        textColor: "text-black",
        rotate: "rotate-2",
    },
    {
        rating: 5,
        text: "Their team didn't just deliver a product; they became an extension of our team. From the initial brainstorming sessions to the final launch, their attention to detail, creativity, and technical expertise was outstanding.",
        name: "Michael James",
        role: "Founder @Nexora",
        img: "https://www.midis.in/image/member4.jpg",
        bgColor: "bg-[#f4f4f4]", // light gray
        textColor: "text-black",
        rotate: "-rotate-1",
    }
];

// We need to double the array so marquee loops smoothly
const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

export const TrustedBySection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        // Optional GSAP entrance animation for heading
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".trusted-fade",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-white overflow-hidden flex flex-col items-center">
            {/* Heading */}
            <div className="text-center px-4 max-w-3xl mb-12 md:mb-20 trusted-fade">
                <h2 className="text-[48px] leading-[0.9] sm:text-[70px] md:text-[85px] font-bold text-black tracking-tighter mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                    Trusted by<br />
                    +50 founders
                </h2>
                <p className="text-gray-700 text-[15px] sm:text-[16px] md:text-[17px] font-medium leading-relaxed max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
                    Every project tells a story of trust and results. Hear from the founders who built their digital presence with us.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden trusted-fade pb-10">
                <div className="flex w-[max-content] animate-marquee hover:[animation-play-state:paused] gap-6 px-3">
                    {marqueeItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`
                flex-shrink-0
                w-[300px] sm:w-[350px] md:w-[400px]
                p-8 md:p-10
                rounded-3xl
                flex flex-col
                justify-between
                shadow-sm hover:shadow-xl transition-shadow duration-300
                ${item.bgColor}
                ${item.textColor}
                ${item.rotate}
                hover:rotate-0 transition-transform cursor-pointer
              `}
                            style={{ minHeight: "440px" }}
                        >
                            <div className="flex flex-col flex-grow">
                                {/* Stars */}
                                <div className="flex gap-1 mb-8">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <svg key={i} className="w-[18px] h-[18px] text-[#f49e41] fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="font-medium text-[17px] sm:text-[19px] leading-[1.6] mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
                                    {item.text}
                                </p>
                            </div>

                            {/* Profile */}
                            <div className="flex items-center gap-4 pt-6 mt-auto">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full object-cover bg-white/10"
                                />
                                <div style={{ fontFamily: "Inter, sans-serif" }}>
                                    <h4 className="font-bold text-[15px] leading-tight">{item.name}</h4>
                                    <p className="text-[13px] opacity-80 leading-tight mt-1">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
