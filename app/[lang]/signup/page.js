import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import { pick } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import SectionLabel from "../../../components/SectionLabel.js";
import SignupForm from "../../../components/SignupForm.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms.signup;
  return { title: t.title, description: t.description, robots: { index: false } };
}

export default async function Signup({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).forms;
  return (
    <>
      <SiteNav lang={lang} current="/signup" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.contributors}</SectionLabel>
          <h1 className="headline-sm">{t.signup.head}</h1>
          <p className="sub">{t.signup.sub}</p>
        </div>
      </header>

      <main className="section" id="signup">
        <div className="inner reading">
          <SignupForm />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
