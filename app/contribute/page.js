import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import ContributeForm from "../../components/ContributeForm.js";

export const metadata = {
  title: "Contribute — Kampot Durian",
  description: "Add an entry to the Kampot Durian field guide.",
  robots: { index: false },
};

export default function Contribute() {
  return (
    <>
      <SiteNav current="/contribute" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Contributors</SectionLabel>
          <h1 className="headline-sm">Add an entry.</h1>
          <p className="sub">
            Something you were told directly, by someone who knows it, with
            your own photograph. Say who told you and when. Notes from
            readers go to Community Notes, under your name; the Field Notes
            stay the orchard&rsquo;s own.
          </p>
        </div>
      </header>

      <main className="section" id="contribute">
        <div className="inner reading">
          <ContributeForm />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
