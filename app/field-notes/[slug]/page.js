import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import Reveal from "../../../components/Reveal.js";
import ImageSlot from "../../../components/ImageSlot.js";
import ArchiveDown from "../../../components/ArchiveDown.js";
import { getEntries } from "../../../lib/entries.js";
import { getNote as getDraftNote } from "../../../content/field-notes.js";

/* Entries live in Supabase now, so an entry page renders per request rather
   than from a list fixed at build time: a row added in the SQL Editor has a
   page the moment it is in the index, and an edited row shows its new text.

   The next entry is the following one in catalogue order, wrapping at the
   end so the last entry still offers somewhere to go. */
async function lookUp(slug) {
  const entries = await getEntries();
  if (!entries) return { down: true };
  const i = entries.findIndex((n) => n.slug === slug);
  if (i === -1) return {};
  return { note: entries[i], next: entries[(i + 1) % entries.length] };
}

/* Paragraphs joined on a space, so a phrase over a break still reads. */
function bodyText(note) {
  return note.body.join(" ");
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
  const { note, down } = await lookUp(slug);
  if (down) return { title: "Field Notes — Kampot Durian" };
  if (!note) return { title: "Entry not found — Kampot Durian" };
  return {
    title: `${note.title} — Kampot Durian`,
    description: summarise(bodyText(note)),
  };
}

export default async function FieldNote({ params }) {
  const { slug } = await params;
  const { note, next, down } = await lookUp(slug);

  /* Supabase didn't answer: say so, rather than a 404 for an entry that
     exists. */
  if (down) {
    return (
      <>
        <SiteNav current="/field-notes" />
        <main id="entry" className="section">
          <div className="inner reading">
            <ArchiveDown />
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }
  if (!note) notFound();

  /* The photograph brief is a development aid that never went into the
     table (ImageSlot renders under `next dev` only), so it is still read from
     content/field-notes.js while that file exists. */
  const wanted = note.image ? null : getDraftNote(slug)?.imageWanted;

  return (
    <>
      <SiteNav current="/field-notes" />

      <main id="entry">
        <article className="section">
          {/* Two columns: the entry itself, and a rail carrying its
              apparatus — sources, the pointer to the full record, the
              subject pills. The rail is what keeps the right side of the
              page from standing empty beside a 720px text column. */}
          <div className="inner entry-layout">
            <div className="entry-main">
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
                  {/* The entry photograph sits in the 720px reading column,
                      so that is the widest file it ever needs. */}
                  <Image
                    src={note.image.src}
                    alt={note.image.alt}
                    width={note.image.width}
                    height={note.image.height}
                    sizes="(max-width: 780px) 100vw, 720px"
                  />
                  <figcaption>{note.image.caption}</figcaption>
                </Reveal>
              ) : wanted ? (
                /* Renders under `next dev` only — see components/ImageSlot.js. */
                <ImageSlot
                  figNumber={note.figNumber}
                  title={note.title}
                  brief={wanted}
                />
              ) : null}

              <Reveal>
                {/* Keyed by position: paragraphs are never reordered, and two
                    that open the same way would collide on a text key. */}
                {note.body.map((para, i) => (
                  <p className="reading-body" key={i}>
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>

            <Reveal as="aside" className="entry-side" aria-label="Sources and subjects">
              <section className="entry-sources">
                <h2 className="tile-label">Sources</h2>
                <ul>
                  {note.sources.map((source) => (
                    <li key={source.text}>{source.text}</li>
                  ))}
                </ul>
              </section>
              <p className="entry-sources-note">
                What the interview covered is set out on{" "}
                <Link href="/sources">Sources &amp; Credits</Link>.
              </p>
              {(note.tags || []).length > 0 ? (
                <ul className="entry-tags">
                  {note.tags.map((tag) => (
                    <li key={tag} className="entry-tag">{tag}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>

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
