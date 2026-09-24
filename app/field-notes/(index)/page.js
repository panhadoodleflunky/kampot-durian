import Link from "next/link";
import SiteNav from "../../../components/SiteNav.js";
import SiteFooter from "../../../components/SiteFooter.js";
import SectionLabel from "../../../components/SectionLabel.js";
import EntrySearch from "../../../components/EntrySearch.js";
import Reveal from "../../../components/Reveal.js";
import ArchiveDown from "../../../components/ArchiveDown.js";
import { getEntries } from "../../../lib/entries.js";

export const metadata = {
  title: "Field Notes — Kampot Durian",
  description:
    "Entries on one Teuk Chhou orchard's varieties, season, trade and troubles, as its growers tell it.",
};

export default async function FieldNotesIndex() {
  /* `EntrySearch` is a client component, so whatever is handed to it is
     serialised into this page's payload and shipped. Rows out of Supabase
     never carry `imageWanted` — that was a `content/field-notes.js`-only,
     dev-only field — so there is nothing left to strip at this boundary.
     `null` means Supabase didn't answer; the headline then makes no count. */
  const notes = await getEntries();

  return (
    <>
      <SiteNav current="/field-notes" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Field Notes</SectionLabel>
          <h1 className="headline-sm">
            {notes ? `${notes.length} entries, one orchard.` : "One orchard."}
          </h1>
        </div>
      </header>

      <main id="notes">
        <section className="section">
          <div className="inner">
            {notes ? (
              <>
                {/* Client component: it owns the query state and the
                    filtering. The data comes from Supabase now, not
                    content/field-notes.js — the page reads it and hands it
                    down, so nothing about an entry is hardcoded here. */}
                <EntrySearch notes={notes} />
                <Reveal>
                  <p className="body-copy note-foot">
                    Each entry names its source. The full record is on{" "}
                    <Link href="/sources">Sources &amp; Credits</Link>.
                  </p>
                </Reveal>
              </>
            ) : (
              <ArchiveDown />
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
