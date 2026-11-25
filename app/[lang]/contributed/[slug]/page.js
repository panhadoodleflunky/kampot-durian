import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../../../components/SiteNav.js";
import SiteFooter from "../../../../components/SiteFooter.js";
import Reveal from "../../../../components/Reveal.js";
import OwnerActions from "../../../../components/OwnerActions.js";
import TakeDown from "../../../../components/TakeDown.js";
import { getContributions } from "../../../../lib/entries.js";
import { pick, localize } from "../../../../lib/i18n.js";
import { ui } from "../../../../content/copy/ui.js";
import { pages } from "../../../../content/copy/pages.js";

/* One community note. Built the first time someone asks for it and rebuilt
   at most once a minute, like a field note. Deliberately plainer than a
   field note page — no catalogue number, no "next" — and labelled at the
   top as a reader's own account, so it can't be mistaken for the orchard's. */
export const revalidate = 60;

/* None built ahead: an empty list tells Next to build each note on its
   first visit and cache it, instead of rendering it on every request. */
export async function generateStaticParams() {
  return [];
}

async function lookUp(slug, lang) {
  const notes = await getContributions(lang);
  return notes.find((n) => n.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const note = await lookUp(slug, lang);
  return {
    title: pick(pages, lang).contributed.noteTitle(note ? note.title : pick(ui, lang).community.notFoundTitle),
    robots: { index: false },
  };
}

export default async function CommunityNote({ params }) {
  const { slug, lang } = await params;
  const t = pick(ui, lang).community;
  const note = await lookUp(slug, lang);
  if (!note) notFound();

  return (
    <>
      <SiteNav lang={lang} current="/contributed" />

      <main id="entry">
        <article className="section">
          <div className="inner entry-layout">
            <div className="entry-main">
              <Reveal>
                <Link className="entry-back" href={localize(lang, "/contributed")}>
                  {t.back}
                </Link>
                <p className="sec-label">
                  <span className="sec-rule" aria-hidden="true" />
                  {t.label(note.author)}
                </p>
                <h1 className="headline-sm">{note.title}</h1>
                {note.khmerName ? (
                  <p className="entry-khmer entry-khmer-lg" lang="km">{note.khmerName}</p>
                ) : null}
                <p className="entry-status entry-status-block">{t.disclaimer}</p>
                <OwnerActions
                  table="contributions"
                  basePath="/contributed"
                  id={note.id}
                  owner={note.owner}
                  slug={note.slug}
                  photoUrl={note.photoUrl}
                  title={note.title}
                />
                <TakeDown id={note.id} title={note.title} />
              </Reveal>

              {note.image ? (
                <Reveal as="figure" className="entry-figure">
                  <Image
                    src={note.image.src}
                    alt={note.image.alt}
                    width={note.image.width}
                    height={note.image.height}
                    sizes="(max-width: 780px) 100vw, 720px"
                  />
                </Reveal>
              ) : null}

              <Reveal>
                {note.body.map((para, i) => (
                  <p className="reading-body" key={i}>
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>

            <Reveal as="aside" className="entry-side" aria-label={pick(ui, lang).entry.aside}>
              <section className="entry-sources">
                <h2 className="tile-label">{t.sources}</h2>
                <ul>
                  {note.sources.map((source) => (
                    <li key={source.text}>{source.text}</li>
                  ))}
                </ul>
              </section>
              {note.tags.length > 0 ? (
                <ul className="entry-tags">
                  {note.tags.map((tag) => (
                    <li key={tag} className="entry-tag">{tag}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </div>
        </article>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
