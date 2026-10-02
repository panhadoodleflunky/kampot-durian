import Link from "next/link";
import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import EntryCard from "../../components/EntryCard.js";
import { getContributions } from "../../lib/entries.js";

/* Static, rebuilt in the background at most once a minute — see lib/entries.js. */
export const revalidate = 60;

/* Kept out of search engines until Sprint 3 adds review: nothing here has
   been checked by anyone but its author. */
export const metadata = {
  title: "Community Notes — Kampot Durian",
  description: "Durian notes from readers, beyond this one orchard.",
  robots: { index: false },
};

export default async function CommunityIndex() {
  const notes = await getContributions();

  return (
    <>
      <SiteNav current="/contributed" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Community Notes</SectionLabel>
          <h1 className="headline-sm">Beyond this orchard.</h1>
          <p className="sub">
            Notes from readers: other growers, other provinces, other trees.
            Each one is its author&rsquo;s own account. None of it comes from
            the interviews behind the{" "}
            <Link href="/field-notes">Field Notes</Link>, and none of it has
            been checked by this archive.
          </p>
        </div>
      </header>

      <main id="notes">
        <section className="section">
          <div className="inner">
            {notes.length === 0 ? (
              <div className="prompt-card">
                <p className="body-copy">No notes yet. Yours could be the first.</p>
                <div className="auth-actions">
                  <Link className="btn" href="/contribute">Add a note</Link>
                </div>
              </div>
            ) : (
              <div className="entry-list">
                {notes.map((note) => (
                  <EntryCard key={note.slug} note={note} basePath="/contributed" showNumber={false} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
