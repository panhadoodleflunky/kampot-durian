import { getEntries } from "../lib/entries.js";
import { siteUrl } from "../content/site.js";
import { LANGS, localize } from "../lib/i18n.js";

export const revalidate = 60;

/* Every public page and every entry, in both editions; each URL lists its
   other-language twin so search engines pair them. If Supabase doesn't
   answer this throws, and the last good sitemap is served instead. */
export default async function sitemap() {
  const base = siteUrl();
  const pages = ["/", "/region", "/field-notes", "/about", "/sources"];
  const entries = await getEntries();
  const paths = [...pages, ...entries.map((note) => `/field-notes/${note.slug}`)];
  /* The absolute URL of a path in one edition; the home page is the bare
     domain in English and /km in Khmer. */
  const url = (lang, path) => {
    const local = localize(lang, path);
    return local === "/" ? base : `${base}${local}`;
  };
  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: url(lang, path),
      changeFrequency: "monthly",
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, url(l, path)])) },
    })),
  );
}
