"use client";

import { useState, useEffect } from "react";

export function EmailCapture() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("fb_email_dismissed")) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    localStorage.setItem("fb_email_dismissed", "true");
    setVisible(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("fb_email", email.trim());
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={dismiss}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
          Exclusive Offer
        </p>

        {/* Heading */}
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">
          Get 10% Off Your First Order
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mb-6">
          Join 12,000+ customers. Get exclusive deals, new product alerts, and science updates.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Claim My 10% Off
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs text-gray-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
