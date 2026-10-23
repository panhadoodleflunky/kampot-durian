import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import { pick } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import SectionLabel from "../../../components/SectionLabel.js";
import ReviewQueue from "../../../components/ReviewQueue.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: pick(pages, lang).forms.review.title, robots: { index: false } };
}

/* The review queue (Sprint 3, week 11). A static shell: the queue is read in
   the browser with the reviewer's own session. Who may see pending notes
   and who may publish is decided by the database (the select policy and
   review_entry), not by this page. */
export default async function Review({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.review;
  return (
    <>
      <SiteNav lang={lang} current="/review" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
        </div>
      </header>

      <main className="section" id="review">
        <div className="inner reading">
          <ReviewQueue />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
