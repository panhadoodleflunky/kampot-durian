import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import photos from "../content/photos.js";
import { pick } from "./i18n.js";
import { ui } from "../content/copy/ui.js";

/* Reading entries needs no session: the select policy is "anyone can read".
   So this is a plain client that never touches cookies, not the one in
   lib/supabase/server.js. Reading cookies would force every page that shows
   entries to be rendered per request, a round trip to Supabase on every
   visit. Without them the pages stay static and are rebuilt in the
   background (see `revalidate` on each page), so a reader gets ready-made
   HTML and a new row still shows up within a minute, no deploy. */
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false } },
  );
}

/* Maps one `entries` row back to the note shape entry-sketch.md defines —
   the shape EntryCard and search-index.js already read. `body` and `sources`
   went into Postgres flattened (Lab 6 Part 2: paragraphs joined on a blank
   line, sources joined on "; "); this is where they come back apart.

   The table stores a photograph as its path alone. For the original seven,
   size, alt and caption come from content/photos.js. A contributed photo is
   a full URL into the `photos` bucket instead (Lab 7), with no line in that
   file; see bucketPhoto below. Anything else renders no photograph.

   In the Khmer edition the *_km columns are read instead where they are
   filled; a row with no translation yet shows its English, never a blank.
   Community notes have no *_km columns and always show as their author
   wrote them. */
function toNote(row, lang = "en") {
  const km = lang === "km";
  const text = (field) => (km && row[`${field}_km`]) || row[field];
  return {
    id: row.id,
    owner: row.owner,
    photoUrl: row.photo_url,
    slug: row.slug,
    figNumber: row.fig_number,
    title: text("title"),
    khmerName: row.khmer_name || "",
    /* A row added by hand in the table editor can leave either one empty;
       a missing value renders as an empty entry, not a crashed site. */
    body: (text("body") || "").split("\n\n"),
    sources: text("sources") ? text("sources").split("; ").map((source) => ({ text: source })) : [],
    image: localPhoto(photos[row.photo_url], km) ?? bucketPhoto(row, km),
    tags: km && row.tags_km?.length ? row.tags_km : row.tags || [],
    status: row.status,
  };
}

/* A photo uploaded through the contribute form. Only a URL inside this
   project's own `photos` bucket is shown: a row pointed at some other site
   (possible from the console, not from the form) renders no photograph,
   and next.config.mjs would refuse to load it anyway.

   Nobody measured it, so the width and height are a 4:3 placeholder that
   reserves roughly the right space; the global `img { height: auto }` then
   lets the photograph keep its own proportions once it arrives. The alt is
   the entry's title, the one thing the contributor did say about it. */
const BUCKET = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/`;

function bucketPhoto(row, km) {
  if (!row.photo_url?.startsWith(BUCKET)) return null;
  const title = (km && row.title_km) || row.title;
  return {
    src: row.photo_url,
    width: 1200,
    height: 900,
    alt: pick(ui, km ? "km" : "en").community.photoAlt(title),
    caption: "",
  };
}

/* A photograph from public/, with its Khmer alt and caption in the Khmer
   edition (content/photos.js keeps both). */
function localPhoto(photo, km) {
  if (!photo) return null;
  const { km: khmer, ...english } = photo;
  return km && khmer ? { ...english, ...khmer } : english;
}

/* The two statuses entry-sketch.md defines. Anything else — a "draft" typed
   into the table editor, say — stays off the site instead of going live. */
const SHOWN = ["published", "in-progress"];

/* All entries, in catalogue order. `fig_number` rather than `created_at`:
   the eleven seeded rows share one timestamp (one transaction), which leaves
   "newest first" with no defined order at all, and the index is laid out as a
   catalogue — numbered cards, a variant cycle, four to a page.

   Sorted here, numerically, not by Postgres: the column is text, so "9" would
   sort after "11" and "100" before "11". A numeric compare puts "9" and "09"
   in the same place.

   Throws if Supabase is unreachable or asleep. That is deliberate: when a
   page rebuilding in the background throws, Next keeps serving the last good
   copy. Returning a "didn't answer" page instead would be cached as the page
   itself, with a 200, for every reader until the next rebuild. (Reproduced
   25 September 2026 with a proxy in front of Supabase: kill it, and the entry
   page became the outage message as a cache HIT.)

   Where there is no good copy, a throw is still the honest answer. At build
   time it fails the build, so a deploy never ships the outage message and
   Vercel keeps the last deployment live. A page nobody has asked for yet (a
   brand-new slug) gets Next's plain 500 on a direct load; followed from a
   link inside the site, the link simply doesn't go anywhere until Supabase
   answers. Neither is cached, and both were checked the same day. An
   app/error.js "archive didn't answer" page was tried and removed: Next
   never reaches it in either case.

   Wrapped in React's `cache` so a page and its generateMetadata share one
   request per render instead of asking Supabase twice. */
export const getEntries = cache(async (lang = "en") => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .in("status", SHOWN);

  if (error) throw new Error(`getEntries: ${error.message}`);
  return data
    .map((row) => toNote(row, lang))
    .sort((a, b) =>
      String(a.figNumber ?? "").localeCompare(String(b.figNumber ?? ""), "en", { numeric: true }),
    );
});

/* Community notes: the `contributions` table, everyone's shelf but the
   curator's (Lab 7). Same note shape as a field note, so the same card and
   page pieces can show it, plus the author's display name from `profiles`.
   No catalogue number and no status — newest first.

   Throws on failure for the same reason getEntries does. */
export const getContributions = cache(async (lang = "en") => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("contributions")
    .select("*, profiles(display_name)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`getContributions: ${error.message}`);
  return data.map((row) => ({
    ...toNote(row, lang),
    figNumber: null,
    status: null,
    author: row.profiles?.display_name ?? pick(ui, lang).community.reader,
    createdAt: row.created_at,
  }));
});
