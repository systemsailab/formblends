import { testimonials } from "@/data/testimonials";
import { StarRating } from "@/components/StarRating";

export const metadata = {
  title: "Customer Reviews | FormBlends",
  description: "Read verified reviews from 12,000+ FormBlends customers. Real results with GLP-1 weight loss, recovery peptides, and more.",
};

export default function ReviewsPage() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Verified Reviews
          </span>
          <h1 className="mt-3 text-4xl lg:text-6xl font-bold text-gray-900">
            Real People. Real Results.
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">
            Every review is from a verified FormBlends customer. No paid reviews.
            No cherry-picking. Just honest feedback from people who have used our products.
          </p>
        </div>
      </section>

      {/* Aggregate stats */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold gradient-text">4.9</p>
              <div className="flex justify-center mt-1">
                <StarRating rating={5} size="md" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Overall Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">12,847</p>
              <p className="text-sm text-gray-500 mt-1">Verified Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-gray-500 mt-1">Would Recommend</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">42 lbs</p>
              <p className="text-sm text-gray-500 mt-1">Avg. GLP-1 Weight Loss</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">97%</p>
              <p className="text-sm text-gray-500 mt-1">5-Star Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video testimonials */}
      <section className="section-padding bg-gray-950 text-white">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold mb-10">Video Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .filter((t) => t.videoId)
              .map((t) => (
                <div key={t.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {t.weightLost && (
                      <div className="absolute bottom-3 left-3 bg-brand-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Lost {t.weightLost}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <StarRating rating={t.rating} />
                    <p className="text-gray-300 mt-2 text-sm">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-white font-semibold text-sm mt-3">
                      {t.name}, {t.age} - {t.location}
                    </p>
                    <p className="text-gray-500 text-xs">{t.product} | {t.duration}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Written reviews */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">All Reviews</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={t.rating} />
                  <span className="text-sm text-brand-600 font-medium">Verified Purchase</span>
                </div>

                {t.weightLost && (
                  <span className="inline-block bg-brand-100 text-brand-800 text-sm font-bold px-3 py-1 rounded-full mb-3">
                    Lost {t.weightLost} in {t.duration}
                  </span>
                )}

                <p className="text-gray-700 leading-relaxed">
                  &ldquo;{t.longQuote}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}, {t.age}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.location} | {t.product} | {t.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
