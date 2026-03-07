export const metadata = {
  title: "Contact Us | FormBlends",
  description:
    "Get in touch with FormBlends support. Average response time: 2 hours during business hours.",
  alternates: { canonical: "https://formblends.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-32">
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
            Contact
          </span>
          <h1 className="mt-3 text-4xl lg:text-5xl font-serif tracking-headline font-bold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed">
            Have a question about your order, a product, or anything else? We
            are here to help.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Email Support
                </h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  <a
                    href="mailto:support@formblends.com"
                    className="text-brand-600 underline"
                  >
                    support@formblends.com
                  </a>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Average response time: 2 hours during business hours
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Business Hours
                </h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Monday through Friday, 9:00 AM to 6:00 PM EST
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Emails received outside business hours are answered first
                  thing the next business day.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Common Topics
                </h2>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li>Order status and tracking</li>
                  <li>Product questions and dosing guidance</li>
                  <li>Returns and refunds</li>
                  <li>Wholesale and bulk inquiries</li>
                  <li>Certificates of analysis requests</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Status</option>
                    <option value="product">Product Question</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
