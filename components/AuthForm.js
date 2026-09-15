"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client.js";

const COPY = {
  login: {
    submit: "Log in",
    busy: "Logging in",
    alt: "/signup",
    altText: "No account yet? Sign up",
  },
  signup: {
    submit: "Sign up",
    busy: "Creating the account",
    alt: "/login",
    altText: "Already have an account? Log in",
  },
};

/* Every failure renders one sentence that does not say which half was wrong.
   "No account found with that email" would answer, for anyone who cares to
   ask, whether an address has an account on this site — user enumeration, and
   Rasmey and Vanny are named on every entry here.

   Signup gets the same treatment, which the lab did not ask for: Supabase's
   own "User already registered" enumerates just as plainly as the login case.
   A password Supabase rejects for length is the one message worth passing
   through, because it says nothing about whether the email exists. */
function readableError(mode, failed) {
  if (/password/i.test(failed.message) && /6|short|weak|character/i.test(failed.message)) {
    return "Passwords need at least six characters.";
  }
  return mode === "login"
    ? "Invalid email or password"
    : "That account could not be created. Try a different email, or a longer password.";
}

export default function AuthForm({ mode }) {
  const copy = COPY[mode];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const credentials = { email, password };
    const { error: failed } =
      mode === "login"
        ? await supabase.auth.signInWithPassword(credentials)
        : await supabase.auth.signUp(credentials);

    if (failed) {
      setBusy(false);
      setError(readableError(mode, failed));
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
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        minLength={6}
        required
      />

      {/* role="alert" so a screen reader hears the failure without the
          message having to steal focus. */}
      <p className="auth-error" role="alert">
        {error}
      </p>

      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? copy.busy : copy.submit}
        </button>
        <Link className="link" href={copy.alt}>
          {copy.altText}
        </Link>
      </div>
    </form>
  );
}
