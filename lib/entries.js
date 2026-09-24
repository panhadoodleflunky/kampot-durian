import { createClient } from "./supabase/server.js";

/* Maps one `entries` row back to the note shape entry-sketch.md defines —
   the shape EntryCard and search-index.js already read. `body` and `sources`
   went into Postgres flattened (Lab 6 Part 2: paragraphs joined on a blank
   line, sources joined on "; "); this is where they come back apart. */
function toNote(row) {
  return {
    slug: row.slug,
    figNumber: row.fig_number,
    title: row.title,
    khmerName: row.khmer_name || "",
    body: row.body.split("\n\n"),
    sources: row.sources.split("; ").map((text) => ({ text })),
    image: row.photo_url ? { src: row.photo_url } : null,
    tags: row.tags || [],
    status: row.status,
  };
}

/* All entries, newest first. Empty array — not a throw — if Supabase is
   unreachable or asleep; callers decide what "no entries" looks like rather
   than a page crashing on a network hiccup. */
export async function getEntries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getEntries:", error.message);
    return [];
  }
  return data.map(toNote);
}
