"use client";

import { products } from "@/data/content";
import Image from "next/image";
import { useState } from "react";

export function FirstObjects() {
  const [hoverCard, setHoverCard] = useState(-1);

  return (
    <section
      id="objects"
      data-pin="1"
      aria-labelledby="objects-title"
      className="relative z-[2] flex min-h-svh flex-col justify-center border-t border-foreground/12 bg-background"
    >
      <div
        data-track-wrap="1"
        data-lenis-prevent
        className="w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] max-md:snap-x max-md:snap-mandatory"
      >
        <div
          data-track="1"
          className="flex w-max items-center gap-[clamp(20px,2.6vw,40px)] px-[clamp(20px,4vw,56px)] pt-[clamp(80px,12vh,120px)] pb-16 will-change-transform max-md:snap-x"
        >
          <div className="flex w-[clamp(300px,34vw,540px)] flex-col gap-7 pr-[clamp(0px,3vw,48px)]">
            <p className="m-0 font-mono text-[11px] tracking-[0.16em] text-muted">
              01
            </p>
            <h2
              id="objects-title"
              className="m-0 font-serif text-[clamp(54px,6.4vw,108px)] leading-[0.92] font-light uppercase"
            >
              First
              <br />
              objects
            </h2>
            <p className="m-0 max-w-[40ch] text-[15px] leading-[1.7] text-pretty text-body">
              A selection of clothing and bags to introduce the world of AYUUNË.
              Limited in number. Made to be noticed. Not made for everyone.
            </p>
            <div>
              <a
                href="#objects"
                data-cursor="Shop"
                className="inline-flex items-center gap-3.5 border-b border-current pb-[7px] text-[11px] tracking-[0.15em] uppercase"
              >
                Explore the collection <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {products.map((p, i) => (
            <article
              key={p.n}
              className="flex w-[clamp(260px,27vw,420px)] snap-center flex-col gap-[18px] max-md:snap-center"
              style={{ marginTop: i === 1 ? 56 : 0 }}
              onMouseEnter={() => setHoverCard(i)}
              onMouseLeave={() => setHoverCard(-1)}
            >
              <a
                href="#objects"
                data-cursor="View"
                aria-label={`View ${p.name}`}
                className="relative block aspect-[3/4] overflow-hidden bg-stone text-background"
              >
                <div
                  className="absolute inset-0 transition-transform duration-[1400ms]"
                  style={{
                    transform: hoverCard === i ? "scale(1.05)" : "scale(1)",
                    transitionTimingFunction: "cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <div
                    data-par="1"
                    className="absolute top-0 left-[-12%] h-full w-[124%] will-change-transform"
                  >
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 900px) 70vw, 27vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-accent px-5 py-[18px] text-[10.5px] tracking-[0.15em] uppercase transition-transform duration-700"
                  style={{
                    transform:
                      hoverCard === i ? "translateY(0)" : "translateY(101%)",
                    transitionTimingFunction: "cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <span>{p.reveal}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </a>
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="m-0 font-serif text-[28px] font-light tracking-[0.04em] uppercase">
                    {p.name}
                  </h3>
                  <p className="m-0 font-serif text-[17px] text-[#5A4F47] italic">
                    {p.note}
                  </p>
                </div>
                <span className="font-mono text-[10.5px] text-muted">{p.n}</span>
              </div>
            </article>
          ))}

          <div className="flex w-[clamp(260px,26vw,400px)] flex-col gap-[22px] pl-[clamp(0px,3vw,48px)]">
            <p className="m-0 font-serif text-[clamp(30px,2.8vw,44px)] leading-[1.15] font-light text-pretty text-accent italic">
              Cut, pleated and finished by hand in Accra.
            </p>
            <p className="m-0 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
              Made in small runs — never restocked
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute right-[clamp(20px,4vw,56px)] bottom-8 left-[clamp(20px,4vw,56px)] h-px bg-foreground/12"
      >
        <div
          data-progress="1"
          className="h-px origin-left scale-x-0 bg-foreground"
        />
      </div>
    </section>
  );
}
