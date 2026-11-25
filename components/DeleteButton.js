"use client";

import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog.js";
import { deleteEntry } from "../lib/delete-entry.js";
import { useLang } from "../lib/use-lang.js";
import { pick } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* Delete, with the second-thought box first (ConfirmDialog). Used on the
   entry pages and on My notes; `onDeleted` says where to go after. */
export default function DeleteButton({ table, id, owner, photoUrl, title, onDeleted }) {
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const lang = useLang();
  const t = pick(forms, lang).owner;

  async function remove() {
    setBusy(true);
    setMessage("");
    const failed = await deleteEntry({ table, id, owner, photoUrl, lang });
    setBusy(false);
    setAsking(false);
    if (failed) return setMessage(failed);
    onDeleted();
  }

  return (
    <>
      <button className="auth-btn owner-delete" type="button" onClick={() => setAsking(true)} disabled={busy}>
        {busy ? t.deleting : t.delete}
      </button>
      <ConfirmDialog
        open={asking}
        title={t.deleteTitle(title)}
        body={t.deleteBody}
        confirmLabel={busy ? t.deleting : t.deleteYes}
        cancelLabel={t.cancel}
        busy={busy}
        onConfirm={remove}
        onCancel={() => setAsking(false)}
      />
      {message ? (
        <p className="auth-error" role="alert">
          {message}
        </p>
      ) : null}
    </>
  );
}
