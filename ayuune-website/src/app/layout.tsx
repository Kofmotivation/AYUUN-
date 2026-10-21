import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import { LenisProvider } from "@/components/lenis-provider";
import { Preloader } from "@/components/preloader";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AYUUNË — A life, translated into objects.",
  description:
    "Clothing, bags and objects shaped by places, memories and encounters. An evolving archive, created between worlds. A Ghanaian creative house in Accra.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <LenisProvider>
          <Preloader />
          <CustomCursor />
          <SiteHeader />
          {children}
          <SiteMotion />
        </LenisProvider>
      </body>
    </html>
  );
}
