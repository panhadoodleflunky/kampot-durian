"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client.js";

/* The login form. Signup has its own form since Lab 7 (SignupForm), with
   the name, birthdate and agreement fields; it keeps the same rule below.

   Every failure renders one sentence that does not say which half was wrong.
   "No account found with that email" would answer, for anyone who cares to
   ask, whether an address has an account on this site — user enumeration, and
   Rasmey and Vanny are named on every entry here. The one exception is a
   request that never reached Supabase: "invalid password" there would send
   the reader to retype a password that was right all along. */
function readableError(failed) {
  if (failed.name === "AuthRetryableFetchError") {
    return "The server didn't answer. Check your connection and try again.";
  }
  return "Invalid email or password";
}

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const { error: failed } = await createClient().auth.signInWithPassword({ email, password });

    if (failed) {
      setBusy(false);
      setError(readableError(failed));
      return;
    }

    /* push then refresh: the header reads the session in the browser, and
       without the refresh it would still be showing the logged-out links. */
    router.push("/");
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <label className="search-label" htmlFor="auth-email">
        Email
      </label>
      <input
        id="auth-email"
        className="search-input auth-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        inputMode="email"
        required
      />

      <label className="search-label auth-label-2" htmlFor="auth-password">
        Password
      </label>
      <input
        id="auth-password"
        className="search-input auth-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />

      {/* role="alert" so a screen reader hears the failure without the
          message having to steal focus. */}
      <p className="auth-error" role="alert">
        {error}
      </p>

      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? "Logging in" : "Log in"}
        </button>
        <Link className="link" href="/signup">
          No account yet? Sign up
        </Link>
      </div>
    </form>
  );
}
