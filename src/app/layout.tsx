import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Ribbon } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRS Breast Cancer Awareness Platform",
  description: "A centralized campaign ecosystem connecting patients, doctors, NGOs, and donors. Supporting early diagnosis guides and verified crowdfunding.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isCampaignPage = pathname.startsWith("/campaigns/breast-cancer");

  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased h-full flex flex-col bg-background text-foreground`}
      >
        {/* Navbar */}
        {!isCampaignPage && <Navbar />}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer */}
        {!isCampaignPage && (
          <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2">
                  <Ribbon className="h-5 w-5 text-primary" />
                  <span className="font-heading text-sm font-semibold tracking-tight">
                    GRS Breast Cancer Awareness Campaign
                  </span>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  © {new Date().getFullYear()} GRS Pvt. Ltd. All rights reserved. Under peer-reviewed medical guidance guidelines.
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                  <Link href="/learn/bse-guide" className="hover:text-primary transition-colors">Self Examination</Link>
                  <Link href="/campaigns" className="hover:text-primary transition-colors">Support Patients</Link>
                </div>
              </div>
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}

