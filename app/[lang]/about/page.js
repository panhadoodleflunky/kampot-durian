import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import SectionLabel from "../../../components/SectionLabel.js";
import Reveal from "../../../components/Reveal.js";
import Rich from "../../../components/Rich.js";
import collection from "../../../collection.config.js";
import { getEntries } from "../../../lib/entries.js";
import { pick, alternates } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import { sourcesFor } from "../../../content/sources.js";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: pick(pages, lang).about.title,
    description: sourcesFor(lang).method,
    alternates: alternates(lang, "/about"),
  };
}

export default async function About({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).about;
  const { method, cautions } = sourcesFor(lang);

  /* If Supabase doesn't answer this throws, and the last good copy is
     served — see lib/entries.js. The counting sentence is left out only
     when there is nothing to count. */
  const entries = await getEntries(lang);

  /* Derived from the data, not typed: a hand-written "five of the eleven
     entries have no photograph" went stale once already. On a page whose
     whole argument is that the gaps are stated out loud, an undercount of
     the gaps is the worst sentence on the site to leave stale. */
  const unillustrated = entries.filter((n) => !n.image).length;
  const missing = [t.missingBody, entries.length ? t.noPhoto(unillustrated, entries.length) : null, t.edition]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <SiteNav lang={lang} current="/about" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
          <p className="sub">{t.sub}</p>
        </div>
      </header>

      <main id="about">
        <section className="section">
          <div className="inner reading">
            <Reveal className="prose-row">
              <h2 className="tile-label">{t.whatThis}</h2>
              <p className="reading-body">{t.whatThisBody}</p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">{t.method}</h2>
              <p className="reading-body">{t.methodBody(method)}</p>
              <p className="reading-body">{t.narrow}</p>
              <p className="reading-body">{t.travels}</p>
              <ul className="body-copy">
                {cautions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="reading-body">
                <Rich parts={t.record} lang={lang} />
              </p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">{t.missing}</h2>
              <p className="reading-body">{missing}</p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">{t.course}</h2>
              <p className="reading-body">{t.courseBody}</p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">{t.why}</h2>
              <p className="reading-body">{t.why1}</p>
              <p className="reading-body">{t.why2}</p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner">
            <Reveal>
              <SectionLabel no="02">{t.details}</SectionLabel>
            </Reveal>
            {/* One line of serif that carries the fact, and a note underneath
                for the qualification. */}
            <Reveal className="specs">
              {t.specs(collection.province, method).map((s) => (
                <div className="spec" key={s.h}>
                  <h3>{s.h}</h3>
                  <p className="spec-value">{s.v}</p>
                  <p className="body-copy">{s.p}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
