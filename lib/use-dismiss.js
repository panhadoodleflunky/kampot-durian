"use client";

import { useEffect } from "react";

/* While `open`, Escape closes and hands focus back to `button`, and a
   pointer press outside `wrap` closes. For AccountMenu's panel. */
export function useDismiss(open, close, wrap, button) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      close();
      button.current?.focus();
    };
    const onPointer = (e) => {
      if (!wrap.current?.contains(e.target)) close();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
    // close only calls a state setter; re-binding on open is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}
