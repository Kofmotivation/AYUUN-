import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFooter } from "@/components/page-footer";
import { getProduct, getRelated, shopProducts } from "@/data/shop";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece — AYUUNË" };
  return {
    title: `${product.name} — AYUUNË`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(slug);

  return (
    <main id="top" className="min-h-svh">
      <div className="site-pad-x pt-[clamp(100px,14vh,140px)] pb-4 text-[10.5px] tracking-[0.15em] uppercase text-muted">
        <Link href="/shop" className="hover:text-accent">
          Shop
        </Link>
        <span aria-hidden="true"> · </span>
        <span>{product.category}</span>
      </div>

      <article className="site-pad-x grid grid-cols-1 gap-[clamp(32px,5vw,64px)] pb-[clamp(64px,10vh,120px)] lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-3">
          {product.gallery.map((g, i) => (
            <div
              key={`${g.src}-${i}`}
              className="relative aspect-[3/4] overflow-hidden bg-stone"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
            {product.category}
            {product.limited ? " · Limited" : ""}
          </p>
          <h1 className="mt-4 mb-0 font-serif text-[clamp(36px,4.5vw,64px)] font-light leading-[1.05]">
            {product.name}
          </h1>
          <p className="mt-4 mb-0 font-mono text-[13px] tracking-[0.08em]">
            {product.currency} {product.price}
          </p>
          <p className="mt-8 mb-0 max-w-[42ch] text-[15px] leading-[1.75] text-pretty text-body">
            {product.description}
          </p>

          <dl className="mt-10 flex flex-col gap-5 border-t border-foreground/12 pt-8 text-[13px] leading-[1.6]">
            <div>
              <dt className="text-[10.5px] tracking-[0.15em] text-muted uppercase">
                Materials
              </dt>
              <dd className="m-0 mt-1.5 text-body">{product.materials}</dd>
            </div>
            <div>
              <dt className="text-[10.5px] tracking-[0.15em] text-muted uppercase">
                Care
              </dt>
              <dd className="m-0 mt-1.5 text-body">{product.care}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              data-cursor="Bag"
              className="inline-flex items-center justify-center border border-foreground bg-foreground px-8 py-3.5 text-[10.5px] tracking-[0.15em] text-background uppercase transition-colors hover:border-accent hover:bg-accent"
            >
              Enquire to acquire
            </button>
            <Link
              href="/craft"
              data-cursor="Craft"
              className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.15em] uppercase"
            >
              Craft & materials <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>

      <section
        aria-labelledby="related-title"
        className="site-pad-x border-t border-foreground/12 py-[clamp(48px,8vh,88px)]"
      >
        <h2
          id="related-title"
          className="m-0 mb-10 font-serif text-[clamp(28px,3vw,40px)] font-light"
        >
          More from the collection
        </h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/shop/${p.slug}`}
                data-cursor="View"
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="font-serif text-[20px] font-light">
                  {p.shortName}
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em]">
                  {p.currency} {p.price}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PageFooter />
    </main>
  );
}
