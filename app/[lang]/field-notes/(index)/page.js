import SiteNav from "../../../../components/SiteNav.js";
import SiteFooter from "../../../../components/SiteFooter.js";
import SectionLabel from "../../../../components/SectionLabel.js";
import EntrySearch from "../../../../components/EntrySearch.js";
import Reveal from "../../../../components/Reveal.js";
import Rich from "../../../../components/Rich.js";
import { getEntries } from "../../../../lib/entries.js";
import { pick, alternates } from "../../../../lib/i18n.js";
import { pages } from "../../../../content/copy/pages.js";

/* Static, rebuilt in the background at most once a minute — see lib/entries.js. */
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).fieldNotes;
  return { title: t.title, description: t.description, alternates: alternates(lang, "/field-notes") };
}

export default async function FieldNotesIndex({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).fieldNotes;
  /* `EntrySearch` is a client component, so whatever is handed to it is
     serialised into this page's payload and shipped. If Supabase doesn't
     answer this throws, and the last good copy is served instead — see
     lib/entries.js. */
  const notes = await getEntries(lang);

  return (
    <>
      <SiteNav lang={lang} current="/field-notes" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head(notes.length)}</h1>
        </div>
      </header>

      <main id="notes">
        <section className="section">
          <div className="inner">
            {/* Client component: it owns the query state and the
                filtering. The data comes from Supabase — the page reads
                it and hands it down, so nothing about an entry is
                hardcoded here. */}
            <EntrySearch notes={notes} />
            <Reveal>
              <p className="body-copy note-foot">
                <Rich parts={t.foot} lang={lang} />
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
