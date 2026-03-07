export const metadata = {
  title: "Terms of Service | FormBlends",
  description:
    "FormBlends terms of service. Rules and guidelines for using our website and purchasing our peptide products.",
  alternates: { canonical: "https://formblends.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: March 7, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using formblends.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our website or purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Products and Intended Use</h2>
            <p className="text-gray-600 leading-relaxed">
              FormBlends products are sold strictly for research, educational, and laboratory purposes. Our products are not intended for human consumption, and are not marketed as dietary supplements, drugs, or treatments for any medical condition. By purchasing from FormBlends, you confirm that you understand and accept these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Age Requirement</h2>
            <p className="text-gray-600 leading-relaxed">
              You must be at least 18 years of age to use this website and purchase products. By placing an order, you confirm that you are at least 18 years old.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Orders and Payment</h2>
            <p className="text-gray-600 leading-relaxed">
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion. Prices are listed in US dollars and are subject to change without notice. Payment is processed securely through Shopify Payments at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Shipping and Delivery</h2>
            <p className="text-gray-600 leading-relaxed">
              We ship to all 50 US states and US territories. Shipping times and costs are outlined on our <a href="/shipping" className="text-brand-600 hover:text-brand-700 underline">shipping policy page</a>. Risk of loss and title for items pass to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Returns and Refunds</h2>
            <p className="text-gray-600 leading-relaxed">
              Our return and refund policies are detailed on our <a href="/returns" className="text-brand-600 hover:text-brand-700 underline">returns policy page</a>. Due to the nature of our products, returns are accepted only for unopened, undamaged items within 30 days of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, images, logos, and design, is the property of FormBlends and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              Products are provided &quot;as is&quot; without warranties of any kind. FormBlends makes no representations regarding the suitability of products for any specific purpose. We guarantee the purity and concentration of our products as stated on the certificate of analysis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              FormBlends shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the amount you paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes take effect immediately upon posting. Your continued use of the website constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these terms, contact us at support@formblends.com or visit our <a href="/contact" className="text-brand-600 hover:text-brand-700 underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
