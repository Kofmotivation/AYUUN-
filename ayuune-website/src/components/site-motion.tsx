"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLenis } from "@/components/lenis-provider";

gsap.registerPlugin(ScrollTrigger);

let preloaderDone = false;

export function SiteMotion() {
  const { getLenis, ready } = useLenis();

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let onLoad: (() => void) | undefined;
    let t: number | undefined;
    let t2: number | undefined;

    const start = async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* ignore font readiness failures */
      }
      if (cancelled) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const q = (s: string) => document.querySelector(s) as HTMLElement | null;
      const qa = (s: string) =>
        Array.from(document.querySelectorAll(s)) as HTMLElement[];
      const lenis = getLenis();

      // Homepage-only motion: skip pin/scrub work on shop & editorial routes.
      const isHome = Boolean(q("[data-hero]"));
      if (!isHome) {
        const pl = q("[data-pl]");
        if (pl) pl.style.display = "none";
        ScrollTrigger.getAll().forEach((st) => st.kill());
        return;
      }

      ctx = gsap.context(() => {
        const pl = q("[data-pl]");

        const heroIn = () => {
          if (reduced) {
            qa("[data-line]").forEach((el) => el.classList.add("is-in"));
            gsap.set(
              ["[data-fade-in]", "[data-polaroid]", "[data-hero-cover]"],
              { clearProps: "all", opacity: 1, y: 0, scaleY: 0 },
            );
            return;
          }
          gsap
            .timeline()
            .fromTo(
              "[data-hero-cover]",
              { scaleY: 1 },
              { scaleY: 0, duration: 1.6, ease: "expo.inOut" },
              0,
            )
            .fromTo(
              "[data-hero-img]",
              { scale: 1.25 },
              { scale: 1, duration: 2.4, ease: "expo.out" },
              0.2,
            )
            .add(() => {
              qa("[data-line]").forEach((el, i) => {
                window.setTimeout(() => el.classList.add("is-in"), i * 120);
              });
            }, 0.35)
            .fromTo(
              "[data-fade-in]",
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out",
                stagger: 0.08,
              },
              0.8,
            )
            .fromTo(
              "[data-polaroid]",
              { opacity: 0, y: 60, rotate: 12 },
              {
                opacity: 1,
                y: 0,
                rotate: 4,
                duration: 1.6,
                ease: "expo.out",
              },
              1,
            );
        };

        if (!reduced) {
          qa("[data-line]").forEach((el) => el.classList.remove("is-in"));
          gsap.set("[data-fade-in]", { opacity: 0, y: 18 });
          gsap.set("[data-polaroid]", { opacity: 0 });
          gsap.set("[data-hero-cover]", { scaleY: 1 });
          gsap.set("[data-fade]", { opacity: 0, y: 40 });
          gsap.set("[data-reveal]", { scale: 1.3, opacity: 0 });
        } else {
          qa("[data-line]").forEach((el) => el.classList.add("is-in"));
        }

        if (pl && !reduced && !preloaderDone) {
          lenis?.stop();
          const cnt = q("[data-pl-count]");
          const o = { v: 0 };
          gsap
            .timeline({
              onComplete: () => {
                preloaderDone = true;
                pl.style.display = "none";
                lenis?.start();
                ScrollTrigger.refresh();
              },
            })
            .to(
              "[data-pl-mark]",
              { opacity: 1, duration: 1.8, ease: "power2.inOut" },
              0,
            )
            .to(
              "[data-pl-bar]",
              { scaleX: 1, duration: 2.2, ease: "power2.inOut" },
              0.2,
            )
            .to(
              o,
              {
                v: 100,
                duration: 2.2,
                ease: "power2.inOut",
                onUpdate: () => {
                  if (cnt)
                    cnt.textContent = String(Math.round(o.v)).padStart(3, "0");
                },
              },
              0.2,
            )
            .to(
              "[data-pl-mark]",
              { opacity: 0, y: -12, duration: 0.6, ease: "power2.in" },
              2.5,
            )
            .to(pl, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, 2.7)
            .add(heroIn, 3.0);
        } else {
          if (pl) pl.style.display = "none";
          heroIn();
        }

        if (reduced) return;

        gsap.to("[data-hero-fig]", {
          y: () => (q("[data-hero]")?.offsetHeight ?? 0) * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-polaroid]", {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        qa("[data-fade]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        qa("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.3, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top 98%",
                end: "top 45%",
                scrub: 1,
              },
            },
          );
        });

        const mm = gsap.matchMedia();
        mm.add("(min-width: 900px)", () => {
          const sec = q("[data-pin]");
          const track = q("[data-track]");
          const wrap = q("[data-track-wrap]");
          if (!sec || !track || !wrap) return;
          wrap.style.overflowX = "hidden";
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const tw = gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top top",
              end: () => "+=" + dist(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          gsap.fromTo(
            "[data-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top top",
                end: () => "+=" + dist(),
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
          qa("[data-par]").forEach((el) => {
            const card =
              el.closest("a") ?? el.parentElement?.parentElement ?? el;
            gsap.fromTo(
              el,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tw,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
          return () => {
            wrap.style.overflowX = "auto";
            gsap.set(track, { clearProps: "transform" });
          };
        });

        mm.add("(max-width: 899px)", () => {
          const wrap = q("[data-track-wrap]");
          const progress = q("[data-progress]");
          if (!wrap || !progress) return;
          const onScroll = () => {
            const max = wrap.scrollWidth - wrap.clientWidth;
            const ratio = max > 0 ? wrap.scrollLeft / max : 0;
            gsap.set(progress, { scaleX: ratio });
          };
          wrap.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
          return () => wrap.removeEventListener("scroll", onScroll);
        });

        onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        // Single coalesced refresh after images — avoid stacked 1.2s/3.2s thrash.
        const images = qa("img");
        let pending = images.length;
        let refreshed = false;
        const doRefresh = () => {
          if (refreshed || cancelled) return;
          refreshed = true;
          ScrollTrigger.refresh();
        };
        const maybeRefresh = () => {
          pending -= 1;
          if (pending <= 0) doRefresh();
        };
        if (images.length === 0) {
          t = window.setTimeout(doRefresh, 200);
        } else {
          images.forEach((img) => {
            if ((img as HTMLImageElement).complete) maybeRefresh();
            else {
              img.addEventListener("load", maybeRefresh, { once: true });
              img.addEventListener("error", maybeRefresh, { once: true });
            }
          });
          t2 = window.setTimeout(doRefresh, 2500);
        }
      });
    };

    void start();

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener("load", onLoad);
      if (t) window.clearTimeout(t);
      if (t2) window.clearTimeout(t2);
      ctx?.revert();
    };
  }, [getLenis, ready]);

  return null;
}
