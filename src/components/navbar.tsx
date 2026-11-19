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
  { label: "3D Rig", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/about" },
  { label: "Notes", href: "/blogs" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      data-print-hide="true"
      className="fixed top-0 inset-x-0 z-50 border-b border-[#D5D1C5] bg-[#EFEDE6]/95 backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6 min-h-14 py-2 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-mono tracking-tight text-[#141517] shrink-0"
        >
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-[#FF4F00] inline-block shrink-0"
          />
          <span className="font-semibold">Sumukha Upadhyaya</span>
        </Link>

        <nav
          aria-label="Primary Navigation"
          className="order-3 sm:order-2 w-full sm:w-auto overflow-x-auto"
        >
          <ul className="flex items-center gap-1 m-0 p-0 list-none">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "te-btn inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-[5px] text-xs font-mono",
                      isActive
                        ? "bg-[#141517] text-[#FAF9F5] font-medium"
                        : "text-[#52514C] hover:text-[#141517] hover:bg-[#E4E1D8]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="order-2 sm:order-3 shrink-0">
          <ResumeModal />
        </div>
      </div>
    </header>
  );
}
