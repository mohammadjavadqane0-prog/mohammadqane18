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
    name: "الیاس وروهوون",
    discipline: "زندگی مدرن",
    location: "بروکسل، بلژیک",
    portrait: "/images/portrait-2.jpg",
    studioImage: "/images/interior-5.jpg",
    bio: "الیاس وروهوون پیش از آنکه نگاهش را به مبلمان بسپارد معماری خوانده است — و این دیده می‌شود: مبل‌ها و میزهایش اتاق‌هایی در مینیاتورند؛ ساخت‌یافته، آرام و جادار. از زمان پیوستن به میزون ور، مجموعه زندگی مدرن ما را شکل داده و به آنچه «مهندسیِ آرام» می‌نامد پایبند است.",
    philosophy:
      "یک مبل باید گفت‌وگو را همان‌گونه در خود نگه دارد که معماری نور را — بی‌آنکه طلب توجه کند.",
    signature: "مبل لین",
  },
  {
    id: "amara-osei",
    slug: "amara-osei",
    name: "آمارا اوسه‌ای",
    discipline: "راحتی معاصر",
    location: "آکرا ← میلان",
    portrait: "/images/portrait-1.jpg",
    studioImage: "/images/interior-3.jpg",
    bio: "آمارا اوسه‌ای گرمای متریال غرب آفریقا را با دقت میلانی ترکیب می‌کند. صندلی دراپ او — محبوب‌ترین سیلوئت خانه — از یک طرح گِلی آغاز شد و همچنان صمیمی‌ترین طراحی است که نگهش می‌داریم. او برنامه منسوجات ما را پیش می‌برد و مخمل و بوله را در کارگاه خودمان رنگ می‌کند.",
    philosophy:
      "راحتی، نرمی نیست. راحتی فرمی است که بدن را پیش از آنکه بنشیند، می‌فهمد.",
    signature: "صندلی دراپ",
  },
  {
    id: "julian-marchetti",
    slug: "julian-marchetti",
    name: "جولیان مارکتی",
    discipline: "کلاسیک‌های ماندگار",
    location: "کپنهاگ، دانمارک",
    portrait: "/images/portrait-4.jpg",
    studioImage: "/images/workshop.jpg",
    bio: "جولیان مارکتی، نجارِ نسل سوم، هنوز روکش‌های چوبی‌اش را خودش می‌بُرد. صندلی‌ها و میزهایش به استادان دانمارکی ادای احترام می‌کنند بی‌آنکه تقلیدشان کنند — اتصالات صادقانه، منحنی‌های صبورانه و چوبی که اجازه دارد چوب بماند.",
    philosophy:
      "ترندها پر سر و صدا هستند. ماندگاری آرام است — فقط حاضر نیست اتاق را ترک کند.",
    signature: "میز اوندولاسیون",
  },
];

export function getDesigner(slug: string) {
  return designers.find((d) => d.slug === slug);
}
