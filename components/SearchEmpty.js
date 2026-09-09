/* The no-results state. Its own file because this project caps a
   component at roughly 80 lines and EntrySearch was over with this inline.

   The copy is the point: an empty result in a research archive is a fact
   about the archive, not an error by the reader, and it says so. */

/* A reader may still type Khmer into the box even though this edition holds
   no Khmer content, so their query is still tagged for the right font. */
const KHMER = /[ក-៿]/;

export default function SearchEmpty({ query, total, onClear }) {
  return (
    <div className="search-none">
      <p className="search-none-head">
        Nothing in the guide matches{" "}
        <span lang={KHMER.test(query) ? "km" : undefined}>“{query}”</span>.
      </p>
      <p className="body-copy">
        {total} entries, not eleven thousand. A blank usually means the guide
        has not got to the subject yet. Try a variety — Ov Khak, Monthong,
        Musang King — or a subject: harvest, climate, export, trade.
      </p>
      <button type="button" className="btn search-none-btn" onClick={onClear}>
        Show all {total} entries
      </button>
    </div>
  );
}
