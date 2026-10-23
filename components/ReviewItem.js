"use client";

import ReviewActions from "./ReviewActions.js";
import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";
import { ui } from "../content/copy/ui.js";

/* One pending note, shown whole: the reviewer approves exactly what will go
   public, so both sides are here, English and Khmer, plus the photo and the
   sources. Nothing on it can be edited from this page: a reviewer publishes
   or sends back, and never rewrites (Sprint 3 brief). */
export default function ReviewItem({ note, onDone }) {
  const lang = useLang();
  const t = pick(forms, lang).review;
  const author = note.profiles?.display_name ?? pick(ui, lang).community.reader;
  const khmer = note.title_km || note.body_km || note.sources_km || note.tags_km?.length;

  return (
    <article className="account-block review-item">
      <p className="tile-label">{t.by(author)}</p>
      <h2 className="my-note-title">{note.title}</h2>
      {note.khmer_name ? <p className="entry-khmer" lang="km">{note.khmer_name}</p> : null}
      {note.photo_url ? (
        /* Pending notes have no public page yet; next/image would add nothing. */
        // eslint-disable-next-line @next/next/no-img-element
        <img className="entry-photo-current" src={note.photo_url} alt={pick(ui, lang).community.photoAlt(note.title)} />
      ) : null}
      <Text body={note.body} />
      <p className="tile-label">{t.sources}</p>
      <p className="body-copy">{note.sources}</p>
      {note.tags?.length ? <p className="body-copy">{t.tags}: {note.tags.join(", ")}</p> : null}

      <div className="review-khmer" lang="km">
        <p className="tile-label">{t.khmer}</p>
        {khmer ? (
          <>
            {note.title_km ? <h3 className="my-note-title">{note.title_km}</h3> : null}
            {note.body_km ? <Text body={note.body_km} /> : null}
            {note.sources_km ? <p className="body-copy">{note.sources_km}</p> : null}
            {note.tags_km?.length ? <p className="body-copy">{note.tags_km.join(", ")}</p> : null}
          </>
        ) : (
          <p className="body-copy">{t.noKhmer}</p>
        )}
      </div>

      <ReviewActions id={note.id} onDone={onDone} />
    </article>
  );
}

function Text({ body }) {
  return (body || "").split("\n\n").map((para, i) => (
    <p className="body-copy" key={i}>
      {para}
    </p>
  ));
}
