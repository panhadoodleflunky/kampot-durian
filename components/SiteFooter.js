import Link from "next/link";
import collection from "../collection.config.js";

/* The footer used to print all seven photograph captions in full, on every
   page — a hundred words of repetition under every entry. The credits belong
   on the Sources page, which lists them properly; the footer just points
   there. */
export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <p className="foot-fine">
          A student field guide built for ICT 340 — Vibe Coding at the American
          University of Phnom Penh, Fall 2026. Compiled from interviews with
          Rasmey and Vanny, who own and work a durian orchard in Teuk Chhou
          district, Kampot. Photographs by{" "}
          {collection.curator}. Interviews and credits in full on{" "}
          <Link href="/sources">Sources &amp; Credits</Link>.
        </p>
        <div className="foot-bottom">
          <span>Compiled by {collection.curator}</span>
          <span aria-hidden="true">·</span>
          <span>{collection.province}, Cambodia</span>
          <span aria-hidden="true">·</span>
          <Link href="/">Back to the guide</Link>
        </div>
      </div>
    </footer>
  );
}
