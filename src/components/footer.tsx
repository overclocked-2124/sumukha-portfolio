import Link from "next/link";
import { personalInfo } from "@/data/portfolio-data";

export function Footer() {
  return (
    <footer
      data-print-hide="true"
      className="border-t border-[#D5D1C5] bg-[#E4E1D8]/70 py-10 px-4 sm:px-6 text-xs font-mono text-[#52514C]"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 text-[#141517] font-semibold">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] shrink-0"
            />
            <span>{personalInfo.name}</span>
          </div>
          <span className="text-xs text-[#52514C]">
            RVCE ISE (9.69 CGPA), IIT Madras BS (9.15 GPA), {personalInfo.location}
          </span>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
        >
          <Link
            href="/"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            3D Rig
          </Link>
          <Link
            href="/projects"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            Experience
          </Link>
          <Link
            href="/blogs"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            Notes
          </Link>
          <span aria-hidden="true" className="text-[#B5B1A4]">
            /
          </span>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            LeetCode
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-[#141517] transition-colors duration-150 ease-out"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
