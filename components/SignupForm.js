"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "./FormField.js";
import { createClient } from "../lib/supabase/client.js";
import { validateSignup, NAME_MAX, PASSWORD_MIN } from "../lib/signup-rules.js";
import { returnPath } from "../lib/return-to.js";

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
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.signup;

  const field = (name) => ({
    value: values[name],
    error: errors[name],
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const fields = { ...values, name: values.name.trim(), email: values.email.trim() };
    const found = validateSignup(fields, lang);
    setErrors(found);
    if (Object.keys(found).length > 0) return setMessage(t.fix);

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
        error.name === "AuthRetryableFetchError" ? all.save.noServer : t.failed,
      );
    }
    if (!result.session) return setMessage(t.confirmEmail);
    /* Back to the page they were on, as after logging in. */
    router.push(returnPath(lang));
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <FormField id="su-name" label={t.name} hint={t.nameHint(NAME_MAX)} autoComplete="name" {...field("name")} />
      <FormField id="su-email" label={t.email} type="email" hint={t.emailHint} autoComplete="email" inputMode="email" {...field("email")} />
      <FormField id="su-password" label={t.password} type="password" hint={t.passwordHint(PASSWORD_MIN)} autoComplete="new-password" {...field("password")} />
      <FormField id="su-confirm" label={t.confirm} type="password" hint={t.confirmHint} autoComplete="new-password" {...field("confirm")} />
      <FormField id="su-birthdate" label={t.birthdate} type="date" hint={t.birthdateHint} autoComplete="bday" {...field("birthdate")} />

      <label className="signup-agree" htmlFor="su-agree">
        <input id="su-agree" type="checkbox" checked={values.agreed} aria-invalid={errors.agreed ? true : undefined} onChange={(e) => setValues({ ...values, agreed: e.target.checked })} />
        {t.agree}
      </label>
      {errors.agreed ? <p className="entry-field-error">{errors.agreed}</p> : null}

      <p className="auth-error" role="alert">{message}</p>
      <div className="auth-actions">
        <button className="btn auth-submit" type="submit" disabled={busy}>{busy ? t.busy : t.submit}</button>
        <Link className="link" href={localize(lang, "/login")}>{t.toLogin}</Link>
      </div>
    </form>
  );
}
