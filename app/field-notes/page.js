import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import EntrySearch from "../../components/EntrySearch.js";
import Reveal from "../../components/Reveal.js";
import fieldNotes from "../../content/field-notes.js";

export const metadata = {
  title: "Field Notes — Kampot Durian",
  description:
    "Entries on one Teuk Chhou orchard's varieties, season, trade and troubles, as its growers tell it.",
};

export default function FieldNotesIndex() {
  return (
    <>
      <a className="skip" href="#notes">Skip to the entries</a>
      <SiteNav current="/field-notes" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Field Notes</SectionLabel>
          <h1 className="headline-sm">
            {fieldNotes.length} entries, one orchard.
          </h1>
        </div>
      </header>

      <main id="notes">
        <section className="section">
          <div className="inner">
            {/* Client component: it owns the query state and the filtering.
                The data still comes from content/field-notes.js — the page
                reads it and hands it down, so nothing about an entry is
                hardcoded here. */}
            <EntrySearch notes={fieldNotes} />
            <Reveal>
              <p className="body-copy note-foot">
                Each entry names the sitting it came from. The full record is
                on{" "}
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
