"use client";

import Link from "next/link";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* What a logged-out visitor sees where a form would be: one sentence and two
   real buttons. Inline "log in ›" links inside the sentence wrapped badly on
   a phone, the uppercase link breaking mid-line. */
export default function SignInPrompt({ children }) {
  const lang = useLang();
  const t = pick(ui, lang).auth;
  return (
    <div className="prompt-card">
      <p className="body-copy">{children}</p>
      <div className="auth-actions">
        <Link className="btn" href={localize(lang, "/login")}>
          {t.logIn}
        </Link>
        <Link className="auth-btn prompt-alt" href={localize(lang, "/signup")}>
          {t.signUp}
        </Link>
      </div>
    </div>
  );
}
