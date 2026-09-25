"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthStatus from "./AuthStatus.js";

/* The phone menu. Below 735px the nav bar has no room for its five links,
   and hiding three of them (the old behaviour) left whole pages unreachable
   on a phone. The burger opens a full-width sheet under the bar with every
   destination, Home included, at finger size.

   This is the only client code in the nav. SiteNav stays a server component
   and passes the link list down, so the split the nav was designed around —
   no search index shipped on every page — still holds.

   On a phone the log-in buttons live here too, at the foot of the sheet: the
   bar is too narrow for them (see globals.css). Above that width CSS hides
   this copy and the bar's own AuthStatus shows. */
export default function NavMenu({ links, current }) {
  const [open, setOpen] = useState(false);
  const burger = useRef(null);

  /* Escape closes and hands focus back to the burger, and the page behind
     the sheet stops scrolling while it is up — otherwise a stray swipe
     scrolls the article, not the menu. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      burger.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    /* Tabbing past the last item closes the sheet, so keyboard focus never
       wanders into the page hidden under the scrim. */
    <div
      className="gnav-menu"
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={burger}
        type="button"
        className={`gnav-burger${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="gnav-sheet"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="gnav-burger-bar" aria-hidden="true" />
        <span className="gnav-burger-bar" aria-hidden="true" />
      </button>

      {open && (
        <>
          {/* Tapping the dimmed page closes the sheet, like every phone menu. */}
          <div className="gnav-scrim" onClick={() => setOpen(false)} />
          <div className="gnav-sheet" id="gnav-sheet">
            {[{ href: "/", label: "Home" }, ...links].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="gnav-sheet-auth" onClick={() => setOpen(false)}>
              <AuthStatus />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
