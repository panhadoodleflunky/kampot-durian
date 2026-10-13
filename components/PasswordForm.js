"use client";

import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

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
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.account;

  const field = (name) => ({
    value: values[name],
    error: errors[name],
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const found = passwordErrors(values.password, values.confirm, lang);
    if (!values.current) found.current = t.currentMissing;
    else if (values.current === values.password) found.password = t.same;
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    const supabase = createClient();
    const check = await supabase.auth.signInWithPassword({ email, password: values.current });
    if (check.error) {
      setBusy(false);
      if (check.error.name === "AuthRetryableFetchError") {
        return setMessage(all.save.noServer);
      }
      return setErrors({ current: t.wrongCurrent });
    }

    const { error } = await supabase.auth.updateUser({ password: values.password });
    setBusy(false);
    if (error) {
      console.error("password change:", error);
      return setMessage(t.notChanged);
    }
    setValues(EMPTY);
    setMessage(t.changed);
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      {/* The email is here, hidden, for password managers: it tells them
          which saved login this new password belongs to. */}
      <input type="email" value={email} autoComplete="username" readOnly hidden />
      <FormField id="acct-current" label={t.current} type="password" hint={t.currentHint} autoComplete="current-password" {...field("current")} />
      <FormField id="acct-new" label={t.newPassword} type="password" hint={t.newHint(PASSWORD_MIN)} autoComplete="new-password" {...field("password")} />
      <FormField id="acct-confirm" label={t.again} type="password" hint={t.againHint} autoComplete="new-password" {...field("confirm")} />
      <p className="auth-error" role="status">{message}</p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>
          {busy ? t.changing : t.change}
        </button>
      </div>
    </form>
  );
}
