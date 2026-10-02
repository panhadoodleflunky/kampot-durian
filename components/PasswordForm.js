"use client";

import { useState } from "react";
import FormField from "./FormField.js";
import { createClient } from "../lib/supabase/client.js";
import { passwordErrors, PASSWORD_MIN } from "../lib/signup-rules.js";

const EMPTY = { current: "", password: "", confirm: "" };

/* Change password. The current password is asked for first and checked by
   logging in with it, as OWASP's authentication guidance recommends: a
   laptop left logged in should not be enough to take over the account.
   Supabase's updateUser on its own does not ask for it. */
export default function PasswordForm({ email }) {
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
    const found = passwordErrors(values.password, values.confirm);
    if (!values.current) found.current = "Enter your current password.";
    else if (values.current === values.password) found.password = "Choose a password different from the current one.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    const supabase = createClient();
    const check = await supabase.auth.signInWithPassword({ email, password: values.current });
    if (check.error) {
      setBusy(false);
      if (check.error.name === "AuthRetryableFetchError") {
        return setMessage("The server didn't answer. Check your connection and try again.");
      }
      return setErrors({ current: "That isn't your current password." });
    }

    const { error } = await supabase.auth.updateUser({ password: values.password });
    setBusy(false);
    if (error) {
      console.error("password change:", error);
      return setMessage("The password wasn't changed. Try again in a minute.");
    }
    setValues(EMPTY);
    setMessage("Password changed. Use the new one next time you log in.");
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      {/* The email is here, hidden, for password managers: it tells them
          which saved login this new password belongs to. */}
      <input type="email" value={email} autoComplete="username" readOnly hidden />
      <FormField id="acct-current" label="Current password" type="password" hint="To prove it's you." autoComplete="current-password" {...field("current")} />
      <FormField id="acct-new" label="New password" type="password" hint={`At least ${PASSWORD_MIN} characters.`} autoComplete="new-password" {...field("password")} />
      <FormField id="acct-confirm" label="New password, again" type="password" hint="Type it once more." autoComplete="new-password" {...field("confirm")} />
      <p className="auth-error" role="status">{message}</p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? "Changing" : "Change password"}
        </button>
      </div>
    </form>
  );
}
