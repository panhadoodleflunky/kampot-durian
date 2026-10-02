import Link from "next/link";

/* What a logged-out visitor sees where a form would be: one sentence and two
   real buttons. Inline "log in ›" links inside the sentence wrapped badly on
   a phone, the uppercase link breaking mid-line. */
export default function SignInPrompt({ children }) {
  return (
    <div className="prompt-card">
      <p className="body-copy">{children}</p>
      <div className="auth-actions">
        <Link className="btn" href="/login">
          Log in
        </Link>
        <Link className="auth-btn prompt-alt" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
