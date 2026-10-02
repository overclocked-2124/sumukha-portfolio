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
  { label: "Notes", href: "/blogs" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={cn(
          "pointer-events-auto flex items-center gap-1.5 p-1.5",
          "rounded-full border border-[#C8C5D0]/40 bg-[#FAF8FD]/90 backdrop-blur-xl",
          "shadow-sm ring-1 ring-black/5",
          "transition-all duration-200"
        )}
      >
        {/* Brand / Name */}
        <Link
          href="/"
          className="flex items-center gap-2 pl-3.5 pr-2 py-1.5 text-xs font-mono tracking-wider uppercase text-[#1D1B20] hover:text-[#5954A8] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#5954A8]" />
          <span className="font-semibold text-xs text-[#1D1B20]">Sumukha</span>
        </Link>

        <div className="h-3.5 w-px bg-[#C8C5D0]/60 mx-1" />

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
                    "relative flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium tracking-normal transition-all duration-200",
                    isActive
                      ? "bg-[#E3DFFF] text-[#140E62] font-semibold"
                      : "text-[#49454F] hover:text-[#1D1B20] hover:bg-[#EEEBF2]"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-3.5 w-px bg-[#C8C5D0]/60 mx-1" />

        {/* Resume Trigger */}
        <div className="pl-0.5 pr-1">
          <ResumeModal />
        </div>
      </nav>
    </header>
  );
}
