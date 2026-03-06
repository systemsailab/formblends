import Link from "next/link";

export const metadata = {
  title: "About FormBlends | Pharmaceutical-Grade Peptides",
  description: "FormBlends is a US-based peptide supplier committed to pharmaceutical-grade quality, transparency, and customer results.",
};

export default function AboutPage() {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            About FormBlends
          </span>
          <h1 className="mt-3 text-4xl lg:text-6xl font-bold text-gray-900">
            Pharmaceutical-Grade Peptides.<br />
            No Compromises.
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">
            FormBlends was founded on a simple premise: people deserve access to
            the highest quality peptides with complete transparency about what
            they are getting.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                The peptide industry has a transparency problem. Too many suppliers
                cut corners on purity, skip third-party testing, and make claims
                they cannot substantiate. We started FormBlends to be the antidote.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Every product we sell is synthesized in ISO 9001:2015 certified
                facilities, verified through multi-stage testing, and shipped with
                full certificates of analysis. We publish the science behind every
                compound and never make health claims without peer-reviewed citations.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                We believe that when people have access to high-quality compounds
                backed by real research, they can make informed decisions about their
                health. That is what we are here to enable.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Quality Without Exception",
                  desc: "99%+ purity on every batch, verified by independent HPLC analysis. We have never shipped a product below our quality floor.",
                },
                {
                  title: "Radical Transparency",
                  desc: "Certificates of analysis for every product. Published research citations. No proprietary blend nonsense. You know exactly what you are getting.",
                },
                {
                  title: "Science-First Approach",
                  desc: "We only sell compounds with published research supporting their mechanisms. If the science is not there, the product is not in our catalog.",
                },
                {
                  title: "Customer Obsession",
                  desc: "12,000+ satisfied customers with a 4.9/5 average rating. We respond to every support inquiry within 2 hours during business hours.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="section-padding bg-brand-700 text-white">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">FormBlends by the Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "20+", label: "Peptide products" },
              { value: "12,847", label: "Verified customer reviews" },
              { value: "99%+", label: "Purity on every batch" },
              { value: "4.9/5", label: "Average customer rating" },
              { value: "847", label: "Batches tested in 2025" },
              { value: "100%", label: "COA pass rate" },
              { value: "2 hrs", label: "Support response time" },
              { value: "30 day", label: "Satisfaction guarantee" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-brand-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Browse our full catalog of pharmaceutical-grade peptides and see why
            12,000+ customers trust FormBlends.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/glp1" className="btn-primary">GLP-1 Weight Loss</Link>
            <Link href="/products" className="btn-secondary">All Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
