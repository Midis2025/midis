import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// iOS Safari changes the viewport height whenever its address bar collapses or
// expands mid-scroll. Each of those fires a resize, which refreshes every pin.
// This tells ScrollTrigger to ignore height-only resizes on touch devices.
//
// Deliberately NOT ScrollTrigger.normalizeScroll(): it takes over touch and wheel
// input, which is what Lenis is already doing. The two fight.
//
// NOTE: not importing ./lib/gsap-config here on purpose — that file is currently
// unused, and importing it would apply gsap.defaults({duration: 0.8, ease:
// "power3.out"}) to every tween on the site.
ScrollTrigger.config({ ignoreMobileResize: true });

createRoot(document.getElementById("root")!).render(<App />);
