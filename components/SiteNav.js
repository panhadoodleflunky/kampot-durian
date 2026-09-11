import Link from "next/link";
import collection from "../collection.config.js";
import DurianGlyph from "./DurianGlyph.js";
import NavMenu from "./NavMenu.js";
import ThemeToggle from "./ThemeToggle.js";

/* The destinations of the guide. Home is the logo, so it is not repeated in
   the list. Search points at the Field Notes index, where the one search box
   lives; the #search hash tells it to focus the input on arrival. Keeping the
   box on that one page is deliberate — a box in the nav would make this a
   client component and ship the search index on every page of the site. */
const LINKS = [
  { href: "/region", label: "The Region" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/field-notes#search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/sources", label: "Sources" },
];

/* `current` is the href of the page rendering the nav, so the active link can
   be marked for screen readers without making this a client component.

   The inline links are the desktop nav. On a phone the whole row hides and
   NavMenu takes over — the old approach dropped three of the five links at
   that width and left those pages unreachable by touch. */
export default function SiteNav({ current }) {
  return (
    <nav className="gnav" aria-label="Site navigation">
      <div className="gnav-inner">
        <Link className="gnav-home" href="/">
          <span className="gnav-logo">
            <DurianGlyph />
          </span>
          <span className="gnav-name">{collection.name}</span>
        </Link>
        <span className="gnav-spacer" />
        <div className="gnav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
        <NavMenu links={LINKS} current={current} />
      </div>
    </nav>
  );
}
