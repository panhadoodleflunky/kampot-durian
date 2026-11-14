# Kampot Durian — a field guide

Live: **https://kampot-durian.vercel.app** · English at the plain addresses,
Khmer under [`/km`](https://kampot-durian.vercel.app/km).

Built for ICT 340 — Vibe Coding at the American University of Phnom Penh,
Fall 2026. Compiled by Sovanpanha Nonn. The sections below follow the final
capstone's order; the submission checklist is the last one.

---

## What this is

A field guide to one durian orchard at Teuk Chhou, Kampot — its varieties, its
season, how its growers read a fruit for ripeness, what a counterfeit looks
like on a highway stall, and what the 2024 drought cost them. Every word of it
came out of interviews with the family who work the land, and one neighbour.
A visitor can browse and search twelve Field Notes in English or Khmer; anyone
with an account can add a Community Note, which waits for the curator's review
before the public sees it.

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
description of Sadong Kit — do not appear to exist anywhere else. That is why
`/about` has a section called "What is missing".

| Sprint | Feature | State |
|---|---|---|
| 1 | Browse and search | built |
| 2 | Contributor accounts, own-your-entries | built |
| 3 | Submit, review, publish | built — the gate, My notes, the review queue and take-down |

## Who it's for

Khmer readers first: people in Kampot and elsewhere in Cambodia who grow, buy
or sell durian, and anyone who wants to know how a Kampot grower judges a
fruit, in the grower's own words. English readers second. What was done for
them:

- **Khmer is a full edition, not a toggle on some pages.** Every page, button,
  status word, error message and the review queue exist in Khmer under `/km`.
  The translation uses the growers' own field terms (the knock test, the
  variety names as they are said), each confirmed by the curator, not
  dictionary guesses. Headings drop the Khmer full stop ។ because it looked
  wrong to Khmer eyes (the curator, 7 November 2026).
- **Khmer text behaves.** The Khmer fonts (Hanuman, Battambang) are
  self-hosted subsets, 92 KB together, preloaded only on `/km` pages.
  `scripts/khmer-breaks.mjs` marks where a Khmer line may break, since Khmer
  has no spaces between words. Search strips the invisible zero-width spaces
  some Khmer keyboards type, and a Khmer word finds its entry in either
  edition.
- **Phones first.** Every page is built and checked at 390 px wide, with a
  phone menu; the curator tests on their own phone before calling a change
  done.
- **Slow connections.** Pages are static, served ready-made from Vercel's
  cache and rebuilt in the background at most once a minute. The nav search
  loads its index only when it is opened. A contributor's photo is redrawn in
  the browser before upload — long edge at most 2400 px, JPEG, under 5 MB — so
  it costs less to send and carries no GPS location.
- **Sources named the way they asked.** Every entry ends with its sources.
  The orchard's owners asked not to be named and are credited as the curator's
  parents; the neighbour asked to be described rather than named. The farm's
  location and its water source are never published.

## How it works

Next.js 15 (App Router) and React 19 on Vercel, plain JavaScript; Supabase
for accounts, data and photos. **Five dependencies**: the framework three,
plus `@supabase/supabase-js` and `@supabase/ssr`, approved for Sprint 2 (see
`AGENTS.md`).

| | |
|---|---|
| Styling | one hand-written CSS file, `app/globals.css` — no framework |
| State | React's own `useState`; no state library |
| Data | Supabase Postgres, four tables (below), and a `photos` storage bucket |
| Auth | Supabase email and password |
| Search | a pure function over an array; no search library |

**Two editions.** English at the plain addresses, Khmer under `/km` — same
pages, same data. `middleware.js` maps English addresses onto `app/[lang]/`
without changing them; every string comes from `content/copy/`, with an `en`
and a `km` side.

### The tables

| Table | What it holds | Who writes it |
|---|---|---|
| `entries` | the twelve Field Notes | the curator only |
| `contributions` | Community Notes from every other account | their authors; status only through `review_entry()` |
| `profiles` | one display name per account | each person, their own row |
| `reviewers` | who may review (only the curator) | nobody through the site — the SQL Editor only |

### Statuses

A **Community Note** (`contributions.status`) is always one of three:

- `pending` — every new note, and every note its author edits. Only the author
  and the reviewer can see it.
- `published` — the reviewer published it. Everyone can see it.
- `returned` — the reviewer sent it back, with an optional note saying why;
  or took a published note down. Only the author and the reviewer can see it.
  The author edits it, and it goes back to `pending`.

A **Field Note** (`entries.status`) is `published` or `in-progress` (an entry
with an admitted gap). Anything else stays off the site. Field Notes are the
curator's own shelf and do not pass through the queue.

### Who may read and write what

Enforced by row-level security in the database, not by hiding buttons. Every
rule is in [`supabase/policies.sql`](supabase/policies.sql), a snapshot of the
live database.

- **Logged out:** read the Field Notes and published Community Notes; nothing
  else. Names are readable only for authors of a published note.
- **Any account:** add a Community Note, but only as `pending`, in its own
  name, with no review note. Edit or delete only its own notes; an edit must
  leave the note `pending`. Upload, list and delete photos only in its own
  folder of the `photos` bucket. Rename only itself.
- **Column grants** close what a policy alone would leave open: an author
  cannot write `review_note` or `created_at`, or change a note's owner or
  slug.
- **The reviewer** (a row in `reviewers`, checked by `is_reviewer()`) reads
  every note, and publishes, returns or takes down through `review_entry()`.
- **The curator** (`role: curator` in the account's app metadata, which a user
  cannot set) is the only account that writes Field Notes, and may delete any
  Community Note, but not rewrite one.
- **Check constraints** hold the form's rules again in the database: lengths,
  a known status, a photo URL inside the owner's own folder, a slug of
  `a-z0-9-` only, and display names that cannot fake the curator's tick.

### How it is laid out

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
  [lang]/my-entries/         My notes: your own Community Notes and their review status
  [lang]/review/             the review queue: pending notes, oldest first (reviewer only)
  [lang]/not-found.js  [lang]/[...rest]/   the 404, in both editions
  api/suggest/[lang]/        the nav search's index, fetched on first open
  sitemap.js  robots.js  globals.css
components/                  one component per file, ~80 lines or less
  EntrySearch, SearchBox, Pagination, SearchEmpty, EntryCard     browse and search
  EntryForm, FormField, PhotoField, ContributeForm, EditEntryForm, OwnerActions
  SentNotice, MyEntries, MyNote, NotesNews, NewsBadge             waiting for review
  ReviewQueue, ReviewItem, ReviewActions, ReviewerBanner, TakeDown   reviewing
  AuthForm, SignupForm, AuthStatus, AccountMenu, AccountMenuPanel, AccountPanel, NameForm,
  PasswordForm, SignInPrompt, VerifiedName (the curator's name with the site's tick)
  SiteNav, NavMenu, NavSearch, SearchSuggestions, LangSwitch, LangOnly, SiteFooter,
  SectionLabel, DurianGlyph, Reveal, ThemeToggle, Rich (a sentence with links, from copy)
lib/
  entries.js                 every read: rows → entries, cached static pages
  entry-rules.js  entry-row.js  signup-rules.js   validation and row shaping
  photo-upload.js  redraw-photo.js                 uploads; every photo redrawn first (smaller, no GPS)
  save-error.js  roles.js  use-edit-row.js         error wording, who may edit, the edit page's row
  use-note-news.js           the news badge: notes sent back or newly published
  i18n.js  use-lang.js       the two editions: localize(), pick() with English fallback
  suggest.js  use-session.js  use-search-handoff.js  use-dismiss.js  initial.js  actions.js
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
supabase/policies.sql        the live database rules (RLS, grants, constraints, functions), a snapshot
collection.config.js         archive identity: name, description, curator, source
entry-sketch.md              what one entry is, as data
```

**Pages never hardcode entry content.** They read the `entries` table through
`lib/entries.js`. Adding an entry is a row, not a deploy. The entry shape is
defined in [`entry-sketch.md`](entry-sketch.md).

### The search

`content/search-index.js` holds it as pure functions — `norm`, `buildIndex`,
`search` — with no React, because *which fields are searchable* is a decision
about the entry shape rather than about the box that displays it.

It matches against title, Khmer name, body, fig number, tags, **source
lines**, and the other edition's title and tags. Every word of the query must
appear somewhere in the entry, so `kampot drought` finds the entry about both
rather than everything about either. Browsing is paged, four to a page;
searching is not, because a query is already the reader narrowing the list.

Two things it handles that a naive `includes()` would not:

- **Khmer zero-width spaces.** U+200B is a real word separator in Khmer and some
  keyboards emit it, but `\s` does not match it — a pasted Khmer query would
  silently match nothing. Zero-width characters are stripped from both sides.
- **The field separator.** Fields join on a newline, which a single-line input
  cannot produce, so no query can match the separator and return everything.

## Sources and credits

Every photograph on this site is the curator's own work, taken in Kampot, or a
family photograph used with permission and credited as such. There is no
stock or licensed image anywhere in it. All of it is listed on
[`/sources`](https://kampot-durian.vercel.app/sources).

## Running it locally

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

Corrections are welcome.
