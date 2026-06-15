import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  title: "ZS GARDEN — Profesionalne usluge kosenja trave, sece stabala i odrzavanja baste u Beogradu",
  description: "ZS GARDEN - Profesionalno kosenje trave, sisanje ograda, seca stabala, freziranje baste i dvorista u Cukarici, Beogradu. Brza procena: 066/57-393-99",
  keywords: "kosenje trave, seca stabala, sisanje ograde, freziranje baste, cukarica, beograd",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  authors: [{ name: "ZS GARDEN" }],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://zsgarden.org",
    siteName: "ZS GARDEN",
    title: "ZS GARDEN — Profesionalne usluge kosenja trave i odrzavanja baste u Beogradu",
    description: "Profesionalne usluge odrzavanja zelenih povrsina u Cukarici, Beograd. Kosenje trave, sisanje ograda, seca stabala, freziranje baste."
  },
  twitter: {
    card: "summary_large_image",
    title: "ZS GARDEN — Kosenje trave i odrzavanje vrta",
    description: "Profesionalne usluge u Beogradu, Cukarica"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
