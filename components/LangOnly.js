"use client";

import { useLang } from "../lib/use-lang.js";

/* Shows its children only in the named edition. For the 404, which Next
   renders into every page's tree ahead of time: reading the edition on the
   server there (headers()) made every page on the site dynamic. So the 404
   is rendered in both languages, statically, and this picks one. */
export default function LangOnly({ lang, children }) {
  return useLang() === lang ? children : null;
}
