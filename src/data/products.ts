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

export type ProductBadge = "New" | "Bestseller" | "Limited";

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
  badge?: ProductBadge;
  featured?: boolean;
  bestseller?: boolean;
}

/** Persian labels for product badges. */
export const badgeLabels: Record<ProductBadge, string> = {
  New: "تازه‌رسیده",
  Bestseller: "پرفروش",
  Limited: "نسخه محدود",
};

export const categoryMeta: Record<
  CategorySlug,
  { label: string; blurb: string }
> = {
  couches: { label: "مبل‌های راحتی", blurb: "مبل‌هایی راحت برای لحظه‌های آسودگی" },
  armchairs: { label: "مبل‌های تک‌نفره", blurb: "صندلی‌های راحتی برای نشستن‌های دلخواه" },
  chairs: { label: "صندلی‌ها", blurb: "صندلی‌های مدرن برای خانه و محل کار" },
  tables: { label: "میزها", blurb: "میزهای مجسمه‌وار برای دور هم بودن" },
  lighting: { label: "روشنایی", blurb: "نوری گرم و سینمایی" },
  storage: { label: "کمد و فضای نگهداری", blurb: "کنسول‌ها و کابینت‌های ظریف" },
};

export const products: Product[] = [
  {
    id: "p-drop-chair",
    slug: "drop-chair",
    name: "صندلی دراپ",
    category: "armchairs",
    price: 1180,
    originalPrice: 1390,
    description:
      "صندلی دراپ، تلفیقی از طراحی مدرن، ظرافت و راحتی است. فرم منحصربه‌فرد، روکش چرمی باکیفیت و رنگ زرد گرم آن، جلوه‌ای چشم‌نواز به فضای زندگی شما می‌بخشد.",
    story:
      "صندلی دراپ با یک مطالعه در یک حرکت پیوسته آغاز شد — نشیمنی که از یک منحنی روان تراشیده شده است. پوستهٔ مجسمه‌وار آن با چرم خردلیِ رنگ‌شده به‌صورت دستی و روی قاب گردوی روغن‌خورده پرداخت می‌شود؛ امضای «نسخه چرم زرد» ما.",
    material: "چرم رنگ‌شده دستی، گردوی روغن‌خورده",
    colors: [
      { name: "خردلی", hex: "#C79535" },
      { name: "عاجی", hex: "#E9E1D1" },
      { name: "جنگلی", hex: "#172D26" },
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
    name: "مبل لین",
    category: "couches",
    price: 3480,
    description:
      "مبل سه‌نفره‌ای جادار با روکش مخمل جنگلی عمیق. فرمِ پایین و ساختاری نرم، با اقتداری آرام قالبِ اتاق می‌شود.",
    story:
      "الهام‌گرفته از فرهنگ سالن‌های بروکسلِ میانهٔ قرن، لین قاب راش را با نشیمن‌های فومی پیچیده‌شده در پر ترکیب می‌کند؛ ترکیبی که ده‌ها سال فرم خود را نگه می‌دارد.",
    material: "مخمل جنگلی، راش یکپارچه",
    colors: [
      { name: "جنگلی", hex: "#172D26" },
      { name: "شامپاینی", hex: "#D8B16A" },
      { name: "عاجی", hex: "#E9E1D1" },
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
    name: "مبل میلانو",
    category: "couches",
    price: 4200,
    description:
      "مبل چرم عاجیِ سینمایی با پایه‌های فولادی به پرداخت برنجی؛ ساخته‌شده برای فضاهای تیره و دراماتیک و نور گرم چراغ.",
    story:
      "هر میلانو روی میز کارِ یک روکش‌کار و از دوخت اول تا تکمیل نهایی ساخته می‌شود — دو هفته هنر در آتلیهٔ میلان ما.",
    material: "چرم دانه‌کامل، فولاد با پرداخت برنجی",
    colors: [
      { name: "عاجی", hex: "#E9E1D1" },
      { name: "ذغالی", hex: "#24231F" },
      { name: "خردلی", hex: "#C79535" },
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
    name: "مبل آتلیه",
    category: "couches",
    price: 2890,
    description:
      "کوسن‌های عمیق، دسته‌های مجسمه‌وار و بافت بوله‌ای به نرمی نجوا — آتلیه، راحتی‌ای است دوخته‌شده مثل پوشاک اوت‌کوتور.",
    story:
      "به نام کارگاهی که در آن ساخته می‌شود؛ آتلیه در هر مبل از ۴٫۲ کیلومتر نخ بوله بهره می‌گیرد که روی دستگاه بافِ قرن نوزدهمی بافته شده است.",
    material: "بوله، چوب سخت خشک‌شده در کوره",
    colors: [
      { name: "جو", hex: "#DCD1BD" },
      { name: "خزه‌ای", hex: "#2E4638" },
      { name: "شامپاینی", hex: "#D8B16A" },
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
    name: "مبل بلویل",
    category: "couches",
    price: 2240,
    description:
      "دونفره‌ای جمع‌وجور با پایه سکویی و خطوطی بی‌تکلف — آغازگری شیک برای آپارتمان‌های کوچک‌تر.",
    story:
      "برگرفته از سفارش یک آپارتمان پاریسی در سال ۱۹۶۲، بلویل پشتی کوبیده‌شدهٔ کم‌عمق اصلی خود را نگه داشته است.",
    material: "بافت کتان، پایه بلوط",
    colors: [
      { name: "عاجی", hex: "#E9E1D1" },
      { name: "جنگلی", hex: "#172D26" },
      { name: "خاکی", hex: "#A8825C" },
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
    name: "صندلی راحتی والنورد",
    category: "armchairs",
    price: 1460,
    description:
      "صندلی راحتی گرد و دربرگیرنده در بافت بژ نرم با پایه‌های بلوط یکپارچه — همراهِ مطالعهٔ این خانه.",
    story:
      "پوستهٔ والنورد در یک فشار قالب‌گیری می‌شود؛ رازی که به صندلی سیلوئت یکپارچه و آغوش‌گونه‌اش می‌بخشد.",
    material: "بافت بوله، بلوط یکپارچه",
    colors: [
      { name: "بژ", hex: "#DCD1BD" },
      { name: "ذغالی", hex: "#24231F" },
      { name: "سبز مریم‌گلی", hex: "#93B496" },
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
    name: "صندلی سالن ورده",
    category: "armchairs",
    price: 1290,
    description:
      "مخمل جنگلیِ گرم و دسته‌های خمیده راش، به ورده حال‌وهوای یک کلوب خصوصی می‌بخشد؛ در هر سالنی خانه می‌کند.",
    story:
      "مخمل آن در تیراژ کوچک به رنگ سبز جنگلی خانهٔ ما رنگ می‌شود؛ رنگی که در هیچ‌جای دیگری پیدا نمی‌کنید.",
    material: "مخمل اختصاصی، راش خم‌شده با بخار",
    colors: [
      { name: "جنگلی", hex: "#172D26" },
      { name: "طلایی", hex: "#B99252" },
      { name: "عاجی", hex: "#E9E1D1" },
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
    name: "صندلی کوتکا",
    category: "chairs",
    price: 420,
    description:
      "صندلی چوبی خالص برای غذاخوری یا میز کار، در توس گرم؛ پشتی خمیده‌اش برای ساعت‌ها کار آرام فرم گرفته است.",
    story:
      "کوتکا از توس فنلاندی که در ۲۰۰ کیلومتری کارگاه روییده است ماشین‌کاری و سپس سه بار به دست روغن‌کاری می‌شود.",
    material: "توس یکپارچه، روغن طبیعی",
    colors: [
      { name: "توس", hex: "#C9A876" },
      { name: "گردویی", hex: "#6B4B33" },
      { name: "آبنوس", hex: "#24231F" },
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
    name: "صندلی غذاخوری آتلیه",
    category: "chairs",
    price: 380,
    description:
      "صندلی مینیمالِ مجسمه‌وار در پارچه سفید نرم روی تخته‌لای قالب‌ریخته — سبک در دست، سبک در فضا.",
    story:
      "تنها ۳٫۹ کیلوگرم برای هر صندلی: آتلیه راحتی‌اش را در پوسته‌ای به ضخامت ۱۱ میلی‌متر جای داده است.",
    material: "تخته‌لای قالب‌ریخته، پشم مخلوط",
    colors: [
      { name: "گچی", hex: "#F4EFE4" },
      { name: "خردلی", hex: "#C79535" },
      { name: "جنگلی", hex: "#172D26" },
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
    name: "صندلی هرمیتیج",
    category: "chairs",
    price: 520,
    description:
      "صندلی میله‌ای الهام‌گرفته از سبک عتیقه، با خطوط بازیابی‌شده — تکه‌ای کوچک از تاریخ برای میز صبحانه.",
    story:
      "هر صندلی هرمیتیج به دست کهنه‌کاری و پرداخت می‌شود؛ پس هیچ دو لایه‌ای شبیه هم نیستند.",
    material: "کاج بازیافتی، پرداخت موم",
    colors: [
      { name: "عسلی", hex: "#B98A54" },
      { name: "خاکستری", hex: "#8A8378" },
      { name: "جنگلی", hex: "#172D26" },
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
    name: "میز اوندولاسیون",
    category: "tables",
    price: 1890,
    description:
      "میز غذاخوری چوب یکپارچه که لبه‌هایش موج‌هایی چون آب دارند — جای نشستن شش نفر، با فضایی برای نفس کشیدن.",
    story:
      "بریده‌شده از یک تکه گردوی یکپارچه؛ رگه‌های اوندولاسیون روی صفحه چون نقاشی‌ای آینه‌ای ادامه می‌یابند.",
    material: "گردوی آمریکایی، میخ‌پون برنجی",
    colors: [
      { name: "گردویی", hex: "#6B4B33" },
      { name: "بلوطی", hex: "#C9A876" },
      { name: "آبنوس", hex: "#24231F" },
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
    name: "میز روستایی",
    category: "tables",
    price: 2150,
    description:
      "گرم و چوبی، در کاج یکپارچه که رندهٔ دستی، ردِ ساخته‌شدن را روی آن نگه داشته است.",
    story:
      "روایتی مدرن از میز جمعی روستایی — ساخته‌شده برای شام‌های بلند و گفت‌وگوهای بلندتر.",
    material: "کاج بازیافتی، مهار آهنی",
    colors: [
      { name: "کاج روستایی", hex: "#A9793F" },
      { name: "سفیدشده", hex: "#EFE8DA" },
      { name: "ذغالی", hex: "#24231F" },
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
    name: "چراغ ایستاده سولستیس",
    category: "lighting",
    price: 640,
    description:
      "چراغ قوسی کشیده در برنجی کهنه که نوری گرم و سینمایی روی مبل و صندلی مطالعه می‌ریزد.",
    story:
      "برنجِ سولستیس بدون لاک نگه داشته می‌شود تا لایهٔ کهنگی‌اش را به‌مرور به دست آورد؛ همان‌گونه که یک مبلمان خوب باید.",
    material: "برنج کهنه، کاسه کتان",
    colors: [
      { name: "برنج کهنه", hex: "#B99252" },
      { name: "طلایی براق", hex: "#D8B16A" },
      { name: "دودی", hex: "#24231F" },
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
    name: "چراغ‌های رومیزی تریو",
    category: "lighting",
    price: 880,
    description:
      "خانواده‌ای از سه چراغ رومیزی مجسمه‌وار — روی کنسول بچینید و اتاق خودش را مرتب می‌کند.",
    story:
      "به‌صورت مجموعه تراش، سنگ‌زنی و بالانس می‌شود؛ تریو با لامپ‌های گرمِ کم‌نورشوندهٔ جفت‌شده ارسال می‌شود.",
    material: "برنج تراش‌خورده، شیشه اُپال",
    colors: [
      { name: "برنجی", hex: "#B99252" },
      { name: "شامپاینی", hex: "#D8B16A" },
      { name: "دودی", hex: "#4A4640" },
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
    name: "کنسول بوآ",
    category: "storage",
    price: 1320,
    description:
      "کنسول باریک بلوط با کشویی شناور — مناسب پشت مبل یا راهرو ورودی.",
    story:
      "کشو روی ریل‌های مومی‌شدهٔ افرا حرکت می‌کند و با نجوایی محو بسته می‌شود.",
    material: "بلوط سفید، ریل افرا",
    colors: [
      { name: "بلوطی", hex: "#C9A876" },
      { name: "بلوط دودی", hex: "#7A5A3A" },
      { name: "جنگلی", hex: "#172D26" },
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
    name: "سایدبورد کوچینا",
    category: "storage",
    price: 1680,
    description:
      "خودداری اسکاندیناوی در چوب روشن — درهای آرام‌بسته، کشوهای داخلی و پرداخت عسلی.",
    story:
      "همراه میزهای غذاخوری ما طراحی شده است؛ کوچینا سرویس کامل دوازده‌نفره را پشت دو درِ آرام جای می‌دهد.",
    material: "روکش توس، زان یکپارچه",
    colors: [
      { name: "عسلی", hex: "#C9A876" },
      { name: "گچی", hex: "#F4EFE4" },
      { name: "ذغالی", hex: "#24231F" },
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
