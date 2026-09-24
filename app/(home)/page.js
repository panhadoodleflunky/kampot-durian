import Image from "next/image";
import Link from "next/link";
import collection from "../../collection.config.js";
import { getEntries } from "../../lib/entries.js";
import EntryCard from "../../components/EntryCard.js";
import Reveal from "../../components/Reveal.js";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import ArchiveDown from "../../components/ArchiveDown.js";

/* Frontispiece facts — the guide's own catalogue header. */
const MASTHEAD = [
  { k: "Compiled by", v: collection.curator },
  { k: "Province", v: `${collection.province}, Cambodia` },
  { k: "Method", v: "Interview" },
];

/* Three entries that between them cover the whole guide: a native variety,
   the market problem, and the climate thread. Looked up against whatever
   Supabase returns; a slug that is no longer there (renamed, say) gives its
   place to the next entry in the catalogue, so the section never shrinks
   while the archive itself is fine. */
const FEATURED_SLUGS = ["ov-khak", "a-name-worth-protecting", "when-the-rain-doesnt-come"];

const COUNT_WORDS = ["None", "One", "Two", "Three"];

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
const PULL_QUOTE = {
  text: "In more than thirty years,\u00A0nobody has come to look at these trees.",
  attribution: "Sadong Kit",
  href: "/field-notes/sadong-kit",
};

export default async function Home() {
  /* `null` means Supabase didn't answer. Then no count is printed at all —
     "0 entries" would be a false statement about the archive. */
  const entries = await getEntries();
  const featured = entries ? pickFeatured(entries) : [];

  return (
    <>
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
            {/* The one photograph a reader sees before they scroll, so it is
                the one that gets `priority`. `sizes` is what stops the phone
                downloading the 1536px file: the figure fills the width below
                the 900px breakpoint and sits in roughly half the grid above
                it. */}
            <Image
              src="/tree-in-fruit.jpg"
              alt="Durian fruit hanging on the tree, Kampot"
              width={1536}
              height={2048}
              sizes="(max-width: 900px) 100vw, 46vw"
              priority
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
                <p className="stat-num">{entries ? entries.length : "—"}</p>
              </Reveal>
              <Reveal as="article" className="tile" delay={90}>
                <p className="tile-label">Varieties recorded</p>
                <p className="tile-value">
                  Ov Khak, Sadong Kit, Monthong, Musang King
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
                    {entries
                      ? `${COUNT_WORDS[featured.length]} of ${entries.length}, to start.`
                      : "A few, to start."}
                  </h2>
                </div>
                <Link className="link section-count" href="/field-notes">
                  {entries ? `Read all ${entries.length}` : "Read them all"}
                </Link>
              </div>
            </Reveal>
            {/* The section head already carries the "Read all" link — a
                second one under the cards said the same thing twice on one
                screen. */}
            {entries ? (
              <div className="entry-list">
                {featured.map((note, i) => (
                  <EntryCard
                    key={note.slug}
                    note={note}
                    variant={i === 0 ? "lead" : "plain"}
                    showNumber={false}
                    delay={i * 80}
                  />
                ))}
              </div>
            ) : (
              <ArchiveDown />
            )}
          </div>
        </section>

        <section className="band" id="region">
          {/* Full-bleed behind the band's type, so it is asked for at the
              viewport's own width and left to load lazily — it is three
              sections down the page. */}
          <Image
            src="/teuk-chou-scenic.jpg"
            alt="The Teuk Chhou river at dusk, mountains rising behind the treeline on the far bank"
            width={1946}
            height={1186}
            sizes="100vw"
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
            <Reveal className="prose-row">
              <SectionLabel no="04">How this was made</SectionLabel>
              <p className="reading-body">
                Everything here comes from Rasmey and Vanny, who own and work
                the orchard at Teuk Chhou. Nothing else, and the guide says so
                where it matters.
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
