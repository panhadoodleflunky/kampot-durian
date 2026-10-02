"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* Who the reader is, in the nav. Deliberately a client component: reading the
   session on the server means reading cookies, and a page that reads cookies
   cannot be prerendered — the whole guide would turn from static HTML into a
   render on every request, for a line of text most visitors never need. The
   cost of that choice is the `ready` flag below.

   supabase-js is imported inside the effect, not at the top of the file. This
   component sits in the nav of every page, and a static import put its 70 kB
   into the first load of all twenty-four of them — on a guide written for
   readers on mobile data in Kampot. Imported this way it is a second chunk
   that arrives after the page is already readable. */
async function supabase() {
  const { createClient } = await import("../lib/supabase/client.js");
  return createClient();
}
/* Shows the reader's name, from `profiles`, linking to /account. Not the
   email: an address in the nav ends up in every screenshot and every
   projected demo, and the name is what the rest of the site shows anyway. */
export default function AuthStatus() {
  const router = useRouter();
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
         other tab of the same browser. Without it, logging out in one tab
         would leave the other one still showing a name. Only the id is
         kept here: Supabase warns against calling it again from inside
         this callback, so the name is fetched by the effect below. */
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

  async function logOut() {
    const client = await supabase();
    await client.auth.signOut();
    router.refresh();
  }

  /* An empty slot until the session is known. Rendering the logged-out links
     first would flash "log in" at someone who is already logged in, on every
     single page load. */
  if (!ready) return <span className="auth-slot" aria-hidden="true" />;

  if (userId) {
    return (
      <div className="auth-nav">
        <Link className="auth-btn" href="/contribute">
          Contribute
        </Link>
        <Link className="auth-email auth-name" href="/account" title="Your account">
          {name || "Account"}
        </Link>
        {/* Hidden in the laptop bar, which has no room for it beside six
            links and a name (globals.css); it lives on /account there, and
            stays here in the phone menu. */}
        <button className="auth-btn auth-logout" type="button" onClick={logOut}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="auth-nav">
      <Link className="auth-btn" href="/login">
        Log in
      </Link>
      <Link className="auth-btn" href="/signup">
        Sign up
      </Link>
    </div>
  );
}
