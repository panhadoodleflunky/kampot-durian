import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import Reveal from "../../../components/Reveal.js";
import fieldNotes, { getNote, getNextNote, bodyText } from "../../../content/field-notes.js";

/* Every entry is known at build time, so every entry page is static. */
export function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

/* Search engines cut a description near 155 characters; cutting it ourselves
   on a word boundary keeps a mid-word stub out of the result snippet. */
function summarise(body, limit = 155) {
  if (body.length <= limit) return body;
  const cut = body.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Entry not found — Kampot Durian" };
  return {
    title: `${note.title} — Kampot Durian`,
    description: summarise(bodyText(note)),
  };
}

export default async function FieldNote({ params }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const next = getNextNote(slug);

  return (
    <>
      <a className="skip" href="#entry">Skip to the entry</a>
      <SiteNav current="/field-notes" />

      <main id="entry">
        <article className="section">
          <div className="inner reading">
            <Reveal>
              <Link className="entry-back" href="/field-notes">
                All field notes
              </Link>
              <p className="sec-label">
                <span className="sec-no">{note.figNumber}</span>
                <span className="sec-rule" aria-hidden="true" />
                Field note
              </p>
              <h1 className="headline-sm">{note.title}</h1>
              {note.khmerName ? (
                <p className="entry-khmer entry-khmer-lg" lang="km">{note.khmerName}</p>
              ) : null}
              {note.status === "in-progress" ? (
                <p className="entry-status entry-status-block">
                  In progress — the material behind this entry is thin.
                </p>
              ) : null}
            </Reveal>

            {note.image ? (
              <Reveal as="figure" className="entry-figure">
                <img
                  src={note.image.src}
                  alt={note.image.alt}
                  width={note.image.width}
                  height={note.image.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{note.image.caption}</figcaption>
              </Reveal>
            ) : null}

            <Reveal>
              {(Array.isArray(note.body) ? note.body : [note.body]).map((para) => (
                <p className="reading-body" key={para.slice(0, 48)}>
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal>
              <section className="entry-sources">
                <h2 className="tile-label">Sources</h2>
                <ul>
                  {note.sources.map((source) => (
                    <li key={source.text}>{source.text}</li>
                  ))}
                </ul>
              </section>
              <p className="entry-sources-note">
                What each sitting covered is set out on{" "}
                <Link href="/sources">Sources &amp; Credits</Link>.
              </p>
            </Reveal>

            {(note.tags || []).length > 0 ? (
              <ul className="entry-tags">
                {note.tags.map((tag) => (
                  <li key={tag} className="entry-tag">{tag}</li>
                ))}
              </ul>
            ) : null}

            <Reveal className="entry-next">
              <Link href={`/field-notes/${next.slug}`}>
                <span className="tile-label">Next</span>
                <span className="entry-next-title">{next.title}</span>
              </Link>
              <Link className="link" href="/field-notes">All field notes</Link>
            </Reveal>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
