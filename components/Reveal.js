"use client";

import { useEffect, useRef, useState } from "react";

/* Fades one block in as it scrolls into view. Isolating the observer here
   is what lets app/page.js stay a server component.

   The block is visible from the first paint: the fade-in for what is on
   screen is CSS alone (see .reveal in globals.css), so no reader on slow
   data waits for this script to see the text. Once it runs, it hides only
   what is still below the fold (`wait`), and shows that as it arrives.

   Anything else passed (aria-label on the entry sidebar) goes onto the
   element; it used to be dropped here. */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    // Already on screen, or scrolled past: leave it shown.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState(" wait");
    const io = new IntersectionObserver(
      ([e]) => {
        // Also reveal anything already scrolled past — a deep link can
        // jump the viewport clean over a section.
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setState(" wait in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={ref}
      className={`reveal${state}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
