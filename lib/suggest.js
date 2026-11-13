import { norm } from "../content/search-index.js";
import { pick, localize } from "./i18n.js";
import { ui } from "../content/copy/ui.js";

/* The nav search's suggestions. Pure functions, like content/search-index.js,
   so the ranking can be read and checked without React. */

/* Pages a reader might type the name of (content/copy/ui.js). They ship
   with the nav component; the entries arrive from /api/suggest/<lang> only
   when the search is opened. */
export function pageRows(lang) {
  return pick(ui, lang).navSearch.pages.map((page) => ({
    ...page,
    href: localize(lang, page.href),
    key: norm(page.title),
    text: "",
  }));
}

/* One entry as a suggestion row, built on the server. `key` is what the
   reader probably means (title, Khmer name, tags); `text` is everything else
   worth matching (the body and the fig number). */
export function toRow(note, lang = "en") {
  return {
    href: localize(lang, `/field-notes/${note.slug}`),
    title: note.title,
    hint: pick(ui, lang).navSearch.fig(note.figNumber),
    key: norm([note.title, note.khmerName, ...(note.tags || []), ...(note.otherLanguage || [])].join(" ")),
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
