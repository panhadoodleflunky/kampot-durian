import Link from "next/link";
import collection from "../collection.config.js";
import Rich from "./Rich.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* The footer used to print all seven photograph captions in full, on every
   page — a hundred words of repetition under every entry. The credits belong
   on the Sources page, which lists them properly; the footer just points
   there. */
export default function SiteFooter({ lang = "en" }) {
  const t = pick(ui, lang).footer;
  return (
    <footer className="foot">
      <div className="foot-inner">
        <p className="foot-fine">
          <Rich parts={t.fine} lang={lang} curator={collection.curator} />
        </p>
        <div className="foot-bottom">
          <span>{t.compiledBy(collection.curator)}</span>
          <span aria-hidden="true">·</span>
          <span>{t.place(collection.province)}</span>
          <span aria-hidden="true">·</span>
          <Link href={localize(lang, "/")}>{t.back}</Link>
        </div>
      </div>
    </footer>
  );
}
