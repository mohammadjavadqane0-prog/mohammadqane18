export interface Category {
  slug: string;
  label: string;
  blurb: string;
}

export const categories: Category[] = [
  { slug: "couches", label: "Couches", blurb: "Comfortable sofas for relaxation" },
  { slug: "armchairs", label: "Armchairs", blurb: "Comfortable armchairs for seating" },
  { slug: "chairs", label: "Chairs", blurb: "Modern chairs for the office & home" },
  { slug: "tables", label: "Tables", blurb: "Sculptural tables for gathering" },
  { slug: "lighting", label: "Lighting", blurb: "Warm, cinematic illumination" },
  { slug: "storage", label: "Storage", blurb: "Refined cabinetry & consoles" },
];
