"use client";

import { journal } from "@/data/content";
import Image from "next/image";
import { useState } from "react";

export function JournalSection() {
  const [hoverJ, setHoverJ] = useState(-1);

  return (
    <section
      id="journal"
      aria-labelledby="journal-title"
      className="site-pad-x px-[clamp(20px,4vw,56px)] pt-[clamp(96px,14vh,160px)] pb-[clamp(80px,12vh,140px)]"
    >
      <div className="mb-[clamp(40px,6vh,72px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2
          id="journal-title"
          data-fade="1"
          className="m-0 font-serif text-[clamp(36px,4vw,64px)] leading-none font-light uppercase"
        >
          Notes from{" "}
          <em className="font-serif text-accent not-italic italic normal-case">
            the house
          </em>
        </h2>
        <p
          data-fade="1"
          className="m-0 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase"
        >
          03 — Craft &amp; Journal
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(20px,2vw,32px)]">
        {journal.map((j, i) => (
          <article
            key={j.title}
            data-fade="1"
            className="flex flex-col gap-[18px]"
            onMouseEnter={() => setHoverJ(i)}
            onMouseLeave={() => setHoverJ(-1)}
          >
            <a
              href="#journal"
              data-cursor={j.cta}
              aria-label={`${j.title} — ${j.cta}`}
              className="relative block aspect-[4/3] overflow-hidden bg-stone"
            >
              <Image
                data-reveal="1"
                src={j.img}
                alt={j.alt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover will-change-[transform,opacity]"
              />
            </a>
            <h3 className="m-0 font-serif text-[26px] font-light tracking-[0.04em] uppercase">
              {j.title}
            </h3>
            <p className="m-0 text-[14px] leading-[1.65] text-pretty text-body">
              {j.sub}
            </p>
            <a
              href="#journal"
              className="inline-flex items-center gap-3 self-start border-b border-current pb-1.5 text-[10.5px] tracking-[0.15em] uppercase"
            >
              {j.cta}{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500"
                style={{
                  transform:
                    hoverJ === i ? "translateX(6px)" : "translateX(0)",
                  transitionTimingFunction: "cubic-bezier(.2,.7,.2,1)",
                }}
              >
                →
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
