import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MaterialInit } from "@/components/material-init";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumukha Upadhyaya • Software Engineer & Researcher",
  description:
    "Software engineer and undergraduate student at RVCE and IIT Madras. Systems engineering, distributed infrastructure, and full-stack software development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9FD] text-[#1B1B1F] antialiased selection:bg-[#E3DFFF] selection:text-[#140E62]">
        <MaterialInit />

        {/* Floating Top Pill Navigation */}
        <Navbar />

        {/* Main Editorial Content Container */}
        <TooltipProvider>
          <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
            {children}
          </main>
        </TooltipProvider>

        {/* Material 3 Expressive Footer */}
        <Footer />
      </body>
    </html>
  );
}
