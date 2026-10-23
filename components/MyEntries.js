"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SignInPrompt from "./SignInPrompt.js";
import MyNote from "./MyNote.js";
import ReviewerBanner from "./ReviewerBanner.js";
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
      setState({ status: "ready", notes: data, curator: isCurator(auth.user) });
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
        state.notes.map((note) => <MyNote key={note.id} note={note} />)
      )}
    </>
  );
}
