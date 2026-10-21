"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const lab = labelRef.current;
    const txt = textRef.current;
    if (!ring || !dot || !lab || !txt) return;

    [ring, dot, lab].forEach((el) => {
      el.style.display = "block";
    });
    document.documentElement.classList.add("cc");

    const qx = [
      gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" }),
      gsap.quickTo(lab, "x", { duration: 0.5, ease: "power3" }),
      gsap.quickTo(dot, "x", { duration: 0.08 }),
    ];
    const qy = [
      gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" }),
      gsap.quickTo(lab, "y", { duration: 0.5, ease: "power3" }),
      gsap.quickTo(dot, "y", { duration: 0.08 }),
    ];

    const move = (e: MouseEvent) => {
      qx.forEach((f) => f(e.clientX));
      qy.forEach((f) => f(e.clientY));
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const t = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const dark = target?.closest?.("#archive");
      if (t) {
        txt.textContent = t.getAttribute("data-cursor") || "";
        gsap.set(ring, { scale: 2.2 });
        ring.style.backgroundColor = "#6B1D2F";
        ring.style.borderColor = "#6B1D2F";
        lab.style.opacity = "1";
        dot.style.opacity = "0";
      } else {
        gsap.set(ring, { scale: 1 });
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = dark ? "#C9B98F" : "#6B1D2F";
        dot.style.background = dark ? "#C9B98F" : "#6B1D2F";
        lab.style.opacity = "0";
        dot.style.opacity = "1";
      }
    };

    const leave = () => {
      lab.style.opacity = "0";
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const enter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("cc");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-c-ring="1"
        className="pointer-events-none fixed top-0 left-0 z-[9500] hidden h-[38px] w-[38px] rounded-full border border-accent will-change-transform"
        style={{
          margin: "-19px 0 0 -19px",
          transition:
            "transform .45s cubic-bezier(.2,.7,.2,1), background-color .35s, border-color .35s",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        data-c-dot="1"
        className="pointer-events-none fixed top-0 left-0 z-[9501] hidden h-1.5 w-1.5 rounded-full bg-accent"
        style={{ margin: "-3px 0 0 -3px" }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        data-c-label="1"
        className="pointer-events-none fixed top-0 left-0 z-[9502] hidden text-[9px] tracking-[0.15em] text-background uppercase opacity-0 transition-opacity duration-300"
      >
        <span
          ref={textRef}
          data-c-text="1"
          className="block"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          View
        </span>
      </div>
    </>
  );
}
