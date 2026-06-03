"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  useEffect(() => {
    // Premium custom easing for architectural site feel
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6, // Enhances mobile touch scroll feeling
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Make it globally accessible for scroll triggering integrations if needed
    (window as any).lenis = lenis;

    // Standard body class cleanup
    document.documentElement.classList.add("lenis-scroll");

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("lenis-scroll");
    };
  }, []);

  return null;
}
