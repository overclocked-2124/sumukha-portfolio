"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome3D = pathname === "/";
  const mainRef = useRef<HTMLElement | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  if (isHome3D) {
    return (
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="w-full h-dvh overflow-hidden focus:outline-none"
      >
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="flex-1 pt-28 sm:pt-24 pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full focus:outline-none"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
