"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "../lib/use-lang.js";
import { basePath, localize, pick } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";
import { savePlace, restorePlace } from "../lib/keep-place.js";

/* EN / ខ្មែរ: the same page in the other edition. The choice is kept in a
   `lang` cookie for a year; middleware.js reads it at the front door only,
   so a shared English link still opens in English. The reader's place on
   the page comes along (lib/keep-place.js), like the theme toggle, which
   never leaves the page. */
export default function LangSwitch() {
  const lang = useLang();
  const router = useRouter();
  const path = usePathname() || "/";
  const other = lang === "km" ? "en" : "km";
  const t = pick(ui, lang).nav;
  const target = localize(other, basePath(path));
  useEffect(() => restorePlace(window.location.pathname), []);
  /* The href is the bare path (all the server knows); on click the query
     and hash come along, so a search in progress survives the switch. */
  const go = (event) => {
    document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
    savePlace(target);
    const { search, hash } = window.location;
    if (search || hash) {
      event.preventDefault();
      router.push(`${target}${search}${hash}`);
    }
  };
  return (
    <Link
      className="lang-switch"
      href={target}
      hrefLang={other}
      lang={other}
      aria-label={t.langSwitchLabel}
      onClick={go}
      scroll={false}
    >
      {t.langSwitch}
    </Link>
  );
}
