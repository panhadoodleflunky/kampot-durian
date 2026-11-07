import Link from "next/link";
import SiteNav from "../../../../../components/SiteNav.js";
import SiteFooter from "../../../../../components/SiteFooter.js";
import { pick, localize } from "../../../../../lib/i18n.js";
import { pages } from "../../../../../content/copy/pages.js";
import SectionLabel from "../../../../../components/SectionLabel.js";
import EditEntryForm from "../../../../../components/EditEntryForm.js";
import { getEntries } from "../../../../../lib/entries.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.editEntry;
  return { title: t.title, robots: { index: false } };
}

/* Built ahead for every entry, like the entry pages themselves, so the
   shell is static (without this it was rendered on every request). Nothing
   here reads the session; a new entry's edit page is built on first visit. */
export async function generateStaticParams({ params }) {
  const { lang } = await params;
  const entries = await getEntries(lang);
  return entries.map((note) => ({ slug: note.slug }));
}

/* A shell only. Who may edit is decided in the browser for the form and by
   the update policy in the database for the save — nothing here reads a
   session, so nothing here can be trusted to. */
export default async function EditEntry({ params }) {
  const { lang, slug } = await params;
  const t = pick(pages, lang).forms;

  return (
    <>
      <SiteNav lang={lang} current="/field-notes" />

      <header className="page-head">
        <div className="inner">
          {/* Back to the entry being edited: leaving without saving. */}
          <Link className="entry-back" href={localize(lang, `/field-notes/${slug}`)}>
            {t.editEntry.back}
          </Link>
          <SectionLabel no="01">{t.contributors}</SectionLabel>
          <h1 className="headline-sm">{t.editEntry.head}</h1>
        </div>
      </header>

      <main className="section" id="edit">
        <div className="inner reading">
          <EditEntryForm slug={slug} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
