import { getEntries } from "../../../../lib/entries.js";
import { toRow } from "../../../../lib/suggest.js";
import { LANGS, isLang } from "../../../../lib/i18n.js";

/* The entries of one edition, trimmed to what the nav search matches on.
   Fetched by the browser the first time the search opens, never as part of
   a page, so the pages themselves stay as light as before. Built statically
   and rebuilt at most once a minute, like the pages. */
export const dynamic = "force-static";
export const revalidate = 60;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function GET(_request, { params }) {
  const { lang } = await params;
  if (!isLang(lang)) return new Response("Not found", { status: 404 });
  const notes = await getEntries(lang);
  return Response.json(notes.map((note) => toRow(note, lang)));
}
