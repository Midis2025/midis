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
            duration: 2.5, // Much slower and more weighted
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.7, // Significantly reduced for much slower scrolling
            touchMultiplier: 2,
        });

        // 2. Connect Lenis to GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // 3. Cleanup on unmount
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return <>{children}</>;
};
