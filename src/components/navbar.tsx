"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ResumeModal } from "@/components/resume-modal";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={cn(
          "pointer-events-auto flex items-center gap-1.5 p-1.5",
          "rounded-full border border-slate-700/40 bg-slate-950/85 backdrop-blur-xl",
          "shadow-xl shadow-black/50 ring-1 ring-white/5",
          "transition-all duration-300 hover:border-slate-600/50"
        )}
      >
        {/* Brand / Identifier */}
        <Link
          href="/"
          className="flex items-center gap-2 pl-3.5 pr-2 py-1.5 text-xs font-mono tracking-widest uppercase text-slate-300 hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="font-semibold text-[11px] text-slate-300">Cosmos</span>
        </Link>

        <div className="h-3.5 w-px bg-slate-800 mx-1" />

        {/* Navigation Links */}
        <ul className="flex items-center gap-1 m-0 p-0 list-none">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-indigo-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-3.5 w-px bg-slate-800 mx-1" />

        {/* Resume Trigger */}
        <div className="pl-0.5 pr-1">
          <ResumeModal />
        </div>
      </nav>
    </header>
  );
}
