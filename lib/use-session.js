"use client";

import { useEffect, useState } from "react";

/* supabase-js is imported on demand, not at the top of the file. The nav
   that uses this sits on every page, and a static import put its 70 kB into
   the first load of all of them — on a guide written for readers on mobile
   data in Kampot. Imported this way it is a second chunk that arrives after
   the page is already readable. */
export async function supabase() {
  const { createClient } = await import("./supabase/client.js");
  return createClient();
}

/* Who is logged in, and their display name from `profiles`. Read in the
   browser on purpose: reading the session on the server means reading
   cookies, and a page that reads cookies cannot be prerendered. The cost is
   `ready`, false until the session is known. */
export function useSession() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let listener;
    let dropped = false;

    supabase().then((client) => {
      /* The component can unmount while the chunk is still arriving. */
      if (dropped) return;

      client.auth.getUser().then(({ data }) => {
        setUserId(data.user?.id ?? "");
        setReady(true);
      });

      /* Fires on login, logout and token refresh, in this tab and in any
         other tab of the same browser. Only the id is kept here: Supabase
         warns against calling it again from inside this callback, so the
         name is fetched by the effect below. */
      listener = client.auth.onAuthStateChange((_event, session) => {
        setUserId(session?.user?.id ?? "");
        setReady(true);
      });
    });

    return () => {
      dropped = true;
      listener?.data.subscription.unsubscribe();
    };
  }, []);

  /* The name, once per account rather than on every token refresh; and
     again when the account page announces a rename. */
  useEffect(() => {
    if (!userId) return setName("");
    let dropped = false;
    supabase()
      .then((client) => client.from("profiles").select("display_name").eq("id", userId).maybeSingle())
      .then(({ data }) => {
        if (!dropped) setName(data?.display_name ?? "");
      });
    const renamed = (e) => setName(e.detail);
    window.addEventListener("profile-renamed", renamed);
    return () => {
      dropped = true;
      window.removeEventListener("profile-renamed", renamed);
    };
  }, [userId]);

  return { userId, name, ready };
}
