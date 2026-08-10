"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll component using Lenis for premium, controlled scrolling.
 * This component provides the "slow scrolling" feel the user requested.
 */
export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2, // Smoothing time. 2.5 felt disconnected from input.
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1, // 0.7 stacked on top of the slow duration; 4 wheel ticks moved only 280px
            touchMultiplier: 2,
        });

        // Store lenis on window so navigation / other components can pause it
        (window as any).lenis = lenis;

        if (import.meta.env.DEV) {
            (window as any).ScrollTrigger = ScrollTrigger;
        }

        // 2. Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Keep the same reference so ticker.remove() can actually find it
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);

        gsap.ticker.lagSmoothing(0);

        // 3. Cleanup on unmount
        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
            delete (window as any).lenis;
        };
    }, []);

    return <>{children}</>;
};
