"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  shopCategories,
  shopProducts,
  type ProductCategory,
} from "@/data/shop";

type Filter = (typeof shopCategories)[number];

export function ShopGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const items = useMemo(() => {
    if (filter === "All") return shopProducts;
    return shopProducts.filter((p) => p.category === (filter as ProductCategory));
  }, [filter]);

  return (
    <div className="flex flex-col gap-[clamp(40px,6vh,72px)]">
      <div
        role="tablist"
        aria-label="Filter by category"
        className="flex flex-wrap gap-x-8 gap-y-3 text-[10.5px] tracking-[0.15em] uppercase"
      >
        {shopCategories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              data-cursor="Filter"
              onClick={() => setFilter(cat)}
              className="border-0 bg-transparent p-0 pb-1"
              style={{
                color: active ? "var(--accent)" : "inherit",
                borderBottom: active
                  ? "1px solid var(--accent)"
                  : "1px solid transparent",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <ul className="m-0 grid list-none grid-cols-1 gap-x-[clamp(16px,2.4vw,32px)] gap-y-[clamp(40px,7vh,72px)] p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li
            key={p.slug}
            className="flex flex-col gap-4"
            style={{ marginTop: i % 3 === 1 ? "clamp(0px,4vh,48px)" : 0 }}
          >
            <Link
              href={`/shop/${p.slug}`}
              data-cursor="View"
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: "cubic-bezier(.2,.7,.2,1)" }}
                />
                {p.limited ? (
                  <span className="absolute top-4 left-4 text-[10px] tracking-[0.14em] text-background uppercase mix-blend-difference">
                    Limited
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="m-0 text-[10.5px] tracking-[0.15em] text-muted uppercase">
                  {p.category}
                </p>
                <h2 className="m-0 font-serif text-[clamp(22px,2vw,28px)] font-light leading-[1.15]">
                  {p.name}
                </h2>
                <p className="m-0 text-[13px] text-body">{p.note}</p>
                <p className="m-0 pt-1 font-mono text-[11px] tracking-[0.08em]">
                  {p.currency} {p.price}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {items.length === 0 ? (
        <p className="text-[15px] text-body">No pieces in this category yet.</p>
      ) : null}
    </div>
  );
}
