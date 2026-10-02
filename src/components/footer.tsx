import Link from "next/link";
import { personalInfo } from "@/data/portfolio-data";
import { 
  Sparkles, 
  GitBranch, 
  ExternalLink, 
  Mail 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-12 px-4 sm:px-6 text-slate-400 font-mono text-xs">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-slate-900">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-white font-bold tracking-tight text-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{personalInfo.name}</span>
              <span className="text-slate-600 font-normal">•</span>
              <span className="text-xs text-indigo-300 font-normal">Cosmic Digital Garden</span>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-md">
              Low-level runtimes, distributed systems, and living research notes. Crafted with Google Material 3 and shadcn/ui.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LeetCode</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>STATION TELEMETRY: ALL CLUSTERS NOMINAL</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-slate-300 transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/blogs" className="hover:text-slate-300 transition-colors">Blogs</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Zero Emojis • Vector Fidelity.
          </div>
        </div>
      </div>
    </footer>
  );
}
