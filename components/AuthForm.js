"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client.js";
import PasswordInput from "./PasswordInput.js";

/* The login form. Signup has its own form since Lab 7 (SignupForm), with
   the name, birthdate and agreement fields; it keeps the same rule below.

   Every failure renders one sentence that does not say which half was wrong.
   "No account found with that email" would answer, for anyone who cares to
   ask, whether an address has an account on this site — user enumeration. The one exception is a
   request that never reached Supabase: "invalid password" there would send
   the reader to retype a password that was right all along. */
function readableError(failed, all) {
  if (failed.name === "AuthRetryableFetchError") return all.save.noServer;
  return all.login.wrong;
}

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.login;

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const { error: failed } = await createClient().auth.signInWithPassword({ email, password });

    if (failed) {
      setBusy(false);
      setError(readableError(failed, all));
      return;
    }

    /* push then refresh: the header reads the session in the browser, and
       without the refresh it would still be showing the logged-out links. */
    router.push(localize(lang, "/"));
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <label className="search-label" htmlFor="auth-email">
        {t.email}
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
        {t.password}
      </label>
      <PasswordInput
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
          {busy ? t.busy : t.submit}
        </button>
        <Link className="link" href={localize(lang, "/signup")}>
          {t.toSignup}
        </Link>
      </div>
    </form>
  );
}
