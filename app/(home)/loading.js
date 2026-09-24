import SiteNav from "../../components/SiteNav.js";

/* Next's built-in loading-state file: shown automatically while the async
   Home component below it awaits Supabase, no client code required. The nav
   is drawn here too — pages draw their own, so without it the bar would
   vanish for the moment the page is loading. */
export default function Loading() {
  return (
    <>
      <SiteNav current="/" />
      <div className="inner">
        <p className="body-copy">Loading the guide…</p>
      </div>
    </>
  );
}
