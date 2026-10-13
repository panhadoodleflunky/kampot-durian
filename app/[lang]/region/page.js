import Image from "next/image";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import SectionLabel from "../../../components/SectionLabel.js";
import Reveal from "../../../components/Reveal.js";
import Rich from "../../../components/Rich.js";
import { pick, alternates } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).region;
  return { title: t.title, description: t.description, alternates: alternates(lang, "/region") };
}

/* The orchard, counted (content/copy/pages.js). An earlier version carried
   provincial figures here, taken from a government series reported in the
   press; they went when the site moved to interview-only sourcing. No figure
   appears on this page that did not come out of the interviews. */
export default async function Region({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).region;

  return (
    <>
      <SiteNav lang={lang} current="/region" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">{t.label}</SectionLabel>
          <h1 className="headline-sm">{t.head}</h1>
          <p className="sub">{t.sub}</p>
        </div>
      </header>

      <main id="region">
        <section className="band">
          {/* This page opens on the band, so here the same photograph is the
              priority one. */}
          <Image
            src="/teuk-chou-scenic.jpg"
            alt={t.bandAlt}
            width={1946}
            height={1186}
            sizes="100vw"
            priority
          />
          <div className="band-copy">
            <Reveal>
              <SectionLabel no="02">{t.setting}</SectionLabel>
              <h2 className="headline-sm">
                {t.settingHead[0]}
                <br />
                {t.settingHead[1]}
              </h2>
              <p className="sub">{t.settingSub}</p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner">
            <Reveal>
              <SectionLabel no="03">{t.scale}</SectionLabel>
              <h2 className="headline-sm">{t.scaleHead}</h2>
            </Reveal>
            <Reveal className="specs">
              {t.figures.map((f) => (
                <div className="spec" key={f.v}>
                  <h3>{f.h}</h3>
                  <p className="stat-num stat-sm">{f.v}</p>
                  <p className="body-copy">{f.p}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner reading">
            <Reveal className="prose-row">
              <SectionLabel no="04">{t.pressure}</SectionLabel>
              <h2 className="headline-sm">{t.pressureHead}</h2>
              <p className="reading-body">{t.pressure1}</p>
              <p className="reading-body">
                <Rich parts={t.pressure2} lang={lang} />
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
