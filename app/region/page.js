import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import Reveal from "../../components/Reveal.js";

export const metadata = {
  title: "The Region — Kampot Durian",
  description:
    "The ground this guide actually stands on: two hectares at Teuk Chhou, Kampot, as its growers describe it.",
};

/* The only ground this guide can speak for. There used to be two national
   figures here, taken from a government series reported in the press; they
   went when the site moved to interview-only sourcing. No figure appears on
   this page that did not come out of the interviews. */
const FIGURES = [
  {
    h: "The orchard",
    v: "~2 ha",
    p: "Two hectares at Teuk Chhou, worked by the two growers interviewed for this guide. Everything here comes off it.",
  },
  {
    h: "Trees, in four varieties",
    v: "~215",
    p: "About 100 Ov Khak, 50 Sadong Kit, 50 Monthong, 15 grafted Musang King. Estimates, all of them. Trees die and get replanted, and no exact tally is kept.",
  },
  {
    h: "Held since",
    v: "1994",
    p: "The year the land was bought. Six Ov Khak and the whole Sadong Kit block were already standing — at least thirty-two years old, probably older.",
  },
];

export default function Region() {
  return (
    <>
      <a className="skip" href="#region">Skip to the region</a>
      <SiteNav current="/region" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">The Region</SectionLabel>
          <h1 className="headline-sm">The ground it comes off.</h1>
          <p className="sub">
            Two hectares on the slopes west of Kampot town. Not the
            province, not the durian belt, not the national crop — one
            orchard, and only what its growers can speak to.
          </p>
        </div>
      </header>

      <main id="region">
        <section className="band">
          <img
            src="/teuk-chou-scenic.jpg"
            alt="A wide view of the Teuk Chhou river at dusk, mountains rising behind a treeline on the far bank"
            width={1946}
            height={1186}
            fetchPriority="high"
          />
          <div className="band-copy">
            <Reveal>
              <SectionLabel no="02">The setting</SectionLabel>
              <h2 className="headline-sm">
                Slopes, and
                <br />
                what runs off them.
              </h2>
              <p className="sub">
                The orchards here drink what comes down off the hills. That is
                why the district suits durian, and it is the weakness in it.
                When the mountain stream fails there is nothing behind it but
                a well and a diesel pump.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="inner">
            <Reveal>
              <SectionLabel no="03">The scale</SectionLabel>
              <h2 className="headline-sm">The orchard, counted.</h2>
            </Reveal>
            <Reveal className="specs">
              {FIGURES.map((f) => (
                <div className="spec" key={f.h}>
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
              <SectionLabel no="04">The pressure</SectionLabel>
              <h2 className="headline-sm">Water, and 2024.</h2>
              <p className="reading-body">
                2024 was the worst season they have worked. Forty-three
                degrees in May. The mountain stream gone by late March. Leaves
                wilting by nine each morning. Four mature trees died when
                their roots dried, a quarter of the season's fruit weight went
                to early abortion, and the level in their own well fell three
                metres. The rain that used to come in the first week of May
                did not reach the trees until mid-June.
              </p>
              <p className="reading-body">
                How far that ran past their fence they do not claim to know,
                and this guide will not guess. What they can describe is the
                mechanism, because they live on it. Orchards on these slopes
                run on rainfall and run-off, and there is no reserve behind
                either. Fruit stops reaching size and drops early. What
                survives ripens too fast to taste right. Their answer was a
                thirty-two-metre well, a diesel pump, rice straw at the
                drip-line, and netting over the young grafts.{" "}
                <Link href="/field-notes/when-the-rain-doesnt-come">
                  Read the full entry on the drought
                </Link>
                , which follows one family through the last three seasons of it.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
