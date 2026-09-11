"use client";

/* The sun/moon switch in the nav. Dark is the site's native look; this lets
   a reader flip to cream paper and keeps the choice in localStorage, where
   the inline script in app/layout.js reads it back before first paint.

   Deliberately stateless: both icons are always in the tree and CSS decides
   which shows from html[data-theme], so the server and client render the
   same markup and there is nothing to hydrate wrongly. */
export default function ThemeToggle() {
  const flip = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private browsing — the switch still works for this page view */
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Switch between dark and light mode"
      onClick={flip}
    >
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.4" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
      </svg>
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.4 13.7A8.4 8.4 0 0 1 10.3 3.6a8.4 8.4 0 1 0 10.1 10.1Z" />
      </svg>
    </button>
  );
}
