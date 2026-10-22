"use client";

import Link from "next/link";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* One row on /my-entries: the title, where it stands in review, what that
   means, and what the author can do next. A returned note shows the
   curator's note, if they left one. Only the review door (review_entry)
   can write that note; the author can't. */
export default function MyNote({ note }) {
  const lang = useLang();
  const t = pick(forms, lang).mine;
  const title = (lang === "km" && note.title_km) || note.title;
  const returned = note.status === "returned";
  const go = (path) => localize(lang, `/contributed/${note.slug}${path}`);

  return (
    <section className="account-block my-note">
      <div className="my-note-head">
        <h2 className="my-note-title">{title}</h2>
        <span className={`entry-status my-note-status my-note-${note.status}`}>{t.status[note.status] ?? note.status}</span>
      </div>
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
        ) : null}
        <Link className={returned ? "btn" : "auth-btn"} href={go("/edit")}>
          {returned ? t.fix : t.edit}
        </Link>
      </div>
    </section>
  );
}
