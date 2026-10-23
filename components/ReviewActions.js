"use client";

import { useState } from "react";
import FormField from "./FormField.js";
import { supabase } from "../lib/use-session.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../lib/actions.js";
import { tidy } from "../lib/entry-rules.js";
import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* Publish, or send back with an optional note. Both go through the one door
   the database gives a reviewer, review_entry(), which checks the reviewers
   list itself and only moves the status (and the note). It answers true or
   false, never an error, so a false is treated as "didn't happen". */
export const NOTE_MAX = 500;

export default function ReviewActions({ id, onDone }) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState("");
  const [noteError, setNoteError] = useState("");
  const [message, setMessage] = useState("");
  const lang = useLang();
  const t = pick(forms, lang).review;

  async function decide(decision) {
    const text = tidy(note);
    setMessage("");
    if (decision === "returned" && [...text].length > NOTE_MAX) return setNoteError(t.noteTooLong(NOTE_MAX));
    setNoteError("");
    setBusy(decision);
    const client = await supabase();
    const { data, error: failed } = await client.rpc("review_entry", {
      entry_id: id,
      decision,
      note: decision === "returned" && text ? text : null,
    });
    if (failed || data !== true) {
      setBusy("");
      return setMessage(failed ? saveError("review entry", failed, lang) : t.failed);
    }
    /* The public pages are static: rebuild them so a published note shows
       now, not in a minute. Already done, so a failed refresh doesn't undo it. */
    await refreshArchive().catch((e) => console.error("refresh archive:", e));
    onDone(id, decision === "published" ? t.published : t.returned);
  }

  return (
    <div className="review-actions">
      <FormField
        id={`review-note-${id}`}
        label={t.noteLabel}
        hint={t.noteHint(NOTE_MAX)}
        error={noteError}
        multiline
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="auth-actions">
        <button className="btn" type="button" disabled={Boolean(busy)} onClick={() => decide("published")}>
          {busy === "published" ? t.publishing : t.publish}
        </button>
        <button className="auth-btn" type="button" disabled={Boolean(busy)} onClick={() => decide("returned")}>
          {busy === "returned" ? t.sending : t.sendBack}
        </button>
      </div>
      <p className="auth-error" role="alert">
        {message}
      </p>
    </div>
  );
}
