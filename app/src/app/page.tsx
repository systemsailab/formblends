import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { MediaLogos } from "@/components/MediaLogos";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { getGlp1Products, getFeaturedProducts, getBestsellers, categories } from "@/data/products";
import { getVideoTestimonials, getWeightLossTestimonials, testimonials } from "@/data/testimonials";
import { formatPrice, formatNumber } from "@/lib/utils";

const homeFaqs = [
  { q: "What are GLP-1 peptides and how do they work?", a: "GLP-1 (Glucagon-Like Peptide-1) receptor agonists mimic the natural hormone GLP-1. They activate receptors in the brain that control appetite, slow gastric emptying, and improve insulin sensitivity. Major clinical trials demonstrated average weight loss of 15-22.5% of body weight." },
  { q: "How is FormBlends different from other peptide suppliers?", a: "Every batch undergoes HPLC purity analysis, mass spectrometry verification, endotoxin testing, and sterility testing. We publish certificates of analysis for every product, maintain 99%+ purity standards, and manufacture in ISO 9001:2015 certified facilities." },
  { q: "How quickly will I see results with GLP-1 peptides?", a: "Most customers report noticeable appetite reduction within the first 1-2 weeks. Measurable weight loss typically begins within 2-4 weeks. Clinical data shows the most significant results over 3-6 months of consistent use." },
  { q: "Do you offer free shipping?", a: "Yes. All orders over $150 qualify for free priority shipping within the United States. Orders placed before 2pm EST ship same business day. All shipments include temperature-controlled packaging." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee on all products. If you are not completely satisfied, contact our support team for a full refund or exchange. Unopened products in original packaging qualify for a full refund." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  const glp1Products = getGlp1Products();
  const bestsellers = getBestsellers();
  const weightLossTestimonials = getWeightLossTestimonials();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-woman.webp"
            alt="Transform your health with FormBlends"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/60 to-gray-950/30" />
        </div>

        <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-2xl">
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="flex -space-x-1.5">
                {["sarah", "marcus", "jennifer", "david", "amanda"].map((name) => (
                  <div key={name} className="w-6 h-6 rounded-full border-2 border-white/50 overflow-hidden relative">
                    <Image src={`/images/testimonials/${name}.webp`} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <StarRating rating={5} size="sm" />
              </div>
              <span className="text-white/80 text-sm font-medium">12,847 verified reviews</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-headline text-white font-serif">
              Your Weight Loss<br />
              Program,<br />
              <span className="text-brand-400">Built for You.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
              Take our free 2-minute assessment and get a personalized GLP-1 plan
              based on your body, your goals, and your history. Clinically proven to deliver up to
              <strong className="text-white"> 22.5% body weight reduction</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/start" className="btn-white text-lg !px-10 !py-5 shadow-2xl">
                Take the Free Assessment
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/glp1" className="inline-flex items-center justify-center px-10 py-5 text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 transition-all text-lg">
                Browse GLP-1 Products
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Takes 2 minutes. No credit card required.
            </p>

            {/* Trust stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { value: "22.5%", label: "Max avg. weight loss" },
                { value: "99%+", label: "Verified purity" },
                { value: "12K+", label: "Happy customers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Third-Party Tested" },
              { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", label: "99%+ Purity" },
              { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Free Shipping $150+" },
              { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", label: "ISO Certified" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Same-Day Shipping" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEDIA LOGOS ===== */}
      <MediaLogos />

      {/* ===== GLP-1 SPOTLIGHT ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <FadeInOnScroll className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-600" />
              GLP-1 Weight Loss
              <span className="w-8 h-px bg-brand-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-headline">
              The Science of Effortless Weight Loss
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              GLP-1 receptor agonists mimic your body&apos;s natural satiety hormone, reducing
              appetite at the source. No crash diets. No willpower battles. Just science.
            </p>
          </FadeInOnScroll>

          {/* GLP-1 products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {glp1Products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {/* How it works visual */}
          <div className="mt-20 relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src="/images/hero/hero-products.webp" alt="FormBlends products" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/80 to-gray-950/70" />
            </div>

            <div className="relative p-8 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white font-serif tracking-headline">
                    How GLP-1 Peptides Work
                  </h3>
                  <div className="mt-8 space-y-6">
                    {[
                      { step: "01", title: "Signals Your Brain", desc: "Activates satiety centers in the hypothalamus, naturally silencing hunger signals and food noise." },
                      { step: "02", title: "Slows Digestion", desc: "Delays gastric emptying so you feel full longer. You eat less without feeling deprived." },
                      { step: "03", title: "Optimizes Metabolism", desc: "Improves insulin sensitivity and shifts your body toward burning fat for energy." },
                      { step: "04", title: "Lasting Change", desc: "Addresses the biological drivers of overeating for sustainable, long-term results." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 group">
                        <div className="w-12 h-12 bg-brand-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-brand-400 transition-colors">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{item.title}</h4>
                          <p className="text-gray-400 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "14.9%", label: "Avg. weight loss", sub: "Semaglutide (STEP 1)", source: "NEJM 2021" },
                    { stat: "22.5%", label: "Avg. weight loss", sub: "Tirzepatide (SURMOUNT-1)", source: "NEJM 2022" },
                    { stat: "20%", label: "CV risk reduction", sub: "Semaglutide (SELECT)", source: "NEJM 2023" },
                    { stat: "63%", label: "Lost 20%+ weight", sub: "Tirzepatide highest dose", source: "NEJM 2022" },
                  ].map((item) => (
                    <div key={item.stat} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <p className="text-3xl font-bold text-brand-400">{item.stat}</p>
                      <p className="text-white font-medium mt-2 text-sm">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
                      <p className="text-gray-500 text-xs mt-0.5 italic">{item.source}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO TESTIMONIALS ===== */}
      <section className="section-padding bg-gray-950 text-white">
        <div className="container-wide mx-auto">
          <FadeInOnScroll className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-brand-400 font-semibold text-sm uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-400" />
              Real Results
              <span className="w-8 h-px bg-brand-400" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif tracking-headline">
              Life-Changing Transformations
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              Real customers. Verified purchases. Unfiltered stories.
            </p>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weightLossTestimonials.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="bg-gray-900/50 backdrop-blur rounded-2xl overflow-hidden border border-gray-800 hover:border-brand-800 transition-all duration-500 group"
              >
                {/* Video area with real avatar */}
                {t.videoId && (
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300 border border-white/30">
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {t.weightLost && (
                      <div className="absolute bottom-4 left-4 bg-brand-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        Lost {t.weightLost}
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                      {t.duration}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-1.5 mb-3">
                    <StarRating rating={t.rating} />
                    <span className="text-brand-400 text-xs font-semibold ml-1 uppercase tracking-wide">Verified</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 pt-4 border-t border-gray-800">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}, {t.age}</p>
                      <p className="text-gray-500 text-xs">{t.location} | {t.product}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews" className="btn-primary !bg-brand-600 !text-white">
              Read All 12,847 Reviews
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BESTSELLERS ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-brand-600" />
                Full Catalog
                <span className="w-8 h-px bg-brand-600" />
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-headline">
                Beyond Weight Loss
              </h2>
              <p className="mt-3 text-lg text-gray-500 max-w-2xl">
                65+ pharmaceutical-grade peptides across 12 categories. Every product
                third-party tested with published certificates of analysis.
              </p>
            </div>
            <Link href="/products" className="btn-secondary mt-6 lg:mt-0 shrink-0">
              View All Products
            </Link>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-700 border border-gray-200 hover:border-brand-200 transition-all duration-300"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Bestseller grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 8).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUALITY / TRUST ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero/lab-quality.webp" alt="FormBlends quality lab" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 to-gray-950/80" />
        </div>

        <div className="relative section-padding">
          <div className="container-wide mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-brand-400 font-semibold text-sm uppercase tracking-widest mb-4">
                  <span className="w-8 h-px bg-brand-400" />
                  Quality Guarantee
                  <span className="w-8 h-px bg-brand-400" />
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white font-serif tracking-headline">
                  Pharmaceutical-Grade<br />Purity. Every Batch.
                </h2>
                <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                  Every FormBlends product is synthesized in ISO 9001:2015 certified facilities
                  and verified through a 5-stage quality process. We publish certificates of
                  analysis for every batch because transparency is not optional.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    { title: "HPLC Purity Analysis", desc: "Every batch exceeds 99% purity, verified by independent chromatography." },
                    { title: "Mass Spectrometry", desc: "LC-MS confirms exact molecular weight within 0.1% tolerance." },
                    { title: "Endotoxin Testing", desc: "LAL testing ensures levels below pharmaceutical thresholds." },
                    { title: "Published COAs", desc: "Independent certificates of analysis available on every product page." },
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

                <Link href="/science" className="btn-primary mt-8">
                  Explore Our Science
                </Link>
              </div>

              {/* COA Preview Card */}
              <div className="glass-card !bg-white/10 !border-white/10 p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-white text-lg">Certificate of Analysis</h4>
                  <span className="text-xs bg-brand-500 text-white px-3 py-1 rounded-full font-bold">VERIFIED</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Product", value: "Semaglutide 5mg" },
                    { label: "Batch", value: "FB-SEM-20260228" },
                    { label: "HPLC Purity", value: "99.14%", highlight: true },
                    { label: "Molecular Weight", value: "4,113.58 Da" },
                    { label: "Endotoxin", value: "<0.1 EU/mg (PASS)", highlight: true },
                    { label: "Sterility (USP 71)", value: "No growth (PASS)", highlight: true },
                    { label: "Appearance", value: "White lyophilized powder" },
                    { label: "Lab", value: "Intertek (Independent)" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-1 border-b border-white/10 last:border-0">
                      <span className="text-gray-400 text-sm">{row.label}</span>
                      <span className={`text-sm font-medium ${row.highlight ? "text-brand-400" : "text-white"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-2xl font-bold text-brand-400">847</p>
                    <p className="text-xs text-gray-400 mt-1">Batches tested 2025</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-2xl font-bold text-brand-400">100%</p>
                    <p className="text-xs text-gray-400 mt-1">Pass rate maintained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LONG-FORM REVIEWS ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <FadeInOnScroll className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-600" />
              Customer Stories
              <span className="w-8 h-px bg-brand-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-headline">
              In Their Own Words
            </h2>
          </FadeInOnScroll>

          {/* Aggregate stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {[
              { value: "42 lbs", label: "Average GLP-1 weight loss" },
              { value: "4.9/5", label: "Average rating" },
              { value: "94%", label: "Would recommend" },
              { value: "12,847", label: "Verified reviews" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-brand-50 rounded-2xl">
                <p className="text-3xl lg:text-4xl font-bold text-brand-700">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Long reviews */}
          <div className="grid lg:grid-cols-2 gap-6">
            {weightLossTestimonials.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="rounded-2xl p-8 border border-gray-100 bg-white hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] hover:border-brand-100 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={t.rating} size="md" />
                    <span className="text-sm text-brand-600 font-semibold ml-2">Verified</span>
                  </div>
                  {t.weightLost && (
                    <span className="bg-brand-100 text-brand-800 text-sm font-bold px-4 py-1.5 rounded-full">
                      -{t.weightLost} in {t.duration}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  &ldquo;{t.longQuote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
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
      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-brand-600" />
              Simple Process
              <span className="w-8 h-px bg-brand-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-headline">
              How FormBlends Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

            {[
              { step: "1", title: "Take the Assessment", desc: "Answer a few questions about your body, goals, and health history. Takes just 2 minutes.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
              { step: "2", title: "Get Your Plan", desc: "Receive a personalized GLP-1 recommendation based on your BMI, goals, and experience.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { step: "3", title: "Order & Ship", desc: "Secure checkout with same-day shipping before 2pm. Free priority shipping on orders over $150.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
              { step: "4", title: "Start Losing Weight", desc: "Most customers see results in 2-4 weeks. Pharmaceutical-grade compounds clinically proven to work.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-20 h-20 bg-white border-2 border-brand-200 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10 shadow-md">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Step {item.step}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif tracking-headline">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-gray-200 hover:border-brand-200 transition-colors overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                  <span className="text-lg font-semibold text-gray-900 pr-8">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed -mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero/hero-man.webp" alt="Start your transformation" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/80" />
        </div>

        <div className="relative py-24 lg:py-32 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white font-serif tracking-headline">
              Ready to Start?
            </h2>
            <p className="mt-6 text-xl text-brand-100 max-w-2xl mx-auto">
              Join 12,000+ customers who have already changed their lives.
              Take the free assessment and get your personalized plan in 2 minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start" className="btn-white text-lg !px-10 !py-5 shadow-2xl">
                Take the Free Assessment
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all">
                Browse All Products
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
              {["99%+ Purity", "Free Shipping $150+", "30-Day Guarantee", "Same-Day Shipping"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
