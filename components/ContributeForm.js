"use client";

import { useEffect, useState } from "react";
import SignInPrompt from "./SignInPrompt.js";
import { useRouter } from "next/navigation";
import EntryForm from "./EntryForm.js";
import { createClient } from "../lib/supabase/client.js";
import { makeSlug } from "../lib/entry-rules.js";
import { entryColumns, nextFigNumber } from "../lib/entry-row.js";
import { uploadPhoto, storagePath } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../app/field-notes/actions.js";

/* The curator's role lives in app_metadata, which a user cannot change
   (user_metadata they can). Read here only to pick the shelf and the
   wording; if someone fakes it in the browser, the entries insert policy
   checks the same claim in the database and refuses them. */
const isCurator = (user) => user?.app_metadata?.role === "curator";

/* /contribute. Hiding the form from a logged-out visitor is manners; the
   insert policies are what actually refuse them. The curator's entries go
   into the Field Notes catalogue (`entries`); everyone else's go to
   Community Notes (`contributions`), never into the family's catalogue. */
export default function ContributeForm() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setUser(data.user ?? null));
  }, []);

  async function save(fields, photo, kind) {
    const supabase = createClient();
    /* Asked again at save time, not trusted from page load: the session can
       have ended in another tab since. The owner is this id — never a value
       from the form. */
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return "You've been logged out. Log in again, then save.";

    const photoUrl = await uploadPhoto(supabase, auth.user.id, photo, kind).catch((failed) => {
      saveError("photo upload", failed);
      return null;
    });
    if (!photoUrl) return "The photo couldn't be uploaded. Check it's a JPEG, PNG or WebP under 5 MB, and try again.";

    const curator = isCurator(auth.user);
    const row = { ...entryColumns(fields), slug: makeSlug(fields.title), photo_url: photoUrl, owner: auth.user.id };
    /* The curator's own entries join the catalogue: a number, and
       "published" rather than the table's default "in-progress", which
       the site shows as "the material behind this entry is thin". */
    if (curator) Object.assign(row, { fig_number: await nextFigNumber(supabase), status: "published" });

    const { data, error } = await supabase
      .from(curator ? "entries" : "contributions")
      .insert(row)
      .select("slug")
      .single();

    if (error) {
      /* The entry never existed, so its photo shouldn't either. */
      await supabase.storage.from("photos").remove([storagePath(photoUrl)]);
      return saveError("insert entry", error);
    }

    await refreshArchive();
    router.push(`${curator ? "/field-notes" : "/contributed"}/${data.slug}`);
  }

  if (user === undefined) return <p className="body-copy">Checking who you are…</p>;
  if (user === null) {
    return <SignInPrompt>Adding an entry needs an account. Reading never does.</SignInPrompt>;
  }
  return (
    <>
      <p className="body-copy">
        {isCurator(user)
          ? "You're the curator: this goes into the Field Notes catalogue."
          : "This goes into Community Notes, under your name. It won't appear in the orchard's Field Notes."}
      </p>
      <EntryForm photoRequired submitLabel="Add the entry" onSave={save} />
    </>
  );
}
