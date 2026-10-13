import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import LangOnly from "../../components/LangOnly.js";
import { LANGS, pick, localize } from "../../lib/i18n.js";
import { ui } from "../../content/copy/ui.js";

/* Next hands a not-found page no route params, and anything request-bound
   here (headers(), cookies()) would make every page dynamic, because Next
   renders this component into each page's tree in advance. So both
   editions are rendered and LangOnly shows the one the address is in.

   Known cost of the [lang] root layout: a 404 for an address no page
   answers arrives with an empty body and is drawn by the browser (status
   still 404). Every other page is fully server-rendered. */
function NotFoundIn({ lang }) {
  const t = pick(ui, lang).notFound;
  return (
    <>
      <SiteNav lang={lang} />
      <main className="nf">
        <div className="inner reading">
          <SectionLabel no="404">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
          <p className="reading-body">{t.body}</p>
          <p className="cta-row">
            <Link className="btn" href={localize(lang, "/field-notes")}>{t.all}</Link>
            <Link className="link" href={localize(lang, "/")}>{t.back}</Link>
          </p>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}

export default function NotFound() {
  return LANGS.map((lang) => (
    <LangOnly key={lang} lang={lang}>
      <NotFoundIn lang={lang} />
    </LangOnly>
  ));
}
