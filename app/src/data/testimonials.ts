export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  product: string;
  productSlug: string;
  weightLost?: string;
  duration: string;
  quote: string;
  longQuote: string;
  rating: number;
  verified: boolean;
  videoId?: string; // Sora-generated video testimonial ID
  beforeImage?: string;
  afterImage?: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    age: 42,
    location: "Austin, TX",
    product: "Semaglutide",
    productSlug: "semaglutide",
    weightLost: "47 lbs",
    duration: "4 months",
    quote: "I tried every diet for 20 years. FormBlends Semaglutide changed everything in the first month.",
    longQuote: "I have been battling my weight since my late twenties. Every diet, every program, every app. Nothing stuck. My doctor mentioned GLP-1 therapy and I was skeptical, but I decided to try FormBlends Semaglutide. Within the first two weeks, something shifted. The constant food noise in my head just... quieted. I was not white-knuckling it through cravings anymore. Four months later, I am down 47 pounds and I feel like a completely different person. My energy is through the roof, my blood work has improved across the board, and I actually enjoy being active again. This is not a diet. This is what finally worked.",
    rating: 5,
    verified: true,
    videoId: "sora_sarah_001",
    avatar: "/images/testimonials/sarah.webp",
  },
  {
    id: "t2",
    name: "Marcus Johnson",
    age: 38,
    location: "Denver, CO",
    product: "Tirzepatide",
    productSlug: "tirzepatide",
    weightLost: "63 lbs",
    duration: "5 months",
    quote: "63 pounds gone. My doctor said my metabolic panels look like a different patient.",
    longQuote: "I was 285 pounds with pre-diabetes and high blood pressure at 38. My wife was worried. I was worried. When I started researching GLP-1 options, Tirzepatide stood out because of the dual-action mechanism. Five months with FormBlends Tirzepatide and I have lost 63 pounds. But the numbers on the scale are not even the best part. My A1C went from 6.3 to 5.1. My blood pressure normalized. My doctor literally said 'whatever you are doing, keep doing it.' I have my energy back, I am playing basketball again, and my kids say I look ten years younger. Worth every penny.",
    rating: 5,
    verified: true,
    videoId: "sora_marcus_001",
    avatar: "/images/testimonials/marcus.webp",
  },
  {
    id: "t3",
    name: "Jennifer Lee",
    age: 35,
    location: "Seattle, WA",
    product: "Semaglutide",
    productSlug: "semaglutide",
    weightLost: "38 lbs",
    duration: "3 months",
    quote: "The food noise is gone. I think about food when I am hungry, not every waking moment.",
    longQuote: "I never realized how much mental energy I spent thinking about food until it stopped. That is the thing nobody tells you about GLP-1 therapy. Yes, you lose weight. But the mental freedom is the real transformation. I used to plan my whole day around meals and snacks. I would think about lunch during breakfast. I would stress about dinner at 2pm. Three months on Semaglutide and all of that is just... gone. I eat when I am hungry, I stop when I am full, and I do not think about food in between. I have lost 38 pounds, but I have gained my brain back. I am more productive at work, more present with my family, and genuinely happier.",
    rating: 5,
    verified: true,
    videoId: "sora_jennifer_001",
    avatar: "/images/testimonials/jennifer.webp",
  },
  {
    id: "t4",
    name: "David Chen",
    age: 51,
    location: "San Francisco, CA",
    product: "Tirzepatide",
    productSlug: "tirzepatide",
    weightLost: "72 lbs",
    duration: "6 months",
    quote: "At 51, I am in better shape than I was at 30. Tirzepatide gave me a second chance.",
    longQuote: "I hit 260 pounds on my 50th birthday and had a wake-up call. My father died of a heart attack at 58. I did not want to follow the same path. I started Tirzepatide six months ago and the results have been life-changing. 72 pounds down, and every health marker has improved dramatically. My resting heart rate dropped from 82 to 62. My cholesterol is normal for the first time in a decade. I can run a 5K again. My wife says it is like being married to the guy she met in college. The science behind this compound is extraordinary, and FormBlends quality has been flawless batch after batch.",
    rating: 5,
    verified: true,
    videoId: "sora_david_001",
    avatar: "/images/testimonials/david.webp",
  },
  {
    id: "t5",
    name: "Amanda Torres",
    age: 29,
    location: "Miami, FL",
    product: "Semaglutide",
    productSlug: "semaglutide",
    weightLost: "31 lbs",
    duration: "10 weeks",
    quote: "10 weeks and 31 pounds. I wish I had started sooner instead of wasting years on fad diets.",
    longQuote: "I spent my entire twenties trying to lose the same 30 pounds. Keto, paleo, intermittent fasting, calorie counting - I tried everything. Some worked for a few weeks, then the weight came right back. Semaglutide from FormBlends is the first thing that has actually addressed the root cause. My appetite is naturally regulated now. I do not feel restricted or deprived. I just eat less because my body is finally sending the right signals. 31 pounds in 10 weeks, and I genuinely believe this weight is gone for good because my entire relationship with food has changed.",
    rating: 5,
    verified: true,
    videoId: "sora_amanda_001",
    avatar: "/images/testimonials/amanda.webp",
  },
  {
    id: "t6",
    name: "Robert Kim",
    age: 45,
    location: "Chicago, IL",
    product: "BPC-157 / TB-500 Blend",
    productSlug: "bpc-157-tb-500-blend",
    duration: "6 weeks",
    quote: "My torn rotator cuff that surgeons wanted to operate on healed in 6 weeks. Unbelievable.",
    longQuote: "I tore my rotator cuff playing tennis and two orthopedic surgeons recommended surgery. A friend in sports medicine suggested I try BPC-157 and TB-500 before going under the knife. I was skeptical but figured I had nothing to lose. Six weeks of the FormBlends blend and my follow-up MRI showed significant healing. My surgeon was genuinely surprised. I have full range of motion now, no pain, and I never needed surgery. I am back on the tennis court playing better than before. This stuff works. The science is real.",
    rating: 5,
    verified: true,
    videoId: "sora_robert_001",
    avatar: "/images/testimonials/robert.webp",
  },
  {
    id: "t7",
    name: "Lisa Nguyen",
    age: 33,
    location: "Portland, OR",
    product: "Semax",
    productSlug: "semax",
    duration: "2 months",
    quote: "My focus and mental clarity are on another level. I got promoted within 2 months of starting.",
    longQuote: "I work in software engineering and brain fog was killing my productivity. I would stare at code for hours without making progress. A colleague told me about Semax and I decided to try it. The difference was noticeable within the first week. My focus sharpened, I could hold complex problems in my head longer, and my code reviews started getting praise instead of corrections. Two months later, I got promoted to senior engineer. I can not attribute that entirely to Semax, but the cognitive improvement was dramatic and undeniable. FormBlends quality has been consistently excellent.",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/lisa.webp",
  },
  {
    id: "t8",
    name: "Michael Brown",
    age: 56,
    location: "Nashville, TN",
    product: "CJC-1295 / Ipamorelin Blend",
    productSlug: "cjc-1295-ipamorelin",
    duration: "3 months",
    quote: "Sleeping like I am 25 again. The deep sleep improvement alone is worth it.",
    longQuote: "At 56, I had not slept through the night in years. I would wake up at 2am, 4am, and drag through the next day. My recovery from workouts was terrible and I was losing muscle despite training hard. Three months on CJC-1295/Ipamorelin from FormBlends and the transformation is remarkable. I am sleeping 7-8 hours of deep, uninterrupted sleep. My body composition has shifted visibly. I have more lean muscle, less belly fat, and my recovery time between workouts has been cut in half. My trainer noticed the difference before I even told him what I was taking.",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/michael.webp",
  },
  {
    id: "t9",
    name: "Karen Wallace",
    age: 48,
    location: "Scottsdale, AZ",
    product: "GHK-Cu Topical Serum",
    productSlug: "ghk-cu-topical",
    duration: "8 weeks",
    quote: "My aesthetician asked what procedure I had done. Just FormBlends copper peptide serum.",
    longQuote: "I have spent thousands on skincare over the years. Retinol, vitamin C serums, professional peels, even considered laser treatments. Then I read the research on GHK-Cu and decided to try the FormBlends topical serum. Eight weeks later, my aesthetician genuinely asked what cosmetic procedure I had done. The fine lines around my eyes have softened dramatically, my skin texture is smoother, and there is a firmness that was not there before. The best part is zero irritation. My retinol always made me peel and get red. This just works quietly and effectively. I have gotten more compliments on my skin in the last two months than in the last two years.",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/karen.webp",
  },
  {
    id: "t10",
    name: "James Wright",
    age: 44,
    location: "Atlanta, GA",
    product: "Semaglutide",
    productSlug: "semaglutide",
    weightLost: "55 lbs",
    duration: "5 months",
    quote: "I dropped 55 lbs and reversed my pre-diabetes. My doctor took me off metformin.",
    longQuote: "Pre-diabetic at 44 with a family history of Type 2 diabetes. I was on metformin and heading toward insulin. My endocrinologist suggested trying GLP-1 therapy. Five months on FormBlends Semaglutide and I have lost 55 pounds, my A1C went from 6.4 to 4.9, and my doctor took me off metformin entirely. I went from being on the path to diabetes to having the metabolic health of someone half my age. I am emotional just thinking about it because I watched diabetes destroy my father's health. This compound may have literally saved my life.",
    rating: 5,
    verified: true,
    videoId: "sora_james_001",
    avatar: "/images/testimonials/james.webp",
  },
];

export const getTestimonialsByProduct = (productSlug: string) =>
  testimonials.filter(t => t.productSlug === productSlug);

export const getVideoTestimonials = () =>
  testimonials.filter(t => t.videoId);

export const getWeightLossTestimonials = () =>
  testimonials.filter(t => t.weightLost);
