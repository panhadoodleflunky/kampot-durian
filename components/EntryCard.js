import Link from "next/link";
import Reveal from "./Reveal.js";

/* Khmer block, U+1780–U+17FF. One Khmer character anywhere is enough:
   the passage is Khmer, and it needs the Khmer font and line height. No entry
   in this English edition carries any, so this returns undefined throughout —
   it is kept working for the Khmer edition. */
const KHMER = /[ក-៿]/;

function lang(text) {
  return KHMER.test(text) ? "km" : undefined;
}

/* Cards carry an opening, not the whole entry — the entry page has that. The
   first paragraph is written to stand alone, so the excerpt comes from that
   rather than from the run-on of all of them. Cutting on a word boundary
   keeps a mid-word stub off the card. */
function excerpt(text, limit) {
  const first = Array.isArray(text) ? text[0] : text;
  const body = typeof first === "string" ? first.trim() : "";
  if (body.length <= limit) return body;
  const cut = body.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/* One Field Note, in the shape entry-sketch.md defines. `variant` only
   changes how much of the entry the card shows, so a run of ten cards does
   not read as one repeated block. `showNumber` is off on the home page, where
   three cards out of eleven would carry meaningless catalogue numbers. */
export default function EntryCard({
  note,
  variant = "plain",
  showNumber = true,
  delay = 0,
}) {
  const { slug, figNumber, title, khmerName, body, sources = [], tags = [], status } = note;
  const limit = variant === "lead" ? 320 : variant === "brief" ? 110 : 200;
  const inProgress = status === "in-progress";

  return (
    <Reveal as="article" className={`entry entry-${variant}`} delay={delay}>
      {showNumber || inProgress ? (
        <div className="entry-head">
          {showNumber ? (
            <span className="entry-no" aria-hidden="true">{figNumber}</span>
          ) : null}
          {inProgress ? <span className="entry-status">In progress</span> : null}
        </div>
      ) : null}

      <h3 className="entry-title">
        <Link href={`/field-notes/${slug}`} lang={lang(title)}>
          {title}
        </Link>
      </h3>
      {/* Shown only where a Khmer name is actually documented. */}
      {khmerName ? <p className="entry-khmer" lang="km">{khmerName}</p> : null}

      <p className="entry-body">{excerpt(body, limit)}</p>

      {tags.length > 0 ? (
        <ul className="entry-tags">
          {tags.map((tag) => (
            <li key={tag} className="entry-tag">{tag}</li>
          ))}
        </ul>
      ) : null}

      <p className="entry-src">
        <span>
          {sources.length} {sources.length === 1 ? "source" : "sources"}
        </span>
        <Link className="link" href={`/field-notes/${slug}`}>
          Read the entry
        </Link>
      </p>
    </Reveal>
  );
}
