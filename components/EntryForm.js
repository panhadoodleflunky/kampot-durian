"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useState } from "react";
import FormField from "./FormField.js";
import PhotoField from "./PhotoField.js";
import { RULES, MAX_TAGS, validateEntry } from "../lib/entry-rules.js";
import { checkPhoto } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";

const EMPTY = { title: "", khmerName: "", body: "", sources: "", tags: "" };

/* The form both /contribute and the edit page use, so the rules are checked
   the same way in both. It validates and trims; what "save" means (insert or
   update) is the `onSave` the page passes in. onSave resolves with nothing
   on success — it navigates away itself — or with a message to show. */
export default function EntryForm({ initial = EMPTY, currentPhotoUrl, photoRequired, photoLocked, submitLabel, onSave }) {
  const [values, setValues] = useState(initial);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.entry;
  const label = all.rules.labels;
  const limit = (name) => t.limit(RULES[name].required, RULES[name].max);

  const field = (name) => ({
    value: values[name],
    error: errors[name],
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const trimmed = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));
    const found = validateEntry(trimmed, lang);

    /* A new entry must have a photo; on edit, no file means "keep the old one". */
    let kind = null;
    if (photo || photoRequired) {
      const checked = await checkPhoto(photo, lang);
      if (checked.error) found.photo = checked.error;
      kind = checked.kind;
    }

    setErrors(found);
    if (Object.keys(found).length > 0) {
      setMessage(t.fix);
      return;
    }

    setBusy(true);
    try {
      const failed = await onSave(trimmed, photo, kind);
      if (failed) setMessage(failed);
    } catch (thrown) {
      setMessage(saveError("EntryForm", thrown, lang));
    }
    setBusy(false);
  }

  return (
    <form className="auth-form entry-form" onSubmit={onSubmit} noValidate>
      <FormField id="entry-title" label={label.title} hint={limit("title")} {...field("title")} />
      <FormField id="entry-khmer" label={label.khmerName} hint={limit("khmerName")} lang="km" {...field("khmerName")} />
      <FormField id="entry-body" label={label.body} multiline rows={12} hint={t.bodyHint(RULES.body.min, RULES.body.max)} {...field("body")} />
      <FormField id="entry-sources" label={label.sources} hint={t.sourcesHint(limit("sources"))} {...field("sources")} />
      <FormField id="entry-tags" label={t.tagsLabel} hint={t.tagsHint(MAX_TAGS)} {...field("tags")} />
      {photoLocked ? null : <PhotoField error={errors.photo} currentUrl={currentPhotoUrl} onChange={setPhoto} />}

      <p className="auth-error" role="alert">
        {message}
      </p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? t.saving : submitLabel}
        </button>
      </div>
    </form>
  );
}
