export const metadata = {
  title: "Shipping Policy | FormBlends",
  description:
    "Free shipping on orders over $150. Same-day dispatch before 2pm EST. Temperature-controlled packaging for all peptide orders.",
  alternates: { canonical: "https://formblends.com/shipping" },
};

export default function ShippingPage() {
  const sections = [
    {
      q: "How much does shipping cost?",
      a: "Shipping is free on all orders over $150. Orders under $150 ship for a flat rate of $9.95 via USPS Priority Mail.",
    },
    {
      q: "When will my order ship?",
      a: "Orders placed before 2:00 PM EST Monday through Friday ship the same business day. Orders placed after 2:00 PM EST or on weekends ship the next business day.",
    },
    {
      q: "How long will delivery take?",
      a: "Standard delivery takes 2 to 5 business days depending on your location. Most customers receive their order within 3 business days.",
    },
    {
      q: "Is my shipment temperature-controlled?",
      a: "Yes. All peptide orders are shipped in insulated packaging with cold packs to maintain product integrity during transit. We monitor seasonal temperatures and adjust packaging accordingly.",
    },
    {
      q: "Will I receive tracking information?",
      a: "Absolutely. You will receive a shipping confirmation email with a tracking number as soon as your order ships. You can also track your order anytime at formblends.com/track.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently we ship to all 50 US states and US territories. International shipping is not available at this time.",
    },
    {
      q: "What if my package is lost or damaged?",
      a: "Contact us at support@formblends.com and we will resolve the issue within 24 hours. We reship lost or damaged orders at no cost to you.",
    },
  ];

  return (
    <div className="pt-32">
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Shipping
          </span>
          <h1 className="mt-3 text-4xl lg:text-5xl font-serif tracking-headline font-bold text-gray-900">
            Shipping Policy
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">
            Fast, free, and temperature-controlled. We treat your order with the
            same care we put into our products.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl space-y-8">
            {sections.map((item) => (
              <div key={item.q}>
                <h2 className="text-lg font-bold text-gray-900">{item.q}</h2>
                <p className="mt-2 text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
