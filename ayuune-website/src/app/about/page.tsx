import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFooter } from "@/components/page-footer";
import { chapters } from "@/data/content";

export const metadata: Metadata = {
  title: "About — AYUUNË",
  description:
    "Rooted in identity, shaped by the world. AYUUNË is a creative house born from a love of art, beauty, and the act of creating.",
};

export default function AboutPage() {
  return (
    <main id="top" className="min-h-svh">
      <header className="site-pad-x border-b border-foreground/12 pt-[clamp(120px,16vh,168px)] pb-[clamp(48px,7vh,80px)]">
        <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
          World of AYUUNË
        </p>
        <h1 className="mt-5 mb-0 max-w-[14ch] font-serif text-[clamp(42px,6.2vw,92px)] font-light leading-[0.95]">
          Rooted in identity, shaped by the world.
        </h1>
      </header>

      <section className="site-pad-x grid grid-cols-1 gap-12 py-[clamp(48px,8vh,96px)] lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:col-span-5">
          <Image
            src="/assets/house.webp"
            alt="A coastal colonial-era fort on a rocky outcrop, framed by tall palms under a pale sky."
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7 lg:pt-8">
          <p className="m-0 font-serif text-[clamp(24px,2.4vw,34px)] font-light leading-[1.35] text-pretty">
            AYUUNË is a creative house born from a love of art, beauty, and the
            act of creating.
          </p>
          <p className="m-0 max-w-[52ch] text-[15px] leading-[1.75] text-body text-pretty">
            The name AYUUNË comes from the original form of the founder’s family
            name, preserving its connection to her Frafra roots in Northern
            Ghana. It is a name that speaks to identity, origin, and the
            importance of carrying something personal forward.
          </p>
          <p className="m-0 max-w-[52ch] text-[15px] leading-[1.75] text-body text-pretty">
            Born in The Gambia and raised across different countries, with
            Ghanaian roots through her family, the founder’s perspective has been
            shaped by the places she has lived, the cultures she has encountered,
            and the experiences that have stayed with her. A lifelong fascination
            with fashion, textiles, architecture, interiors, photography, art,
            craftsmanship, and beautiful objects has become an integral part of
            how she sees and interprets the world.
          </p>
          <p className="m-0 max-w-[52ch] text-[15px] leading-[1.75] text-body text-pretty">
            AYUUNË is an expression of that perspective — a space for curiosity,
            experimentation, and creative freedom, not confined to one aesthetic,
            culture, or visual language.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="philosophy-title"
        className="border-y border-foreground/12 bg-cream"
      >
        <div className="site-pad-x grid grid-cols-1 gap-10 py-[clamp(56px,9vh,100px)] md:grid-cols-3">
          <h2 id="philosophy-title" className="sr-only">
            Brand philosophy
          </h2>
          {(
            [
              {
                t: "Identity",
                d: "Where the founder comes from and the experiences that have shaped her.",
              },
              {
                t: "Exploration",
                d: "Curiosity about places, objects, images, materials, cultures, design, and life.",
              },
              {
                t: "Creation",
                d: "Translating those influences into original work — clothing as the medium.",
              },
            ] as const
          ).map((item) => (
            <div key={item.t} className="flex flex-col gap-3">
              <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
                {item.t}
              </p>
              <p className="m-0 font-serif text-[clamp(22px,2vw,28px)] font-light leading-[1.3]">
                {item.d}
              </p>
            </div>
          ))}
        </div>
        <p className="site-pad-x m-0 border-t border-foreground/10 pb-[clamp(48px,7vh,72px)] pt-8 font-serif text-[clamp(20px,2.2vw,28px)] italic font-light text-accent">
          “AYUUNË is a space to explore identity, embrace curiosity, and turn
          inspiration into creation.”
        </p>
      </section>

      <section
        aria-labelledby="chapters-title"
        className="site-pad-x py-[clamp(56px,9vh,100px)]"
      >
        <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
          First creative chapter
        </p>
        <h2
          id="chapters-title"
          className="mt-4 mb-3 max-w-[18ch] font-serif text-[clamp(32px,4vw,56px)] font-light leading-[1.05]"
        >
          Seven places. Seven chapters. One evolving identity.
        </h2>
        <p className="mb-12 mt-0 max-w-[48ch] text-[15px] leading-[1.7] text-body">
          The place-based collections are the first creative chapter of AYUUNË —
          not the definition of the brand itself. Each collection explores what a
          place means through the founder’s own eyes.
        </p>
        <ol className="m-0 grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch, i) => (
            <li
              key={ch.name}
              className="flex flex-col gap-2 border-t border-foreground/12 py-6 pr-6"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-[24px] font-light">{ch.name}</span>
              <span className="text-[12px] tracking-[0.08em] text-muted uppercase">
                {ch.city}
              </span>
              <span className="text-[14px] leading-[1.6] text-body">{ch.line}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="site-pad-x grid grid-cols-1 gap-10 border-t border-foreground/12 py-[clamp(56px,9vh,96px)] md:grid-cols-2"
      >
        <div>
          <h2
            id="contact-title"
            className="m-0 font-serif text-[clamp(32px,3.5vw,48px)] font-light"
          >
            The house
          </h2>
          <p className="mt-4 mb-0 max-w-[40ch] text-[15px] leading-[1.7] text-body">
            A Ghanaian creative house in Accra. Visits by appointment. Letters
            from the archive welcome.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-[15px] leading-[1.8]">
          <p className="m-0">
            <span className="block text-[10.5px] tracking-[0.15em] text-muted uppercase">
              Studio
            </span>
            Accra, Ghana
            <br />
            5.6037° N, 0.1870° W
          </p>
          <p className="m-0">
            <span className="block text-[10.5px] tracking-[0.15em] text-muted uppercase">
              Correspondence
            </span>
            <a href="mailto:hello@ayuune.com">hello@ayuune.com</a>
          </p>
          <Link
            href="/shop"
            data-cursor="Shop"
            className="mt-2 inline-flex w-fit items-center gap-2 border-b border-current pb-1 text-[10.5px] tracking-[0.15em] uppercase"
          >
            View the collection <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
