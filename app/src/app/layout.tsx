import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "FormBlends | GLP-1 Weight Loss & Premium Peptides",
  description:
    "Transform your body with pharmaceutical-grade GLP-1 peptides. Semaglutide, Tirzepatide, and 20+ research peptides. 99%+ purity, third-party tested, shipped direct.",
  keywords:
    "GLP-1, semaglutide, tirzepatide, weight loss, peptides, BPC-157, TB-500, research peptides",
  openGraph: {
    title: "FormBlends | GLP-1 Weight Loss & Premium Peptides",
    description:
      "Transform your body with pharmaceutical-grade GLP-1 peptides. Up to 22.5% body weight reduction backed by clinical trials.",
    type: "website",
    url: "https://formblends.com",
    siteName: "FormBlends",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
