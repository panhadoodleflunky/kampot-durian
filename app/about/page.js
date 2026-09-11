import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import Reveal from "../../components/Reveal.js";
import collection from "../../collection.config.js";
import fieldNotes from "../../content/field-notes.js";
import { method, cautions } from "../../content/sources.js";

export const metadata = {
  title: "About the Project — Kampot Durian",
  description: method,
};

/* Same shape as the home masthead and the region figures: the mono label,
   one line of serif that carries the fact, and a note underneath for the
   qualification. The old version put a whole paragraph in each cell and the
   section read as four blocks of small grey text. */
const SPECS = [
  {
    h: "Province",
    v: collection.province,
    p: "Teuk Chhou district, on the slopes west of the town.",
  },
  {
    h: "Season",
    v: "May to July",
    p: "Opens mid-May, peaks mid-June, done by late July. The start moves by weeks from year to year.",
  },
  {
    h: "Method",
    v: "Two sittings",
    p: method,
  },
  {
    h: "Status",
    v: "Ongoing",
    p: "Entries are added as the growers are asked more.",
  },
];

/* The entries spell their numbers out — "two hundred and fifteen trees",
   "eighteen thousand riel" — so a count written into that prose does too. */
const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
  "Eight", "Nine", "Ten", "Eleven", "Twelve"];

function spell(n) {
  return WORDS[n] ?? String(n);
}

export default function About() {
  const open = fieldNotes.filter((n) => n.status === "in-progress").length;

  /* Counted, not typed. This sentence used to name Monthong and Musang King,
     and by the time three more entries were written it was naming two of the
     five that actually have no photograph. On a page whose whole argument is
     that the gaps are stated out loud, an undercount of the gaps is the worst
     sentence on the site to leave stale. */
  const unillustrated = fieldNotes.filter((n) => !n.image).length;

  return (
    <>
      <a className="skip" href="#about">Skip to the text</a>
      <SiteNav current="/about" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">About the Project</SectionLabel>
          <h1 className="headline-sm">How this was made.</h1>
          <p className="sub">
            Two growers, two sittings, one orchard. Everything here came out
            of that, and nothing came off the internet.
          </p>
        </div>
      </header>

      <main id="about">
        <section className="section">
          <div className="inner reading">
            <Reveal className="prose-row">
              <h2 className="tile-label">What this is</h2>
              <p className="reading-body">
                A field guide to one durian orchard at Teuk Chhou, Kampot,
                built entirely out of what its two growers know. Four
                varieties. How you read a fruit for ripeness. How long each
                one takes from petal drop to harvest. What a counterfeit looks
                like on a highway stall. What 2024 cost them. What an export
                boom looks like from a farm that has no part in it. It is
                testimony, not a survey.
              </p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">Method</h2>
              <p className="reading-body">
                {method} The growers are my own parents. They own and work the
                orchard, and they answered questions directly for this
                project — four on 1 September 2026, then 220 more on
                4 September, covering every entry here. That second sitting is
                most of this site. It includes the days from petal drop to
                harvest for each of their four varieties, which I have not
                found written down anywhere else. They asked not to be named,
                so they are credited by relationship, place and date.
              </p>
              <p className="reading-body">
                This is a narrow basis on purpose. An earlier version of the
                guide ran on published research, news reporting and a trade
                standard, with the interviews threaded through. All of it came
                out in September 2026 — seventeen citations, every statistic,
                every reported event, one licensed photograph. The cost is
                real: nothing here can be checked against an outside record,
                and the guide says so where it matters. What is left is
                first-hand, and two pieces of it do not appear to exist
                anywhere else.
              </p>
              <p className="reading-body">
                Four things travel with all of it:
              </p>
              <ul className="body-copy">
                {cautions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="reading-body">
                Each entry names the sitting it came from. The full record is
                on{" "}
                <Link href="/sources">Sources &amp; Credits</Link>.
              </p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">What is missing</h2>
              <p className="reading-body">
                {open} of the {fieldNotes.length} entries {open === 1 ? "is" : "are"}{" "}
                marked in progress. The drought entry follows three seasons
                on one farm and cannot say how far that ran across the
                district. The export entry can describe standing outside a
                programme, not the programme. {spell(unillustrated)} of the{" "}
                {spell(fieldNotes.length).toLowerCase()} entries{" "}
                {unillustrated === 1 ? "has" : "have"} no photograph. And this
                is the English edition — the growers&apos;
                Khmer for the tap, the stem joint, the flowering season and
                much else is held for a Khmer one not built yet, so the words
                the work is actually done in are not on the page. The gaps are
                left where they are.
              </p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">Course context</h2>
              <p className="reading-body">
                Built for ICT 340 — Vibe Coding at the American University of
                Phnom Penh, Fall 2026.
              </p>
            </Reveal>

            <Reveal className="prose-row">
              <h2 className="tile-label">Why this exists</h2>
              <p className="reading-body">
                I grew up with this fruit. Kampot is home, my family grows
                and sells durian there, and I spent my childhood watching my
                parents do the work — the waiting, the reading of a season,
                the selling. A crop that matters this much to one province
                deserves to be written down properly, and most of it has not
                been.
              </p>
              <p className="reading-body">
                Worth saying plainly. This started as published sources with
                some family knowledge in it. It is now family knowledge and
                nothing else. That is the part nobody else could have written,
                and the part no reader can check. So every claim is dated,
                tied to the sitting it came from, and left as testimony rather
                than dressed up as a citation.              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner">
            <Reveal>
              <SectionLabel no="02">The details</SectionLabel>
            </Reveal>
            <Reveal className="specs">
              {SPECS.map((s) => (
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

      <SiteFooter />
    </>
  );
}
