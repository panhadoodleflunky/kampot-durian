"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "./FormField.js";
import { createClient } from "../lib/supabase/client.js";
import { validateSignup, NAME_MAX, PASSWORD_MIN } from "../lib/signup-rules.js";

const EMPTY = { name: "", email: "", password: "", confirm: "", birthdate: "", agreed: false };

/* /signup. One message for every failure Supabase sends back, so the form
   never says whether an email already has an account (the same rule as the
   login form; see AuthForm). The real error goes to the console.

   Name, birthdate and the agreement ride along as user metadata. The
   database's signup trigger copies only the name into the public
   `profiles` table; the birthdate stays in the account, readable by its
   owner alone. Nothing here can grant a role: roles are app_metadata,
   which signUp can't write. */
export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const field = (name) => ({
    value: values[name],
    error: errors[name],
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const fields = { ...values, name: values.name.trim(), email: values.email.trim() };
    const found = validateSignup(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return setMessage("Fix the fields marked below, then try again.");

    setBusy(true);
    const data = { display_name: fields.name, agreed_at: new Date().toISOString() };
    if (fields.birthdate) data.birthdate = fields.birthdate;
    const { data: result, error } = await createClient().auth.signUp({
      email: fields.email,
      password: fields.password,
      options: { data },
    });
    setBusy(false);

    if (error) {
      console.error("signup:", error);
      return setMessage(
        error.name === "AuthRetryableFetchError"
          ? "The server didn't answer. Check your connection and try again."
          : "That account could not be created. Try a different email, or try again in a minute.",
      );
    }
    if (!result.session) return setMessage("Check your email for a link to confirm the account, then log in.");
    router.push("/contribute");
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <FormField id="su-name" label="Your name" hint={`Shown on your notes. Up to ${NAME_MAX} characters.`} autoComplete="name" {...field("name")} />
      <FormField id="su-email" label="Email" type="email" hint="Never shown to anyone." autoComplete="email" inputMode="email" {...field("email")} />
      <FormField id="su-password" label="Password" type="password" hint={`At least ${PASSWORD_MIN} characters.`} autoComplete="new-password" {...field("password")} />
      <FormField id="su-confirm" label="Password, again" type="password" hint="Type it once more." autoComplete="new-password" {...field("confirm")} />
      <FormField id="su-birthdate" label="Birthdate (optional)" type="date" hint="Kept private. Never shown." autoComplete="bday" {...field("birthdate")} />

      <label className="signup-agree" htmlFor="su-agree">
        <input id="su-agree" type="checkbox" checked={values.agreed} aria-invalid={errors.agreed ? true : undefined} onChange={(e) => setValues({ ...values, agreed: e.target.checked })} />
        I&rsquo;ll only add what I was told or saw myself, say who told me, and use my own photographs.
      </label>
      {errors.agreed ? <p className="entry-field-error">{errors.agreed}</p> : null}

      <p className="auth-error" role="alert">{message}</p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>{busy ? "Creating the account" : "Sign up"}</button>
        <Link className="link" href="/login">Already have an account? Log in</Link>
      </div>
    </form>
  );
}
