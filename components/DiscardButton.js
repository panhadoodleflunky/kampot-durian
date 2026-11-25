"use client";

import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog.js";
import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* On the edit page: leave without saving, back to the version that is
   stored. Nothing is written until Save, so discarding is only leaving the
   page; when something was changed, it asks first. */
export default function DiscardButton({ changed, busy, onDiscard }) {
  const [asking, setAsking] = useState(false);
  const t = pick(forms, useLang()).entry;

  return (
    <>
      <button className="auth-btn" type="button" disabled={busy} onClick={() => (changed ? setAsking(true) : onDiscard())}>
        {t.discard}
      </button>
      <ConfirmDialog
        open={asking}
        title={t.discardTitle}
        body={t.discardBody}
        confirmLabel={t.discard}
        cancelLabel={t.keepEditing}
        onConfirm={onDiscard}
        onCancel={() => setAsking(false)}
      />
    </>
  );
}
