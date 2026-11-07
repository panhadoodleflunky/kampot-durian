"use client";

import Link from "next/link";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* The panel AccountMenu opens: who you are, My notes, the Review queue (for
   the reviewer only), your account, and Log out. Ordinary links and a
   button, so Tab moves through them as usual. Picking any item closes it. */
export default function AccountMenuPanel({ name, reviewer, onClose, onLogOut }) {
  const lang = useLang();
  const t = pick(ui, lang).auth;
  return (
    <div className="account-menu-panel" id="account-menu-panel">
      <p className="account-menu-who">
        {t.signedInAs}
        <strong>{name || t.you}</strong>
      </p>
      <Link href={localize(lang, "/my-entries")} onClick={onClose}>
        {t.myNotes}
      </Link>
      {reviewer ? (
        <Link href={localize(lang, "/review")} onClick={onClose}>
          {t.review}
        </Link>
      ) : null}
      <Link href={localize(lang, "/account")} onClick={onClose}>
        {t.yourAccount}
      </Link>
      <button
        type="button"
        className="account-menu-logout"
        onClick={() => {
          onClose();
          onLogOut();
        }}
      >
        {t.logOut}
      </button>
    </div>
  );
}
