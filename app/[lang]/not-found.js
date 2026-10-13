import Link from "next/link";
import { headers } from "next/headers";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import { pick, localize, isLang } from "../../lib/i18n.js";
import { ui } from "../../content/copy/ui.js";
import { pages } from "../../content/copy/pages.js";

/* Next does not hand a not-found page its route params, so the edition
   comes from the `x-lang` header middleware.js sets on every request.

   Known cost of the [lang] root layout: Next cannot server-render a 404
   under a root layout with a dynamic segment, so this page arrives as a
   404 status with an empty body and is drawn by the browser. Every other
   page is still fully server-rendered. (Tried and dropped: a route group
   with its own layout under [lang]; it made no difference.) */
async function edition() {
  const lang = (await headers()).get("x-lang");
  return isLang(lang) ? lang : "en";
}

export async function generateMetadata() {
  return { title: pick(pages, await edition()).notFoundTitle };
}

export default async function NotFound() {
  const lang = await edition();
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
