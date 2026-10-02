import Link from "next/link";
import { personalInfo } from "@/data/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-[#C8C5D0]/30 bg-[#F4F2F8] py-12 px-4 sm:px-6 text-[#49454F] font-mono text-xs">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-[#C8C5D0]/20">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#1D1B20] font-bold tracking-tight text-sm">
              <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
              <span>{personalInfo.name}</span>
              <span className="text-[#C8C5D0] font-normal">/</span>
              <span className="text-xs text-[#5954A8] font-normal">Portfolio &amp; Garden</span>
            </div>
            <p className="text-[#635F6A] text-xs font-sans max-w-md">
              Undergraduate at RVCE &amp; IIT Madras. Engineering low-level runtimes, distributed services, and accessible web systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#49454F] hover:text-[#5954A8] transition-colors"
            >
              GitHub
            </a>
            <span className="text-[#C8C5D0]">/</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#49454F] hover:text-[#5954A8] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#C8C5D0]">/</span>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-[#49454F] hover:text-[#5954A8] transition-colors"
            >
              LeetCode
            </a>
            <span className="text-[#C8C5D0]">/</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-[#49454F] hover:text-[#5954A8] transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#635F6A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            <span>STATUS: OPEN FOR NEW OPPORTUNITIES &amp; RESEARCH</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#1D1B20] transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-[#1D1B20] transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-[#1D1B20] transition-colors">About</Link>
            <Link href="/blogs" className="hover:text-[#1D1B20] transition-colors">Notes</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Material You 3 Expressive.
          </div>
        </div>
      </div>
    </footer>
  );
}
