"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountMenu from "./AccountMenu.js";
import { supabase, useSession } from "../lib/use-session.js";

/* Who the reader is, in the nav: their name, linking to /account. Not the
   email: an address in the nav ends up in every screenshot and every
   projected demo. The session itself is read in lib/use-session.js.

   `variant`: "bar" in the nav bar, where the name opens a small account
   panel (AccountMenu); "sheet" in the phone menu, where everything is laid
   out flat at finger size: the name, then Contribute and Log out. */
export default function AuthStatus({ variant = "bar" }) {
  const router = useRouter();
  const { userId, name, ready } = useSession();

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
        {variant === "sheet" ? (
          <>
            <Link className="auth-email auth-name" href="/account" title="Your account">
              {name || "Account"}
            </Link>
            <button className="auth-btn" type="button" onClick={logOut}>
              Log out
            </button>
          </>
        ) : (
          <AccountMenu name={name} onLogOut={logOut} />
        )}
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
