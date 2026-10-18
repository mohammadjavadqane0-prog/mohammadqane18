export type CategorySlug =
  | "couches"
  | "armchairs"
  | "chairs"
  | "tables"
  | "lighting"
  | "storage";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  description: string;
  story: string;
  material: string;
  colors: ProductColor[];
  dimensions: { width: number; height: number; depth: number };
  images: string[];
  designerId: string;
  badge?: "New" | "Bestseller" | "Limited";
  featured?: boolean;
  bestseller?: boolean;
}

export const categoryMeta: Record<
  CategorySlug,
  { label: string; blurb: string }
> = {
  couches: { label: "Couches", blurb: "Comfortable sofas for relaxation" },
  armchairs: { label: "Armchairs", blurb: "Comfortable armchairs for seating" },
  chairs: { label: "Chairs", blurb: "Modern chairs for the office & home" },
  tables: { label: "Tables", blurb: "Sculptural tables for gathering" },
  lighting: { label: "Lighting", blurb: "Warm, cinematic illumination" },
  storage: { label: "Storage", blurb: "Refined cabinetry & consoles" },
};

export const products: Product[] = [
  {
    id: "p-drop-chair",
    slug: "drop-chair",
    name: "Drop Chair",
    category: "armchairs",
    price: 1180,
    originalPrice: 1390,
    description:
      "Stunning piece of furniture that combines modern design with timeless elegance. Its distinctive shape and bright yellow color make it a real eye-catcher in any room. The chair is not only stylish but also comfortable and soft.",
    story:
      "The Drop Chair began as a study in a single continuous gesture — a seat carved from one flowing curve. Its sculpted shell is finished in hand-dyed mustard leather over an oiled walnut frame, a signature of our The Yellow Leather Edition.",
    material: "Hand-dyed leather, oiled walnut",
    colors: [
      { name: "Mustard", hex: "#C79535" },
      { name: "Ivory", hex: "#E9E1D1" },
      { name: "Forest", hex: "#172D26" },
    ],
    dimensions: { width: 72, height: 84, depth: 76 },
    images: [
      "/images/featured-armchair.jpg",
      "/images/featured-lounge.jpg",
      "/images/collection-classics.jpg",
    ],
    designerId: "amara-osei",
    badge: "Limited",
    featured: true,
    bestseller: true,
  },
  {
    id: "p-ligne-sofa",
    slug: "ligne-sofa",
    name: "Ligne Sofa",
    category: "couches",
    price: 3480,
    description:
      "A generous three-seat sofa upholstered in deep forest velour. Low-slung and softly structured, it anchors a room with quiet authority.",
    story:
      "Inspired by the salon culture of mid-century Brussels, Ligne pairs a beech frame with feather-wrapped foam seats that keep their shape for decades.",
    material: "Forest velour, solid beech",
    colors: [
      { name: "Forest", hex: "#172D26" },
      { name: "Champagne", hex: "#D8B16A" },
      { name: "Ivory", hex: "#E9E1D1" },
    ],
    dimensions: { width: 228, height: 76, depth: 96 },
    images: [
      "/images/prod-green-sofa.jpg",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
    ],
    designerId: "elias-verhoeven",
    badge: "Bestseller",
    bestseller: true,
  },
  {
    id: "p-milano-sofa",
    slug: "milano-sofa",
    name: "Milano Sofa",
    category: "couches",
    price: 4200,
    description:
      "A cinematic ivory leather sofa with brass-finished steel legs, made for dark, dramatic interiors and warm lamplight.",
    story:
      "Every Milano is bench-made by a single upholsterer from first seam to final trim — a two-week craft carried out in our Milan atelier.",
    material: "Full-grain leather, brushed brass steel",
    colors: [
      { name: "Ivory", hex: "#E9E1D1" },
      { name: "Charcoal", hex: "#24231F" },
      { name: "Mustard", hex: "#C79535" },
    ],
    dimensions: { width: 240, height: 78, depth: 100 },
    images: [
      "/images/hero-interior.jpg",
      "/images/interior-5.jpg",
      "/images/interior-minimal.jpg",
    ],
    designerId: "elias-verhoeven",
    featured: true,
    bestseller: true,
  },
  {
    id: "p-atelier-sofa",
    slug: "atelier-sofa",
    name: "Atelier Sofa",
    category: "couches",
    price: 2890,
    description:
      "Deep cushions, sculpted arms and a whisper-soft bouclé weave — the Atelier is comfort tailored like couture.",
    story:
      "Named for the workshop where it is made, the Atelier uses 4.2 kilometres of bouclé yarn per sofa, woven on a nineteenth-century loom.",
    material: "Bouclé, kiln-dried hardwood",
    colors: [
      { name: "Oat", hex: "#DCD1BD" },
      { name: "Moss", hex: "#2E4638" },
      { name: "Champagne", hex: "#D8B16A" },
    ],
    dimensions: { width: 210, height: 80, depth: 92 },
    images: [
      "/images/prod-pillow-couch.jpg",
      "/images/interior-3.jpg",
      "/images/interior-6.jpg",
    ],
    designerId: "amara-osei",
  },
  {
    id: "p-belleville-couch",
    slug: "belleville-couch",
    name: "Belleville Couch",
    category: "couches",
    price: 2240,
    description:
      "A compact two-seater with a plinth base and unfussy lines — an elegant opening act for smaller apartments.",
    story:
      "Drawn from a 1962 Parisian apartment commission, the Belleville keeps its original shallow-tufted backrest.",
    material: "Linen weave, oak plinth",
    colors: [
      { name: "Ivory", hex: "#E9E1D1" },
      { name: "Forest", hex: "#172D26" },
      { name: "Clay", hex: "#A8825C" },
    ],
    dimensions: { width: 182, height: 74, depth: 88 },
    images: [
      "/images/prod-couch-anthurium.jpg",
      "/images/interior-2.jpg",
      "/images/interior-4.jpg",
    ],
    designerId: "elias-verhoeven",
    badge: "New",
  },
  {
    id: "p-vallnord-armchair",
    slug: "vallnord-armchair",
    name: "Vallnord Armchair",
    category: "armchairs",
    price: 1460,
    description:
      "A rounded, enveloping armchair in soft beige weave with solid oak legs — the reading companion of the house.",
    story:
      "The Vallnord shell is moulded in a single pressing, giving the chair its seamless, hug-like silhouette.",
    material: "Bouclé weave, solid oak",
    colors: [
      { name: "Beige", hex: "#DCD1BD" },
      { name: "Charcoal", hex: "#24231F" },
      { name: "Sage", hex: "#93B496" },
    ],
    dimensions: { width: 84, height: 92, depth: 88 },
    images: [
      "/images/collection-classics.jpg",
      "/images/interior-3.jpg",
      "/images/interior-8.jpg",
    ],
    designerId: "julian-marchetti",
    bestseller: true,
  },
  {
    id: "p-verde-salon-chair",
    slug: "verde-salon-chair",
    name: "Verde Salon Chair",
    category: "armchairs",
    price: 1290,
    description:
      "Sun-warmed forest velvet and curved beech arms give the Verde the air of a private club, at home in any salon.",
    story:
      "Its velvet is dyed in small batches to match our house forest green — a colour you will find nowhere else.",
    material: "House velvet, steam-bent beech",
    colors: [
      { name: "Forest", hex: "#172D26" },
      { name: "Gold", hex: "#B99252" },
      { name: "Ivory", hex: "#E9E1D1" },
    ],
    dimensions: { width: 80, height: 88, depth: 84 },
    images: [
      "/images/collection-comfort.jpg",
      "/images/interior-6.jpg",
      "/images/interior-1.jpg",
    ],
    designerId: "julian-marchetti",
    badge: "New",
  },
  {
    id: "p-kotka-chair",
    slug: "kotka-chair",
    name: "Kotka Chair",
    category: "chairs",
    price: 420,
    description:
      "A pure wooden dining or desk chair in warm birch, its curved backrest shaped for hours of quiet work.",
    story:
      "Kotka is machined from Finnish birch grown within 200 km of the workshop, then oiled by hand three times.",
    material: "Solid birch, natural oil",
    colors: [
      { name: "Birch", hex: "#C9A876" },
      { name: "Walnut", hex: "#6B4B33" },
      { name: "Ebony", hex: "#24231F" },
    ],
    dimensions: { width: 46, height: 82, depth: 50 },
    images: [
      "/images/prod-wooden-chair.jpg",
      "/images/interior-7.jpg",
      "/images/workshop.jpg",
    ],
    designerId: "elias-verhoeven",
    badge: "Bestseller",
    bestseller: true,
  },
  {
    id: "p-atelier-dining-chair",
    slug: "atelier-dining-chair",
    name: "Atelier Dining Chair",
    category: "chairs",
    price: 380,
    description:
      "A sculpted minimal chair in soft white fabric over moulded plywood — light in the hand, light in the room.",
    story:
      "Just 3.9 kg per chair: the Atelier carries its comfort in a shell only 11 mm thick.",
    material: "Moulded plywood, wool blend",
    colors: [
      { name: "Chalk", hex: "#F4EFE4" },
      { name: "Mustard", hex: "#C79535" },
      { name: "Forest", hex: "#172D26" },
    ],
    dimensions: { width: 44, height: 78, depth: 52 },
    images: [
      "/images/prod-white-chair.jpg",
      "/images/interior-7.jpg",
      "/images/interior-2.jpg",
    ],
    designerId: "amara-osei",
  },
  {
    id: "p-heritage-chair",
    slug: "heritage-chair",
    name: "Heritage Chair",
    category: "chairs",
    price: 520,
    description:
      "An antique-inspired spindle chair, restored lines and all — a small piece of history for the breakfast table.",
    story:
      "Each Heritage chair is aged and finished by hand, so no two patinas are alike.",
    material: "Reclaimed pine, wax finish",
    colors: [
      { name: "Honey", hex: "#B98A54" },
      { name: "Ash", hex: "#8A8378" },
      { name: "Forest", hex: "#172D26" },
    ],
    dimensions: { width: 48, height: 86, depth: 50 },
    images: [
      "/images/prod-antique-chair.jpg",
      "/images/workshop-2.jpg",
      "/images/interior-8.jpg",
    ],
    designerId: "julian-marchetti",
  },
  {
    id: "p-ondulation-table",
    slug: "ondulation-table",
    name: "Ondulation Table",
    category: "tables",
    price: 1890,
    description:
      "A solid-wood dining table whose breadboard ends ripple like water — seating six with room to breathe.",
    story:
      "Cut from a single walnut flitch, the Ondulation's grain mirrors across the top like a mirrored drawing.",
    material: "American walnut, brass pins",
    colors: [
      { name: "Walnut", hex: "#6B4B33" },
      { name: "Oak", hex: "#C9A876" },
      { name: "Ebony", hex: "#24231F" },
    ],
    dimensions: { width: 210, height: 74, depth: 95 },
    images: [
      "/images/prod-wooden-table.jpg",
      "/images/interior-7.jpg",
      "/images/workshop.jpg",
    ],
    designerId: "elias-verhoeven",
    bestseller: true,
  },
  {
    id: "p-farmhouse-table",
    slug: "farmhouse-table",
    name: "Farmhouse Table",
    category: "tables",
    price: 2150,
    description:
      "Warmly lit rustic charm in solid pine, hand-planed to keep the marks of its making.",
    story:
      "A modern take on the communal farm table — built for long dinners and longer conversations.",
    material: "Reclaimed pine, iron braces",
    colors: [
      { name: "Rustic Pine", hex: "#A9793F" },
      { name: "Whitewash", hex: "#EFE8DA" },
      { name: "Charcoal", hex: "#24231F" },
    ],
    dimensions: { width: 220, height: 75, depth: 90 },
    images: [
      "/images/prod-rustic-table.jpg",
      "/images/interior-8.jpg",
      "/images/workshop-2.jpg",
    ],
    designerId: "julian-marchetti",
  },
  {
    id: "p-solstice-floor-lamp",
    slug: "solstice-floor-lamp",
    name: "Solstice Floor Lamp",
    category: "lighting",
    price: 640,
    description:
      "A slender arc lamp in aged brass that pours warm, cinematic light across sofas and reading chairs.",
    story:
      "The Solstice's brass is left unlacquered so it earns its patina — like a good piece of furniture should.",
    material: "Aged brass, linen shade",
    colors: [
      { name: "Aged Brass", hex: "#B99252" },
      { name: "Polished Gold", hex: "#D8B16A" },
      { name: "Carbon", hex: "#24231F" },
    ],
    dimensions: { width: 42, height: 168, depth: 42 },
    images: [
      "/images/lamp-corner.jpg",
      "/images/interior-4.jpg",
      "/images/interior-5.jpg",
    ],
    designerId: "amara-osei",
    badge: "New",
  },
  {
    id: "p-trio-salon-lamps",
    slug: "trio-salon-lamps",
    name: "Trio Salon Lamps",
    category: "lighting",
    price: 880,
    description:
      "A family of three sculptural table lamps — set them on a console and the room arranges itself.",
    story:
      "Turned, ground and balanced as a set, the Trio is shipped with matched dimmable warm bulbs.",
    material: "Spun brass, opal glass",
    colors: [
      { name: "Brass", hex: "#B99252" },
      { name: "Champagne", hex: "#D8B16A" },
      { name: "Smoke", hex: "#4A4640" },
    ],
    dimensions: { width: 30, height: 56, depth: 30 },
    images: [
      "/images/lamp-room.jpg",
      "/images/interior-3.jpg",
      "/images/interior-minimal.jpg",
    ],
    designerId: "julian-marchetti",
  },
  {
    id: "p-bois-console",
    slug: "bois-console",
    name: "Bois Console",
    category: "storage",
    price: 1320,
    description:
      "A slim oak console with a floating drawer — perfect behind a sofa or in an entryway.",
    story:
      "The drawer runs on waxed maple runners and closes with a felted sigh.",
    material: "White oak, maple runners",
    colors: [
      { name: "Oak", hex: "#C9A876" },
      { name: "Smoked Oak", hex: "#7A5A3A" },
      { name: "Forest", hex: "#172D26" },
    ],
    dimensions: { width: 140, height: 82, depth: 36 },
    images: [
      "/images/prod-console.jpg",
      "/images/interior-3.jpg",
      "/images/interior-6.jpg",
    ],
    designerId: "amara-osei",
  },
  {
    id: "p-cucina-sideboard",
    slug: "cucina-sideboard",
    name: "Cucina Sideboard",
    category: "storage",
    price: 1680,
    description:
      "Scandinavian restraint in light wood — soft-close doors, inner drawers and a honey-toned finish.",
    story:
      "Designed alongside our dining tables, the Cucina holds a full service for twelve behind two quiet doors.",
    material: "Birch veneer, solid ash",
    colors: [
      { name: "Honey", hex: "#C9A876" },
      { name: "Chalk", hex: "#F4EFE4" },
      { name: "Charcoal", hex: "#24231F" },
    ],
    dimensions: { width: 180, height: 78, depth: 45 },
    images: [
      "/images/interior-7.jpg",
      "/images/prod-contemporary-chair.jpg",
      "/images/interior-8.jpg",
    ],
    designerId: "elias-verhoeven",
    badge: "Bestseller",
    bestseller: true,
  },
];

export const bestsellers = products.filter((p) => p.bestseller);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(cat: CategorySlug) {
  return products.filter((p) => p.category === cat);
}

export function relatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) +
        (p.designerId === product.designerId ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}
