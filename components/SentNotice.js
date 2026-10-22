"use client";

import Link from "next/link";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* What a contributor sees after sending a community note (Sprint 3): it
   waits for the curator, so there is no public page to go to yet. Where it
   is, who can see it, and that it can still be edited. `onAnother` brings
   the empty form back. */
export default function SentNotice({ onAnother }) {
  const lang = useLang();
  const t = pick(forms, lang).contribute;
  return (
    <div className="prompt-card" role="status">
      <h2 className="tile-label">{t.sentHead}</h2>
      <p className="body-copy">{t.sent}</p>
      <div className="auth-actions">
        <Link className="btn" href={localize(lang, "/my-entries")}>
          {t.toMine}
        </Link>
        <button className="auth-btn prompt-alt" type="button" onClick={onAnother}>
          {t.another}
        </button>
      </div>
    </div>
  );
}
