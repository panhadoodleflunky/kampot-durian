import Image from "next/image";
import Link from "next/link";
import collection from "../../../collection.config.js";
import { getEntries } from "../../../lib/entries.js";
import EntryCard from "../../../components/EntryCard.js";
import Reveal from "../../../components/Reveal.js";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import SectionLabel from "../../../components/SectionLabel.js";
import Rich from "../../../components/Rich.js";
import { pick, localize, alternates } from "../../../lib/i18n.js";
import { pages } from "../../../content/copy/pages.js";
import { ui } from "../../../content/copy/ui.js";

/* Static, rebuilt in the background at most once a minute — see lib/entries.js. */
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { alternates: alternates(lang, "/") };
}

/* Frontispiece facts — the guide's own catalogue header. */
function masthead(t, place) {
  return [
    { k: t.masthead.compiledBy, v: collection.curator },
    { k: t.masthead.province, v: place },
    { k: t.masthead.method, v: t.masthead.interview },
  ];
}

/* Three entries that between them cover the whole guide: a native variety,
   the market problem, and the climate thread. Looked up against whatever
   Supabase returns; a slug that is no longer there (renamed, say) gives its
   place to the next entry in the catalogue, so the section never shrinks
   while the archive itself is fine. */
const FEATURED_SLUGS = ["ov-khak", "a-name-worth-protecting", "when-the-rain-doesnt-come"];

function pickFeatured(entries) {
  const picked = FEATURED_SLUGS.map((slug) =>
    entries.find((note) => note.slug === slug),
  ).filter(Boolean);
  const rest = entries.filter((note) => !picked.includes(note));
  return [...picked, ...rest].slice(0, FEATURED_SLUGS.length);
}

/* Drawn from the Sadong Kit entry — the line the guide's honesty rests on.
   It is the guide's own sentence, not anyone's quoted words.

   The space after the comma is non-breaking. Set centred at up to 82px, the
   line wrapped straight after "years," and left the comma hanging at the end
   of a line, where it read as missing punctuation rather than as a pause.
   Tying "years," to "nobody" means the wrap cannot fall there at any width. */
const PULL_QUOTE_HREF = "/field-notes/sadong-kit";

export default async function Home({ params }) {
  const { lang } = await params;
  const t = pick(pages, lang).home;
  const site = pick(pages, lang).site;
  const go = (path) => localize(lang, path);
  /* If Supabase doesn't answer this throws, and the last good copy of the
     page is served instead — see lib/entries.js. */
  const entries = await getEntries(lang);
  const featured = pickFeatured(entries);

  return (
    <>
      <SiteNav lang={lang} current="/" />

      <header className="hero">
        <div className="inner hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="pulse" />
              {t.eyebrow}
            </p>
            <h1 className="headline">
              {t.headline}
              <em>{t.headlineEm}</em>
            </h1>
            <div className="hero-rule" aria-hidden="true" />
            <p className="sub">{site.description}</p>

            <div className="cta-row">
              <Link className="btn" href={go("/field-notes")}>{t.read}</Link>
              <Link className="link" href={go("/region")}>{t.seeRegion}</Link>
            </div>
          </div>

          <figure className="hero-figure">
            {/* The one photograph a reader sees before they scroll, so it is
                the one that gets `priority`. `sizes` is what stops the phone
                downloading the 1536px file: the figure fills the width below
                the 900px breakpoint and sits in roughly half the grid above
                it. `quality={50}` because a phone with a sharp screen still
                asks for the 1200px file, and that is 478 kB at the default
                75 and 194 kB at 50 — compared side by side at full size, the
                leaves and thorns look the same. */}
            <Image
              src="/tree-in-fruit.jpg"
              alt={t.heroAlt}
              width={1536}
              height={2048}
              sizes="(max-width: 900px) 100vw, 46vw"
              quality={50}
              priority
            />
            <figcaption>
              <span className="hero-cap-no">{t.heroCapNo}</span>
              {t.heroCap}
            </figcaption>
          </figure>
        </div>

        <div className="inner">
          <dl className="masthead">
            {masthead(t, pick(ui, lang).footer.place(collection.province)).map((m) => (
              <div className="mast-item" key={m.k}>
                <dt>{m.k}</dt>
                <dd>{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main>
        <section className="section" id="overview">
          <div className="inner">
            <Reveal>
              <SectionLabel no="01">{t.guide}</SectionLabel>
            </Reveal>
            <div className="bento">
              <Reveal as="article" className="tile">
                <p className="tile-label">{t.entriesCompiled}</p>
                <p className="stat-num">{entries.length}</p>
              </Reveal>
              <Reveal as="article" className="tile" delay={90}>
                <p className="tile-label">{t.varietiesRecorded}</p>
                <p className="tile-value">{t.varieties}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="entries">
          <div className="inner">
            <Reveal>
              <div className="section-head">
                <div>
                  <SectionLabel no="02">{t.selected}</SectionLabel>
                  <h2 className="headline-sm">
                    {entries.length ? t.selectedHead(featured.length, entries.length) : t.noneYet}
                  </h2>
                </div>
                <Link className="link section-count" href={go("/field-notes")}>
                  {t.readAll(entries.length)}
                </Link>
              </div>
            </Reveal>
            {/* The section head already carries the "Read all" link — a
                second one under the cards said the same thing twice on one
                screen. */}
            <div className="entry-list">
              {featured.map((note, i) => (
                <EntryCard
                  key={note.slug}
                  lang={lang}
                  note={note}
                  variant={i === 0 ? "lead" : "plain"}
                  showNumber={false}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="region">
          {/* Full-bleed behind the band's type, so it is asked for at the
              viewport's own width and left to load lazily — it is three
              sections down the page. */}
          <Image
            src="/teuk-chou-scenic.jpg"
            alt={t.bandAlt}
            width={1946}
            height={1186}
            sizes="100vw"
          />
          <div className="band-copy">
            <Reveal>
              <SectionLabel no="03">{t.region}</SectionLabel>
              <h2 className="headline-sm">
                {t.regionHead[0]}
                <br />
                {t.regionHead[1]}
              </h2>
              <p className="sub">{t.regionSub}</p>
              <p className="cta-row">
                <Link className="link" href={go("/region")}>{t.readRegion}</Link>
              </p>
            </Reveal>
          </div>
        </section>

        <section className="quote-section">
          <Reveal className="inner">
            <figure className="pull">
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <Link href={go(PULL_QUOTE_HREF)}>{t.quoteBy}</Link>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <section className="section" id="method">
          <div className="inner reading">
            <Reveal className="prose-row">
              <SectionLabel no="04">{t.method}</SectionLabel>
              <p className="reading-body">
                <Rich parts={t.methodBody} lang={lang} />
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
