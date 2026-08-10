"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface SplitRevealProps {
  children: ReactNode;
  className?: string;
  /** Rendered tag. Headings should stay headings for a11y and SEO. */
  as?: "h1" | "h2" | "h3" | "p" | "div";
  /** ScrollTrigger start. */
  start?: string;
  /** Seconds between each line. */
  stagger?: number;
  /** Split per character instead of per line. Use only on short text. */
  chars?: boolean;
  /**
   * The tween that moves this element horizontally, when it lives inside a
   * fake-horizontal-scroll track. Without it the trigger is measured against
   * vertical scroll and fires at the wrong moment (or never).
   */
  containerAnimation?: gsap.core.Tween | null;
}

/**
 * Masked line reveal for display type.
 *
 * `mask: "lines"` wraps each line in an overflow-clipped box so the line slides
 * up from behind its own edge instead of fading in — the reason this reads as
 * deliberate rather than as another fade-up.
 *
 * `autoSplit` re-splits when fonts finish loading or the element is resized,
 * which is why the animation is created inside (and returned from) onSplit:
 * SplitText then reverts and re-syncs it on every re-split.
 */
export const SplitReveal = ({
  children,
  className,
  as: Tag = "h2",
  start = "top 85%",
  stagger = 0.08,
  chars = false,
  containerAnimation = null,
}: SplitRevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      let split: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let cancelled = false;

      // Splitting before webfonts land measures the fallback face, which gives
      // wrong line breaks and logs "SplitText called before fonts loaded".
      document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return;

        split = SplitText.create(ref.current, {
          type: chars ? "words,chars" : "lines",
          mask: chars ? "chars" : "lines",
          // Only meaningful for lines (re-wrap on resize). On a chars split its
          // revert/re-split cycle drops the from-state and the text renders
          // already-revealed.
          autoSplit: !chars,
          onSplit(self) {
            tween = gsap.from(chars ? self.chars : self.lines, {
              yPercent: 120,
              duration: 0.9,
              ease: "expo.out",
              stagger: chars ? 0.02 : stagger,
              scrollTrigger: {
                trigger: ref.current,
                // Inside a horizontal track, start/end read along the x axis.
                start: containerAnimation ? "left 75%" : start,
                once: true,
                containerAnimation: containerAnimation ?? undefined,
              },
            });
            return tween;
          },
        });
      });

      // Created after the effect resolved, so it is outside useGSAP's context
      // and has to be torn down by hand.
      return () => {
        cancelled = true;
        tween?.scrollTrigger?.kill();
        tween?.kill();
        split?.revert();
      };
    },
    // Child effects run before the parent's, so containerAnimation arrives on a
    // later pass; re-split and rebuild the trigger when it does.
    { scope: ref, dependencies: [containerAnimation], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
};
