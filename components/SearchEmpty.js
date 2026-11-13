"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* The no-results state. Its own file because this project caps a
   component at roughly 80 lines and EntrySearch was over with this inline.

   The copy is the point: an empty result in a research archive is a fact
   about the archive, not an error by the reader, and it says so. */

/* A reader may type Khmer into the English edition's box, so their query is
   tagged for the right font whichever edition they are in. */
const KHMER = /[ក-៿]/;

export default function SearchEmpty({ query, total, onClear }) {
  const t = pick(ui, useLang()).search;
  return (
    <div className="search-none">
      <p className="search-none-head">
        {t.emptyHead}{" "}
        <span lang={KHMER.test(query) ? "km" : undefined}>“{query}”</span>{t.emptyEnd}
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
