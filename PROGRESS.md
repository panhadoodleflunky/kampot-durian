# Progress log

Work record for the Kampot Durian field guide, built for ICT 340 — Vibe
Coding, American University of Phnom Penh, Fall 2026. Newest first. The
finer grain is in the commit history; this is the shape of the work.

## 10–11 September 2026 — design polish

The site worked but looked unfinished. A full visual pass, checked
against rendered screenshots of every page at desktop and mobile widths:

- **One left edge for the whole site.** Reading columns were centred
  while page headings sat on the left-aligned grid, so body text started
  ~200px right of its own heading on About, Sources, Region, the home
  Method section, and every entry page. Everything now shares one axis.
- **The empty right third, used.** Entry pages moved their apparatus —
  sources, the record pointer, the subject pills — into a sticky right
  rail beside the text. Prose pages moved their section labels into a
  left rail. The text keeps its 720px measure; the page uses its width.
- **Full-width cards open as spreads** — title on the left, excerpt on
  the right (raised to 21px), tags and footer running the full card —
  instead of a half-empty block.
- **Broken drop caps removed.** The card cap was tearing the first word
  apart: "Ov Khak" opened as a giant O beside "v Khak".
- **The pull quote closes.** The oversized opening mark now has its
  mirror below the quote; the comma after "thirty years," is tied to the
  next word so a line break can never strand it.
- Smaller: tag pills centred in their band (were resting on the lower
  hairline); nav marks the current page; masthead spans its full rule;
  the sources strip is one line tall; default blue links and bare
  browser bullets styled; duplicate "read all" link removed.
- **Photograph-wanted markers.** The five entries with no image show a
  dev-only slot describing what to shoot and where the file goes.
  Production builds render nothing. The About page now derives its
  "five of the eleven entries have no photograph" count from the data
  instead of a hand-typed sentence that had already gone stale once.

## 9 September 2026 — interviews-only conversion

The guide dropped every outside source: seventeen citations, every
statistic, every reported event, one licensed photograph. What remains
is the two grower interviews (1 and 4 September) and the Khmer field
vocabulary, and the site says so where it matters. Copy tightened across
the home page and field notes; sources box and tag band reworked.

## 3–4 September 2026 — sprint 1 and the second sitting

Grower interview material into the entries; three entries rewritten,
then all eleven covered by the second sitting (220 questions). Browse
search, pagination, editorial pass, provenance fixes. Working notes
moved out of the repository; README rewritten to describe this guide.

## 21–29 August 2026 — foundation

Starter customised into the Kampot Durian archive theme; EntryCard
component with missing-field fallbacks and Khmer support; rebuild as a
sourced field guide with fabricated content removed; real Kampot
photography.

## Still open

- Merge `interview-only` into `main` and deploy the live site.
- Photographs for the five marked entries.
- Image weight: ~3 MB of JPEG still served through plain `<img>`.
- The Khmer edition — the field vocabulary is recorded and waiting.
