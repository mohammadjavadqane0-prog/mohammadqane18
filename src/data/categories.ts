export interface Category {
  slug: string;
  label: string;
  blurb: string;
}

export const categories: Category[] = [
  { slug: "couches", label: "مبل‌های راحتی", blurb: "مبل‌هایی راحت برای لحظه‌های آسودگی" },
  { slug: "armchairs", label: "مبل‌های تک‌نفره", blurb: "صندلی‌های راحتی برای نشستن‌های دلخواه" },
  { slug: "chairs", label: "صندلی‌ها", blurb: "صندلی‌های مدرن برای خانه و محل کار" },
  { slug: "tables", label: "میزها", blurb: "میزهای مجسمه‌وار برای دور هم بودن" },
  { slug: "lighting", label: "روشنایی", blurb: "نوری گرم و سینمایی" },
  { slug: "storage", label: "کمد و فضای نگهداری", blurb: "کنسول‌ها و کابینت‌های ظریف" },
];
