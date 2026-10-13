"use client";

import { useEffect } from "react";

/* How a search reaches the Field Notes box from elsewhere:
   - #search in the address focuses the box (and again on a hash change,
     since Next does not remount the page for /field-notes#search);
   - ?q= in the address, from the nav search's Enter, starts it filtered;
   - a "nav-search" event does the same when the reader is already on the
     page, where pushing ?q= does not remount it.
   `onQuery` sets the query and resets the page. */
export function useSearchHandoff(inputRef, onQuery) {
  useEffect(() => {
    const focus = () => {
      if (window.location.hash === "#search") inputRef.current?.focus();
    };
    const fromNav = (event) => onQuery(event.detail);

    focus();
    const handed = new URLSearchParams(window.location.search).get("q");
    if (handed) onQuery(handed);

    window.addEventListener("hashchange", focus);
    window.addEventListener("nav-search", fromNav);
    return () => {
      window.removeEventListener("hashchange", focus);
      window.removeEventListener("nav-search", fromNav);
    };
    // Mount-only: inputRef is stable, and onQuery only calls state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
