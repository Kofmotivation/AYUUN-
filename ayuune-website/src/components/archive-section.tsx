"use client";

import { chapters } from "@/data/content";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ArchiveSection() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.row));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-row]").forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const ease = "cubic-bezier(.2,.7,.2,1)";
  const activeChapter = chapters[active];

  return (
    <section
      id="archive"
      aria-labelledby="archive-title"
      className="bg-archive px-[clamp(20px,4vw,56px)] pt-[clamp(140px,22vh,260px)] pb-[clamp(64px,10vh,120px)] text-archive-fg"
    >
      <div className="mb-[clamp(48px,8vh,96px)] flex flex-wrap items-end justify-between gap-8">
        <h2
          id="archive-title"
          data-fade="1"
          className="m-0 font-serif text-[clamp(46px,5.8vw,96px)] leading-[0.96] font-light uppercase"
        >
          Seven places.
          <br />
          Seven chapters.
          <br />
          <em className="font-serif text-gold not-italic italic normal-case">
            One evolving identity.
          </em>
        </h2>
        <div
          data-fade="1"
          className="flex max-w-[36ch] flex-col gap-[22px]"
        >
          <p className="m-0 text-[15px] leading-[1.7] text-archive-muted">
            Every object begins somewhere. The archive follows the places that
            shaped the house — one chapter at a time.
          </p>
          <div>
            <a
              href="#archive"
              data-cursor="Archive"
              className="inline-flex items-center gap-3.5 border border-archive-fg/50 px-[22px] py-3.5 text-[11px] tracking-[0.15em] text-archive-fg uppercase"
            >
              Explore the archive <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-[clamp(32px,5vw,96px)]">
        <div className="min-w-0 flex-[7_1_440px]">
          <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center">
            <figure className="relative m-0 h-[min(56vh,520px)] w-full overflow-hidden bg-[#2E2621] md:h-[min(78vh,820px)]">
              {chapters.map((c, i) => {
                const on = i === active;
                return (
                  <Image
                    key={c.name}
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className="object-cover will-change-[opacity,transform]"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "scale(1)" : "scale(1.08)",
                      transition: reduced
                        ? "none"
                        : `opacity 1.2s ${ease}, transform 2s ${ease}`,
                    }}
                  />
                );
              })}
              {chapters.map((c, i) => {
                const on = i === active;
                return (
                  <Image
                    key={`${c.name}-place`}
                    src={c.place}
                    alt={`Archival photograph strip from ${c.city}`}
                    width={132}
                    height={352}
                    className="absolute right-[clamp(16px,3vw,40px)] bottom-[clamp(16px,3vw,40px)] aspect-[3/8] w-[clamp(84px,9vw,132px)] border-[6px] border-background object-cover shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on
                        ? "translateY(0) rotate(3deg)"
                        : "translateY(24px) rotate(-2deg)",
                      transition: reduced
                        ? "none"
                        : `opacity 1.2s ${ease}, transform 2s ${ease}`,
                    }}
                  />
                );
              })}
              <figcaption className="absolute inset-x-0 top-0 flex justify-between bg-gradient-to-b from-archive/55 to-transparent px-[22px] py-5 font-mono text-[10.5px] tracking-[0.16em] text-archive-fg uppercase">
                <span>
                  Chapter 0{active + 1} — {activeChapter.name}
                </span>
                <span>0{active + 1} / 07</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <ol
          aria-label="Seven chapters"
          className="m-0 flex list-none flex-[5_1_360px] flex-col py-8 md:py-[12vh] md:pb-[20vh]"
        >
          {chapters.map((c, i) => {
            const on = i === active;
            return (
              <li
                key={c.name}
                data-row={i}
                tabIndex={0}
                data-cursor={c.city}
                className="flex min-h-[28vh] flex-col justify-center gap-3.5 border-t border-archive-fg/14 outline-none transition-opacity duration-[600ms] md:min-h-[34vh]"
                style={{ opacity: on ? 1 : 0.34 }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <div className="flex items-baseline gap-[22px]">
                  <span className="font-mono text-[11px] text-gold">
                    0{i + 1}
                  </span>
                  <h3
                    className="m-0 font-serif text-[clamp(34px,3.6vw,60px)] leading-none font-light uppercase transition-transform duration-800"
                    style={{
                      transform: on ? "translateX(10px)" : "translateX(0)",
                      transitionTimingFunction: ease,
                    }}
                  >
                    {c.name}
                  </h3>
                </div>
                <p className="ml-11 max-w-[34ch] font-serif text-[19px] leading-[1.4] text-[#E4DACB] italic">
                  {c.line}
                </p>
                <p className="ml-11 font-mono text-[10px] tracking-[0.16em] text-gold uppercase">
                  {c.city} · {c.coords}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
