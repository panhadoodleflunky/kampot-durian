"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInPrompt from "./SignInPrompt.js";
import NameForm from "./NameForm.js";
import PasswordForm from "./PasswordForm.js";
import { createClient } from "../lib/supabase/client.js";

/* /account: who you are, your name, your password. The email is shown but
   can't be changed here, by the owner's choice; it is the account's
   identity and the one thing never displayed to anyone else. */
export default function AccountPanel() {
  const router = useRouter();
  const [state, setState] = useState({ status: "loading" });
  const lang = useLang();
  const t = pick(forms, lang).account;

  /* Log out lives here on a laptop: the nav bar shows Contribute and the
     name, and had no room left for a third button. */
  async function logOut() {
    await createClient().auth.signOut();
    router.push(localize(lang, "/"));
    router.refresh();
  }

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

  if (state.status === "loading") return <p className="body-copy">{t.loading}</p>;
  if (state.status === "logged-out") {
    return <SignInPrompt>{t.loggedOut}</SignInPrompt>;
  }

  const { user, name } = state;
  return (
    <>
      <section className="account-block">
        <h2 className="tile-label">{t.email}</h2>
        <p className="body-copy account-email">{user.email}</p>
        <p className="entry-field-hint">{t.emailNote}</p>
      </section>

      <section className="account-block">
        <h2 className="tile-label">{t.name}</h2>
        <NameForm userId={user.id} current={name} />
      </section>

      <section className="account-block">
        <h2 className="tile-label">{t.password}</h2>
        <PasswordForm email={user.email} />
      </section>

      <section className="account-block">
        <h2 className="tile-label">{t.logOut}</h2>
        <div className="auth-actions">
          <button className="auth-btn prompt-alt" type="button" onClick={logOut}>
            {t.logOut}
          </button>
        </div>
      </section>
    </>
  );
}
