"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NameForm from "./NameForm.js";
import PasswordForm from "./PasswordForm.js";
import { createClient } from "../lib/supabase/client.js";

/* /account: who you are, your name, your password. The email is shown but
   can't be changed here, by the owner's choice; it is the account's
   identity and the one thing never displayed to anyone else. */
export default function AccountPanel() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return setState({ status: "logged-out" });
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", data.user.id)
        .maybeSingle();
      setState({ status: "ready", user: data.user, name: profile?.display_name ?? "" });
    });
  }, []);

  if (state.status === "loading") return <p className="body-copy">Loading your account…</p>;
  if (state.status === "logged-out") {
    return (
      <p className="body-copy">
        <Link className="link" href="/login">Log in</Link> to see your account.
      </p>
    );
  }

  const { user, name } = state;
  return (
    <>
      <section className="account-block">
        <h2 className="tile-label">Email</h2>
        <p className="body-copy account-email">{user.email}</p>
        <p className="entry-field-hint">Only you can see this. It can&rsquo;t be changed.</p>
      </section>

      <section className="account-block">
        <h2 className="tile-label">Name</h2>
        <NameForm userId={user.id} current={name} />
      </section>

      <section className="account-block">
        <h2 className="tile-label">Password</h2>
        <PasswordForm email={user.email} />
      </section>
    </>
  );
}
