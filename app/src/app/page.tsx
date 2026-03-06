import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { getGlp1Products, getFeaturedProducts, getBestsellers, categories } from "@/data/products";
import { getVideoTestimonials, getWeightLossTestimonials } from "@/data/testimonials";
import { formatPrice, formatNumber } from "@/lib/utils";

export default function Home() {
  const glp1Products = getGlp1Products();
  const featuredProducts = getFeaturedProducts();
  const bestsellers = getBestsellers();
  const videoTestimonials = getVideoTestimonials();
  const weightLossTestimonials = getWeightLossTestimonials();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-100 rounded-full blur-3xl" />
        </div>

        <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              {/* Social proof bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <StarRating rating={5} size="sm" />
                  <span className="text-sm text-gray-600 font-medium">
                    4.9/5 from 12,000+ customers
                  </span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="text-gray-900">Lose Weight</span>
                <br />
                <span className="gradient-text">With Science</span>
                <br />
                <span className="text-gray-900">Not Willpower</span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-xl">
                Pharmaceutical-grade GLP-1 peptides that reduce appetite at the
                source. Clinically proven to deliver up to{" "}
                <strong className="text-gray-900">22.5% body weight reduction</strong>.
                Third-party tested. 99%+ purity. Shipped direct.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/glp1" className="btn-primary text-lg !px-10 !py-5">
                  Start Your Transformation
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/science" className="btn-secondary text-lg !px-10 !py-5">
                  See the Research
                </Link>
              </div>

              {/* Trust metrics */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-gray-900">22.5%</p>
                  <p className="text-sm text-gray-500 mt-1">Avg. weight loss in clinical trials</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">99%+</p>
                  <p className="text-sm text-gray-500 mt-1">Purity verified by 3rd party labs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">12K+</p>
                  <p className="text-sm text-gray-500 mt-1">Satisfied customers nationwide</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main product showcase */}
                <div className="relative bg-gradient-to-br from-brand-100 to-brand-200 rounded-3xl p-12 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-brand-400 to-brand-700 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
                      <span className="text-white text-6xl font-bold font-serif">F</span>
                    </div>
                    <p className="mt-6 text-brand-800 font-bold text-xl">Semaglutide 5mg</p>
                    <p className="text-brand-600 text-sm mt-1">Pharmaceutical Grade | 99.1% Purity</p>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Lab Verified</p>
                      <p className="text-xs text-gray-500">HPLC Tested</p>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Free Shipping</p>
                      <p className="text-xs text-gray-500">Orders $150+</p>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 right-16 bg-white rounded-2xl shadow-lg px-4 py-3">
                    <div className="flex items-center gap-1">
                      <StarRating rating={5} size="sm" />
                      <span className="text-sm font-bold text-gray-900 ml-1">4.9</span>
                    </div>
                    <p className="text-xs text-gray-500">2,847 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AS SEEN IN / TRUST BAR ===== */}
      <section className="bg-gray-50 border-y border-gray-100 py-10">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-6">
            Backed by Published Clinical Research
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 text-gray-300">
            {["NEJM", "The Lancet", "JAMA", "Nature Medicine", "Cell Metabolism", "Diabetes Care"].map((pub) => (
              <span key={pub} className="text-lg font-serif font-bold text-gray-400 hover:text-gray-600 transition-colors">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GLP-1 SPOTLIGHT ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Featured: GLP-1 Weight Loss
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              The Science of Effortless Weight Loss
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              GLP-1 receptor agonists work by mimicking your body's natural satiety hormone.
              The result? Reduced appetite, fewer cravings, and clinically proven weight loss
              without extreme diets or unsustainable willpower.
            </p>
          </div>

          {/* GLP-1 comparison cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {glp1Products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {/* How GLP-1 works */}
          <div className="mt-20 bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  How GLP-1 Peptides Work
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Signals Your Brain",
                      desc: "GLP-1 activates satiety centers in the hypothalamus, naturally reducing hunger signals and eliminating constant food cravings.",
                    },
                    {
                      step: "02",
                      title: "Slows Digestion",
                      desc: "By slowing gastric emptying, GLP-1 keeps you feeling full longer after meals. You eat less without feeling deprived.",
                    },
                    {
                      step: "03",
                      title: "Optimizes Metabolism",
                      desc: "GLP-1 improves insulin sensitivity and blood sugar regulation, shifting your body toward fat utilization for energy.",
                    },
                    {
                      step: "04",
                      title: "Sustained Results",
                      desc: "Unlike crash diets, GLP-1 therapy addresses the biological drivers of overeating, producing lasting changes in appetite regulation.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats column */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "14.9%", label: "Avg. weight loss with Semaglutide (STEP 1)", source: "NEJM, 2021" },
                  { stat: "22.5%", label: "Avg. weight loss with Tirzepatide (SURMOUNT-1)", source: "NEJM, 2022" },
                  { stat: "20%", label: "Reduction in cardiovascular events (SELECT)", source: "NEJM, 2023" },
                  { stat: "63%", label: "Achieved 20%+ weight loss on Tirzepatide", source: "NEJM, 2022" },
                ].map((item) => (
                  <div key={item.stat} className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-3xl font-bold gradient-text">{item.stat}</p>
                    <p className="text-sm text-gray-600 mt-2">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO TESTIMONIALS ===== */}
      <section className="section-padding bg-gray-950 text-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">
              Real Results
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
              Life-Changing Transformations
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
              Hear directly from FormBlends customers who have transformed their
              health, their bodies, and their lives.
            </p>
          </div>

          {/* Weight loss testimonial cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weightLossTestimonials.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-brand-700 transition-colors"
              >
                {/* Video placeholder */}
                {t.videoId && (
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {t.weightLost && (
                      <div className="absolute bottom-4 left-4 bg-brand-600 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                        Lost {t.weightLost}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    <StarRating rating={t.rating} />
                    <span className="text-brand-400 text-sm font-medium ml-1">Verified Purchase</span>
                  </div>
                  <p className="text-gray-200 font-medium leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">
                        {t.location} | {t.product} | {t.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews" className="inline-flex items-center gap-2 text-brand-400 font-semibold hover:text-brand-300 transition-colors">
              See All Customer Reviews
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FULL PRODUCT CATALOG PREVIEW ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Complete Catalog
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              Beyond Weight Loss
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              FormBlends offers 20+ pharmaceutical-grade peptides across 8 categories.
              Every product is third-party tested with published certificates of analysis.
            </p>
          </div>

          {/* Category grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:from-brand-50 hover:to-brand-100 transition-all duration-300 border border-gray-100 hover:border-brand-200"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{cat.description}</p>
                <div className="mt-4 text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Bestsellers row */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Bestsellers</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCIENCE / TRUST SECTION ===== */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">
                Quality You Can Trust
              </span>
              <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
                Pharmaceutical-Grade Purity
              </h2>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                Every FormBlends product is synthesized in ISO 9001:2015 certified facilities
                and undergoes rigorous multi-stage quality testing. We publish certificates of
                analysis for every batch because transparency is not optional.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "HPLC Analysis",
                    desc: "High-Performance Liquid Chromatography confirms peptide identity and 99%+ purity on every batch.",
                  },
                  {
                    title: "Mass Spectrometry",
                    desc: "LC-MS verification confirms exact molecular weight and amino acid sequence integrity.",
                  },
                  {
                    title: "Endotoxin Testing",
                    desc: "LAL testing ensures endotoxin levels are below pharmaceutical thresholds (<0.5 EU/mg).",
                  },
                  {
                    title: "Sterility Verification",
                    desc: "USP <71> sterility testing on all injectable-grade products with documented results.",
                  },
                  {
                    title: "Third-Party COAs",
                    desc: "Independent lab certificates of analysis available for download on every product page.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <svg className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab visual */}
            <div className="bg-gray-800 rounded-3xl p-8 lg:p-12">
              <div className="space-y-6">
                {/* COA Preview */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">Certificate of Analysis</h4>
                    <span className="text-xs bg-brand-600 text-white px-2 py-1 rounded-full">Verified</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Product</span>
                      <span className="text-white font-medium">Semaglutide 5mg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Batch #</span>
                      <span className="text-white font-medium">FB-SEM-20260228</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">HPLC Purity</span>
                      <span className="text-brand-400 font-bold">99.14%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Molecular Weight</span>
                      <span className="text-white font-medium">4,113.58 Da</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Endotoxin</span>
                      <span className="text-brand-400 font-bold">&lt;0.1 EU/mg (PASS)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Sterility</span>
                      <span className="text-brand-400 font-bold">No growth (PASS)</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-xl p-4 text-center border border-gray-700">
                    <p className="text-2xl font-bold text-brand-400">847</p>
                    <p className="text-xs text-gray-400 mt-1">Batches tested in 2025</p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 text-center border border-gray-700">
                    <p className="text-2xl font-bold text-brand-400">100%</p>
                    <p className="text-xs text-gray-400 mt-1">Pass rate maintained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEFORE/AFTER + MORE REVIEWS ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Verified Results
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              Numbers Don&apos;t Lie
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Real customers. Real results. Every testimonial is from a verified purchaser.
            </p>
          </div>

          {/* Aggregate stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: "42 lbs", label: "Average weight lost by GLP-1 customers" },
              { value: "4.9/5", label: "Average customer rating across all products" },
              { value: "94%", label: "Would recommend FormBlends to a friend" },
              { value: "12,847", label: "Verified customer reviews" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-gray-50 rounded-2xl">
                <p className="text-3xl lg:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Long-form testimonials */}
          <div className="grid lg:grid-cols-2 gap-8">
            {weightLossTestimonials.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  <StarRating rating={t.rating} size="md" />
                  <span className="text-sm text-brand-600 font-medium ml-2">Verified Purchase</span>
                </div>

                {t.weightLost && (
                  <div className="inline-block bg-brand-100 text-brand-800 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                    Lost {t.weightLost} in {t.duration}
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  &ldquo;{t.longQuote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}, {t.age}</p>
                    <p className="text-sm text-gray-500">{t.location} | {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding bg-brand-50">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              How FormBlends Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Product",
                desc: "Browse our catalog of pharmaceutical-grade peptides. Each product page includes detailed science, dosing guidance, and certificates of analysis.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Place Your Order",
                desc: "Secure checkout with encrypted payment processing. All orders are discreetly packaged and shipped with temperature-controlled packaging.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Fast Delivery",
                desc: "Orders placed before 2pm ship same day. Free shipping on orders over $150. Full tracking provided from our US-based fulfillment center.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "Transform Your Health",
                desc: "Follow the included guidance, track your progress, and experience the difference that pharmaceutical-grade peptides make.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="inline-block text-xs font-bold text-brand-600 bg-brand-100 px-3 py-1 rounded-full mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What are GLP-1 peptides and how do they work?",
                a: "GLP-1 (Glucagon-Like Peptide-1) receptor agonists are compounds that mimic the natural hormone GLP-1 in your body. They work by activating receptors in the brain that control appetite, slowing gastric emptying to promote feelings of fullness, and improving insulin sensitivity. Major clinical trials have demonstrated average weight loss of 15-22.5% of body weight.",
              },
              {
                q: "How is FormBlends different from other peptide suppliers?",
                a: "FormBlends stands apart through our commitment to pharmaceutical-grade quality. Every batch undergoes HPLC purity analysis, mass spectrometry verification, endotoxin testing, and sterility testing. We publish certificates of analysis for every product, maintain 99%+ purity standards, and manufacture in ISO 9001:2015 certified facilities. We also provide detailed scientific references and dosing guidance with every order.",
              },
              {
                q: "What purity level are your products?",
                a: "All FormBlends products meet or exceed 99% purity as verified by third-party HPLC analysis. Each product page includes the specific purity percentage for the current batch, and certificates of analysis are available for download. We never sell products that fall below our 98.5% purity floor.",
              },
              {
                q: "How quickly will I see results with GLP-1 peptides?",
                a: "Most customers report noticeable appetite reduction within the first 1-2 weeks. Measurable weight loss typically begins within 2-4 weeks. Clinical trial data shows the most significant results occur over 3-6 months of consistent use, with average losses of 15-22.5% of body weight depending on the specific compound.",
              },
              {
                q: "Do you offer free shipping?",
                a: "Yes, all orders over $150 qualify for free priority shipping within the United States. Orders placed before 2pm EST ship the same business day. All shipments include temperature-controlled packaging to maintain product integrity during transit.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day satisfaction guarantee on all products. If you are not completely satisfied, contact our support team for a full refund or exchange. Unopened products in original packaging qualify for a full refund. We stand behind the quality of everything we sell.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-semibold text-gray-900 pr-8">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container-wide mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Your Transformation Starts Today
          </h2>
          <p className="mt-6 text-xl text-brand-100 max-w-2xl mx-auto">
            Join 12,000+ customers who have already changed their lives with
            FormBlends. Pharmaceutical-grade peptides. Clinically proven results.
            Shipped to your door.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/glp1"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand-700 font-bold text-lg rounded-full hover:bg-brand-50 transition-all shadow-xl"
            >
              Start GLP-1 Weight Loss
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all"
            >
              Browse All Products
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-brand-200 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              99%+ Purity Guaranteed
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Free Shipping Over $150
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              30-Day Satisfaction Guarantee
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Same-Day Shipping Before 2pm
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
