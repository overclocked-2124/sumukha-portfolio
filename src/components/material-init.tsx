"use client";

import { useEffect } from "react";

export function MaterialInit() {
  useEffect(() => {
    // Dynamically register Material 3 Web Components on client side
    import("@material/web/all.js").catch((err) => {
      console.warn("Failed to load Material Web Components:", err);
    });
  }, []);

  return null;
}
