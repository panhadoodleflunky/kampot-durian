import SiteNav from "../../../../../components/SiteNav.js";
import SiteFooter from "../../../../../components/SiteFooter.js";
import { pick } from "../../../../../lib/i18n.js";
import { pages } from "../../../../../content/copy/pages.js";
import SectionLabel from "../../../../../components/SectionLabel.js";
import EditEntryForm from "../../../../../components/EditEntryForm.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.editEntry;
  return { title: t.title, robots: { index: false } };
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
          <SectionLabel no="01">{t.contributors}</SectionLabel>
          <h1 className="headline-sm">{t.editEntry.head}</h1>
          {/* The Khmer edition's rows are edited as English; their *_km
              translation is a separate column the form does not touch. */}
          {t.editEntry.note ? <p className="sub">{t.editEntry.note}</p> : null}
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
