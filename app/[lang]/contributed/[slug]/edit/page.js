import Link from "next/link";
import SiteNav from "../../../../../components/SiteNav.js";
import SiteFooter from "../../../../../components/SiteFooter.js";
import { pick, localize } from "../../../../../lib/i18n.js";
import { ui } from "../../../../../content/copy/ui.js";
import { pages } from "../../../../../content/copy/pages.js";
import SectionLabel from "../../../../../components/SectionLabel.js";
import EditEntryForm from "../../../../../components/EditEntryForm.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.editNote;
  return { title: t.title, robots: { index: false } };
}

/* None built ahead, and nothing here reads the session: each edit page is
   built on its first visit and served static after, like every other page
   (without this it was rendered on every request). */
export async function generateStaticParams() {
  return [];
}

/* A shell, like the field-note edit page: the contributions update policy
   decides who may save. */
export default async function EditCommunityNote({ params }) {
  const { lang, slug } = await params;
  const t = pick(pages, lang).forms;

  return (
    <>
      <SiteNav lang={lang} current="/contributed" />

      <header className="page-head">
        <div className="inner">
          {/* Back to My notes, not to the note: a note waiting for review or
              sent back has no public page, and My notes always exists. */}
          <Link className="entry-back" href={localize(lang, "/my-entries")}>
            {pick(ui, lang).auth.myNotes}
          </Link>
          <SectionLabel no="01">{t.editNote.label}</SectionLabel>
          <h1 className="headline-sm">{t.editNote.head}</h1>
        </div>
      </header>

      <main className="section" id="edit">
        <div className="inner reading">
          <EditEntryForm table="contributions" basePath="/contributed" slug={slug} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
