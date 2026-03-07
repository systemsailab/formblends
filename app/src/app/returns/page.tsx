export const metadata = {
  title: "Returns & Refund Policy | FormBlends",
  description:
    "30-day satisfaction guarantee on all FormBlends orders. Easy returns, fast refunds, no hassle.",
  alternates: { canonical: "https://formblends.com/returns" },
};

export default function ReturnsPage() {
  return (
    <div className="pt-32">
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Returns
          </span>
          <h1 className="mt-3 text-4xl lg:text-5xl font-serif tracking-headline font-bold text-gray-900">
            Returns & Refund Policy
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">
            Your satisfaction is our priority. If you are not happy with your
            order, we will make it right.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                30-Day Satisfaction Guarantee
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We stand behind every product we sell. If you are not completely
                satisfied with your purchase for any reason, you can return it
                within 30 days of delivery for a full refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                How to Initiate a Return
              </h2>
              <ol className="mt-3 space-y-3 text-gray-600 leading-relaxed list-decimal list-inside">
                <li>
                  Email us at{" "}
                  <a
                    href="mailto:support@formblends.com"
                    className="text-brand-600 underline"
                  >
                    support@formblends.com
                  </a>{" "}
                  with your order number and reason for return.
                </li>
                <li>
                  We will send you a prepaid return shipping label within one
                  business day.
                </li>
                <li>
                  Pack the product in its original packaging and drop it off at
                  any USPS location.
                </li>
                <li>
                  Once we receive and inspect the return, your refund will be
                  processed.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Refund Timeline
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Refunds are processed within 2 business days of receiving your
                return. Depending on your payment method, it may take an
                additional 3 to 5 business days for the refund to appear on your
                statement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Damaged or Defective Products
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                If your product arrives damaged or defective, contact us
                immediately and we will ship a replacement at no cost. No return
                required.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                For any questions about returns or refunds, reach out to our
                support team at{" "}
                <a
                  href="mailto:support@formblends.com"
                  className="text-brand-600 underline"
                >
                  support@formblends.com
                </a>
                . We respond within 2 hours during business hours (Mon-Fri, 9am
                to 6pm EST).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
