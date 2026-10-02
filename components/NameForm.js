"use client";

import { useState } from "react";
import FormField from "./FormField.js";
import { createClient } from "../lib/supabase/client.js";
import { nameError, NAME_MAX } from "../lib/signup-rules.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../app/field-notes/actions.js";

/* Rename. The name lives in `profiles` — the one copy the site reads, in
   the nav and under every community note. The update policy lets a person
   change only their own row, and a column grant lets them change only
   `display_name` there (Lab 7 SQL, Block 7); the check constraint repeats
   the length rule. As with entries, a refused update is "success, zero
   rows", so the returned row is checked. */
export default function NameForm({ userId, current }) {
  const [name, setName] = useState(current);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const trimmed = name.trim();
    const found = nameError(trimmed);
    setError(found);
    if (found) return;

    setBusy(true);
    const { data, error: failed } = await createClient()
      .from("profiles")
      .update({ display_name: trimmed })
      .eq("id", userId)
      .select("display_name");
    setBusy(false);

    if (failed) return setMessage(saveError("rename", failed));
    if (data.length === 0) {
      console.error("rename: no row came back for", userId);
      return setMessage("That change wasn't saved.");
    }
    setName(trimmed);
    setMessage("Saved. Your notes now show this name.");
    /* The nav listens for this, so the new name appears without a reload;
       the community pages are rebuilt so the notes show it too. */
    window.dispatchEvent(new CustomEvent("profile-renamed", { detail: trimmed }));
    await refreshArchive();
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <FormField
        id="acct-name"
        label="Your name"
        hint={`Shown in the menu and on your notes. Up to ${NAME_MAX} characters.`}
        autoComplete="name"
        value={name}
        error={error}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="auth-error" role="status">{message}</p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? "Saving" : "Save name"}
        </button>
      </div>
    </form>
  );
}
