import Link from "next/link";
import collection from "../collection.config.js";
import fieldNotes, { getNote } from "../content/field-notes.js";
import EntryCard from "../components/EntryCard.js";
import Reveal from "../components/Reveal.js";
import SiteNav from "../components/SiteNav.js";
import SiteFooter from "../components/SiteFooter.js";
import SectionLabel from "../components/SectionLabel.js";

/* Frontispiece facts — the guide's own catalogue header. */
const MASTHEAD = [
  { k: "Compiled by", v: collection.curator },
  { k: "Province", v: `${collection.province}, Cambodia` },
  { k: "Method", v: "Asked at the orchard" },
];

/* Three entries that between them cover the whole guide: a native variety,
   the market problem, and the climate thread. */
const FEATURED = ["ov-khak", "a-name-worth-protecting", "when-the-rain-doesnt-come"]
  .map(getNote)
  .filter(Boolean);

/* Drawn from the Sadong Kit entry — the line the guide's honesty rests on.
   It is the guide's own sentence, not anyone's quoted words. */
const PULL_QUOTE = {
  text: "In more than thirty years, nobody has come to look at these trees.",
  attribution: "Sadong Kit",
  href: "/field-notes/sadong-kit",
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#entries">Skip to the entries</a>
      <SiteNav current="/" />

      <header className="hero">
        <div className="inner hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="pulse" />
              Field guide in progress
            </p>
            <h1 className="headline">
              Kampot
              <em>Durian</em>
            </h1>
            <div className="hero-rule" aria-hidden="true" />
            <p className="sub">{collection.description}</p>

            <div className="cta-row">
              <Link className="btn" href="/field-notes">Read the field notes</Link>
              <Link className="link" href="/region">See the region</Link>
            </div>
          </div>

          <figure className="hero-figure">
            <img
              src="/tree-in-fruit.jpg"
              alt="Durian fruit hanging on the tree, Kampot"
              width={1536}
              height={2048}
              fetchPriority="high"
            />
            <figcaption>
              <span className="hero-cap-no">Kampot</span>
              Fruit on the branch, Teuk Chhou
            </figcaption>
          </figure>
        </div>

        <div className="inner">
          <dl className="masthead">
            {MASTHEAD.map((m) => (
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
              <SectionLabel no="01">The guide</SectionLabel>
            </Reveal>
            <div className="bento">
              <Reveal as="article" className="tile">
                <p className="tile-label">Entries compiled</p>
                <p className="stat-num">{fieldNotes.length}</p>
              </Reveal>
              <Reveal as="article" className="tile" delay={90}>
                <p className="tile-label">Varieties recorded</p>
                <p className="tile-value">
                  Ov Khak · Sadong Kit · Monthong · Musang King
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="entries">
          <div className="inner">
            <Reveal>
              <div className="section-head">
                <div>
                  <SectionLabel no="02">Selected entries</SectionLabel>
                  <h2 className="headline-sm">
                    Three of {fieldNotes.length}, to start.
                  </h2>
                </div>
                <Link className="link section-count" href="/field-notes">
                  Read all {fieldNotes.length}
                </Link>
              </div>
            </Reveal>
            <div className="entry-list">
              {FEATURED.map((note, i) => (
                <EntryCard
                  key={note.slug}
                  note={note}
                  variant={i === 0 ? "lead" : "plain"}
                  showNumber={false}
                  delay={i * 80}
                />
              ))}
            </div>
            <Reveal>
              <p className="body-copy note-foot">
                <Link href="/field-notes">
                  Read all {fieldNotes.length} entries
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        <section className="band" id="region">
          <img
            src="/teuk-chou-scenic.jpg"
            alt="The Teuk Chhou river at dusk, mountains rising behind the treeline on the far bank"
            width={1946}
            height={1186}
            loading="lazy"
            decoding="async"
          />
          <div className="band-copy">
            <Reveal>
              <SectionLabel no="03">The region</SectionLabel>
              <h2 className="headline-sm">
                Two hectares,
                <br />
                west of the town.
              </h2>
              <p className="sub">
                One orchard on the slopes at Teuk Chhou. Two hundred and
                fifteen trees, four varieties, the same family since 1994.
                Everything in this guide comes off that ground, and stops
                there.
              </p>
              <p className="cta-row">
                <Link className="link" href="/region">Read the region</Link>
              </p>
            </Reveal>
          </div>
        </section>

        <section className="quote-section">
          <Reveal className="inner">
            <figure className="pull">
              <blockquote>{PULL_QUOTE.text}</blockquote>
              <figcaption>
                <Link href={PULL_QUOTE.href}>{PULL_QUOTE.attribution}</Link>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <section className="section" id="method">
          <div className="inner reading">
            <Reveal>
              <SectionLabel no="04">How this was made</SectionLabel>
              <p className="reading-body">
                Everything here comes from interviews with the growers at Teuk
                Chhou. Nothing else, and the guide says so where it matters.
                The method is on <Link href="/about">About the Project</Link>.
                The interviews are on{" "}
                <Link href="/sources">Sources &amp; Credits</Link>.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
