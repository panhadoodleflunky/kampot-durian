import Link from "next/link";
import collection from "../collection.config.js";
import AuthStatus from "./AuthStatus.js";
import DurianGlyph from "./DurianGlyph.js";
import NavMenu from "./NavMenu.js";
import NavSearch from "./NavSearch.js";
import ThemeToggle from "./ThemeToggle.js";

/* The destinations of the guide. Home is the logo, so it is not repeated in
   the list. Search is not a link any more: NavSearch, the magnifier at the
   end of the bar, opens it from any page, and fetches its index only when
   opened, so SiteNav stays a server component and no page carries it. */
const LINKS = [
  { href: "/region", label: "The Region" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/contributed", label: "Community" },
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
        <AuthStatus />
        <NavSearch />
        <ThemeToggle />
        <NavMenu links={LINKS} current={current} />
      </div>
    </nav>
  );
}
