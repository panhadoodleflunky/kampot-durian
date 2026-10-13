import Link from "next/link";
import AuthStatus from "./AuthStatus.js";
import DurianGlyph from "./DurianGlyph.js";
import LangSwitch from "./LangSwitch.js";
import NavMenu from "./NavMenu.js";
import NavSearch from "./NavSearch.js";
import ThemeToggle from "./ThemeToggle.js";
import { pick, localize } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* The destinations of the guide (content/copy/ui.js). Home is the logo, so
   it is not repeated in the list. Search is not a link: NavSearch, the
   magnifier at the end of the bar, opens it from any page, and fetches its
   index only when opened, so SiteNav stays a server component and no page
   carries it.

   `current` is the English href of the page rendering the nav, so the
   active link can be marked for screen readers in either edition without
   making this a client component.

   The inline links are the desktop nav. On a phone the whole row hides and
   NavMenu takes over — the old approach dropped three of the five links at
   that width and left those pages unreachable by touch. */
export default function SiteNav({ lang = "en", current }) {
  const t = pick(ui, lang);
  const links = t.nav.links.map((link) => ({ ...link, to: localize(lang, link.href) }));
  return (
    <nav className="gnav" aria-label={t.nav.label}>
      <div className="gnav-inner">
        <Link className="gnav-home" href={localize(lang, "/")}>
          <span className="gnav-logo">
            <DurianGlyph />
          </span>
          <span className="gnav-name">{t.siteName}</span>
        </Link>
        <span className="gnav-spacer" />
        <div className="gnav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.to}
              aria-current={current === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <AuthStatus />
        <NavSearch />
        <LangSwitch />
        <ThemeToggle />
        <NavMenu links={links} current={current} />
      </div>
    </nav>
  );
}
