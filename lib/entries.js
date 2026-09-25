import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import photos from "../content/photos.js";

/* Reading entries needs no session: the select policy is "anyone can read".
   So this is a plain client that never touches cookies, not the one in
   lib/supabase/server.js. Reading cookies would force every page that shows
   entries to be rendered per request, a round trip to Supabase on every
   visit. Without them the pages stay static and are rebuilt in the
   background (see `revalidate` on each page), so a reader gets ready-made
   HTML and a new row still shows up within a minute, no deploy. */
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false } },
  );
}

/* Maps one `entries` row back to the note shape entry-sketch.md defines —
   the shape EntryCard and search-index.js already read. `body` and `sources`
   went into Postgres flattened (Lab 6 Part 2: paragraphs joined on a blank
   line, sources joined on "; "); this is where they come back apart.

   The table stores a photograph as its path alone. Its size, alt and caption
   come from content/photos.js; a path with no line there renders no
   photograph rather than one next/image cannot size. */
function toNote(row) {
  return {
    slug: row.slug,
    figNumber: row.fig_number,
    title: row.title,
    khmerName: row.khmer_name || "",
    /* A row added by hand in the table editor can leave either one empty;
       a missing value renders as an empty entry, not a crashed site. */
    body: (row.body || "").split("\n\n"),
    sources: row.sources ? row.sources.split("; ").map((text) => ({ text })) : [],
    image: photos[row.photo_url] ?? null,
    tags: row.tags || [],
    status: row.status,
  };
}

/* The two statuses entry-sketch.md defines. Anything else — a "draft" typed
   into the table editor, say — stays off the site instead of going live. */
const SHOWN = ["published", "in-progress"];

/* All entries, in catalogue order. `fig_number` rather than `created_at`:
   the eleven seeded rows share one timestamp (one transaction), which leaves
   "newest first" with no defined order at all, and the index is laid out as a
   catalogue — numbered cards, a variant cycle, four to a page.

   Sorted here, numerically, not by Postgres: the column is text, so "9" would
   sort after "11" and "100" before "11". A numeric compare puts "9" and "09"
   in the same place.

   Throws if Supabase is unreachable or asleep. That is deliberate: when a
   page rebuilding in the background throws, Next keeps serving the last good
   copy. Returning a "didn't answer" page instead would be cached as the page
   itself, with a 200, for every reader until the next rebuild. (Reproduced
   25 September 2026 with a proxy in front of Supabase: kill it, and the entry
   page became the outage message as a cache HIT.)

   Where there is no good copy, a throw is still the honest answer. At build
   time it fails the build, so a deploy never ships the outage message and
   Vercel keeps the last deployment live. A page nobody has asked for yet (a
   brand-new slug) gets Next's plain 500 on a direct load; followed from a
   link inside the site, the link simply doesn't go anywhere until Supabase
   answers. Neither is cached, and both were checked the same day. An
   app/error.js "archive didn't answer" page was tried and removed: Next
   never reaches it in either case.

   Wrapped in React's `cache` so a page and its generateMetadata share one
   request per render instead of asking Supabase twice. */
export const getEntries = cache(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .in("status", SHOWN);

  if (error) throw new Error(`getEntries: ${error.message}`);
  return data
    .map(toNote)
    .sort((a, b) =>
      String(a.figNumber ?? "").localeCompare(String(b.figNumber ?? ""), "en", { numeric: true }),
    );
});
