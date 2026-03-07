export const metadata = {
  title: "Privacy Policy | FormBlends",
  description:
    "FormBlends privacy policy. How we collect, use, and protect your personal information when you use our website and services.",
  alternates: { canonical: "https://formblends.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: March 7, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              When you visit formblends.com, place an order, or contact us, we may collect personal information including your name, email address, shipping address, phone number, and payment details. We also collect non-personal data such as browser type, IP address, and pages visited through cookies and similar technologies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to process and fulfill orders, communicate about your account or transactions, send shipping updates, respond to support requests, improve our website and services, and send marketing communications if you have opted in. We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Payment Processing</h2>
            <p className="text-gray-600 leading-relaxed">
              All payments are processed securely through Shopify Payments. We do not store your credit card information on our servers. Payment data is encrypted and handled in compliance with PCI DSS standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to maintain your shopping cart, remember your preferences, and analyze site traffic. You can control cookie settings through your browser. Disabling cookies may affect some site functionality, such as the ability to add items to your cart.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We share your information only with service providers necessary to operate our business: shipping carriers (USPS, FedEx) for order delivery, Shopify for e-commerce and payment processing, and email service providers for transactional communications. All partners are contractually required to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures including SSL encryption, secure server infrastructure, and regular security audits. While no method of transmission over the Internet is 100% secure, we take reasonable steps to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, correct, or delete your personal information at any time. You can unsubscribe from marketing emails using the link in any email. To request data deletion or a copy of your data, contact us at support@formblends.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. California Residents (CCPA)</h2>
            <p className="text-gray-600 leading-relaxed">
              If you are a California resident, you have the right to know what personal information we collect, request deletion of your data, and opt out of the sale of personal information. We do not sell personal information. To exercise your rights, email support@formblends.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about this privacy policy or your personal data, contact us at support@formblends.com or visit our <a href="/contact" className="text-brand-600 hover:text-brand-700 underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
