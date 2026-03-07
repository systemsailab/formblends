export const metadata = {
  title: "Referral Program | FormBlends",
  description:
    "Give $25, Get $25. Share FormBlends with friends and you both save on pharmaceutical-grade peptides.",
  alternates: { canonical: "https://formblends.com/referral" },
};

export default function ReferralPage() {
  return (
    <div className="pt-32">
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">
          Referral Program
        </span>
        <h1 className="mt-3 text-4xl lg:text-5xl font-serif tracking-headline font-bold text-gray-900">
          Give $25, Get $25
        </h1>
        <p className="mt-6 text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Share FormBlends with someone you know. When they place their first
          order, you both get $25 off.
        </p>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Share Your Link",
                  desc: "Copy your unique referral code and send it to a friend via text, email, or social media.",
                },
                {
                  step: "2",
                  title: "Friend Orders",
                  desc: "Your friend applies your code at checkout and gets $25 off their first order of $100 or more.",
                },
                {
                  step: "3",
                  title: "You Both Save",
                  desc: "Once their order ships, you automatically receive a $25 credit applied to your next purchase.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Referral Code
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-500 mb-2">Your code</p>
              <p className="text-3xl font-bold text-brand-600 tracking-wider">
                FBXXXX
              </p>
            </div>
            <button className="mt-6 w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Copy & Share Your Code
            </button>
            <p className="mt-4 text-sm text-gray-500">
              No limit on referrals. The more you share, the more you save.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
