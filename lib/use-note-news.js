"use client";

import { useEffect, useState } from "react";
import { supabase } from "./use-session.js";

/* What the reader should know about their own community notes: how many
   were sent back (still to fix) and how many were published since My notes
   last showed them. One small query of the reader's own rows, made in the
   browser like the login state, so every page stays static. The select
   policy only ever returns the reader's own notes and published ones; the
   owner filter keeps it to their own.

   "Seen" is a list of published note ids kept in this browser
   (localStorage). It is a convenience, not a record: on a new phone the
   published news shows once more. */
const EMPTY = { returned: 0, published: 0, total: 0 };
const seenKey = (userId) => `seen-published:${userId}`;

export function readSeen(userId) {
  try {
    return JSON.parse(localStorage.getItem(seenKey(userId)) || "[]");
  } catch {
    return [];
  }
}

/* My notes calls this once it has shown the list; every badge clears. */
export function markSeen(userId, ids) {
  try {
    localStorage.setItem(seenKey(userId), JSON.stringify(ids));
  } catch {}
  cache = null;
  window.dispatchEvent(new Event("notes-seen"));
}

export function newsFrom(notes, seen) {
  const returned = notes.filter((n) => n.status === "returned").length;
  const published = notes.filter((n) => n.status === "published" && !seen.includes(n.id)).length;
  return { returned, published, total: returned + published };
}

/* One request shared by every badge on the page (the bar, the phone menu),
   kept per account so a log-in or log-out asks again. */
let cache = null;
async function load() {
  const client = await supabase();
  const { data } = await client.auth.getSession();
  const userId = data.session?.user?.id;
  if (!userId) return EMPTY;
  if (cache?.userId !== userId) {
    cache = {
      userId,
      news: client
        .from("contributions")
        .select("id, status")
        .eq("owner", userId)
        .then(({ data: notes }) => newsFrom(notes || [], readSeen(userId))),
    };
  }
  return cache.news;
}

export function useNoteNews() {
  const [news, setNews] = useState(EMPTY);
  useEffect(() => {
    let dropped = false;
    let sub;
    const update = () =>
      load()
        .then((n) => !dropped && setNews(n))
        .catch(() => {});
    update();
    /* Supabase warns against calling it from inside this callback, so the
       update runs just after. */
    supabase().then((client) => {
      if (dropped) return;
      sub = client.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") setTimeout(update, 0);
      });
    });
    window.addEventListener("notes-seen", update);
    return () => {
      dropped = true;
      sub?.data.subscription.unsubscribe();
      window.removeEventListener("notes-seen", update);
    };
  }, []);
  return news;
}
