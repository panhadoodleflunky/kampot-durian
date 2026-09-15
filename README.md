# Kampot Durian — a field guide

A field guide to one durian orchard at Teuk Chhou, Kampot — its varieties, its
season, how its growers read a fruit for ripeness, what a counterfeit looks
like on a highway stall, and what the 2024 drought cost them. Every word of it
came out of interviews with the two people who work the land.

Live: **https://kampot-durian.vercel.app**

Built for ICT 340 — Vibe Coding at the American University of Phnom Penh,
Fall 2026. Compiled by Sovanpanha Nonn.

---

## The rule this site is built on

**Primary sources only. Real people, asked directly. Nothing off the internet.**

> Every claim on this site comes from Rasmey and Vanny, who own and work a
> durian orchard at Teuk Chhou, Kampot, or from the Khmer vocabulary they use
> in the field. No publication, news report, trade standard, research paper, or
> website is cited anywhere, and no borrowed photograph appears.

This is the third version of the site, and each rule replaced a worse one. v1
carried fabricated content — invented speakers, invented quotes, invented
recording dates — and was deleted outright. v2 rebuilt it from published
research and reporting with interview material threaded through. v3, this one,
removed the published half entirely: seventeen citations, every statistic that
came from a government series or a news report, and one licensed photograph.

The honest cost is that nothing here can be checked by a reader against an
outside source. The gain is that nothing here is second-hand, and two things on
it — the days from petal drop to harvest for four Cambodian varieties, and a
description of Sadong Kit — do not appear to exist anywhere else.

That is why entries carry a `status` of `published` or `in-progress`, why
`/about` has a section called "What is missing", and why the Khmer glossary
is kept aside for a future edition instead of guessed at here.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # 22 static pages
```

Requires Node 18.18 or newer. No environment variables, no database, no API
keys — the site is fully static.

## The stack

Next.js 15 (App Router), React 19, plain JavaScript. **Three dependencies
total**, all of them the framework itself:

| | |
|---|---|
| Styling | one hand-written CSS file, `app/globals.css` — no framework |
| State | React's own `useState`; no state library |
| Content | plain JS modules; no CMS, no MDX, no database |
| Search | a pure function over an array; no search library |

That is a deliberate constraint, not an omission.

## How it is laid out

```
app/
  page.js                  home — hero, three featured entries, method note
  region/page.js           the orchard, the setting, the scale, the pressure
  field-notes/page.js      browse + search over every entry, four to a page
  field-notes/[slug]/      one entry per page, statically generated
  about/page.js            what this is, method, what is missing, why
  sources/page.js          the interview record, cautions, photograph credits
  globals.css              the whole stylesheet
components/
  EntrySearch.js           client component: owns the search query and the page
  SearchBox.js             the search field itself, presentational
  Pagination.js            the page controls, presentational
  SearchEmpty.js           the no-results state
  EntryCard.js             one entry, in three width variants
  SiteNav / SiteFooter / SectionLabel / DurianGlyph / Reveal
content/
  field-notes.js           the entries — the data behind every page
  search-index.js          which fields are searchable, and the matcher
  card-variants.js         the grid cycle and the paging maths, as pure functions
  sources.js               the interview record, cautions, photo credits, method string
collection.config.js       archive identity: name, description, curator, source
```

**Pages never hardcode entry content.** They read `content/field-notes.js` and
render what is there. Adding an entry is a data edit, not a layout edit.

### The entry shape

Defined in [`entry-sketch.md`](entry-sketch.md). `slug`, `figNumber`, `title`,
`body`, and `sources` are required; `khmerName`, `image`, `tags`, and `status`
are optional, and `khmerName` is left empty rather than guessed.

### The search

`content/search-index.js` holds it as pure functions — `norm`, `buildIndex`,
`search` — with no React, because *which fields are searchable* is a decision
about the entry shape rather than about the box that displays it. It also means
the search can be reasoned about, and tested, on its own.

It matches against title, Khmer name, body, fig number, tags, **and source
lines** — in a guide whose whole claim is traceability, searching a source by
name is a real question a reader might have.
Every word of the query must appear somewhere in the entry, so `kampot drought`
finds the entry about both rather than everything about either.

**Browsing is paged; searching is not.** Four entries to a page when you are
browsing — eleven entries across three pages, each page one full turn of the
card-variant cycle — and no pager at all once you type — a query is already the reader
narrowing the list, and paging their matches would hide results behind a
control they did not ask for.

Two things it handles that a naive `includes()` would not:

- **Khmer zero-width spaces.** U+200B is a real word separator in Khmer and some
  keyboards emit it, but `\s` does not match it — a pasted Khmer query would
  silently match nothing. Zero-width characters are stripped from both sides.
- **The field separator.** Fields join on a newline, which a single-line input
  cannot produce, so no query can match the separator and return everything.

## Course status

| Sprint | Feature | State |
|---|---|---|
| 1 | Browse and search | built |
| 2 | Contributor accounts, own-your-entries | not started |
| 3 | Submit, review, publish | not started |

Sprint features are built when the sprint asks for them, not ahead of it —
Sprint 2 changes how entries are stored, so building it early means building it
twice.

## Credits

Every photograph on this site is the curator's own work, taken in Kampot. There
is no stock, licensed, or borrowed image anywhere in it — the one Wikimedia
photograph the site used to carry was removed with the published sources. All
of it is listed on
[`/sources`](https://kampot-durian.vercel.app/sources).

Corrections are welcome.
