import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export const metadata = {
  title: "Science & Research | FormBlends",
  description: "Explore the clinical research behind FormBlends peptides. Published trials, mechanisms of action, and third-party quality testing.",
  alternates: { canonical: "https://formblends.com/science" },
  openGraph: {
    title: "Science & Research | FormBlends",
    description: "Explore the clinical research behind FormBlends peptides.",
    url: "https://formblends.com/science",
    type: "website",
    siteName: "FormBlends",
  },
};

const clinicalTrials = [
  {
    title: "STEP 1 - Semaglutide for Weight Management",
    journal: "New England Journal of Medicine",
    year: 2021,
    participants: 1961,
    result: "14.9% mean body weight reduction vs 2.4% placebo over 68 weeks",
    doi: "10.1056/NEJMoa2032183",
  },
  {
    title: "SURMOUNT-1 - Tirzepatide for Weight Management",
    journal: "New England Journal of Medicine",
    year: 2022,
    participants: 2539,
    result: "22.5% mean weight loss at highest dose; 63% achieved 20%+ loss",
    doi: "10.1056/NEJMoa2206038",
  },
  {
    title: "SELECT - Semaglutide Cardiovascular Outcomes",
    journal: "New England Journal of Medicine",
    year: 2023,
    participants: 17604,
    result: "20% reduction in major adverse cardiovascular events",
    doi: "10.1056/NEJMoa2307563",
  },
  {
    title: "SCALE - Liraglutide for Weight Management",
    journal: "New England Journal of Medicine",
    year: 2015,
    participants: 3731,
    result: "8.0% mean weight loss; 63.2% achieved 5%+ body weight reduction",
    doi: "10.1056/NEJMoa1411892",
  },
  {
    title: "STEP 2 - Semaglutide in Type 2 Diabetes",
    journal: "The Lancet",
    year: 2021,
    participants: 1210,
    result: "9.6% weight loss + 1.6% A1C reduction in diabetic patients",
    doi: "10.1016/S0140-6736(21)00213-0",
  },
  {
    title: "SURMOUNT-2 - Tirzepatide in T2D with Obesity",
    journal: "The Lancet",
    year: 2023,
    participants: 938,
    result: "14.7% weight loss with simultaneous 2.24% A1C reduction",
    doi: "10.1016/S0140-6736(23)01200-X",
  },
];

export default function SciencePage() {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Science & Research
          </span>
          <h1 className="mt-3 text-4xl lg:text-6xl font-bold text-gray-900">
            Evidence-Based. Peer-Reviewed. Proven.
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">
            Every FormBlends product is backed by published clinical research. We
            do not make claims we cannot cite. Here is the science behind what we sell.
          </p>
        </div>
      </section>

      {/* Key Clinical Trials */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Landmark Clinical Trials
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-3xl">
            The GLP-1 class of peptides is backed by some of the largest, most
            rigorous clinical trials in the history of weight management research.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {clinicalTrials.map((trial) => (
              <div
                key={trial.doi}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {trial.journal}
                  </span>
                  <span className="text-xs text-gray-400">{trial.year}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{trial.title}</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Participants</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      N={trial.participants.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Key Result</p>
                    <p className="text-sm font-medium text-brand-700 mt-1">{trial.result}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-400">DOI: {trial.doi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Test */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Quality Testing Protocol
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Every batch of every product goes through a 5-stage quality
                verification process before it reaches you.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    step: "1",
                    title: "Synthesis Verification",
                    desc: "Raw peptide synthesis confirmed via amino acid analysis to verify correct sequence and molecular identity.",
                  },
                  {
                    step: "2",
                    title: "HPLC Purity Analysis",
                    desc: "High-Performance Liquid Chromatography separates and quantifies all components. Only batches exceeding 99% purity proceed.",
                  },
                  {
                    step: "3",
                    title: "Mass Spectrometry (LC-MS)",
                    desc: "Liquid Chromatography-Mass Spectrometry confirms exact molecular weight matches the target peptide within 0.1% tolerance.",
                  },
                  {
                    step: "4",
                    title: "Endotoxin Testing (LAL)",
                    desc: "Limulus Amebocyte Lysate assay ensures endotoxin levels are below 0.5 EU/mg, meeting pharmaceutical thresholds.",
                  },
                  {
                    step: "5",
                    title: "Third-Party COA Publication",
                    desc: "Independent laboratory certificates of analysis are published on each product page for full transparency.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-900 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <Image src="/images/hero/lab-quality.webp" alt="" fill className="object-cover opacity-10" />
              <div className="relative">
              <h3 className="text-2xl font-bold mb-8">Quality by the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "99%+", label: "Minimum purity standard" },
                  { value: "847", label: "Batches tested (2025)" },
                  { value: "100%", label: "COA pass rate maintained" },
                  { value: "5-stage", label: "Quality verification process" },
                  { value: "<0.5 EU/mg", label: "Endotoxin threshold" },
                  { value: "ISO 9001", label: "Certified manufacturing" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-800 rounded-xl p-4">
                    <p className="text-2xl font-bold text-brand-400">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Per-product science summaries */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Research by Product
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 12).map((p) => (
              <div key={p.slug} className="bg-white rounded-2xl p-6 border border-gray-100">
                <span className="text-xs font-medium text-brand-600 uppercase tracking-wide">
                  {p.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {p.scienceNotes}
                </p>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-sm text-brand-600 font-semibold mt-4 inline-flex items-center gap-1 hover:text-brand-700"
                >
                  View Product
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
