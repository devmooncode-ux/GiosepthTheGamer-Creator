import { useEffect, useRef } from 'react';

export function useLenis() {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let rafId: number;

    async function init() {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      rafId = requestAnimationFrame(function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      });
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenisRef.current && typeof (lenisRef.current as { destroy: () => void }).destroy === 'function') {
        (lenisRef.current as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return lenisRef;
}
