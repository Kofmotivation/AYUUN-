"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { useLenis } from "@/components/lenis-provider";

const NAV_LEFT = [
  { href: "#objects", label: "Shop", cursor: "Shop" },
  { href: "#archive", label: "Archive", cursor: "Archive" },
  { href: "#journal", label: "World of AYUUNË", cursor: "Enter" },
] as const;

const NAV_RIGHT = [
  { href: "#journal", label: "About", cursor: "Read" },
  { href: "#search", label: "Search", cursor: "Search", search: true },
  { href: "#bag", label: "Bag (0)", cursor: "Bag" },
] as const;

export function SiteHeader() {
  const { getLenis } = useLenis();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    let lastY = 0;

    const apply = (y: number) => {
      const d = y - lastY;
      lastY = y;
      setSolid(y > 80);
      setHidden((prev) =>
        y > 400 && d > 2 ? true : d < -2 ? false : prev,
      );
    };

    const onNative = () => apply(window.scrollY);
    window.addEventListener("scroll", onNative, { passive: true });

    let offLenis: (() => void) | undefined;
    const attachLenis = () => {
      const lenis = getLenis();
      if (!lenis || offLenis) return;
      const onLenis = ({ scroll }: { scroll: number }) => apply(scroll);
      lenis.on("scroll", onLenis);
      offLenis = () => lenis.off("scroll", onLenis);
    };
    attachLenis();
    const t = window.setInterval(attachLenis, 200);
    window.setTimeout(() => window.clearInterval(t), 2000);

    return () => {
      window.removeEventListener("scroll", onNative);
      window.clearInterval(t);
      offLenis?.();
    };
  }, [getLenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[800] transition-[transform,background-color] duration-[600ms]"
      style={{
        transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
        background:
          solid || menuOpen
            ? "rgba(244,239,230,.94)"
            : "rgba(244,239,230,0)",
        transitionTimingFunction: "cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <nav
        aria-label="Primary"
        className="site-pad-x grid grid-cols-[1fr_auto_1fr] items-center py-[22px] text-[10.5px] tracking-[0.15em] uppercase"
      >
        <div className="hidden flex-wrap gap-x-[clamp(16px,2.4vw,36px)] gap-y-2 md:flex">
          {NAV_LEFT.map((item) => (
            <a key={item.label} href={item.href} data-cursor={item.cursor}>
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="justify-self-start text-left md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          data-cursor="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <a
          href="#top"
          aria-label="AYUUNË home"
          data-cursor="Home"
          className="block justify-self-center"
          onClick={closeMenu}
        >
          <Image
            src="/assets/wordmark.png"
            alt="AYUUNË"
            width={200}
            height={24}
            className="block h-[clamp(16px,1.7vw,24px)] w-auto"
            priority
          />
        </a>

        <div className="hidden flex-wrap items-center justify-end gap-x-[clamp(16px,2.4vw,36px)] gap-y-2 md:flex">
          {NAV_RIGHT.map((item) => {
            const isSearch = "search" in item && item.search;
            return (
              <a
                key={item.label}
                href={item.href}
                data-cursor={item.cursor}
                className={isSearch ? "inline-flex items-center gap-2" : undefined}
              >
                {item.label}
                {isSearch ? (
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-2.5 rounded-full border border-current"
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <a
          href="#bag"
          data-cursor="Bag"
          className="justify-self-end md:hidden"
          onClick={closeMenu}
        >
          Bag (0)
        </a>
      </nav>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-foreground/10 bg-background/95 md:hidden"
      >
        <ul className="site-pad-x flex list-none flex-col gap-5 py-8 text-[11px] tracking-[0.15em] uppercase">
          {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
            <li key={`m-${item.label}`}>
              <a
                href={item.href}
                data-cursor={item.cursor}
                className="block py-1"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
