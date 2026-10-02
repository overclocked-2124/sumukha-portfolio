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
  title: "Sumukha Upadhyaya • Portfolio & Digital Garden",
  description:
    "Software engineer & student at RVCE and IIT Madras. Systems engineering, backend infrastructure, and web architectures.",
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
      <body className="min-h-full flex flex-col bg-[#FAF8FD] text-[#1D1B20] relative selection:bg-[#E3DFFF] selection:text-[#140E62]">
        <MaterialInit />
        
        {/* Soft Material You Expressive Ambient Tint Layers */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Subtle warm lavender glow top */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#EADDFF]/40 blur-[120px] rounded-full" />
          {/* Subtle soft sage tint left */}
          <div className="absolute top-1/3 -left-24 w-[500px] h-[400px] bg-[#D2E7D6]/35 blur-[120px] rounded-full" />
          {/* Subtle soft peach tint right */}
          <div className="absolute bottom-10 -right-24 w-[550px] h-[450px] bg-[#FFDCC1]/30 blur-[130px] rounded-full" />
        </div>

        {/* Floating Top Pill Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <TooltipProvider>
          <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
            {children}
          </main>
        </TooltipProvider>

        {/* Material 3 Expressive Footer */}
        <Footer />
      </body>
    </html>
  );
}
