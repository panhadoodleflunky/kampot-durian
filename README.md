# Kampot Durian — a field guide

A field guide to one durian orchard at Teuk Chhou, Kampot — its varieties, its
season, how its growers read a fruit for ripeness, what a counterfeit looks
like on a highway stall, and what the 2024 drought cost them. Every word of it
came out of interviews with the family who work the land, and one neighbour.

Live: **https://kampot-durian.vercel.app**

Built for ICT 340 — Vibe Coding at the American University of Phnom Penh,
Fall 2026. Compiled by Sovanpanha Nonn.

---

## The rule this site is built on

**Primary sources only. Real people, asked directly. Nothing off the internet.**

> Every claim on this site comes from the family who own and work a
> durian orchard at Teuk Chhou, Kampot, or from the Khmer vocabulary they use
> in the field. No publication, news report, trade standard, research paper, or
> website is cited anywhere, and every photograph is the compiler's or the family's own.

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

That is why `/about` has a section called "What is missing", and why the Khmer
glossary is kept aside for a future edition instead of guessed at here.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Requires Node 18.18 or newer and two environment variables in `.env.local`
(and on Vercel): `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Both are public by design — the
row-level security policies on the tables are the protection, not the key.
Nothing secret is committed.

## The stack

**Two editions.** English at the plain addresses, Khmer under `/km` — same
pages, same data, a language switch in the nav. `middleware.js` maps English
addresses onto `app/[lang]/` without changing them; every string comes from
`content/copy/`. The Khmer is set in Hanuman and Battambang, self-hosted from
`public/fonts` (SIL Open Font License) and preloaded on Khmer pages.

Next.js 15 (App Router), React 19, plain JavaScript. **Five dependencies**: the
framework three, plus `@supabase/supabase-js` and `@supabase/ssr`, approved for
Sprint 2 (see `AGENTS.md`).

| | |
|---|---|
| Styling | one hand-written CSS file, `app/globals.css` — no framework |
| State | React's own `useState`; no state library |
| Data | Supabase Postgres: `entries` (the Field Notes), `contributions` (Community Notes), `profiles` (display names), and a `photos` storage bucket |
| Auth | Supabase email and password |
| Search | a pure function over an array; no search library |

## How it is laid out

```
middleware.js                English addresses → app/[lang]/ (lang "en"); /km as is
app/
  [lang]/layout.js           the root layout, per edition (html lang, fonts, metadata)
  [lang]/(home)/page.js      home — hero, featured entries, method note
  [lang]/region/ about/ sources/   the orchard; method and gaps; interviews and credits
  [lang]/field-notes/(index)/      browse + search over every entry, four to a page
  [lang]/field-notes/[slug]/       one entry; /edit for the curator
  [lang]/contributed/        Community Notes from other accounts, and their /edit
  [lang]/contribute/         the form: curator → Field Notes, anyone else → Community
  [lang]/login/ signup/ account/   the front door, and the account page
  [lang]/not-found.js  [lang]/[...rest]/   the 404, in both editions
  api/suggest/[lang]/        the nav search's index, fetched on first open
  sitemap.js  robots.js  globals.css
components/                  one component per file, ~80 lines or less
  EntrySearch, SearchBox, Pagination, SearchEmpty, EntryCard     browse and search
  EntryForm, FormField, PhotoField, ContributeForm, EditEntryForm, OwnerActions
  AuthForm, SignupForm, AuthStatus, AccountMenu, AccountPanel, NameForm, PasswordForm, SignInPrompt
  SiteNav, NavMenu, NavSearch, SearchSuggestions, LangSwitch, LangOnly, SiteFooter,
  SectionLabel, DurianGlyph, Reveal, ThemeToggle, Rich (a sentence with links, from copy)
lib/
  entries.js                 every read: rows → entries, cached static pages
  entry-rules.js  entry-row.js  signup-rules.js   validation and row shaping
  photo-upload.js  save-error.js  roles.js         uploads, error wording, who may edit
  i18n.js  use-lang.js       the two editions: localize(), pick() with English fallback
  suggest.js  use-session.js  use-search-handoff.js  actions.js
  supabase/client.js  supabase/server.js           browser and server clients
content/
  copy/ui.js pages.js forms.js   every string on the site, { en, km }
  photos.js                  size, alt text and caption (both editions) per photograph
  sources.js                 the interview record, cautions, photo credits, method
  search-index.js            which fields are searchable, and the matcher
  card-variants.js           the grid cycle and paging maths, as pure functions
  site.js                    the site's base URL
public/fonts/                the Khmer faces and their licences
scripts/khmer-breaks.mjs     re-run after editing Khmer: marks where lines may break
collection.config.js         archive identity: name, description, curator, source
entry-sketch.md              what one entry is, as data
```

**Pages never hardcode entry content.** They read the `entries` table through
`lib/entries.js`. Adding an entry is a row, not a deploy.

### Who may write what

Enforced by row-level security in the database, not by hiding buttons:

- **Anyone** can read everything.
- **The curator** (`role: curator` in the account's app metadata, which a user
  cannot set) is the only account that writes Field Notes, and is the site's
  admin: it can edit or delete any Community Note.
- **Any other account** can add Community Notes and edit or delete only its own.

### The entry shape

Defined in [`entry-sketch.md`](entry-sketch.md). `slug`, `figNumber`, `title`,
`body`, and `sources` are required; `khmerName`, `image`, `tags`, and `status`
are optional.

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
browsing — each full page one turn of the card-variant cycle — and no pager at all once you type — a query is already the reader
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
| 2 | Contributor accounts, own-your-entries | built |
| 3 | Submit, review, publish | not started — the curator-as-admin piece was built early, by choice |

## Credits

Every photograph on this site is the curator's own work, taken in Kampot, or a
family photograph used with permission and credited as such. There is no
stock or licensed image anywhere in it — the one Wikimedia
photograph the site used to carry was removed with the published sources. All
of it is listed on
[`/sources`](https://kampot-durian.vercel.app/sources).

Corrections are welcome.
