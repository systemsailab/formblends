import Image from "next/image";
import Link from "next/link";
import { getGlp1Products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Compare GLP-1 Peptides | FormBlends",
  description:
    "Compare Semaglutide, Tirzepatide, Liraglutide, and AOD-9604 side by side. Find the right GLP-1 compound for your weight loss goals.",
  alternates: { canonical: "https://formblends.com/compare" },
};

const comparisonData: Record<
  string,
  { mechanism: string; weightLoss: string; dosing: string }
> = {
  semaglutide: {
    mechanism: "GLP-1 receptor agonist",
    weightLoss: "Up to 15%",
    dosing: "Once weekly",
  },
  tirzepatide: {
    mechanism: "Dual GIP/GLP-1 receptor agonist",
    weightLoss: "Up to 22.5%",
    dosing: "Once weekly",
  },
  liraglutide: {
    mechanism: "GLP-1 receptor agonist",
    weightLoss: "5-8%",
    dosing: "Daily",
  },
  "aod-9604": {
    mechanism: "hGH fragment 176-191 (lipolytic)",
    weightLoss: "Targeted fat reduction",
    dosing: "Daily",
  },
};

export default function ComparePage() {
  const products = getGlp1Products();

  const rows: { label: string; key: string }[] = [
    { label: "Price", key: "price" },
    { label: "Rating", key: "rating" },
    { label: "Mechanism of Action", key: "mechanism" },
    { label: "Avg. Weight Loss", key: "weightLoss" },
    { label: "Dosing Frequency", key: "dosing" },
    { label: "Purity", key: "purity" },
    { label: "Key Benefits", key: "benefits" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-headline text-white">
            Compare GLP-1 Compounds
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            See how our GLP-1 peptides stack up against each other so you can
            choose the right compound for your goals.
          </p>
        </div>
      </section>

      {/* Comparison Grid - Desktop */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Desktop table view */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0">
            <thead>
              <tr>
                <th className="w-48" />
                {products.map((product) => {
                  const isTirzepatide = product.slug === "tirzepatide";
                  return (
                    <th
                      key={product.slug}
                      className={`relative rounded-t-2xl border border-b-0 p-6 text-center align-bottom ${
                        isTirzepatide
                          ? "bg-brand-50 border-brand-200"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      {isTirzepatide && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                          Most Effective
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative w-28 h-28">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h3>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.key}>
                  <td className="py-4 pr-4 text-sm font-semibold text-gray-500 uppercase tracking-wide text-right align-middle">
                    {row.label}
                  </td>
                  {products.map((product) => {
                    const isTirzepatide = product.slug === "tirzepatide";
                    const extra = comparisonData[product.slug];
                    const isLast = rowIndex === rows.length - 1;

                    return (
                      <td
                        key={product.slug}
                        className={`px-6 py-4 text-center text-sm align-top border-x ${
                          isLast ? "border-b rounded-b-2xl" : ""
                        } ${
                          isTirzepatide
                            ? "bg-brand-50 border-brand-200"
                            : "bg-white border-gray-100"
                        } ${rowIndex % 2 === 0 ? "" : isTirzepatide ? "bg-brand-50/70" : "bg-gray-50/50"}`}
                      >
                        {row.key === "price" && (
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="ml-2 text-base text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              {product.unit}
                            </div>
                          </div>
                        )}
                        {row.key === "rating" && (
                          <div>
                            <span className="text-lg font-semibold text-gray-900">
                              {product.rating}
                            </span>
                            <span className="text-yellow-400 ml-1">
                              {"★".repeat(Math.round(product.rating))}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              {product.reviewCount.toLocaleString()} reviews
                            </div>
                          </div>
                        )}
                        {row.key === "mechanism" && (
                          <span className="text-gray-700">
                            {extra?.mechanism}
                          </span>
                        )}
                        {row.key === "weightLoss" && (
                          <span className="font-semibold text-gray-900">
                            {extra?.weightLoss}
                          </span>
                        )}
                        {row.key === "dosing" && (
                          <span className="text-gray-700">
                            {extra?.dosing}
                          </span>
                        )}
                        {row.key === "purity" && (
                          <span className="font-semibold text-brand-600">
                            {product.purity}
                          </span>
                        )}
                        {row.key === "benefits" && (
                          <ul className="text-left space-y-1.5">
                            {product.benefits.slice(0, 4).map((b, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-gray-700"
                              >
                                <svg
                                  className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
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
                                <span className="text-xs">{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* CTA row */}
              <tr>
                <td />
                {products.map((product) => {
                  const isTirzepatide = product.slug === "tirzepatide";
                  return (
                    <td
                      key={product.slug}
                      className="px-6 pt-4 pb-6 text-center"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className={`inline-block w-full py-3 px-6 rounded-full font-semibold text-sm transition-colors ${
                          isTirzepatide
                            ? "bg-brand-600 text-white hover:bg-brand-700"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        View Product
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => {
            const isTirzepatide = product.slug === "tirzepatide";
            const extra = comparisonData[product.slug];

            return (
              <div
                key={product.slug}
                className={`relative rounded-2xl border p-6 ${
                  isTirzepatide
                    ? "bg-brand-50 border-brand-200"
                    : "bg-white border-gray-100"
                }`}
              >
                {isTirzepatide && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Effective
                  </span>
                )}

                {/* Image + Name */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-base text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {product.unit}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-yellow-400 text-sm">
                      {"★".repeat(Math.round(product.rating))}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-0 divide-y divide-gray-100">
                  <div className="flex justify-between py-3 bg-gray-50/50 -mx-6 px-6">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Mechanism
                    </span>
                    <span className="text-sm text-gray-700 text-right max-w-[60%]">
                      {extra?.mechanism}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 -mx-6 px-6">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Avg. Weight Loss
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {extra?.weightLoss}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 bg-gray-50/50 -mx-6 px-6">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Dosing
                    </span>
                    <span className="text-sm text-gray-700">
                      {extra?.dosing}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 -mx-6 px-6">
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      Purity
                    </span>
                    <span className="text-sm font-semibold text-brand-600">
                      {product.purity}
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Key Benefits
                  </h4>
                  <ul className="space-y-1.5">
                    {product.benefits.slice(0, 4).map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
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
                        <span className="text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={`/products/${product.slug}`}
                  className={`mt-6 block w-full text-center py-3 px-6 rounded-full font-semibold text-sm transition-colors ${
                    isTirzepatide
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  View Product
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Not sure CTA */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-serif tracking-headline text-gray-900">
            Not sure which to choose?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Answer a few quick questions and our dosage calculator will
            recommend the best GLP-1 compound for your body and goals.
          </p>
          <Link
            href="/calculator"
            className="mt-8 inline-block bg-brand-600 text-white font-semibold px-10 py-4 rounded-full hover:bg-brand-700 transition-colors text-lg"
          >
            Try the Calculator
          </Link>
        </div>
      </section>
    </main>
  );
}
