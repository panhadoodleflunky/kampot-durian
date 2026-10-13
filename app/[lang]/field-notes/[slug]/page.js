import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../../../components/SiteNav.js";
import SiteFooter from "../../../../components/SiteFooter.js";
import Reveal from "../../../../components/Reveal.js";
import OwnerActions from "../../../../components/OwnerActions.js";
import { getEntries } from "../../../../lib/entries.js";
import Rich from "../../../../components/Rich.js";
import { pick, localize, alternates } from "../../../../lib/i18n.js";
import { ui } from "../../../../content/copy/ui.js";
import { pages } from "../../../../content/copy/pages.js";

/* Entries live in Supabase. Every entry that exists at build time is built
   as a static page, and rebuilt in the background at most once a minute, so
   an edited row shows its new text. A row added later is built the first
   time someone asks for it (dynamicParams stays on), so it never 404s.

   The next entry is the following one in catalogue order, wrapping at the
   end so the last entry still offers somewhere to go. */
export const revalidate = 60;

export async function generateStaticParams({ params }) {
  const { lang } = await params;
  const entries = await getEntries(lang);
  return entries.map((note) => ({ slug: note.slug }));
}

async function lookUp(slug, lang) {
  const entries = await getEntries(lang);
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
  const { slug, lang } = await params;
  const { note } = await lookUp(slug, lang);
  const suffix = pick(pages, lang).titleSuffix;
  if (!note) return { title: `${pick(ui, lang).entry.notFoundTitle}${suffix}` };
  return {
    title: `${note.title}${suffix}`,
    description: summarise(bodyText(note)),
    alternates: alternates(lang, `/field-notes/${slug}`),
  };
}

export default async function FieldNote({ params }) {
  const { slug, lang } = await params;
  const t = pick(ui, lang).entry;
  const go = (path) => localize(lang, path);
  /* If Supabase doesn't answer, lookUp throws: the last good copy of this
     entry is served, never a 404 for an entry that exists. */
  const { note, next } = await lookUp(slug, lang);
  if (!note) notFound();

  return (
    <>
      <SiteNav lang={lang} current="/field-notes" />

      <main id="entry">
        <article className="section">
          {/* Two columns: the entry itself, and a rail carrying its
              apparatus — sources, the pointer to the full record, the
              subject pills. The rail is what keeps the right side of the
              page from standing empty beside a 720px text column. */}
          <div className="inner entry-layout">
            <div className="entry-main">
              <Reveal>
                <Link className="entry-back" href={go("/field-notes")}>
                  {t.back}
                </Link>
                <p className="sec-label">
                  <span className="sec-no">{note.figNumber}</span>
                  <span className="sec-rule" aria-hidden="true" />
                  {t.label}
                </p>
                <h1 className="headline-sm">{note.title}</h1>
                {note.khmerName ? (
                  <p className="entry-khmer entry-khmer-lg" lang="km">{note.khmerName}</p>
                ) : null}
                <OwnerActions
                  id={note.id}
                  owner={note.owner}
                  slug={note.slug}
                  photoUrl={note.photoUrl}
                />
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
                  {/* Contributed photos carry no caption. */}
                  {note.image.caption ? <figcaption>{note.image.caption}</figcaption> : null}
                </Reveal>
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

            <Reveal as="aside" className="entry-side" aria-label={t.aside}>
              <section className="entry-sources">
                <h2 className="tile-label">{t.sources}</h2>
                <ul>
                  {note.sources.map((source) => (
                    <li key={source.text}>{source.text}</li>
                  ))}
                </ul>
              </section>
              <p className="entry-sources-note">
                <Rich parts={t.sourcesNote} lang={lang} />
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
              <Link href={go(`/field-notes/${next.slug}`)}>
                <span className="tile-label">{t.next}</span>
                <span className="entry-next-title">{next.title}</span>
              </Link>
              <Link className="link" href={go("/field-notes")}>{t.back}</Link>
            </Reveal>
          </div>
        </article>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
