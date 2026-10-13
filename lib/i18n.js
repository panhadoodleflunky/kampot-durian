/* The two editions. English keeps the addresses it always had (/about);
   Khmer lives under /km (/km/about). middleware.js maps the English
   addresses onto app/[lang]/ with lang "en", so a page never needs to know
   which address it was reached by.

   Copy lives in content/copy/, one file per area, each { en, km }. */
export const LANGS = ["en", "km"];
export const DEFAULT_LANG = "en";

export const isLang = (value) => LANGS.includes(value);

/* A site path as it is written in this edition. `path` is the English one,
   always starting with "/"; a #hash or ?query rides along. */
export function localize(lang, path) {
  if (lang !== "km") return path;
  return path === "/" ? "/km" : `/km${path}`;
}

/* The English path behind a URL path from either edition. */
export function basePath(pathname) {
  if (pathname === "/km") return "/";
  return pathname.startsWith("/km/") ? pathname.slice(3) : pathname;
}

/* `copy` is { en, km }. Falls back to English for any key the Khmer copy
   does not have — one level into nested groups too — so a missing
   translation shows English, never nothing. */
const isGroup = (v) => v && typeof v === "object" && !Array.isArray(v);

export function pick(copy, lang) {
  if (lang !== "km") return copy.en;
  const out = { ...copy.en };
  for (const [key, value] of Object.entries(copy.km || {})) {
    out[key] = isGroup(value) && isGroup(copy.en[key]) ? { ...copy.en[key], ...value } : value;
  }
  return out;
}

/* hreflang alternates for a page's metadata. */
export function alternates(lang, path) {
  return {
    canonical: localize(lang, path),
    languages: { en: path, km: localize("km", path) },
  };
}
