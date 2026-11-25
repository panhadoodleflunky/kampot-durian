"use client";

import { useState } from "react";
import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* A password box with an eye button that shows what was typed, so a reader
   on a phone keyboard can check it before sending. The button is
   type="button", so it never submits the form, and aria-pressed tells a
   screen reader whether the password is showing. */
export default function PasswordInput(props) {
  const [shown, setShown] = useState(false);
  const t = pick(forms, useLang()).password;
  return (
    <div className="password-wrap">
      <input {...props} type={shown ? "text" : "password"} />
      <button
        type="button"
        className="password-eye"
        aria-label={shown ? t.hide : t.show}
        aria-pressed={shown}
        aria-controls={props.id}
        onClick={() => setShown(!shown)}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
          {shown ? null : <path d="M4 4l16 16" />}
        </svg>
      </button>
    </div>
  );
}
