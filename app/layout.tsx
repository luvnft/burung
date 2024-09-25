import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Burung Biru",
  description: "Platform to ordering a taxi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100vh] md:h-[100vh]`}
      >
        <NextTopLoader color="#1e40af" />
        {children}
      </body>
    </html>
  );
}
