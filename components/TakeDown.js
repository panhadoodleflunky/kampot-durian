"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/use-session.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../lib/actions.js";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* On a published community note, for the reviewer only: take it off the
   site without destroying it. It goes back to its author as "sent back",
   through the same review_entry door as the queue (which allows returning a
   published note, never publishing one that isn't pending). Delete stays
   for abuse; this is the gentle way. */
export default function TakeDown({ id }) {
  const router = useRouter();
  const [reviewer, setReviewer] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.owner;

  useEffect(() => {
    supabase()
      .then((client) => client.rpc("is_reviewer"))
      .then(({ data }) => setReviewer(data === true))
      .catch(() => {});
  }, []);

  async function takeDown() {
    if (!window.confirm(t.takeDownConfirm)) return;
    setBusy(true);
    setMessage("");
    const client = await supabase();
    const { data, error } = await client.rpc("review_entry", { entry_id: id, decision: "returned", note: null });
    if (error || data !== true) {
      setBusy(false);
      return setMessage(error ? saveError("take down", error, lang) : all.review.failed);
    }
    await refreshArchive().catch((e) => console.error("refresh archive:", e));
    router.push(localize(lang, "/contributed"));
  }

  if (!reviewer) return null;
  return (
    <div className="owner-actions">
      <button className="auth-btn owner-delete" type="button" onClick={takeDown} disabled={busy}>
        {busy ? t.takingDown : t.takeDown}
      </button>
      <p className="auth-error" role="alert">
        {message}
      </p>
    </div>
  );
}
