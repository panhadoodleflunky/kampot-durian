import Link from "next/link";
import Reveal from "./Reveal.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* Khmer block, U+1780–U+17FF. One Khmer character anywhere is enough:
   the passage is Khmer, and it needs the Khmer font and line height. In the
   English edition this marks a Khmer title (Fig. 12's name, a reader's
   note); in the Khmer edition, nearly everything. */
const KHMER = /[ក-៿]/;

function langOf(text) {
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
  /* No space in the cut (Khmer is written without them) — keep the cut
     whole rather than drop its last letter. */
  const space = cut.lastIndexOf(" ");
  return `${space > 0 ? cut.slice(0, space) : cut}…`;
}

/* One Field Note, in the shape entry-sketch.md defines. `variant` only
   changes how much of the entry the card shows, so a run of ten cards does
   not read as one repeated block. `showNumber` is off on the home page, where
   three cards out of eleven would carry meaningless catalogue numbers.
   A community note (Lab 7) passes basePath="/contributed" and carries an
   `author` instead of a number. */
export default function EntryCard({
  note,
  lang = "en",
  variant = "plain",
  showNumber = true,
  basePath = "/field-notes",
  delay = 0,
}) {
  const { slug, figNumber, title, khmerName, body, sources = [], tags = [], author } = note;
  const t = pick(ui, lang).card;
  const href = localize(lang, `${basePath}/${slug}`);
  const limit = variant === "lead" ? 320 : variant === "brief" ? 110 : 200;

  return (
    <Reveal as="article" className={`entry entry-${variant}`} delay={delay}>
      {showNumber || author ? (
        <div className="entry-head">
          {showNumber ? (
            <span className="entry-no" aria-hidden="true">{figNumber}</span>
          ) : null}
          {author ? <span className="entry-status">{t.by(author)}</span> : null}
        </div>
      ) : null}

      <h3 className="entry-title">
        <Link href={href} lang={langOf(title)}>
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
          {t.sources(sources.length)}
        </span>
        <Link className="link" href={href}>
          {t.read}
        </Link>
      </p>
    </Reveal>
  );
}
