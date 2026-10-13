import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import { pick } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import SectionLabel from "../../../components/SectionLabel.js";
import AccountPanel from "../../../components/AccountPanel.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.account;
  return { title: t.title, robots: { index: false } };
}

export default async function Account({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms;
  return (
    <>
      <SiteNav lang={lang} current="/account" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.contributors}</SectionLabel>
          <h1 className="headline-sm">{t.account.head}</h1>
        </div>
      </header>

      <main className="section" id="account">
        <div className="inner reading">
          <AccountPanel />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
