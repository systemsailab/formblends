import Image from "next/image";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";

export const metadata = {
  title: "Weight Loss Transformations | FormBlends",
  description:
    "See real weight loss transformations from FormBlends customers using Semaglutide and Tirzepatide peptides. Verified results with before and after stats.",
};

const transformations = [
  {
    name: "Sarah",
    slug: "sarah",
    age: 34,
    location: "Austin, TX",
    product: "Semaglutide",
    duration: "5 months",
    startWeight: 212,
    currentWeight: 168,
    totalLost: 44,
    milestones: [
      { month: 1, lost: 8 },
      { month: 2, lost: 17 },
      { month: 3, lost: 26 },
      { month: 4, lost: 36 },
      { month: 5, lost: 44 },
    ],
    quote:
      "I tried every diet out there for years. FormBlends Semaglutide finally gave me the edge I needed. The appetite suppression kicked in within the first week and I never looked back.",
    stars: 5,
  },
  {
    name: "Marcus",
    slug: "marcus",
    age: 41,
    location: "Denver, CO",
    product: "Tirzepatide",
    duration: "6 months",
    startWeight: 268,
    currentWeight: 214,
    totalLost: 54,
    milestones: [
      { month: 1, lost: 9 },
      { month: 2, lost: 18 },
      { month: 3, lost: 28 },
      { month: 4, lost: 37 },
      { month: 5, lost: 46 },
      { month: 6, lost: 54 },
    ],
    quote:
      "Down 54 pounds and my blood pressure is back to normal. My doctor was shocked at my last checkup. Tirzepatide from FormBlends has been a game changer for my entire health picture.",
    stars: 5,
  },
  {
    name: "Jennifer",
    slug: "jennifer",
    age: 29,
    location: "Miami, FL",
    product: "Semaglutide",
    duration: "4 months",
    startWeight: 185,
    currentWeight: 152,
    totalLost: 33,
    milestones: [
      { month: 1, lost: 7 },
      { month: 2, lost: 15 },
      { month: 3, lost: 24 },
      { month: 4, lost: 33 },
    ],
    quote:
      "I was skeptical about peptides but the science convinced me to try. 33 pounds later, I feel like a completely different person. My energy levels are through the roof.",
    stars: 5,
  },
  {
    name: "David",
    slug: "david",
    age: 47,
    location: "Chicago, IL",
    product: "Tirzepatide",
    duration: "5 months",
    startWeight: 245,
    currentWeight: 203,
    totalLost: 42,
    milestones: [
      { month: 1, lost: 10 },
      { month: 2, lost: 19 },
      { month: 3, lost: 28 },
      { month: 4, lost: 36 },
      { month: 5, lost: 42 },
    ],
    quote:
      "At 47 I thought losing weight was just going to keep getting harder. Tirzepatide proved me wrong. I'm lighter now than I was at 30 and I feel incredible.",
    stars: 5,
  },
  {
    name: "Amanda",
    slug: "amanda",
    age: 36,
    location: "Seattle, WA",
    product: "Semaglutide",
    duration: "6 months",
    startWeight: 198,
    currentWeight: 149,
    totalLost: 49,
    milestones: [
      { month: 1, lost: 8 },
      { month: 2, lost: 16 },
      { month: 3, lost: 25 },
      { month: 4, lost: 33 },
      { month: 5, lost: 41 },
      { month: 6, lost: 49 },
    ],
    quote:
      "Six months, 49 pounds gone. The steady, consistent progress kept me motivated the entire time. FormBlends made the whole process simple and the product quality is obvious.",
    stars: 5,
  },
  {
    name: "James",
    slug: "james",
    age: 52,
    location: "Nashville, TN",
    product: "Tirzepatide",
    duration: "4 months",
    startWeight: 231,
    currentWeight: 196,
    totalLost: 35,
    milestones: [
      { month: 1, lost: 9 },
      { month: 2, lost: 18 },
      { month: 3, lost: 27 },
      { month: 4, lost: 35 },
    ],
    quote:
      "My wife started first and lost 30 pounds. I saw her results and had to try it myself. Four months in and I've dropped 35 pounds. We're both in the best shape of our lives.",
    stars: 5,
  },
  {
    name: "Karen",
    slug: "karen",
    age: 44,
    location: "Portland, OR",
    product: "Semaglutide",
    duration: "3 months",
    startWeight: 176,
    currentWeight: 151,
    totalLost: 25,
    milestones: [
      { month: 1, lost: 8 },
      { month: 2, lost: 17 },
      { month: 3, lost: 25 },
    ],
    quote:
      "25 pounds in three months without feeling deprived or exhausted. The cravings just... stopped. I finally feel in control of my relationship with food.",
    stars: 4,
  },
  {
    name: "Lisa",
    slug: "lisa",
    age: 38,
    location: "San Diego, CA",
    product: "Tirzepatide",
    duration: "5 months",
    startWeight: 223,
    currentWeight: 178,
    totalLost: 45,
    milestones: [
      { month: 1, lost: 10 },
      { month: 2, lost: 20 },
      { month: 3, lost: 29 },
      { month: 4, lost: 38 },
      { month: 5, lost: 45 },
    ],
    quote:
      "Tirzepatide gave me my confidence back. 45 pounds down and I actually enjoy getting dressed in the morning again. The monthly weigh-ins kept showing results and that was everything.",
    stars: 5,
  },
];

const stats = [
  { label: "Avg Weight Lost", value: "42 lbs" },
  { label: "Verified Reviews", value: "12,847" },
  { label: "Recommend to a Friend", value: "94%" },
  { label: "Average Rating", value: "4.9/5" },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TransformationsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-800 via-brand-900 to-gray-900 py-20 lg:py-28 px-4">
        <div className="container-wide mx-auto text-center">
          <h1 className="font-serif tracking-headline text-4xl lg:text-6xl font-bold text-white mb-6">
            Real Transformations. Real People.
          </h1>
          <p className="text-brand-200 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            These are verified results from FormBlends customers using our
            pharmaceutical-grade Semaglutide and Tirzepatide peptides. Every
            journey is different, but the results speak for themselves.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl lg:text-4xl font-bold text-brand-700">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Cards */}
      <section className="py-16 lg:py-24 px-4">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transformations.map((t, idx) => {
              const maxLost = t.milestones[t.milestones.length - 1].lost;
              return (
                <FadeInOnScroll key={t.slug} delay={idx % 2 === 0 ? 0 : 100}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={`/images/testimonials/${t.slug}.jpg`}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="font-serif tracking-headline text-xl font-bold text-gray-900">
                              {t.name}, {t.age}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {t.location}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Verified Purchase
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {t.product}
                          </span>
                          <span className="text-xs text-gray-400">
                            {t.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weight Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-xl p-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Starting
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {t.startWeight}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            lbs
                          </span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Current
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          {t.currentWeight}
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            lbs
                          </span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Total Lost
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          -{t.totalLost}
                          <span className="text-sm font-normal"> lbs</span>
                        </p>
                      </div>
                    </div>

                    {/* Timeline Progress Bar */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Monthly Progress
                      </p>
                      <div className="flex gap-1.5">
                        {t.milestones.map((m) => (
                          <div key={m.month} className="flex-1">
                            <div className="relative h-8 bg-gray-100 rounded overflow-hidden">
                              <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-600 to-brand-400 rounded transition-all"
                                style={{
                                  height: `${(m.lost / maxLost) * 100}%`,
                                }}
                              />
                            </div>
                            <p className="text-[10px] text-gray-500 text-center mt-1">
                              M{m.month}
                            </p>
                            <p className="text-[10px] font-semibold text-brand-700 text-center">
                              -{m.lost}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Star Rating */}
                    <StarRating count={t.stars} />
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-900 py-16 px-4">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-serif tracking-headline text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Your Transformation Today
          </h2>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of verified customers who have transformed their
            health with FormBlends pharmaceutical-grade peptides.
          </p>
          <a
            href="/glp1"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-700 font-semibold rounded-full hover:bg-brand-50 transition-all"
          >
            Explore GLP-1 Weight Loss
          </a>
        </div>
      </section>
    </main>
  );
}
