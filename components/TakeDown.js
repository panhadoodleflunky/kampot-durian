"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./ConfirmDialog.js";
import FormField from "./FormField.js";
import { NOTE_MAX } from "./ReviewActions.js";
import { supabase } from "../lib/use-session.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../lib/actions.js";
import { tidy } from "../lib/entry-rules.js";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* On a published community note, for the reviewer only: take it off the
   site without destroying it. It goes back to its author as "sent back",
   through the same review_entry door as the queue, but as its own decision:
   'taken-down' acts only on a published note, and the queue's 'returned'
   only on a pending one, so a stale queue tab can't take down a note that
   was just published (Lab 11). The reviewer must say why (owner, 25 Nov
   2026); the author reads it on My notes as the curator's note. */
export default function TakeDown({ id, title }) {
  const router = useRouter();
  const [reviewer, setReviewer] = useState(false);
  const [asking, setAsking] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
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
    const text = tidy(reason);
    if (!text) return setReasonError(t.reasonMissing);
    if ([...text].length > NOTE_MAX) return setReasonError(all.review.noteTooLong(NOTE_MAX));
    setReasonError("");
    setBusy(true);
    setMessage("");
    const client = await supabase();
    const { data, error } = await client.rpc("review_entry", { entry_id: id, decision: "taken-down", note: text });
    if (error || data !== true) {
      setBusy(false);
      setAsking(false);
      return setMessage(error ? saveError("take down", error, lang) : all.review.failed);
    }
    await refreshArchive().catch((e) => console.error("refresh archive:", e));
    router.push(localize(lang, "/contributed"));
  }

  if (!reviewer) return null;
  return (
    <div className="owner-actions">
      <button className="auth-btn owner-delete" type="button" onClick={() => setAsking(true)} disabled={busy}>
        {busy ? t.takingDown : t.takeDown}
      </button>
      <ConfirmDialog
        open={asking}
        title={t.takeDownTitle(title)}
        body={t.takeDownConfirm}
        confirmLabel={busy ? t.takingDown : t.takeDown}
        cancelLabel={t.cancel}
        busy={busy}
        onConfirm={takeDown}
        onCancel={() => setAsking(false)}
      >
        <FormField id={`takedown-${id}`} label={t.reasonLabel} hint={t.reasonHint(NOTE_MAX)} error={reasonError} multiline rows={3} required requiredTag={all.entry.requiredTag} value={reason} onChange={(e) => setReason(e.target.value)} />
      </ConfirmDialog>
      {message ? <p className="auth-error" role="alert">{message}</p> : null}
    </div>
  );
}
