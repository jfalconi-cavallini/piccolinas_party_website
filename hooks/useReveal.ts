"use client";

import { useRef, useEffect } from "react";

/*
  useReveal — IntersectionObserver scroll-reveal hook.

  Returns a ref to attach to a DOM element. When that element crosses the
  viewport threshold, it gains [data-revealed] and the CSS transition in
  globals.css plays (opacity + translateY).

  Fires once and disconnects — no repeated re-hiding on scroll up.
  The initial hidden state is set by globals.css [data-reveal] selector,
  so elements start hidden in SSR too (no flash).
*/
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "");
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
