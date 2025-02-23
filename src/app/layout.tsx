import { Auth0Provider } from "@auth0/nextjs-auth0";
import type { Metadata } from "next";
import { Inter, Noto_Sans_TC, Noto_Serif_SC, Outfit } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YU Meeting",
  description: "捕捉每刻 靈感，會議記錄從未如此簡單",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth0Provider>
      <html lang="en">
        <body
          className={`${outfit.variable} ${inter.variable} ${notoSansTC.variable} ${notoSerifSC.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </Auth0Provider>
  );
}
