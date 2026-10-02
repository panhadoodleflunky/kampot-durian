"use client";

import { useState } from "react";
import FormField from "./FormField.js";
import PhotoField from "./PhotoField.js";
import { RULES, MAX_TAGS, validateEntry } from "../lib/entry-rules.js";
import { checkPhoto } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";

const EMPTY = { title: "", khmerName: "", body: "", sources: "", tags: "" };
const limit = (name) => `${RULES[name].required ? "Required" : "Optional"}, up to ${RULES[name].max} characters.`;

/* The form both /contribute and the edit page use, so the rules are checked
   the same way in both. It validates and trims; what "save" means (insert or
   update) is the `onSave` the page passes in. onSave resolves with nothing
   on success — it navigates away itself — or with a message to show. */
export default function EntryForm({ initial = EMPTY, currentPhotoUrl, photoRequired, submitLabel, onSave }) {
  const [values, setValues] = useState(initial);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const field = (name) => ({
    value: values[name],
    error: errors[name],
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const trimmed = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));
    const found = validateEntry(trimmed);

    /* A new entry must have a photo; on edit, no file means "keep the old one". */
    let kind = null;
    if (photo || photoRequired) {
      const checked = await checkPhoto(photo);
      if (checked.error) found.photo = checked.error;
      kind = checked.kind;
    }

    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMessage("Fix the fields marked below, then save again.");
      return;
    }

    setBusy(true);
    try {
      const failed = await onSave(trimmed, photo, kind);
      if (failed) setMessage(failed);
    } catch (thrown) {
      setMessage(saveError("EntryForm", thrown));
    }
    setBusy(false);
  }

  return (
    <form className="auth-form entry-form" onSubmit={onSubmit} noValidate>
      <FormField id="entry-title" label="Title" hint={limit("title")} {...field("title")} />
      <FormField id="entry-khmer" label="Khmer name" hint={limit("khmerName")} lang="km" {...field("khmerName")} />
      <FormField id="entry-body" label="Entry" multiline rows={12} hint={`Required, ${RULES.body.min} to ${RULES.body.max} characters. A blank line starts a new paragraph.`} {...field("body")} />
      <FormField id="entry-sources" label="Sources" hint={`${limit("sources")} Who told you, and when. Separate sources with a semicolon.`} {...field("sources")} />
      <FormField id="entry-tags" label="Tags" hint={`Optional, up to ${MAX_TAGS}, separated by commas.`} {...field("tags")} />
      <PhotoField error={errors.photo} currentUrl={currentPhotoUrl} onChange={setPhoto} />

      <p className="auth-error" role="alert">
        {message}
      </p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? "Saving" : submitLabel}
        </button>
      </div>
    </form>
  );
}
