import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { MaterialInit } from "@/components/material-init";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio & Digital Garden",
  description:
    "A space-themed digital garden, systems research, architectural notes, and personal projects portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080A12] text-slate-100 relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
        <MaterialInit />
        
        {/* Ambient Cosmic Background Effects */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Deep space radial glow top-center */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full" />
          {/* Starlight cyan nebula glow */}
          <div className="absolute top-1/3 -left-32 w-[600px] h-[500px] bg-cyan-600/5 blur-[140px] rounded-full" />
          {/* Violet deep nebula bottom-right */}
          <div className="absolute -bottom-32 -right-32 w-[700px] h-[600px] bg-violet-600/8 blur-[160px] rounded-full" />
          {/* Subtle cosmic grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Floating Top Pill Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          {children}
        </main>

        {/* Minimal Editorial Footer */}
        <footer className="border-t border-slate-800/60 py-8 px-6 text-center text-xs text-slate-500 font-mono tracking-wider">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>Cosmic Digital Garden • Constellation 2026</span>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/overclocked-2124"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
              >
                GitHub
              </a>
              <span className="text-slate-700">•</span>
              <span className="text-slate-500">Crafted with Material 3 &amp; shadcn</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
