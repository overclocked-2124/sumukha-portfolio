"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Home, Layers, User, BookOpen } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: Layers },
  { label: "About", href: "/about", icon: User },
  { label: "Blogs", href: "/blogs", icon: BookOpen },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={cn(
          "pointer-events-auto flex items-center gap-1 p-1.5",
          "rounded-full border border-slate-700/40 bg-slate-950/80 backdrop-blur-xl",
          "shadow-lg shadow-black/40 ring-1 ring-white/5",
          "transition-all duration-300 hover:border-slate-600/50"
        )}
      >
        {/* Brand / Emblem */}
        <Link
          href="/"
          className="flex items-center gap-2 pl-3.5 pr-2 py-1.5 text-xs font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline font-mono text-[11px] text-slate-400">Cosmos</span>
        </Link>

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        {/* Navigation Links */}
        <ul className="flex items-center gap-1 m-0 p-0 list-none">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/15 text-indigo-300 shadow-sm border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5", isActive ? "text-indigo-400" : "text-slate-500")} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse ml-0.5" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
