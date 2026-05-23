import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";
import { bodyClass } from "@/utils/fonts";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "M Tariq | Creative Frontend Developer Portfolio",
  description: "Creative frontend developer and designer portfolio of M Tariq. High-performance, premium interfaces, and interactive 3D WebGL experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${bodyClass} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
