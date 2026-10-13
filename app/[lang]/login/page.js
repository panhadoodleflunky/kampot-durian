import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import { pick } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import SectionLabel from "../../../components/SectionLabel.js";
import AuthForm from "../../../components/AuthForm.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.login;
  return { title: t.title, description: t.description, robots: { index: false } };
}

export default async function Login({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms;
  return (
    <>
      <SiteNav lang={lang} current="/login" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.contributors}</SectionLabel>
          <h1 className="headline-sm">{t.login.head}</h1>
          <p className="sub">{t.login.sub}</p>
        </div>
      </header>

      <main className="section" id="login">
        <div className="inner reading">
          <AuthForm />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
