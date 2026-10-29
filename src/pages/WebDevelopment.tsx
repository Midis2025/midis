import { useEffect, useState } from "react";

const WebDevelopment = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Website Design & Development Services | MIDIS";

    // Pause parent Lenis smooth scroll while on the embedded landing page
    // so user interaction and scrolling inside the landing page works seamlessly
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    return () => {
      document.title = originalTitle;
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#0C0E12] z-50 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-orange-500 animate-spin" />
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-orange-500/10 blur-xl animate-pulse" />
          </div>
        </div>
      )}
      <iframe
        src="https://midis-landing-page.vercel.app/"
        title="Website Design & Development Services | MIDIS"
        className="w-full h-full border-0 outline-none"
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default WebDevelopment;

