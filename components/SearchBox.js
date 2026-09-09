"use client";

/* The search field itself. Presentational — it holds no state, so the query
   lives in one place (EntrySearch) rather than two. */
export default function SearchBox({ value, onChange, inputRef, count }) {
  return (
    <div className="search" id="search">
      <label className="search-label" htmlFor="entry-search">
        Search the entries
      </label>
      <div className="search-field">
        <input
          id="entry-search"
          ref={inputRef}
          className="search-input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="A variety, a subject, a season — Ov Khak, drought, harvest"
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
          Clear
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
