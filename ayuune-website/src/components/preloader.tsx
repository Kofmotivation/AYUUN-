"use client";

import { usePathname } from "next/navigation";

export function Preloader() {
  const pathname = usePathname();
  // Keep the branded intro on `/` only — other routes start immediately.
  if (pathname !== "/") return null;

  return (
    <div
      data-pl="1"
      role="status"
      aria-label="Loading AYUUNË"
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center gap-9 bg-background will-change-transform"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-pl-mark="1"
        src="/assets/wordmark.png"
        alt="AYUUNË"
        className="block h-auto w-[min(420px,62vw)] opacity-0"
      />
      <div className="h-px w-[min(240px,50vw)] overflow-hidden bg-foreground/15">
        <div
          data-pl-bar="1"
          className="h-px w-full origin-left scale-x-0 bg-accent"
        />
      </div>
      <div className="flex gap-7 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
        <span>Accra — 5.6037° N, 0.1870° W</span>
        <span data-pl-count="1">000</span>
      </div>
    </div>
  );
}
