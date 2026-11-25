"use client";

import { useState } from "react";
import Link from "next/link";
import NotePreview from "./NotePreview.js";
import DeleteButton from "./DeleteButton.js";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";
import { km } from "../content/copy/ui.js";

/* One row on /my-entries: the title, where it stands in review, what that
   means, and what the author can do next. A returned note shows the
   curator's note, if they left one. Only the review door (review_entry)
   can write that note; the author can't. Delete is here too, in every
   state, behind the same second-thought box as on the note's page. A note
   that isn't published has no public page, so it gets Preview instead of
   Read it (NotePreview). */
export default function MyNote({ note, fresh, onDeleted }) {
  const lang = useLang();
  const t = pick(forms, lang).mine;
  const title = (lang === "km" && note.title_km) || note.title;
  const returned = note.status === "returned";
  const [previewing, setPreviewing] = useState(false);
  const go = (path) => localize(lang, `/contributed/${note.slug}${path}`);
  /* When it was first sent, as a date in the reader's edition (Khmer
     digits on /km, as everywhere else on that side). */
  const date = note.created_at ? new Intl.DateTimeFormat(lang === "km" ? "km-KH" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(note.created_at)) : "";

  return (
    /* Marked when it needs the reader: sent back, or newly published. */
    <section className={`account-block my-note${returned || fresh ? " my-note-flag" : ""}`}>
      <div className="my-note-head">
        <h2 className="my-note-title">{title}</h2>
        <span className={`entry-status my-note-status my-note-${note.status}`}>{t.status[note.status] ?? note.status}</span>
      </div>
      {date ? <p className="my-note-date">{t.added(lang === "km" ? km(date) : date)}</p> : null}
      <p className="body-copy">{t.explain[note.status]}</p>
      {returned && note.review_note ? (
        <div className="my-note-review">
          <h3 className="tile-label">{t.noteFrom}</h3>
          <p className="body-copy">{note.review_note}</p>
        </div>
      ) : null}
      <div className="owner-actions">
        {note.status === "published" ? (
          <Link className="auth-btn" href={go("")}>
            {t.read}
          </Link>
        ) : (
          <button className="auth-btn" type="button" aria-expanded={previewing} onClick={() => setPreviewing(!previewing)}>
            {previewing ? t.hidePreview : t.preview}
          </button>
        )}
        <Link className={returned ? "btn" : "auth-btn"} href={go("/edit")}>
          {returned ? t.fix : t.edit}
        </Link>
        <DeleteButton table="contributions" id={note.id} owner={note.owner} photoUrl={note.photo_url} title={title} onDeleted={onDeleted} />
      </div>
      {previewing ? <NotePreview note={note} /> : null}
    </section>
  );
}
