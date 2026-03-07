import type { Metadata } from "next";
import { CalcForm } from "@/components/CalcForm";

export const metadata: Metadata = {
  title: "GLP-1 Dosing Calculator | FormBlends",
  description:
    "Find your recommended GLP-1 compound based on your weight loss goals, experience level, and budget. Personalized peptide recommendations from FormBlends.",
  openGraph: {
    title: "GLP-1 Dosing Calculator | FormBlends",
    description:
      "Answer a few questions and get a personalized GLP-1 peptide recommendation tailored to your goals.",
  },
};

export default function CalculatorPage() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-gray-50 min-h-screen">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-headline text-gray-900 mb-4">
            Find Your Perfect GLP-1 Compound
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Answer a few quick questions and we will match you with the peptide
            that fits your goals, experience, and budget.
          </p>
        </div>

        <CalcForm />
      </div>
    </section>
  );
}
