"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SignInPrompt from "./SignInPrompt.js";
import MyNote from "./MyNote.js";
import ReviewerBanner from "./ReviewerBanner.js";
import NotesNews from "./NotesNews.js";
import { readSeen, markSeen, newsFrom } from "../lib/use-note-news.js";
import { supabase } from "../lib/use-session.js";
import { isCurator } from "../lib/roles.js";
import { saveError } from "../lib/save-error.js";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* /my-entries: the logged-in reader's own community notes, newest first,
   each with its review status in plain words (Sprint 3). Filtered by owner
   here; the select policy would also show them every published note, which
   belong on /contributed, not on this page. */
export default function MyEntries() {
  const [state, setState] = useState({ status: "loading" });
  const lang = useLang();
  const t = pick(forms, lang).mine;

  useEffect(() => {
    let dropped = false;
    (async () => {
      const client = await supabase();
      const { data: auth } = await client.auth.getUser();
      if (!auth.user) return !dropped && setState({ status: "logged-out" });
      const { data, error } = await client
        .from("contributions")
        .select("id, slug, title, title_km, status, review_note")
        .eq("owner", auth.user.id)
        .order("created_at", { ascending: false });
      if (dropped) return;
      if (error) return setState({ status: "failed", message: saveError("load my notes", error, lang) });
      /* What's new is worked out before this visit counts as seeing it;
         then every badge on the page clears. */
      const seen = readSeen(auth.user.id);
      const fresh = data.filter((n) => n.status === "published" && !seen.includes(n.id)).map((n) => n.id);
      setState({ status: "ready", notes: data, curator: isCurator(auth.user), news: newsFrom(data, seen), fresh });
      markSeen(auth.user.id, data.filter((n) => n.status === "published").map((n) => n.id));
    })();
    return () => {
      dropped = true;
    };
  }, [lang]);

  const { status } = state;
  if (status === "loading") return <p className="body-copy">{t.loading}</p>;
  if (status === "failed") return <p className="auth-error">{state.message}</p>;
  if (status === "logged-out") return <SignInPrompt>{t.loggedOut}</SignInPrompt>;

  return (
    <>
      <ReviewerBanner />
      <NotesNews returned={state.news.returned} published={state.news.published} />
      {state.curator ? <p className="body-copy">{t.curator}</p> : null}
      {state.notes.length === 0 ? (
        <div className="prompt-card">
          <p className="body-copy">{t.empty}</p>
          <div className="auth-actions">
            <Link className="btn" href={localize(lang, "/contribute")}>
              {t.add}
            </Link>
          </div>
        </div>
      ) : (
        state.notes.map((note) => <MyNote key={note.id} note={note} fresh={state.fresh.includes(note.id)} />)
      )}
    </>
  );
}
