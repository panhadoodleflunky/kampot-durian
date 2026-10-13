"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* The no-results state. Its own file because this project caps a
   component at roughly 80 lines and EntrySearch was over with this inline.

   The copy is the point: an empty result in a research archive is a fact
   about the archive, not an error by the reader, and it says so. */

/* A reader may still type Khmer into the box even though this edition holds
   no Khmer content, so their query is still tagged for the right font. */
const KHMER = /[ក-៿]/;

export default function SearchEmpty({ query, total, onClear }) {
  const t = pick(ui, useLang()).search;
  return (
    <div className="search-none">
      <p className="search-none-head">
        {t.emptyHead}{" "}
        <span lang={KHMER.test(query) ? "km" : undefined}>“{query}”</span>.
      </p>
      <p className="body-copy">
        {t.emptyBody(total)}
      </p>
      <button type="button" className="btn search-none-btn" onClick={onClear}>
        {t.showAll(total)}
      </button>
    </div>
  );
}
