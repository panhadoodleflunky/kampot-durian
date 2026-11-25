"use client";

import Link from "next/link";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";
import { ui } from "../content/copy/ui.js";

/* The edit page when there is nothing to edit, never a dead end: an entry
   that isn't yours sends you back to it; an address with no entry sends you
   to the list of its shelf. */
export default function EditDeadEnd({ status, table, basePath, slug }) {
  const lang = useLang();
  const t = pick(forms, lang).edit;
  const shelf = pick(ui, lang)[table === "contributions" ? "community" : "entry"];
  const [text, href, label] =
    status === "missing" ? [t.missing, basePath, shelf.back] : [t.notYours, `${basePath}/${slug}`, t.backToEntry];

  return (
    <div className="prompt-card">
      <p className="body-copy">{text}</p>
      <div className="auth-actions">
        <Link className="btn" href={localize(lang, href)}>
          {label}
        </Link>
      </div>
    </div>
  );
}
