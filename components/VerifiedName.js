import { pick } from "../lib/i18n.js";
import { ui } from "../content/copy/ui.js";

/* The curator's name with the site's tick beside it (owner, 30 Oct 2026).
   "Sovanpanha" is a common name, so names aren't unique; instead the real
   curator is marked. The tick is drawn here, never typed: no display name
   may hold a tick or claim to be verified (lib/signup-rules.js and the
   profiles constraint), so a reader can tell the curator from a namesake. */
export default function VerifiedName({ name, lang = "en" }) {
  const label = pick(ui, lang).verified;
  return (
    <span className="verified-name">
      {name}
      <svg className="verified-tick" viewBox="0 0 16 16" role="img" aria-label={label}>
        <title>{label}</title>
        <circle cx="8" cy="8" r="8" />
        <path d="M4.6 8.3 7 10.6 11.4 5.6" />
      </svg>
    </span>
  );
}
