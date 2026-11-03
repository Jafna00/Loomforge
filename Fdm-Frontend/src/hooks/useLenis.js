import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../utils/gsapConfig.js';

/**
 * Sets up Lenis smooth scrolling and syncs it with GSAP's ticker so
 * ScrollTrigger-driven animations stay in lockstep with the scroll.
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    // Keep ScrollTrigger's calculations in sync with Lenis's virtual scroll,
    // otherwise scroll-tied animations (parallax, etc.) desync or freeze.
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP's ticker passes time in SECONDS, but Lenis's raf() expects
    // MILLISECONDS — without the *1000 conversion, Lenis thinks almost no
    // time has passed each frame and scrolling appears stuck/janky.
    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}