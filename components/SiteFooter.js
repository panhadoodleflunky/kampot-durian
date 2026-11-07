import Link from "next/link";
import collection from "../collection.config.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";
import VerifiedName from "./VerifiedName.js";

/* The footer used to print every photograph caption in full, on every
   page — a hundred words of repetition under every entry. The credits belong
   on the Sources page, which lists them properly. The paragraph about the
   course and the interviews went too (owner, 30 Oct 2026): the Sources and
   About pages say it in full. */
export default function SiteFooter({ lang = "en" }) {
  const t = pick(ui, lang).footer;
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-bottom">
          <span>
            {t.compiledBy} <VerifiedName name={collection.curator} lang={lang} />
          </span>
          <span aria-hidden="true">·</span>
          <span>{t.place(collection.province)}</span>
          <span aria-hidden="true">·</span>
          <Link href={localize(lang, "/")}>{t.back}</Link>
        </div>
      </div>
    </footer>
  );
}
