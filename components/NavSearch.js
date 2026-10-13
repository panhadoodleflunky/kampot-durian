"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchSuggestions from "./SearchSuggestions.js";
import { PAGES, suggest } from "../lib/suggest.js";

/* The search in the nav, after apple.com's: a magnifier at the end of the
   bar opens a panel under it, and suggestions appear as the reader types.
   Enter opens the highlighted one (the first, unless the arrow keys moved
   it); with nothing to suggest, Enter takes the words to the Field Notes
   search instead. The entries are fetched the first time it opens, so no
   page carries the index until someone asks for it. */
let cached;
const loadRows = () => (cached ??= fetch("/api/suggest").then((r) => r.json()).catch(() => (cached = undefined, [])));

export default function NavSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [active, setActive] = useState(0);
  const input = useRef(null);

  const hits = useMemo(() => suggest([...rows, ...PAGES], query), [rows, query]);
  const typing = query.trim().length > 0;
  const list = typing ? hits : PAGES;

  useEffect(() => {
    if (!open) return;
    loadRows().then(setRows);
    input.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + list.length) % Math.max(list.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = list[active];
      if (pick) router.push(pick.href);
      else if (typing) router.push(`/field-notes?q=${encodeURIComponent(query.trim())}`);
      close();
    }
  }

  return (
    <>
      <button type="button" className="theme-toggle nav-search-btn" aria-label="Search the guide" aria-expanded={open} onClick={() => (open ? close() : setOpen(true))}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" />
        </svg>
      </button>
      {open ? (
        <>
          <div className="nav-search-scrim" onClick={close} />
          <div className="nav-search-panel" role="search">
            <div className="inner">
              <input ref={input} className="nav-search-input" type="search" placeholder="Search the guide" aria-label="Search the guide" aria-controls="nav-search-list" aria-activedescendant={list.length ? `nav-search-list-${active}` : undefined} value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onKeyDown} />
              <SearchSuggestions id="nav-search-list" heading={typing ? "Suggestions" : "Quick links"} rows={list} active={active} onPick={close} empty="Nothing matches. Press Enter to search the Field Notes for it." />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
