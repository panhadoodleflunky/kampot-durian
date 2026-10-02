import { parseTags } from "./entry-rules.js";

/* The columns a contributor's form fills in, cleaned the same way for an
   insert and an edit, so the two forms can't drift apart. Named columns
   only — never the form object spread into the table.

   - body: Windows line endings made plain, and runs of blank lines cut to
     one, because lib/entries.js splits paragraphs on exactly one blank line.
   - sources: split on semicolons however they were typed ("a;b", "a ; b")
     and joined back with "; ", the separator lib/entries.js splits on. */
export function entryColumns(fields) {
  return {
    title: fields.title,
    khmer_name: fields.khmerName || null,
    body: fields.body.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n"),
    sources: fields.sources
      .split(";")
      .map((source) => source.trim())
      .filter(Boolean)
      .join("; "),
    tags: parseTags(fields.tags),
  };
}

/* The next catalogue number for a new field note: one past the highest so
   far, two digits like the rest ("12"). fig_number is text in the table, so
   it is compared as a number here. Not unique in the table, so two entries
   saved in the same second can share one; the catalogue still sorts and
   shows both. */
export async function nextFigNumber(supabase) {
  const { data, error } = await supabase.from("entries").select("fig_number");
  if (error) throw error;
  const highest = Math.max(0, ...data.map((row) => parseInt(row.fig_number, 10) || 0));
  return String(highest + 1).padStart(2, "0");
}
