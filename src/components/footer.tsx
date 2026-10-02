import Link from "next/link";
import { personalInfo } from "@/data/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-[#C8C5D0]/30 bg-[#F4F2F7] py-14 px-4 sm:px-6 text-[#46464F] font-mono text-xs">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-[#C8C5D0]/25">
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#1B1B1F] text-sm font-sans tracking-tight">
              {personalInfo.name}
            </span>
            <p className="text-xs text-[#635F6A] font-sans leading-relaxed">
              Software Engineer &amp; Undergraduate at RVCE &amp; IIT Madras. Building low-level systems, distributed infrastructure, and web applications.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#1B1B1F] text-xs font-mono uppercase tracking-wider">
              Navigation
            </span>
            <div className="flex flex-col gap-1.5 text-xs">
              <Link href="/" className="hover:text-[#5954A8] transition-colors">Home / Overview</Link>
              <Link href="/projects" className="hover:text-[#5954A8] transition-colors">Projects &amp; Repositories</Link>
              <Link href="/about" className="hover:text-[#5954A8] transition-colors">About &amp; Experience</Link>
              <Link href="/blogs" className="hover:text-[#5954A8] transition-colors">Engineering Notes</Link>
            </div>
          </div>

          {/* Column 3: Contact & Links */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#1B1B1F] text-xs font-mono uppercase tracking-wider">
              Channels
            </span>
            <div className="flex flex-col gap-1.5 text-xs">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-[#5954A8] transition-colors">
                {personalInfo.email}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-[#5954A8] transition-colors">
                GitHub (@{personalInfo.githubHandle})
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#5954A8] transition-colors">
                LinkedIn Profile
              </a>
              <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="hover:text-[#5954A8] transition-colors">
                LeetCode Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#635F6A]">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Material You 3 Expressive</span>
            <span>•</span>
            <span>Pure Typography</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
