import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { BackgroundSystem } from "@/components/effects/BackgroundSystem";
import { CursorEffect } from "@/components/effects/CursorEffect";
import { ScanLines } from "@/components/effects/ScanLines";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Steve Meadows | Data Scientist & ML Engineer",
    template: "%s | Steve Meadows",
  },
  description:
    "Data science portfolio featuring machine learning, statistical modeling, and full-stack engineering projects.",
  keywords: [
    "data science",
    "machine learning",
    "portfolio",
    "Steve Meadows",
    "ML engineer",
    "Python",
    "deep learning",
  ],
  authors: [{ name: "Steve Meadows" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Steve Meadows Portfolio",
    title: "Steve Meadows | Data Scientist & ML Engineer",
    description:
      "Data science portfolio featuring machine learning, statistical modeling, and full-stack engineering projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Meadows | Data Scientist & ML Engineer",
    description:
      "Data science portfolio featuring machine learning, statistical modeling, and full-stack engineering projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-bg-base font-sans text-text-primary antialiased`}
      >
        <BackgroundSystem />
        <ScrollProgressBar />
        <Navbar />
        <div className="relative z-10 pt-16">{children}</div>
        <Footer />
        <ScanLines />
        <CursorEffect />
      </body>
    </html>
  );
}
