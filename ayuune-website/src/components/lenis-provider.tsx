"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type LenisContextValue = {
  ready: boolean;
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement, opts?: { duration?: number }) => void;
};

const LenisContext = createContext<LenisContextValue>({
  ready: false,
  getLenis: () => null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReady(true);
      return;
    }

    const lenis = new Lenis({
      lerp: 0.06,
      wheelMultiplier: 0.63,
      touchMultiplier: 0.7,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    setReady(true);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setReady(false);
    };
  }, []);

  const value = useMemo<LenisContextValue>(
    () => ({
      ready,
      getLenis: () => lenisRef.current,
      scrollTo: (target, opts) => {
        const lenis = lenisRef.current;
        if (!lenis) {
          const el =
            typeof target === "string"
              ? document.querySelector(target)
              : target;
          el?.scrollIntoView({ behavior: "smooth" });
          return;
        }
        const el =
          typeof target === "string" ? document.querySelector(target) : target;
        if (el)
          lenis.scrollTo(el as HTMLElement, {
            duration: opts?.duration ?? 1.6,
          });
      },
    }),
    [ready],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
