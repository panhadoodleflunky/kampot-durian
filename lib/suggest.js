import { norm } from "../content/search-index.js";

/* The nav search's suggestions. Pure functions, like content/search-index.js,
   so the ranking can be read and checked without React. */

/* Pages a reader might type the name of. They ship with the nav component;
   the entries arrive from /api/suggest only when the search is opened. */
export const PAGES = [
  { href: "/field-notes", title: "Field Notes", hint: "Every entry" },
  { href: "/region", title: "The Region", hint: "The orchard, counted" },
  { href: "/contributed", title: "Community Notes", hint: "Notes from readers" },
  { href: "/about", title: "About the Project", hint: "How this was made" },
  { href: "/sources", title: "Sources & Credits", hint: "The interviews and photographs" },
].map((page) => ({ ...page, key: norm(page.title), text: "" }));

/* One entry as a suggestion row, built on the server. `key` is what the
   reader probably means (title, Khmer name, tags); `text` is everything else
   worth matching (the body and the fig number). */
export function toRow(note) {
  return {
    href: `/field-notes/${note.slug}`,
    title: note.title,
    hint: `Fig. ${note.figNumber}`,
    key: norm([note.title, note.khmerName, ...(note.tags || [])].join(" ")),
    text: norm([note.figNumber, ...note.body].join(" ")),
  };
}

/* Every query word must appear somewhere in the row, as in the Field Notes
   search. Rows whose title starts with the query rank first, then matches in
   the title, Khmer name or tags, then matches only in the body. */
export function suggest(rows, query, limit = 6) {
  const q = norm(query).trim();
  if (!q) return [];
  const words = q.split(/\s+/);
  return rows
    .map((row) => {
      if (!words.every((w) => row.key.includes(w) || row.text.includes(w))) return null;
      const score = row.key.startsWith(q) ? 3 : words.every((w) => row.key.includes(w)) ? 2 : 1;
      return { row, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ row }) => row);
}
