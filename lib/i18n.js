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

/* The English path behind a URL path from either edition. /en/... is
   included because that is the path a page sees on the server, after
   middleware.js has rewritten an English address onto app/[lang]/. */
export function basePath(pathname) {
  for (const prefix of ["/km", "/en"]) {
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

/* `copy` is { en, km }. Falls back to English for any key the Khmer copy
   does not have, at every depth, so a missing translation shows English,
   never nothing. Arrays and functions are taken whole. */
const isGroup = (v) => v && typeof v === "object" && !Array.isArray(v);

function merge(english, khmer) {
  const out = { ...english };
  for (const [key, value] of Object.entries(khmer)) {
    out[key] = isGroup(value) && isGroup(english[key]) ? merge(english[key], value) : value;
  }
  return out;
}

export function pick(copy, lang) {
  return lang === "km" ? merge(copy.en, copy.km || {}) : copy.en;
}

/* hreflang alternates for a page's metadata. */
export function alternates(lang, path) {
  return {
    canonical: localize(lang, path),
    languages: { en: path, km: localize("km", path) },
  };
}
