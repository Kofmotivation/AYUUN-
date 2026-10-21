"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-pad-x flex flex-col gap-[clamp(56px,9vh,96px)] border-t border-foreground/12 pt-[clamp(64px,10vh,112px)] pb-8">
      <div className="flex flex-wrap justify-between gap-12">
        <form
          id="search"
          onSubmit={onSubmit}
          className="flex max-w-[520px] min-w-[min(100%,360px)] flex-[1_1_360px] flex-col gap-[22px]"
        >
          <label
            htmlFor="news"
            className="font-serif text-[clamp(28px,2.6vw,40px)] leading-[1.1] font-light"
          >
            Letters from the archive.
          </label>
          <div className="flex gap-4 border-b border-foreground pb-2.5">
            <input
              id="news"
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 border-0 bg-transparent py-1.5 text-[14px] text-foreground outline-none placeholder:text-foreground/40"
            />
            <button
              type="submit"
              data-cursor="Join"
              className="border-0 bg-transparent p-0 text-[10.5px] tracking-[0.15em] text-foreground uppercase"
            >
              {subscribed ? "Thank you" : "Subscribe →"}
            </button>
          </div>
        </form>
        <div className="flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-8 text-[10.5px] leading-[2.4] tracking-[0.15em] uppercase">
          <div className="flex flex-col">
            <a href="#objects">Shop</a>
            <a href="#archive">Archive</a>
            <a href="#journal">Journal</a>
          </div>
          <div className="flex flex-col">
            <a href="#journal">Craft</a>
            <a href="#journal">Our story</a>
            <a href="#top">Contact</a>
          </div>
          <div className="flex flex-col">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="#top">Shipping</a>
            <a href="#top">Care</a>
          </div>
        </div>
      </div>

      <div data-fade="1" className="relative w-full">
        <Image
          src="/assets/wordmark.png"
          alt="AYUUNË"
          width={1680}
          height={200}
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-wrap justify-between gap-4 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
        <span>© 2026 AYUUNË — A Ghanaian creative house</span>
        <span>Accra, Ghana · 5.6037° N, 0.1870° W</span>
      </div>
      <div id="bag" className="sr-only" aria-hidden="true" />
    </footer>
  );
}
