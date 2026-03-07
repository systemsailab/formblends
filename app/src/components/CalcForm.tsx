"use client";

import { useState } from "react";
import Link from "next/link";

type Goal = "weight-loss" | "body-recomp" | "general-health" | null;
type Experience = "first-time" | "some" | "experienced" | null;
type Budget = "under-150" | "150-300" | "300-plus" | null;

interface Recommendation {
  name: string;
  slug: string;
  reason: string;
}

function getRecommendations(
  goal: Goal,
  weightAmount: number,
  experience: Experience,
  budget: Budget
): { primary: Recommendation; alternative: Recommendation } {
  if (goal === "body-recomp") {
    return {
      primary: {
        name: "AOD-9604",
        slug: "aod-9604",
        reason:
          "AOD-9604 is a modified growth hormone fragment that targets fat metabolism while preserving lean muscle, making it ideal for body recomposition.",
      },
      alternative: {
        name: "Semaglutide",
        slug: "semaglutide",
        reason:
          "Semaglutide at a moderate dose can complement body recomposition by reducing appetite and supporting steady fat loss.",
      },
    };
  }

  if (goal === "general-health") {
    return {
      primary: {
        name: "Semaglutide (Low Dose)",
        slug: "semaglutide",
        reason:
          "Low-dose Semaglutide supports metabolic health, improves insulin sensitivity, and provides cardiovascular benefits beyond weight loss.",
      },
      alternative: {
        name: "Liraglutide",
        slug: "liraglutide",
        reason:
          "Liraglutide has over a decade of real-world safety data and is a well-studied option for general metabolic health support.",
      },
    };
  }

  // Weight Loss logic
  if (weightAmount >= 30 && budget === "300-plus") {
    return {
      primary: {
        name: "Tirzepatide",
        slug: "tirzepatide",
        reason:
          "Tirzepatide is a dual GIP/GLP-1 agonist that delivers up to 22.5% body weight reduction. Its dual mechanism makes it the most effective option for significant weight loss goals.",
      },
      alternative: {
        name: "Semaglutide",
        slug: "semaglutide",
        reason:
          "Semaglutide is a proven GLP-1 agonist with strong clinical data showing up to 15% body weight reduction at a lower price point.",
      },
    };
  }

  if (weightAmount < 30) {
    return {
      primary: {
        name: "Liraglutide",
        slug: "liraglutide",
        reason:
          "For moderate weight loss goals under 30 lbs, Liraglutide provides steady, sustainable results with over a decade of safety data.",
      },
      alternative: {
        name: "AOD-9604",
        slug: "aod-9604",
        reason:
          "AOD-9604 targets fat metabolism directly and is a great option if you want to lose fat without affecting appetite or hormonal pathways.",
      },
    };
  }

  // Weight Loss + first time + under $300
  if (experience === "first-time" && budget !== "300-plus") {
    return {
      primary: {
        name: "Semaglutide",
        slug: "semaglutide",
        reason:
          "Semaglutide is the gold standard GLP-1 for first-time users. Clinically proven with up to 15% body weight reduction, well-tolerated, and more affordable than Tirzepatide.",
      },
      alternative: {
        name: "Liraglutide",
        slug: "liraglutide",
        reason:
          "Liraglutide has the longest track record of any GLP-1 and is an excellent starting point with a gentler dosing curve.",
      },
    };
  }

  // Default fallback for weight loss
  return {
    primary: {
      name: "Semaglutide",
      slug: "semaglutide",
      reason:
        "Semaglutide is the most versatile GLP-1 agonist with strong clinical evidence for weight loss of up to 15% body weight. A great choice for most people.",
    },
    alternative: {
      name: "Tirzepatide",
      slug: "tirzepatide",
      reason:
        "If you want maximum results and your budget allows, Tirzepatide's dual mechanism delivers up to 22.5% body weight reduction.",
    },
  };
}

export function CalcForm() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<Goal>(null);
  const [weightAmount, setWeightAmount] = useState(30);
  const [experience, setExperience] = useState<Experience>(null);
  const [budget, setBudget] = useState<Budget>(null);
  const [showResults, setShowResults] = useState(false);

  const totalSteps = goal === "weight-loss" ? 4 : 3;

  function currentLogicalStep() {
    // If goal is not weight-loss, skip step 2
    if (goal !== "weight-loss" && step >= 2) return step + 1;
    return step;
  }

  function handleNext() {
    const logical = currentLogicalStep();
    if (logical === 1 && !goal) return;
    if (logical === 3 && !experience) return;
    if (logical === 4 && !budget) return;

    if (step === totalSteps) {
      setShowResults(true);
      return;
    }
    setStep(step + 1);
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleRestart() {
    setStep(1);
    setGoal(null);
    setWeightAmount(30);
    setExperience(null);
    setBudget(null);
    setShowResults(false);
  }

  const logical = currentLogicalStep();
  const progress = showResults ? 100 : (step / totalSteps) * 100;

  if (showResults) {
    const recs = getRecommendations(goal, weightAmount, experience, budget);
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
          <div
            className="bg-brand-500 h-2 rounded-full transition-all duration-500"
            style={{ width: "100%" }}
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Your Personalized Recommendation
        </h3>
        <p className="text-gray-500 text-center mb-8">
          Based on your goals, experience, and budget
        </p>

        {/* Primary */}
        <div className="bg-white border-2 border-brand-500 rounded-2xl p-8 mb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Best Match
            </span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">
            {recs.primary.name}
          </h4>
          <p className="text-gray-600 leading-relaxed mb-6">
            {recs.primary.reason}
          </p>
          <Link
            href={`/products/${recs.primary.slug}`}
            className="inline-flex items-center justify-center px-8 py-3 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 transition-all"
          >
            View {recs.primary.name}
          </Link>
        </div>

        {/* Alternative */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Alternative
            </span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-3">
            {recs.alternative.name}
          </h4>
          <p className="text-gray-600 leading-relaxed mb-6">
            {recs.alternative.reason}
          </p>
          <Link
            href={`/products/${recs.alternative.slug}`}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-600 text-brand-700 font-semibold rounded-full hover:bg-brand-50 transition-all"
          >
            View {recs.alternative.name}
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={handleRestart}
            className="text-brand-600 hover:text-brand-700 font-medium underline underline-offset-4"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
        <div
          className="bg-brand-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
        {/* Step 1: Goal */}
        {logical === 1 && (
          <div className="animate-fadeIn">
            <p className="text-sm font-medium text-brand-600 mb-2">
              Step {step} of {totalSteps}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What is your primary goal?
            </h3>
            <div className="space-y-3">
              {[
                { value: "weight-loss" as const, label: "Weight Loss", desc: "I want to lose weight and keep it off" },
                { value: "body-recomp" as const, label: "Body Recomposition", desc: "I want to lose fat and build lean muscle" },
                { value: "general-health" as const, label: "General Health", desc: "I want to improve metabolic and overall health" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    goal === option.value
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={option.value}
                    checked={goal === option.value}
                    onChange={() => setGoal(option.value)}
                    className="mt-1 accent-brand-600"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">
                      {option.label}
                    </span>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {option.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Weight amount (only for weight loss) */}
        {logical === 2 && (
          <div className="animate-fadeIn">
            <p className="text-sm font-medium text-brand-600 mb-2">
              Step {step} of {totalSteps}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              How much weight do you want to lose?
            </h3>
            <div className="py-4">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-brand-600">
                  {weightAmount >= 100 ? "100+" : weightAmount}
                </span>
                <span className="text-2xl text-gray-400 ml-2">lbs</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={weightAmount}
                onChange={(e) => setWeightAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>10 lbs</span>
                <span>100+ lbs</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {logical === 3 && (
          <div className="animate-fadeIn">
            <p className="text-sm font-medium text-brand-600 mb-2">
              Step {step} of {totalSteps}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What is your experience with peptides?
            </h3>
            <div className="space-y-3">
              {[
                { value: "first-time" as const, label: "First Time", desc: "I have never used peptides before" },
                { value: "some" as const, label: "Some Experience", desc: "I have tried peptides or GLP-1s before" },
                { value: "experienced" as const, label: "Experienced", desc: "I have been using peptides regularly" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    experience === option.value
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option.value}
                    checked={experience === option.value}
                    onChange={() => setExperience(option.value)}
                    className="mt-1 accent-brand-600"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">
                      {option.label}
                    </span>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {option.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Budget */}
        {logical === 4 && (
          <div className="animate-fadeIn">
            <p className="text-sm font-medium text-brand-600 mb-2">
              Step {step} of {totalSteps}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Your budget range
            </h3>
            <div className="space-y-3">
              {[
                { value: "under-150" as const, label: "Under $150/mo", desc: "I want an affordable starting point" },
                { value: "150-300" as const, label: "$150 - $300/mo", desc: "I am willing to invest in quality results" },
                { value: "300-plus" as const, label: "$300+/mo", desc: "I want the most effective option available" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    budget === option.value
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={option.value}
                    checked={budget === option.value}
                    onChange={() => setBudget(option.value)}
                    className="mt-1 accent-brand-600"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">
                      {option.label}
                    </span>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {option.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handleBack}
            className={`px-6 py-3 text-gray-600 font-medium rounded-full hover:bg-gray-100 transition-all ${
              step === 1 ? "invisible" : ""
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={
              (logical === 1 && !goal) ||
              (logical === 3 && !experience) ||
              (logical === 4 && !budget)
            }
            className="px-8 py-3 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? "See My Recommendation" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
