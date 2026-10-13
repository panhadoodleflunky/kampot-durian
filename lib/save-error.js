import { pick } from "./i18n.js";
import { forms } from "../content/copy/forms.js";

/* What the reader is told when a save fails. The real error always goes to
   console.error for whoever is debugging; the screen gets a sentence the
   reader can act on and nothing an attacker can learn from — no table names,
   no constraint names, no Postgres wording. */
export function saveError(where, failed, lang = "en") {
  console.error(`${where}:`, failed);
  const t = pick(forms, lang).save;

  if (failed?.name === "AuthRetryableFetchError" || failed instanceof TypeError) {
    return t.offline;
  }
  /* 42501: row-level security said no. Usually an expired session. */
  if (failed?.code === "42501" || failed?.statusCode === "403") {
    return t.denied;
  }
  /* 23514: a check constraint said no — the form's rules, enforced again by
     the database. */
  if (failed?.code === "23514") {
    return t.rules;
  }
  return t.other;
}
