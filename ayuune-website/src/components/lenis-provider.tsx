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

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Single RAF owner: GSAP ticker drives Lenis; no competing requestAnimationFrame.
    // Touch: syncTouch off so native momentum wins — avoids “junkie” rubber-band fights.
    const lenis = new Lenis({
      lerp: coarse ? 0.12 : 0.1,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;

    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("orientationchange", refresh);

    // One deferred refresh after layout — avoid stacked 1.2s/3.2s thrash from motion.
    const boot = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setReady(true);
    });

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
      lenis.scrollTo(target as HTMLElement, { duration: 1.2, offset: 0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.cancelAnimationFrame(boot);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      root.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
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
            duration: opts?.duration ?? 1.2,
          });
      },
    }),
    [ready],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
