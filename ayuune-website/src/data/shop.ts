export type ProductCategory = "Clothing" | "Bags" | "Details";

export type ShopProduct = {
  slug: string;
  category: ProductCategory;
  name: string;
  shortName: string;
  price: string;
  currency: string;
  note: string;
  description: string;
  materials: string;
  care: string;
  img: string;
  alt: string;
  gallery: { src: string; alt: string }[];
  limited: boolean;
};

/** Collection SKUs — copy rooted in the AYUUNË concept (identity, craft, place). */
export const shopProducts: ShopProduct[] = [
  {
    slug: "ivory-knot-dress",
    category: "Clothing",
    name: "The Ivory Knot Dress",
    shortName: "Ivory Knot",
    price: "1,280",
    currency: "USD",
    note: "Draped ivory, knotted at the waist",
    description:
      "A sleeveless column in ivory silk-blend, knotted soft at the waist. Cut for movement between warm stone and open air — the silhouette that opened Collection 01. Tailored in Accra; finished by hand.",
    materials: "Silk-blend crepe · Hand-finished seams · Made in Accra",
    care: "Dry clean only. Store hanging, away from direct sun.",
    img: "/assets/clothing.webp",
    alt: "Profile of a woman in an ivory sleeveless dress knotted at the waist, standing between sun-warmed stone walls.",
    gallery: [
      {
        src: "/assets/clothing.webp",
        alt: "Ivory knotted dress in profile between pale stone walls.",
      },
      {
        src: "/assets/seven.webp",
        alt: "Sheer ivory drapery lifting in coastal wind at dusk.",
      },
    ],
    limited: true,
  },
  {
    slug: "pleated-earth-suit",
    category: "Clothing",
    name: "The Pleated Earth Suit",
    shortName: "Pleated Earth",
    price: "2,140",
    currency: "USD",
    note: "Chocolate pleats, pearl spill",
    description:
      "A two-piece in pleated chocolate cloth — jacket and trouser as one continuous proportion study. Pearls rest against the chest as a counterweight to the architecture of the pleat. Distinctive silhouette; hand embroidery at the cuff.",
    materials: "Wool-blend pleat · Pearl detail · Hand embroidery · Accra atelier",
    care: "Dry clean. Steam lightly; do not press flat.",
    img: "/assets/hero.webp",
    alt: "Reclining against an old Accra wall in a pleated chocolate-brown suit, pearls spilling over her chest.",
    gallery: [
      {
        src: "/assets/hero.webp",
        alt: "Pleated chocolate suit against an Accra wall.",
      },
      {
        src: "/assets/details.webp",
        alt: "Close detail of pearl and brass against a pleated brown sleeve.",
      },
    ],
    limited: true,
  },
  {
    slug: "crimson-column",
    category: "Clothing",
    name: "The Crimson Column",
    shortName: "Crimson Column",
    price: "1,560",
    currency: "USD",
    note: "Deep-red silk, billowing sleeve",
    description:
      "Billowing deep-red silk cut as a single vertical gesture. A piece for evenings that hold colour — lagoon light, curtain shadow, the red of memory. Custom proportion; original print placement at the hem.",
    materials: "Silk satin · Custom print placement · Hand-finished · Accra",
    care: "Dry clean. Hang immediately after wear.",
    img: "/assets/red.webp",
    alt: "A woman in billowing deep-red silk raises her arm against crimson curtains, braids falling down her back.",
    gallery: [
      {
        src: "/assets/red.webp",
        alt: "Deep-red silk column against crimson curtains.",
      },
      {
        src: "/assets/about.webp",
        alt: "Close portrait with pearl earring among red blooms.",
      },
    ],
    limited: true,
  },
  {
    slug: "saddle-leather-bag",
    category: "Bags",
    name: "The Saddle Bag",
    shortName: "Saddle Bag",
    price: "890",
    currency: "USD",
    note: "Saddle leather, pearl chain",
    description:
      "A dark brown leather saddle bag with a sculpted top handle and a cascading pearl-and-brass chain. Built to be noticed and carried for years — texture and construction as the design tools.",
    materials: "Vegetable-tanned leather · Brass hardware · Pearl chain · Accra",
    care: "Wipe with soft cloth. Condition leather sparingly. Store stuffed.",
    img: "/assets/bags.webp",
    alt: "A dark brown leather saddle bag with a sculpted top handle and a cascading pearl-and-brass chain, set on pale stone against a red wall.",
    gallery: [
      {
        src: "/assets/bags.webp",
        alt: "Saddle leather bag with pearl-and-brass chain.",
      },
      {
        src: "/assets/polaroid.webp",
        alt: "Warm still life detail from the First Objects campaign.",
      },
    ],
    limited: true,
  },
  {
    slug: "pearl-brass-cuff",
    category: "Details",
    name: "Pearl & Brass Cuff",
    shortName: "Pearl Cuff",
    price: "320",
    currency: "USD",
    note: "Pearls, brass, hand-finished",
    description:
      "A bracelet of pearls and brass, finished by hand. Designed to sit against a pleated sleeve or bare wrist — the small object that completes a silhouette. Limited run for Collection 01.",
    materials: "Freshwater pearls · Solid brass · Hand-strung · Accra",
    care: "Keep dry. Wipe brass with soft cloth. Store flat.",
    img: "/assets/details.webp",
    alt: "Close detail of a pearl and brass bracelet against the pleated sleeve of a chocolate-brown jacket.",
    gallery: [
      {
        src: "/assets/details.webp",
        alt: "Pearl and brass cuff on a pleated sleeve.",
      },
      {
        src: "/assets/about.webp",
        alt: "Pearl earring catching light among red blooms.",
      },
    ],
    limited: true,
  },
  {
    slug: "printed-headwrap",
    category: "Details",
    name: "Printed Headwrap",
    shortName: "Headwrap",
    price: "240",
    currency: "USD",
    note: "Ochre, teal, original print",
    description:
      "A vivid printed headwrap in ochre and teal — an original print drawn from the founder’s visual archive. Soft cloth, generous drape, meant to travel with you between chapters.",
    materials: "Printed cotton-silk · Original AYUUNË print · Hand-finished edges",
    care: "Gentle cold wash or dry clean. Air dry flat.",
    img: "/assets/world.webp",
    alt: "A woman wrapped in a vivid printed headscarf in ochre and teal, gazing into the distance.",
    gallery: [
      {
        src: "/assets/world.webp",
        alt: "Printed ochre and teal headwrap in warm film light.",
      },
      {
        src: "/assets/journal.webp",
        alt: "Still life of red flowers, carved wood, and shells.",
      },
    ],
    limited: false,
  },
];

export const shopCategories = [
  "All",
  "Clothing",
  "Bags",
  "Details",
] as const;

export function getProduct(slug: string) {
  return shopProducts.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return shopProducts.slice(0, limit);
  return shopProducts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, limit);
}
