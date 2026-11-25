"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton.js";
import { canEdit, canDelete } from "../lib/roles.js";
import { supabase } from "../lib/use-session.js";

/* Edit, shown only to the entry's owner; Delete, to its owner and to the
   curator (who reviews notes but doesn't rewrite them, since Sprint 3).
   Checked in the browser so the entry page itself stays static (see
   AuthStatus for the same trade). Hiding the buttons is manners, not
   security: the update and delete policies are what refuse a stranger.
   Delete asks first, in a box that names the entry (DeleteButton).

   supabase-js arrives as a separate chunk after the page is readable
   (lib/use-session.js), the same way the nav loads it. */

/* `table` and `basePath` say which shelf the entry is on: field notes
   ("entries", /field-notes) or community notes ("contributions",
   /contributed). */
export default function OwnerActions({ table = "entries", basePath = "/field-notes", id, owner, slug, photoUrl, title }) {
  const router = useRouter();
  const [may, setMay] = useState({ edit: false, remove: false });
  const lang = useLang();
  const t = pick(forms, lang).owner;

  useEffect(() => {
    supabase()
      .then((client) => client.auth.getUser())
      .then(({ data }) => setMay({ edit: canEdit(data.user, owner), remove: canDelete(data.user, owner) }));
  }, [owner]);

  if (!may.remove) return null;
  return (
    <div className="owner-actions">
      {may.edit ? (
        <Link className="auth-btn" href={localize(lang, `${basePath}/${slug}/edit`)}>
          {t.edit}
        </Link>
      ) : null}
      <DeleteButton
        table={table}
        id={id}
        owner={owner}
        photoUrl={photoUrl}
        title={title}
        onDeleted={() => router.push(localize(lang, basePath))}
      />
    </div>
  );
}
