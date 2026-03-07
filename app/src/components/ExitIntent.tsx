"use client";

import { useState, useEffect, useCallback } from "react";

export function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't show if user already signed up or dismissed email popup
    if (localStorage.getItem("fb_email_dismissed")) return;

    // Don't show if shown within the last 24 hours
    const lastShown = localStorage.getItem("fb_exit_shown");
    if (lastShown) {
      const elapsed = Date.now() - parseInt(lastShown, 10);
      if (elapsed < 24 * 60 * 60 * 1000) return;
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY < 10 && !triggered) {
        setTriggered(true);
        setVisible(true);
        localStorage.setItem("fb_exit_shown", String(Date.now()));
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [triggered]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={dismiss}
    >
      <div
        className="relative mx-4 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-fadeIn"
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

        {/* Heading */}
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">
          Wait! Don&apos;t miss out.
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mb-4">
          Get free shipping on your first order. No minimum purchase required.
        </p>

        {/* Big free shipping callout */}
        <p className="text-4xl font-bold text-brand-600 text-center my-6">
          FREE SHIPPING
        </p>

        {/* CTA */}
        <a
          href="/products"
          className="block w-full rounded-full bg-brand-600 py-4 px-8 text-center text-lg font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Shop Now &ndash; Free Shipping
        </a>

        {/* Limited time */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Limited time offer
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
