"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storagePath } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../lib/actions.js";
import { canEdit, canDelete } from "../lib/roles.js";
import { supabase } from "../lib/use-session.js";

/* Edit, shown only to the entry's owner; Delete, to its owner and to the
   curator (who reviews notes but doesn't rewrite them, since Sprint 3).
   Checked in the browser so the entry page itself stays static (see
   AuthStatus for the same trade). Hiding the buttons is manners, not
   security: the update and delete policies are what refuse a stranger, and
   the check for a returned row below is how this page finds out they did.

   supabase-js arrives as a separate chunk after the page is readable
   (lib/use-session.js), the same way the nav loads it. */

/* `table` and `basePath` say which shelf the entry is on: field notes
   ("entries", /field-notes) or community notes ("contributions",
   /contributed). */
export default function OwnerActions({ table = "entries", basePath = "/field-notes", id, owner, slug, photoUrl }) {
  const router = useRouter();
  const [may, setMay] = useState({ edit: false, remove: false });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.owner;

  useEffect(() => {
    supabase()
      .then((client) => client.auth.getUser())
      .then(({ data }) => setMay({ edit: canEdit(data.user, owner), remove: canDelete(data.user, owner) }));
  }, [owner]);

  async function remove() {
    if (!window.confirm(t.confirm)) return;
    setBusy(true);
    setMessage("");
    const client = await supabase();
    const { data, error } = await client.from(table).delete().eq("id", id).select("id");

    if (error || data.length === 0) {
      setBusy(false);
      if (error) return setMessage(saveError("delete entry", error, lang));
      console.error("delete entry: no row came back for id", id);
      return setMessage(all.save.notSaved);
    }
    /* The entry is gone; its photo goes too if it was in the bucket. */
    const path = storagePath(photoUrl);
    if (path) await client.storage.from("photos").remove([path]);
    /* The delete has already happened. A dropped connection here would
       throw and leave the button on "Deleting" for good; the pages rebuild
       within a minute anyway, so a failed refresh is not worth stopping for. */
    await refreshArchive().catch((failed) => console.error("refresh archive:", failed));
    router.push(localize(lang, basePath));
  }

  if (!may.remove) return null;
  return (
    <div className="owner-actions">
      {may.edit ? (
        <Link className="auth-btn" href={localize(lang, `${basePath}/${slug}/edit`)}>
          {t.edit}
        </Link>
      ) : null}
      <button className="auth-btn owner-delete" type="button" onClick={remove} disabled={busy}>
        {busy ? t.deleting : t.delete}
      </button>
      <p className="auth-error" role="alert">
        {message}
      </p>
    </div>
  );
}
