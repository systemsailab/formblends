import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Personalized Plan | FormBlends",
  description: "Your personalized GLP-1 weight loss recommendation based on your assessment results.",
  robots: { index: false, follow: false },
};

function getRecommendation(bmi: number, lbs: number, experience: string) {
  // Primary recommendation logic
  if (lbs >= 50 || bmi >= 35) {
    return {
      primary: "tirzepatide",
      name: "Tirzepatide",
      reason: "Based on your goals, Tirzepatide's dual GIP/GLP-1 mechanism delivers the strongest clinical results, with up to 22.5% body weight reduction in trials.",
      stat: "22.5%",
      statLabel: "avg. weight loss at highest dose",
      trial: "SURMOUNT-1, NEJM 2022",
      price: "$349",
      dosing: "Once weekly injection",
      secondary: "semaglutide",
      secondaryName: "Semaglutide",
      secondaryPrice: "$299",
    };
  }

  if (experience === "current" || experience === "past") {
    return {
      primary: "tirzepatide",
      name: "Tirzepatide",
      reason: "Since you have GLP-1 experience, Tirzepatide offers a different mechanism (dual GIP/GLP-1) that may help you break through plateaus or get better results.",
      stat: "22.5%",
      statLabel: "avg. weight loss at highest dose",
      trial: "SURMOUNT-1, NEJM 2022",
      price: "$349",
      dosing: "Once weekly injection",
      secondary: "semaglutide",
      secondaryName: "Semaglutide",
      secondaryPrice: "$299",
    };
  }

  return {
    primary: "semaglutide",
    name: "Semaglutide",
    reason: "Semaglutide is the gold standard for GLP-1 weight loss. It is well-studied, effective, and a great starting point for your goals.",
    stat: "14.9%",
    statLabel: "avg. weight loss in clinical trials",
    trial: "STEP 1, NEJM 2021",
    price: "$299",
    dosing: "Once weekly injection",
    secondary: "tirzepatide",
    secondaryName: "Tirzepatide",
    secondaryPrice: "$349",
  };
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const bmi = parseFloat(params.bmi as string) || 30;
  const lbs = parseInt(params.lbs as string) || 30;
  const timeline = (params.timeline as string) || "6";
  const experience = (params.experience as string) || "never";
  const gender = (params.gender as string) || "female";

  const rec = getRecommendation(bmi, lbs, experience);

  const timelineMonths = timeline === "any" ? 12 : parseInt(timeline);
  const lbsPerMonth = Math.round(lbs / timelineMonths);
  const projectedWeeks = Math.round((lbs / (lbsPerMonth || 4)) * 4.3);

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Form<span className="text-brand-600">Blends</span>
            </span>
          </Link>
          <Link href="/start" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Retake Assessment
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
        {/* Hero result */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-semibold text-brand-700">Assessment Complete</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-serif">
            Your Personalized Plan
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Based on your BMI of {bmi.toFixed(1)} and your goal to lose {lbs} lbs, here is our recommendation.
          </p>
        </div>

        {/* Projected results card */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-8 sm:p-10 text-white mb-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold">{lbs}</p>
              <p className="text-brand-200 mt-1 text-sm font-medium">Pounds to Lose</p>
            </div>
            <div>
              <p className="text-5xl font-bold">{lbsPerMonth}</p>
              <p className="text-brand-200 mt-1 text-sm font-medium">Lbs / Month (Projected)</p>
            </div>
            <div>
              <p className="text-5xl font-bold">{timelineMonths}</p>
              <p className="text-brand-200 mt-1 text-sm font-medium">Month Program</p>
            </div>
          </div>
        </div>

        {/* Primary recommendation */}
        <div className="bg-white rounded-3xl border-2 border-brand-200 overflow-hidden shadow-lg mb-6">
          <div className="bg-brand-50 px-6 py-3 border-b border-brand-100">
            <div className="flex items-center gap-2">
              <span className="bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">RECOMMENDED</span>
              <span className="text-sm text-brand-700 font-medium">Best match for your goals</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{rec.name}</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">{rec.reason}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-brand-700">{rec.stat}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.statLabel}</p>
                    <p className="text-xs text-gray-400 italic">{rec.trial}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-gray-900">{rec.price}</p>
                    <p className="text-xs text-gray-500 mt-1">per month</p>
                    <p className="text-xs text-gray-400">{rec.dosing}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/products/${rec.primary}`}
                    className="btn-primary text-center !text-lg"
                  >
                    Get Started with {rec.name}
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="sm:w-48 shrink-0">
                <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                  <Image
                    src={`/images/products/${rec.primary}.webp`}
                    alt={rec.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary option */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Also consider</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{rec.secondaryName}</h3>
              <p className="text-gray-500 text-sm mt-1">Starting at {rec.secondaryPrice}/month</p>
            </div>
            <Link
              href={`/products/${rec.secondary}`}
              className="btn-secondary shrink-0"
            >
              View {rec.secondaryName}
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 font-serif text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Complete Assessment", desc: "You just did this" },
              { step: "2", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", title: "Place Your Order", desc: "Choose your compound and checkout" },
              { step: "3", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Fast Shipping", desc: "Same-day shipping before 2pm EST" },
              { step: "4", icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Start Losing Weight", desc: "Most see results in 2-4 weeks" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-brand-50 border-2 border-brand-200 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">Step {item.step}</p>
                <h3 className="font-bold text-gray-900 mt-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <div className="grid sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "99%+ Purity", sub: "Third-party tested" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Same-Day Ship", sub: "Orders before 2pm" },
              { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "30-Day Guarantee", sub: "Full refund if unsatisfied" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "12,847 Reviews", sub: "4.9/5 average rating" },
            ].map((item) => (
              <div key={item.label}>
                <svg className="w-6 h-6 text-brand-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Link
            href={`/products/${rec.primary}`}
            className="btn-primary text-lg !px-12 !py-5"
          >
            Get Started with {rec.name}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Questions? <Link href="/contact" className="text-brand-600 hover:underline">Talk to our team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
