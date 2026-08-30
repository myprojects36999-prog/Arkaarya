import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, Lora, DM_Sans } from "next/font/google";
import "./globals.css";
import AutoAdjustZoom from "@/components/AutoAdjustZoom";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArkaArya — Sustaining Nature. Empowering People. Enriching Society.",
  description:
    "India's premier certified e-waste management enterprise. Closed-loop urban mining, ITAD, and statutory EPR fulfillment combining industrial trust with environmental responsibility.",
  icons: {
    icon: "/ArkaAryaPvtLtd_Logo_v3.0.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <body className="antialiased bg-[#F8FAF7] text-[#121212]">
        <AutoAdjustZoom />
        {children}
      </body>
    </html>
  );
}
