import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Ini from "@/components/Ini";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resumix",
  description: "Resumix – Make Your CV ATS-Ready in Seconds",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/ats-good.svg", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/icons/ats-good.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#68D1BF",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#68D1BF" />
        <link rel="icon" href="/icons/ats-good.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="https://js.puter.com/v2/"></Script>
        <Ini />

        {children}
      </body>
    </html>
  );
}
