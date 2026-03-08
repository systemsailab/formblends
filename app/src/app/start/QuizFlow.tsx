"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const STEPS = [
  { id: "height_weight", label: "About You" },
  { id: "goal", label: "Your Goal" },
  { id: "history", label: "History" },
  { id: "experience", label: "Experience" },
  { id: "health", label: "Health" },
];

interface QuizData {
  feet: string;
  inches: string;
  weight: string;
  goalWeight: string;
  timeline: string;
  triedBefore: string[];
  glp1Experience: string;
  healthConditions: string[];
  gender: string;
  age: string;
}

const initialData: QuizData = {
  feet: "",
  inches: "",
  weight: "",
  goalWeight: "",
  timeline: "",
  triedBefore: [],
  glp1Experience: "",
  healthConditions: [],
  gender: "",
  age: "",
};

export function QuizFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const router = useRouter();

  const canAdvance = () => {
    switch (step) {
      case 0:
        return data.feet && data.inches && data.weight && data.gender && data.age;
      case 1:
        return data.goalWeight && data.timeline;
      case 2:
        return data.triedBefore.length > 0;
      case 3:
        return data.glp1Experience !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Build query params for results page
      const bmi = calculateBMI();
      const lbs = parseInt(data.weight) - parseInt(data.goalWeight);
      const params = new URLSearchParams({
        bmi: bmi.toFixed(1),
        lbs: lbs.toString(),
        timeline: data.timeline,
        experience: data.glp1Experience,
        gender: data.gender,
      });
      router.push(`/start/results?${params.toString()}`);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const calculateBMI = () => {
    const heightIn = parseInt(data.feet) * 12 + parseInt(data.inches);
    const w = parseInt(data.weight);
    if (!heightIn || !w) return 0;
    return (w / (heightIn * heightIn)) * 703;
  };

  const toggleArray = (field: "triedBefore" | "healthConditions", value: string) => {
    setData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Form<span className="text-brand-600">Blends</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            HIPAA Secure
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 py-3">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-brand-600 text-white"
                      : i === step
                      ? "bg-brand-100 text-brand-700 ring-2 ring-brand-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i < step ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full transition-all ${i < step ? "bg-brand-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-0">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        {/* Step 1: Height, Weight, Gender, Age */}
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Step 1 of 5</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">Tell us about yourself</h1>
            <p className="mt-3 text-lg text-gray-500">
              We use this to calculate your BMI and recommend the right program.
            </p>

            <div className="mt-10 space-y-8">
              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Female", "Male"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setData({ ...data, gender: g.toLowerCase() })}
                      className={`py-4 px-6 rounded-xl border-2 text-center font-semibold transition-all ${
                        data.gender === g.toLowerCase()
                          ? "border-brand-600 bg-brand-50 text-brand-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Age</label>
                <select
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-600 focus:ring-0 text-lg font-medium text-gray-900 bg-white transition-colors appearance-none"
                >
                  <option value="">Select your age range</option>
                  <option value="18-29">18-29</option>
                  <option value="30-39">30-39</option>
                  <option value="40-49">40-49</option>
                  <option value="50-59">50-59</option>
                  <option value="60+">60+</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Height</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      value={data.feet}
                      onChange={(e) => setData({ ...data, feet: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-600 focus:ring-0 text-lg font-medium text-gray-900 bg-white transition-colors appearance-none"
                    >
                      <option value="">Feet</option>
                      {[4, 5, 6, 7].map((f) => (
                        <option key={f} value={f}>{f} ft</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <select
                      value={data.inches}
                      onChange={(e) => setData({ ...data, inches: e.target.value })}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-600 focus:ring-0 text-lg font-medium text-gray-900 bg-white transition-colors appearance-none"
                    >
                      <option value="">Inches</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>{i} in</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Current Weight</label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.weight}
                    onChange={(e) => setData({ ...data, weight: e.target.value })}
                    placeholder="Enter your weight"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-600 focus:ring-0 text-lg font-medium text-gray-900 transition-colors"
                    min={80}
                    max={600}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">lbs</span>
                </div>
              </div>

              {data.feet && data.inches && data.weight && (
                <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Your BMI</span>
                    <span className="text-2xl font-bold text-brand-700">{calculateBMI().toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {calculateBMI() >= 30
                      ? "You may be a strong candidate for GLP-1 therapy."
                      : calculateBMI() >= 27
                      ? "You may qualify for GLP-1 therapy with additional risk factors."
                      : calculateBMI() >= 25
                      ? "GLP-1 therapy may help you reach your goals."
                      : "Your BMI is in the normal range. GLP-1 therapy is typically for BMI 27+."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Goal Weight + Timeline */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Step 2 of 5</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">What is your goal?</h1>
            <p className="mt-3 text-lg text-gray-500">
              There is no wrong answer. We will build a plan around your target.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Goal Weight</label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.goalWeight}
                    onChange={(e) => setData({ ...data, goalWeight: e.target.value })}
                    placeholder="Your target weight"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-600 focus:ring-0 text-lg font-medium text-gray-900 transition-colors"
                    min={80}
                    max={500}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">lbs</span>
                </div>
                {data.weight && data.goalWeight && parseInt(data.weight) > parseInt(data.goalWeight) && (
                  <p className="mt-2 text-sm text-brand-600 font-medium">
                    That is {parseInt(data.weight) - parseInt(data.goalWeight)} lbs to lose. You got this.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Ideal Timeline</label>
                <div className="grid gap-3">
                  {[
                    { value: "3", label: "3 months", desc: "Aggressive but achievable" },
                    { value: "6", label: "6 months", desc: "Steady, sustainable progress" },
                    { value: "12", label: "12 months", desc: "Gradual lifestyle change" },
                    { value: "any", label: "No rush", desc: "Just want to get there" },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setData({ ...data, timeline: t.value })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                        data.timeline === t.value
                          ? "border-brand-600 bg-brand-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className={`font-semibold ${data.timeline === t.value ? "text-brand-700" : "text-gray-900"}`}>
                        {t.label}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: What have you tried? */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Step 3 of 5</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">What have you tried before?</h1>
            <p className="mt-3 text-lg text-gray-500">
              Select all that apply. This helps us understand your journey.
            </p>

            <div className="mt-10 grid gap-3">
              {[
                "Calorie counting / macro tracking",
                "Keto, paleo, or low-carb diets",
                "Intermittent fasting",
                "Weight Watchers / Noom / other programs",
                "Gym / exercise programs",
                "Prescription medications (Phentermine, etc.)",
                "Ozempic, Wegovy, or Mounjaro",
                "Supplements / fat burners",
                "Nothing yet",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleArray("triedBefore", option)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    data.triedBefore.includes(option)
                      ? "border-brand-600 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      data.triedBefore.includes(option) ? "border-brand-600 bg-brand-600" : "border-gray-300"
                    }`}
                  >
                    {data.triedBefore.includes(option) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-medium ${data.triedBefore.includes(option) ? "text-brand-700" : "text-gray-700"}`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: GLP-1 Experience */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Step 4 of 5</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">Have you used GLP-1 medications?</h1>
            <p className="mt-3 text-lg text-gray-500">
              This helps us recommend the right starting point for you.
            </p>

            <div className="mt-10 grid gap-3">
              {[
                { value: "never", label: "No, this would be my first time", desc: "We will start you on a gentle introductory dose" },
                { value: "current", label: "Yes, I am currently on one", desc: "Looking to switch or find a better option" },
                { value: "past", label: "Yes, but I stopped", desc: "We can help you restart safely" },
                { value: "researching", label: "No, but I have been researching", desc: "Great, let us help you find the right fit" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setData({ ...data, glp1Experience: option.value })}
                  className={`w-full text-left px-5 py-5 rounded-xl border-2 transition-all ${
                    data.glp1Experience === option.value
                      ? "border-brand-600 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className={`font-semibold block ${data.glp1Experience === option.value ? "text-brand-700" : "text-gray-900"}`}>
                    {option.label}
                  </span>
                  <span className="text-sm text-gray-500 mt-0.5 block">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Health Conditions */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Step 5 of 5</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">Any health conditions?</h1>
            <p className="mt-3 text-lg text-gray-500">
              Select any that apply so we can ensure safety. This is kept strictly confidential.
            </p>

            <div className="mt-10 grid gap-3">
              {[
                "Type 2 diabetes or pre-diabetes",
                "High blood pressure",
                "High cholesterol",
                "Thyroid condition",
                "Heart disease",
                "PCOS",
                "Sleep apnea",
                "None of the above",
              ].map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleArray("healthConditions", condition)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    data.healthConditions.includes(condition)
                      ? "border-brand-600 bg-brand-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      data.healthConditions.includes(condition) ? "border-brand-600 bg-brand-600" : "border-gray-300"
                    }`}
                  >
                    {data.healthConditions.includes(condition) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-medium ${data.healthConditions.includes(condition) ? "text-brand-700" : "text-gray-700"}`}>
                    {condition}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-sm text-gray-600">
                  Your information is protected under HIPAA guidelines and will never be shared.
                  This is used only to personalize your recommendation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-12 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={back}
              className="inline-flex items-center gap-2 text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={next}
            disabled={!canAdvance()}
            className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg transition-all ${
              canAdvance()
                ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {step === STEPS.length - 1 ? "See My Results" : "Continue"}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust footer */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          {["HIPAA Compliant", "256-bit Encryption", "No Spam, Ever", "2-Minute Assessment"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
