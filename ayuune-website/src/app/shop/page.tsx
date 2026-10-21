import type { Metadata } from "next";
import { PageFooter } from "@/components/page-footer";
import { ShopGrid } from "@/components/shop-grid";

export const metadata: Metadata = {
  title: "Shop — AYUUNË",
  description:
    "Clothing, bags and details from Collection 01 — First Objects. Limited pieces made in Accra.",
};

export default function ShopPage() {
  return (
    <main id="top" className="min-h-svh">
      <header className="site-pad-x border-b border-foreground/12 pt-[clamp(120px,16vh,168px)] pb-[clamp(40px,6vh,64px)]">
        <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
          Collection 01 — First Objects
        </p>
        <h1 className="mt-5 mb-0 font-serif text-[clamp(48px,7vw,104px)] font-light leading-[0.92] uppercase">
          Shop
        </h1>
        <p className="mt-6 mb-0 max-w-[48ch] text-[15px] leading-[1.7] text-pretty text-body">
          A selection of clothing, bags and details to introduce the world of
          AYUUNË. Limited in number. Made to be noticed. Not made for everyone.
        </p>
      </header>

      <section
        aria-label="Product collection"
        className="site-pad-x py-[clamp(48px,8vh,88px)]"
      >
        <ShopGrid />
      </section>

      <PageFooter />
    </main>
  );
}
