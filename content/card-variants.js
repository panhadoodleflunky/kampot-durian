/* How the Field Notes index varies its card treatment. Pure functions, kept
   beside search-index.js rather than inside a component, so the grid rule can
   be read and tested without rendering anything. */

/* Card treatment repeats every five entries rather than every one, so the
   index reads as a laid-out page instead of a list of identical blocks. */
export const VARIANTS = ["lead", "plain", "brief", "brief", "plain"];

/* Entries per page when browsing. Four, which puts the eleven entries across
   three pages and lands each page on one full turn of the variant cycle:
   lead, plain, brief, brief. Searching is not paged — a query is already the
   reader narrowing the list, and paging their matches would hide results
   behind a control they did not ask for. */
export const PER_PAGE = 4;

/* Positions 2 and 3 of the cycle are the paired half-width cards. A filtered
   result can stop on position 2, leaving its partner unrendered and half the
   row empty — search "ov khak" (3 results) and you would see it. A dangling
   first-of-pair is promoted to full width so every result set ends flush. */
export function variantFor(i, total) {
  const v = VARIANTS[i % VARIANTS.length];
  const dangling = v === "brief" && i % VARIANTS.length === 2 && i === total - 1;
  return dangling ? "plain" : v;
}

/* Total pages for a list, never less than one — an empty list still renders
   "page 1 of 1" rather than "page 1 of 0". */
export function pageCount(total, perPage = PER_PAGE) {
  return Math.max(Math.ceil(total / perPage), 1);
}
