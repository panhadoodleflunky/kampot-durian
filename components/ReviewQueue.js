"use client";

import { useEffect, useState } from "react";
import SignInPrompt from "./SignInPrompt.js";
import ReviewItem from "./ReviewItem.js";
import LoadingNotes from "./LoadingNotes.js";
import { supabase } from "../lib/use-session.js";
import { saveError } from "../lib/save-error.js";
import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* /review: every pending community note, oldest first, for the reviewer.

   "Are you a reviewer?" is asked of the database (is_reviewer, the same
   function the policies use), not read from the login token. For anyone
   else the page says so and stops; even if they skipped that, the select
   policy would only hand them their own notes, and review_entry would
   answer false. */
export default function ReviewQueue() {
  const [state, setState] = useState({ status: "loading" });
  const [flash, setFlash] = useState("");
  const lang = useLang();
  const t = pick(forms, lang).review;

  useEffect(() => {
    let dropped = false;
    (async () => {
      /* The session this browser holds (no trip to the auth server), then
         the reviewer question and the notes at the same time. For anyone
         who isn't a reviewer the notes are thrown away unshown: the select
         policy would only have given them their own. */
      const client = await supabase();
      const { data: auth } = await client.auth.getSession();
      if (!auth.session) return !dropped && setState({ status: "logged-out" });
      const [{ data: reviewer }, { data, error }] = await Promise.all([
        client.rpc("is_reviewer"),
        client
          .from("contributions")
          .select("*, profiles(display_name)")
          .eq("status", "pending")
          .order("created_at", { ascending: true }),
      ]);
      if (dropped) return;
      if (reviewer !== true) return setState({ status: "not-reviewer" });
      if (error) return setState({ status: "failed", message: saveError("load review queue", error, lang) });
      setState({ status: "ready", notes: data });
    })();
    return () => {
      dropped = true;
    };
  }, [lang]);

  /* A reviewed note leaves the list; the message says what happened to it. */
  function done(id, message) {
    setFlash(message);
    setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) }));
  }

  const { status } = state;
  if (status === "loading") return <LoadingNotes label={t.loading} />;
  if (status === "failed") return <p className="auth-error">{state.message}</p>;
  if (status === "logged-out") return <SignInPrompt>{t.loggedOut}</SignInPrompt>;
  if (status === "not-reviewer") return <p className="body-copy">{t.notReviewer}</p>;

  const { notes } = state;
  return (
    <>
      <p className="review-flash" role="status">
        {flash}
      </p>
      <p className="body-copy review-count">{notes.length === 0 ? t.empty : t.count(notes.length)}</p>
      {notes.map((note) => (
        <ReviewItem key={note.id} note={note} onDone={done} />
      ))}
    </>
  );
}
