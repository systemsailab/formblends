export const metadata = {
  title: "Track Your Order | FormBlends",
  description:
    "Enter your order number to get real-time shipping updates on your FormBlends order.",
  alternates: { canonical: "https://formblends.com/track" },
};

export default function TrackPage() {
  return (
    <div className="pt-32">
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
          Order Tracking
        </span>
        <h1 className="mt-3 text-4xl lg:text-5xl font-serif tracking-headline font-bold text-gray-900">
          Track Your Order
        </h1>
        <p className="mt-6 text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Enter your order number to see real-time shipping updates.
        </p>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="order-number"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="order-number"
                    name="order-number"
                    placeholder="e.g. FB-10042"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Track My Order
                </button>
              </form>
              <p className="mt-4 text-sm text-gray-500 text-center">
                You can find your order number in the confirmation email we sent
                when you placed your order.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
