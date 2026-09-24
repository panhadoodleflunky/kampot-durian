import { cache } from "react";
import { createClient } from "./supabase/server.js";
import photos from "../content/photos.js";

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
    body: row.body.split("\n\n"),
    sources: row.sources.split("; ").map((text) => ({ text })),
    image: photos[row.photo_url] ?? null,
    tags: row.tags || [],
    status: row.status,
  };
}

/* All entries, in catalogue order. `fig_number` rather than `created_at`:
   the eleven seeded rows share one timestamp (one transaction), which leaves
   "newest first" with no defined order at all, and the index is laid out as a
   catalogue — numbered cards, a variant cycle, four to a page.

   `null` — not a throw, and not `[]` — if Supabase is unreachable or asleep,
   so a page can tell "the archive didn't answer" from "the archive is empty".

   Wrapped in React's `cache` so a page and its generateMetadata share one
   request per render instead of asking Supabase twice. */
export const getEntries = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .order("fig_number", { ascending: true });

  if (error) {
    console.error("getEntries:", error.message);
    return null;
  }
  return data.map(toNote);
});
