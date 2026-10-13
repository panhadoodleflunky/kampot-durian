import Link from "next/link";
import { localize } from "../lib/i18n.js";

/* A sentence from content/copy/ with links in it, kept as data so both
   editions can be translated without touching JSX: plain strings, and
   { href, text } for a link (written as the English path; localized here).
   { curator: true } stands for the curator's name. */
export default function Rich({ parts, lang, curator }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return part;
        if (part.curator) return curator;
        return (
          <Link key={i} href={localize(lang, part.href)}>
            {part.text}
          </Link>
        );
      })}
    </>
  );
}
