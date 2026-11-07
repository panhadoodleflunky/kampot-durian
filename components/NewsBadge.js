"use client";

import { useLang } from "../lib/use-lang.js";
import { km } from "../content/copy/ui.js";

/* A small gold count on the account button, the phone menu and My notes:
   notes sent back or newly published (lib/use-note-news.js). Hidden from
   screen readers; the control it sits on carries the full sentence in its
   label. Nothing renders at zero. */
export default function NewsBadge({ count, className = "" }) {
  const lang = useLang();
  if (!count) return null;
  const shown = count > 9 ? "9+" : String(count);
  return (
    <span className={`news-badge ${className}`.trim()} aria-hidden="true">
      {lang === "km" ? km(shown) : shown}
    </span>
  );
}
