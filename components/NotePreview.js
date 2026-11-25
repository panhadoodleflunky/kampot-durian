"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";
import { ui } from "../content/copy/ui.js";

/* On My notes: a note that isn't published yet has no public page, so this
   shows it here, the way readers will see it in this edition (the Khmer
   side where there is one, the English where there isn't). */
export default function NotePreview({ note }) {
  const lang = useLang();
  const t = pick(forms, lang).mine;
  const side = (field) => (lang === "km" && note[`${field}_km`]) || note[field] || "";

  return (
    <div className="note-preview">
      <p className="tile-label">{t.previewNote}</p>
      {note.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="entry-photo-current" src={note.photo_url} alt={pick(ui, lang).community.photoAlt(note.title)} />
      ) : null}
      <h3 className="my-note-title">{side("title")}</h3>
      {note.khmer_name ? <p className="entry-khmer" lang="km">{note.khmer_name}</p> : null}
      {side("body").split("\n\n").map((para, i) => (
        <p className="body-copy" key={i}>
          {para}
        </p>
      ))}
      <p className="tile-label">{pick(ui, lang).community.sources}</p>
      <p className="body-copy">{side("sources")}</p>
    </div>
  );
}
