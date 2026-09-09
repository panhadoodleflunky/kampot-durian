/* How a Field Note is matched against a search query.

   This lives in content/, not components/, because which fields are
   searchable is a decision about the entry shape (entry-sketch.md), not about
   the box that displays it. Pure functions, no React — so the search can be
   reasoned about, and checked, on its own. */

/* Lower-case for Latin (Khmer has no case, so the fold is a no-op there), and
   drop zero-width characters. That last part is the Khmer one: ZWSP is a real
   word separator in Khmer and some keyboards emit it, so a pasted query can
   carry breaks the stored text does not have. Removing them from both sides
   compares the letters rather than the invisible marks. */
const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

export const norm = (s) =>
  typeof s === "string" ? s.normalize("NFC").replace(ZERO_WIDTH, "").toLowerCase() : "";

/* What this archive treats as searchable: the title and Khmer name (what a
   reader knows the fruit by), the body (where the method lives), the tags and
   fig number (how the guide files things), and the source lines — in a guide
   whose whole claim is traceability, "which entries rest on the second
   sitting" is a real question.

   Fields join on a newline, which a single-line input cannot produce, so no
   query can match the separator and return everything. */
function haystack(note) {
  return [
    note.title,
    note.khmerName,
    ...(Array.isArray(note.body) ? note.body : [note.body]),
    note.figNumber,
    ...(note.tags || []),
    ...(note.sources || []).map((s) => s.text),
  ]
    .map(norm)
    .join("\n");
}

/* Normalised text per entry, built once rather than per keystroke. */
export function buildIndex(notes) {
  return notes.map((note) => ({ note, text: haystack(note) }));
}

/* Every word must appear somewhere in the entry, in any order: "kampot
   drought" finds the entry about both, not everything about either. An empty
   or whitespace-only query is not a search — it returns the whole guide. */
export function search(index, query) {
  const q = norm(query).trim();
  if (!q) return index.map((row) => row.note);
  const words = q.split(/\s+/);
  return index.filter(({ text }) => words.every((w) => text.includes(w))).map((r) => r.note);
}

/* True when the query is a real search, as opposed to blank or just spaces —
   the count line reads differently in the two cases. */
export function isQuery(query) {
  return norm(query).trim().length > 0;
}
