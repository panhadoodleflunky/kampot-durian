import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import Reveal from "../../../components/Reveal.js";
import OwnerActions from "../../../components/OwnerActions.js";
import { getContributions } from "../../../lib/entries.js";

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

async function lookUp(slug) {
  const notes = await getContributions();
  return notes.find((n) => n.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const note = await lookUp(slug);
  return {
    title: `${note ? note.title : "Note not found"} — Community Notes — Kampot Durian`,
    robots: { index: false },
  };
}

export default async function CommunityNote({ params }) {
  const { slug } = await params;
  const note = await lookUp(slug);
  if (!note) notFound();

  return (
    <>
      <SiteNav current="/contributed" />

      <main id="entry">
        <article className="section">
          <div className="inner entry-layout">
            <div className="entry-main">
              <Reveal>
                <Link className="entry-back" href="/contributed">
                  All community notes
                </Link>
                <p className="sec-label">
                  <span className="sec-rule" aria-hidden="true" />
                  Community note · by {note.author}
                </p>
                <h1 className="headline-sm">{note.title}</h1>
                {note.khmerName ? (
                  <p className="entry-khmer entry-khmer-lg" lang="km">{note.khmerName}</p>
                ) : null}
                <p className="entry-status entry-status-block">
                  A reader&rsquo;s own account. Not from this orchard&rsquo;s
                  interviews, and not checked by the archive.
                </p>
                <OwnerActions
                  table="contributions"
                  basePath="/contributed"
                  id={note.id}
                  owner={note.owner}
                  slug={note.slug}
                  photoUrl={note.photoUrl}
                />
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

            <Reveal as="aside" className="entry-side" aria-label="Sources and subjects">
              <section className="entry-sources">
                <h2 className="tile-label">Sources, as the author gives them</h2>
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

      <SiteFooter />
    </>
  );
}
