import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import { pick } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import SectionLabel from "../../../components/SectionLabel.js";
import ContributeForm from "../../../components/ContributeForm.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.contribute;
  return { title: t.title, description: t.description, robots: { index: false } };
}

export default async function Contribute({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms;
  return (
    <>
      <SiteNav lang={lang} current="/contribute" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.contributors}</SectionLabel>
          <h1 className="headline-sm">{t.contribute.head}</h1>
          <p className="sub">{t.contribute.sub}</p>
        </div>
      </header>

      <main className="section" id="contribute">
        <div className="inner reading">
          <ContributeForm />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
