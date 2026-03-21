import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EasyFlyNStay | Premium Flight Booking & Travel",
  description: "Book flights, hotels, and travel packages with Easyflynstay. Premium business and first class travel made easy.",
  icons: [{ rel: "icon", url: "/logo.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="travelpayouts-verification"
          strategy="afterInteractive"
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
        >
          {`(function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = 'https://emrldtp.com/NTEwMTc0.js?t=510174';
              document.head.appendChild(script);
          })();`}
        </Script>
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
