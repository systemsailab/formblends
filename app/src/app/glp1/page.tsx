import Link from "next/link";
import Image from "next/image";
import { getGlp1Products } from "@/data/products";
import { getWeightLossTestimonials } from "@/data/testimonials";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "GLP-1 Weight Loss Peptides | FormBlends",
  description: "Transform your body with pharmaceutical-grade GLP-1 peptides. Semaglutide, Tirzepatide, Liraglutide, and AOD-9604. Clinically proven weight loss up to 22.5%.",
};

export default function GLP1Page() {
  const glp1Products = getGlp1Products();
  const testimonials = getWeightLossTestimonials();

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image src="/images/hero/hero-woman.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/40" />

        <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              <span className="text-brand-300 font-semibold text-sm uppercase tracking-wider">
                GLP-1 Weight Loss Program
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05]">
              Stop Fighting<br />
              Your Biology.<br />
              <span className="text-brand-300">Start Working With It.</span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl">
              GLP-1 peptides work with your body&apos;s natural appetite regulation system,
              not against it. No extreme diets. No unsustainable willpower. Just science
              that delivers results.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <p className="text-4xl font-bold text-white">22.5%</p>
                <p className="text-sm text-gray-400 mt-1">Max avg. weight loss</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">63%</p>
                <p className="text-sm text-gray-400 mt-1">Lost 20%+ body weight</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">12K+</p>
                <p className="text-sm text-gray-400 mt-1">Happy customers</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#products" className="btn-primary text-lg !bg-white !text-brand-800 hover:!bg-brand-50">
                View GLP-1 Products
              </a>
              <a href="#science" className="btn-secondary text-lg !border-white/30 !text-white hover:!bg-white/10">
                See the Science
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is GLP-1 */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
                Understanding GLP-1
              </span>
              <h2 className="mt-3 text-4xl font-bold text-gray-900">
                What Are GLP-1 Peptides?
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                GLP-1 (Glucagon-Like Peptide-1) is a hormone your body naturally produces
                after eating. It tells your brain you are full, slows digestion, and helps
                regulate blood sugar. In people who struggle with weight, this signaling
                system is often impaired.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                GLP-1 receptor agonists are synthetic peptides that activate the same
                receptors as natural GLP-1, but with much longer duration and stronger
                effect. The result is a dramatic reduction in appetite, cravings, and
                caloric intake that feels natural rather than forced.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This is not a diet pill. It is not a stimulant. It is a precision tool
                that corrects the biological miscommunication that makes weight loss so
                difficult for millions of people.
              </p>
            </div>

            <div className="bg-brand-50 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">The GLP-1 Difference</h3>
              <div className="space-y-4">
                {[
                  { old: "Counting every calorie", new: "Naturally eating less" },
                  { old: "Constant food cravings", new: "Food noise eliminated" },
                  { old: "Yo-yo dieting cycle", new: "Sustained, lasting results" },
                  { old: "Willpower-dependent", new: "Biology-driven" },
                  { old: "Feeling deprived", new: "Feeling satisfied" },
                  { old: "Quick fixes that fail", new: "Clinical trial-proven outcomes" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-1 bg-red-50 rounded-xl px-4 py-3 text-sm text-red-700 line-through opacity-60">
                      {item.old}
                    </div>
                    <svg className="w-5 h-5 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="flex-1 bg-brand-100 rounded-xl px-4 py-3 text-sm text-brand-800 font-medium">
                      {item.new}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Our GLP-1 Products
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              Choose Your GLP-1 Compound
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Each compound offers a different profile of efficacy, dosing, and mechanism.
              All are pharmaceutical-grade with 99%+ purity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {glp1Products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="science" className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            GLP-1 Compound Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Compound</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Mechanism</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Avg. Weight Loss</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Dosing</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-brand-50">
                  <td className="py-4 px-4 font-bold text-gray-900">Tirzepatide</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Dual GIP/GLP-1</td>
                  <td className="py-4 px-4 text-sm font-bold text-brand-700">22.5%</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Once weekly</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900">$349</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-bold text-gray-900">Semaglutide</td>
                  <td className="py-4 px-4 text-sm text-gray-600">GLP-1 agonist</td>
                  <td className="py-4 px-4 text-sm font-bold text-brand-700">14.9%</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Once weekly</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900">$299</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-bold text-gray-900">Liraglutide</td>
                  <td className="py-4 px-4 text-sm text-gray-600">GLP-1 agonist</td>
                  <td className="py-4 px-4 text-sm font-bold text-brand-700">8.0%</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Daily</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900">$199</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-gray-900">AOD-9604</td>
                  <td className="py-4 px-4 text-sm text-gray-600">hGH fragment</td>
                  <td className="py-4 px-4 text-sm font-bold text-brand-700">Targeted fat loss</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Daily</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900">$89</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-950 text-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">
              Real Results
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
              GLP-1 Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.id} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                {t.videoId && (
                  <div className="relative aspect-video bg-gray-800 rounded-xl mb-4 overflow-hidden">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {t.weightLost && (
                      <div className="absolute bottom-3 left-3 bg-brand-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{t.weightLost}
                      </div>
                    )}
                  </div>
                )}
                <StarRating rating={t.rating} />
                <p className="text-gray-300 mt-3 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.location} | {t.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-brand-600 to-brand-800 text-white text-center">
        <div className="container-wide mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to Start?</h2>
          <p className="mt-4 text-xl text-brand-100 max-w-2xl mx-auto">
            Choose your GLP-1 compound and begin your transformation today.
            Free shipping on orders over $150.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products/semaglutide" className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand-700 font-bold text-lg rounded-full hover:bg-brand-50 transition-all">
              Shop Semaglutide - {formatPrice(299)}
            </Link>
            <Link href="/products/tirzepatide" className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all">
              Shop Tirzepatide - {formatPrice(349)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
