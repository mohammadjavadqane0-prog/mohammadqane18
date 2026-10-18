export interface Designer {
  id: string;
  slug: string;
  name: string;
  discipline: string;
  location: string;
  portrait: string;
  studioImage: string;
  bio: string;
  philosophy: string;
  signature: string;
}

export const designers: Designer[] = [
  {
    id: "elias-verhoeven",
    slug: "elias-verhoeven",
    name: "Elias Verhoeven",
    discipline: "Modern Living",
    location: "Brussels, Belgium",
    portrait: "/images/portrait-2.jpg",
    studioImage: "/images/interior-5.jpg",
    bio: "Elias Verhoeven studied architecture before turning his eye to furniture, and it shows: his sofas and tables are rooms in miniature — structured, serene and generous. Since joining MAISON VERT he has shaped our modern living collection, pursuing what he calls 'calm engineering'.",
    philosophy:
      "A sofa should hold a conversation the way architecture holds light — without asking for attention.",
    signature: "The Ligne Sofa",
  },
  {
    id: "amara-osei",
    slug: "amara-osei",
    name: "Amara Osei",
    discipline: "Contemporary Comfort",
    location: "Accra → Milan",
    portrait: "/images/portrait-1.jpg",
    studioImage: "/images/interior-3.jpg",
    bio: "Amara Osei brings West-African material warmth to Milanese rigour. Her Drop Chair — the house's most-loved silhouette — began as a clay sketch and remains our closest held design. She leads our textile programme, dyeing velvet and bouclé in-house.",
    philosophy:
      "Comfort is not softness. Comfort is a shape that understands the body before the body sits down.",
    signature: "The Drop Chair",
  },
  {
    id: "julian-marchetti",
    slug: "julian-marchetti",
    name: "Julian Marchetti",
    discipline: "Timeless Classics",
    location: "Copenhagen, Denmark",
    portrait: "/images/portrait-4.jpg",
    studioImage: "/images/workshop.jpg",
    bio: "A third-generation woodworker, Julian Marchetti still cuts his own veneers. His chairs and tables quote the Danish masters without imitating them — honest joinery, patient curves, wood allowed to be wood.",
    philosophy:
      "Trends are loud. Timelessness is quiet — it simply refuses to leave the room.",
    signature: "The Ondulation Table",
  },
];

export function getDesigner(slug: string) {
  return designers.find((d) => d.slug === slug);
}
