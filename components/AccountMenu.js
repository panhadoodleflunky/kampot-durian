"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

import { useEffect, useRef, useState } from "react";
import AccountMenuPanel from "./AccountMenuPanel.js";
import { supabase } from "../lib/use-session.js";
import { initial } from "../lib/initial.js";
import { useDismiss } from "../lib/use-dismiss.js";
import { useNoteNews } from "../lib/use-note-news.js";
import NewsBadge from "./NewsBadge.js";

/* The reader's initial in the laptop bar, as a button that opens a small
   panel (AccountMenuPanel): who you are, My notes, your account, Log out.
   An initial, not the whole name: the bar then measures the same logged in
   as logged out, so nothing in it moves when the session arrives, and the six links never have to give
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
  /* The Review queue link, for the reviewer only: asked of the database the
     first time the panel opens, then remembered. */
  const [reviewer, setReviewer] = useState(false);
  const asked = useRef(false);
  const news = useNoteNews();

  useEffect(() => {
    if (!open || asked.current) return;
    asked.current = true;
    supabase()
      .then((client) => client.rpc("is_reviewer"))
      .then(({ data }) => setReviewer(data === true))
      .catch(() => {});
  }, [open]);

  useDismiss(open, () => setOpen(false), wrap, button);

  return (
    <div className="account-menu" ref={wrap}>
      <button
        ref={button}
        type="button"
        className="auth-btn account-menu-btn"
        aria-expanded={open}
        aria-controls="account-menu-panel"
        aria-label={`${t.yourAccount}: ${name || t.you}${news.total ? ` — ${t.news(news.total)}` : ""}`}
        title={name || t.account}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Only ever the reader's own initial. Until the name is known, an
            outline of a person: never the first letter of "Account" or គណនី,
            which would flicker from one language's letter to another's on
            every switch. */}
        {name ? (
          <span className="account-menu-initial" aria-hidden="true">
            {initial(name)}
          </span>
        ) : (
          <svg className="account-menu-person" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 19.5c1.2-3.3 3.6-5 6.5-5s5.3 1.7 6.5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        <NewsBadge count={news.total} className="news-badge-corner" />
      </button>

      {open ? (
        <AccountMenuPanel name={name} reviewer={reviewer} news={news.total} onClose={() => setOpen(false)} onLogOut={onLogOut} />
      ) : null}
    </div>
  );
}
