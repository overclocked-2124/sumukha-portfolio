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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-4 py-2",
          "rounded-full border border-[#C8C5D0]/40 bg-[#FAF9FD]/95 backdrop-blur-md",
          "shadow-xs transition-all duration-200"
        )}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-xs font-semibold tracking-tight text-[#1B1B1F] hover:text-[#5954A8] transition-colors shrink-0"
        >
          Sumukha Upadhyaya
        </Link>

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
                    "relative px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#E3DFFF] text-[#140E62] font-semibold"
                      : "text-[#46464F] hover:text-[#1B1B1F] hover:bg-[#F4F2F7]"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Resume Trigger */}
        <div className="shrink-0">
          <ResumeModal />
        </div>
      </nav>
    </header>
  );
}
