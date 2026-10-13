"use client";

import { useParams } from "next/navigation";
import { isLang, DEFAULT_LANG } from "./i18n.js";

/* Which edition a client component is in, read from the [lang] segment. */
export function useLang() {
  const { lang } = useParams() ?? {};
  return isLang(lang) ? lang : DEFAULT_LANG;
}
