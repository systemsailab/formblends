import type { Metadata } from "next";
import { QuizFlow } from "./QuizFlow";

export const metadata: Metadata = {
  title: "Start Your Weight Loss Journey | FormBlends",
  description:
    "Take our free 2-minute assessment to find the right GLP-1 weight loss program for you. Personalized recommendations based on your goals.",
  alternates: { canonical: "https://formblends.com/start" },
};

export default function StartPage() {
  return <QuizFlow />;
}
