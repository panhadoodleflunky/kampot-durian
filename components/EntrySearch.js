"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";
import EntryCard from "./EntryCard.js";
import SearchBox from "./SearchBox.js";
import SearchEmpty from "./SearchEmpty.js";
import Pagination from "./Pagination.js";
import { buildIndex, search, isQuery } from "../content/search-index.js";
import { variantFor, pageCount, PER_PAGE } from "../content/card-variants.js";

export default function EntrySearch({ notes }) {
  const lang = useLang();
  const t = pick(ui, lang).search;
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = useRef(null);
  const topRef = useRef(null);

  const index = useMemo(() => buildIndex(notes), [notes]);
  const shown = useMemo(() => search(index, query), [index, query]);
  const searching = isQuery(query);
  const noun = t.noun(notes.length);

  const pages = searching ? 1 : pageCount(shown.length);
  const safePage = Math.min(page, Math.max(pages, 1));
  const paged = searching
    ? shown
    : shown.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  /* Focus the box when arrived at from the nav's Search link. Also listens for
     the hash changing, since Next does not remount the page when you follow
     /field-notes#search while already on /field-notes. */
  useEffect(() => {
    const focus = () => {
      if (window.location.hash === "#search") inputRef.current?.focus();
    };
    focus();
    /* A search handed over from the nav (Enter with no suggestion) arrives
       as ?q=, and starts the list already filtered. */
    const handed = new URLSearchParams(window.location.search).get("q");
    if (handed) setQuery(handed);
    window.addEventListener("hashchange", focus);
    return () => window.removeEventListener("hashchange", focus);
  }, []);

  /* A new query starts at the first page, or the reader lands on an empty
     page 2 of a result set that now has three matches. */
  function onQuery(next) {
    setQuery(next);
    setPage(1);
  }

  /* Back to the top of the list on a page change — otherwise the reader keeps
     the scroll position of the last card and appears to have gone nowhere. */
  function onPage(next) {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <span ref={topRef} aria-hidden="true" />
      <SearchBox
        value={query}
        onChange={onQuery}
        inputRef={inputRef}
        count={
          searching
            ? t.count(shown.length, notes.length, noun)
            : t.paged(notes.length, noun, safePage, pages)
        }
      />

      {shown.length > 0 ? (
        <>
          <div className="entry-list">
            {paged.map((note, i) => (
              <EntryCard
                key={note.slug}
                lang={lang}
                note={note}
                variant={variantFor(i, paged.length)}
                delay={(i % 3) * 70}
              />
            ))}
          </div>
          <Pagination
            page={safePage}
            pages={pages}
            onChange={onPage}
            label={t.pagerLabel}
          />
        </>
      ) : notes.length === 0 ? (
        /* An empty table is not a failed search: there was no query to
           quote back, and nothing to "show all" of. */
        <p className="body-copy">{t.none}</p>
      ) : (
        <SearchEmpty query={query} total={notes.length} onClear={() => onQuery("")} />
      )}
    </>
  );
}
