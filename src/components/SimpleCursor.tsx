import { useEffect, useRef, useState } from 'react';

/**
 * Simple Cursor Component
 * A subtle custom cursor that provides a premium feel without being distracting
 */
export const SimpleCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHidden) setIsHidden(false);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Position the dot immediately
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // Identify interactive elements
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const animateOutline = () => {
      // Smooth lerp for the outline
      const lerp = 0.15;
      outlineX += (mouseX - outlineX) * lerp;
      outlineY += (mouseY - outlineY) * lerp;

      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      requestAnimationFrame(animateOutline);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const animationFrame = requestAnimationFrame(animateOutline);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [isHidden]);

  return (
    <>
      {/* Small Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Circle Outline */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isPointer ? 'scale-150 bg-white/10' : 'scale-100'}`}
        style={{ mixBlendMode: 'difference' }}
      />

      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        @media (pointer: coarse) {
          .simple-cursor-elements {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
