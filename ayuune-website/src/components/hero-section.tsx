import Image from "next/image";

export function HeroSection() {
  return (
    <section
      data-hero="1"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-wrap"
    >
      <div className="site-pad-x flex min-w-[min(100%,420px)] flex-[5_1_420px] flex-col justify-between gap-12 pt-[clamp(120px,16vh,180px)] pb-[clamp(32px,5vh,56px)]">
        <div className="flex flex-col gap-[clamp(28px,4vh,44px)]">
          <p
            data-fade-in="1"
            className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase"
          >
            Collection 01 — First Objects
          </p>
          <h1
            id="hero-title"
            className="m-0 font-serif text-[clamp(54px,7vw,120px)] leading-[0.92] font-light tracking-[0.015em] uppercase"
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-line="1" className="block">
                A life,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-line="1" className="block">
                translated
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-line="1" className="block">
                into{" "}
                <em className="font-serif text-accent italic tracking-normal normal-case">
                  objects.
                </em>
              </span>
            </span>
          </h1>
          <p
            data-fade-in="1"
            className="m-0 max-w-[38ch] text-[15px] leading-[1.7] text-pretty text-body"
          >
            Clothing, bags and objects shaped by places, memories and
            encounters. An evolving archive, created between worlds.
          </p>
          <div data-fade-in="1">
            <a
              href="#objects"
              data-cursor="Discover"
              className="inline-flex items-center gap-3.5 border-b border-current pb-[7px] text-[11px] tracking-[0.15em] uppercase"
            >
              Discover first objects <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div
          data-fade-in="1"
          className="flex items-end gap-8 font-mono text-[10.5px] leading-[1.8] tracking-[0.14em] text-muted uppercase"
        >
          <p className="m-0">
            Accra, Ghana
            <br />
            5.6037° N
            <br />
            0.1870° W
          </p>
          <p className="m-0">
            Est. Accra
            <br />
            A Ghanaian
            <br />
            creative house
          </p>
        </div>
      </div>

      <div className="relative min-h-[clamp(560px,100vh,1000px)] min-w-[min(100%,520px)] flex-[7_1_520px]">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 flex h-[64%] w-[30%] items-start justify-center bg-accent pt-[clamp(110px,15vh,150px)] px-[18px]"
        >
          <p
            className="m-0 font-serif text-[clamp(18px,1.6vw,26px)] leading-[1.35] font-light text-background italic"
            style={{ transform: "rotate(-5deg)" }}
          >
            people
            <br />
            &nbsp;&nbsp;places
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;objects
            <br />
            &nbsp;&nbsp;memories
            <br />
            an evolving archive.
          </p>
        </div>

        <figure
          data-hero-fig="1"
          className="absolute top-[clamp(84px,11vh,120px)] left-0 m-0 aspect-[1220/976] w-[74%] overflow-hidden bg-stone will-change-transform"
        >
          <div
            data-hero-par="1"
            className="absolute inset-y-[-6%] inset-x-0 will-change-transform"
          >
            <div data-hero-img="1" className="absolute inset-0 will-change-transform">
              <Image
                src="/assets/hero.webp"
                alt="A woman reclines against a weathered Accra wall in a chocolate-brown pleated two-piece with sculpted sleeves, strands of oversized pearls falling from her neckline."
                fill
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            data-hero-cover="1"
            aria-hidden="true"
            className="absolute inset-0 origin-top scale-y-100 bg-background"
          />
        </figure>

        <figure
          data-polaroid="1"
          data-cursor="Found"
          className="absolute right-[7%] bottom-[clamp(40px,10vh,110px)] m-0 w-[clamp(150px,17%,230px)] bg-cream p-[9px] pb-[34px] shadow-[0_18px_40px_-18px_rgba(35,29,25,.45)] will-change-transform"
          style={{ transform: "rotate(4deg)" }}
        >
          <Image
            src="/assets/polaroid.webp"
            alt="A found polaroid: a black-and-white street in Accra with a clock tower and palms, its white border yellowed with age."
            width={460}
            height={506}
            className="aspect-[148/163] w-full object-cover"
          />
          <figcaption className="absolute bottom-2.5 left-3 font-mono text-[8.5px] tracking-[0.16em] text-muted uppercase">
            Found — Jamestown
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
