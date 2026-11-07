"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountMenu from "./AccountMenu.js";
import NewsBadge from "./NewsBadge.js";
import { useNoteNews } from "../lib/use-note-news.js";
import { supabase, useSession } from "../lib/use-session.js";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* Who the reader is, in the nav: their name, linking to /account. Not the
   email: an address in the nav ends up in every screenshot and every
   projected demo. The session itself is read in lib/use-session.js.

   `variant`: "bar" in the nav bar, where the name opens a small account
   panel (AccountMenu); "sheet" in the phone menu, where everything is laid
   out flat at finger size: Contribute, the name, My notes and Log out. */
export default function AuthStatus({ variant = "bar" }) {
  const router = useRouter();
  const { userId, name, ready } = useSession();
  const news = useNoteNews();
  const lang = useLang();
  const t = pick(ui, lang).auth;
  const go = (path) => localize(lang, path);

  async function logOut() {
    const client = await supabase();
    await client.auth.signOut();
    router.refresh();
  }

  /* An empty slot until the session is known. Rendering the logged-out links
     first would flash "log in" at someone who is already logged in, on every
     single page load. */
  if (!ready) return <span className="auth-slot" aria-hidden="true" />;

  if (userId) {
    return (
      <div className="auth-nav">
        <Link className="auth-btn" href={go("/contribute")}>
          {t.contribute}
        </Link>
        {variant === "sheet" ? (
          <>
            <Link className="auth-email auth-name" href={go("/account")} title={t.yourAccount} data-more={`  ·  ${t.account} ›`}>
              {name || t.account}
            </Link>
            <Link className="auth-btn" href={go("/my-entries")} aria-label={news.total ? `${t.myNotes} — ${t.news(news.total)}` : undefined}>
              {t.myNotes}
              <NewsBadge count={news.total} className="news-badge-corner" />
            </Link>
            <button className="auth-btn" type="button" onClick={logOut}>
              {t.logOut}
            </button>
          </>
        ) : (
          <AccountMenu name={name} onLogOut={logOut} />
        )}
      </div>
    );
  }

  return (
    <div className="auth-nav">
      <Link className="auth-btn" href={go("/login")}>
        {t.logIn}
      </Link>
      <Link className="auth-btn" href={go("/signup")}>
        {t.signUp}
      </Link>
    </div>
  );
}
