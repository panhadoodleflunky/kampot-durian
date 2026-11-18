import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import SectionLabel from "../../../components/SectionLabel.js";
import Reveal from "../../../components/Reveal.js";
import { pick, alternates } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import { sourcesFor } from "../../../content/sources.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).sources;
  return { title: t.title, description: t.description, alternates: alternates(lang, "/sources") };
}

export default async function Sources({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).sources;
  const { sourceGroups, photoCredits, cautions, method } = sourcesFor(lang);

  return (
    <>
      <SiteNav lang={lang} current="/sources" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
          <p className="sub">{method}</p>
        </div>
      </header>

      <main id="sources">
        {sourceGroups.map((group, i) => (
          <section className="section" key={group.heading}>
            <div className="inner reading">
              <Reveal className="prose-row">
                <SectionLabel no={String(i + 2).padStart(2, "0")}>
                  {group.heading}
                </SectionLabel>
                <ul className="biblio">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span className="biblio-name">
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </span>
                      <span className="biblio-note">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}

        <section className="section">
          <div className="inner reading">
            <Reveal className="prose-row">
              <SectionLabel no={String(sourceGroups.length + 2).padStart(2, "0")}>
                {t.photography}
              </SectionLabel>
              <ul className="biblio">
                {photoCredits.map((credit) => (
                  <li key={credit.file}>
                    <span className="biblio-name">{credit.caption}</span>
                    <span className="biblio-note">
                      {credit.generated
                        ? t.generated
                        : `${t.photoBy} ${credit.author}${credit.family ? t.family : credit.kampot === false ? t.end : t.kampot}${credit.enhanced ? t.enhanced : ""}`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="body-copy note-foot">{t.noStock}</p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner reading">
            <Reveal className="prose-row">
              <SectionLabel no={String(sourceGroups.length + 3).padStart(2, "0")}>
                {t.travels}
              </SectionLabel>
              <p className="body-copy">{t.travelsIntro}</p>
              <ul className="biblio">
                {cautions.map((c) => (
                  <li key={c}>
                    <span className="biblio-note">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
