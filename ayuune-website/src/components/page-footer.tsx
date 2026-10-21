import Image from "next/image";
import Link from "next/link";

const COLS = [
  [
    { href: "/shop", label: "Shop" },
    { href: "/#archive", label: "Archive" },
    { href: "/craft", label: "Journal" },
  ],
  [
    { href: "/craft", label: "Craft" },
    { href: "/about", label: "Our story" },
    { href: "/about#contact", label: "Contact" },
  ],
  [
    {
      href: "https://instagram.com",
      label: "Instagram",
      external: true,
    },
    { href: "/craft#transparency", label: "Shipping" },
    { href: "/craft#care", label: "Care" },
  ],
] as const;

/** Shared footer for non-home routes (home keeps its original SiteFooter). */
export function PageFooter() {
  return (
    <footer className="site-pad-x flex flex-col gap-[clamp(56px,9vh,96px)] border-t border-foreground/12 pt-[clamp(64px,10vh,112px)] pb-8">
      <div className="flex flex-wrap justify-between gap-12">
        <div className="flex max-w-[420px] flex-col gap-4">
          <p className="m-0 font-serif text-[clamp(28px,2.6vw,40px)] leading-[1.1] font-light">
            Rooted in identity, shaped by the world.
          </p>
          <p className="m-0 text-[14px] leading-[1.7] text-body">
            A creative house born from a love of art, beauty, and the act of
            creating.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-8 text-[10.5px] leading-[2.4] tracking-[0.15em] uppercase">
          {COLS.map((col, i) => (
            <div key={i} className="flex flex-col">
              {col.map((item) =>
                "external" in item && item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full">
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
    </footer>
  );
}
