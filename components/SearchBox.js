"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";


/* The search field itself. Presentational — it holds no state, so the query
   lives in one place (EntrySearch) rather than two. */
export default function SearchBox({ value, onChange, inputRef, count }) {
  const t = pick(ui, useLang()).search;
  return (
    <div className="search" id="search">
      <label className="search-label" htmlFor="entry-search">
        {t.label}
      </label>
      <div className="search-field">
        <input
          id="entry-search"
          ref={inputRef}
          className="search-input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="off"
          spellCheck="false"
          aria-describedby="entry-search-count"
        />
        {/* Always rendered, disabled when there is nothing to clear: showing
            it only once you type would resize the input on the first
            keystroke, under the cursor. */}
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          disabled={!value}
        >
          {t.clear}
        </button>
      </div>
      {/* Announced to screen readers on every change, not just on submit. */}
      <p
        className="search-count"
        id="entry-search-count"
        role="status"
        aria-live="polite"
      >
        {count}
      </p>
    </div>
  );
}
