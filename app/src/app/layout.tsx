import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmailCapture } from "@/components/EmailCapture";
import { ExitIntent } from "@/components/ExitIntent";
import { Analytics } from "@/components/Analytics";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FormBlends",
  url: "https://formblends.com",
  logo: "https://formblends.com/images/logo.png",
  description:
    "Physician-supervised telehealth clinic specializing in GLP-1 weight loss medications and therapeutic peptides.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12847",
    bestRating: "5",
    worstRating: "1",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FormBlends",
  url: "https://formblends.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://formblends.com/articles?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="FormBlends Articles" href="/feed.xml" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <EmailCapture />
          <ExitIntent />
        </CartProvider>
      </body>
    </html>
  );
}
