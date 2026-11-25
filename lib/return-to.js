import { basePath, localize } from "./i18n.js";

/* Where to go after logging in or signing up: back to the page the reader
   was on when they pressed Log in or Sign up, or the front page if there is
   none. Noted on the click (rememberPage), used once (returnPath). Only a
   path on this site is ever kept, so no link can send a reader elsewhere.
   sessionStorage: this tab only. */
const KEY = "return-to";
const AUTH_PAGES = ["/login", "/signup"];

export function rememberPage() {
  const { pathname, search } = window.location;
  if (AUTH_PAGES.includes(basePath(pathname))) return;
  try {
    sessionStorage.setItem(KEY, pathname + search);
  } catch {}
}

/* The saved page, in the edition the reader is in now. */
export function returnPath(lang) {
  let saved = "";
  try {
    saved = sessionStorage.getItem(KEY) || "";
    sessionStorage.removeItem(KEY);
  } catch {}
  if (!saved.startsWith("/") || saved.startsWith("//")) return localize(lang, "/");
  const [pathname, search = ""] = saved.split(/(?=\?)/);
  return localize(lang, basePath(pathname)) + search;
}
