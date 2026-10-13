import Link from "next/link";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import SectionLabel from "../../../components/SectionLabel.js";
import EntryCard from "../../../components/EntryCard.js";
import { getContributions } from "../../../lib/entries.js";
import Rich from "../../../components/Rich.js";
import { pick, localize, alternates } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";

/* Static, rebuilt in the background at most once a minute — see lib/entries.js. */
export const revalidate = 60;

/* Kept out of search engines until Sprint 3 adds review: nothing here has
   been checked by anyone but its author. */
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).contributed;
  return { title: t.title, description: t.description, robots: { index: false }, alternates: alternates(lang, "/contributed") };
}

export default async function CommunityIndex({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).contributed;
  const notes = await getContributions(lang);

  return (
    <>
      <SiteNav lang={lang} current="/contributed" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
          <p className="sub">
            <Rich parts={t.sub} lang={lang} />
          </p>
        </div>
      </header>

      <main id="notes">
        <section className="section">
          <div className="inner">
            {notes.length === 0 ? (
              <div className="prompt-card">
                <p className="body-copy">{t.empty}</p>
                <div className="auth-actions">
                  <Link className="btn" href={localize(lang, "/contribute")}>{t.add}</Link>
                </div>
              </div>
            ) : (
              <div className="entry-list">
                {notes.map((note) => (
                  <EntryCard key={note.slug} lang={lang} note={note} basePath="/contributed" showNumber={false} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
