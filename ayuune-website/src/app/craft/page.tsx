import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFooter } from "@/components/page-footer";

export const metadata: Metadata = {
  title: "Craft & Materials — AYUUNË",
  description:
    "A closer look at AYUUNË craftsmanship, local production in Accra, and material exploration — pieces made to endure.",
};

const PILLARS = [
  {
    id: "atelier",
    title: "Accra atelier",
    body: "Pieces are cut and finished in Accra — close to the light, the workshop, and the hands that know the cloth. Local production is not a slogan; it is how the house stays accountable to proportion, texture, and time.",
  },
  {
    id: "materials",
    title: "Materials with memory",
    body: "Silk-blend crepe, vegetable-tanned leather, wool pleat, freshwater pearls, brass. Each material is chosen for how it holds light and how it ages — textiles, texture, and construction as creative tools.",
  },
  {
    id: "hand",
    title: "The hand in the work",
    body: "Hand embroidery, hand-finished seams, original prints. Detail is where the founder’s eye becomes tangible — not decoration for its own sake, but the quiet signature of care.",
  },
] as const;

export default function CraftPage() {
  return (
    <main id="top" className="min-h-svh">
      <header className="site-pad-x border-b border-foreground/12 pt-[clamp(120px,16vh,168px)] pb-[clamp(48px,7vh,80px)]">
        <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
          Transparency
        </p>
        <h1 className="mt-5 mb-0 max-w-[16ch] font-serif text-[clamp(42px,6vw,88px)] font-light leading-[0.95]">
          Craft & materials
        </h1>
        <p className="mt-6 mb-0 max-w-[48ch] text-[15px] leading-[1.7] text-pretty text-body">
          A commitment to thoughtful craft, responsible materials, and pieces
          made to endure — refined but not cold, personal rather than trend-led.
        </p>
      </header>

      <section className="site-pad-x grid grid-cols-1 items-end gap-10 py-[clamp(48px,8vh,88px)] lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:col-span-7">
          <Image
            src="/assets/sketch.webp"
            alt="An open sketchbook with loose ink fashion drawings of a draped, corseted silhouette."
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5 lg:pb-4">
          <p className="m-0 font-serif text-[clamp(22px,2.2vw,30px)] font-light leading-[1.35]">
            Womenswear as the first medium — tailored pieces, distinctive
            silhouettes, custom prints, and the patience of the hand.
          </p>
          <p className="m-0 text-[15px] leading-[1.75] text-body">
            Collections can carry distinct visual languages while remaining
            recognisably AYUUNË through the founder’s perspective. The
            consistent thread is curiosity, not a fixed aesthetic.
          </p>
        </div>
      </section>

      <section
        id="transparency"
        aria-labelledby="pillars-title"
        className="border-y border-foreground/12 bg-archive text-archive-fg"
      >
        <div className="site-pad-x py-[clamp(56px,9vh,100px)]">
          <h2
            id="pillars-title"
            className="m-0 mb-12 font-serif text-[clamp(28px,3.2vw,44px)] font-light text-archive-fg"
          >
            How we make
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-3">
            {PILLARS.map((p) => (
              <li key={p.id} className="flex flex-col gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-archive-muted uppercase">
                  {p.title}
                </span>
                <p className="m-0 text-[15px] leading-[1.7] text-archive-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="care"
        aria-labelledby="care-title"
        className="site-pad-x grid grid-cols-1 gap-12 py-[clamp(56px,9vh,100px)] lg:grid-cols-2"
      >
        <div>
          <h2
            id="care-title"
            className="m-0 font-serif text-[clamp(28px,3vw,40px)] font-light"
          >
            Care & longevity
          </h2>
          <p className="mt-5 mb-0 max-w-[44ch] text-[15px] leading-[1.75] text-body">
            Objects meant to last ask for quiet attention: dry clean where
            marked, soft cloth on leather and brass, hang silk away from sun.
            We design for years of wear — not a single season.
          </p>
          <p className="mt-4 mb-0 max-w-[44ch] text-[15px] leading-[1.75] text-body">
            Shipping and returns details are shared at the time of enquiry.
            Stock is limited; availability changes with each small run from the
            atelier.
          </p>
          <Link
            href="/shop"
            data-cursor="Shop"
            className="mt-8 inline-flex items-center gap-2 border-b border-current pb-1 text-[10.5px] tracking-[0.15em] uppercase"
          >
            Browse First Objects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-stone">
          <Image
            src="/assets/journal.webp"
            alt="A still life of red gerbera flowers beside carved wooden vessels and pale shells on a low table."
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section
        aria-labelledby="journal-title"
        className="site-pad-x border-t border-foreground/12 py-[clamp(48px,7vh,80px)]"
      >
        <h2
          id="journal-title"
          className="m-0 font-serif text-[clamp(28px,3vw,40px)] font-light"
        >
          From the journal
        </h2>
        <p className="mt-3 mb-10 max-w-[44ch] text-[15px] leading-[1.7] text-body">
          Thoughts, places and inspirations along the way — notes from the house
          as the archive grows.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Link
            href="/about"
            data-cursor="Read"
            className="group flex flex-col gap-4 border-t border-foreground/12 pt-6"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone">
              <Image
                src="/assets/world.webp"
                alt="A woman in profile wearing a gold, teal and red printed headwrap."
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>
            <span className="font-serif text-[22px] font-light">
              World of AYUUNË
            </span>
            <span className="text-[14px] text-body">
              The people, places, materials and processes behind the brand.
            </span>
          </Link>
          <Link
            href="/about#contact"
            data-cursor="Visit"
            className="group flex flex-col gap-4 border-t border-foreground/12 pt-6"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone">
              <Image
                src="/assets/house.webp"
                alt="Coastal fort framed by palms under a pale sky."
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>
            <span className="font-serif text-[22px] font-light">
              A Ghanaian creative house
            </span>
            <span className="text-[14px] text-body">
              Built on movement, memory and an evolving way of seeing.
            </span>
          </Link>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
