import { getEntries } from "../lib/entries.js";
import { siteUrl } from "../content/site.js";

/* Static, rebuilt in the background at most once a minute — see lib/entries.js. */
export const revalidate = 60;

/* Every route the guide has. The entry pages come from the same Supabase
   table the pages read, so a new entry appears here without an edit. If
   Supabase doesn't answer, the fixed pages are still listed. */
export default async function sitemap() {
  const base = siteUrl();
  const pages = ["", "/region", "/field-notes", "/about", "/sources"];
  const entries = (await getEntries()) ?? [];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" })),
    ...entries.map((note) => ({
      url: `${base}/field-notes/${note.slug}`,
      changeFrequency: "monthly",
    })),
  ];
}
