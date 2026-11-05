"use client";

import { useEffect } from "react";

let initialLoad = true;

/** After client-side navigation, move focus to <main> so screen readers announce the new page. */
export function RouteFocus() {
  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, []);
  return null;
}
