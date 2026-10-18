export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  cover: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-quiet-luxury-of-forest-green",
    title: "The Quiet Luxury of Forest Green",
    category: "Trends",
    date: "2026-09-28",
    readTime: "6 min",
    excerpt:
      "Why deep botanical greens have become the signature backdrop of contemporary luxury interiors — and how to live with them.",
    cover: "/images/collection-comfort.jpg",
    content: [
      "There is a reason galleries paint their walls green: the colour recedes so the object can arrive. Forest green does this better than almost any other tone — deep enough to hold shadow, warm enough to feel alive.",
      "In our Milano campaigns we light forest-green walls from the side, letting a single brass lamp carry the glow. The result is cinematic, but never theatrical: the room still feels like a room.",
      "To live with green, keep the field of colour generous and the punctuation minimal. One gold lamp. One mustard cushion. Everything else stays quiet.",
      "Our house green, #172D26, was mixed to sit behind both pale leather and dark wood. Test it at dusk, not at noon — this is a colour that keeps its promise after dark.",
    ],
  },
  {
    slug: "how-to-choose-a-sofa-that-lasts-decades",
    title: "How to Choose a Sofa That Lasts Decades",
    category: "Guides",
    date: "2026-09-04",
    readTime: "8 min",
    excerpt:
      "Frames, fillings, fabrics: our workshop director shares the five questions that separate a decade of comfort from a season of regret.",
    cover: "/images/prod-green-sofa.jpg",
    content: [
      "Start with the frame — everything else is upholstery. Kiln-dried hardwood with mortise-and-tenon joints will outlive any suspension system stapled into particleboard.",
      "Ask about the filling. Feather-wrapped foam keeps shape like foam and feels like feather; down alone needs daily fluffing; foam alone reads flat within years.",
      "Fabric is a lifestyle decision. Bouclé hides life; velvet photographs beautifully; full-grain leather ages like a biography, recording every year of use.",
      "Finally, sit the way you actually live. If you read sideways, test it sideways. A sofa that is beautiful but wrong for your evenings is a sculpture, not furniture.",
    ],
  },
  {
    slug: "inside-the-milan-atelier",
    title: "Inside the Milan Atelier",
    category: "Craft",
    date: "2026-08-12",
    readTime: "5 min",
    excerpt:
      "Two weeks, one upholsterer, one sofa. A photo essay from the bench where every Milano begins and ends.",
    cover: "/images/workshop.jpg",
    content: [
      "The atelier smells of oak shavings and leather dressing. Light comes from tall north windows — the same light painters prefer, because it never lies about a seam.",
      "Each upholsterer signs the underside rail of every piece they complete. It is not a marketing gesture; it is accountability measured in decades.",
      "Leather is cut the day it is stitched. Waiting invites stretch; a Milano cut on Monday is sewn on Monday.",
      "The final inspection happens in lamplight, at dusk, the way the sofa will actually be seen in your home.",
    ],
  },
  {
    slug: "five-rooms-that-teach-you-lighting",
    title: "Five Rooms That Teach You Lighting",
    category: "Trends",
    date: "2026-07-19",
    readTime: "7 min",
    excerpt:
      "Lamps at three heights, shadows you can lean into, and why overhead light is the last resort of the unimaginative.",
    cover: "/images/lamp-room.jpg",
    content: [
      "Every well-designed room we study shares one habit: at least three light sources, all below eye level, all warm.",
      "A floor lamp beside the sofa creates a reading island. A pair of table lamps on a console doubles the depth of a hallway.",
      "Overhead light flattens faces and rooms alike. Reserve it for finding keys, not for living.",
      "Choose shades of linen, not glass — diffusion is the difference between light and glare.",
    ],
  },
  {
    slug: "the-drop-chair-story",
    title: "The Drop Chair Story",
    category: "Design",
    date: "2026-06-30",
    readTime: "4 min",
    excerpt:
      "From a lump of clay on Amara Osei's desk to the house's most requested silhouette — the making of the Drop Chair.",
    cover: "/images/featured-armchair.jpg",
    content: [
      "The first Drop Chair was modelled in a single morning, in clay, on a windowsill in Accra. The curve has not changed since.",
      "Its challenge is invisible: the seat appears to float on a walnut frame, with no visible support where the eye insists there must be one.",
      "Mustard leather was chosen almost defensively — a colour confident enough to survive any room it enters.",
      "Today the Drop is made in three finishes, but the Yellow Leather Edition remains the original and, our clients agree, the truest.",
    ],
  },
  {
    slug: "set-a-table-people-linger-at",
    title: "Set a Table People Linger At",
    category: "Guides",
    date: "2026-06-02",
    readTime: "6 min",
    excerpt:
      "Tables are measured in hours, not centimetres. A short essay on proportion, elbow room, and the geometry of long dinners.",
    cover: "/images/interior-7.jpg",
    content: [
      "Allow 60 cm of table per person and dinners lengthen by themselves. Cramped guests eat; comfortable guests talk.",
      "Wood wants to be touched. Choose a finish that improves with hands — oiled walnut beats lacquer in every decade that follows year one.",
      "A table with room to breathe — nothing on it but candles and bread — invites leaning in. Clutter invites leaving.",
    ],
  },
];
