import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import Reveal from "../../components/Reveal.js";
import { sourceGroups, photoCredits, cautions, method } from "../../content/sources.js";

export const metadata = {
  title: "Sources & Credits — Kampot Durian",
  description:
    "The grower interviews, methodological cautions and photograph credits behind this field guide.",
};

export default function Sources() {
  return (
    <>
      <SiteNav current="/sources" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Sources &amp; Credits</SectionLabel>
          <h1 className="headline-sm">Where it came from.</h1>
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
              <SectionLabel
                no={String(sourceGroups.length + 2).padStart(2, "0")}
              >
                Photography
              </SectionLabel>
              <ul className="biblio">
                {photoCredits.map((credit) => (
                  <li key={credit.file}>
                    <span className="biblio-name">{credit.caption}</span>
                    <span className="biblio-note">
                      Photograph by {credit.author}, taken in Kampot.
                    </span>
                  </li>
                ))}
              </ul>
              <p className="body-copy note-foot">
                No stock, no licensed image, nothing borrowed. Corrections
                are welcome — reach the compiler through the course.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner reading">
            <Reveal className="prose-row">
              <SectionLabel
                no={String(sourceGroups.length + 3).padStart(2, "0")}
              >
                What travels with all of it
              </SectionLabel>
              <p className="body-copy">
                Four things travel with every figure in this guide.
              </p>
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

      <SiteFooter />
    </>
  );
}
