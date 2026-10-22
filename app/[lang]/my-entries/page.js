import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import { pick } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import SectionLabel from "../../../components/SectionLabel.js";
import MyEntries from "../../../components/MyEntries.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: pick(pages, lang).forms.mine.title, robots: { index: false } };
}

/* A shell, like /account: the list is read in the browser, with the
   reader's own session, so the page itself stays static. The select policy
   is what keeps it to their own notes (and the published ones). */
export default async function MyNotes({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.mine;
  return (
    <>
      <SiteNav lang={lang} current="/my-entries" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
        </div>
      </header>

      <main className="section" id="my-notes">
        <div className="inner reading">
          <MyEntries />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
