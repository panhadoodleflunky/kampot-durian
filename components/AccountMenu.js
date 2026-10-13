"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* The reader's initial in the laptop bar, as a button that opens a small
   panel: who you are, your account, and Log out. An initial, not the whole
   name: the bar then measures the same logged in as logged out, so nothing in
   it moves when the session arrives, and the six links never have to give
   way to the menu button for a logged-in reader. The full name is in the
   panel and in the button's label.

   A disclosure (aria-expanded on the button), not an ARIA menu: the panel
   holds ordinary links and a button, and Tab moves through them as usual.
   Escape, a click outside, or picking an item closes it. */
export default function AccountMenu({ name, onLogOut }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const lang = useLang();
  const t = pick(ui, lang).auth;
  const button = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="account-menu" ref={wrap}>
      <button
        ref={button}
        type="button"
        className="auth-btn account-menu-btn"
        aria-expanded={open}
        aria-controls="account-menu-panel"
        aria-label={`${t.yourAccount}: ${name || t.you}`}
        title={name || t.account}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="account-menu-initial" aria-hidden="true">
          {initial(name || t.account)}
        </span>
      </button>

      {open ? (
        <div className="account-menu-panel" id="account-menu-panel">
          <p className="account-menu-who">
            {t.signedInAs}
            <strong>{name || t.you}</strong>
          </p>
          <Link href={localize(lang, "/account")} onClick={() => setOpen(false)}>
            {t.yourAccount}
          </Link>
          <button
            type="button"
            className="account-menu-logout"
            onClick={() => {
              setOpen(false);
              onLogOut();
            }}
          >
            {t.logOut}
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* The first letter as the reader sees it: a Khmer consonant with its
   subscript and vowel marks is one grapheme, not one code point. */
function initial(name) {
  const first = new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(name.trim())[Symbol.iterator]().next();
  return first.done ? "" : first.value.segment.toUpperCase();
}
