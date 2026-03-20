import { useEffect, useRef } from 'react';

/**
 * Sets --scroll-progress CSS custom property on documentElement
 * without triggering React re-renders.
 * Returns a ref-based getter for imperative reads.
 */
export function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        progressRef.current = p;

        // Push to CSS without React re-render
        document.documentElement.style.setProperty('--scroll-progress', String(p));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progressRef.current; // only used for initial render
}
