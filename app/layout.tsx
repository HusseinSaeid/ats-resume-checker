import type { Metadata } from "next";
import Script from "next/script";
import Init from "@/components/Init";

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
  description: "Resumix – Make Your CV ATS-Ready in Seconds ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="https://js.puter.com/v2/"></Script>
        <Init />

        {children}
      </body>
    </html>
  );
}
