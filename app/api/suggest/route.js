import { getEntries } from "../../../lib/entries.js";
import { toRow } from "../../../lib/suggest.js";

/* The entries, trimmed to what the nav search matches on. Fetched by the
   browser the first time the search opens, never as part of a page, so the
   pages themselves stay as light as before. Built statically and rebuilt at
   most once a minute, like the pages. */
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const notes = await getEntries();
  return Response.json(notes.map(toRow));
}
