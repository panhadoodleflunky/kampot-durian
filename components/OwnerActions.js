"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storagePath } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../app/field-notes/actions.js";

/* Edit and Delete, shown only to the entry's owner. Checked in the browser
   so the entry page itself stays static (see AuthStatus for the same
   trade). Hiding the buttons is manners, not security: the update and
   delete policies are what refuse a stranger, and the check for a returned
   row below is how this page finds out they did.

   supabase-js arrives as a separate chunk after the page is readable, the
   same way AuthStatus loads it. */
async function supabase() {
  const { createClient } = await import("../lib/supabase/client.js");
  return createClient();
}

/* `table` and `basePath` say which shelf the entry is on: field notes
   ("entries", /field-notes) or community notes ("contributions",
   /contributed). */
export default function OwnerActions({ table = "entries", basePath = "/field-notes", id, owner, slug, photoUrl }) {
  const router = useRouter();
  const [mine, setMine] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase()
      .then((client) => client.auth.getUser())
      .then(({ data }) => setMine(Boolean(data.user) && data.user.id === owner));
  }, [owner]);

  async function remove() {
    if (!window.confirm("Delete this entry? This can't be undone.")) return;
    setBusy(true);
    setMessage("");
    const client = await supabase();
    const { data, error } = await client.from(table).delete().eq("id", id).select("id");

    if (error || data.length === 0) {
      setBusy(false);
      if (error) return setMessage(saveError("delete entry", error));
      console.error("delete entry: no row came back for id", id);
      return setMessage("That change wasn't saved.");
    }
    /* The entry is gone; its photo goes too if it was in the bucket. */
    const path = storagePath(photoUrl);
    if (path) await client.storage.from("photos").remove([path]);
    await refreshArchive();
    router.push(basePath);
  }

  if (!mine) return null;
  return (
    <div className="owner-actions">
      <Link className="auth-btn" href={`${basePath}/${slug}/edit`}>
        Edit
      </Link>
      <button className="auth-btn owner-delete" type="button" onClick={remove} disabled={busy}>
        {busy ? "Deleting" : "Delete"}
      </button>
      <p className="auth-error" role="alert">
        {message}
      </p>
    </div>
  );
}
