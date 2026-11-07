"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* The top of My notes when something happened to the reader's notes: how
   many were sent back, and how many were published since they last looked.
   role="status", so a screen reader announces it when the list arrives. */
export default function NotesNews({ returned, published }) {
  const t = pick(forms, useLang()).mine;
  if (!returned && !published) return null;
  return (
    <div className="notes-news" role="status">
      {returned ? <p className="body-copy">{t.newsReturned(returned)}</p> : null}
      {published ? <p className="body-copy">{t.newsPublished(published)}</p> : null}
    </div>
  );
}
